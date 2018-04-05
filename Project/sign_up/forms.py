from django import forms
from .static_data import *

class PersonalInfo(forms.Form):
  first_name = forms.CharField(label='first name', required=True, max_length=20,
    widget=forms.TextInput(attrs={'placeholder': 'first name', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'first_name'}))
  last_name = forms.CharField(label='last name', required=True, max_length=20,
    widget=forms.TextInput(attrs={'placeholder': 'last name', 'autofocus':'autofocus', 
      'class':'form-control', 'id': 'last_name'}))

  email = forms.CharField(label='email', required=True, max_length=60,
    widget=forms.TextInput(attrs={'placeholder': 'you@example.com', 'autofocus':'autofocus', 
      'class':'form-control', 'type':'email', 'id':'email'}))

  password1 = forms.CharField(label='password1', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'inputPassword', 'type':'password'}))
  password2 = forms.CharField(label='password2', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus',
     'class':'form-control', 'id':'confirmPassword', 'type':'password'}))
  
  address1 = forms.CharField(label='address1', required=False, max_length=60,
    widget=forms.TextInput(attrs={'placeholder': '1234 Main St', 'autofocus':'autofocus', 
      'class':'form-control'}))
  address2 = forms.CharField(label='address2', required=False, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Apartment or suite', 'autofocus':'autofocus', 
      'class':'form-control'}))

  country = forms.ChoiceField(label='country', required=False,
    widget=forms.Select(attrs={'class':'custom-select d-block w-100', 'id':'country'}),
    choices=(countries) )
  state = forms.ChoiceField(label='state', required=False,
    widget=forms.Select(attrs={'class':'custom-select d-block w-100', 'id':'state'}),
    choices=(states['AU']) )

  zip_code = forms.CharField(label='password', required=False, max_length=4,
    widget=forms.TextInput(attrs={'placeholder': '', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'zip'}))




class NavbarFormOut(forms.Form):
  search_target = forms.CharField(label='target', max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Search', 'autofocus':'autofocus', 
      'class':'form-control mr-sm-2'}))
