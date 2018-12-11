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
import copy 
import json
from requests.exceptions import ConnectionError, Timeout, RequestException

#import requests.ConnectionError

def restclientURL(URL, METHOD, BODY, TYPE, ContentType):

    response 		 = {}
    requestURL 		 = None
    connection_error 	 = 'Could not connect to the API. Please check your connection'
    timeout_error 	 = 'Connection Timeout, please retry later'
    redirect_error 	 = 'Bad URL, check the formatting of your request and try again'
    
    try:
    	if METHOD == "GET":
	    	requestURL      = urllib2.Request(URL)
    	else:
    		requestURL      = urllib2.Request(URL, BODY)
    		
	requestURL.add_header('Content-Type', ContentType)
	requestURL.get_method = lambda: METHOD
	result	         = urllib2.urlopen(requestURL)
	response["DATA"] = serialized_data = result.read()
	
	if TYPE == "JSON":
		response["DATA"]	= json.loads(serialized_data)
		
	response["MESSAGE"] = "SUCCESSFUL"	
    
    except ConnectionError as e:
        print ("Exception restClient(URL, METHOD, BODY, TYPE, Content-Type) --> : %s" %e)
        response["MESSAGE"] = connection_error	
        response["ERROR"] = "ERROR"	        
    
    except Timeout as e:
    	print ("Exception restClient(URL, METHOD, BODY, TYPE, Content-Type) --> : %s" %e)
        response["MESSAGE"] = timeout_error	
        response["ERROR"] = "ERROR"
        
    except RequestException as e:
    	print ("Exception restClient(URL, METHOD, BODY, TYPE, Content-Type) --> : %s" %e)
        response["MESSAGE"] = redirect_error	
        response["ERROR"] = "ERROR"
     
    return response
