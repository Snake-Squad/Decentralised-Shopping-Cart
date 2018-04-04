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
    # connect to mongodb
    # post info
    return None
