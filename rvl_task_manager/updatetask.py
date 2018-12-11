#################################
#Dispatch A Document or Loan:
@csrf_exempt
@login_required(login_url='/login/')
def dispatch(request):
    context = RequestContext(request)
    context.user = request.user
    print "\nFUNCTION ( DISPATCH ) User : "+str(request.user)	

    if request.method == 'POST':	
	data = json.loads(request.body)
	dispatchDetails	= data['dispatchDetails']
	processDetails	= data['processDetails']
	taskId 		= data['taskid']
	ApiCall		= data['function']
	print ApiCall

	#Avro Physical and Cheque Document :
	schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"phydoccheqschema.avsc").read() )
	writer = avro.io.DatumWriter(schema)
	bytes_writer = io.BytesIO()
	encoder = avro.io.BinaryEncoder(bytes_writer)
	
	writer.write( dispatchDetails , encoder)
	print "DISPATCH -> bytes_writer.getvalue()"
	print bytes_writer.getvalue()

	try:
		#Add or Update :
		url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
		if ApiCall == "save":
			url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
		if ApiCall == "update":				
		    	url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/updatephydocdisp/dcphysical'	
		print url    	
		    	
		#Send BytesArray from Avro to ApiServer:    	
		byte_data = bytes_writer.getvalue()
		request1 = urllib2.Request(url, bytes_writer.getvalue() )
		request1.add_header('Content-Type', 'avro/binary')
		request1.get_method = lambda: 'POST'
		result1 = urllib2.urlopen(request1)
		serialized_data = io.BytesIO(result1.read())

		try:
			#Get Values from API:
			response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
			decoder = avro.io.BinaryDecoder(serialized_data)
			reader = avro.io.DatumReader(response_schema)
			response = reader.read(decoder)
			print response
			print processDetails
			response["message"]="Success"
			
			#If the Status is Success:
			if response["status"] == "Successful":
			    bodyData 	    = json.dumps(processDetails)
		            serialized_data = updateTaskprocess(request, bodyData, taskId)
		            return HttpResponse(json.dumps(response), content_type="application/json")
		            
			#Send the Responds Data to the client side:
			return HttpResponse(json.dumps(response), content_type="application/json")
				
		except Exception as e:
			print "Exception inside Failed at DISPATCH -> document Start : %s" %e
			return HttpResponse(json.dumps({"message":"Start process Failed"}), content_type="application/json")

		response = HttpResponse(serialized_data, content_type='text/plain')
		response['Content-Length'] = len(serialized_data)
		return response

	except Exception as e:
		context.message = "Error"
		print "Exception inside DISPATCH -> of courier Documents : %s" %e
		return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))

    	return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))
    else:
     	return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))

#################################
#For dispatch Update in Remarks
@csrf_exempt
@login_required(login_url='/login/')
def updateDispatchVerificationtaskprocess(request, status):

    print "\nFUNCTION ( updateDispatchVerificationtaskprocess ) User : "+str(request.user)
    data 	= json.loads(request.body)
    process 	= data['process']
    processid 	= data['processid']
    taskId 	= data['taskid']
    taskremarks = data['taskremarks']

    try:
    	#PROCESS Complete:
        bodyData 	= json.dumps(process)
        serialized_data = updateTaskprocess(request, bodyData, taskId)

	#Validation Schema:
	schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"pdvalidationschema.avsc").read() )
	writer = avro.io.DatumWriter(schema)
	bytes_writer = io.BytesIO()
	encoder = avro.io.BinaryEncoder(bytes_writer)
	
	#Encoding Data:
	writer.write( taskremarks , encoder)

	print "Validation task remarks - updateVerificationtaskprocess :"
	url2 = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydocval/pdvalidation'
	print url2
	
	#URL FOR VALIDATOIN
	request2 = urllib2.Request(url2,bytes_writer.getvalue())
	request2.add_header('Content-Type', 'avro/binary')
	request2.get_method = lambda: 'POST'
	result2 = urllib2.urlopen(request2)
	serialized_data_2 = io.BytesIO(result2.read())
	print serialized_data_2
	return HttpResponse(json.dumps({"message":"Successful"}), content_type="application/json")

    except Exception as e:
	print "Exception updateDispatchVerificationtaskprocess--> :: %s" % e
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
	
