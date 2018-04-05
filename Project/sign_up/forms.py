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

class SecurityQuestion(forms.Form):

  sq1 = forms.ChoiceField(label='question1', required=False,
    widget=forms.Select(attrs={'class':'custom-select d-block w-100', 'id':'sq1'}),
    choices=(question_list1) )

  sq1_answer = forms.CharField(label='question1_answer', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'sq1_answer','aria-label':'Default','aria-describedby':'inputGroup-sizing-default'}))
	
  sq2 = forms.ChoiceField(label='question2', required=False,
    widget=forms.Select(attrs={'class':'custom-select d-block w-100', 'id':'sq2'}),
    choices=(question_list2) )

  sq2_answer = forms.CharField(label='question2_answer', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'sq2_answer','aria-label':'Default','aria-describedby':'inputGroup-sizing-default'}))
	  
  sq3 = forms.ChoiceField(label='question3', required=False,
    widget=forms.Select(attrs={'class':'custom-select d-block w-100', 'id':'sq3'}),
    choices=(question_list3) )

  sq3_answer = forms.CharField(label='question3_answer', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'sq3_answer','aria-label':'Default','aria-describedby':'inputGroup-sizing-default'}))
	  


class NavbarFormOut(forms.Form):
  search_target = forms.CharField(label='target', max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Search', 'autofocus':'autofocus', 
      'class':'form-control mr-sm-2'}))
