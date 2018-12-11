import datetime
from django.contrib.contenttypes.models import ContentType
import os
import json, ast
from django import forms
from django.db import IntegrityError
from django.db import models
from django.db.models import Count
from django.core.urlresolvers import reverse
from django.core.files.storage import default_storage, get_storage_class
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseRedirect, HttpResponseForbidden, HttpResponseNotFound,\
    HttpResponseServerError
from django.shortcuts import render_to_response, get_object_or_404, render
from django.template import loader, RequestContext
from django.core import serializers
from django.views.decorators.http import require_GET, require_POST

#Abstract User
from django.contrib.auth import models as auth_models
from django.contrib.auth.models import AbstractUser
from django.db.migrations.migration import Migration
from django.db.models.signals import post_save
from django.dispatch import receiver


class CibilDetails(models.Model):
    member_id = models.IntegerField()
    loan_id = models.IntegerField()
    date 	  = models.TimeField(blank=True, null=True)
    request 	  = models.TextField(blank=True, null=True)  # This field type is a guess.
    response 	  = models.TextField(blank=True, null=True)  # This field type is a guess.
    status 	  = models.CharField(max_length=50, blank=True, null=True)
    status_code   = models.CharField(max_length=2, blank=True, null=True)
    resubmit 	  = models.CharField(max_length=50, blank=True, null=True)
    resubmit_time = models.DateTimeField(blank=True, null=True)
    member_name	  = models.CharField(max_length=120, blank=True, null=True)


    class Meta:
        #managed = False
        db_table = 'cibil_details' 
        
        
class adm_level(models.Model):
    admlevel_id = models.IntegerField()
    admlevel_type = models.CharField(max_length=255)
    admlevel_type_name = models.CharField(max_length=255)
    last_modified_by = models.IntegerField()
    last_modified_date = models.DateTimeField('date published')
    
    def __unicode__(self):
        return self.admlevel_type_name

class product_def(models.Model):
    prod_id = models.IntegerField()
    prod_name = models.CharField(max_length=255)
    product_desc = models.CharField(max_length=255)
    last_modified_by = models.IntegerField()
    last_modified_date = models.DateTimeField('date published')
    
    def __unicode__(self):
        return self.prod_name
    
class location_master(models.Model):
    location_id = models.IntegerField()
    location_name = models.CharField(max_length=255)
    location_code = models.CharField(max_length=255)    
    last_modified_date = models.DateTimeField('date published')
    last_modified_by = models.IntegerField()
    admlevel_id = models.ForeignKey(adm_level, blank=True, null=True)
    
    def __unicode__(self):
        return self.location_name
        
class territory_master(models.Model):
    territory_id = models.IntegerField()
    territory_name = models.CharField(max_length=255)  
    last_modified_date = models.DateTimeField('date published')
    last_modified_by = models.IntegerField()  
    
    def __unicode__(self):
        return self.territory_name
        
class product_territory_map(models.Model):
    prodterritorymap_id = models.IntegerField()    
    territory_name = models.CharField(max_length=255)
    product_id = models.ForeignKey(product_def, blank=True, null=True)        
    territory_id = models.ForeignKey(territory_master, blank=True, null=True)
    last_modified_date = models.DateTimeField('date published')
    last_modified_by = models.IntegerField()
    
    def __unicode__(self):
        return self.territory_name
        
class locaton_prod_territory_map(models.Model):
    location = models.ForeignKey(location_master, blank=True, null=True)
    admlevel_id = models.ForeignKey(adm_level, blank=True, null=True)
    prodterritorymap_id = models.ForeignKey(product_territory_map, blank=True, null=True)
    product = models.ForeignKey(product_def, blank=True, null=True)   
    territory_id = models.ForeignKey(territory_master, blank=True, null=True)
    parent_location_id = models.IntegerField()  
    last_modified_date = models.DateTimeField('date published')
    last_modified_by = models.IntegerField() 
    
    def __unicode__(self):
        return self.parent_location_id        
       
class locaton_territory_hierrarchy(models.Model):
    location_name =  models.CharField(max_length=255)
    loaction_id = models.IntegerField()
    parent_location_id = models.IntegerField()    
    product_id = models.ForeignKey(product_def, blank=True, null=True)   
    territory_id = models.ForeignKey(territory_master, blank=True, null=True)
    loc_terri_code = models.TextField(max_length=255)
    last_modified_date = models.DateTimeField('date published')
    last_modified_by = models.IntegerField() 
    
    def __unicode__(self):
    	return '%s %s' % (self.location_name, self.territory_id) 
        
class loan_amount_master(models.Model):
	loan_amount 	=  models.IntegerField()
	loan_product_id	=  models.CharField(max_length=10,default="")	
	loan_type_name  =  models.CharField(max_length=255)
	
	def __unicode__(self):
    	    return '%s %s %s' % (self.loan_amount, self.loan_product_id,self.loan_type_name) 
    	    
    
class location_hierarchy_group(models.Model):
    group_name = models.CharField(max_length=255)
    def __unicode__(self):
    	    return '%s' % (self.group_name) 
    
class location_hierarchy_group_location_territory_hierrarchy_map(models.Model):
    location_hierarchy_group_id = models.ForeignKey(location_hierarchy_group, blank=True, null=True)   
    location_territory_hierarchy_id = models.ForeignKey(locaton_territory_hierrarchy, blank=True, null=True)       
    def __unicode__(self):
    	    return '%s %s' % (self.location_hierarchy_group_id, self.location_territory_hierarchy_id)     
         

class user_location_map(AbstractUser):
	phone_numer = models.CharField(max_length=255,default="")
	territory = models.ForeignKey(territory_master, blank=True, null=True)
	
	
class location_map_location_hierarchy_group(models.Model):
    	user_location_map_id = models.ForeignKey(user_location_map, blank=True, null=True) 
	location_hierarchy_group_id = models.ForeignKey(location_hierarchy_group, blank=True, null=True) 
	def __unicode__(self):
    	    return '%s %s' % (self.user_location_map_id ,self.location_hierarchy_group_id)  
    

        
        
        
