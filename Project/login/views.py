from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from .models import LoginModel
from .forms import LoginForm, NavbarFormOut

# Create your views here.
def index(request):
  if request.method == "POST":
    print("        ----------- in Post -----------          ")

    # initialize the model so that we can use functions init
    ml = LoginModel()

    # get form from the UI
    context = LoginForm(request.POST)
    nav_search = NavbarFormOut(request.POST)

    print(request.POST)

    if request.POST.get('login') is not None:
      print("Login is clicked")
    elif request.POST.get('forget') is not None:
      print("Forget is clicked")
    
    if context.is_valid():
      print("form is good !!!!! ")
      username = request.POST['username']
      password = request.POST['password']
      role = ml.check_valid(username, password)
      print( '~~~~~~~ back to view ~~~~~~~')
      print(username, password, role)

      if role is not None:
        response = HttpResponseRedirect('/')
        response.set_cookie("test", {'name':'watman', 'ans':'ass'})
        return response
        #return HttpResponseRedirect('/') # we need to pass context to next page
      else:
        return render(request, 'login/index.html', {'context': context, 'nav_search': nav_search, 'check': False})

    else:
       print("context is bad")


    if nav_search.is_valid():
      print(" = ===== = ==  = = = === = = = = = = = = = ")
      search_target = request.POST['search_target']
      print(search_target)
      return render(request, 'login/test.html', {'context': context, 'nav_search': nav_search, 'check': None})
    else:
      print("search model cannot load")
  else:
    context = LoginForm()
    nav_search = NavbarFormOut()
    return render(request, 'login/index.html', {'context': context, 'nav_search': nav_search, 'check': None})
