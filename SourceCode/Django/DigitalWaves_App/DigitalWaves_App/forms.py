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
        widgets = {
            'Name': forms.TextInput(attrs={'placeholder': 'Full Name'}),
            'DOB': forms.DateInput(format='%d/%m/%Y', attrs={'placeholder': 'DD/MM/YYYY'}),
            'Email': forms.EmailInput(attrs={'placeholder': 'Email Address'}),
            'PhoneNumber': forms.TextInput(attrs={'placeholder': 'Phone Number'}),
            'Address': forms.Textarea(attrs={'placeholder': 'Enter your address'}),
            'OtherName': forms.TextInput(attrs={'placeholder': 'Other Name'}),
            'FacebookID': forms.TextInput(attrs={'placeholder': 'Facebook Username'}),
            'TwitterID': forms.TextInput(attrs={'placeholder': 'Your Twitter Username'}),
            'LinkedinUsername': forms.TextInput(attrs={'placeholder': 'LinkedIn Username'}),
            }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['DOB'].input_formats = ['%d/%m/%Y']
        





