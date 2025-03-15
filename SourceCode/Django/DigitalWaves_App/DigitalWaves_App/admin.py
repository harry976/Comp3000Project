from django.contrib import admin
from .models import UserInformation, HowToFixCategories, ConfirmedResultsEntries

admin.site.register(UserInformation)
admin.site.register(HowToFixCategories)
admin.site.register(ConfirmedResultsEntries)