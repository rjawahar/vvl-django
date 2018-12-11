from django.db import models
from django.contrib import admin

from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import AbstractUser
from django.forms.models import ModelChoiceField

from django.contrib.auth import forms
from django import forms
from django.contrib import messages
from django.shortcuts import render
from models import adm_level
from models import product_def
from models import location_master, territory_master, product_territory_map, locaton_prod_territory_map, locaton_territory_hierrarchy,location_hierarchy_group,location_hierarchy_group_location_territory_hierrarchy_map,location_map_location_hierarchy_group
from models import user_location_map

from django.contrib.admin import SimpleListFilter

admin.site.register(adm_level)
admin.site.register(location_master)
admin.site.register(product_def)
admin.site.register(territory_master)
admin.site.register(product_territory_map)
admin.site.register(locaton_prod_territory_map)
admin.site.register(locaton_territory_hierrarchy)
admin.site.register(location_hierarchy_group)
admin.site.register(location_hierarchy_group_location_territory_hierrarchy_map)
admin.site.register(location_map_location_hierarchy_group)

class user_location_map_Admin(admin.ModelAdmin):
    
    list_display = ('username', 'password')	
    can_delete = False
    verbose_name_plural = 'userprofile'  
        
class user_location_map_adm(UserAdmin):

    list_display = ('username', 'password')
    can_delete = False
    verbose_name_plural = 'userprofile'        
    
class create_user(user_location_map):
    class Meta:
        proxy = True

class MyPostAdmin(user_location_map_adm):
    '''def get_queryset(self, request):        
        #return self.model.objects.filter(user = request.user)        
        #return self.model.objects.filter( username = request.user)  
        return user_location_map.objects.filter( username = request.user)  '''
        
    def create_modeladmin(modeladmin, model, name = None):
        class  Meta:
	    proxy = True
	    app_label = model._meta.app_label

        attrs = {'__module__': '', 'Meta': Meta}

        newmodel = type(name, (model,), attrs)

        admin.site.register(newmodel, modeladmin)
        return modeladmin      
  
admin.site.register(user_location_map, user_location_map_Admin)  
admin.site.register(create_user, MyPostAdmin)


