import requests
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse


def FetchNews(request):
    user_name = "Jeffrey Epstein"  # Replace with your database-driven value later
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


def MainPage(request):
    return render(request, 'MainPage.html')

def DataForm(request):
    return render(request, "DataForm.html")

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

        messages.success(request, "registration successful")
        return redirect('DataForm')
    return render(request, 'RegistrationPage.html')



