from django.shortcuts import render

# Create your views here.
def index(request):
  print(request.COOKIES.get('test'))
  return render(request, 'home/index.html')