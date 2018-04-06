from django import forms

class LoginForm(forms.Form):
  username = forms.CharField(label='username', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Email', 'autofocus':'autofocus', 
      'class':'form-control'}))
  password = forms.CharField(label='password', required=False, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'password', 'autofocus':'autofocus', 
      'class':'form-control', 'type':'password'}))
  role = forms.CharField(label='role', max_length=1, required=False)

class NavbarFormOut(forms.Form):
  search_target = forms.CharField(label='target', max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Search', 'autofocus':'autofocus', 
      'class':'form-control mr-sm-2'}))
