import subprocess
from django.contrib.auth.forms import UsernameField
import requests
import json 
import os
import asyncio
import praw
import string
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .forms import UserInformationForm
from .models import UserInformation
from .models import ConfirmedResultsEntries
from .models import HowToFixCategories




def FetchNews(request):
    user_info = UserInformation.objects.get(user=request.user)
    full_name = user_info.Name
    user_name = full_name
    api_key = "b80bd9a851964df5ba7e7bc052192429"
    url = f"https://newsapi.org/v2/everything?q={user_name}&apiKey={api_key}"

    try:
        response = requests.get(url)
        data = response.json()
        articles = [{'title': article['title'], 'url': article['url']} for article in data.get('articles', []) if 'url' in article]
        return JsonResponse({'articles': articles})
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return JsonResponse({'error': 'Unable to fetch data'}, status=500)



@login_required
def FetchTwitterUsernames(request):
    #Retrieve User Data from database
    UserInfo = UserInformation.objects.get(user=request.user)
    TwitterUsername= UserInfo.TwitterID
    #Twitter API request code
    url = f"https://api.x.com/2/users/by/username/{TwitterUsername}"
    headers = {"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANHWzgEAAAAAdsB4mkOMH%2FqcsNX4YNUsRCcsvus%3DRDUsnOGkrKG7cp3golbmVsNpZmbDsBOOsbnhdHRQ2N08eBY5Wp"}
    #make request
    response = requests.get(url, headers=headers)
    #split data up to only relevant code
    data=response.json()
    UserTwitterData={"name": data["data"]["name"],
                     "username": data["data"]["username"],
                     "id": data["data"]["id"],
                     "URL": f"https://x.com/{data['data']['username']}"
                     }
    return JsonResponse({"UserTwitterData": UserTwitterData});

@login_required
def FetchReddit(request):
    reddit = praw.Reddit(
        client_id="4Q7wO74vQG5YIFScJa2pHQ",
        client_secret="NCirEq87BwkW7bFEMDwiCwx1cRgbFA",
        user_agent="DigitalWaves" 
        )
    #Retreive username from database - use facebook one
    UserInfo = UserInformation.objects.get(user=request.user)
    RedditUsername= UserInfo.FacebookID
    #make API call
    UserRedditAPICall = reddit.redditor(RedditUsername)
    UserRedditData = {
        "username": UserRedditAPICall.name,
        "URL": f"https://www.reddit.com/user/{UserRedditAPICall.name}",
        }
    #return data to JS file
    return JsonResponse({"UserRedditData": UserRedditData});

@login_required
def FetchGitHub(request):
    #fetch the username from the database - use the facebook one for now
    UserInfo = UserInformation.objects.get(user=request.user)
    GitHubUsername = UserInfo.FacebookID
    #Make API call
    response = requests.get(f"https://api.github.com/users/{GitHubUsername}")
    data = response.json()
    UserGitHubData = {
        "username": data['login'],
        "URL": data['html_url'],
        }
    #return to JS file
    return JsonResponse({"UserGitHubData": UserGitHubData})

@login_required
def FetchPwned(request):
    #retrieve email from database
    UserInfo = UserInformation.objects.get(user=request.user)
    UserEmail=UserInfo.Email
    #Set credentials
    Credentials = {
        'User-Agent': 'DigitalWaves',
        'hibp-api-key': '0f30dd56475641eb9a77d2e1766fe810'
        }
    #Make API call
    response = requests.get(f"https://haveibeenpwned.com/api/v3/breachedaccount/{UserEmail}?truncateResponse=false",headers=Credentials)
    UserPwnedData = response.json()
    #return to JS file
    return JsonResponse({"UserPwnedData": UserPwnedData})

@login_required
def FetchGoogleFacebookLinkedin(request):
    #retreive facebook username from database
    UserInfo = UserInformation.objects.get(user=request.user)
    UserFacebookID = UserInfo.FacebookID
    UserLinkedinUsername = UserInfo.LinkedinUsername
    #set credentials
    SearchEngineID = "063b98e3f99a54fbf"
    APIKey = "AIzaSyAThgldxT8lZolsc_oLaAXLL30DVCuIAmc"
    #set URLs
    URLsToQuery =[ f"site:facebook.com {UserFacebookID}", f"site:linkedin.com {UserLinkedinUsername}"]
    GoogleResults = []
    LinkedInResults = []
    #make API call
    for URL in URLsToQuery:
        response = requests.get(f"https://www.googleapis.com/customsearch/v1?q={URL}&key={APIKey}&cx={SearchEngineID}")
        data = response.json()
        if 'items' in data:
            GoogleResults.extend(data["items"])
    return JsonResponse({"GoogleResults": GoogleResults})

@login_required
def FetchGoogleCompaniesHouse(request):
     #retreive full name from database
    UserInfo = UserInformation.objects.get(user=request.user)
    UserFullName = UserInfo.Name
    #set credentials
    SearchEngineID = "a53b7c616e4a042be"
    APIKey = "AIzaSyAThgldxT8lZolsc_oLaAXLL30DVCuIAmc"
    GoogleResults = []
    URL = f"site:companieshouse.gov.uk {UserFullName}"
    response = requests.get(f"https://www.googleapis.com/customsearch/v1?q={URL}&key={APIKey}&cx={SearchEngineID}")
    data = response.json()
    if 'items' in data:
        GoogleResults.extend(data["items"])
    return JsonResponse({"GoogleResults": GoogleResults})

@login_required
def MainPage(request):
    #clear results entries when main page loads
    ConfirmedResultsEntries.objects.filter(user=request.user).delete()
    return render(request, 'MainPage.html')


@login_required
def DataForm(request):
    print("entered view. success")
    #get existing user info for data prefill
    try:
        ExistingUserInfo = UserInformation.objects.get(user=request.user)
    except UserInformation.DoesNotExist:
        ExistingUserInfo = None
    #request data form
    if request.method == 'POST':
        UserDataForm = UserInformationForm(request.POST, instance=ExistingUserInfo)
        print("the method was POST. success")
        #if filled in correctly
        if UserDataForm.is_valid():
            print("Form is valid. success")
            #save to user
            SaveUserForm = UserDataForm.save(commit=False)
            SaveUserForm.user = request.user
            SaveUserForm.save()
            print("form is saved. success")

            return redirect('MainPage')
        else:
            print(UserDataForm.errors)
    else:
        #if existing user
        if ExistingUserInfo:
            #prefill form
           UserDataForm = UserInformationForm(instance=ExistingUserInfo)
        else:
            #blank form
            UserDataForm = UserInformationForm()

    return render(request, "DataForm.html", {'form': UserDataForm})

@csrf_exempt
@login_required
def DeleteOptionalData(request):
    try:
        ExistingUserData = UserInformation.objects.get(user=request.user)
    except UserInformation.DoesNotExist:
        ExistingUserData = None
        success = False
    if request.method == "POST":
        if ExistingUserData:
            ExistingUserData.Address = None
            ExistingUserData.OtherName = None
            ExistingUserData.FacebookID = None
            ExistingUserData.TwitterID = None
            ExistingUserData.LinkedinUsername = None
            ExistingUserData.CriminalRecord = None
            ExistingUserData.OwnProperty = None
            ExistingUserData.Sex = None
            ExistingUserData.save()
            success = True

    return JsonResponse({'success': success})


@login_required
def LogoutView(request):
    logout(request)
    return redirect('Login')
    


def LoginView(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('MainPage')
        else:
            messages.error(request, 'Invalid username or password')
            return render(request, 'LoginPage.html')
    return render(request, 'LoginPage.html')

def RegistrationView(request):
    if request.method == 'POST':
        #retrieve data from the HTML form
        username = request.POST.get('username')
        ConfirmUsername = request.POST.get('ConfirmUsername')
        password = request.POST.get('password')
        ConfirmPassword = request.POST.get('ConfirmPassword')

        #confirm verification
        if username != ConfirmUsername:
            messages.error(request, "Usernames do not match")
            return render(request, 'RegistrationPage.html')

        if password != ConfirmPassword:
            messages.error(request, "Passwords do not match")
            return render(request, 'RegistrationPage.html')

        if len(password) < 8:
            messages.error(request, "Passwords must be more than 8 characters")
            return render(request, 'RegistrationPage.html')

        if not any(char.isdigit() for char in password):
            messages.error(request, "Passwords must contain at least 1 number")
            return render(request, 'RegistrationPage.html')

        if not any(char in string.punctuation for char in password):
            messages.error(request, "Passwords must contain at least 1 special character")
            return render(request, 'RegistrationPage.html')

        #ensure username does not already exist
        if User.objects.filter(username=username).exists():
            messages.error(request, "User already exists")
            return render(request, 'RegistrationPage.html')

        #add data into the database
        user = User.objects.create_user(username=username, password=password)
        user.save()
        logout(request)
        login(request, user)

        messages.success(request, "registration successful")
        return redirect('DataForm')
    return render(request, 'RegistrationPage.html')


@login_required
def ChangeUsernameView(request):
    if request.method == 'POST': 
        ExistingUsername = request.POST.get('ExistingUsername')
        NewUsername = request.POST.get('NewUsername')
        if request.user.username != ExistingUsername:
            messages.error(request,"Existing Username does not match logged in account")
            return render(request, "ChangeUsername.html")
        if ExistingUsername == NewUsername:
            messages.error(request, "New Username Must Be Different")
            return render(request, "ChangeUsername.html")
        if User.objects.filter(username=NewUsername).exists():
            messages.error(request, "User already exists")
            return render(request, "ChangeUsername.html")
        request.user.username = NewUsername
        request.user.save()
        messages.success(request, "Username changed successfully")
        logout(request)
        return redirect('Login')
    return render(request, 'ChangeUsername.html')
    

@login_required
def ChangePasswordView(request):
    if request.method == 'POST':
        ExistingPassword = request.POST.get("ExistingPassword")
        NewPassword = request.POST.get("NewPassword")
        ConfirmPassword = request.POST.get("ConfirmPassword")
        if NewPassword != ConfirmPassword:
            messages.error(request,"New Passwords Do Not Match")
            return render(request, "ChangePassword.html")
        if request.user.check_password(ExistingPassword) == False:
            messages.error(request, "Existing Password Does Not Match Account")
            return render(request, "ChangePassword.html")
        request.user.set_password(NewPassword)
        request.user.save()
        logout(request)
        messages.success(request,"Password Changed Successfully")
        return redirect('Login')    
    return render(request, 'ChangePassword.html')


@login_required
def DeleteAccountView(request):
    if request.method == 'POST':
        ConfirmUsername = request.POST.get("ConfirmUsername")
        ConfirmPassword = request.POST.get("ConfirmPassword")
        if request.user.username == ConfirmUsername:
            if request.user.check_password(ConfirmPassword):
                request.user.delete()
                messages.success(request,"Account Deleted Successfully")
                return redirect('Login')
            messages.error(request,"Password Does Not Match Account")
            return render (request, 'DeleteAccount.html')
        messages.error(request,"Username Does Not Match Account")
        return render(request, 'DeleteAccount.html')
    return render(request, 'DeleteAccount.html')



@login_required
@csrf_exempt
def SaveEntryToDB(request):  
    if request.method == "POST":
         try:
            RetrievedData = json.loads(request.body)
            logo = RetrievedData.get("logo")
            content = RetrievedData.get("content")
            APITypeFromData = RetrievedData.get("APIType")

            FlagsDBAPIType = HowToFixCategories.objects.get(APIType=APITypeFromData)

            EntryToDatabase = ConfirmedResultsEntries.objects.create(
                user=request.user,
                image=logo,
                content=content,
                APIType=FlagsDBAPIType
                )
            return JsonResponse({"status": "success", "message": "entry saved"})
         except Exception as error:
            return JsonResponse({"status": "error", "message": str(error)})

@login_required
def RetrieveEntriesFromDB(request):
    #retrieve entries
    DBEntryStore = ConfirmedResultsEntries.objects.filter(user=request.user)
    #put them in a JSON
    EntriesFromDBArray = []
    for i in DBEntryStore:
        EntriesFromDBArray.append({
            "logo": i.image,
            "content": i.content,
            "APIType": i.APIType.APIType
        })
    return JsonResponse({"entries": EntriesFromDBArray})

@login_required
def GetPreviousScore(request):
    UserInfo = UserInformation.objects.get(user=request.user)
    UserPreviousScore = UserInfo.PreviousScore

    return JsonResponse({"PreviousScore": UserPreviousScore});

@login_required
@csrf_exempt
def SetPreviousScore(request):
    #get new score and save it to the database
    if request.method == "POST":
        NewScoreData = json.loads(request.body)
        NewScore = NewScoreData.get("PreviousScore")
        UserInformationDB = UserInformation.objects.get(user=request.user)
        UserInformationDB.PreviousScore = NewScore
        UserInformationDB.save()
        return JsonResponse({"message": "Score Updated"});

@login_required
def GetFixHint(request, APIType):
    try:
        RelevantHint = HowToFixCategories.objects.get(APIType=APIType)
        return JsonResponse({"Hint": RelevantHint.TipToFix})
    except HowToFixCategories.DoesNotExist:
        return JsonResponse({"Hint": "No Hints Available"})