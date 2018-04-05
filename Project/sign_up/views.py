from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from .forms import *

#from .models import PostInfo
#from .forms import PersonalInfo

# Create your views here.
def index(request):
	print("index------------------------------")
	if request.method == "GET":
		print("--------------------------------------------get")
		info = PersonalInfo()
	
		seq_info = SecurityQuestion()
		
		return render(request, 'sign_up/index.html',
		  {'info': info,'seq_info':seq_info})
	else:
		print(" --------------- in post ----------------- ")
		model = PostInfo()
		info = PersonalInfo(request.POST)
		
		#info_list=[info.
		seq_info = SecurityQuestion(request.POST)
		
		print("info--------------------",info)
		if info.is_valid():
		  info_list=model.post_info(request)
		  
		else:
		  print('info is invalid')
		
		
		print("seq_info--------------------",seq_info)
		if seq_info.is_valid():
		
		  security_list=model.post_security(request)
		else:
		  print('seq_info is invalid')
		
		model.register(info_list+security_list)
		return render(request, 'sign_up/index.html',
		  {'info': info,'seq_info':seq_info})