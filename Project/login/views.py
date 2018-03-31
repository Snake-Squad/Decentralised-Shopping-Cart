from django.shortcuts import render
from django.http import HttpResponse

from .models import LoginModel

# Create your views here.
def index(request):
  print(request.method)
  if request.method == "POST":
    print('request = POST')
    #data = LoginModel(request.POST)
    #print(data.get_username(), data.get_password(), data.is_buyer())
  else:
    data = LoginModel()

  return render(
    request, 
    'login/index.html'
  )

def get_name(request):
  print('In get_name')
