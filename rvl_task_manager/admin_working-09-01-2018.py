from django.db import models
from django.contrib import admin

from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import AbstractUser
from django.forms.models import ModelChoiceField

#from models import country
#from models import state
from django.contrib.auth import forms
from django import forms
from django.contrib import messages
from django.shortcuts import render
#from models import district
from models import adm_level
from models import product_def
from models import location_master, territory_master, product_territory_map, locaton_prod_territory_map, locaton_territory_hierrarchy,location_hierarchy_group,location_hierarchy_group_location_territory_hierrarchy_map,location_map_location_hierarchy_group
#from models import UserProfile
#from forms import GenreForm
from models import user_location_map

from django.contrib.admin import SimpleListFilter
'''
#==============================
#NEW MODEL FOR MULTIPLE SELECT
#===============================
#from django import forms
#from django.contrib import admin
#from rvl_task_manager.models import segmentation_Rules
from models import segmentation_Rules
from .forms import Segmentation_Form'''

#from task-manager-app.forms import *
#admin.site.register(country)
   
#admin.site.unregister(User)
#admin.site.register(UserProfile,UserProfileAdmin)
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


#from django import forms
#import task_manager_app
#from task_manager_app.models import *

'''class CountryForm( forms.ModelForm ):

    
    objects_location = location_master.objects.all().values_list('id','location_name')
    print "objects"
    print objects_location
    Location = forms.ChoiceField( objects_location , widget=forms.Select(attrs={'onchange': 'javascript:DistrictChange()'}) )
    
    objects = country.objects.all().values_list('id','country_name')
    Country= forms.ChoiceField( objects , widget=forms.Select(attrs={'onchange': 'javascript:make()'}) ) 
    
    objects_state = state.objects.all().values_list('id','state_code')
    State= forms.ChoiceField( objects_state , widget=forms.Select(attrs={'onchange': 'javascript:StateChange()'}) )    
    
    print location_master.objects.all()
    print "1111111"
    objects_dist = district.objects.all().values_list('id','district_code')
    District= forms.ChoiceField( objects_dist , widget=forms.Select(attrs={'onchange': 'javascript:DistrictChange()'}) )  
    
    objects_territory_master = territory_master.objects.all().values_list('id','territory_name')
    print objects_territory_master
    Territory = forms.ChoiceField( objects_territory_master , widget=forms.Select(attrs={'onchange': 'javascript:DistrictChange()'}) )  
    
    objects_prodTerMap = product_territory_map.objects.all().values_list('id','territory_name')
    print "objects_prodTerMap"
    print objects_prodTerMap
    productTerritoryMap = forms.ChoiceField( objects_prodTerMap , widget=forms.Select(attrs={'onchange': 'javascript:DistrictChange()'}) )'''


'''class CountryForm( forms.ModelForm ):

    objects_territory = territory_master.objects.all().values_list('id','territory_name')
    print "objects"
    print objects_territory
    Territory = forms.ChoiceField( objects_territory, widget=forms.Select(attrs={'onchange': 'javascript:territoryChange()'}) )
    
    print locaton_territory_hierrarchy.objects.all()
    
    objects_location = locaton_territory_hierrarchy.objects.all().values_list('territory_id','location_name')
    print "objects"
    print objects_location
    Location = forms.ChoiceField( objects_location , widget=forms.Select(attrs={'onchange': 'javascript:DistrictChange()'}) )
    class Meta:
        model = User_Location_Map
        fields = ('email',)

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(CountryForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user'''

#class user_location_map_Admin(admin.ModelAdmin):
   
class user_location_map_Admin(UserAdmin):

    #form = CountryForm
    #=================
    #multiselect
    #=================
    #form = Segmentation_Form
    '''add_form = CountryForm
    list_display = ("email",)
    ordering = ("email",)

    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name')}),
        )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name', 'is_superuser', 'is_staff', 'is_active')}
            ),
        )

    filter_horizontal = ()''' 
  #Country = forms.ChoiceField( country.objects.all().order_by('country_id'), widget=forms.Select(attrs={'onchange': 'javascript:make()'}) )
	
    can_delete = False
    verbose_name_plural = 'userprofile'     
  
#admin.site.register(UserProfile, state_newAdmin)
#admin.site.unregister(User_Location_Map) 
admin.site.register(user_location_map, user_location_map_Admin)    


