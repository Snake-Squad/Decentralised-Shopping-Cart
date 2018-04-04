from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from .models import LoginModel
from .forms import LoginForm

# Create your views here.
def index(request):
  # print(request.method)
  # print(request)
  # lm = LoginModel()

  if request.method == "POST":
    print("        ----------- in Post -----------          ")

    # initialize the model so that we can use functions init
    ml = RegisterModel()

    # get form from the UI
    #form = LoginForm(request.POST)
    
    # if form.is_valid():
    #   print("form is good !!!!! ")
    #   username = request.POST['username']
    #   password = request.POST['password']
    #   role = ml.check_valid(username, password)
    #   print(username, password, role)

    #   if role is not None:
    #     return HttpResponseRedirect('/')
    #   else:
    #     return render(request, 'login/test.html', {'form': form})
  else:
    print("        ----------- in Get -----------          ")
    #form = LoginForm()
    return render(request, 'register/index.html')
    #return render(request, 'login/test.html', {'form': form})
