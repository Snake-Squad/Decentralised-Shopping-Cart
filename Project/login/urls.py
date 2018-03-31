from django.urls import path
from . import views

# Create your views here.
urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.index, name='index'),
]