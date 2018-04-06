from django import forms

class Answers(forms.Form):
  a1 = forms.CharField(label='a1', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'a1', 'type':'text', 'aria-label':"Default",
      'aria-describedby':"inputGroup-sizing-default"}))
  a2 = forms.CharField(label='a2', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'a2'}))
  a3 = forms.CharField(label='a3', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Enter your answer', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'a3'}))


class NewPW (forms.Form):
  password1 = forms.CharField(label='password1', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus', 
      'class':'form-control', 'id':'inputPassword', 'type':'password'}))
  password2 = forms.CharField(label='password2', required=True, max_length=40,
    widget=forms.TextInput(attrs={'placeholder': 'Password', 'autofocus':'autofocus',
     'class':'form-control', 'id':'confirmPassword', 'type':'password'}))

