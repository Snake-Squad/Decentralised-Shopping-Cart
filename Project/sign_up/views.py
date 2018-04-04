from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import PostInfo
from .forms import PersonalInfo

# Create your views here.
def index(request):
  if request.method == "GET":
    info = PersonalInfo()
    return render(request, 'sign_up/index.html',
      {'info': info})
  else:
    print(" --------------- in post ----------------- ")
    model = PostInfo()
    info = PersonalInfo(request.POST)
    if info.is_valid():
      model.post_info(request)
    else:
      print('info is invalid')
      
    return render(request, 'sign_up/index.html',
      {'info': info})