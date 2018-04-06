from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .forms import NewPW
from .models import ForgetPW

# Create your views here.
def index(request):
    #info = PersonalInfo()
    # get data from cookie
    # data includes {username, q1, q2, q3}
    print("index-------------------")
    if request.method == "GET":
        print("----------------get")
        password = NewPW()
        return render(request, 'reset_password/index.html', {'password': password})
    else:
        print("-----in POST -------------")
        model = ForgetPW()
        password = NewPW(request.POST)
        if password.is_valid():
        	if model.update_pw(request):
        		print("Good")
        		return HttpResponseRedirect('http://127.0.0.1:8000')
        	else:
        		print("Bad")
        		return render(request, 'reset_password/index.html', {'password': password})
        else:
        	print("password is invalid")
        	return render(request, 'reset_password/index.html', {'password': password})
