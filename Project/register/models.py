import pymongo
from django.db import models
from pymongo import MongoClient

# Create your models here.
class RegisterModel(models.Model):
  # username = models.CharField(max_length=40)
  # password = models.CharField(max_length=40)
  # role = models.CharField(max_length=1)
  
  # def get_username(self):
  #   return self.username

  # def get_password(self):
  #   return self.password

  # def get_role(self):
  #   return self.role

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
        # if them match, it is allowed to login as a role
        return role
    return None
