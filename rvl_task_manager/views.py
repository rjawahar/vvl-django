from   django.core.context_processors 	import csrf
from   django.shortcuts 		        import render_to_response, redirect
from   django.contrib.auth 		        import authenticate, login
from   django.contrib.auth.decorators 	import login_required
from   django.contrib.auth.models 	    import User, Group

import urllib2
import urlparse
import requests
from   urlparse				            import parse_qsl, urlparse
from   django.core.urlresolvers		    import reverse
from   django.views.decorators.csrf 	import csrf_protect, csrf_exempt
from   django.template 			        import loader, RequestContext
from   django.views.decorators.http 	import require_GET, require_POST
from   django.http 			            import HttpResponse, HttpResponseBadRequest, \
                                        HttpResponseRedirect, HttpResponseForbidden, HttpResponseNotFound,\
                                        HttpResponseServerError
#DEEP COPY :
import copy 

#AVRO
import functools
import json
import psycopg2
from   uuid 		import uuid4 as uuid

import io
import os.path
import avro.schema
import avro.io   
from   avro.io 	   	    import validate
from   avro.io 	   	    import AvroTypeException
from   avro 	   	    import schema, datafile, io
from   avro.datafile 	import DataFileReader, DataFileWriter
from   avro.io 	   	    import DatumReader, DatumWriter
import pprint

#REST CLIENT
import restClient
from restClient import restclientURL

#/*For image*/
from   PIL 		import Image
import StringIO
import re
 
#/*For Data From Settings*/ 
from   django.conf 	        import settings
from   django.http 		    import *
from   django.shortcuts		import render_to_response, redirect, render
import io

import models
from models import loan_amount_master, adm_level, product_def, location_master, territory_master, product_territory_map, locaton_prod_territory_map, locaton_territory_hierrarchy,user_location_map, location_hierarchy_group,location_hierarchy_group_location_territory_hierrarchy_map,location_map_location_hierarchy_group

import logging
import sys
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from collections import OrderedDict
except ImportError:
    # In Python version older than 2.7 use simplejson,
    # as it is already required by avro.
    from simplejson.ordered_dict import OrderedDict

#AbstractUser
#============>
from models import adm_level, product_def, location_master, territory_master, product_territory_map, locaton_prod_territory_map, locaton_territory_hierrarchy

@csrf_exempt    
def LoadState(request):
    logger.info("Entering LoadState(request): USER --> "+str(request.user))
    cntryId = json.loads(request.body)
    stateValue = state.objects.filter(country_id=cntryId['country_id']).values_list('id','state_code')
    response = {"data": dict(stateValue) }
    logger.info("Exiting LoadState(request): USER --> "+str(request.user))
    return HttpResponse( json.dumps( response ), content_type="application/json" )	

@csrf_exempt    
def LoadDist(request):
    logger.info("Entering LoadDist(request): USER --> "+str(request.user))
    stId = json.loads(request.body)
    DistValue = district.objects.filter(state_id=stId['state_id']).values_list('id','district_code')
    response = {"data": dict(DistValue) }
    logger.info("Exiting LoadDist(request): USER --> "+str(request.user))
    return HttpResponse( json.dumps( response ), content_type="application/json" )	    
    
@csrf_exempt    
def LoadLocation(request):
    logger.info("Entering LoadLocation(request): USER --> "+str(request.user))
    TerritoryId = json.loads(request.body)
    LocValue = locaton_territory_hierrarchy.objects.filter(territory_id=TerritoryId['territory_id']).values_list('territory_id','location_name')
    data = {}
    for index in range(len(LocValue)):
        data[index] = LocValue[index][1] 
    
    response = {"data": data }
    logger.info("Exiting LoadLocation(request): USER --> "+str(request.user))
    return HttpResponse( json.dumps( response ), content_type="application/json" )
    
    
#LoginView:
#==========>
def loginview(request):
    logger.info("Entering LoginView.. ")
    c = {}
    c.update(csrf(request))
    logger.info("Exiting LoginView....")
    return render_to_response('login.html', c)

#Auth and Login:
#===============>
def auth_and_login(request, onsuccess='/tasks/', onfail='/login/'):
    logger.info("Entering auth_and_login view: "+request.POST['username'])
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None:
        login(request, user)
        logger.info(request.POST['username']+" has logged In successfully")
        logger.info("Exiting auth_and_login view: "+request.POST['username'])
        return redirect(onsuccess)
    else:
        logger.error("Login Fails!!   "+ request.POST['username'] +" is not an authorized user")
        logger.info("Exiting auth_and_login view: "+request.POST['username'])
        return redirect(onfail)  
        

#************************** CODE STARTS FROM HERE *******************************
#Task page where All User task or Group Task are Listed:
#=======================================================>
@login_required(login_url='/login/')
def tasks(request):
    logger.info("Entering tasks(request): USER ->"+str(request.user))   
    
    if request.META.has_key('REMOTE_ADDR'):
    	logger.info("request.META['REMOTE_ADDR']")
    	logger.info(request.META['REMOTE_ADDR'])
    	
    context       = RequestContext(request)
    context.user  = request.user

    #result = getLocationCode(request,str(request.user))
    #print "location details"
    #print result

    groups 	  = request.user.groups.values_list('name',flat=True)  
    
    logger.info("Exiting tasks(request): USER ->"+str(request.user))    
    return render_to_response("tasks.html", { 'user':context.user, 'role':groups }, context_instance=RequestContext(request))

    
#VVL Forms Adding a Data:
#========================>
@login_required(login_url='/login/')
def vvlForms(request):
    logger.info("Entering vvlForms View : USER ->"+str(request.user))

    context      = RequestContext(request)
    context.user = request.user
    user	     = request.user
    role	     = ''
    token 	     = ''
    try:	
        context.user  = request.user
        loanAmountQueryData = loan_amount_master.objects.all()
        logger.info("Exiting vvlForms view: USER ->"+str(request.user))
	print "loanAmountQueryData" 
	print loanAmountQueryData 

        return render_to_response("forms.html", { 'user':user, 'role':role, 'loanAmountOptions': loanAmountQueryData }, context_instance=RequestContext(request))
        
    except Exception as e:
    #except loan_amount_master.DoesNotExist as e:
        logger.error("Exception raised in vvlForms View  ---> %s" %e)
        return

  
#Get Member id for a processID:
#=============================>
def getMemberId(request, id):
    try:
        logger.info("Entering getMemberId(request, id) : USER ->"+str(request.user))
        url = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/process-instance/'+id+'/variables' 
        logger.info("URL :"+url)
        
        request1        = urllib2.Request(url)
        request1.add_header('Content-Type', 'application/json')
        result	        = urllib2.urlopen(request1)
        serialized_data = result.read()
        serialized_data = json.loads(serialized_data)
        serialized_data["message"] = "Successful"	
        logger.info("Exiting getMemberId(request, id) : USER ->"+str(request.user))
        return HttpResponse(json.dumps(serialized_data), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in getMemberId(request, id) : ---> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


# Reading a VVL DATA According to the Task:
#=========================================>
@login_required(login_url='/login/')	
def vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId):
    logger.info("Entering vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId) : USER -> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    alf_token 	 = ''
    responseData = {}
    groupName    = ''
    
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    if taskName not in json.loads(settings.TASK_ALLOWED):  
	         return render_to_response('unauthorised.html', {})
	
        try:    
            url_ALFRESCO 	     = 'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/login'
            logger.info("ALFRESCO URL :"+url_ALFRESCO )
            data_ALFRESCO  	     = '{"username":"'+settings.ALF_USER+'","password":"'+settings.ALF_PWD+'"}'
            request1_ALFRESCO    = urllib2.Request(url_ALFRESCO, data_ALFRESCO )
            request1_ALFRESCO.add_header('Content-Type', 'application/json')
            result_ALFRESCO	     = urllib2.urlopen(request1_ALFRESCO)
            serialized_data_ALFRESCO = result_ALFRESCO.read()
    
            szld_data_ALFRESCO = json.loads(serialized_data_ALFRESCO)
            alf_token	       = szld_data_ALFRESCO['data']['ticket']
                
        except Exception as e:
            logger.error("Exception raised in vvlFormsRead view - alfresco read URL --> response of read details through avro and changing the names of the user id to names  ---> %s" %e)
            
        context.user  = request.user
        prcID 	 = processid
        taskId 	 = taskid
        memberId = memberId
        loanId 	 = loanid
        chequeId = chequeId
        
        loanAmountQueryData = loan_amount_master.objects.all()
        
        #Template Name mapping:
        templateName = {
            "Resident Verification"		    : "residentVerification.html"	    ,
            "Cibil Request Failure"		    : "cibilRequestFailure.html"	    ,
            "Resolve Query"			    : "resolveQuery.html"		    ,
            "Business Verification"		    : "businessVerification.html"	    ,		
            "Assess Verification Report"	    : "assessVerificationReport.html"       ,
            "CIBIL Verfication"		            : "cibilVerfication.html"	            ,
            "Rework Business Verification"	    : "readBusinessForm.html"	            ,
            "Rework Resident Verification"	    : "readResidentForm.html"	            ,
            "Upload Doc"			    : "uploadDocuments.html"                ,
            "Verify Scan Docs"		            : "uploadDocumentsRead.html"            ,		
            "Reupload Documents"                    : "uploadDocuments.html"                ,
            "Despatch Documents to CO"              : "despatchChequeToCo.html"             ,

            "Customer Creation Failure"	            : "CustomerCreationFailure.html"        ,                    
            "Loan Creation Failure"	            : "LoanCreationFailure.html"            ,
            "LOS Creation Failure"		    : "LOSCreationFailure.html"             ,       
    
            "Check Documents"                       : "despatchChequeToCoRead.html"         ,
            "Redespatch Documents to CO"            : "despatchChequeToCo.html"             ,           
            "Prepare Cheque"    		    : "BookLoanandPrepareCheque.html"       ,
            "Send Cheque"			    : "sendCheque.html"		            ,
            "Disburse Chq and Collect Pre- EMI Chq" : "disburseCheque.html"                 ,
            "Send Chq to CO"		            : "SendChequetoCorporateOffice.html"    , 
            "memberDetails"		            : "memberDetails.html" 
        }
        #Request mapping array:
        mlcomposite  	= [ "memberDetails", "Resident Verification","Business Verification", "Assess Verification Report", "CIBIL Verfication", "Upload Doc", "Book Loan & Prepare Cheque","Loan Creation Failure","LOS Creation Failure", "Cibil Request Failure", "Customer Creation Failure", "Rework Resident Verification", "Rework Business Verification", "Send Cheque"]
    
        dispatch 	    = [ "ReDispatch Physical Document", "Verify Physical Document", 'Acknowledge Cheque' ]
        loan 		    = [ "Approve Loan Cheque", "Dispatch Loan Cheque" ]
        BusinessVfct	= [ "Business Verification", "Assess Verification Report", "Rework Business Verification"]
        ResidentVfct	= [ "Resident Verification", "Assess Verification Report", "Rework Resident Verification" ]
        uploadDocVf     = [ "Verify Scan Docs"          ,
                            "Reupload Documents"        ,
                            "CIBIL Verfication"         ,
                            "Cibil Request Failure"     ,
                            "Resolve Query"             ,
                            #"Rework Resident Verification" ,
                            "Rework Business Verification" , 
                            #"Resident Verification"     ,
                            "Business Verification"     , 
                            "Assess Verification Report",
                            "Upload Doc"                ,
                            "Customer Creation Failure" ,
                            "Loan Creation Failure"     ,
			    "memberDetails"		,	
                            "LOS Creation Failure"]
                      
        despathcDocVf   = [ "Check Documents", "Redespatch Documents to CO" ]	
        preCheque	    = [ "Send Cheque", "Disburse Chq and Collect Pre EMI Chq", "Disburse Chq and Collect Pre- EMI Chq" ]
        chequeToCo	    = [ "Send Chq to CO" ]

        #Two Data At The Same Time:
        verificationGrp = [ "Assess Verification Report" ]

        url 		    = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readmlcomposite/mlcomposite/'+memberId+'/'+loanid+''
        response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlcompositeschema.avsc").read() )
        
        GrpUrl_Res 	    = ''
        Res_resp_schema = ''
        
        GrpUrl_Biz 	    = ''
        Biz_resp_schema = ''	
        
        docurl          = ''
        doc_resp_schema = ''
    
        despUrl          = ''
        desp_resp_schema = ''
        
        pre_url		        = ''	
        pre_response_schema = ''

        send_chq_Co_url		        = ''	
        send_chq_Co_response_schema = ''	
        
        # for Reading Form Input values of Dispatch:
        if any(taskName in m for m in dispatch):
           url		       = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readphydoccheqdisp/dcphysical/'+memberId+'/'+loanid+''	
           response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"phydoccheqschema.avsc").read() )
    
        # for Reading Form Input values of Cheque Details:
        if any(taskName in m for m in loan):
           url		       = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readchequedet/cdetail/'+str(memberId)+'/'+str(loanId)+'/'+str(chequeId)+''
           response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"chequedetailschema.avsc").read() )
               
        # for Reading Form Input values About a Member with Member id and loan Id:
        if any(taskName in m for m in mlcomposite):
           url 		       = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readmlcomposite/mlcomposite/'+memberId+'/'+loanid+''
           response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"mlcompositeschema.avsc" ).read() )

        # Verfication Member id and loan Id:
        if any(taskName in m for m in ResidentVfct):
           GrpUrl_Res 	   = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readresident/resiverification/details/'+memberId+'/'+loanid+''
           Res_resp_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"residenceverificationschema.avsc" ).read() )	   
    
        if any(taskName in m for m in BusinessVfct):
           GrpUrl_Biz 	   = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readbusiness/bizverification/details/'+memberId+'/'+loanid+''
           Biz_resp_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"businessverificationschema.avsc" ).read() )	              
    
        if any(taskName in m for m in uploadDocVf):
           docurl	       = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readupdoc/uploaddocs/'+memberId+'/'+loanId+''
           doc_resp_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"uploaddocschema.avsc").read() )
                      
        if any(taskName in m for m in despathcDocVf):
           despUrl	        = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readphydoccheqdisp/dcphysical/'+memberId+'/'+loanid+''
           desp_resp_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"dispatchdocumentschema.avsc").read() )
                          
        if any(taskName in m for m in preCheque):                	
           pre_url 	           = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readpreparecheque/preparechek/'+memberId+'/'+loanid+''
           pre_response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"preparechequeschema.avsc").read() )                            
                          
        if any(taskName in m for m in chequeToCo):                         
           send_chq_Co_url 	           = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readdispre/disbursepreemi/'+memberId+'/'+loanid+''
           send_chq_Co_response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"disburseandcollectpreemichequeschema.avsc").read() )
                          
        response      = ''
        responseData3 = ''

        try:
            # Data Request and send to avro for checking data:
            try:
                import io	    
                #if any(taskName in m for m in mlcomposite):	    
                logger.info("URL :"+url)
                request1        = urllib2.Request(url)
                request1.add_header('Content-Type', 'avro/binary')
                result1         = urllib2.urlopen(request1)
                serialized_data = io.BytesIO(result1.read())
    
                #Decoding in Avro:	
                decoder 	    = avro.io.BinaryDecoder(serialized_data)
                reader 	 	    = avro.io.DatumReader(response_schema)
                response 	    = reader.read(decoder)
                responseData 	= json.loads(json.dumps(response))
                
		#Added To Restrict User Visibility Mainly for FIELD USER():
	        if groupName not in json.loads(settings.GRP_ALLOWED):
		    if taskName in json.loads(settings.TASK_ALLOWED):  
		        responseValidArr = ['memberid','loanid','firstname','current_door_no','current_street_name','current_location_name','current_pincode',
						'biz_office_address_mobile_number','biz_nature','Medicals','biz_no','biz_street_name','biz_location_name','mobile_number',
						'biz_door_no','biz_pincode','biz_no_of_yrs','biz_location','rent_pay_month','mlValidationArray','live_with',
						'no_of_child_above17','no_of_child_below17','middlename', 'lastname']

		        if responseData.has_key('mlcompositeArray'):
		            if  len(responseData['mlcompositeArray']) > 0:	
		    	        newData = {'mlcompositeArray':[{}]}
		    	        for val in responseValidArr:
			            mlcompositeData = responseData['mlcompositeArray'][0]
		    	            if mlcompositeData.has_key(val):	 	
			     	         newData['mlcompositeArray'][0][val] = mlcompositeData[val]			

			        responseData =newData

                #Only For BusinessVfct read :
                if any(taskName in m for m in BusinessVfct):
                    
                    logger.info("Inside BusinessVfct block - URL : "+GrpUrl_Biz)
                    request_biz        = urllib2.Request(GrpUrl_Biz)
                    request_biz.add_header('Content-Type', 'avro/binary')
                    result_biz         = urllib2.urlopen(request_biz)
                    serialized_data_biz= io.BytesIO(result_biz.read())
        
                    #Decoding in Avro:	
                    decoder_biz 	 = avro.io.BinaryDecoder(serialized_data_biz)
                    reader_biz 	     = avro.io.DatumReader(Biz_resp_schema)
                    response_biz 	 = reader_biz.read(decoder_biz)
                    responseData_biz = json.loads(json.dumps(response_biz))
                    if responseData_biz.has_key('businessVerificationArray'):
                        responseData['businessVerificationArray'] = responseData_biz['businessVerificationArray']
                        
                #Only For ResidentVfct :
                if any(taskName in m for m in ResidentVfct):
                
                    logger.info("Inside ResidentVfct block - URL:  "+GrpUrl_Res)
                    request_Res        = urllib2.Request(GrpUrl_Res)
                    request_Res.add_header('Content-Type', 'avro/binary')
                    result_Res         = urllib2.urlopen(request_Res)
                    serialized_data_Res= io.BytesIO(result_Res.read())
        
                    #Decoding in Avro:	
                    decoder_Res 	 = avro.io.BinaryDecoder(serialized_data_Res)
                    reader_Res 	     = avro.io.DatumReader(Res_resp_schema)
                    response_Res 	 = reader_Res.read(decoder_Res)
                    responseData_Res = json.loads(json.dumps(response_Res))	
                    if responseData_Res.has_key('residentVerificationArray'):
                        responseData['residentVerificationArray'] = responseData_Res['residentVerificationArray']
                        
                #Only For uploadDocVf :
                if any(taskName in m for m in uploadDocVf):
                
                    logger.info("Inside uploadDocVf block - URL:  "+docurl)	
                    request_doc        = urllib2.Request(docurl)
                    request_doc.add_header('Content-Type', 'avro/binary')
                    result_doc         = urllib2.urlopen(request_doc)
                    serialized_data_doc= io.BytesIO(result_doc.read())
                
                    #Decoding in Avro:	
                    decoder_doc 	    = avro.io.BinaryDecoder(serialized_data_doc)
                    reader_doc 	 = avro.io.DatumReader(doc_resp_schema)
                    response_doc 	    = reader_doc.read(decoder_doc)
                    responseData_doc    = json.loads(json.dumps(response_doc))	
                    if responseData_doc.has_key('updocArray'):
                        responseData['updocArray'] = responseData_doc['updocArray'] 
    
                #Only For ResidentVfct :
                if any(taskName in m for m in despathcDocVf):
                
                    logger.info("Inside despathcDocVf block - URL:  "+despUrl)
                    request_desp        = urllib2.Request(despUrl)
                    request_desp.add_header('Content-Type', 'avro/binary')
                    result_desp         = urllib2.urlopen(request_desp)
                    serialized_data_desp= io.BytesIO(result_desp.read())
        
                    #Decoding in Avro:	
                    decoder_desp 	    = avro.io.BinaryDecoder(serialized_data_desp)
                    reader_desp 	    = avro.io.DatumReader(desp_resp_schema)
                    response_desp 	    = reader_desp.read(decoder_desp)
                    responseData_desp   = json.loads(json.dumps(response_desp))	
                    if responseData_desp.has_key('dcphysicalArray'):
                        responseData['dcphysicalArray'] = responseData_desp['dcphysicalArray'] 	

                #Only For preCheque :
                if any(taskName in m for m in preCheque):
                                                            
                    #For Residence /**/
                    logger.info("Inside preCheque block - URL: "+pre_url)
                    request_pre        = urllib2.Request(pre_url)
                    request_pre.add_header('Content-Type', 'avro/binary')
                    result_pre         = urllib2.urlopen(request_pre)
                    serialized_data_pre= io.BytesIO(result_pre.read())
        
                    #Decoding in Avro:	
                    decoder_pre 	    = avro.io.BinaryDecoder(serialized_data_pre)
                    reader_pre 	        = avro.io.DatumReader(pre_response_schema)
                    response_pre 	    = reader_pre.read(decoder_pre)
                    responseData_pre    = json.loads(json.dumps(response_pre))	
                    responseData['PrepareCheque'] = responseData_pre

                #Only For chequeToCo :
                if any(taskName in m for m in chequeToCo):
                            
                    #For chequeToCo /**/
                    logger.info("Inside chequeToCo block - URL:  "+send_chq_Co_url)	
                    request_send_chq_Co        = urllib2.Request(send_chq_Co_url	)
                    request_send_chq_Co.add_header('Content-Type', 'avro/binary')
                    result_send_chq_Co         = urllib2.urlopen(request_send_chq_Co)
                    serialized_data_send_chq_Co= io.BytesIO(result_send_chq_Co.read())
        
                    #Decoding in Avro:	
                    decoder_send_chq_Co 	       = avro.io.BinaryDecoder(serialized_data_send_chq_Co)
                    reader_send_chq_Co 	           = avro.io.DatumReader(send_chq_Co_response_schema)
                    response_send_chq_Co 	       = reader_send_chq_Co.read(decoder_send_chq_Co)
                    responseData_send_chq_Co       = json.loads(json.dumps(response_send_chq_Co))	
                    responseData['sendChequeToCo'] = responseData_send_chq_Co
                    
            except Exception as e:
                logger.error("Exception raised in vvlFormsRead view --> response of read details through avro and changing the names of the user id to names : %s" %e)

            serialized_data_process = ''	
            # Getting the Process Details about the Task:
            try:
                url2 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/process-instance/'+processid+'/variables'
                logger.info("Getting process details - URL :"+url2)

                request2 		        = urllib2.Request(url2)
                request2.add_header('Content-Type', 'application/json')
                result2 		        = urllib2.urlopen(request2)
                serialized_data_process = json.loads(result2.read())
    
                context.memberDetails   = json.dumps(response).replace("'", "")
                context.process 	= json.dumps(serialized_data_process).replace("'", "")
                context.processId 	= processid	

                logger.info("Exiting vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId): USER ->"+str(request.user))
                return render_to_response(templateName[taskName],  {'masterData': responseData3, 'alf_token': alf_token, 'taskName': taskName,'memberDetails':json.dumps(responseData).replace("\n", " ").replace("'", ""),'processId': processid, 'memberId': memberId, 'loanId': loanId, 'user': request.user, 'userId': request.user, 'process': json.dumps(serialized_data_process).replace("'", "").replace("\n", " ") ,'taskId': taskId,'loanAmountOptions': loanAmountQueryData},context_instance=RequestContext(request))

            except Exception as e:
                logger.error("Exception raised in vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId): %s" %e)
		return render_to_response(templateName[taskName],  {'masterData': responseData3, 'alf_token': alf_token, 'taskName': taskName,'memberDetails':json.dumps(responseData).replace("\n", " ").replace("'", ""),'processId': processid, 'memberId': memberId, 'loanId': loanId, 'user': request.user, 'userId': request.user, 'process': '' ,'taskId': taskId,'loanAmountOptions': loanAmountQueryData},context_instance=RequestContext(request))

	    
            context.memberDetails  = json.dumps( response )
            context.process 	   = json.dumps( serialized_data_process )
            context.processId 	   = processid	

            # this response if for the exception:
            logger.info("Exiting vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId): USER ->"+str(request.user))		
            return render_to_response("formRead.html",  {'memberDetails':json.dumps( response ),'processId': processid,\
                                                         'process': json.dumps( serialized_data_process ) ,'taskId': taskId,'loanAmountOptions': loanAmountQueryData },\
                                                         context_instance=RequestContext( request ) )
        except Exception as e:
            logger.error("Exception raised in vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId) --> response of Member creation API reader - api response 1 %s" %e)
            return render_to_response( "formRead.html", context, context_instance = RequestContext( request ) )
    
    except Exception as e:
        logger.error("Exception raised in vvlFormsRead(request, memberId, loanid, processid, taskid, taskName, chequeId) --> Main %s" %e)
        return

def getHistory(request, id):
    try:
        logger.info("Entering getHistory(request,id) : USER ->"+str(request.user))
        url         = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance?processInstanceId='+str(id)
        logger.info("URL for getting process history : "+url)
        request1    = urllib2.Request(url)
        request1.add_header('Content-Type', 'application/json')
        result	    = urllib2.urlopen(request1)
        serialized_data = result.read()
        
        logger.info("Exiting getHistory(request,id) : USER ->"+str(request.user))
        return HttpResponse(json.dumps(serialized_data), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in getHistory(request,id) : %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

def readMLValidationData(request,memberid,loanid):
    try:
        logger.info("Entering readMLValidationData(request,memberid,loanid): USER ->"+str(request.user))
        url 		   = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readmlv/mlvalidation/'+memberid+'/'+loanid
        logger.info("URL for getting comments : "+url)
        response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"mlvalidationschema.avsc" ).read() )
    
        request1        = urllib2.Request(url)
        request1.add_header('Content-Type', 'avro/binary')
        result1         = urllib2.urlopen(request1)
        serialized_data = io.BytesIO(result1.read())

        #Decoding in Avro:	
        decoder 	    = avro.io.BinaryDecoder(serialized_data)
        reader 	 	    = avro.io.DatumReader(response_schema)
        response 	    = reader.read(decoder)
        responseData 	= json.loads(json.dumps(response))

	print responseData                

        logger.info("Exiting readMLValidationData(request,memberid,loanid): USER ->"+str(request.user))
        return HttpResponse(json.dumps(responseData), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in readMLValidationData(request,memberid,loanid): %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


def filterByProVar(request):
    logger.info("Entering filterByProVar(request): USER --> "+str(request.user))
    territoryLevel  	= ""
    proVarObj		= {}
    proVarArrString 	= ""
    territoryLocCode	= ""
    territoryLocName	= ""
    
    try:
    	#Changes done on 05/01/2017 - Vickram
    	#Changes===============================>
        user	    = request.user
        userId 	    = request.user.id  # User Id
	groups 	= request.user.groups.values_list('name', flat=True)
        territoryId = user_location_map.objects.filter(username=user).values_list('territory_id', flat=True) #Territory Id

        #substituting the user id in location_map_location_hierarchy_group - table to get location hierarchy group id
        locationHGroupIdFilter = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId ).values_list('location_hierarchy_group_id_id' , flat=True)

	#substituting the loc_hgrp_id in location_hierarchy_group_location_territory_hierrarchy_map - table to get location territory hierarchy id
	queryset = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=locationHGroupIdFilter).values_list('location_territory_hierarchy_id_id', flat=True )
        
        if len(territoryId) > 0:
            territoryLevel 	= territoryId[0]
            proVarObj['level']	= territoryLevel    
        else:
            territoryLevel 	= 0
            proVarObj['level']	= 0

        if len(queryset) > 0:
            #substituting the location territory id in locaton_territory_hierrarchy table to get location details such as loc_terri_code, location_name etc            
            locationCode        = locaton_territory_hierrarchy.objects.filter(id__in=queryset).values_list('loc_terri_code' ,flat=True)
            locationName        = locaton_territory_hierrarchy.objects.filter(id__in=queryset).values_list('location_name'  ,flat=True)
	print 1
         
        if locationCode != None or len(locationName) != 0:     
            if territoryLevel > 0:      
		#Added
                if territoryLevel == 1 and 'Field' in groups:		
	            loaction_id    = locaton_territory_hierrarchy.objects.filter(id__in=queryset).values_list('loaction_id' ,flat=True)
                    locationMaster = location_master.objects.filter(id=loaction_id).values_list('location_code',flat=True)
                    stateCodeArr   = []
                    for index, stateCode in enumerate(locationMaster ):
                    	stateCodeArr.append({"name": "stateCode", "value": str(stateCode), "operator": "eq"   })                    
                    proVarArrString +=json.dumps(stateCodeArr)		      	
      
                if territoryLevel == 2:
                    regionNameArr = []
                    for index, regionName in enumerate(locationName):
                    	regionNameArr.append({"name": "regionName", "value": str(regionName), "operator": "eq"   })                    
		    proVarArrString +=json.dumps(regionNameArr)
                elif territoryLevel == 3:
                    clusterOfficeCode = []
                    for index, clusterOfficeCodeData in enumerate(locationCode):
                      	 clusterOfficeCode.append({"name": "clusterOfficeCode", "value": str(clusterOfficeCodeData), "operator": "eq"   })
                    proVarArrString +=json.dumps(clusterOfficeCode)
                elif territoryLevel == 4:
                    clusterCenterCode = []                
                    for index, clusterCenterCodeData in enumerate(locationCode):
                    	clusterCenterCode.append({"name": "clusterCenterCode", "value": str(clusterCenterCodeData), "operator": "eq"  })	
                    proVarArrString +=json.dumps(clusterCenterCode)                    	
                    
    except Exception as e:
        logger.error("Exception raised in filterByProVar(request)  : --> %s" %e)

    proVarObj['processVariables'] = proVarArrString
    logger.info("Exiting filterByProVar(request): USER --> "+str(request.user))
    return proVarObj	    	


def taskList_old(request):#changed On 05-06-2017

    logger.info("Entering taskList(request): USER --> "+str( request.user ))
    role	    = ''
    tokenId 	    = ''
    user 	    = str(request.user)    
    processVariable = ''
    
  
    #Getting location details of the user	
    processVariable = filterByProVar(request)
    data_myTask     = []
    data_grpTask    = []
    
    logger.info("processVariable:" )
    logger.info(processVariable)
        
    try:	
        #Added TO Check with SSO:	
        groupNameList =  request.user.groups.values_list('name',flat=True)	
    
        #GROUP TASK DATA:	
        groupArr = [] 
        group    = ''
        grpNme   = ''
        
        for grp in list(groupNameList):
            group = str(grp) + group	
            groupArr.append(grp)
            grpNme = str(grp)
        
        print "groupArr"
        print groupArr
        
        #Output Array Data:
        processInstancesID  = [] 
        myTask_procInstKey = {}
        grpTask_procInstKey = {} 
        
        #MY TASK DATA:
        data_obj_myTask 	= { "assignee" : ""+ str( request.user ) +"" }
    
        if len(processVariable['processVariables']) > 0:
            data_obj_myTask ['processVariables'] = json.loads(processVariable['processVariables'])
        
        #MY TASK URL:	
        url_myTask 		= 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task?'
        logger.info("My TaskList URL:"+	url_myTask)	
    
        r_myTask 		= urllib2.Request( url_myTask , json.dumps(data_obj_myTask) ,headers = { 'Content-Type' : 'application/json' })
        serialized_data_myTask  = json.loads( urllib2.urlopen( r_myTask ).read() ) 
        
        for data in serialized_data_myTask:
            processInstancesID.append(data["processInstanceId"])
            myTask_procInstKey[data["processInstanceId"]] = data
        
        #Body Data With Group List for Getting the Task Assigned for that entire group and not assigned to anyone else: 	
        grp_body_cont 	   	= { "unassigned" : "true" , "candidateGroups" : groupArr }
        
        if len(processVariable['processVariables']) > 0:
           grp_body_cont['processVariables'] = json.loads(processVariable['processVariables'])
            
        #URL of Group:	
        url_grpTask	   	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task?firstResult=0'
        logger.info("Group TaskList URL:"+url_grpTask)
	logger.info(grp_body_cont)	
        
        r_grpTask 		= urllib2.Request(url_grpTask, json.dumps(grp_body_cont) ,headers={'Content-Type': 'application/json'})
        serialized_data_grpTask = json.loads(urllib2.urlopen(r_grpTask).read()) #+ serialized_data_grpTask	
        
        for data in serialized_data_grpTask:
            processInstancesID.append(data["processInstanceId"])
            grpTask_procInstKey[data["processInstanceId"]] = data
            
        processVar_url 	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/variable-instance'
        logger.info("URL to get process variable instances :"+processVar_url)	
        
        body_mytask_content 	= { "variableNameLike": "App_Mem_%" ,"processInstanceIdIn": processInstancesID}
        memberId_myTask 	= urllib2.Request( processVar_url ,json.dumps(body_mytask_content ),headers = { 'Content-Type' : 'application/json' })
        serialized_processVar	= json.loads( urllib2.urlopen( memberId_myTask ).read() ) 
        
        #Process Variable Instance:
        for data in serialized_processVar:
            if data["processInstanceId"] in myTask_procInstKey:
                myTask_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
                
            if data["processInstanceId"] in grpTask_procInstKey:
                grpTask_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]			
        #MyTask Assign:
        for myTaskData in myTask_procInstKey:
            data_myTask.append(myTask_procInstKey[myTaskData])
            
        #Group Task Assign:	
        for grpTaskData in grpTask_procInstKey:
            data_grpTask.append(grpTask_procInstKey[grpTaskData])		
        
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'myTask' 	 : data_myTask,
                      'grpTask'	 : data_grpTask,
                      'assignees': "",
                      'grp'	 : str( role ),
                      'tokenId'  : str( tokenId ),
                      "user"     : str(request.user)
                    }
        
        taskData 	= json.dumps(taskData)
        response 	= HttpResponse(taskData,content_type='text/plain')
        response['Content-Length'] 	= len( taskData )
        logger.info("Exiting taskList(request): USER --> "+str( request.user ))
        return response

    except Exception as e:
        logger.error("Exception raised in taskList(request): --> %s" %e)
        return  
  

def taskList(request):
    logger.info("Entering taskList(request): USER --> "+str( request.user ))
    role	    = ''
    tokenId 	    = ''
    user 	    = str(request.user)    
    processVariable = ''
    
    qresult = getLocationCode(request,str(request.user))
    print "qresult :::::" 
    print qresult
    
    #Getting location details of the user	
    processVariable = filterByProVar(request)
    data_myTask     = []
    data_grpTask    = []

    logger.info("processVariable:" )
    logger.info(processVariable)
        
    try:	
        #Added TO Check with SSO:	
        groupNameList =  request.user.groups.values_list('name',flat=True)	
    
        #GROUP TASK DATA:	
        groupArr = [] 
        group    = ''
        grpNme   = ''
        
        for grp in list(groupNameList):
            group = str(grp) + group	
            groupArr.append(grp)
            grpNme = str(grp)
        
        print "groupArr"
        print groupArr
        
        #Output Array Data:
        processInstancesID  = [] 
        myTask_procInstKey  = {}
        grpTask_procInstKey = {} 

        #checkList of Same ProcessInstance:
        myTaskCheckList  = {}
        grpTaskCheckList = {}
        
        #MY TASK DATA:
        data_obj_myTask 	= { "assignee" : ""+ str( request.user ) +"" }
    
        if len(processVariable['processVariables']) > 0:
            data_obj_myTask ['processVariables'] = json.loads(processVariable['processVariables'])
        
        #MY TASK URL:	
        url_myTask 		= 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task?'
        logger.info("My TaskList URL:"+	url_myTask)	
    
        r_myTask 		= urllib2.Request( url_myTask , json.dumps(data_obj_myTask) ,headers = { 'Content-Type' : 'application/json' })
        serialized_data_myTask  = json.loads( urllib2.urlopen( r_myTask ).read() ) 
        
        for data in serialized_data_myTask:
            processInstancesID.append(data["processInstanceId"])
            #myTask_procInstKey[data["processInstanceId"]] = data
            myTask_procInstKey[data["processInstanceId"]+"-"+data["name"]] = data

            if data["processInstanceId"] not in myTaskCheckList:
            	myTaskCheckList[data["processInstanceId"]] = [data]
            else:	
        	myTaskCheckList[data["processInstanceId"]].append(data)

        
        #Body Data With Group List for Getting the Task Assigned for that entire group and not assigned to anyone else: 	
        grp_body_cont 	   	= { "unassigned" : "true" , "candidateGroups" : groupArr }
        
        if len(processVariable['processVariables']) > 0:
           grp_body_cont['processVariables'] = json.loads(processVariable['processVariables'])
            
        #URL of Group:	
        url_grpTask	   	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task?firstResult=0'
        logger.info("Group TaskList URL:"+url_grpTask)	
       
        r_grpTask 		= urllib2.Request(url_grpTask, json.dumps(grp_body_cont) ,headers={'Content-Type': 'application/json'})
        serialized_data_grpTask = json.loads(urllib2.urlopen(r_grpTask).read()) #+ serialized_data_grpTask	
        
        for data in serialized_data_grpTask:
            processInstancesID.append(data["processInstanceId"])
            #grpTask_procInstKey[data["processInstanceId"]] = data
	    grpTask_procInstKey[data["processInstanceId"]+"-"+data["name"]] = data

            if data["processInstanceId"] not in grpTaskCheckList:
            	grpTaskCheckList[data["processInstanceId"]] = [data]
            else:	
        	grpTaskCheckList[data["processInstanceId"]].append(data)

            
        processVar_url 	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/variable-instance'
        logger.info("URL to get process variable instances :"+processVar_url)	
        
        body_mytask_content 	= { "variableNameLike": "App_Mem_%" ,"processInstanceIdIn": processInstancesID}
        memberId_myTask 	= urllib2.Request( processVar_url ,json.dumps(body_mytask_content ),headers = { 'Content-Type' : 'application/json' })
        serialized_processVar	= json.loads( urllib2.urlopen( memberId_myTask ).read() ) 
        
        #Process Variable Instance:
        for data in serialized_processVar:
            #if data["processInstanceId"] in myTask_procInstKey:
                #myTask_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]

            if data["processInstanceId"] in myTaskCheckList:            
            	for val in myTaskCheckList[data["processInstanceId"]]:
                    myTask_procInstKey[data["processInstanceId"]+'-'+val['name']][data["name"] ] = data["value"]
                
            #if data["processInstanceId"] in grpTask_procInstKey:
                #grpTask_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]	

            if data["processInstanceId"] in grpTaskCheckList:            
            	for val in grpTaskCheckList[data["processInstanceId"]]:
                    grpTask_procInstKey[data["processInstanceId"]+'-'+val['name']][data["name"] ] = data["value"]
		
        #MyTask Assign:
        for myTaskData in myTask_procInstKey:
            data_myTask.append(myTask_procInstKey[myTaskData])
            
        #Group Task Assign:	
        for grpTaskData in grpTask_procInstKey:
            data_grpTask.append(grpTask_procInstKey[grpTaskData])		
        
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'myTask' 	 : data_myTask,
                      'grpTask'	 : data_grpTask,
                      'assignees': "",
                      'grp'	 : str( role ),
                      'tokenId'  : str( tokenId ),
                      "user"     : str(request.user)
                    }
        
        taskData 	= json.dumps(taskData)
        response 	= HttpResponse(taskData,content_type='text/plain')
        response['Content-Length'] 	= len( taskData )
        logger.info("Exiting taskList(request): USER --> "+str( request.user ))
        return response

    except Exception as e:
        logger.error("Exception raised in taskList(request): --> %s" %e)
        return    


#For Claiming Or UnClaiming a Task:
#==================================>
@login_required(login_url='/login/')
def claim(request, id, name):
    logger.info("Entering  claim(request, id, name): USER-->"+str(request.user))	

    #claim	
    if name =="claim":	
        data_obj_claim = {"userId": str(request.user)}
        
        url_claim   = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+id+'/claim'
        logger.info("URL To claim a task: "+url_claim)
        
        r_claim     =  urllib2.Request(url_claim, json.dumps(data_obj_claim) , headers={'Content-Type': 'application/json'})
        serialized_data = urllib2.urlopen(r_claim).read()

    #Unclaim	
    if name =="unclaim":
        data_obj_Unclaim = {"userId": str(request.user)}
        
        url_Unclaim = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+id+'/unclaim'
        logger.info("URL To Unclaim a task : "+url_Unclaim)
        
        r_claim = urllib2.Request(url_Unclaim, json.dumps(data_obj_Unclaim) ,  headers={'Content-Type': 'application/json'})
        serialized_data = urllib2.urlopen(r_claim).read()

    response = taskList(request)
    logger.info("Exiting  claim(request, id, name): USER-->"+str(request.user))
    return response


#For Submiting a form for Update a Task:
#=======================================>
@csrf_exempt
@login_required(login_url='/login/')
def submitFormUpdate(request):
    logger.info("Entering submitFormUpdate view : USER --> "+str(request.user))
    context       = RequestContext(request)
    context.user  = request.user
    memberAddress = ''
    username	  = request.user
    
    try:	
        FORM_DATA = ''	
        if "form_data" in request.POST:
            formData        = request.POST["form_data"]
            memberAddress   = request.POST["MemberAddress"]
            FORM_DATA       = json.loads(formData)
        
        if "process" in request.POST:
            processupdate   = request.POST["process"]
            PROCESS_DATA    = json.loads(processupdate)
            
        if "taskid" in request.POST:
            task_id = request.POST["taskid"]
           
        #Change Image name and Location to Save:
        data 	      = updateImage(FORM_DATA, request)
        logger.info("Data from Updateimage : ")
        logger.info(data)
        #return  False
        
        schema 	      = avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlcompositeschema.avsc").read() )
        writer        = avro.io.DatumWriter(schema)
        bytes_writer  = io.BytesIO()
        encoder       = avro.io.BinaryEncoder(bytes_writer)
        writer.write( data , encoder)

        try:
            url 	    = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/updatemlcomposite/mlcomposite'
            logger.info("MLComposite - Update URL :"+url)
        
            byte_data 	    = bytes_writer.getvalue()
            request1  	    = urllib2.Request(url, bytes_writer.getvalue() )
            request1.add_header( 'Content-Type' , 'avro/binary' )
            request1.get_method = lambda: 'PUT'
            result1 	    = urllib2.urlopen(request1)
            serialized_data = io.BytesIO(result1.read())

            try:
                response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"responseschema.avsc" ).read() )	#response_schema)
                decoder 	= avro.io.BinaryDecoder( serialized_data )
                reader 		= avro.io.DatumReader( response_schema )
                response 	= reader.read( decoder )
                if response["status"] == "Successful":
                    response["message"] = "Success"

                memberId      = data["mlcompositeArray"][0]["memberid"]
                loanId        = data["mlcompositeArray"][0]["loanid"]	
                    
                firstName     = data["mlcompositeArray"][0]["firstname"]
                lastName      = data["mlcompositeArray"][0]["lastname"]
                memberName    = firstName+' '+lastName
                
                mobileNumber  = str(data["mlcompositeArray"][0]["mobile_number"])
                applicantInfo = str(memberId) +'@#'+ str(loanId) +'@#'+ memberName+'@#'+mobileNumber ;
        
                PROCESS_DATA["variables"]["App_Mem_Details"] = {"value" : ""+ str(applicantInfo)+""	,"type": "String" }
                PROCESS_DATA["variables"]["App_Mem_Address"] = {"value" : ""+ str(memberAddress)+""	,"type": "String" }

                if response['status'] == "Successful":	
                    updateTaskRework(PROCESS_DATA,task_id)
                else:
                    logger.info("Failed to insert the Data in DB")     
                     
                logger.info("Exiting submitFormUpdate view : USER --> "+str(username))     	 
                return HttpResponse( json.dumps( response ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in submitFormUpdate--> response of Member Update API reader : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in submitFormUpdate--> response of Member Update api Request : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

    except Exception as e:
        logger.error("Exception raised in submitFormUpdate : %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

def updateTaskRework(PROCESS_DATA,taskid):
    #TRY CATCH
    try:
        logger.info("Entering updateTaskRework(PROCESS_DATA,taskid) : ")
        bodyData 	= json.dumps(PROCESS_DATA)
        task_id     = taskid
        url 	  	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+task_id+'/complete'
        logger.info("URL to update a task : "+url)
        
        request1  	    = urllib2.Request(url, bodyData )
        request1.add_header('Content-Type', 'application/json')
        request1.get_method 	= lambda: 'POST'
        result1   	    = urllib2.urlopen(request1)
        serialized_data = result1.read()
        logger.info("Exiting updateTaskRework(PROCESS_DATA,taskid) :")
    except Exception as e:
        logger.error("Exception raised in updateTaskRework : %s" %e)


import boto
from boto.s3.key import Key
def updateImage(FORM_DATA, request):
    logger.info("Entering updateImage(FORM_DATA, request): USER-->"+str(request.user))
    try:
	import urllib, cStringIO 
	from PIL import Image 
        randomRef = uuid().hex 
        idProofArray = {}
        alfNodeArray = [] 
        indexDict = {}
        
        
        if "FileData" in request.POST:
	    FILE_DATA = json.loads(request.POST["FileData"])
	    for key in FILE_DATA:
		alfArrayNo = int(key)-1
		indexDict[FILE_DATA[key]] = int(alfArrayNo)
        
	fields 	  = {
			'file-1'  : 'biz_id_alf_node_ref',
			'file-2'  : 'biz_id_alf_node_ref1',
			'file-3-1'  : 'biz_address_fk_alf_node_ref_1',
			'file-3-2'  : 'biz_address_fk_alf_node_ref_2',
			'file-3-3'  : 'biz_address_fk_alf_node_ref_3',
			'file-3-4'  : 'biz_address_fk_alf_node_ref_4',
			'file-3'  : 'biz_address_fk_alf_node_ref',		
			'file-4'  : 'biz_address_fk_alf_node_ref1',
			'file-5'  : 'biz_address_fk_alf_node_ref2',		
			'file-6'  : 'biz_address_fk_alf_node_ref3',
			'file-5-1'  	: 'alf_node_ref_1',
			'file-6-1'  	: 'alf_node_ref1_1',
			'file-5-2'  	: 'alf_node_ref_2',
			'file-6-2'  	: 'alf_node_ref1_2',
			'file-5-3' 	: 'alf_node_ref_3',
			'file-6-3'  	: 'alf_node_ref1_3',
			'file-5-4' 	: 'alf_node_ref_4',
			'file-6-4'  	: 'alf_node_ref1_4',
			'file-5-5' 	: 'alf_node_ref_5',
			'file-6-5'  	: 'alf_node_ref1_5',
			'file-5-6' 	: 'alf_node_ref_6',
			'file-6-6'  	: 'alf_node_ref1_6',
			'file-7'  : 'current_document_url',
			'file-8'  : 'current_address_fk_alf_node_ref',
			'file-9'  : 'member_bank_fk_alf_node_ref',
			'file-10' : 'member_bank_fk_alf_node_ref1',
			'file-11' : 'ml_fk_alf_node_ref',
			'file-12' : 'family_member_with_residence_photo1',
			'file-12a' : 'family_member_with_residence_photo2',
			'file-12b' : 'family_member_with_residence_photo3',
			#/*Used for UPload Document Screen*/
			'file-13' : 'doc_url_1',
			'file-14' : 'doc_url_2',
			'file-15' : 'doc_url_3',
			'file-16' : 'doc_url_4',
			'file-17' : 'doc_url_5',
			'file-18' : 'doc_url_6',
			'file-19' : 'doc_url_7',
			'file-20' : 'doc_url_8',
			'file-21' : 'doc_url_9',
			'file-22' : 'doc_url_10',
			'file-23' : 'doc_url_11',
			'file-24' : 'doc_url_12',
			'file-25' : 'doc_url_13',
			'file-26' : 'doc_url_14',
			'file-27' : 'doc_url_15',
			'file-28' : 'doc_url_16',
			'file-29' : 'doc_url_17',
			'file-30' : 'doc_url_18',
			'file-31' : 'doc_url_19',
			'file-32' : 'doc_url_20',			
			'file-33' : 'doc_url_21',
			'file-34' : 'doc_url_22',
			'file-35' : 'doc_url_23',
			'file-36' : 'doc_url_24',
			'file-37' : 'doc_url_25',
			'file-38' : 'doc_url_26',
			'file-39' : 'doc_url_27',
			'file-40' : 'doc_url_28',
			'file-41' : 'doc_url_29',
			'file-42' : 'doc_url_30',
			'file-43' : 'doc_url_31',
			'file-44' : 'doc_url_32',
			'file-45' : 'doc_url_33',
			'file-46' : 'doc_url_34',
			'file-47' : 'doc_url_35',
			'file-48' : 'doc_url_36',
			'file-49' : 'doc_url_37',
			'file-50' : 'doc_url_38',
			'file-51' : 'doc_url_39',
			'file-52' : 'doc_url_40',
			'file-53' : 'doc_url_41',
			'file-54' : 'doc_url_42',
			'file-55' : 'doc_url_43',
			'file-56' : 'doc_url_44',
			'file-57' : 'doc_url_45',
			'file-58' : 'doc_url_46',
			'file-59' : 'doc_url_47',
			'file-60' : 'doc_url_48',
			'file-61' : 'doc_url_49',
			'file-62' : 'doc_url_50',
			'file-63' : 'applicant_with_shop_photo1',
			'file-63a' : 'applicant_with_shop_photo2',
			'file-63b' : 'applicant_with_shop_photo3'
			}
	objectArr = {
			'alf_node_ref_1' :'idProofArray',
			'alf_node_ref1_1':'idProofArray',
			'alf_node_ref_2' :'idProofArray',
			'alf_node_ref1_2':'idProofArray',
			'alf_node_ref_3' :'idProofArray',
			'alf_node_ref1_3':'idProofArray',
			'alf_node_ref_4' :'idProofArray',
			'alf_node_ref1_4':'idProofArray',
			'alf_node_ref_5' :'idProofArray',
			'alf_node_ref1_5':'idProofArray',
			'alf_node_ref_6' :'idProofArray',
			'alf_node_ref1_6':'idProofArray',
			'biz_address_fk_alf_node_ref_1' : 'alfNodeArray',
			'biz_address_fk_alf_node_ref_2' : 'alfNodeArray',
			'biz_address_fk_alf_node_ref_3' : 'alfNodeArray',
			'biz_address_fk_alf_node_ref_4' : 'alfNodeArray'									
			} 
	if request.FILES:
	    for filename, file in  request.FILES.iteritems():#request.FILES.keys()

		workSpace       = ''	        
		url 	        = "http://"+settings.API_IP_ALFRESCO+"/alfresco/service/api/upload"
		logger.info("URL to upload Image: "+url)
		
		auth 	        = (settings.ALF_USER, settings.ALF_PWD)
		multipart_obj   = request.FILES.get(filename, None)

		fileExtension   = multipart_obj.name.split('.')


		#/*************** S3 Bucket ********************/
		AWS_ACCESS_KEY_ID	= 'AKIAIXEUVSUUCI7R3YHQ'
		AWS_BUCKET_NAME 	= 'testingdocuments.mmfl.in'
		AWS_BUCKET_NAME 	= 'test-finwego-madura-dump'
		AWS_SECRET_ACCESS_KEY	= 'EhYyO09fGJtZkDxgRxcAcCCgsqv5gzyAfmOzGlSM'

		#setup the bucket
		c = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
		b = c.get_bucket(AWS_BUCKET_NAME, validate=True)

		#download the file
		#url = "http://en.wikipedia.org/static/images/project-logos/enwiki.png"
		#r = requests.get(url)
		#if r.status_code == 200:
		    #upload the file
		#bucket_name = 'test-finwego-madura-dump'
		#conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
		#bucket = conn.create_bucket(bucket_name,location=boto.s3.connection.Location.DEFAULT)


		memberFilename = FORM_DATA["mlcompositeArray"][0]["idProofArray"][0]["id_proof_type"]
		k = Key(b)
		k.key =  "member/"+memberFilename+"/"+multipart_obj.name
		#k.content_type = r.headers['content-type']
		k.set_contents_from_file(multipart_obj)
		print "uploaded into S3 Bucket"


		bucketFileNameAndLocation = "member/"+memberFilename+"/"+multipart_obj.name+""
		print bucketFileNameAndLocation
		plans_key = b.get_key(bucketFileNameAndLocation)
		plans_url = plans_key.generate_url(3600, query_auth=True, force_http=True)
		print plans_url	

		continue

		#/*************** S3 Bucket ********************/
		
		#Image Format File Extensions
		arr = ["jpeg", "jpg", "exif", "tiff", "gif", "bmp", "png"]
		#Renaming for Alfresco
		doc_file_name      = multipart_obj.name
		multipart_obj.name = randomRef+"-"+multipart_obj.name

		if fileExtension[1] in arr:
			img 	  = Image.open(multipart_obj)
			#img 	  = img.rotate(360)
			multipart_obj.seek(0)
			img.save(multipart_obj, "png")
			multipart_obj.seek(0)

	        files 	  = {'filedata': multipart_obj} 
		logger.info("File Name : "+filename)


		
		#data 	  = {"siteid": "madura", "containerid": "documentLibrary"}
		#r 	  = requests.post(url, files=files , data=data, auth=auth)
		
		#Result 	  = json.loads(r.text)
		#logger.info("Uploaded Image response parameters: ")
		#logger.info(Result)
		
		if(Result.has_key('nodeRef')):
		    workSpace	    = Result['nodeRef']
		    workSpace_wot_split = Result['nodeRef']			
		    workSpace_wt_split  = str(workSpace_wot_split).split('/')
		    
		    if len(workSpace_wt_split) > 2:
		        workSpace	= workSpace_wt_split[3]			
		
		#Update images into the server:		
		if "form_data" in request.POST:
		    if 'mlcompositeArray' in FORM_DATA:
		        if fields[filename] in FORM_DATA['mlcompositeArray'][0]:
		            FORM_DATA['mlcompositeArray'][0][fields[filename]] = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name
		            #FORM_DATA['mlcompositeArray'][0]["application_loan_amount"]

			if fields[filename] in objectArr:
			    if objectArr[fields[filename]] == "idProofArray":
			        if len(FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]]) > 0:
				    fieldsname_split = fields[filename].split('_')
				    id_split 	= fieldsname_split[len(fieldsname_split)-1]
				    arrayNo 	= int(id_split)-1
				    field_inp = fieldsname_split[0]+"_"+fieldsname_split[1]+"_"+fieldsname_split[2]
				    FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]][int(arrayNo)][field_inp] = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name  
				    idProofArray[int(arrayNo)] = (FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]][int(arrayNo)])
			    	
    				    
		    	    if objectArr[fields[filename]] == "alfNodeArray":
		       	        if len(FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]]) > 0:
				    fieldsname_split = fields[filename].split('_')
				    field_inp = fieldsname_split[3]+'_'+fieldsname_split[4]+'_'+fieldsname_split[5]
    				    FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]][indexDict[filename]][field_inp] = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name  
			       	    alfNodeArray.append(FORM_DATA['mlcompositeArray'][0][objectArr[fields[filename]]][indexDict[filename]])

		    if 'residentVerificationArray' in FORM_DATA:
		        if fields[filename] in FORM_DATA['residentVerificationArray'][0]:
		            FORM_DATA['residentVerificationArray'][0][fields[filename]] = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name  
		    
		    if 'businessVerificationArray' in FORM_DATA:
		        FORM_DATA['businessVerificationArray'][0]['distributorReferenceArray'][0][fields[filename]] = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name

		    if 'updocArray' in FORM_DATA:
			 fileNameStr = str(fields[filename])
			 docNum = 0
			 
			 if 'doc' in fileNameStr:
			    fileNameSplit = fileNameStr.split("doc_url_")
			    docNum = fileNameSplit[1]
			    docNum = int(docNum) - 1 
	    		    
			    if 'doc_url' in FORM_DATA['updocArray'][int(docNum)]:
			    	FORM_DATA['updocArray'][int(docNum)]['doc_url']  = bucketFileNameAndLocation#'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/node/content/workspace/SpacesStore/'+ workSpace+'/'+doc_file_name 
				FORM_DATA['updocArray'][int(docNum)]['doc_name'] = doc_file_name
				 
			    else:
				FORM_DATA['updocArray'][int(docNum)]['doc_type'] = 'noDoc'		     	 
			 
	# need to Convert data into JSON data  mlcompositeArray' in FORM_DATA
	if FORM_DATA.has_key('mlcompositeArray'):
	    if len(FORM_DATA['mlcompositeArray']) > 0:
	    	#ID PROOF:
	        if FORM_DATA['mlcompositeArray'][0].has_key('idProofArray'):
	            if len(FORM_DATA['mlcompositeArray'][0]['idProofArray']) > 0:
				            
	                if len(idProofArray.keys()) > 0:
	                    idProofArrayNew = []
	                    for key in  idProofArray.keys():
	                    	idProofArrayNew.append(idProofArray[key])
	                        FORM_DATA['mlcompositeArray'][0]['idProofArray'][key]= idProofArray[key]
	                        
		
	# need to Convert data into JSON data
	data = FORM_DATA
	return data
    except Exception as e:
        logger.error("Exception in updateImage(FORM_DATA, request): -->  %s" %e)
        errMsg  =   {}
        errMsg["message"]   = "Server down. Please try again after sometime."
        return
        #return render_to_response("forms.html",errMsg) 



# Adding a new Member with Details --> ADD FORM:
#===============================================>
@csrf_exempt
@login_required(login_url='/login/')
def submitFormAdd(request):
    logger.info("Entering submitFormAdd view : USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    alf_token	 = ''
	
    #Alfresco
    '''url = 'http://'+settings.API_IP_ALFRESCO+'/alfresco/s/api/login'
    logger.info("ALFRESCO Login URL :"+url)

    data 	           = '{"username":"'+settings.ALF_USER+'","password":"'+settings.ALF_PWD+'"}'
    request1 	       = urllib2.Request(url, data)
    request1.add_header('Content-Type', 'application/json')
    result	           = urllib2.urlopen(request1)
    serialized_data_ALFRESCO = result.read()
    szld_data_ALFRESCO = json.loads(serialized_data_ALFRESCO)
    alf_token	       = szld_data_ALFRESCO['data']['ticket']  '''
    
    logger.info("ALFRESCO TOKEN :"+alf_token )
    
    try:	
        FORM_DATA = ''	
        if "form_data" in request.POST:
            formData = request.POST["form_data"]
            FORM_DATA = json.loads(formData)

        #Saving Image function and defining a location to save IMAGES:	
        data = updateImage(FORM_DATA, request)
        logger.info("Data from UpdateImage :")
        logger.info(data)
        
        loanProductId = data["mlcompositeArray"][0]["application_loan_amount"]
        loanAmountTuple = loan_amount_master.objects.filter(loan_product_id=loanProductId).values_list('loan_amount')
        loanAmount = str(loanAmountTuple[0][0])
        
        data["mlcompositeArray"][0]["application_loan_amount"] = float(loanAmount)
    
        firstName     = ""
        lastName      = ""
        memberName    = ""
        memberAddress = ""
        mobileNumber  = ""
        applicantInfo = ""
    
        import io	
        #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
        schema   	    = avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlcompositeschema-new.avsc").read() )
        writer 		    = avro.io.DatumWriter(schema)
        bytes_writer 	    = io.BytesIO()
        encoder 	    = avro.io.BinaryEncoder(bytes_writer)
    
        #ENCODE DATA	
        writer.write( data , encoder)

        try:
            url 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlcomposite/mlcomposite'
            logger.info("MLComposite - Insert URL :"+url)
        
            byte_data 	= bytes_writer.getvalue()
            request1  	= urllib2.Request( url , bytes_writer.getvalue() )
            request1.add_header( 'Content-Type' , 'avro/binary' )
            request1.get_method 	= lambda: 'POST'
            result1 	= urllib2.urlopen( request1 )
            serialized_data = io.BytesIO( result1.read() )
	    print "got response"	

            try:
	    	print "got response 1"	
                response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                decoder 	= avro.io.BinaryDecoder(serialized_data)
                reader 		= avro.io.DatumReader(response_schema)
                response 	= reader.read(decoder)
                print "response"
                print response
                response["message"]  = "Success"
                distributorUid 	= str( request.user )
                appStatus 	= "New"
                memberId 	= 0
                loanId 		= 0
                
                if 'member_id' in response:
                    memberId  = response['member_id']
                if 'loan_id' in response:
                    loanId    = response['loan_id']
                
                firstName     = data["mlcompositeArray"][0]["firstname"]
                lastName      = data["mlcompositeArray"][0]["lastname"]
                memberName    = firstName+' '+lastName
                memberAddress = request.POST["MemberAddress"]
                mobileNumber  = str(data["mlcompositeArray"][0]["mobile_number"])
                applicantInfo = str(memberId) +'@#'+ str(loanId) +'@#'+ memberName+'@#'+mobileNumber ;
        
        	#Getting the location hierarchy and his location code of the user
                qresult = getLocationCode(request,str(request.user))
                print "location details"
                print qresult
                
                
                clusterCenterCode = ""
                clusterCenterName = ""
                regionCode	  = ""
                clusterOfficeName = ""
                clusterOfficeCode = ""
                stateCode	  = ""
                stateName	  = ""	
                regionName	  = ""
            
                if(qresult):
                    if(qresult['clusterCenterCode']):
                        clusterCenterCode     = qresult['clusterCenterCode']
                    if(qresult['clusterCenterName']):
                            clusterCenterName = qresult['clusterCenterName']
                    if(qresult['regionCode']):
                            regionCode	      = qresult['regionCode']
                    if(qresult['clusterOfficeName']):
                            clusterOfficeName = qresult['clusterOfficeName']
                    if(qresult['clusterOfficeCode']):
                            clusterOfficeCode = qresult['clusterOfficeCode']
                    if(qresult['StateCode']):
                            stateCode	      = qresult['StateCode']
                    if(qresult['StateName']):
                            stateName	      = qresult['StateName']
                    if(qresult['regionName']):
                            regionName	      = qresult['regionName']


                processStart = {
                        "variables": {
        
                            "State" 			        : {"value" : ""+ str(stateCode)+""	, "type": "String" },
                            "DistributorUid" 		        : {"value" : ""+ str(distributorUid)+""	, "type": "String" },
                            "Application_Status" 		: {"value" : ""+ str(appStatus) +""	    , "type": "String" },
                            "MemberId" 			        : {"value" : ""+ str(memberId) +""	    , "type": "Long"   },
                            "LoanId" 			        : {"value" : ""+ str(loanId) +""	    , "type": "Long"   },
                            "Status_Code" 			: {"value" : ""			            , "type": "Long"   },
        
                            "App_Mem_Details"		        : {"value" : ""+ str(applicantInfo)+""	,"type": "String" },
                            "App_Mem_Address"		        : {"value" : ""+ str(memberAddress)+""	,"type": "String" },
                            
                            "Cibil_Request_Status"		: {"value" : "New"		        ,"type": "String"},
                            "Cibil_Response_Status"		: {"value" : ""			        ,"type": "String"},
                            "alf_token"			        : {"value" : ""+alf_token+"" 	,"type": "String"},
                            "Cibil_Verification_Status"	    	: {"value" : ""			        ,"type": "String"},
                            "Resident_Verification_Status"	: {"value" : ""			        ,"type": "String"},
                            "Business_Verification_Status"	: {"value" : ""			        ,"type": "String"},
                            "LOS_Generation_Status"		: {"value" : ""			        ,"type": "String"},
                            "Upload_Doc_Status"		        : {"value" : ""			        ,"type": "String"},
                            "Despatch_Doc_Status"		: {"value" : ""			        ,"type": "String"},
                            "Book_Loan_&_Cheque_Status"	    	: {"value" : ""			        ,"type": "String"},
                            "Collect_Pre_EMI_Status"	    	: {"value" : ""			        ,"type": "String"},
                            "Send_Chq_to_CO"		        : {"value" : ""			        ,"type": "String"},
                            "Member_Cibil_Id"		        : {"value" : "0"		        ,"type": "String"}, 
                            "Member_Resubmit"		        : {"value" : "NEW"		        ,"type": "String"},
                            "Ora_Customer_Id"		        : {"value" : "0"		        ,"type": "String"},
                            "Ora_Loan_Id"			: {"value" : "0"		        ,"type": "String"},
                            "Ora_LOS_Id"			: {"value" : ""			        ,"type": "String"},
        
                            "CreateLoan"			: {"value" : "New"		        ,"type": "String"},
                            "CreateLOS"			        : {"value" : "New" 		        ,"type": "String"},
                            "CreateCustomer"		        : {"value" : "New"		        ,"type": "String"},
                            "LoanAccNumber"			: {"value" : "New"		        ,"type": "String"},
        
                            
                            "clusterCenterCode"		        : {"value" : ""	+clusterCenterCode+""	,"type": "String"},
                            "clusterCenterName"		        : {"value" : ""	+clusterCenterName+""	,"type": "String"},
                            "regionCode"			: {"value" : ""	+regionCode+""		,"type": "String"},
                            "clusterOfficeName"		        : {"value" : ""	+clusterOfficeName+""	,"type": "String"},
                            "clusterOfficeCode"		        : {"value" : ""	+clusterOfficeCode+""	,"type": "String"},
                            "stateCode"			        : {"value" : ""	+stateCode+""		,"type": "String"},
                            "stateName"			        : {"value" : ""	+stateName+""		,"type": "String"},
                            "regionName"			: {"value" : ""	+regionName+""		,"type": "String"},
                            "loanAmount"			: {"value" : ""	+str(loanAmount)+""     ,"type": "String"},
                            "loanProductId"			: {"value" : ""	+str(loanProductId)+""  ,"type": "String"},
                            "loanAssignedTo"		        : {"value" : ""	+str(100001061)+""	,"type": "String"}       
                        },
                        "businessKey" : "retailLoanProcess"
                    }
                logger.info(processStart)	
                logger.info("Prefix Sequence of Loan Account Number: "+stateCode + clusterOfficeCode + clusterCenterCode)
    
                try:
                    if response['status'] == "Successful" and response['member_id'] != None and response['loan_id'] != None :	
                        logger.info("Inside Start Process: ")
                        url_start_process = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/process-definition/key/RVLProcessVerification/start'
                        logger.info("Process Initiation URL :"+url_start_process)
                        request2 	   = urllib2.Request(url_start_process, json.dumps(processStart) )
                        request2.add_header('Content-Type', 'application/json')
                        result2 	   = urllib2.urlopen(request2)
                        Read_data 	   = result2.read()
                        logger.info("Response : ") 
                        logger.info(response)
                        logger.info("Exiting submitFormAdd view : USER -->"+str(request.user))
                        return HttpResponse( json.dumps( response ), content_type="application/json" )
                    else:
                        logger.info("Exiting submitFormAdd view : USER -->"+str(request.user))			 
                        return HttpResponse( json.dumps( {"message":"Start process Failed"} ), content_type="application/json" ) 
                except Exception as e:
                    logger.error("Exception raised in submitFormAdd view --> Start process- api response 1 : %s" %e ) 
                    return HttpResponse( json.dumps( {"message":"Start process Failed"} ), content_type="application/json" )
    
            except Exception as e:
                logger.error("Exception raised in submitFormAdd view --> response of Member creation API reader - api response 1 : %s" %e) 
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )
    
        except Exception as e:
            logger.error("Exception raised in submitFormAdd view --> response of Member creation API - api call : %s" %e) 
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

    except Exception as e:
        logger.error("Exception raised in submitFormAdd view --> Main :: %s" %e) 
        return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )
        
#Getting the location hierarchy and his location code of the user
def getLocationCode1(request,user):
    logger.info("Entering getLocationCode(request,user): USER -->"+str(request.user))
    
    #Getting the group of the user
    Grp 	= request.user.groups.all()
    groups 	= request.user.groups.values_list('name', flat=True)

    #Territory_Id of the user
    queryset 	= user_location_map.objects.filter(username=user).values_list('territory_id')# 
    logger.info("QuerySet Result :")
    logger.info(queryset)
    print "queryset"
    print queryset
    
    parentLocationId  = ''
    clusterLocationId = ''
    
    clusterArray = []
    locationDict = {}
    
    if len(queryset)>0:
        if queryset[0] is not None:
            ter_id = queryset[0][0]
            
            territoryName = territory_master.objects.filter(id=ter_id).values_list('territory_name') # Territory Name   
            logger.info("Territory Name ::::::::::")
            logger.info(territoryName)
            
            location_map_id = user_location_map.objects.filter(username=user).values_list('id') # User Id
            location_id = list(location_map_id[0])[0]
            
            #location hierarchy group id
            location_hgroup_id	= location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=location_id).values_list('location_hierarchy_group_id_id')
            loc_hgrp_id = list(location_hgroup_id[0])[0]
        
            #Getting the location territory hierarchy id which is used to get the location details from the location territory hierrarchy table
            queryset1 = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id=loc_hgrp_id).values_list('location_territory_hierarchy_id_id')
            loc_id = list(queryset1[0])[0]
            
            if loc_id is not None:
                location = locaton_territory_hierrarchy.objects.filter(id=loc_id).values_list('loc_terri_code', 'location_name', 'loaction_id', 'parent_location_id','territory_id')    
                logger.info("Location :")
                logger.info(location)
    
                if len(location[0])>0:
                    clusterCenterCode = location[0][0] 	# Location Territory COde
                    clusterCenterName = location[0][1] 	# Location Id
                    parentLocationId  = location[0][3] 	# Parent Location ID
                    territoryCode     = location[0][4] 	# Territory Id
                
                    territoryName = territory_master.objects.filter(id=territoryCode).values_list('territory_name')    #Cluster Center
                    logger.info("Territory Name :")
                    logger.info(territoryName)

                    if territoryCode == 3:
                        locationDict["clusterOfficeName"] = clusterCenterName
                        locationDict["clusterOfficeCode"] = clusterCenterCode
                    if territoryCode == 4:
                        locationDict["clusterCenterName"] = clusterCenterName
                        locationDict["clusterCenterCode"] = clusterCenterCode
                    
                    clusterArray.append(clusterCenterCode)
                    clusterArray.append(clusterCenterName)

                    while True:
                        hierarchyLocation = locaton_territory_hierrarchy.objects.filter(id=parentLocationId).values_list('loc_terri_code', 'parent_location_id', 'loaction_id','territory_id','location_name')    
                        logger.info("Hierarchy Location : ")
                        logger.info(hierarchyLocation)
        
                        parentLocationId  = hierarchyLocation[0][1] # Parent Location Id
                        clusterLocationId = hierarchyLocation[0][2] # Location Id
                        territoryCode 	  = hierarchyLocation[0][3] # Territory Code
                        hierarchyCode 	  = hierarchyLocation[0][0] # Location Territory Code
                        hierarchyName 	  = hierarchyLocation[0][4] # Cluster Name
                        
                        locationMaster = location_master.objects.filter(id=parentLocationId).values_list('location_code', 'location_name')
                        logger.info("Location Master : ")
                        logger.info(locationMaster)
                        
                        if len(locationMaster)>0 and locationMaster is not None:
                            clusterCode = locationMaster[0][0]
                            clusterName = locationMaster[0][1]
                            clusterArray.append(clusterCode)
                            clusterArray.append(clusterName)
                        
                        if territoryCode == 3:
                            locationDict["clusterOfficeName"] = hierarchyName
                            locationDict["clusterOfficeCode"] = hierarchyCode
                        if territoryCode == 4:
                            locationDict["clusterCenterName"] = hierarchyName
                            locationDict["clusterCenterCode"] = hierarchyCode
                        if territoryCode == 2:
                            locationDict["regionName"] 	= hierarchyName
                            locationDict["regionCode"] 	= hierarchyCode
                            locationDict["StateCode"] 	= clusterCode	#hierarchyCode  	#STATE CODE
                        if territoryCode == 1:
                            locationDict["StateName"]	= hierarchyName
        
                        if hierarchyCode is not None:
                            clusterArray.append(hierarchyCode)
                            
                        if parentLocationId <= 1:
                             break
                    
                    ar_code = location_master.objects.filter(id=clusterLocationId).values_list('location_code', 'location_name')
                    ar_code_loc = ar_code[0][0] 
                    ar_name_loc = ar_code[0][1]
                    
                    logger.info("ClusterArray : ")
                    logger.info(clusterArray)
                    logger.info("Location Dict : ")
                    logger.info(locationDict)
                    logger.info("Exiting getLocationCode(request,user): USER -->"+str(request.user))
                    return locationDict


#Getting the location hierarchy and his location code of the user
def getLocationCode(request,user):
    logger.info("Entering getLocationCode(request,user): USER -->"+str(request.user))
    
    #Getting the group of the user
    Grp 	= request.user.groups.all()
    groups 	= request.user.groups.values_list('name', flat=True)

    parentLocationId  	= ''
    clusterLocationId 	= ''
    clusterArray 	= []
    locationDict 	= {}

    #Territory_Id of the user
    queryset 	= user_location_map.objects.filter(username=user).values_list('territory_id', flat=True)
    logger.info("QuerySet Result :")
    logger.info(queryset)

    
    if len(queryset)>0:
        if queryset[0] is not None:
            userId = request.user.id # User Id
            
            #location hierarchy group id
            locationHGroupId = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
        
            #Getting the location territory hierarchy id which is used to get the location details from the location territory hierrarchy table
            locationTerId    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=locationHGroupId).values_list('location_territory_hierarchy_id_id', flat=True)

	    print "locationTerId    ::: ->"
	    print locationTerId    
            
            if len(locationTerId)>0 and locationTerId is not None:
                locationTerHierrarchy = locaton_territory_hierrarchy.objects.filter(id__in=locationTerId).values('loc_terri_code', 'location_name', 'loaction_id', 'parent_location_id','territory_id')        
                logger.info("Location : ")
                logger.info(locationTerHierrarchy)
                for location in locationTerHierrarchy: 
                    if len(location)>0:
                    	clusterCenterCode = location['loc_terri_code'] 		# Location Territory COde
                    	clusterCenterName = location['location_name'] 		# Location Id
                    	parentLocationId  = location['parent_location_id'] 	# Parent Location ID
                    	territoryCode     = location['territory_id'] 		# Territory Id
                
                    	if territoryCode == 3:
                            locationDict["clusterOfficeName"] = clusterCenterName
                            locationDict["clusterOfficeCode"] = clusterCenterCode
                    	if territoryCode == 4:
                            locationDict["clusterCenterName"] = clusterCenterName
                            locationDict["clusterCenterCode"] = clusterCenterCode
                    
                        clusterArray.append(clusterCenterCode)
                        clusterArray.append(clusterCenterName)
                        print clusterArray
                        print "parentLocationId"
                        print parentLocationId
    			
                        while True:
                           locationTerHierrarchyWithParentId = locaton_territory_hierrarchy.objects.filter(id=parentLocationId).values('loc_terri_code', 'parent_location_id', 'loaction_id','territory_id','location_name')    
                           logger.info("Hierarchy Location  With Parent Filter: ")
                           logger.info(locationTerHierrarchyWithParentId)
                           
                           parentLocationId=None
                           clusterLocationId=None
                           territoryCode=None
                           hierarchyCode=None
                           hierarchyName=None
                           
                           for hierarchyLocation in locationTerHierrarchyWithParentId:
                                parentLocationId  = hierarchyLocation['parent_location_id'] 	# Parent Location Id
                                clusterLocationId = hierarchyLocation['loaction_id'] 		# Location Id
                                territoryCode 	  = hierarchyLocation['territory_id'] 		# Territory Code
                                hierarchyCode 	  = hierarchyLocation['loc_terri_code'] 	# Location Territory Code
                                hierarchyName 	  = hierarchyLocation['location_name'] 		# Cluster Name
                                
                           locationMasterObj = location_master.objects.filter(id=clusterLocationId).values('location_code', 'location_name')
                          
                           #return False
                        
                           clusterCode = None
                           clusterName = None
                           for locationMaster in locationMasterObj:
                             if len(locationMaster)>0 and locationMaster is not None:
                                clusterCode = locationMaster['location_code']
                                clusterName = locationMaster['location_name']
                                clusterArray.append(clusterCode)
                                clusterArray.append(clusterName)
                                
                           if territoryCode == 3:
                                locationDict["clusterOfficeName"] = hierarchyName
                                locationDict["clusterOfficeCode"] = hierarchyCode
                           if territoryCode == 4:
                                locationDict["clusterCenterName"] = hierarchyName
                                locationDict["clusterCenterCode"] = hierarchyCode
                           if territoryCode == 2:
                                locationDict["regionName"] 	  = hierarchyName
                                locationDict["regionCode"] 	  = hierarchyCode
                                locationDict["StateCode"] 	  = clusterCode		#hierarchyCode  	#STATE CODE
                           if territoryCode == 1:    
                                locationDict["StateName"]	  = hierarchyName
                                locationDict["StateCode"]	  = clusterCode
        
                           if hierarchyCode is not None:
                                clusterArray.append(hierarchyCode)
                            
                           if parentLocationId <= 1:
                                 break
                    
                        #logger.info("ClusterArray : ")
                        #logger.info(clusterArray)
                        #logger.info("Location Dict : ")
                        logger.info(locationDict)
                        logger.info("Exiting getLocationCode(request,user): USER -->"+str(request.user))
                        return locationDict


        
#Getting the location hierarchy and his location code of the user
def getLocationCode2(request,user):
    logger.info("Entering getLocationCode(request,user): USER -->"+str(request.user))
    
    #Getting the group of the user
    Grp 	= request.user.groups.all()
    groups 	= request.user.groups.values_list('name', flat=True)

    parentLocationId  	= ''
    clusterLocationId 	= ''
    clusterArray 	= []
    locationDict 	= {}

    #Territory_Id of the user
    queryset 	= user_location_map.objects.filter(username=user).values_list('territory_id', flat=True)
    logger.info("QuerySet Result :")
    logger.info(queryset)

    
    if len(queryset)>0:
        if queryset[0] is not None:
            userId = request.user.id # User Id
            
            #location hierarchy group id
            locationHGroupId = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
        
            #Getting the location territory hierarchy id which is used to get the location details from the location territory hierrarchy table
            locationTerId    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=locationHGroupId).values_list('location_territory_hierarchy_id_id', flat=True)
            
            if len(locationTerId)>0 and locationTerId is not None:
                locationTerHierrarchy = locaton_territory_hierrarchy.objects.filter(id__in=locationTerId).values('loc_terri_code', 'location_name', 'loaction_id', 'parent_location_id','territory_id')        
                logger.info("Location : ")
                logger.info(locationTerHierrarchy)
                for location in locationTerHierrarchy: 
                    if len(location)>0:
                    	clusterCenterCode = location['loc_terri_code'] 		# Location Territory COde
                    	clusterCenterName = location['location_name'] 		# Location Id
                    	parentLocationId  = location['parent_location_id'] 	# Parent Location ID
                    	territoryCode     = location['territory_id'] 		# Territory Id
                
                    	if territoryCode == 3:
                            locationDict["clusterOfficeName"] = clusterCenterName
                            locationDict["clusterOfficeCode"] = clusterCenterCode
                    	if territoryCode == 4:
                            locationDict["clusterCenterName"] = clusterCenterName
                            locationDict["clusterCenterCode"] = clusterCenterCode
                    
                        clusterArray.append(clusterCenterCode)
                        clusterArray.append(clusterCenterName)
                        print clusterArray
                        print "parentLocationId"
                        print parentLocationId
    			
                        while True:
                           locationTerHierrarchyWithParentId = locaton_territory_hierrarchy.objects.filter(id=parentLocationId).values('loc_terri_code', 'parent_location_id', 'loaction_id','territory_id','location_name')    
                           logger.info("Hierarchy Location  With Parent Filter: ")
                           logger.info(locationTerHierrarchyWithParentId)
                           
                           parentLocationId=None
                           clusterLocationId=None
                           territoryCode=None
                           hierarchyCode=None
                           hierarchyName=None
                           
                           for hierarchyLocation in locationTerHierrarchyWithParentId:
                                parentLocationId  = hierarchyLocation['parent_location_id'] 	# Parent Location Id
                                clusterLocationId = hierarchyLocation['loaction_id'] 		# Location Id
                                territoryCode 	  = hierarchyLocation['territory_id'] 		# Territory Code
                                hierarchyCode 	  = hierarchyLocation['loc_terri_code'] 	# Location Territory Code
                                hierarchyName 	  = hierarchyLocation['location_name'] 		# Cluster Name
                                
                           locationMasterObj = location_master.objects.filter(id=parentLocationId).values('location_code', 'location_name')
                           logger.info("Location Master : ")
                           logger.info(locationMasterObj)
                        
                           logger.info("territoryCode : ")
                           logger.info(territoryCode)

                           logger.info("parentLocationId : ")
                           logger.info(parentLocationId)                                
                           #return False
                        
                           clusterCode = None
                           clusterName = None
                           for locationMaster in locationMasterObj:
                             if len(locationMaster)>0 and locationMaster is not None:
                                clusterCode = locationMaster['location_code']
                                clusterName = locationMaster['location_name']
                                clusterArray.append(clusterCode)
                                clusterArray.append(clusterName)
                                
                           if territoryCode == 3:
                                locationDict["clusterOfficeName"] = hierarchyName
                                locationDict["clusterOfficeCode"] = hierarchyCode
                           if territoryCode == 4:
                                locationDict["clusterCenterName"] = hierarchyName
                                locationDict["clusterCenterCode"] = hierarchyCode
                           if territoryCode == 2:
                                locationDict["regionName"] 	  = hierarchyName
                                locationDict["regionCode"] 	  = hierarchyCode
                                locationDict["StateCode"] 	  = clusterCode		#hierarchyCode  	#STATE CODE
                           if territoryCode == 1:    
                                locationDict["StateName"]	  = hierarchyName
        
                           if hierarchyCode is not None:
                                clusterArray.append(hierarchyCode)
                            
                           if parentLocationId <= 1:
                                 break
                    
                        logger.info("ClusterArray : ")
                        logger.info(clusterArray)
                        logger.info("Location Dict : ")
                        logger.info(locationDict)
                        logger.info("Exiting getLocationCode(request,user): USER -->"+str(request.user))
                        return locationDict

#Updating Verification Process or Just Updating Process:
#=======================================================>
@csrf_exempt
@login_required(login_url='/login/')
def updateVerificationtaskprocess(request, status):
    logger.info("Entering updateVerificationtaskprocess(request, status) : USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        data 	      = json.loads(request.body)
        process       = data['process']
        taskId 	      = data['taskid']
        taskremarks   = data['taskremarks']
    
        #Validation Schema for Data Comments 
        schema 		    = avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
        writer 		    = avro.io.DatumWriter(schema)
        bytes_writer 	= io.BytesIO()
        encoder 	    = avro.io.BinaryEncoder(bytes_writer)
        writer.write( taskremarks , encoder)
    
        url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
        logger.info("URL To get Comments : "+url2)

        #Validation API:
        request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
        request2.add_header('Content-Type', 'avro/binary')
        request2.get_method 	= lambda: 'POST'
        result2 	  = urllib2.urlopen(request2)
        serialized_data_2 = io.BytesIO(result2.read())

        #Process Submission --> updateTaskprocess:
        bodyData 	= json.dumps(process)
        serialized_data = updateTaskprocess(request, bodyData, taskId)
        
        logger.info("Exiting updateVerificationtaskprocess(request, status) : USER --> "+str(request.user))
        return HttpResponse( json.dumps( {"message":"Successful"} ), content_type="application/json" )

    except Exception as e:
        logger.error("Exception raised in updateVerificationtaskprocess(request,status) :  --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

#Updating a task when Rework is called:
#======================================>
@csrf_exempt
@login_required(login_url='/login/')
def updateReworktaskprocess(request, status):
    logger.info("Entering  updateReworktaskprocess(request, status): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        data 		= json.loads(request.body)
        process 	= data['process']
        processid 	= data['processid']
        taskId 		= data['taskid']
    
        #Update Task:
        bodyData 	    = json.dumps(process)
        serialized_data = updateTaskprocess(request, bodyData, taskId)
        logger.info("Exiting  updateReworktaskprocess(request, status): USER --> "+str(request.user))
        return HttpResponse(json.dumps(serialized_data), content_type="application/json")
        
    except Exception as e:
        logger.error("Exception raised in updateReworktaskprocess(request, status): -->  %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


#Confirmation after creating a new member with loan Id and Member Id:
#====================================================================>
def confirmation(request, memberId , loanid , status):
	logger.info("Entering  confirmation(request, memberId , loanid , status): USER-->"+str(request.user))
	return render_to_response('confirmation.html', {'status':status,'member_id':memberId, 'loan_id': loanid}, RequestContext(request))

@csrf_exempt
@login_required(login_url='/login/')
def updateTask(request):
    logger.info("Entering updateTask(request) : USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        data 	      = json.loads(request.body)
        process       = data['process']
        taskId 	      = data['taskid']
        remarksData   = data['remarksData']	
    
        #Process Submission --> updateTaskprocess:
        bodyData 	= json.dumps(process)
        
        url 	  	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+taskId+'/complete'
        logger.info("Task update URL :"+url)

        request1  	= urllib2.Request(url, bodyData )
        request1.add_header('Content-Type', 'application/json')
        request1.get_method 	= lambda: 'POST'
        result1   	= urllib2.urlopen(request1)
        serialized_data = result1.read()

        try:
            #Validation Schema for Data Comments 
            schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
            writer.write( remarksData , encoder)
    
            url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
            logger.info("URL for comments :"+url2)
        
            #Validation API:
            request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
            request2.add_header('Content-Type', 'avro/binary')
            request2.get_method 	= lambda: 'POST'
            result2 	  = urllib2.urlopen(request2)
            serialized_data_2 = io.BytesIO(result2.read())
    
            logger.info("Exiting updateTask(request) : USER --> "+str(request.user))
            return HttpResponse( json.dumps( {"message":"Successful"} ), content_type="application/json" )        

        except Exception as e:
            logger.error("Exception raised in updateTask(request) : %s" %e)
            return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in updateTask(request) : %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


@csrf_exempt
@login_required(login_url='/login/')
def rejectTask(request):
    logger.info("Entering rejectTask(request) : USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        data 	      = json.loads(request.body)
        process       = data['process']
        taskId 	      = data['taskid']
        processId     = data['processid']
        remarksData   = data['remarksData']	
    
        #Process Submission --> updateTaskprocess:
        bodyData 	= json.dumps(process)
        
	print "bodyData :::: " 
	print bodyData
	print "processId"
	print processId
	return False

        try:
            #Validation Schema for Data Comments 
            schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
            writer.write( remarksData , encoder)
    
            url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
            logger.info("URL for comments :"+url2)
        
            #Validation API:
            request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
            request2.add_header('Content-Type', 'avro/binary')
            request2.get_method 	= lambda: 'POST'
            result2 	  = urllib2.urlopen(request2)
            serialized_data_2 = io.BytesIO(result2.read())
    
            logger.info("Exiting rejectTask(request) : USER --> "+str(request.user))
            #return HttpResponse( json.dumps( {"message":"Successful"} ), content_type="application/json" )        

        except Exception as e:
            logger.error("Exception raised in rejectTask(request) : %s" %e)
            return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


        try:

            url 	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/process-instance/'+processId+''
            logger.info("Task rejectTask URL :"+url)

            request1  	= urllib2.Request(url, bodyData )
            request1.add_header('Content-Type', 'application/json')
            request1.get_method 	= lambda: 'DELETE'
            result1   	= urllib2.urlopen(request1)
            serialized_data = result1.read()
    
            logger.info("Exiting rejectTask(request) : USER --> "+str(request.user))
	    return HttpResponse( json.dumps( {"message":"Successful"} ), content_type="application/json" )                    

        except Exception as e:
            logger.error("Exception raised in rejectTask(request) : %s" %e)
            return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


    except Exception as e:
        logger.error("Exception raised in rejectTask(request) : %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


#Updating a task Process:
#========================>
#@login_required(login_url='/login/')
def updateTaskprocess(request, bodyData, taskId):
    logger.info("Entering updateTaskProcess(request, bodyData, taskId): USER --> "+str(request.user))
    context      = RequestContext(request)
    process	 = ''
    taskId	 = taskId
    try:	
        process       = json.loads(bodyData)
        process       = bodyData
    
        url 	      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task/'+taskId+'/complete'
        logger.info("Update task URL :"+url)
        
        request1      = urllib2.Request(url, process )
        request1.add_header('Content-Type', 'application/json')
        request1.get_method 	= lambda: 'POST'
        result1 	    = urllib2.urlopen(request1)
        serialized_data = result1.read()
        
        logger.info("Exiting updateTaskProcess(request, bodyData, taskId): USER --> "+str(request.user))
        return {'message':'Successful'}

    except Exception as e:
        logger.info("Exception raised in updateTaskProcess(request, bodyData, taskId): --> %s" %e)
        return {'message':'failed'}

@csrf_exempt
#@validate_session
@login_required(login_url='/login/')
def dispatchDocsBatchUpdate(request):
    logger.info("Entering dispatchDocsBatchUpdate(request): USER --> "+str(request.user)) 
    context      = RequestContext(request)
    context.user = request.user
    taskId       = ''
    process      = ''
    despatchData = ''
    
    if request.method == 'POST':
	    try:	
	        data =  json.loads(request.body)
	        if 'dispatchDetails' in data:
	                despatchData = data['dispatchDetails']
	                process      = data['processDetails']
	        
	        if "comments" in data:	
		    comments_data = data["comments"]    		   
	
		import io	
		#AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
		schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"dispatchdocumentschema.avsc").read() )
		writer 		= avro.io.DatumWriter(schema)
		bytes_writer 	= io.BytesIO()
		encoder 	= avro.io.BinaryEncoder(bytes_writer)

		#ENCODE DATA	
		writer.write( despatchData , encoder)

		
		try:
		    url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
		    logger.info("Add dispatch docs URL :"+url)
	
		    byte_data 	= bytes_writer.getvalue()
		    request1  	= urllib2.Request( url , bytes_writer.getvalue() )
		    request1.add_header( 'Content-Type' , 'avro/binary' )
		    request1.get_method 	= lambda: 'POST'
		    result1 	= urllib2.urlopen( request1 )
		    serialized_data = io.BytesIO( result1.read() )
	
		    try:
			response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
			decoder 	= avro.io.BinaryDecoder(serialized_data)
			reader 		= avro.io.DatumReader(response_schema)
			response 	= reader.read(decoder)
			if "comments" in data:
				taskremarks   = comments_data

				#Validation Schema for Data Comments 
				schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
				writer 		= avro.io.DatumWriter(schema)
				bytes_writer 	= io.BytesIO()
				encoder 	= avro.io.BinaryEncoder(bytes_writer)
				writer.write( taskremarks , encoder)

				url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
				logger.info("URL To get comments :"+url2)
				
				#Validation API:
				request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
				request2.add_header('Content-Type', 'avro/binary')
				request2.get_method 	= lambda: 'POST'
				result2 	  = urllib2.urlopen(request2)
				serialized_data_2 = io.BytesIO(result2.read())
			
                        if 'processDetails' in data:
                             bodyData        = json.dumps(process)
                             for data in despatchData["dcphysicalArray"]:
				    taskId = data["task_id"]
		             	    serialized_data = updateTaskprocess(request, bodyData, taskId)
		        
			response["message"]="Success"
			logger.info("Exiting dispatchDocsBatchUpdate(request): USER --> "+str(request.user)) 
			return HttpResponse( json.dumps( response ), content_type="application/json" )

		    except Exception as e:
		    	logger.error("Exception raised in dispatchDocsBatchUpdate view- -> response of Member creation API reader - api response 1 : %s" %e)
			return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

		except Exception as e:
		    logger.error("Exception raised in dispatchDocsBatchUpdate view- -> response of Member creation API - api call : %s" %e)
		    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

	    except Exception as e:
	        logger.error("Exception raised in dispatchDocsBatchUpdate view --> Main :: %s" %e)
		return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )


@csrf_exempt
#@validate_session
@login_required(login_url='/login/')
def dispatchDocsBatchUpdate1(request):
    logger.info("Entering dispatchDocsBatchUpdate(request): USER --> "+str(request.user)) 
    context      = RequestContext(request)
    context.user = request.user
    taskId       = ''
    process      = ''
    despatchData = ''
    taskremarks  = ''
    
    if request.method == 'POST':
        try:	
            data =  json.loads(request.body)
            if 'dispatchDetails' in data:
                despatchData = data['dispatchDetails']
                process      = data['processDetails']
            
            if "comments" in data:	
                comments_data = data["comments"]
                
            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"dispatchdocumentschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
    
            #ENCODE DATA	
            writer.write( despatchData , encoder)

            try:
                url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
                logger.info("Add dispatch docs URL :"+url)
        
                byte_data 	= bytes_writer.getvalue()
                request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                request1.add_header( 'Content-Type' , 'avro/binary' )
                request1.get_method 	= lambda: 'POST'
                result1 	= urllib2.urlopen( request1 )
                serialized_data = io.BytesIO( result1.read() )

                try:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                    decoder 	= avro.io.BinaryDecoder(serialized_data)
                    reader 		= avro.io.DatumReader(response_schema)
                    response 	= reader.read(decoder)
                    if "comments" in data:
                        taskremarks   = comments_data

                    #Validation Schema for Data Comments 
                    schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
                    writer 		= avro.io.DatumWriter(schema)
                    bytes_writer 	= io.BytesIO()
                    encoder 	= avro.io.BinaryEncoder(bytes_writer)
                    writer.write( taskremarks , encoder)
    
                    url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
                    logger.info("URL To get comments :"+url2)
        
                    #Validation API:
                    request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
                    request2.add_header('Content-Type', 'avro/binary')
                    request2.get_method 	= lambda: 'POST'
                    result2 	  = urllib2.urlopen(request2)
                    serialized_data_2 = io.BytesIO(result2.read())

                    if 'processDetails' in data:
                         bodyData        = json.dumps(process)
                         for data in despatchData["dcphysicalArray"]:
                            taskId = data["task_id"]
                            serialized_data = updateTaskprocess(request, bodyData, taskId)

                    response["message"]="Success"
                    logger.info("Exiting dispatchDocsBatchUpdate(request): USER --> "+str(request.user)) 
                    return HttpResponse( json.dumps( response ), content_type="application/json" )

                except Exception as e:
                    logger.error("Exception raised in dispatchDocsBatchUpdate view- -> response of Member creation API reader - api response 1 : %s" %e)
                    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in dispatchDocsBatchUpdate view- -> response of Member creation API - api call : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in dispatchDocsBatchUpdate view --> Main :: %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

   	
#/*************************Dispatch Added*****************************/
#Dispatch A Document or Loan:
#============================>
@login_required(login_url='/login/')
@csrf_exempt
def dispatch(request):
    logger.info("Entering dispatch(request) : USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        if request.method == 'POST':	
            data = json.loads(request.body)
            dispatchDetails	= data['dispatchDetails']
            processDetails	= data['processDetails']
            taskId 		= data['taskid']
            ApiCall		= data['function']
            logger.info("API CALL :"+ApiCall)

            #Avro Physical and Cheque Document :
            schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"phydoccheqschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
            writer.write( dispatchDetails , encoder)
    
            try:
                #Add or Update :
                url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
                if ApiCall  == "save":
                    url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
                    logger.info("URL : Add dispatch docs -->"+url)
                if ApiCall  == "update":				
                    url = 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/updatephydocdisp/dcphysical'	
                    logger.info("URL : Update dispatch docs -->"+url)

                #Send BytesArray from Avro to ApiServer:    	
                byte_data 	= bytes_writer.getvalue()
                request1 	= urllib2.Request(url, bytes_writer.getvalue() )
                request1.add_header('Content-Type', 'avro/binary')
                request1.get_method 	= lambda: 'POST'
                result1 	= urllib2.urlopen(request1)
                serialized_data = io.BytesIO(result1.read())

                try:
                    #Get Values from API:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                    decoder 	    = avro.io.BinaryDecoder(serialized_data)
                    reader 		    = avro.io.DatumReader(response_schema)
                    response 	    = reader.read(decoder)
                    response["message"] ="Success"
                    
                    #If the Status is Success:
                    if response["status"] == "Successful":
                        bodyData 	    = json.dumps(processDetails)
                        serialized_data = updateTaskprocess(request, bodyData, taskId)
                           
                    logger.info("Exiting dispatch(request) : USER --> "+str(request.user)) 
                    return HttpResponse(json.dumps(response), content_type="application/json")

                except Exception as e:
                    logger.error("Exception raised in dispatch(request) : %s" %e)
                    return HttpResponse(json.dumps({"message":"Start process Failed"}), content_type="application/json")

            except Exception as e:
                context.message = "Error"
                logger.error("Exception raised in dispatch(request) : %s" %e)
                return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))
        else:
            logger.error("Exception raised in dispatch(request) : %s" %e)
            return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))

    except Exception as e:
        logger.error("Exception raised in dispatch(request) --> Main :: %s" %e)
        return render_to_response("dispatchPhyDoc.html", context, context_instance=RequestContext(request))

	
#/****************************master Update**********************************/	
#Open Master Js update Page with the Master data:
#================================================>
@login_required(login_url='/login/')
def masterJs(request):
    logger.info("Entering masterJS(request) : USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        #Read Master Details	    	    
        url2	="http://"+settings.API_IP_AVRO+"/madura-coreservice/rest/api/readmasterdet/mtdetail/1"	
        logger.info("Read master Data URL :"+url2)
    
        request2 	= urllib2.Request(url2)
        request2.add_header('Content-Type', 'avro/binary')
        result2 	= urllib2.urlopen(request2)
        serialized_data2 	= io.BytesIO(result2.read())
    
        #Decoding in Avro:	
        response_schema2 	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"masterdetailschema.avsc").read() )
        decoder2 	= avro.io.BinaryDecoder(serialized_data2)
        reader2 	= avro.io.DatumReader(response_schema2)
        response2 	= reader2.read(decoder2)
        data 	= json.dumps(response2)
        masterData 	= json.loads(copy.deepcopy(data))
        
        logger.info("Exiting masterJS(request) : USER -->"+str(request.user))
        return render_to_response("updateMasterJS.html", {'masterData':json.dumps(masterData)} , context_instance=RequestContext(request))
    
    except Exception as e:
        logger.error("Exception raised in masterJS(request) --> %s " %e)
            	    

#Master data UPdate after changing into the required Format:        
#===========================================================>
@login_required(login_url='/login/')
@csrf_exempt
def masterJsUpdate(request):
    logger.info("Entering masterJsUpdate(request): USER --> "+str(request.user)) 
    context      = RequestContext(request)
    context.user = request.user
    response	 = ''    
    try:	
        bodyData     = request.body	    
        bodyDataJson = json.loads(bodyData)
        #Master Data to be stored in JS File in static location:
        masterData   = "var masterAddressProofArrayDic     = "+ json.dumps( bodyDataJson['masterAddressProofArrayDic']		)+";\n"\
                     + "var masterIdProofArrayDic 	       = "+ json.dumps( bodyDataJson['masterIdProofArrayDic']		    )+";\n"\
                     + "var masterValidationLevelArrayDic  = "+ json.dumps( bodyDataJson['masterValidationLevelArrayDic']	)+";\n"\
                     + "var masterEducationArrayDic	       = "+ json.dumps( bodyDataJson['masterEducationArrayDic']		    )+";\n"\
                     + "var masterNetQuestionArrayDic      = "+ json.dumps( bodyDataJson['masterNetQuestionArrayDic']		)+";\n"\
                     + "var masterDistanceArrayDic	       = "+ json.dumps( bodyDataJson['masterDistanceArrayDic']		    )+";\n"\
                     + "var masterOccupationArrayDic       = "+ json.dumps( bodyDataJson['masterOccupationArrayDic']		)+";\n"\
                     + "var masterPurposeArrayDic	       = "+ json.dumps( bodyDataJson['masterPurposeArrayDic']		    )+";\n"\
                     + "var masterProcessRemarkArrayDic    = "+ json.dumps( bodyDataJson['masterProcessRemarkArrayDic']		)+";\n"\
                     + "var masterAssetArrayDic 	       = "+ json.dumps( bodyDataJson['masterAssetArrayDic']			    )+";\n"\
                     + "var masterValidationTypeArrayDic   = "+ json.dumps( bodyDataJson['masterValidationTypeArrayDic']	)+";\n"\
                     + "var masterCourierArrayDic	       = "+ json.dumps( bodyDataJson['masterCourierArrayDic']		    )+";\n"\
                     + "var masterProductArrayDic	       = "+ json.dumps( bodyDataJson['masterProductArrayDic']		    )+";\n"\
                     + "var masterBankArrayDic	       	   = "+ json.dumps( bodyDataJson['masterBankArrayDic']			    )+";\n"\
                     + "var masterRelationArrayDic	       = "+ json.dumps( bodyDataJson['masterRelationArrayDic']		    )+";\n"\
                     + "var masterValidationStatusArrayDic = "+ json.dumps( bodyDataJson['masterValidationStatusArrayDic']	)+";\n"\
                     + "var masterStateArrayDic 	       = "+ json.dumps( bodyDataJson['masterStateArrayDic']			    )+";\n"\
                     + "var masterVillageArrayDic	       = "+ json.dumps( bodyDataJson['masterVillageArrayDic']		    )+";"    	    	    	    	    
    
        #Open the file Name of master Data and update it
        f 	 = open(settings.MASTER_LOCATION+'masterData.js','w')
        f.write(masterData) 	# python will convert \n to os.linesep
        f.close()
        response = "Successful"
        logger.info("Exiting masterJsUpdate(request): USER --> "+str(request.user)) 
        return HttpResponse(json.dumps({"data":response}), content_type="application/json")	

    except Exception as e:
        logger.error("Exception raised in masterJsUpdate(request) --> %s " %e)

#Master Locations Details:
#=========================>
@csrf_exempt
def masterLocation(request):
    logger.info("Entering masterLocation(request): USER --> "+str(request.user)) 
    data 	= request.body
    user    = request.user
    
    try:
        url 		= "http://"+settings.API_IP_AVRO +'/'+ data
        logger.info("Master Location URL :"+url)
        
        request 	= urllib2.Request(url)
        request.add_header('Content-Type', 'avro/binary')
        result 		= urllib2.urlopen(request)
        serialized_data = io.BytesIO(result.read())
        
        #Decoding in Avro:	
        response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"masterlocationschema.avsc").read() )
        decoder 	= avro.io.BinaryDecoder(serialized_data)
        reader 		= avro.io.DatumReader(response_schema)
        response 	= reader.read(decoder)
        data 		= json.loads(json.dumps(response))
        
        logger.info("Exiting masterLocation(request): USER --> "+str(user)) 
        return HttpResponse(json.dumps(data['masterLocationArray']), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in masterLocation(request): %s" %e) 
        return {'message':'failed'}    

#village Details:
#=========================>
@csrf_exempt
def villageDetails(request):
    logger.info("Entering villageDetails(request) : USER --> "+str(request.user))
    data 	= request.body
    user    = request.user
    
    try:
        url 		= "http://"+settings.API_IP_AVRO +'/'+ data
        logger.info("URL - Village Details : "+url)
        
        request 	= urllib2.Request(url)
        request.add_header('Content-Type', 'avro/binary')
        result 		= urllib2.urlopen(request)
        serialized_data = io.BytesIO(result.read())

        #Decoding in Avro:	
        response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"masterlocationschema.avsc").read() )
        decoder 	= avro.io.BinaryDecoder(serialized_data)
        reader 		= avro.io.DatumReader(response_schema)
        response 	= reader.read(decoder)
        data 		= json.loads(json.dumps(response))
        logger.info("Exiting villageDetails(request) : USER --> "+str(user))
        return HttpResponse(json.dumps(data['masterLocationArray']), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in villageDetails(request) : %s" %e)
        return {'message':'failed'}  

#pincode Details:
#=========================>
@csrf_exempt
def pincodeDetails(request):
    logger.info("Entering pincodeDetails(request) : USER --> "+str(request.user))
    data 	= request.body
    user    = request.user
    
    try:
        url 		= "http://"+settings.API_IP_AVRO +'/'+ data
        logger.info("URL - PINcode details: "+url)
        
        request 	= urllib2.Request(url)
        request.add_header('Content-Type', 'avro/binary')
        result 		= urllib2.urlopen(request)
        serialized_data = io.BytesIO(result.read())
    
        #Decoding in Avro:	
        response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"masterlocationschema.avsc").read() )
        decoder 	= avro.io.BinaryDecoder(serialized_data)
        reader 		= avro.io.DatumReader(response_schema)
        response 	= reader.read(decoder)
        data 		= json.loads(json.dumps(response))
        
        logger.info("Exiting pincodeDetails(request) : USER --> "+str(user))
        return HttpResponse(json.dumps(data['masterLocationArray']), content_type="application/json")

    except Exception as e:
        logger.error("Exception in pincodeDetails(request) : %s" %e)
        return {'message':'failed'}  	  	

# Resident Form Submit:
@csrf_exempt
@login_required(login_url='/login/')
def submitResidentFormAdd(request):
    logger.info("Entering submitResidentFormAdd(request) : USER --> "+str(request.user) ) 
    context      = RequestContext(request)
    context.user = request.user
    taskId 	 = ''
    processData	 = ''
    comments_data = ''
    
    try:	
        FORM_DATA = ''
        if "form_data" in request.POST:
            FORM_DATA= json.loads(request.POST["form_data"])
        
        if "process_data" in request.POST:
            processData  = json.loads(request.POST["process_data"])
        
        if "task_id" in request.POST:		    
            taskId = request.POST["task_id"]
           
        if "comments" in request.POST:		    
            comments_data = json.loads(request.POST["comments"])

        #Saving Image function and defining a location to save IMAGES:	
        data = updateImage(FORM_DATA, request)
        logger.info("Data from UpdateImage :")
        logger.info(data)
        
        import io	
        #AVRO SCHEMA LOAD FOR MEMBER'S RESIDENTIAL VERIFICATION:
        schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"residenceverificationschema.avsc").read() )
        writer 		= avro.io.DatumWriter(schema)
        bytes_writer 	= io.BytesIO()
        encoder 	= avro.io.BinaryEncoder(bytes_writer)
        
        #ENCODE DATA	
        writer.write( data , encoder)
        binary_data=bytes_writer.getvalue()
        
        try:
            url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addresident/resiverification/details'
            logger.info("Insert Residence details URL :"+url)
            
            byte_data 	= bytes_writer.getvalue()
            request1  	= urllib2.Request( url , bytes_writer.getvalue() )
            request1.add_header( 'Content-Type' , 'avro/binary' )
            request1.get_method 	= lambda: 'POST'
            result1 	= urllib2.urlopen( request1 )
            serialized_data = io.BytesIO( result1.read() )
            
            try:
                response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())
                decoder 	= avro.io.BinaryDecoder(serialized_data)
                reader 		= avro.io.DatumReader(response_schema)
                response 	= reader.read(decoder)
                
                if "comments" in request.POST:
                        taskremarks   = comments_data
        
                        #Validation Schema for Data Comments 
                        schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
                        writer 		= avro.io.DatumWriter(schema)
                        bytes_writer 	= io.BytesIO()
                
                        encoder 	= avro.io.BinaryEncoder(bytes_writer)
                        writer.write( taskremarks , encoder)
            
                        url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
                        logger.info("URL to get comments: "+url2)
    
                        #Validation API:
                        request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
                        request2.add_header('Content-Type', 'avro/binary')
                        request2.get_method 	= lambda: 'POST'
                        result2   = urllib2.urlopen(request2)
                        serialized_data_2 = io.BytesIO(result2.read())

		        #Process Submission --> updateTaskprocess:
		        bodyData 	= json.dumps(processData)
		        serialized_data = updateTaskprocess(request, bodyData, taskId)
		        
                logger.info("Exiting submitResidentFormAdd(request) : USER --> "+str(request.user))  
                return HttpResponse( json.dumps( {"message":"Successful", "data": serialized_data} ), content_type="application/json" )
            
            except Exception as e:
                logger.error("Exception raised in submitResidentFormAdd(request) --> response of Member creation API reader - api response 1 : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in submitResidentFormAdd(request) --> response of Member creation API - api call : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

    except Exception as e:
        logger.error("Exception raised in submitResidentFormAdd(request) --> Main : %s" %e)
        return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )


# Adding a Business verification Details--> ADD FORM:
#====================================================>
@csrf_exempt
@login_required(login_url='/login/')
def submitBusinessFormAdd(request):
    logger.info("Entering submitBusinessFormAdd(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    
    try:	
        FORM_DATA = ''
        if "form_data" in request.POST:
            FORM_DATA   = json.loads(request.POST["form_data"])
            
        if "process_data" in request.POST:
            processData  = json.loads(request.POST["process_data"])
        
        if "task_id" in request.POST:		    
            taskId = request.POST["task_id"]
           
	if "comments" in request.POST:		    
            comments_data = json.loads(request.POST["comments"])
        
        #Saving Image function and defining a location to save IMAGES:	
        data = updateImage(FORM_DATA, request)
        
        logger.info("Data from UpdateImage :")
        logger.info(data)
        
        import io	
        #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
        schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"businessverificationschema.avsc").read() )
        writer 		= avro.io.DatumWriter(schema)
        bytes_writer 	= io.BytesIO()
        encoder 	= avro.io.BinaryEncoder(bytes_writer)
        #ENCODE DATA	
        writer.write( FORM_DATA , encoder)

        try:
            url 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addbusiness/bizverification/details'
            logger.info("Insert Business Details - URL :"+url)
            byte_data 	= bytes_writer.getvalue()
            request1  	= urllib2.Request( url , bytes_writer.getvalue() )
            request1.add_header( 'Content-Type' , 'avro/binary' )
            request1.get_method 	= lambda: 'POST'
            result1 	= urllib2.urlopen( request1 )
            serialized_data = io.BytesIO( result1.read() )

            try:
                response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                decoder 	= avro.io.BinaryDecoder(serialized_data)
                reader 		= avro.io.DatumReader(response_schema)
                response 	= reader.read(decoder)

		if "comments" in request.POST:
                        taskremarks   = comments_data
                        #Validation Schema for Data Comments 
                        schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
                        writer 		= avro.io.DatumWriter(schema)
                        bytes_writer 	= io.BytesIO()
                
                        encoder 	= avro.io.BinaryEncoder(bytes_writer)
                        writer.write( taskremarks , encoder)
            
                        url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
                        logger.info("URL to get comments: "+url2)
    
                        #Validation API:
                        request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
                        request2.add_header('Content-Type', 'avro/binary')
                        request2.get_method 	= lambda: 'POST'
                        result2   = urllib2.urlopen(request2)
                        serialized_data_2 = io.BytesIO(result2.read())
                        
		        #Process Submission --> updateTaskprocess:
		        bodyData 	= json.dumps(processData)
		        serialized_data = updateTaskprocess(request, bodyData, taskId)
		        response["message"]="Success"
		        
                logger.info("Exiting submitBusinessFormAdd(request): USER -->"+str(request.user))
                return HttpResponse( json.dumps( response ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in submitBusinessFormAdd(request): --> response of Member creation API reader - api response 1 : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in submitBusinessFormAdd(request): --> response of Member creation API - api call : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

    except Exception as e:
        logger.error("Exception raised in submitBusinessFormAdd(request): --> Main : %s" %e)
        return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

@csrf_exempt
@login_required(login_url='/login/')
def uploadDocument(request):
    logger.info("Entering uploadDocument(request): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    user 	 = request.user
    task_id 	 = ''
    dispatchDetails = ''
    ProcessType = ''
    taskremarks     = ''
    if request.method == 'POST':
        try:	
            FORM_DATA     = ''	
            PROCESS_DATA  = ''
            comments_data = ''
                
            if "form_data" in request.POST:
                formData = request.POST["form_data"]
                FORM_DATA = json.loads(formData)
                
            if "taskid" in request.POST:		    
                task_id = request.POST["taskid"]
            
            if "comments" in request.POST:		    
                comments_data = json.loads(request.POST["comments"])		    		   
        
            if "process_data" in request.POST:
                processData  = request.POST["process_data"]
                PROCESS_DATA = json.loads(processData)
                
            if "ProcessType" in request.POST:		    
                ProcessType = request.POST["ProcessType"]
            
            if "dispatchDetails" in request.POST:
                dispatchDetails = request.POST["dispatchDetails"]
                dispatchDetails = json.loads(dispatchDetails);
                
            #Saving Image function and defining a location to save IMAGES:	
            data = updateImage(FORM_DATA, request)
            logger.info("Data from  updateImage: ")
            logger.info(data)

            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"uploaddocschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
            #ENCODE DATA	
            writer.write( data , encoder)

            try:
                if ProcessType == "ReUpload":
                    url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/updateup/uploaddocs'
                    logger.info("Reupload Documents URL : "+url)
                    byte_data 	= bytes_writer.getvalue()
                    request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                    request1.add_header( 'Content-Type' , 'avro/binary' )
                    request1.get_method 	= lambda: 'PUT'
                    result1 	= urllib2.urlopen( request1 )
                    serialized_data = io.BytesIO( result1.read() )
                
                else:
                    url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addupdocs/uploaddocs' 		    	     	           		    	     	          
                    logger.info("Upload Documents URL : "+url)
                    byte_data 	= bytes_writer.getvalue()
                    request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                    request1.add_header( 'Content-Type' , 'avro/binary' )
                    request1.get_method 	= lambda: 'POST'
                    result1 	= urllib2.urlopen( request1 )
                    serialized_data = io.BytesIO( result1.read() )

                try:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                    decoder 	= avro.io.BinaryDecoder(serialized_data)
                    reader 		= avro.io.DatumReader(response_schema)
                    response 	= reader.read(decoder)
                        
                    if "comments" in request.POST:
                        taskremarks   = comments_data
        
                        #Validation Schema for Data Comments 
                        schema 		= avro.schema.parse( open(settings.SCHEMA_LOCATION+"mlvalidationschema.avsc").read() )
                        writer 		= avro.io.DatumWriter(schema)
                        bytes_writer 	= io.BytesIO()
                
                        encoder 	= avro.io.BinaryEncoder(bytes_writer)
                        writer.write( taskremarks , encoder)
            
                        url2 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmlv/mlvalidation'
                        logger.info("URL to get comments: "+url2)
    
                        #Validation API:
                        request2 	  = urllib2.Request(url2,bytes_writer.getvalue())
                        request2.add_header('Content-Type', 'avro/binary')
                        request2.get_method 	= lambda: 'POST'
                        result2   = urllib2.urlopen(request2)
                        serialized_data_2 = io.BytesIO(result2.read())

                    #PRocess Update:
                    if PROCESS_DATA["processupdate"]:
                        if "Cibil_Verification_Status" in PROCESS_DATA["processupdate"]['variables']:
                            updateTaskRework( PROCESS_DATA["processupdate"],task_id)
                        elif "Resident_Verification_Status" in PROCESS_DATA["processupdate"]['variables']:
                            updateTaskRework( PROCESS_DATA["processupdate"],task_id)
                        elif "Business_Verification_Status" in PROCESS_DATA["processupdate"]['variables']:
                            updateTaskRework( PROCESS_DATA["processupdate"],task_id)
                        elif "Despatch_Doc_Status" in PROCESS_DATA["processupdate"]['variables']:
                            savedespatchdoc(json.dumps(dispatchDetails),json.dumps(PROCESS_DATA["processupdate"]),task_id)
                        else:
                            bodyData        = json.dumps(PROCESS_DATA['processupdate'])
			    
                            serialized_data = updateTaskprocess(request, bodyData, str(PROCESS_DATA['task_id']))

                    response["message"]="Success"
                    logger.info("Exiting uploadDocument(request): USER --> "+str(user)) 
                    return HttpResponse( json.dumps( response ), content_type="application/json" )

                except Exception as e:
                    logger.error("Exception raised in uploadDocument(request): -->  response of Member creation API reader - api response 1 : %s" %e)
                    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in uploadDocument(request): -->  response of Member creation API - api call : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in uploadDocument(request): --> Main :: %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )


def savedespatchdoc(dcphysicalArray,PROCESS_DATA,task_id):
    logger.info("Entering savedespatchdoc(dcphysicalArray,PROCESS_DATA,task_id): ")
    taskId       = ''
    process      = ''
    despatchData = ''
    
    try:	
        #Get Token to Authenticate OpenAM:
        despatchData = json.loads(dcphysicalArray)
        process = json.loads(PROCESS_DATA)

        import io	
        #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
        schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"dispatchdocumentschema.avsc").read() )
        writer 		= avro.io.DatumWriter(schema)
        bytes_writer 	= io.BytesIO()
        encoder 	= avro.io.BinaryEncoder(bytes_writer)
        #ENCODE DATA	
        writer.write( despatchData , encoder)

        url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addphydoccheqdisp/dcphysical'
        logger.info("Add Dispatch docs - URL:"+url)

        byte_data 	= bytes_writer.getvalue()
        request1  	= urllib2.Request( url , bytes_writer.getvalue() )
        request1.add_header( 'Content-Type' , 'avro/binary' )
        request1.get_method 	= lambda: 'POST'
        result1 	= urllib2.urlopen( request1 )
        serialized_data = io.BytesIO( result1.read() )

        for data in despatchData["dcphysicalArray"]:
            taskId = data["task_id"]
            serialized_data = updateTaskRework(process, taskId)

        logger.info("Exiting savedespatchdoc(dcphysicalArray,PROCESS_DATA,task_id): ")
        return
    except Exception as e:
        logger.error("Exception raised in savedespatchdoc(dcphysicalArray,PROCESS_DATA,task_id): Main :: %s" %e)
        return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

@csrf_exempt
@login_required(login_url='/login/')
def sendCheque(request):
    logger.info("Entering sendCheque(request): view :"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    taskId	 = ''
    
    if request.method == 'POST':
        try:	
            FORM_DATA = ''	
            if "form_data" in request.POST:
                formData = request.POST["form_data"]
                FORM_DATA = json.loads(formData)
        
            if "taskId" in request.POST:
                taskId = request.POST["taskId"]

            #Saving Image function and defining a location to save IMAGES:	
            data = updateImage(FORM_DATA, request)
            logger.info("Data from updateImage: ")
            logger.info(data)
            
            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"memberchequeschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)

            #ENCODE DATA	
            writer.write( data , encoder)

            try:
                url 		= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addmemcheque/memcheque/'
                logger.info("Add send Cheque details - URL : "+url)
        
                byte_data 	= bytes_writer.getvalue()
                request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                request1.add_header( 'Content-Type' , 'avro/binary' )
                request1.get_method 	= lambda: 'POST'
                result1 	= urllib2.urlopen( request1 )
                serialized_data = io.BytesIO( result1.read() )

                try:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"memberchequeschema.avsc").read())	#response_schema)
                    decoder 	= avro.io.BinaryDecoder(serialized_data)
                    reader 		= avro.io.DatumReader(response_schema)
                    response 	= reader.read(decoder)

                    bodyData        = json.dumps({"variables": { "Book_Loan_&_Cheque_Status" : { "value" : "Send" } } })
                    serialized_data = updateTaskprocess(request, bodyData, taskId)

                    response["message"]="Success"
                    logger.info("Exiting sendCheque(request): view :"+str(request.user))
                    return HttpResponse( json.dumps( response ), content_type="application/json" )

                except Exception as e:
                    logger.error("Exception raised in sendCheque(request): --> response of Member creation API reader - api response 1 : %s" %e)
                    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in sendCheque(request): --> response of Member creation API - api call : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in sendCheque(request):  --> Main : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

@csrf_exempt
@login_required(login_url='/login/')
def preparecheque(request):
    logger.info("Entering preparecheque(request):  USER --> "+str(request.user) ) 
    context      = RequestContext(request)
    context.user = request.user
    taskId       = ''
    process      = ''
    despatchData = ''
    
    if request.method == 'POST':
        try:	
            data =  json.loads(request.body)
            if 'preparecheque' in data:
                despatchData = data['preparecheque']
                process      = data['processDetails']
                taskId       = data['taskid']	                

            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	    = avro.schema.parse( open(settings.SCHEMA_LOCATION+"preparechequeschema.avsc").read() )
            writer 		    = avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)

            #ENCODE DATA	
            writer.write( despatchData , encoder)

            try:
                url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addpreparecheque/preparechek'
                logger.info("Add Prepare Cheque Details - URL :"+url)
                
                byte_data 	= bytes_writer.getvalue()
                request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                request1.add_header( 'Content-Type' , 'avro/binary' )
                request1.get_method 	= lambda: 'POST'
                result1 	= urllib2.urlopen( request1 )
                serialized_data = io.BytesIO( result1.read() )
            
                try:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                    decoder 	= avro.io.BinaryDecoder(serialized_data)
                    reader 		= avro.io.DatumReader(response_schema)
                    response 	= reader.read(decoder)
        
                    if 'processDetails' in data:
                        bodyData        = json.dumps(process)
                        serialized_data = updateTaskprocess(request, bodyData, taskId)
                        
                    response["message"]="Success"
                    logger.info("Exiting preparecheque(request):  USER --> "+str(request.user) ) 
                    return HttpResponse( json.dumps( response ), content_type="application/json" )

                except Exception as e:
                    logger.error("Exception raised in preparecheque(request) : --> response of Member creation API reader - api response 1 : %s" %e)
                    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in preparecheque(request) : --> response of Member creation API - api call- api response 1 : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in preparecheque(request) : --> Main : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

@csrf_exempt
@login_required(login_url='/login/')
def disburseChequeAndPreEmi(request):
    logger.info("Entering disburseChequeAndPreEmi(request): view :"+str(request.user))
    context         = RequestContext(request)
    context.user    = request.user
    taskId          = ''
    process         = ''
    disburseCheque  = ''
    
    if request.method == 'POST':
        try:	
            data =  json.loads(request.body)
            
            if 'disburseCheque' in data:
                    disburseCheque = data['disburseCheque']
                    process      = data['processDetails']
                    taskId       = data['taskid']
                    
            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"disburseandcollectpreemichequeschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
        
            #ENCODE DATA	
            writer.write( disburseCheque , encoder)

            try:
                url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/adddispre/disbursepreemi/'
                logger.info("Add Disburse Cheque & Pre-EMI  - URL :"+url)
            
                byte_data 	= bytes_writer.getvalue()
                request1  	= urllib2.Request( url , bytes_writer.getvalue() )
                request1.add_header( 'Content-Type' , 'avro/binary' )
                request1.get_method 	= lambda: 'POST'
                result1 	= urllib2.urlopen( request1 )
                serialized_data = io.BytesIO( result1.read() )

                try:
                    response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
                    decoder 	= avro.io.BinaryDecoder(serialized_data)
                    reader 		= avro.io.DatumReader(response_schema)
                    response 	= reader.read(decoder)

                    if 'processDetails' in data:
                        bodyData        = json.dumps(process)
                        serialized_data = updateTaskprocess(request, bodyData, taskId)

                    response["message"]="Success"
                    logger.info("Exiting disburseChequeAndPreEmi(request): view :"+str(request.user))
                    return HttpResponse( json.dumps( response ), content_type="application/json" )

                except Exception as e:
                    logger.error("Exception raised in disburseChequeAndPreEmi(request):  --> response of Member creation API reader - api response 1 : %s" %e)
                    return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

            except Exception as e:
                logger.error("Exception raised in disburseChequeAndPreEmi(request):  --> response of Member creation API - api call : %s" %e)
                return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in disburseChequeAndPreEmi(request):  --> Main :: %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )


@login_required(login_url='/login/')
def tattaskdetails( request ):
    print "\nFUNCTION ( tattaskdetails ) User : "+str( request.user )
    tokenId = ''
    token = ''
    role        = ''
    user        = ''

    try:
        #Added TO Check with SSO:
        request.user  =  user
        groupNameList = [ role ]
        asignee       = []

        #MY TASK DATA:
        data_obj_myTask = { "assignee" : ""+ str( request.user ) +"" }
	
        #MY TASK URL:
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task'
	print "request.body ::"
	print request.body

	if request.body:
	    bodyData 	  = json.dumps(json.loads(request.body))
	    r_Task = urllib2.Request( url_Task, bodyData , headers = { 'Content-Type' : 'application/json' })
	else:
            r_Task = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })

        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() )
        taskCount = {}

        for data in serialized_data_Task:
            if data["name"] in taskCount:
                taskCount [data["name"]] = taskCount[data["name"]] + 1
            else:
                taskCount [data["name"]] = 1
                
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:
        taskData = {  'Task' : taskCount
        }
	
	taskData = json.dumps(taskData)
        print taskData

        response = HttpResponse(taskData, content_type='text/plain')
        response['Content-Length'] = len( taskData )
        return response

    except Exception as e:
        print "\nEXCEPTION in tattaskdetails %s"  %e
        return
        
@csrf_exempt
@login_required(login_url='/login/')
def tatReportList( request ):
    print "\nFUNCTION ( tatReportList ) User : "+str( request.user )
    tokenId = ''
    token = ''
    role        = ''
    user        = ''
    provar	= ''
	
    data      = json.loads(request.body)
    print data
    #return False
    
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	fromDate  = data['fromDate']
	toDate    = data['toDate'] 

	if data.has_key('level'):
	    level= data['level']

	if data.has_key('regionName'):	    	
	    regionName    = data['regionName']   

	if data.has_key('clusterOffice'):
	    clusterOffice = data['clusterOffice']

	if data.has_key('cluster'):
	    cluster = data['cluster']
	    cluster = str(cluster).zfill(3)

	if data.has_key('userName'):
	    userName  = data["userName"]
	    
	provar = { 
			"createdAfter"      : fromDate,    "createdBefore"	: toDate   , 
			"processVariables":[]      }
	
	print "provar"
	print provar   

	if (level == "region"):
	    if len(regionName) > 0:	
	        provar["processVariables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	if (level == "cluster office"):
	    if len(clusterOffice) > 0:	
	        provar["processVariables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	if (level == "cluster center"):
	    if len(cluster) > 0:	
   	        provar["processVariables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	if (level == "user"):
	    if len(userName) > 0:	
	        provar["processVariables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }]    

	print 'provar *-*-*-*-*-*-*-*-*-*-*'
	print provar

        #Added TO Check with SSO:
        request.user  =  user
        groupNameList = [ role ]
        asignee       = []

        #MY TASK DATA:
        data_obj_myTask = { "assignee" : ""+ str( request.user ) +"" }
	
        #MY TASK URL:
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task'
	print "request.body ::"
	print request.body
	print provar

	if request.body:
	    bodyData 	  = json.dumps(provar)
	    r_Task = urllib2.Request( url_Task, bodyData , headers = { 'Content-Type' : 'application/json' })
	else:
            r_Task = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })

        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() )
        taskCount = {}

        for data in serialized_data_Task:
            if data["name"] in taskCount:
                taskCount [data["name"]] = taskCount[data["name"]] + 1
            else:
                taskCount [data["name"]] = 1
                
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:
        taskData = {  'Task' : taskCount
        }
	
	taskData = json.dumps(taskData)
        print taskData

        response = HttpResponse(taskData, content_type='text/plain')
        response['Content-Length'] = len( taskData )
        return response

    except Exception as e:
        print "\nEXCEPTION in tatReportList %s"  %e
        return        
        

@login_required(login_url='/login/')	
def getLoanInfoByDate(request,fromDate,toDate,userName):
    logger.info("Entering getLoanInfoByDate(request,fromDate,toDate,userName): USER -->"+str(request.user))
    if userName == "null":
        url = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readsearchdetails/search/'+fromDate+"/"+toDate
        logger.info("URL to get Loan details only by dates: "+url)
    else:
        url = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readsearchdetails/search/'+fromDate+"/"+toDate+"/"+userName
        logger.info("URL to get Loan details by Username: "+url)
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

        response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"searchdetailschema.avsc" ).read() )
        request1        = urllib2.Request(url)
        request1.add_header('Content-Type', 'avro/binary')
        result1         = urllib2.urlopen(request1)
        serialized_data = io.BytesIO(result1.read())
        
        #Decoding in Avro:	
        decoder 	 = avro.io.BinaryDecoder(serialized_data)
        reader 	 	 = avro.io.DatumReader(response_schema)
        response 	 = reader.read(decoder)
        responseData 	 = json.loads(json.dumps(response))	
        
        logger.info("Exiting getLoanInfoByDate(request,fromDate,toDate,userName): USER -->"+str(request.user))
        return HttpResponse(json.dumps(responseData), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in getLoanInfoByDate(request,fromDate,toDate,userName): --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


@login_required(login_url='/login/')	
def FilterLoansByUser(request):
    logger.info("Entering FilterLoansByUser(request): USER -->"+str(request.user))
    context      	= RequestContext(request)
    user	        = str(request.user)
    
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

	userIds   = []
    	userList  = []
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = {"userList":userList, 'user':user, "groups":groupName	}
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting FilterLoansByUser(request): USER -->"+str(request.user))
        return render_to_response("FilterLoansByDate.html", { 'masterData':masterData, 'role':groups }, context_instance=RequestContext(request))
    except Exception as e:
        logger.error("Exception raised in FilterLoansByUser(request): --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
        

'''@login_required(login_url='/login/')
def tattaskdetailsByUser 11-10-2017( request,userName ):
    logger.info("Entering tattaskdetailsByUser(request,userName): USER -->"+str(request.user))

    try:	
        #MY TASK URL:
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task?processVariables=DistributorUid_eq_'+userName
        logger.info("Tasks List by User - URL :"+url_Task)
            
        r_Task = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })
        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() )   

        taskCount = {}
        for data in serialized_data_Task:
            if data["name"] in taskCount:
                taskCount [data["name"]] = taskCount[data["name"]] + 1
            else:
                taskCount [data["name"]] = 1   

        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'Task' : taskCount  }
        
        taskData = json.dumps(taskData)	
        response = HttpResponse(taskData, content_type='text/plain')
        response['Content-Length'] = len( taskData )
        logger.info("Exiting tattaskdetailsByUser(request,userName): USER -->"+str(request.user))
        return response

    except Exception as e:
        logger.error("Exception raised in tattaskdetailsByUser(request,userName):  --> %s " %e)
        return '''

#it displays all the taskcount(not for the sales user)
def tattaskdetailsByUser( request,userName ):
    logger.info("Entering tattaskdetailsByUser(request):  USER -->"+str(request.user))
    try:	
        #MY TASK URL:	
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task'
        logger.info("Get Tasklist - URL : "+url_Task)
        
        r_Task = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })
        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() )   
    
        taskCount = {}
        for data in serialized_data_Task:
            if data["name"] in taskCount:
                taskCount [data["name"]] = taskCount[data["name"]] + 1
            else:
                taskCount [data["name"]] = 1   
        
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'Task' : taskCount   }
    
        taskData = json.dumps(taskData)	
    
        response = HttpResponse(taskData, content_type='text/plain')
        response['Content-Length'] = len( taskData )
        logger.info("Exiting tattaskdetailsByUser(request):  USER -->"+str(request.user))
        return response

    except Exception as e:
        logger.error("Exception raised in tattaskdetailsByUser(request,userName):  --> %s " %e)
        return 

@login_required(login_url='/login/')
def tattaskdetailsByUser_old( request,userName ):
    logger.info("Entering tattaskdetailsByUser(request,userName): USER -->"+str(request.user))

    try:	
        #MY TASK URL:
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task?processVariables=DistributorUid_eq_'+userName
        logger.info("Tasks List by User - URL :"+url_Task)
            
        r_Task = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })
        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() )   
      
        logger.info("Exiting tattaskdetailsByUser(request,userName): USER -->"+str(request.user))
        return HttpResponse(json.dumps(serialized_data_Task), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in tattaskdetailsByUser(request,userName):  --> %s " %e)
        return  



@login_required(login_url='/login/')
def tatReportByUser(request):
    logger.info("Entering tatReportByUser(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    logger.info("Exiting tatReportByUser(request): USER -->"+str(request.user))
    return render_to_response("tatReportUser.html", {"userName":context.user})


'''@login_required(login_url='/login/')	
def getRejectedList(request):
    logger.info("Entering getRejectedList(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    try:	
	groups 	  = request.user.groups.values_list('name',flat=True)
        logger.info("Exiting getRejectedList(request): USER -->"+str(request.user))
        return render_to_response('processList.html',{"status":"Rejected", 'role':groups})
    except Exception as e:
        logger.error("Exception raised in getRejectedList(request):  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")'''

@login_required(login_url='/login/')	
def getRejectedList(request):
    logger.info("Entering getRejectedList(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    user	        = str(request.user)
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

	userIds   = []
    	userList  = []
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = { "userList":userList, 'user':user, "groups":groupName,  "status":"Rejected"  }
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting getRejectedList(request): USER -->"+str(request.user))
        return render_to_response('processList.html', { 'masterData':masterData, 'role':groups}, context_instance=RequestContext(request))
    except Exception as e:
        logger.error("Exception raised in getRejectedList(request):  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

'''@login_required(login_url='/login/')     	     	
def getApprovedList(request):
    logger.info("Entering getApprovedList(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    groups 	 = request.user.groups.values_list('name',flat=True)
    
    try:	
        logger.info("Exiting getApprovedList(request): USER -->"+str(request.user))
        return render_to_response('processList.html',{"status":"Approved", 'role':groups}, context_instance=RequestContext(request))
    except Exception as e:
        logger.error("Exception raised in getApprovedList(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")'''

@login_required(login_url='/login/')     	     	
def getApprovedList(request):
    logger.info("Entering getApprovedList(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    user	        = str(request.user)
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
	userIds   = []
    	userList  = []
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = { "userList":userList, 'user':user, "groups":groupName,  "status":"Approved"  }
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting getApprovedList(request): USER -->"+str(request.user))
        return render_to_response('processList.html', { 'masterData':masterData, 'role':groups}, context_instance=RequestContext(request))
    except Exception as e:
        logger.error("Exception raised in getApprovedList(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
   
@csrf_exempt     
def approvedListfilter(request):
    logger.info("Entering approvedListfilter(request): USER -->"+str(request.user))
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    Approved_procInstKey  = {}	
    
    data      = json.loads(request.body)
    print data
    #return False
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']   
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    if data.has_key('cluster'):
		cluster = data['cluster']
		if(len(str(cluster)))>0:	
		    cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]

	    
	    # Approved
	    provar1 = { "activityName":"Assess Verification Report", "finishedAfter": fromDate,  "finishedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 
	    
	    print "serialized_data1"
	    print serialized_data1

	    processInstId = []	
	    for data in serialized_data1["DATA"]:
		processInstId.append(data['processInstanceId'])

            if len(processInstId) == 0 :
		    allRegiondetails = {"memdetails":[]} 
	    	    region_data      = json.dumps(allRegiondetails)
	    
	    	    logger.info("Exiting approvedListfilter(request): USER -->"+str(request.user))
	    	    return HttpResponse(region_data, content_type="application/json") 


	    
	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    #provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    provar = { "processInstanceIds": processInstId , "variables":[] }

	    '''if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }] '''

	  
	    if (len(str(regionName))>0):
		provar["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
	    if (len(str(clusterOffice))>0):
		provar["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
	    if (len(str(cluster))>0):
		provar["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
	    if (len(str(userName))>0):
		provar["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
 	
	    provar["variables"].append({"operator": "eq", "name": "Resident_Verification_Status", "value": "Approved"})
	    provar["variables"].append({"operator": "eq", "name": "Business_Verification_Status", "value": "Approved"})	
		
	    print 'provar'
	    print provar

	    #return False	
	   
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 

	    print "serialized_data"
	    print serialized_data	
	    #return False	
	
	    	 
	    for data in serialized_data["DATA"]:
		Task_procInstKey[data["id"]] = data 
		#Added
		processInstancesID.append(data["id"]) 
	    Approved_procInstKey=Task_procInstKey	
	
	    '''for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = data["activityId"]
		    Approved_procInstKey[data["processInstanceId"]]	      = Task_procInstKey[data["processInstanceId"]]	  
		    processInstancesID.append(data["processInstanceId"])  '''
		    
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		'''if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"])'''
		
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    print "Approved_procInstKey\n\n"
	    print Approved_procInstKey
		    
	    for myTaskData in Approved_procInstKey:
		Approved_procInstKey[myTaskData]["activityId"]= "UserTask_9"
		dataList.append(Approved_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    logger.info("Exiting approvedListfilter(request): USER -->"+str(request.user))
	    
	    return HttpResponse(region_data, content_type="application/json")  
	
    except Exception as e:
        logger.error("Exception raised in processListfilter(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json") 


@csrf_exempt     
def approvedListfilter2(request):
    logger.info("Entering approvedListfilter(request): USER -->"+str(request.user))
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    Approved_procInstKey  = {}	
    
    data      = json.loads(request.body)
    print data
    #return False
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']   
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    if data.has_key('cluster'):
		cluster = data['cluster']
		cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]
	    
	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate      }

	    if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }]    
		
	    print 'provar'
	    print provar
	    #return False	
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    
	    # Approved
	    provar1 = { "activityName":"Upload Doc", "startedAfter": fromDate,  "startedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 
	    
	    for data in serialized_data["DATA"]:
		Task_procInstKey[data["id"]] = data 

	    for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = data["activityId"]
		    Approved_procInstKey[data["processInstanceId"]]	      = Task_procInstKey[data["processInstanceId"]]	  
		    processInstancesID.append(data["processInstanceId"])  
		    
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		'''if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"])'''
		
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Approved_procInstKey:
		    Approved_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    print "Approved_procInstKey\n\n"
	    print Approved_procInstKey
		    
	    for myTaskData in Approved_procInstKey:
		Approved_procInstKey[myTaskData]["activityId"]= "UserTask_9"
		dataList.append(Approved_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    logger.info("Exiting approvedListfilter(request): USER -->"+str(request.user))
	    
	    return HttpResponse(region_data, content_type="application/json")  
	
    except Exception as e:
        logger.error("Exception raised in processListfilter(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json") 


    
@csrf_exempt
def rejectedListfilter(request):
    logger.info("Entering rejectedListfilter(request): USER -->"+str(request.user))
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    pIdVarInstance 	  = []
    Task_procInstKey      = {}  
    Rejected_procInstKey  = {}      
    
    data      = json.loads(request.body)
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']   
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    '''if data.has_key('cluster'):
		cluster = data['cluster']
		cluster = str(cluster).zfill(3)'''

	    if data.has_key('cluster'):
		cluster = data['cluster']
		if(len(str(cluster)))>0:	
		    cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]
	    

	    # Rejected
	    provar1 	     = { "canceled":"true",  "finishedAfter": fromDate,  "finishedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    # Rejected
	    provar2 	     = { "activityName": "Reject Application", "startedAfter": fromDate,  "startedBefore": toDate}
	    serialized_data2 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar2), "JSON", 'application/json') 


	    rejectedProcessInstId = []	
	    for data in serialized_data1["DATA"]:
		#Task_procInstKey[data["processInstanceId"]] = data
		rejectedProcessInstId.append(data["processInstanceId"])

	    for data in serialized_data2["DATA"]:
		#Task_procInstKey[data["processInstanceId"]] = data
		rejectedProcessInstId.append(data["processInstanceId"])

	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    #provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    provar = { "processInstanceIds": rejectedProcessInstId , "variables":[]}

	    '''if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }] '''

	    if (len(str(regionName))>0):
		provar["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
	    if (len(str(clusterOffice))>0):
		provar["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
	    if (len(str(cluster))>0):
		provar["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
	    if (len(str(userName))>0):
		provar["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
                      
	    print provar 	
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    
	   	
	    # Rejected
	    provar1 	     = { "activityName": "Reject Application", "startedAfter": fromDate,  "startedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 
	    
	    for data in serialized_data["DATA"]:
		Task_procInstKey[data["id"]] = data
		processInstancesID.append(data["id"])  

	    Rejected_procInstKey = Task_procInstKey
	    
	    '''for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] 	= data["activityId"]
		    Rejected_procInstKey[data["processInstanceId"]]		= Task_procInstKey[data["processInstanceId"]]	  
		    processInstancesID.append(data["processInstanceId"])  '''
		    	    
	     
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		'''if data["processInstanceId"] in processInstancesID:	    
		   processInstancesIDNew.remove(data["processInstanceId"]) '''
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for index in Rejected_procInstKey:
		print Rejected_procInstKey[index]
		Rejected_procInstKey[index]["activityId"] = "EndEvent_1"	
	    	dataList.append(Rejected_procInstKey[index])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    logger.info("Exiting rejectedListfilter(request): USER -->"+str(request.user))
	    
	    return HttpResponse(region_data, content_type="application/json")  
	
    except Exception as e:
        logger.error("Exception raised in rejectedListfilter(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")      


@csrf_exempt
def rejectedListfilterOld(request):
    logger.info("Entering rejectedListfilter(request): USER -->"+str(request.user))
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    pIdVarInstance 	  = []
    Task_procInstKey      = {}  
    Rejected_procInstKey  = {}      
    
    data      = json.loads(request.body)
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']   
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    if data.has_key('cluster'):
		cluster = data['cluster']
		if(len(str(cluster)))>0:
		    cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]
	    
	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate      }

	    if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }]                       
	 
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    
	    # Rejected
	    provar1 	     = { "activityName": "Reject Application", "startedAfter": fromDate,  "startedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 
	    
	    for data in serialized_data["DATA"]:
		Task_procInstKey[data["id"]] = data
	    
	    for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] 	= data["activityId"]
		    Rejected_procInstKey[data["processInstanceId"]]		= Task_procInstKey[data["processInstanceId"]]	  
		    processInstancesID.append(data["processInstanceId"])  
		    	    
	     
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		'''if data["processInstanceId"] in processInstancesID:	    
		   processInstancesIDNew.remove(data["processInstanceId"]) '''
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Rejected_procInstKey:
		    Rejected_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for index in Rejected_procInstKey:
	    	dataList.append(Rejected_procInstKey[index])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    logger.info("Exiting rejectedListfilter(request): USER -->"+str(request.user))
	    
	    return HttpResponse(region_data, content_type="application/json")  
	
    except Exception as e:
        logger.error("Exception raised in rejectedListfilter(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")      

        
     
@login_required(login_url='/login/')     	     	
def getCompletedList(request):
    logger.info("Entering getCompletedList(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    try:	
        logger.info("Exiting getCompletedList(request): USER -->"+str(request.user))
        return render_to_response('completedTaskList.html',{"status":"Completed"})
    except Exception as e:
        logger.error("Exception raised in getCompletedList(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")	


@login_required(login_url='/login/')
def getApprovedListByUser(request):
    logger.info("Entering getApprovedListByUser(request): USER -->"+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    user	        = str(request.user)

    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

	userIds   = []
    	userList  = []
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = { "userList":userList, 'user':user, "groups":groupName,  "status":"Approved"  }
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting getApprovedListByUser(request): USER -->"+str(request.user))
        return render_to_response('processList.html', { 'masterData':masterData, 'role':groups}, context_instance=RequestContext(request))
        
    except Exception as e:
        logger.error("Exception raised in getApprovedListByUser(request) :  --> %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


@login_required(login_url='/login/')
def getProcessListByDate(request,userName,status,fromDate,toDate): 
    logger.info("Entering  getProcessListByDate(request,userName,status,fromDate,toDate): USER -->"+str(request.user))
    url =""
    if userName == "null":
        url= 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/rejected/search/member/'+status+'/'+fromDate+'/'+toDate
        logger.info("Process List by dates - URL :"+url)
    else:
    	print "status"
    	print status
        url= 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/rejected/search/member/'+userName+'/'+status+'/'+fromDate+'/'+toDate
        logger.info("Process List by username - URL :"+url)
        
    try:
        response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"searchdetailschema.avsc" ).read() )
        request1        = urllib2.Request(url)
        request1.add_header('Content-Type', 'avro/binary')
        result1         = urllib2.urlopen(request1)
        serialized_data = io.BytesIO(result1.read())
    
        #Decoding in Avro:	
        decoder 	 = avro.io.BinaryDecoder(serialized_data)
        reader 	 	 = avro.io.DatumReader(response_schema)
        response 	 = reader.read(decoder)
        responseData 	 = json.loads(json.dumps(response))	
        logger.info("Exiting  getProcessListByDate(request,userName,status,fromDate,toDate): USER -->"+str(request.user))
        return HttpResponse(json.dumps(responseData), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in getProcessListByDate(request,userName,status,fromDate,toDate): --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
        
        
@login_required(login_url='/login/')
def getCompletedTaskList(request,fromDate,toDate): 
    logger.info("Entering  getCompletedTaskList(request,fromDate,toDate): USER -->"+str(request.user))
    
    try:
    	url= 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/history/activity-instance'
	logger.info("Completed Taskslist - URL :"+url)
	provar = { "activityType" : "noneEndEvent", "activityId" :"EndEvent_2", "startedAfter" : fromDate, "startedBefore": toDate  }
	
        r_Task 	= urllib2.Request( url ,json.dumps(provar ),headers = { 'Content-Type' : 'application/json' })
        taskList	= json.loads( urllib2.urlopen( r_Task ).read() ) 
        
        processInstancesID   =   []
        taskList_procInstKey =   {}

        for data in taskList:
            processInstancesID.append(data["processInstanceId"])
            taskList_procInstKey[data["processInstanceId"]] = data

        processVar_url = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
        logger.info("Process variables instances - URL :"+processVar_url)

        body_mytask_content = { "variableNameLike": "App_Mem_%" ,"processInstanceIdIn": processInstancesID}

	
        memberId_myTask 	= urllib2.Request( processVar_url ,json.dumps(body_mytask_content ),headers = { 'Content-Type' : 'application/json' })
        serialized_processVar	= json.loads( urllib2.urlopen( memberId_myTask ).read() ) 
        
        taskData = { "ProcessVariables"   :  serialized_processVar,
        	     "taskListProcessInstances"  :    taskList_procInstKey}
            
        logger.info("Exiting  getCompletedTaskList(request,fromDate,toDate): USER -->"+str(request.user))
        return HttpResponse(json.dumps(taskData), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in getCompletedTaskList(request,fromDate,toDate): --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")        

@login_required(login_url='/login/')	
def myDashBoard(request):
    logger.info("Entering myDashBoard(request): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    userGroup    = request.user.groups.values_list('name',flat=True).first()
    groups       = request.user.groups.values_list('name',flat=True)
    grpAllowed   = ['CrMgr','CrOfficer']
    try:	
        logger.info("Exiting myDashBoard(request): USER --> "+str(request.user))
        if userGroup in grpAllowed:
	    return render_to_response('myDashBoard.html', {'role':groups})
	else:
	    return render_to_response('unauthorised.html', {})
    except Exception as e:
        logger.error("Exception raised in myDashBoard(request) : -->  %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")

@login_required(login_url='/login/')	
def myDashBoardTat(request):
    logger.info("Entering myDashBoard(request): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    userGroup    = request.user.groups.values_list('name',flat=True).first()
    groups       = request.user.groups.values_list('name',flat=True)
    grpAllowed   = ['CrMgr','CrOfficer']
    print filterByVariableList(request)
    try:	
        logger.info("Exiting myDashBoard(request): USER --> "+str(request.user))
        if userGroup in grpAllowed:
	    return render_to_response('myDashBoardNew.html', {'role':groups})
	else:
	    return render_to_response('unauthorised.html', {})
    except Exception as e:
        logger.error("Exception raised in myDashBoard(request) : -->  %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


def filterByVariableList(request):
    logger.info("Entering filterByVariableList(request): USER --> "+str(request.user))
    territoryLevel  	= ""
    proVarObj		= {}
    proVarArrString 	= ""
    territoryLocCode	= ""
    territoryLocName	= ""
    from calendar import monthrange
    print monthrange(2012, 2)
 		
    
    try:
    	#USER
        user	    = request.user
        userId 	    = request.user.id  # User Id
        territoryId = user_location_map.objects.filter(username=user).values_list('territory_id', flat=True) #Territory Id

        #substituting the user id in location_map_location_hierarchy_group - table to get location hierarchy group id
        locationHGroupIdFilter = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId ).values_list('location_hierarchy_group_id_id' , flat=True)

	#substituting the loc_hgrp_id in location_hierarchy_group_location_territory_hierrarchy_map - table to get location territory hierarchy id
	queryset = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=locationHGroupIdFilter).values_list('location_territory_hierarchy_id_id', flat=True )
        
        if len(territoryId) > 0:
            territoryLevel 	= territoryId[0]
            proVarObj['level']	= territoryLevel    
        else:
            territoryLevel 	= 0
            proVarObj['level']	= 0

        if len(queryset) > 0:
            #substituting the location territory id in locaton_territory_hierrarchy table to get location details such as loc_terri_code, location_name etc            
            locationCode        = locaton_territory_hierrarchy.objects.filter(id__in=queryset).values_list('loc_terri_code' ,flat=True)
            locationName        = locaton_territory_hierrarchy.objects.filter(id__in=queryset).values_list('location_name'  ,flat=True)
	print 1
	print locationCode        
	print locationName        
         
        if locationCode != None or len(locationName) != 0:     
            if territoryLevel > 0:            
                if territoryLevel == 2:
                    regionNameArr = []
                    for index, regionName in enumerate(locationName):
                    	regionNameArr.append({"name": "regionName", "value": str(regionName), "operator": "eq"   })                    
		    proVarArrString +=json.dumps(regionNameArr)
                elif territoryLevel == 3:
                    clusterOfficeCode = []
                    for index, clusterOfficeCodeData in enumerate(locationCode):
                      	 clusterOfficeCode.append({"name": "clusterOfficeCode", "value": str(clusterOfficeCodeData), "operator": "eq"   })
                    proVarArrString +=json.dumps(clusterOfficeCode)
                elif territoryLevel == 4:
                    clusterCenterCode = []                
                    for index, clusterCenterCodeData in enumerate(locationCode):
                    	clusterCenterCode.append({"name": "clusterCenterCode", "value": str(clusterCenterCodeData), "operator": "eq"  })	
                    proVarArrString +=json.dumps(clusterCenterCode)                    	
                    
    except Exception as e:
        logger.error("Exception raised in filterByVariableList(request)  : --> %s" %e)

    proVarObj['processVariables'] = proVarArrString
    logger.info("Exiting filterByVariableList(request): USER --> "+str(request.user))
    return proVarObj	

'''@login_required(login_url='/login/')     	     	
def tatReport(request):
    logger.info("Entering tatReport(request): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user  = request.user
    logger.info("Exiting tatReport(request): USER --> "+str(request.user))     
    return render_to_response("tatReport.html", context_instance=RequestContext(request))'''
    
@login_required(login_url='/login/')     	     	
def tatReport(request):
    logger.info("Entering tatReport(request): USER --> "+str(request.user))
    context      	= RequestContext(request)
    context.user  	= request.user
    user	   	= str(request.user)
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

	userIds   = []
    	userList  = []
    	
    	#{'StateName': u'Tamilnadu', 'regionCode': u'', 'clusterOfficeName': u'Thiruparankundram', 
    	#'clusterOfficeCode': u'34', 'StateCode': u'TN', 'regionName': u'Madurai'}

    	locationDetails = getLocationCode(request,str(request.user))
	print "locationDetails\n\n" 
	print locationDetails
	#if not locationDetails.has_key('clusterCenterCode111'):
		#print locationDetails['clusterCenterCode']		

    	locationName	= None
    	locationValue	= None
    	if len(locationDetails.keys())> 0 :
    	    if locationDetails.has_key('clusterOfficeCode'):
    	   	locationName	= 'clusterOfficeCode'
	    	locationValue	= locationDetails['clusterOfficeCode']
    	    if locationDetails.has_key('clusterCenterCode'):
    	   	locationName	= 'clusterCenterCode'
	    	locationValue	= locationDetails['clusterCenterCode']	    	
    	    		
    	#	return False
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = {"userList":userList, 'user':user, "groups":groupName	}
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting tatReport(request): USER --> "+str(request.user))  
        return render_to_response("tatReport.html", { 'masterData':masterData ,'locationName':locationName, 'locationValue':locationValue, 'role':groups  }, context_instance=RequestContext(request))
	
    except Exception as e:
        logger.error("Exception raised in tatReport(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
    	   
    	   
    
#List all Group and User Tasks:
#==============================>
@login_required(login_url='/login/')
def tattask( request, taskname ):    
    logger.info("Entering tattask(request,taskname): USER --> "+str(request.user)) 
    try:	
        logger.info("Exiting tattask(request,taskname): USER --> "+str(request.user)) 
        return HttpResponse("taskdetails.html")

    except Exception as e:
        logger.error("Exception raised in tattask(request,taskname): --> %s "%e)
        return    


@login_required(login_url='/login/')
def tattaskuser( request, taskname ):    
    logger.info("Entering tattaskuser(request,taskname): USER --> "+str(request.user))
    try:	
        logger.info("Exiting tattaskuser(request,taskname): USER --> "+str(request.user))
        return render_to_response("taskdetails.html", {})

    except Exception as e:
        logger.error("Exception raised in tattaskuser(request,taskname): --> %s"  %e)
        return    

@login_required(login_url='/login/')
def tatreaduser( request, taskname ):
    logger.info("Entering tatreaduser(request,taskname): USER --> "+str(request.user))
    taskName 	 =  taskname.replace("_"," ")
    #taskname     =  taskname.replace("_","%20")	
    user         =  str(request.user)
    try:	
        url_Task = 'http://'+ settings.API_IP_CAMUNDA +'/engine-rest/task?processVariables=DistributorUid_eq_'+user
        logger.info("Taskslist by user - URL :"+url_Task)
        
        r_Task    = urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })
        taskList  = json.loads( urllib2.urlopen( r_Task ).read() )   
        processInstancesID   =   []
        taskList_procInstKey =   {}
    
        for data in taskList:
            processInstancesID.append(data["processInstanceId"])
            taskList_procInstKey[data["processInstanceId"]] = data

        processVar_url = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/variable-instance'
        logger.info("Process variables instances - URL :"+processVar_url)

        body_mytask_content = { "variableNameLike": "App_Mem_%" ,"processInstanceIdIn": processInstancesID}

        memberId_myTask 	= urllib2.Request( processVar_url ,json.dumps(body_mytask_content),headers = { 'Content-Type' : 'application/json' })
        serialized_processVar	= json.loads( urllib2.urlopen( memberId_myTask ).read() ) 

        data_myTask  = []

        #Process Variable Instance:
        for data in serialized_processVar:
            if data["processInstanceId"] in processInstancesID:
                taskList_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]

        for data in taskList_procInstKey:
            if taskList_procInstKey[data]["name"] == taskName:
                data_myTask.append(taskList_procInstKey[data])

        logger.info("Exiting tatreaduser(request,taskname): USER --> "+str(request.user))
        return render_to_response('taskdetails.html', {'tasklist':json.dumps(data_myTask), 'taskName':taskName}, RequestContext(request))

    except Exception as e:
        logger.error("Exception raised in tatreaduser(request,taskname): --> %s" %e)
        return  

#tatdetails report dashboard:
#==============================>
@login_required(login_url='/login/')
def tatread( request, taskname ):
    logger.info("Entering tatread(request,taskname): USER --> "+str(request.user))
    taskName 	 = taskname
    taskname     =  taskname.replace("_","%20")	

    try:	
        #MY TASK URL:	
        url_Task 	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task?name='+ taskname + ''
        logger.info("TasksList by taskname - URL :"+url_Task)
        
        r_Task 		= urllib2.Request( url_Task , headers = { 'Content-Type' : 'application/json' })
        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() ) 
        
        task_pcID = {}
        pcID      = []
        task_data = []

        for data in range(len(serialized_data_Task)):
            x =  serialized_data_Task[data]['processInstanceId']
            pcID.append(serialized_data_Task[data]['processInstanceId'])
            task_pcID[x] = serialized_data_Task[data]
            
        url_varInst='http://'+settings.API_IP_CAMUNDA+'/engine-rest/variable-instance'
        logger.info("Process variables instances - URL :"+url_varInst)
        
        ''' processBodyData = {
                            "variableNameLike": "App_Mem%",
                            "processInstanceIdIn": pcID
                        }	

        r_varInst 		= urllib2.Request(url_varInst, json.dumps(processBodyData) ,headers={'Content-Type': 'application/json'})		
        serialized_data_varinst  = json.loads( urllib2.urlopen( r_varInst ).read() ) '''


	process_variables 	     = { "activityInstanceIdIn":pcID      , "variableNameLike" : "%Name" }
	urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	serialized_data_details  = serialized_data["DATA"]

	process_variables_loan   = { "activityInstanceIdIn":pcID      , "variableNameLike" : "Loan%" }
	url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	serialized_data_loan     = serialized_data_loan["DATA"]    

	process_variables_user   = { "activityInstanceIdIn": pcID      , "variableName"    : "DistributorUid"  }
	url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	serialized_data_user     = serialized_data_user["DATA"]

	process_variables_mem    = { "activityInstanceIdIn": pcID      , "variableNameLike": "App_Mem_%" }
	url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	serialized_data_mem      = serialized_data_mem["DATA"]


	for data in serialized_data_details:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]  
	
	for data in serialized_data_loan:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]   
		 
	for data in serialized_data_user:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]    

	for data in serialized_data_mem:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]	

        '''for data in serialized_data_varinst:
            if data['processInstanceId'] in task_pcID:	
                task_pcID[data['processInstanceId']][data['name']] =  data['value']'''
            
        for v in task_pcID:
            task_data.append(task_pcID[v])
            
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'tasklist' 	 : task_data  }
                
        taskData 	= json.dumps(task_data)	
        context      = RequestContext(request)
        context.user = request.user
        context.tasklist = taskData
        logger.info("Exiting tatread(request,taskname): USER --> "+str(request.user))
        return render_to_response('taskdetails.html', {'tasklist':taskData, 'taskName':taskName}, RequestContext(request))
                                  
    except Exception as e:
        logger.info("Exception raised in tatread(request,taskname): -->  %s " %e)
        return  

#tatdetails report dashboard:
#==============================>
@csrf_exempt
@login_required(login_url='/login/')
def tattaskread( request):
    logger.info("Entering tattaskread(request,taskname): USER --> NEW "+str(request.user))

    data      = json.loads(request.body)

    print data
    taskname  = ''
    userName  = ''	
    provar    = ''
    
    print data
    if data.has_key('id'):
	taskname = data['id']
    	taskname =  taskname.replace("_"," ")	
    
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	fromDate  = data['fromDate']
	toDate    = data['toDate'] 

	if data.has_key('level'):
	    level= data['level']

	if data.has_key('regionName'):
	    regionName    = data['regionName']   

	if data.has_key('clusterOffice'):
	    clusterOffice = data['clusterOffice']

	if data.has_key('cluster'):
	    cluster = data['cluster']
	    if(len(str(cluster)))>0:
	    	cluster = str(cluster).zfill(3)

	if data.has_key('userName'):
	    userName  = data["userName"]
	    
	provar = { "createdAfter"      : fromDate,    "createdBefore"	: toDate  , "name": taskname   ,"processVariables":[] }
	    

	if (len(str(regionName))>0):
		provar["processVariables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
	if (len(str(clusterOffice))>0):
		provar["processVariables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
	if (len(str(cluster))>0):
		provar["processVariables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
	if (len(str(userName))>0):
		provar["processVariables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" }) 		

	'''if (level == "region"):
	    provar["processVariables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	if (level == "cluster office"):
	    provar["processVariables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	if (level == "cluster center"):
	    provar["processVariables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	if (level == "user"):
	    provar["processVariables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }] '''

	print 'provar'
	print provar	
        #MY TASK URL:	
        url_Task 	= 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task'
        logger.info("TasksList by taskname - URL :"+url_Task)
        
        r_Task 		= urllib2.Request( url_Task, json.dumps(provar) , headers = { 'Content-Type' : 'application/json' })
        serialized_data_Task  = json.loads( urllib2.urlopen( r_Task ).read() ) 
        
        task_pcID = {}
        pcID      = []
        task_data = []

        for data in range(len(serialized_data_Task)):
            x =  serialized_data_Task[data]['processInstanceId']
            pcID.append(serialized_data_Task[data]['processInstanceId'])
            task_pcID[x] = serialized_data_Task[data]
            
        url_varInst='http://'+settings.API_IP_CAMUNDA+'/engine-rest/variable-instance'
        logger.info("Process variables instances - URL :"+url_varInst)

	process_variables 	     = { "activityInstanceIdIn":pcID      , "variableNameLike" : "%Name" }
	urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	serialized_data_details  = serialized_data["DATA"]

	process_variables_loan   = { "activityInstanceIdIn":pcID      , "variableNameLike" : "Loan%" }
	url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	serialized_data_loan     = serialized_data_loan["DATA"]    

	process_variables_user   = { "activityInstanceIdIn": pcID      , "variableName"    : "DistributorUid"  }
	url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	serialized_data_user     = serialized_data_user["DATA"]

	process_variables_mem    = { "activityInstanceIdIn": pcID      , "variableNameLike": "App_Mem_%" }
	url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	serialized_data_mem      = serialized_data_mem["DATA"]


	for data in serialized_data_details:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]  
	
	for data in serialized_data_loan:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]   
		 
	for data in serialized_data_user:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]    

	for data in serialized_data_mem:
	    if data["processInstanceId"] in task_pcID:
		task_pcID[data["processInstanceId"]][data["name"] ] = data["value"]	
        
        processBodyData = {
                            "variableNameLike": "App_Mem%",
                            "processInstanceIdIn": pcID
                        }	

        r_varInst 		= urllib2.Request(url_varInst, json.dumps(processBodyData) ,headers={'Content-Type': 'application/json'})		
        serialized_data_varinst  = json.loads( urllib2.urlopen( r_varInst ).read() ) 

        for data in serialized_data_varinst:
            if data['processInstanceId'] in task_pcID:	
                task_pcID[data['processInstanceId']][data['name']] =  data['value']
            
        for v in task_pcID:
            task_data.append(task_pcID[v])
            
        #MERGING BOTH USER AND GROUP DATA AND ASSIGNEES:	
        taskData = {  'tasklist' 	 : task_data  }
                
        taskData 	= task_data	
        context      = RequestContext(request)
        context.user = request.user
        context.tasklist = taskData
        logger.info("Exiting tatread(request,taskname): USER --> "+str(request.user))
        return HttpResponse(json.dumps({'tasklist':taskData, 'taskName':taskname}), content_type="application/json")
        #return render_to_response('taskdetails.html', {'tasklist':taskData, 'taskName':taskName}, RequestContext(request))
                                  
    except Exception as e:
        logger.info("Exception raised in tatread(request,taskname): -->  %s " %e)
        return

@login_required(login_url='/login/')
def getCibilFailureData(request,memberid,loanid):
    try:
        logger.info("Entering getCibilFailureData(request,memberid,loanid): USER --> "+str(request.user))
        url 		   = 'http://'+ settings.API_IP_AVRO +'/madura-coreservice/rest/api/readcibil/memberdetails/'+memberid+'/'+loanid
        logger.info("Cibil Status - URL :"+url)
        response_schema = avro.schema.parse( open( settings.SCHEMA_LOCATION+"cibilmemberdetailschema.avsc" ).read() )
    
        request1        = urllib2.Request(url)
        request1.add_header('Content-Type', 'avro/binary')
        result1         = urllib2.urlopen(request1)
        serialized_data = io.BytesIO(result1.read())

        #Decoding in Avro:	
        decoder 	 = avro.io.BinaryDecoder(serialized_data)
        reader 	 	 = avro.io.DatumReader(response_schema)
        response 	 = reader.read(decoder)
        responseData 	 = json.loads(json.dumps(response))	
        logger.info("Exiting getCibilFailureData(request,memberid,loanid): USER --> "+str(request.user))	
        
        return HttpResponse(json.dumps(responseData), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in getCibilFailureData(request,memberid,loanid): --> %s" %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


@csrf_exempt
@login_required(login_url='/login/')
def uploadDocsRework(request):
    logger.info("Entering uploadDocsRework(request): USER --> "+str(request.user))
    context      = RequestContext(request)
    context.user = request.user
    task_id 	 = ''
    if request.method == 'POST':
        try:	
            FORM_DATA     = ''	
                
            if "form_data" in request.POST:
                formData = request.POST["form_data"]
                FORM_DATA = json.loads(formData)
                
            if "taskid" in request.POST:		    
                task_id = request.POST["taskid"]
            
                
            #Saving Image function and defining a location to save IMAGES:	
            data = updateImage(FORM_DATA, request)
            logger.info("Data from  updateImage: ")
            logger.info(data)

            import io	
            #AVRO SCHEMA LOAD FOR MEMBER LOAN COMPOSITE:
            schema   	= avro.schema.parse( open(settings.SCHEMA_LOCATION+"uploaddocschema.avsc").read() )
            writer 		= avro.io.DatumWriter(schema)
            bytes_writer 	= io.BytesIO()
            encoder 	= avro.io.BinaryEncoder(bytes_writer)
            #ENCODE DATA	
            writer.write( data , encoder)

            url 	= 'http://'+settings.API_IP_AVRO+'/madura-coreservice/rest/api/addupdocs/uploaddocs' 		    	     	           		    	     	          
            logger.info("Upload Documents URL : "+url)
            byte_data 	= bytes_writer.getvalue()
            request1  	= urllib2.Request( url , bytes_writer.getvalue() )
            request1.add_header( 'Content-Type' , 'avro/binary' )
            request1.get_method 	= lambda: 'POST'
            result1 	= urllib2.urlopen( request1 )
            serialized_data = io.BytesIO( result1.read() )

            response_schema = avro.schema.parse( open(settings.SCHEMA_LOCATION+"responseschema.avsc").read())	#response_schema)
            decoder 	= avro.io.BinaryDecoder(serialized_data)
            reader 		= avro.io.DatumReader(response_schema)
            response 	= reader.read(decoder)

            response["message"]="Success"
            logger.info("Exiting uploadDocsRework(request): USER --> "+str(request.user)) 
            return HttpResponse( json.dumps( response ), content_type="application/json" )

        except Exception as e:
            logger.error("Exception raised in uploadDocsRework(request): -->  response of Member creation API reader - api response 1 : %s" %e)
            return HttpResponse( json.dumps( {"message":"Failed"} ), content_type="application/json" )


def getProcessHistory(request,memberId,loanId):
    data_obj_myTask  = {}
    try:
        logger.info("Entering getProcessHistory(request,memberId,loanId) : USER ->"+str(request.user))
        url   		=  'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/task'
        processVariable = '[{"name": "MemberId", "value": '+memberId+', "operator": "eq"   },{"name": "LoanId", "value": '+loanId+', "operator": "eq"   }]'
        data_obj_myTask ['processVariables'] = json.loads(processVariable)
        r_myTask 	= urllib2.Request( url , json.dumps(data_obj_myTask) ,headers = { 'Content-Type' : 'application/json' })
        serialized_data_myTask  = json.loads( urllib2.urlopen( r_myTask ).read() )
 
        logger.info("Exiting getProcessHistory(request,memberId,loanId) : USER ->"+str(request.user))
        return HttpResponse(json.dumps(serialized_data_myTask), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in getProcessHistory(request,memberId,loanId) : %s " %e)
        return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")


@csrf_exempt
def filteredList1(request):
    print '\nFUNCTION ( filteredList1 )  User : '+str(request.user)
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    
    data      = json.loads(request.body)
    if data.has_key('userName'):
        userName  = data["userName"]
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 

	    # Live
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter" : fromDate, "startedBefore": toDate }
	    provar["variables"]  =   [{ "name": "DistributorUid", "value": str(userName), "operator": "eq" }]    
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 

	    print serialized_data	

	    # Rejected
	    provar1 = {
	    		"variables": [
	    			{"operator": "neq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}
	    			],
	    		"finished":"true",
			"startedBefore": fromDate, 
			"startedBefore": toDate
		      }
	    provar1["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" }) 
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 	    
	    	    
	    # Completed
	    provar2 = {"variables": [{"operator": "eq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}],"startedBefore": fromDate, "startedBefore": toDate}
	    provar2["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" })
	    taskHistoryUrl2  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'	    
	    serialized_data2 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') 

	    # Appproved
	    provar3 = {
	    		    "variables": [
	    			{"operator": "eq", "value": "Approved","name": "Resident_Verification_Status"},
				{"operator": "eq", "value": "Approved","name": "Business_Verification_Status"}], 
			    "startedBefore": fromDate,
			    "startedBefore": toDate
			}
	    provar3["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" })
	    serialized_data3 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar3), "JSON", 'application/json') 	    
  
	    for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data 

	    for data in serialized_data1["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]		    

	    for data in serialized_data3["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "Approved"#data["activityId"]    
		    
	    for data in serialized_data2["DATA"]:
		if data["id"] in Task_procInstKey:		
		    Task_procInstKey[data["id"]]["activityId"] = "Completed"

	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"]) 	
		
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]   
		     
	    for data in serialized_data_user:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    

	    for data in serialized_data_mem:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for myTaskData in Task_procInstKey:
		dataList.append(Task_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    return HttpResponse(region_data, content_type="application/json")
	    
    except ValueError as e:  # includes simplejson.decoder.JSONDecodeError
	print 'Decoding JSON has failed'+ e
	print("error at", json.last_error_position)
	return HttpResponse(region_data, content_type="application/json")    
    except Exception as e:
       	print "Exception raised in filteredList1 View  ---> %s" %e
    	logger.error("Exception raised in filteredList1 View  ---> %s" %e)
        return HttpResponse(region_data, content_type="application/json")    



@csrf_exempt
def filteredList1_old(request):
    print '\nFUNCTION ( filteredList1 )  User : '+str(request.user)
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    
    data      = json.loads(request.body)
    if data.has_key('userName'):
        userName  = data["userName"]
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 

	    # Live
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter" : fromDate, "startedBefore": toDate }
	    provar["variables"]  =   [{ "name": "DistributorUid", "value": str(userName), "operator": "eq" }]    
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 

	    
	    # Rejected
	    provar1 = { "activityId":"EndEvent_1", "startedAfter": fromDate,  "startedBefore": toDate}
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 
	    
	    # Completed
	    provar2 = { "activityId": "EndEvent_2",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl2  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data2 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') 

	    # Rejected
	    provar3 = { "activityId":"FailedEvent_1", "startedAfter": fromDate,  "startedBefore": toDate}
	    serialized_data3 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar3), "JSON", 'application/json') 

  
	    for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data 

	    for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = "EndEvent_1"#data["activityId"]
		    
	    for data in serialized_data2["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = data["activityId"]    

	    for data in serialized_data3["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = "EndEvent_1"#data["activityId"]    
	     
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"]) 	
		
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for myTaskData in Task_procInstKey:
		dataList.append(Task_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)
	    
	    return HttpResponse(region_data, content_type="application/json")
	    
    except ValueError as e:  # includes simplejson.decoder.JSONDecodeError
	print 'Decoding JSON has failed'+ e
	print("error at", json.last_error_position)
	return HttpResponse(region_data, content_type="application/json")    
    except Exception as e:
        return HttpResponse(region_data, content_type="application/json")    


@csrf_exempt
def filteredList1_new(request):
    print '\nFUNCTION ( filteredList1 )  User : '+str(request.user)
    print "New FilteredList"	
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    responseData	  = {}
    
    data      = json.loads(request.body)
    print data
    if data.has_key('userName'):
        userName  = data["userName"]

    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 

	    # Live
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter" : fromDate, "startedBefore": toDate }
	    provar["variables"]  =   [{ "name": "DistributorUid", "value": str(userName), "operator": "eq" }]    
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    if serialized_data.has_key("DATA"):
		responseData['live'] = serialized_data["DATA"]

	    print provar	
	    
	    # Rejected
	    print 'Rejected'	
	    #provar1 = { "activityId":"EndEvent_1", "startedAfter": fromDate,  "startedBefore": toDate}
	    provar1 = {"variables": [{"operator": "neq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}],"finished":"true","startedBefore": fromDate, "startedBefore": toDate}
	    provar1["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" }) 
	
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    if serialized_data1.has_key("DATA"):
		responseData['Rejected'] = serialized_data1["DATA"]

	    # Completed
	    #provar2 = { "activityId": "EndEvent_2",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    provar2 = {"variables": [{"operator": "eq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}],"startedBefore": fromDate, "startedBefore": toDate}
	    provar2["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" })

	    taskHistoryUrl2  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    serialized_data2 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') 

	    if serialized_data2.has_key("DATA"):
		responseData['Rejected'] = serialized_data2["DATA"]

	    # Approved
	    provar3 = {"variables": [{"operator": "eq", "value": "Approved","name": "Resident_Verification_Status"},
				{"operator": "eq", "value": "Approved","name": "Business_Verification_Status"}], "startedBefore": fromDate, "startedBefore": toDate}
	    provar3["variables"].append({ "name": "DistributorUid", "value": str(userName), "operator": "eq" })
	
	    serialized_data3 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar3), "JSON", 'application/json')   
	    print 'serialized_data3 '	
	    #print serialized_data3

	    if serialized_data3.has_key("DATA"):
		responseData['Rejected'] = serialized_data3["DATA"]

	    '''for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data 

	    print "processInstancesID"
	    print processInstancesID '''

	    dataLen = 0	

	    if	len(serialized_data1["DATA"]) > 0:
		if len(serialized_data1["DATA"]) > dataLen:
			dataLen = len(serialized_data1["DATA"])
	    print "dataLen" 
	    print dataLen 	



	    if	len(serialized_data2["DATA"]) > 0:
		if len(serialized_data2["DATA"]) > dataLen:
			dataLen = len(serialized_data2["DATA"])
	    print "dataLen" 
	    print dataLen 
	    	

	    '''if	len(serialized_data3["DATA"]) > 0:
		if len(serialized_data3["DATA"]) > dataLen:
			dataLen = len(serialized_data3["DATA"])
	    #print "dataLen" 
	    #print dataLen 	


	    #print "dataLen" 
	    #print dataLen 	

	    '''
	    """	for i in  range(0, dataLen ):
		if len(serialized_data1["DATA"]) >= i:
		    if serialized_data1["DATA"][i]["id"] in Task_procInstKey:
			Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]	
		if len(serialized_data2["DATA"]) >= i:
		    if serialized_data2["DATA"][i]["id"] in Task_procInstKey:
			Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]	
	   	
		if len(serialized_data3["DATA"]) >= i:
		    if serialized_data3["DATA"][i]["id"] in Task_procInstKey:
			Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]"""	

	


	    """for data in serialized_data1["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]
		    
	    for data in serialized_data2["DATA"]:
		#if data["processInstanceId"] in Task_procInstKey:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = data["activityId"]    

	    for data in serialized_data3["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "UserTask_9 "#data["activityId"]  """

	

 
	    """process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_var	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data_var["DATA"]

	    if len(serialized_data_details)>0:
		responseData['variables'].append(serialized_data_details)
	    print 1	

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%" }
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    

	    if len(serialized_data_loan)>0:
		responseData['variables'].append(serialized_data_loan)

	    print 2
	    
	    process_variables_user   = { "activityInstanceIdIn": processInstancesID, "variableName"    : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]

	    if len(serialized_data_user)>0:
		responseData['variables'].append(serialized_data_user)
	    print 3

	    
	    process_variables_mem    = { "activityInstanceIdIn": processInstancesID, "variableNameLike": "App_Mem_%" }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    if len(serialized_data_mem)>0:
		responseData['variables'].append(serialized_data_mem)"""
	
	    responseData = variablesRestApi(processInstancesID)	
	    print variablesRestApi(processInstancesID)
	    
	    dataList = []
	    
	    '''
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"]) 	
	    #
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    print dataList
	    print "dataList"		
	    for myTaskData in Task_procInstKey:
		dataList.append(Task_procInstKey[myTaskData])'''
	    
	    #allRegiondetails = {"memdetails":dataList}
	    allRegiondetails = {"memdetails":responseData }
	    print "5245454545454"	

	    region_data      = json.dumps(allRegiondetails)
	    
	    return HttpResponse(region_data, content_type="application/json")
	    
    except ValueError as e:  # includes simplejson.decoder.JSONDecodeError
	print 'Decoding JSON has failed'+ e
	print("error at", json.last_error_position)
	return HttpResponse(region_data, content_type="application/json")    
    except Exception as e:
        return HttpResponse(region_data, content_type="application/json")    



@csrf_exempt
def filteredList(request):
    print '\nFUNCTION ( filteredList )  User : '+str(request.user)
    
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    data          = json.loads(request.body)
    print data 	
    
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']        
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    if data.has_key('cluster'):
		cluster = data['cluster']
		if(len(str(cluster)))>0:
		    cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]
	    
	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    provar["variables"] = []
	    
	    #Rejected:
	    provar1 = {	"variables"	: [{"operator": "neq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}],
	    		"finished"	: "true",
			"startedBefore"	: fromDate, 
			"startedBefore"	: toDate
		      }	    
	    #Completed:
	    provar2 = {
    			"variables"	: [{"operator": "eq", "value": "Send","name": "Book_Loan_&_Cheque_Status"}],
			"startedBefore"	: fromDate, 
			"startedBefore"	: toDate
		      }
	    #Approved:
	    provar3 = {
	    		"variables": [
	    			{"operator"	: "eq", "value": "Approved","name": "Resident_Verification_Status"},
				{"operator"	: "eq", "value": "Approved","name": "Business_Verification_Status"}], 
			"startedBefore"	: fromDate,
			"startedBefore"	: toDate
		      }
					    
	    '''if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }]                       
	    '''	

	    if (len(str(regionName))>0):
		provar["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
		provar1["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
		provar2["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })				
		provar3["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })						
	    if (len(str(clusterOffice))>0):
		provar["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
		provar1["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
		provar2["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
		provar3["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })						
	    if (len(str(cluster))>0):
		provar["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
		provar1["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
		provar2["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
		provar3["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
	    if (len(str(userName))>0):
		provar["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
		provar1["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
		provar2["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
		provar3["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" })  
                      	 

	    print "provar"
	    print provar 
	    print taskHistoryUrl	

	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    
	    '''# Rejected Loans:
	    provar1 = { "activityId": "EndEvent_1",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 


	    # Rejected Loans:
	    provar1 = { "activityId": "EndEvent_1",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    # Rejected Loans:
	    provar1 = { "canceled":"true",  "finishedAfter": fromDate,  "finishedBefore": toDate}
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    # Completed Loans:	    
	    provar2 = { "activityId": "EndEvent_2",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl2 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data2      = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') '''
	    # Live
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    #provar = { "startedAfter" : fromDate, "startedBefore": toDate }
	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    print serialized_data	

	    # Rejected
	    taskHistoryUrl1  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    serialized_data1 = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 	    
	    	    
	    # Completed
	    taskHistoryUrl2  = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'	    
	    serialized_data2 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') 

	    # Appproved
	    serialized_data3 = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar3), "JSON", 'application/json') 	  
	    
	    '''for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data   

	    for data in serialized_data1["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = data["activityId"]
		    
	    for data in serialized_data2["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = data["activityId"]'''

	    for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data 


	    for data in serialized_data3["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "Approved"#data["activityId"] 		        
	     
	    for data in serialized_data2["DATA"]:
		if data["id"] in Task_procInstKey:		
		    Task_procInstKey[data["id"]]["activityId"] = "Completed"


	    for data in serialized_data1["DATA"]:
		if data["id"] in Task_procInstKey:
		    Task_procInstKey[data["id"]]["activityId"] = "EndEvent_1"#data["activityId"]		    


	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike"   : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%"	}
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn"    : processInstancesID, "variableName"       : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn"    : processInstancesID,  "variableNameLike"     : "App_Mem_%"   }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"]) 	
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for myTaskData in Task_procInstKey:
		dataList.append(Task_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)   
	    
	    print "region_data\n\n\n"
	    print region_data
	    
	    return HttpResponse(region_data, content_type="application/json")
    except ValueError as e:  # includes simplejson.decoder.JSONDecodeError
	print 'Decoding JSON has failed'+ e
	print("error at", json.last_error_position)
	return HttpResponse(region_data, content_type="application/json")    
    except Exception as e:
       	print "Exception raised in filteredList View  ---> %s" %e
    	logger.error("Exception raised in filteredList View  ---> %s" %e)    
        return HttpResponse(region_data, content_type="application/json")    
    


@csrf_exempt
def filteredList_old(request):
    print '\nFUNCTION ( filteredList )  User : '+str(request.user)
    
    regionName    = ""
    clusterOffice = ""
    cluster       = "" 
    level      	  = "" 
    data      	  = ""
    fromDate      = ""
    toDate	  = ""
    region_data	  = 'Error'
    processInstancesID    = [] 
    Task_procInstKey      = {}  
    data          = json.loads(request.body)
    print data 	
    
    if data.has_key('userName'):
        userName  = data["userName"]
        
    try:
	    fromDate  = data['fromDate']
	    toDate    = data['toDate'] 
    
	    if data.has_key('level'):
		level= data['level']
		
	    if data.has_key('regionName'):
		regionName    = data['regionName']        
		
	    if data.has_key('clusterOffice'):
		clusterOffice = data['clusterOffice']

	    if data.has_key('cluster'):
		cluster = data['cluster']
		if(len(str(cluster)))>0:
		    cluster = str(cluster).zfill(3)
		
	    if data.has_key('userName'):
		userName  = data["userName"]
	    
	    # Active Tasks:
	    taskHistoryUrl = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/process-instance'
	    provar = { "startedAfter"      : fromDate,    "startedBefore"	: toDate   , "variables":[]   }



	    if (len(str(regionName))>0):
		provar["variables"].append({ "name": "regionName"	,   "value": str(regionName),   "operator": "eq" })
	    if (len(str(clusterOffice))>0):
		provar["variables"].append({ "name": "clusterOfficeCode",   "value": str(clusterOffice),"operator": "eq" })
	    if (len(str(cluster))>0):
		provar["variables"].append({ "name": "clusterCenterCode",   "value": str(cluster),     	"operator": "eq" })
	    if (len(str(userName))>0):
		provar["variables"].append({ "name": "DistributorUid"	,   "value": str(userName),     "operator": "eq" }) 


	    '''if (level == "region"):
		provar["variables"] = [{ "name": "regionName",       "value": str(regionName),   "operator": "eq" }]
	    if (level == "cluster office"):
		provar["variables"] = [{ "name": "clusterOfficeCode","value": str(clusterOffice),"operator": "eq" }]
	    if (level == "cluster center"):
		provar["variables"] = [{ "name": "clusterCenterCode","value": str(cluster),      "operator": "eq" }]                       
	    if (level == "user"):
		provar["variables"] = [{ "name": "DistributorUid",   "value": str(userName),     "operator": "eq" }]'''                       
	 

	    print "provar"
	    print provar 
	    print taskHistoryUrl	

	    serialized_data      = restclientURL(taskHistoryUrl, "POST", json.dumps(provar), "JSON", 'application/json') 
	    
	    # Rejected Loans:
	    provar1 = { "activityId": "EndEvent_1",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 


	    # Rejected Loans:
	    provar1 = { "activityId": "EndEvent_1",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    # Rejected Loans:
	    provar1 = { "canceled":"true",  "finishedAfter": fromDate,  "finishedBefore": toDate}
	    taskHistoryUrl1 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data1      = restclientURL(taskHistoryUrl1, "POST", json.dumps(provar1), "JSON", 'application/json') 

	    # Completed Loans:	    
	    provar2 = { "activityId": "EndEvent_2",    "startedAfter"      : fromDate,    "startedBefore"	: toDate      }
	    taskHistoryUrl2 = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/activity-instance'
	    serialized_data2      = restclientURL(taskHistoryUrl2, "POST", json.dumps(provar2), "JSON", 'application/json') 
	    
	    for data in serialized_data["DATA"]:
		processInstancesID.append(data["id"])
		Task_procInstKey[data["id"]] = data   

	    for data in serialized_data1["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = data["activityId"]
		    
	    for data in serialized_data2["DATA"]:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]]["activityId"] = data["activityId"]    
	     
	    process_variables 	     = { "activityInstanceIdIn":processInstancesID, "variableNameLike"   : "%Name" }
	    urlVariableInstance      = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data 	     = restclientURL(urlVariableInstance, "POST", json.dumps(process_variables), "JSON", 'application/json') 
	    serialized_data_details  = serialized_data["DATA"]

	    process_variables_loan   = { "activityInstanceIdIn":processInstancesID, "variableNameLike" : "Loan%"	}
	    url_variables_loan       = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_loan     = restclientURL(url_variables_loan, "POST", json.dumps(process_variables_loan), "JSON", 'application/json') 
	    serialized_data_loan     = serialized_data_loan["DATA"]    
	    
	    process_variables_user   = { "activityInstanceIdIn"    : processInstancesID, "variableName"       : "DistributorUid"  }
	    url_variable_user        = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_user     = restclientURL(url_variable_user, "POST", json.dumps(process_variables_user), "JSON", 'application/json')     
	    serialized_data_user     = serialized_data_user["DATA"]
	    
	    process_variables_mem    = { "activityInstanceIdIn"    : processInstancesID,  "variableNameLike"     : "App_Mem_%"   }
	    url_variable_mem 	     = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/history/variable-instance'
	    serialized_data_mem      = restclientURL(url_variable_mem, "POST", json.dumps(process_variables_mem), "JSON", 'application/json')     
	    serialized_data_mem      = serialized_data_mem["DATA"]
	    
	    dataList = []
	    
	    processInstancesIDNew = processInstancesID  
	    for data in serialized_data_details:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]  
		if data["processInstanceId"] in processInstancesID:
		   processInstancesIDNew.remove(data["processInstanceId"]) 	
	    
	    for data in serialized_data_loan:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_user:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]    
		    
	    for data in serialized_data_mem:
		if data["processInstanceId"] in Task_procInstKey:
		    Task_procInstKey[data["processInstanceId"]][data["name"] ] = data["value"]
		    
	    for myTaskData in Task_procInstKey:
		dataList.append(Task_procInstKey[myTaskData])
	    
	    allRegiondetails = {"memdetails":dataList} 
	    region_data      = json.dumps(allRegiondetails)   
	    
	    print "region_data\n\n\n"
	    print region_data
	    
	    return HttpResponse(region_data, content_type="application/json")
    except ValueError as e:  # includes simplejson.decoder.JSONDecodeError
	print 'Decoding JSON has failed'+ e
	print("error at", json.last_error_position)
	return HttpResponse(region_data, content_type="application/json")    
    except Exception as e:
        return HttpResponse(region_data, content_type="application/json")    
    
    
@csrf_exempt
def loadStateMyDashboard(request):
    print '\nFUNCTION  ( loadStateMyDashboard ) \n'
    try:   
	    user 		  = request.user 
	    userId 		  = request.user.id
	    locationHieGroupid 	  = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
	    groupId		  = location_hierarchy_group.objects.filter(id__in=locationHieGroupid ).values_list('id', flat=True)
	    locationTerId 	  = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=groupId).values_list('location_territory_hierarchy_id_id', flat=True)
	    parentId 		  = locaton_territory_hierrarchy.objects.filter(id__in=locationTerId).values_list('parent_location_id',flat=True)
	    state 		  = locaton_territory_hierrarchy.objects.filter(id__in=parentId).values_list('location_name',flat=True)
	    stateArr 		  = locaton_territory_hierrarchy.objects.filter(parent_location_id=1,territory_id=1).values('id','location_name')
	    stateArrObj 	  = [] 
	    for state in stateArr:
	     	stateArrObj.append({"id":state['id'], "name": state["location_name"]})
	    State = {"state":list(stateArrObj)}
	    
	    return HttpResponse(json.dumps(State), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in loadStateMyDashboard(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")    

@csrf_exempt
def loadRegion(request):
    print '\nFUNCTION  ( loadRegion ) \n'  
    try:
    	    location 	   = request.body	
	    userId 	   = request.user.id
	    locationHGrp   = location_map_location_hierarchy_group.objects.filter( user_location_map_id_id=userId ).values_list( 'location_hierarchy_group_id_id', flat=True)
	    grpId	   = location_hierarchy_group.objects.filter( id__in=locationHGrp ).values_list( 'id',flat=True)
	    locationTerIds = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=grpId).values_list('location_territory_hierarchy_id_id',flat=True)
	    regionName	   = locaton_territory_hierrarchy.objects.filter(id__in=locationTerIds, parent_location_id= location).values_list('location_name',flat=True)
	    regionName	   = list(regionName)
	    Region 	= {"Region":regionName}
	    return HttpResponse(json.dumps(Region), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in loadRegion(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
    

@csrf_exempt
def loadClusterOffice(request):
    print '\nFUNCTION  ( loadClusterOffice ) \n'
    try:       
	    user 	= request.user
	    location 	= request.body
	    locationId  = locaton_territory_hierrarchy.objects.filter( location_name=location ).values_list('id',flat=True)
	    parentId    = locaton_territory_hierrarchy.objects.filter( parent_location_id__in=locationId ).values_list('parent_location_id',flat=True) 
	    getClusterOfficeCodeArr = locaton_territory_hierrarchy.objects.filter( parent_location_id__in=parentId, territory_id_id=3).values('id','parent_location_id','loc_terri_code','location_name') 
	    cluster     = []
	    for getClusterOfficeCode in getClusterOfficeCodeArr:
		    clOffCode 	  = getClusterOfficeCode['loc_terri_code']
		    getparent_id  = getClusterOfficeCode['parent_location_id']
		    locationName  = getClusterOfficeCode['location_name']
		    cluster.append({"clusterCode":clOffCode, "locationName":locationName})
		     
	    clusterOffice = {"cluster" : cluster }
	    return HttpResponse(json.dumps(clusterOffice), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in loadClusterOffice(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")    

@csrf_exempt
def loadcluster(request):
    print '\nFUNCTION  ( loadclustercenter ) \n' 
    try:      
	    json_data = json.loads(request.body)
	    locationName    = json_data['clusterTxt']
	    locationTerCode = json_data['clusterVal']
	    
	    parentlocationId = locaton_territory_hierrarchy.objects.filter(location_name=locationName, loc_terri_code=locationTerCode).values_list('id',flat=True)
	    clusterArr 	     = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=parentlocationId , territory_id_id=4).values('location_name','loc_terri_code')
	    clusterCenter    = []	
	    for cluster in clusterArr:
		cluCenterCode = cluster['loc_terri_code']
		cluCenterName = cluster['location_name']    
		clusterCenter.append({"clusterCenterCode":cluCenterCode, "clusterCenterName":cluCenterName})
	    cluster = {"cluster":clusterCenter}
	    return HttpResponse(json.dumps(cluster), content_type="application/json")
    except Exception as e:
        logger.error("Exception raised in loadcluster(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")    



@csrf_exempt
def loadUser(request, clusterVal):
    print '\nFUNCTION  ( loadUser) \n'  
    userList = []
    try:
	    if clusterVal == "Sales":
	    	userName = unicode(request)
		userList.append(userName)
	    else:
	    	cluster 	= json.loads(request.body)
		clusterName 	= cluster['clusterTxt']
		clusterVal 	= cluster['clusterVal']
		location_id 	= ''
		userlist 	= ''
		
		locationId   = locaton_territory_hierrarchy.objects.filter(territory_id=4, location_name = clusterName, loc_terri_code = clusterVal).values_list('id', flat=True)
		locTerrGroup = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
		userIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id__in=locTerrGroup).values_list('user_location_map_id',flat=True)
		userNameArr  = user_location_map.objects.filter(id__in=userIds).values_list('username')
		for userName in userNameArr:
		    userList.append(userName)	    
		    
	    users = {"users":userList}  
	    return HttpResponse(json.dumps(users), content_type="application/json")

    except Exception as e:
        logger.error("Exception raised in loadUser(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")   
	
		
#filter loansbydate
def FilterLoansByDate(request):
    logger.info("Entering FilterLoansByUser(request): USER -->"+str(request.user))
    context      	= RequestContext(request)
    user	        = str(request.user)
    
    try:
	groups 	  = request.user.groups.values_list('name',flat=True)  
	groupName = str(groups[0])
        if groupName not in json.loads(settings.GRP_ALLOWED):
	    return render_to_response('unauthorised.html', {})

	userIds   = []
    	userList  = []
    	
    	if groups[0] == "CrOfficer":     
    	    userId 	= request.user.id
    	    territoryId = user_location_map.objects.filter(id=userId).values_list('territory_id', flat=True)
            GrpId       = location_map_location_hierarchy_group.objects.filter(user_location_map_id_id=userId).values_list('location_hierarchy_group_id_id', flat=True)
            prTrId 	= location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_hierarchy_group_id_id__in=GrpId).values_list('location_territory_hierarchy_id_id', flat=True)
            locationId  = locaton_territory_hierrarchy.objects.filter(parent_location_id__in=prTrId).values_list('id', flat=True)
   	    GrUsrIds    = location_hierarchy_group_location_territory_hierrarchy_map.objects.filter(location_territory_hierarchy_id_id__in=locationId).values_list('location_hierarchy_group_id_id', flat=True)
    	    usrIds      = location_map_location_hierarchy_group.objects.filter(location_hierarchy_group_id_id__in=GrUsrIds).values_list('user_location_map_id_id', flat=True)
    	    usrName     = user_location_map.objects.filter(id__in=usrIds).values_list('username', flat=True)
    	    userList	= list(usrName)
    	    
    	userlist    = {"userList":userList, 'user':user, "groups":groupName	}
    	masterData  = json.dumps(userlist)
    	   
        logger.info("Exiting FilterLoansByDate(request): USER -->"+str(request.user))
        return render_to_response("FilterLoansByDate.html", { 'masterData':masterData, 'role':groups }, context_instance=RequestContext(request))
	
    except Exception as e:
        logger.error("Exception raised in FilterLoansByDate(request) -->  %s" % e)
	return HttpResponse(json.dumps({"message":"Failed"}), content_type="application/json")
	

@csrf_exempt
def taskTracker(request,memberId):
	logger.info('Entering taskTracker(request,memberId): '+str(request.user))
	processVariables = {}
	url = 'http://'+settings.API_IP_CAMUNDA+'/engine-rest/task'
	processVariables["processVariables"] = [{"name": "MemberId","operator": "eq", "value": int(memberId) }]
	Task_details        = urllib2.Request( url ,json.dumps(processVariables),headers = { 'Content-Type' : 'application/json' })
    	serialized_data    = json.loads( urllib2.urlopen( Task_details ).read() ) 
	logger.info('Exiting taskTracker(request,memberId): '+str(request.user))
	return HttpResponse(json.dumps(serialized_data), content_type="application/json")
	



