# Django settings for simpleauthexample project.
import os

import os
import subprocess
import sys
import hashlib
from os.path import abspath, dirname, join
from decimal import Decimal
from django.conf import global_settings


DEBUG = False
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

ALLOWED_HOSTS = ['*']

#IP's:
#API_IP 		= '52.77.32.218:8082'
#API_IP_CAMUNDA 	= '52.77.32.218:8082'

API_IP          = '52.221.76.200:8082'
API_IP_CAMUNDA  = '52.221.76.200:8082'
API_IP          = '192.168.1.84:8082'
API_IP_CAMUNDA  = '192.168.1.84:8082'

#API_IP_AVRO 	= '52.77.34.67:8087'
API_IP_AVRO 	= '192.168.1.84:8085'
API_IP_AVRO 	= '192.168.1.86:8080'
#DB_IP 		= 'webapp.cwxetrwsi128.ap-southeast-1.rds.amazonaws.com'
DB_IP 		= 'localhost'

#API_IP_ALFRESCO	= 'madura.scimergent.com:8080'
#API_IP_ALFRESCO	= '54.169.163.174:8080'
API_IP_ALFRESCO = '52.76.37.84:8080'

	
#File Locations:
SCHEMA_LOCATION = '/home/analyzer/task_manager_production/finwego-madura/schema/'
MASTER_LOCATION = '/home/analyzer/task_manager_production/finwego-madura/rvl_finwego-madura/static/form/'
BASE_DIR = '/home/analyzer/task_manager_production/finwego-madura/rvl_finwego-madura/'

#Access Restriction:
GRP_ALLOWED  = '["CrMgr","CrOfficer", "Sales", "Ops", "CBReq"]'
TASK_ALLOWED = '[ "Rework Resident Verification", "Resident Verification"]'

#Port's:
TASK_ENGINE_PORT = '8082'
REST_API_PORT 	 = '8087'

ALF_USER = "admin"
ALF_PWD  = "madura14"


def md5sum(filename):
    md5 = hashlib.md5()
    with open(filename,'rb') as f:
        for chunk in iter(lambda: f.read(128*md5.block_size), b''):
        	md5.update(chunk)
    return md5.hexdigest()
    
#STATIC_ROOT = "/home/analyzer/task_manager_production/finwego-madura/static/" 	

#STATICFILES_DIRS = [
#    os.path.join(BASE_DIR, "static"),
#    '/var/www/static/',
#]

CURRENT_FILE = os.path.abspath(__file__)
PROJECT_ROOT = os.path.dirname(CURRENT_FILE)
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = '/static/'

print STATIC_ROOT
print STATIC_URL

try:
    
    
    JS_FILE_PATH_FORM 		= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'form.js')
    JS_MD5_FORM 		= "." + str( md5sum(JS_FILE_PATH_FORM) )
    
    JS_FILE_PATH_READ_FORM 	= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'readForm.js')
    JS_MD5_READ_FORM 		= "." + str( md5sum(JS_FILE_PATH_READ_FORM) )
    
    JS_FILE_PATH_MASTER 	= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'master.js')
    JS_MD5_MASTER 		= "." + str( md5sum(JS_FILE_PATH_MASTER) )
    
    JS_FILE_PATH_MASTER_DATA 	= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'masterData.js')
    JS_MD5_MASTER_DATA 		= "." + str( md5sum(JS_FILE_PATH_MASTER_DATA) )  
    
    JS_FILE_PATH_MASTER_DATA_LD = os.path.join(os.path.join(STATIC_ROOT, 'form'), 'masterDataLoad.js')
    JS_MD5_MASTER_DATA_LOAD 	= "." + str( md5sum(JS_FILE_PATH_MASTER_DATA_LD) )            
    
    JS_FILE_PATH_BIZ_FORM 	= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'business_verification_form.js')
    JS_MD5_BIZ_FORM 		= "." + str( md5sum(JS_FILE_PATH_BIZ_FORM) )
    
    JS_FILE_PATH_RESI_FORM 	= os.path.join(os.path.join(STATIC_ROOT, 'form'), 'resident_verification_form.js')
    JS_MD5_RESI_FORM 		= "." + str( md5sum(JS_FILE_PATH_RESI_FORM) )       

except Exception as e:
    print "exception ::"	
    print e	
    JS_MD5_FORM      = "" 
    JS_MD5_MASTER    = "" 
    JS_MD5_MASTER_DATA = "" 
    JS_MD5_MASTER_DATA_LOAD = "" 
    JS_MD5_BIZ_FORM  = "" 
    JS_MD5_RESI_FORM = "" 
    JS_MD5_READ_FORM = ""
    


DATABASES_RAW_QUERY = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'task-new',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
	'HOST': DB_IP,
   }
}

DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        #'NAME': 'webappdb',
	'NAME': 'Webappdbrvl',
        #'USER': 'webappuser',
	#'PASSWORD': 'VWtdhuvljPEQjglX',
        'USER': 'postgres',
	'PASSWORD': 'postgres',
        'OLD_PASSWORD': 'TGgE6HfvppnXcUVD',
	'HOST': DB_IP,
   }
}

#'rvl_task_manager.template_context_processors.settings_context_processor',

IMG_SAVE_PATH = "/home/analyzer/task_manager_production/finwego-madura/rvl_finwego-madura/static/uploaded_imgs/"
IMG_SAVE_PATH_STATIC = "uploaded_imgs/"

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"

#STATIC_ROOT = ''

STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_ROOT = "/home/analyzer/task_manager_production/finwego-madura/rvl_finwego-madura/static" 

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
#STATIC_URL = '/home/analyzer/task_manager_production/finwego-madura/static/'
#STATIC_URL = '/static/'

# Additional locations of static files
#STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    ##"/home/analyzer/task_manager_production/finwego-madura/static",
    #"rvl_finwego-madura/static",
#)


#slash False for urls:
APPEND_SLASH=False

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'm44%d_coqh%wc2d8)&amp;%y0-f-+h^#jlg^6g(r#wdr1=6whhx$9$'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'rvl_task_manager.urls'

# Python dotted path to the WSGI application used by Django's runserver.
#WSGI_APPLICATION = 'rvl_task_manager.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    "/home/analyzer/task_manager_production/finwego-madura/rvl_finwego-madura/templates",
	
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'rvl_task_manager.template_context_processors.settings_context_processor',
)
AUTH_USER_MODEL = 'rvl_task_manager.user_location_map'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rvl_task_manager',
    # Uncomment the next line to enable the admin:
    #'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

