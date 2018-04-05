import pymongo
from django.db import models
from pymongo import MongoClient

# Create your models here.
class PostInfo(models.Model):
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

# Create Security question here.
class PostSecurity(models.Model):
	def post_security(self, request): # post security question
		# analize info
		
		#question1 = request.POST['question1']
		question1 = request.POST['sq1']
		
		question1_answer = request.POST['sq1_answer']
		print("hellose1", question1, question1_answer)
		
		
		question2 = request.POST['sq2']
		question2_answer = request.POST['sq2_answer']
		print("hellose2", question2, question2_answer)
		
		 
		question3 = request.POST['sq3']
		question3_answer = request.POST['sq3_answer']
		print("hellose3", question3, question3_answer)
		
		# connect to mongodb
		# post inf
		return None