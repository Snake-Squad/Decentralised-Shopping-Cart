from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from .models import LoginModel
from .forms import LoginForm

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
    
    # initialize data in loginModel
    # data = LoginModel(username=None, password=None, role="B")
    # after getting username and password, we need to check its validation
    ml = LoginModel()
    #role = ml.check_valid(username, password)
    role = None
    # print(" ------> ", role, " <--------")

    form = LoginForm(request.POST)
    #form = LoginForm()
    if form.is_valid():
      print("form is good !!!!! ")
      print(request.POST['username'])
      print()
    else:
      print("form is bad T^T")
    if role is not None:
      return HttpResponseRedirect('/')
    else:
      return render(request, 'login/test.html', {'form': form})
  else:
    print("        ----------- in Get -----------          ")
    form = LoginForm()
    #return render(request, 'login/index.html')
    return render(request, 'login/test.html', {'form': form})
