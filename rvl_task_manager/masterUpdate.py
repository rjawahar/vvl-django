from   django.core.context_processors 	import csrf
from   django.shortcuts 		import render_to_response, redirect
from   django.contrib.auth 		import authenticate, login
from   django.contrib.auth.decorators 	import login_required
from   django.contrib.auth.models 	import User, Group

import urllib2
import urlparse
from   urlparse				import parse_qsl, urlparse
from   django.core.urlresolvers		import reverse
from   django.views.decorators.csrf 	import csrf_protect, csrf_exempt
from   django.template 			import loader, RequestContext
from   django.views.decorators.http 	import require_GET, require_POST
from   django.http 			import HttpResponse, HttpResponseBadRequest, \
       					HttpResponseRedirect, HttpResponseForbidden, HttpResponseNotFound,\
       					HttpResponseServerError

#AVRO
import functools
import json
import psycopg2
from   uuid 		import uuid4 as uuid

import io
import os.path
import avro.schema
import avro.io   
from   avro.io 	   	import validate
from   avro.io 	   	import AvroTypeException
from   avro 	   	import schema, datafile, io
from   avro.datafile 	import DataFileReader, DataFileWriter
from   avro.io 	   	import DatumReader, DatumWriter
import pprint

#/*For image*/
from   PIL 		import Image
import StringIO
import re
 
#/*For Data From Settings*/ 
from   django.conf 	import settings

from   views 		import *
import views
 	
#################################
#Open Master Js update Page with the Master data:
@login_required(login_url='/login/')
def masterJs(request):
    print "\nFUNCTION ( masterJs ) User : "+str(request.user)
    context = RequestContext(request)
    context.user = request.user
    data=''
    try:
	    #Read Master Details	    	    
    	    url2="http://"+settings.API_IP_AVRO+"/madura-coreservice/rest/api/readmasterdet/mtdetail/1"	
    	    print url2
	    request2 = urllib2.Request(url2)
	    request2.add_header('Content-Type', 'avro/binary')
	    result2 = urllib2.urlopen(request2)
	    serialized_data2 = io.BytesIO(result2.read())
	    print serialized_data2

	    #Decoding in Avro:	
	    response_schema2 = avro.schema.parse( open(settings.SCHEMA_LOCATION+"masterdetailschema.avsc").read() )
	    decoder2 = avro.io.BinaryDecoder(serialized_data2)
	    reader2 = avro.io.DatumReader(response_schema2)
	    response2 = reader2.read(decoder2)
	    data = json.dumps(response2)
    except Exception as e:
    	    response = "Failure . Please Contact the Administrator"
            print "Exception inside masterJs--> Master Data : %s" %e
            	    
    return render_to_response("updateMasterJS.html", {'masterData':data} , context_instance=RequestContext(request))

#################################
#Master data UPdate after changing into the required Format:        
@csrf_exempt
@login_required(login_url='/login/')
def masterJsUpdate(request):
    
    print "\nFUNCTION ( masterJsUpdate ) User : "+str(request.user)
    response=''
    try:
	    bodyData = request.body	    
	    bodyDataJson = json.loads(bodyData)
	    #Master Data to be stored in JS File in static location:
	    masterData = "var masterAddressProofArrayDic     = "+ json.dumps( bodyDataJson['masterAddressProofArrayDic']	)+";\n"	+"var masterIdProofArrayDic 	     = "+ json.dumps( bodyDataJson['masterIdProofArrayDic']		)+";\n"			+"var masterValidationLevelArrayDic  = "+ json.dumps( bodyDataJson['masterValidationLevelArrayDic']	)+";\n"			+"var masterEducationArrayDic	     = "+ json.dumps( bodyDataJson['masterEducationArrayDic']		)+";\n"			+"var masterNetQuestionArrayDic	     = "+ json.dumps( bodyDataJson['masterNetQuestionArrayDic']		)+";\n"			+"var masterDistanceArrayDic	     = "+ json.dumps( bodyDataJson['masterDistanceArrayDic']		)+";\n"			+"var masterOccupationArrayDic	     = "+ json.dumps( bodyDataJson['masterOccupationArrayDic']		)+";\n"			+"var masterPurposeArrayDic	     = "+ json.dumps( bodyDataJson['masterPurposeArrayDic']		)+";\n"			+"var masterProcessRemarkArrayDic    = "+ json.dumps( bodyDataJson['masterProcessRemarkArrayDic']	)+";\n"			+"var masterAssetArrayDic 	     = "+ json.dumps( bodyDataJson['masterAssetArrayDic']		)+";\n"			+"var masterValidationTypeArrayDic   = "+ json.dumps( bodyDataJson['masterValidationTypeArrayDic']	)+";\n"			+"var masterCourierArrayDic	     = "+ json.dumps( bodyDataJson['masterCourierArrayDic']		)+";\n"			+"var masterProductArrayDic	     = "+ json.dumps( bodyDataJson['masterProductArrayDic']		)+";\n"			+"var masterBankArrayDic	     = "+ json.dumps( bodyDataJson['masterBankArrayDic']		)+";\n"			+"var masterRelationArrayDic	     = "+ json.dumps( bodyDataJson['masterRelationArrayDic']		)+";\n"			+"var masterValidationStatusArrayDic = "+ json.dumps( bodyDataJson['masterValidationStatusArrayDic']	)+";"    	    	    

	    #Open the file Name of master Data and update it
    	    f = open(settings.MASTER_LOCATION+'masterData.js','w')
	    f.write(masterData) # python will convert \n to os.linesep
	    f.close()
	    response = "Successful"
	    			    
    except Exception as e:
    	    response = "Failure . Please Contact the Administrator"
            print "Exception inside masterJsUpdate--> Master Data : %s" %e
                	        
    return HttpResponse(json.dumps({"data":response}), content_type="application/json")
