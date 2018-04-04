from django import forms

class PersonalInfo(forms.Form):
  first_name = forms.CharField(label='first name', required=True, max_length=20,
    widget=forms.TextInput(attrs={'placeholder': 'first name', 'autofocus':'autofocus', 
      'class':'form-control'}))
  last_name = forms.CharField(label='last name', required=True, max_length=20,
    widget=forms.TextInput(attrs={'placeholder': 'last name', 'autofocus':'autofocus', 
      'class':'form-control'}))
  # email = forms.CharField(label='email', required=True, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'you@example.com', 'autofocus':'autofocus', 
  #     'class':'form-control'}))

  # password1 = forms.CharField(label='password1', required=True, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'password', 'autofocus':'autofocus', 
  #     'class':'form-control'}))
  # password2 = forms.CharField(label='password2', required=True, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'Should be exactly the same as it in password.',
  #    'autofocus':'autofocus', 'class':'form-control'}))
  
  # address1 = forms.CharField(label='address1', required=False, max_length=60,
  #   widget=forms.TextInput(attrs={'placeholder': '1234 Main St', 'autofocus':'autofocus', 
  #     'class':'form-control'}))
  # address2 = forms.CharField(label='address2', required=False, max_length=40,
  #   widget=forms.TextInput(attrs={'placeholder': 'Apartment or suite', 'autofocus':'autofocus', 
  #     'class':'form-control'}))

  # country = forms.ChoiceField(label='password', required=False, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'password', 'autofocus':'autofocus', 
  #     'class':'form-control'}))
  # state = forms.ChoiceField(label='password', required=False, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'password', 'autofocus':'autofocus', 
  #     'class':'form-control'}))

  # zip_code = forms.CharField(label='password', required=False, max_length=20,
  #   widget=forms.TextInput(attrs={'placeholder': 'password', 'autofocus':'autofocus', 
  #     'class':'form-control'}))




class NavbarFormOut(forms.Form):
  search_target = forms.CharField(label='target', max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Search', 'autofocus':'autofocus', 
      'class':'form-control mr-sm-2'}))
