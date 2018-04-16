from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .forms import Answers, NewPW
from .models import ForgetPW
from pymongo import MongoClient
# Create your views here.
def index(request):
  username = request.GET.get('username', '')
  client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')
  question = client['dsc'].Users.find({"email": username})
  for item in question:
        q1 = item['security_question'][0]['Question1']
        q2 = item['security_question'][1]['Question2']
        q3 = item['security_question'][2]['Question3']
        a1 = item['security_question'][0]['Answer1']
        a2 = item['security_question'][1]['Answer2']
        a3 = item['security_question'][2]['Answer3']
  data = {
      'username':username,
      'q1':q1,
      'q2':q2,
      'q3':q3
    }
  if request.method == 'GET':
    #info = PersonalInfo()
    # get data from cookie
    # data includes {username, q1, q2, q3}
    #这里取出在url中的username
    # 向数据库发送一个请求，找到username的那几个问题
    # 将问题赋值给data就可以了
  
    answers = Answers()#在这里把username 放进 answers中
    print('---------------')
    return render(request, 'forget_password/index.html', {'data': data, 'answers': answers})
  else:
    print(" ------------------- in post ------------------- ")
    # get answers from cookie ... this one is from DB

    # client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

    # question = client['dsc'].Users.find({"email": username})
    right = {
      'a1': a1,
      'a2': a2,
      'a3': a3
    }


    model = ForgetPW()
    answers = Answers(request.POST)

    if answers.is_valid():
      if model.check_answers(right, request):
        print("Good")
        
        return HttpResponseRedirect('http://127.0.0.1:8000/reset_password/?username='+username)
      else:
        print("Bad")
        return render(request, 'forget_password/index.html',{'data': data, 'answers': answers})
    else:
      print("answers is invalid")
      return render(request, 'forget_password/index.html')
