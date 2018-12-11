from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

  # url(r'^admin/preferences/$', TemplateView.as_view(template_name='admin/preferences/preferences.html')),
  # url(r'^admin/', include('django.contrib.admin.urls')),

  (r'^admin/', include(admin.site.urls)),
   url(r'^$'				, 'rvl_task_manager.views.loginview'	 	),
   
   url(r'^login/'			, 'rvl_task_manager.views.loginview'	 ),
   #url(r'^loginFail/'			, 'rvl_task_manager.views.loginFail'	 ),   
   url(r'^logout/$'			, 'django.contrib.auth.views.logout', {'next_page': '/login/'}),    
   
   url(r'^auth/'			, 'rvl_task_manager.views.auth_and_login'	),
   #url(r'^signup/'			, 'rvl_task_manager.views.sign_up_in'	 	),
   #url(r'^secured/'			, 'rvl_task_manager.views.secured'		),
   url(r'^tasks/'			, 'rvl_task_manager.views.tasks'	 	),

   url(r'^taskList/'			, 'rvl_task_manager.views.taskList'	 	),
   url(r'^vvlForms/'			, 'rvl_task_manager.views.vvlForms'	 	),
   url(r'^vvlFormsRead/(?P<memberId>[^/]+)/(?P<loanid>[^/]+)/(?P<processid>[^/]+)/(?P<taskid>[^/]+)/(?P<taskName>[^/]+)/(?P<chequeId>[^/]+)', 'rvl_task_manager.views.vvlFormsRead'),
   url(r'^confirmation/(?P<memberId>[^/]+)/(?P<loanid>[^/]+)/(?P<status>[^/]+)', 'rvl_task_manager.views.confirmation', name="confirmation"),
   
   url(r'^submitFormUpdate/'	, 'rvl_task_manager.views.submitFormUpdate'	),
   url(r'^submitForm/submitFormAdd'	, 'rvl_task_manager.views.submitFormAdd'	),
   url(r'^getMemberId/(?P<id>[^/]+)'	, 'rvl_task_manager.views.getMemberId'		), 	   
   url(r'^getHistory/(?P<id>[^/]+)'	, 'rvl_task_manager.views.getHistory'		),
   url(r'^getProcessHistory/(?P<memberId>[^/]+)/(?P<loanId>[^/]+)'	, 'rvl_task_manager.views.getProcessHistory'		),  
   url(r'^getCibilFailureData/(?P<memberid>[^/]+)/(?P<loanid>[^/]+)', 'rvl_task_manager.views.getCibilFailureData'),  
   url(r'^readMLValidationData/(?P<memberid>[^/]+)/(?P<loanid>[^/]+)', 'rvl_task_manager.views.readMLValidationData'),   	   
   url(r'^getLoanInfoByDate/(?P<fromDate>[^/]+)/(?P<toDate>[^/]+)/(?P<userName>[^/]+)', 'rvl_task_manager.views.getLoanInfoByDate'),
   url(r'^getProcessListByDate/(?P<userName>[^/]+)/(?P<status>[^/]+)/(?P<fromDate>[^/]+)/(?P<toDate>[^/]+)', 'rvl_task_manager.views.getProcessListByDate'),   
   
   
   url(r'^task/(?P<id>[^/]+)/(?P<name>[^/]+)/user$'		   , 'rvl_task_manager.views.claim'	),

   url(r'^updateReworktaskprocess/(?P<status>[^/]+)'		   , 'rvl_task_manager.views.updateReworktaskprocess'	 	   ),
   url(r'^updateVerificationtaskprocess/(?P<status>[^/]+)'	   , 'rvl_task_manager.views.updateVerificationtaskprocess'	   ),
   
   url(r'^dispatch/'			, 'rvl_task_manager.views.dispatch'		),
   url(r'^masterJs/'			, 'rvl_task_manager.views.masterJs'		),
   url(r'^masterJsUpdate'		, 'rvl_task_manager.views.masterJsUpdate'	),      
   
   
   #Master Locations Url:
   url(r'^masterLocation/$'		, 'rvl_task_manager.views.masterLocation'	, name='masterLocation'	    ),  
   url(r'^villageDetails/$'		, 'rvl_task_manager.views.villageDetails'	, name='villageDetails'	    ),     
   url(r'^pincodeDetails/$'		, 'rvl_task_manager.views.pincodeDetails'	, name='pincodeDetails'	    ),        
    
   #Verification Business And Resident:
   url(r'^submitResidentForm/submitResidentFormAdd'		, 'rvl_task_manager.views.submitResidentFormAdd'	),	       
   url(r'^submitBusinessForm/submitBusinessFormAdd'		, 'rvl_task_manager.views.submitBusinessFormAdd'	),	
   url(r'^updateTask'						, 'rvl_task_manager.views.updateTask'			),
   url(r'^rejectTask'						, 'rvl_task_manager.views.rejectTask'			),	   
   url(r'^uploadDocument'					, 'rvl_task_manager.views.uploadDocument'		),
   url(r'^sendCheque'						, 'rvl_task_manager.views.sendCheque'			),
   url(r'^preparecheque'					, 'rvl_task_manager.views.preparecheque'		),   	         
   url(r'^disburseChequeAndPreEmi'				, 'rvl_task_manager.views.disburseChequeAndPreEmi'	),   	            
   url(r'^dispatchDocsBatchUpdate/'		  		, 'rvl_task_manager.views.dispatchDocsBatchUpdate'	),
   url(r'^myDashBoard/'		  				, 'rvl_task_manager.views.myDashBoard'		),

   url(r'^myDashBoardTat/'		  			, 'rvl_task_manager.views.myDashBoardTat'		),

   url(r'^FilterLoansByDate/'		  			, 'rvl_task_manager.views.FilterLoansByDate'	),
   url(r'^FilterLoansByUser/'		  			, 'rvl_task_manager.views.FilterLoansByUser'	), 
   url(r'^getApprovedListByUser/'		  		, 'rvl_task_manager.views.getApprovedListByUser'), 
   url(r'^getRejectedList/'		  			, 'rvl_task_manager.views.getRejectedList'	),
   url(r'^getApprovedList/'		  			, 'rvl_task_manager.views.getApprovedList'	),
   url(r'^tatReport/'						, 'rvl_task_manager.views.tatReport'		),
   url(r'^tatReportByUser/'					, 'rvl_task_manager.views.tatReportByUser'	),
   url(r'^tattaskdetails/'					, 'rvl_task_manager.views.tattaskdetails'	),
   url(r'^tattaskdetailsByUser/(?P<userName>[^/]+)'		, 'rvl_task_manager.views.tattaskdetailsByUser'	),
   #url(r'^tattask/(?P<taskname>[^/]+)'				, 'rvl_task_manager.views.tatread'		),
   url(r'^tattaskuser/(?P<taskname>[^/]+)'				, 'rvl_task_manager.views.tatreaduser'	),
   url(r'^uploadDocsRework/'					, 'rvl_task_manager.views.uploadDocsRework'	),
   url(r'^getCompletedList/'		  			, 'rvl_task_manager.views.getCompletedList'	),
   url(r'^getCompletedTaskList/(?P<fromDate>[^/]+)/(?P<toDate>[^/]+)'		  		, 'rvl_task_manager.views.getCompletedTaskList'	),
   
   #For Access Control
   url(r'^filteredList/'		  			, 'rvl_task_manager.views.filteredList'		),
   url(r'^filteredList1/'					, 'rvl_task_manager.views.filteredList1'	),
   url(r'^approvedListfilter/'		  			, 'rvl_task_manager.views.approvedListfilter'		),
   url(r'^rejectedListfilter/'		  			, 'rvl_task_manager.views.rejectedListfilter'		),
   
   #url(r'^loadclusteroffice/'					, 'rvl_task_manager.views.loadclusteroffice'	),
   url(r'^loadRegion/'						, 'rvl_task_manager.views.loadRegion'	),
   url(r'^loadStateMyDashboard/'				, 'rvl_task_manager.views.loadStateMyDashboard'	),
   url(r'^loadcluster/'						, 'rvl_task_manager.views.loadcluster'	),
   url(r'^loadUser/(?P<clusterVal>[^/]+)'			, 'rvl_task_manager.views.loadUser'	),  
   #url(r'^loadUser/'						, 'rvl_task_manager.views.loadUser'	),  
   #url(r'^loadClusterOffice/'					, 'rvl_task_manager.views.loadClusterOffice'	),
   url(r'^clusterOffice_Load/'					, 'rvl_task_manager.views.loadClusterOffice'	),   
   #url(r'^taskmyDashboard/'					, 'rvl_task_manager.views.taskmyDashboard'	),   
   url(r'^taskTracker/(?P<memberId>[^/]+)'			, 'rvl_task_manager.views.taskTracker'		),  
   url(r'^tatReportList/'					, 'rvl_task_manager.views.tatReportList'	),
   url(r'^tattaskread/'						, 'rvl_task_manager.views.tattaskread'		),
          
)		


