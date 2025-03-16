"""
URL configuration for DigitalWaves_App project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('FetchNews/', views.FetchNews, name='FetchNews'),
    path('FetchTwitterUsernames/', views.FetchTwitterUsernames, name='FetchTwitterUsernames'),
    path('FetchReddit/', views.FetchReddit, name='FetchReddit'),
    path('FetchGitHub/', views.FetchGitHub, name='FetchGitHub'),
    path('FetchPwned/', views.FetchPwned, name='FetchPwned'),
    path('FetchGoogle/', views.FetchGoogleFacebookLinkedin, name='FetchGoogle'),
    path('login/', views.LoginView, name='Login'),
    path('logout/', views.LogoutView, name='Logout'),
    path('register/', views.RegistrationView, name='Register'),
    path('ChangeUsername/', views.ChangeUsernameView, name='ChangeUsername'),
    path('ChangePassword/', views.ChangePasswordView, name='ChangePassword'),
    path('DeleteAccount/', views.DeleteAccountView, name='DeleteAccount'),
    path('home/', views.MainPage, name="MainPage"),
    path('DataForm/', views.DataForm, name="DataForm"),
    path('SaveEntryToDB/', views.SaveEntryToDB, name="SaveEntryToDB"),
    path('RetreiveDBEntries/', views.RetrieveEntriesFromDB, name="RetreiveDBEntries"),
    path('GetFixHint/<str:APIType>/', views.GetFixHint, name="GetFixHint")
]
