from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .forms import Answers, NewPW
from .models import ForgetPW

# Create your views here.
def index(request):
  if request.method == 'GET':
    #info = PersonalInfo()
    # get data from cookie
    # data includes {username, q1, q2, q3}
    data = {
      'username':'bad@gmail.com',
      'q1':'what is your favourite color?',
      'q2':'what is your favourite food?',
      'q3':'what is your favourite animal?'
    }
    answers = Answers()
    return render(request, 'forget_password/index.html', {'data': data, 'answers': answers})
  else:
    print(" ------------------- in post ------------------- ")
    # get answers from cookie ... this one is from DB
    right = {
      'a1': 'black',
      'a2': 'pasta',
      'a3': 'cat'
    }

    model = ForgetPW()
    answers = Answers(request.POST)

    if answers.is_valid():
      if model.check_answers(right, request):
        print("Good")
        password = NewPW()
        return render(request, 'reset_password/index.html', {'password': password})
      else:
        print("Bad")
        return render(request, 'forget_password/index.html')
    else:
      print("answers is invalid")
      return render(request, 'forget_password/index.html')
