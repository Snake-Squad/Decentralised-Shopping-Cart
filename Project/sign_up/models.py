import pymongo
from django.db import models
from pymongo import MongoClient

# Create your models here.
class PostInfo (models.Model):
  def post_info(self, request): # post Persional Information
    # analize info
    print(request)
    print()
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']
    print("hello", last_name, first_name)

    email = request.POST['email']
    print(email)

    password1 = request.POST['password1']
    password2 = request.POST['password2']
    print(password1, "   <----------->   ", password2)

    address1 = request.POST['address1']
    address2 = request.POST['address2']
    print(address2, address1)

    country = request.POST['country']
    state = request.POST['state']
    zip_code = request.POST['zip_code']
    print(country, state, zip_code)

    # connect to mongodb
    # post info
    return None
