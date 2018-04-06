from django.db import models

# Create your models here.
class ForgetPW(models.Model):

  def update_pw(self, request):
    # connect to DB
    # update the password
    password1 = request.POST['password1'] 
    password2 = request.POST['password2']
    if password1 != password2:
      return False
    else:
      return True
     