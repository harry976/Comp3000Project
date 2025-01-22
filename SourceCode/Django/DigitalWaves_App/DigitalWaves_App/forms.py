from django import forms
from .models import UserInformation

class UserInformationForm(forms.ModelForm):
    class Meta:
        model = UserInformation
        fields = [
            'Name', 'DOB', 'Married', 'Email', 'PhoneNumber',
            'Address', 'OtherName', 'FacebookID', 'TwitterID',
            'LinkedinUsername', 'CriminalRecord', 'OwnProperty', 'Sex'
        ]




