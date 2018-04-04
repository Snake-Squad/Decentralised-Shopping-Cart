import pymongo
from django.db import models
from pymongo import MongoClient

# Create your models here.
class LoginModel(models.Model):
  def check_valid(self, username, password):
    pswd, role = None, None

    print("   =  = = = = = = In check  ==  = = = = = = ")
    # here we need to link to cloud database
    client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

    user = client['dsc'].Users.find({'email': username})
    print(user.count())
    
    # check wheter that user exitst
    if user.count() == 1:
      pswd = user[0]["password"]
      role = user[0]["user_type"]

    # then we gonna get the corresponding password
    if pswd is not None:
      print(" ====== check ======", password, "  <---->  ", pswd)
      print(role)
      if password == pswd:
        return role
    return None
