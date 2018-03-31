from django.db import models

# Create your models here.
class LoginModel(models.Model):
  username = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  role = models.CharField(max_length=1)
  
  def get_username(self):
    return self.username

  def get_password(self):
    return self.password

  def get_role(self):
    return self.role

  def check_valid(self, username, password):
    # here we need to link to cloud database


    # then we gonna retrive check wheter that user exitst
    # then we gonna get the corresponding password
    pswd, role = "createsuperuser", 'B' # this supose to be the password select from the database
    if pswd is not None:
      if password == pswd:
        # if them match, it is allowed to login as a role
        return role
    return None
    