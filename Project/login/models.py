from django.db import models

# Create your models here.
class LoginModel(models.Model):
  username = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  is_buyer = models.BooleanField()

  # def __init__():
  #   print("call models.__init__")
  #   self.username = None
  #   self.password = None
  #   self.is_buyer = True
  
  def get_username(self):
    return self.username

  def get_password(self):
    return self.password

  def is_buyer(self):
    return self.is_buyer

  def set_username(username):
    self.username = username

  def set_password(password):
    self.password = password

  def set_is_buyer(is_buyer):
    self.is_buyer = is_buyer
