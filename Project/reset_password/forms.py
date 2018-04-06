from django import forms


class NewPW (forms.Form):
  password1 = forms.CharField(label='password1', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'inputPassword', 'type':'password'}))
  password2 = forms.CharField(label='password2', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus',
     'class':'form-control', 'id':'confirmPassword', 'type':'password'}))
