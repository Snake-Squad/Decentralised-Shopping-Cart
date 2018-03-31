from django import forms

class Login(forms.Form):
    username = forms.CharField(label='username', max_length=40)
    password = forms.CharField(label='password', max_length=40)
    role = forms.CharField(label='role', max_length=1)
    