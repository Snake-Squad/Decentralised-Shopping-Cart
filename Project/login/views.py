from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import LoginModel

# Create your views here.
def index(request):
  print(request.method)
  print(request)
  # lm = LoginModel()

  if request.method == "POST":
    print("        ----------- in Post -----------          ")
    # we need to retrive data from html file and call checking functions in models
    username = "admin"
    password = "createsuperuser"
    print(request.POST.all())
    # after getting username and password, we need to check its validation
    # role = ml.check(username, password)
    role = 'B'

    if role is not None:
      return HttpResponseRedirect('/')
    else:
      return render(request, 'login/index.html')
  else:
    print("        ----------- in Get -----------          ")
    # initialize data in loginModel
    # data = LoginModel(username=None, password=None, role="B")
    return render(
      request, 
      'login/index.html'
    )
