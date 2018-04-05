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
		question = SecurityQuestion()
		return render(request, 'sign_up/index.html',
		  {'info': info,'question':question})
	else:
		print(" --------------- in post ----------------- ")
		model = PostInfo()
		info = PersonalInfo(request.POST)
		model_question = PostSecurity()
		seq_info = SecurityQuestion(request.POST)
		print("info--------------------",info)
		if info.is_valid():
		  model.post_info(request)
		else:
		  print('info is invalid')
		
		
		print("seq_info--------------------",seq_info)
		if seq_info.is_valid():
		  model_question.post_security(request)
		else:
		  print('seq_info is invalid')
		  
		return render(request, 'sign_up/index.html',
		  {'info': info,'seq_info':seq_info})