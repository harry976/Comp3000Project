from django.db import models
from django.contrib.auth.models import User

class UserInformation(models.Model):
    #required fields
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the Auth User Database table
    Name = models.CharField(max_length=100)
    DOB = models.DateField()
    Married = models.BooleanField(default=False) # not in use
    Email = models.EmailField()
    PhoneNumber = models.CharField(max_length=15)
    FacebookID = models.CharField(max_length=100, blank=False, null=False)
    TwitterID = models.CharField(max_length=100, blank=False, null=False)
    LinkedinUsername = models.CharField(max_length=100, blank=False, null=False)

    # Optional fields
    Address = models.TextField(max_length=128, blank=True, null=True)
    OtherName = models.CharField(max_length=100, blank=True, null=True) # not in use
    CriminalRecord = models.BooleanField(default=False, null=True) # not in use
    OwnProperty = models.BooleanField(default=False, null=True)
    Sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')], blank=True, null=True) # not in use
    PreviousScore = models.IntegerField(default=False, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


class HowToFixCategories(models.Model):
    APIType = models.TextField(max_length=30, unique=True)
    TipToFix = models.TextField()

    def __str__(self):
        return f"How to Fix category: {self.APIType}"


class ConfirmedResultsEntries(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.URLField()
    content = models.TextField()
    APIType = models.ForeignKey(HowToFixCategories, on_delete=models.CASCADE)

    def __str__(self):
        return f"Confirmed Entry for {self.user.username}"



