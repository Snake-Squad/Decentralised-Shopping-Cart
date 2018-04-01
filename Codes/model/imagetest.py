import pymongo

from pymongo import MongoClient
import gridfs


import image
from bson import Binary



if __name__ =='__main__':
   

    client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

    db = client['dsc']
    #print(fs.list())
    filename=r'C:\Users\R&Y\Desktop\mm.jpg'
    '''
    file_id=fs.put(filename,filename="image")
    data={"about":about,"file_id":file_id}
    fs.insert(data)
    '''
    datafile = open(filename,'rb');
    thedata = datafile.read()
 

    fs=gridfs.GridFS(db)
# store the data in the database. Returns the id of the file in gridFS
    stored = fs.put(thedata, filename="testimage")
    out = fs.get(stored)
    print(out)
    outputdata = fs.get(stored).read()
    outfilename = r'C:\Users\R&Y\Desktop\mmmm.jpg'
    output= open(outfilename,"wb")
     
    output.write(outputdata)
   # close the output file    
    output.close()
    '''  
    #for experimental code restore to known state and close connection
    fs.delete(stored)
    connection.drop_database('example');
    #print(connection.database_names())
     connection.close()
   '''
