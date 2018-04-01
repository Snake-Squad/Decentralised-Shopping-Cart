import pymongo
from pymongo import MongoClient

#Connect with Authentication Credentials
#client = MongoClient('mongodb://alice:abc123@localhost:27017')
client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

# Get the database
db = client['dsc']
print(db)

# get the collection
collection = db.collection_names(include_system_collections=False, session=None)
print(collection)

# get a collection called "Users"
users = db.Users

# print all users in Users
# for user in users.find():
#   print(user)

# use this line to check whether the ... exists
un = users.find({'email': 'man@gmail.com'})
print("un = ", un)
for u in un:
  print(u)

if un.count() == 1:
  username = un[0]["username"]
  password = un[0]["password"]
  print(username, password)
elif un.count() == 0:
  print(" User not found ")
else:
  print(" This username already exists. ")

