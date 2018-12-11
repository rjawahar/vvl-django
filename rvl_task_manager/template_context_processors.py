from django.conf import settings
#....
def settings_context_processor(request):
    return {
        'JS_MD5_FORM'		 : settings.JS_MD5_FORM,
        'JS_MD5_READ_FORM'	 : settings.JS_MD5_READ_FORM,
        'JS_MD5_MASTER'		 : settings.JS_MD5_MASTER,
        'JS_MD5_MASTER_DATA'	 : settings.JS_MD5_MASTER_DATA,
        'JS_MD5_MASTER_DATA_LOAD': settings.JS_MD5_MASTER_DATA_LOAD,
        'JS_MD5_BIZ_FORM'	 : settings.JS_MD5_BIZ_FORM,
        'JS_MD5_RESI_FORM'	 : settings.JS_MD5_RESI_FORM,                
    }
