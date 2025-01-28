import requests
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from .forms import UserInformationForm

def FetchNews(request):
    user_name = "David Beckham"  # Replace with the database value later
    api_key = "b80bd9a851964df5ba7e7bc052192429"
    url = f"https://newsapi.org/v2/everything?q={user_name}&apiKey={api_key}"

    try:
        response = requests.get(url)
        data = response.json()
        articles = [{'url': article['url']} for article in data.get('articles', []) if 'url' in article]
        return JsonResponse({'articles': articles})
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return JsonResponse({'error': 'Unable to fetch data'}, status=500)


@login_required
def MainPage(request):
    return render(request, 'MainPage.html')


@login_required
def DataForm(request):
    print("entered view. success")
    if request.method == 'POST':
        UserDataForm = UserInformationForm(request.POST)
        print("the method was POST. success")

        if UserDataForm.is_valid():
            print("Form is valid. success")
            SaveUserForm = UserDataForm.save(commit=False)
            SaveUserForm.user = request.user
            SaveUserForm.save()
            print("form is saved. success")

            return redirect('MainPage')
        else:
            print(UserDataForm.errors)
    else:
        UserDataForm = UserInformationForm()

    return render(request, "DataForm.html", {'form': UserDataForm})


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
            messages.error(request, "passwords do not match")
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
        #this needs to change in order to log the user in already
        return redirect('DataForm')
    return render(request, 'RegistrationPage.html')



