from django.db import models

# Create your models here.
class ForgetPW(models.Model):
  def check_answers(self, right, request):
  	
    a1 = request.POST['a1']
    a2 = request.POST['a2']
    a3 = request.POST['a3']

    if a1 == right['a1'] and a2 == right['a2'] and a3 == right['a3']:
      return True
    return False

     