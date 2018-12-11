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
from django.conf 	import settings

from views 		import *
import views

###########
#Preparing Loan Cheque
@csrf_exempt
@login_required(login_url='/login/')
def prepareLoanChequeAdd(request):
    print "\nFUNCTION ( prepareLoanChequeAdd ) User : "+str(request.user)
    context = RequestContext(request)
    context.user = request.user

    if request.method == 'POST':	
	
	data = json.loads(request.body)
	chequedetailArray = data['chequedetailArray']
	taskId 		  = data['taskid']

	#Cheque Details Schema:
	schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"chequedetailschema.avsc").read() )
	writer = avro.io.DatumWriter(schema)
	bytes_writer = io.BytesIO()
	encoder = avro.io.BinaryEncoder(bytes_writer)
	
	#Encode:
	writer.write( chequedetailArray , encoder)
	print bytes_writer.getvalue()

	try:
		url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addchequedet/cdetail'
		print url	
		byte_data = bytes_writer.getvalue()
		request1 = urllib2.Request(url, bytes_writer.getvalue() )
		request1.add_header('Content-Type', 'avro/binary')
		request1.get_method = lambda: 'POST'
		result1 = urllib2.urlopen(request1)
		serialized_data = io.BytesIO(result1.read())

		try:
			#Response Schema
			response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
			decoder = avro.io.BinaryDecoder(serialized_data)
			reader = avro.io.DatumReader(response_schema)
			response = reader.read(decoder)
			print response
			
			response["message"]="Success"
			if response["status"] == "Successful":
			    try:
				process = {
					    "variables": {
							"ChequeId" : {
								"value" : response["cheque_id"], 
								"type"	: "String"
							}
						}
					}	
				#process Complete
			        bodyData 	= json.dumps(process)
				serialized_data = updateTaskprocess(request, bodyData, taskId)
				return HttpResponse(json.dumps(serialized_data), content_type="application/json")	

			    except Exception as e:
				print "Exception inside prepareLoanChequeAdd-->Process Failed After prepareLoanChequeAdd processs : %s" %e
				return HttpResponse(json.dumps({"message":"Process Failed"}), content_type="application/json")

			return HttpResponse(json.dumps(response), content_type="application/json")
				
		except Exception as e:
			print "Exception inside prepareLoanChequeAdd--> Failed at prepareLoanChequeAdd cheque: %s" %e
			return HttpResponse(json.dumps({"message":"Start process Failed"}), content_type="application/json")

		print serialized_data
		response = HttpResponse(serialized_data, content_type='text/plain')
		response['Content-Length'] = len(serialized_data)
		return response

	except Exception as e:
		context.message = "Error"
		print "Exception inside prepareLoanChequeAdd complete : %s" %e
		return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))

    	return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))
    else:
     	return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))    	


###########
#Approving a Loan Cheque:
@csrf_exempt
@login_required(login_url='/login/')
def approveLoanCheque(request):
    print "\nFUNCTION ( approveLoanCheque ) User : "+str(request.user)
    context = RequestContext(request)
    context.user = request.user

    if request.method == 'POST':	

	data = json.loads(request.body)
	chequedetailArray = data['chequedetailArray']
	taskId 		  = data['taskid']

	#Cheque Validation Schema :
	schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"chequevalidationschema.avsc").read() )
	writer = avro.io.DatumWriter(schema)
	bytes_writer = io.BytesIO()
	encoder = avro.io.BinaryEncoder(bytes_writer)
	#Encode
	writer.write( chequedetailArray , encoder)
	print bytes_writer.getvalue()

	try:
		url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addchequeval/cvalidation'
		print url	
		byte_data = bytes_writer.getvalue()
		request1 = urllib2.Request(url, bytes_writer.getvalue() )
		request1.add_header('Content-Type', 'avro/binary')
		request1.get_method = lambda: 'POST'
		result1 = urllib2.urlopen(request1)
		serialized_data = io.BytesIO(result1.read())

		try:
			#Response Schema:
			response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
			decoder = avro.io.BinaryDecoder(serialized_data)
			reader = avro.io.DatumReader(response_schema)
			response = reader.read(decoder)
			print response
			
			response["message"]="Success"
			if response["status"] == "Successful":
			    try:
				process = {
					    "variables": {
							"LoanCheque_Approve_Status" : {
								"value" : "Approved", 
								"type"	: "String"
							}
						}
					}

				url2 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+str(taskId)+'/complete'
				print url2
				#Process Complete:
				request2 = urllib2.Request(url2, json.dumps(process))
				request2.add_header('Content-Type', 'application/json')
				request2.get_method = lambda: 'POST'
				result2 = urllib2.urlopen(request2)
				serialized_data2 = result2.read()

				return HttpResponse(json.dumps(response), content_type="application/json")

			    except Exception as e:
				print "Exception inside Process Failed After prepareLoanChequeAdd processs : %s" %e
				return HttpResponse(json.dumps({"message":"Process Failed"}), content_type="application/json")

			return HttpResponse(json.dumps(response), content_type="application/json")
				
		except Exception as e:
			print "Exception inside Failed at prepareLoanChequeAdd cheque: %s" %e
			return HttpResponse(json.dumps({"message":"Start process Failed"}), content_type="application/json")

		print "serialized_data ::::"
		print serialized_data
		response = HttpResponse(serialized_data, content_type='text/plain')
		response['Content-Length'] = len(serialized_data)
		return response

	except Exception as e:
		context.message = "Error"
		print "Exception inside prepareLoanChequeAdd complete : %s" %e
		return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))

    	return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))
    else:
     	return render_to_response("prepareLoanCheque.html", context, context_instance=RequestContext(request))    	



###########
#Acknowledging a Loan Cheque
@csrf_exempt
@login_required(login_url='/login/')
def acknowledgeCheque(request):
    print "\nFUNCTION ( acknowledgeCheque ) ::"	
    data = request.body	
    data = json.loads(request.body)
    processDetails = data['processDetails']
    taskId = data['taskid']

    bodyData 	= json.dumps(processDetails)
    serialized_data = updateTaskprocess(request, bodyData, taskId)
    return HttpResponse(json.dumps(serialized_data), content_type="application/json")
   	


