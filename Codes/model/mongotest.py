import pymongo
from pymongo import MongoClient

#Connect with Authentication Credentials
#client = MongoClient('mongodb://alice:abc123@localhost:27017')
client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

# Get the database
db = client['dsc']
print(db)

# get the collection
collection = db.collection_names(include_system_collections=True, session=None)
print(collection)
