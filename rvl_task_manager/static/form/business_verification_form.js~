var avroObj = {};
$("#shop_photo_img").change(function(){
		document.getElementById('applicant_with_shop_photo1').value = this.value;
		readURL(this, 'shopPhotoPop');
	});
$("#shop_photo_img1").change(function(){
		document.getElementById('applicant_with_shop_photo2').value = this.value;
		readURL(this, 'shopPhotoPop1');
	});
$("#shop_photo_img2").change(function(){
		document.getElementById('applicant_with_shop_photo3').value = this.value;
		readURL(this, 'shopPhotoPop2');
	});	
imagePopUp();


function submitBvrForm(){
	var url = "/submit/";
	var validation=0;
	var html='';
	$("#alertContentId").html('');
	
	var stringValidate = ["biz_name_of_the_applicant","biz_name_of_the_firm","biz_name_of_the_proprietor","biz_ownership_of_the_premises","biz_nature_of_business",
				"biz_location_of_the_store","contacted_name_of_the_person_spoken_to","contacted_relationship_to_the_owner","vfc_business_proof_verified",
				"vfc_name_board_seen","biz_landmark","biz_remarks"];
	
	var intValidate = ["biz_rentorlease_amount","biz_numberof_years_in_this_location","biz_products_sold","biz_business_turnover_per_day","biz_size_of_the_shop","biz_stock_level","biz_value_of_stock","bill_value_of_bills_collected",
			  "bill_period_from","bill_period_to","bill_number_of_days"];
	
	var label='';
	var mandatoryFieldsDict = {};
	
	for(var i=0; i<stringValidate.length; i++ ){
		if(document.getElementById(""+stringValidate[i]+"")){
			if(document.getElementById(""+stringValidate[i]+"").value == ""){
				$("#"+stringValidate[i]+"").css('background-color','yellow');
				$("#"+stringValidate[i]+"").css('color','black');
				validation =1;
				label = document.getElementById(""+stringValidate[i]+"_label"+"").innerHTML;
				mandatoryFieldsDict[label]="Input text";
			}
		}
	}

	for(var i=0; i<intValidate.length; i++ ){
		if(document.getElementById(""+intValidate[i]+"")){
			if(/^[0-9]*$/.test(document.getElementById(""+intValidate[i]+"").value) == false || document.getElementById(""+intValidate[i]+"").value == ""){
				$("#"+intValidate[i]+"").css('background-color','yellow');
				$("#"+intValidate[i]+"").css('color','black');
				validation =1;
				label = document.getElementById(intValidate[i]+"_label").innerHTML;
				mandatoryFieldsDict[label]="Input only Numeric Value";
			}			
		}
	}
	if(document.getElementById("shop_photo_img").files.length == 0){
		$("#shop_photo_with_the_applicant").css('background-color','yellow');
		$("#shop_photo_with_the_applicant").css('color','black');
		validation =1;
		label = document.getElementById("shop_photo_with_the_applicant_label").innerHTML;
		mandatoryFieldsDict[label]="Upload document";
		}
	
	html+='<table style="margin:auto;width:90%;"><thead><tr><th>Empty Input Field</th><th> Input field type </th></tr></thead><tbody>';
	if(validation == 1){
		showAlertBox();
		return false;
	}
	
	function showAlertBox(){
		var keys= Object.keys(mandatoryFieldsDict);
		for(var keys in mandatoryFieldsDict)
			html += '<tr style="padding-left:20%;"><td>'+keys+'</td><td>'+mandatoryFieldsDict[keys]+'</td></tr>'
		html+='</tbody></table>';
		$("#alertContentId").append(html);
		$('#myModal').modal('show');
		html='';
	}

	

	/*Business Details*/

	var biz_name_of_the_applicant			= document.getElementById("biz_name_of_the_applicant").value;	
	var biz_name_of_the_firm			= document.getElementById("biz_name_of_the_firm").value;	
	var biz_name_of_the_proprietor			= document.getElementById("biz_name_of_the_proprietor").value;	
	var biz_ownership_of_the_premises		= document.getElementById("biz_ownership_of_the_premises").value;
	var biz_rentorlease_amount			= document.getElementById("biz_rentorlease_amount").value;
	var biz_nature_of_business			= document.getElementById("biz_nature_of_business").value;
	var biz_location_of_the_store			= document.getElementById("biz_location_of_the_store").value;	
	var biz_landmark				= document.getElementById("biz_landmark").value;	
	var biz_numberof_years_in_this_location		= document.getElementById("biz_numberof_years_in_this_location").value;	
	var biz_size_of_the_shop			= document.getElementById("biz_size_of_the_shop").value;
	var biz_products_sold				= document.getElementById("biz_products_sold").value;
	var biz_stock_level				= document.getElementById("biz_stock_level").value;	
	var biz_value_of_stock				= document.getElementById("biz_value_of_stock").value;
	var biz_business_turnover_per_day		= document.getElementById("biz_business_turnover_per_day").value;
	

	/*Contacted Person*/
	var contacted_name_of_the_person_spoken_to	= document.getElementById("contacted_name_of_the_person_spoken_to").value;	
	var contacted_relationship_to_the_owner		= document.getElementById("contacted_relationship_to_the_owner").value;	
	
	/*Employees_work_hours*/
	var empwork_number_of_employees			= document.getElementById("empwork_number_of_employees").value;	
	var empwork_number_of_employees_seen		= document.getElementById("empwork_number_of_employees_seen").value;	
	var empwork_total_employee_salary_per_month	= document.getElementById("empwork_total_employee_salary_per_month").value;	
	var empwork_number_of_working_hours 		= document.getElementById("empwork_number_of_working_hours").value;	
	var empwork_peak_hour_timing			= document.getElementById("empwork_peak_hour_timing").value;	
	var empwork_peak_hour_per_day			= document.getElementById("empwork_peak_hour_per_day").value;		
	
	/*Bill Details*/
	var bill_value_of_bills_collected		= document.getElementById("bill_value_of_bills_collected").value;	
	var bill_period_from  				= document.getElementById("bill_period_from").value;	
	var bill_period_to				= document.getElementById("bill_period_to").value;
	var bill_number_of_days				= document.getElementById("bill_number_of_days").value;	

	/*Verification"*/
	var vfc_business_proof_verified 		= document.getElementById("vfc_business_proof_verified").value;	
	var vfc_name_board_seen  	 		= document.getElementById("vfc_name_board_seen").value;

	/*Business_Asset*/
	var bizast_weighing_scale			= document.getElementById("bizast_weighing_scale").value;	
	var bizast_photocopier 				= document.getElementById("bizast_photocopier").value;	
	var bizast_freezer				= document.getElementById("bizast_freezer").value;
	var bizast_laminating_machine			= document.getElementById("bizast_laminating_machine").value;
	var bizast_pco					= document.getElementById("bizast_pco").value;	
	var bizast_any_other_asset 			= document.getElementById("bizast_any_other_asset").value;family_person

	/*Family details  */
	var family_person				= document.getElementById("family_person").value;	
	var sex						= document.getElementById("sex").value;	
	var education					= document.getElementById("education").value;
	var income					= document.getElementById("income").value;
	var remarks					= document.getElementById("remarks").value;

	/*Other_source_of_Income*/
	var income_agriland				= document.getElementById("income_agriland").value;	
	var income_extend				= document.getElementById("income_extend").value;	
	var income_crop					= document.getElementById("income_crop").value;
	var income_annual_profit			= document.getElementById("income_annual_profit").value;
	var income_annual_rentals			= document.getElementById("income_annual_rentals").value;
	var income_annual_number_of_premises		= document.getElementById("income_annual_number_of_premises").value;
	var income_annual_rent_received_per_month	= document.getElementById("income_annual_rent_received_per_month").value;
	var status_of_business_check			= $('input[name="status_of_business_check"]:checked').val();
	var biz_remarks					= document.getElementById("biz_remarks").value;

	
	/*Other Business*/
	var other_name_of_the_firm			= document.getElementById("other_name_of_the_firm").value;	
	var other_firm_type				= document.getElementById("other_firm_type").value;	
	var other_firm_profit				= document.getElementById("other_firm_profit").value;
	var other_firm_products_sold			= document.getElementById("other_firm_products_sold").value;

	/*Other loans*/
	var other_loan_type				= document.getElementById("other_loan_type").value;
	var other_loan_company				= document.getElementById("other_loan_company").value;
	var other_loan_emi				= document.getElementById("other_loan_emi").value;
	var other_loan_tenure				= document.getElementById("other_loan_tenure").value;
	var other_loan_month_balance			= document.getElementById("other_loan_month_balance").value;
	var other_loan_remarks				= document.getElementById("other_loan_remarks").value;	
	var enduser_of_the_loan				= document.getElementById("enduser_of_the_loan").value;
	var Value_of_sale_during_pd			= document.getElementById("Value_of_sale_during_pd").value;

	/*Distributor reference check*/
	var distributor_name				= document.getElementById("distributor_name").value;
	var distributor_address				= document.getElementById("distributor_address").value;
	var distributor_phoneno				= document.getElementById("distributor_phoneno").value;
	var name_of_the_person_spoken_to		= document.getElementById("name_of_the_person_spoken_to").value;
	var distributor_supplied_products		= document.getElementById("distributor_supplied_products").value;
	var relationship_in_years			= document.getElementById("relationship_in_years").value;	
	var distributor_supplies_mon_avg		= document.getElementById("distributor_supplies_mon_avg").value;
	var distributor_type_of_sale			= document.getElementById("distributor_type_of_sale").value;
	var distributor_credit_period_in_days		= document.getElementById("distributor_credit_period_in_days").value;	
	var customer_behaviour				= document.getElementById("customer_behaviour").value;	
	var applicant_with_shop_photo1			= document.getElementById("applicant_with_shop_photo1").value;	
	var applicant_with_shop_photo2			= document.getElementById("applicant_with_shop_photo2").value;
	var applicant_with_shop_photo3			= document.getElementById("applicant_with_shop_photo3").value;
	/*Business verification report json data*/


	/*Date and time,  DateOnly*/
	var currentDateValue  		= (new Date());
	currentDateValue 		= JSON.stringify(currentDateValue);
	currentDateValue 		= currentDateValue.replace(/"/g,'');
	var currentDateValuesplit 	= currentDateValue.split('T') 
	var currentDateValueDateOnly 	= currentDateValuesplit[0];

	/*Time Out*/
	var d = new Date(); 
	var timeOut = (d.getHours()+":"+d.getMinutes()).toString();
	var currentTime = (d.getHours() + ":" + d.getMinutes()).toString();
	
	/*Business verification report json data*/
	var dataObj_bvr = {
		"member_id" 				: parseInt(member_id),
		"loan_id"				: parseInt(loan_id),		
		"date" 					: currentDateValueDateOnly,
		"branch_name" 				: "",
		"time_in" 				: timeIn,
		"time_out" 				: timeOut,
		"user_id"				: user_id,

		"biz_name_of_the_applicant" 		: biz_name_of_the_applicant,
		"biz_name_of_the_firm" 			: biz_name_of_the_firm,
		"biz_name_of_the_proprietor" 		: biz_name_of_the_proprietor,
		"biz_ownership_of_the_premises" 	: biz_ownership_of_the_premises,
		"biz_rentorlease_amount" 		: parseFloat(biz_rentorlease_amount),
		"biz_nature_of_business"		: biz_nature_of_business,
		"biz_location_of_the_store" 		: biz_location_of_the_store,
		"biz_landmark" 				: biz_landmark,
		"biz_numberof_years_in_this_location" 	: parseInt(biz_numberof_years_in_this_location),
		"biz_size_of_the_shop" 			: parseInt(biz_size_of_the_shop),
		"biz_products_sold" 			: parseInt(biz_products_sold),
		"biz_stock_level" 			: parseInt(biz_stock_level),
		"biz_value_of_stock" 			: parseInt(biz_value_of_stock),
		"biz_business_turnover_per_day" 	: parseInt(biz_business_turnover_per_day),
						
		"contacted_name_of_the_person_spoken_to" : contacted_name_of_the_person_spoken_to,
		"contacted_relationship_to_the_owner" 	: contacted_relationship_to_the_owner,							
						
		"empwork_number_of_employees" 		: parseInt(empwork_number_of_employees),
		"empwork_number_of_employees_seen" 	: parseInt(empwork_number_of_employees_seen),
		"empwork_total_employee_salary_per_month": parseFloat(empwork_total_employee_salary_per_month),
		"empwork_number_of_working_hours" 	: parseInt(empwork_number_of_working_hours),
		"empwork_peak_hour_timing" 		: parseInt(empwork_peak_hour_timing),
		"empwork_peak_hour_per_day" 		: parseInt(empwork_peak_hour_per_day),
						
						
		"bill_value_of_bills_collected" 	: parseFloat(bill_value_of_bills_collected),
		"bill_period_from"			: parseInt(bill_period_from),
		"bill_period_to" 			: parseInt(bill_period_to),
		"bill_number_of_days"			: parseInt(bill_number_of_days),
						
		"vfc_business_proof_verified" 		: vfc_business_proof_verified, 
		"vfc_name_board_seen" 			: vfc_name_board_seen,
						
		 "businessAssetArray":[{
					"bizast_weighing_scale"			: bizast_weighing_scale,
					"bizast_photocopier"			: bizast_photocopier,
					"bizast_freezer"			: bizast_freezer,
					"bizast_laminating_machine"		: bizast_laminating_machine,
					"bizast_pco"				: bizast_pco,
					"bizast_any_other_asset"		: bizast_any_other_asset,
					}],
		"familyDetailsArray":[{
					"family_person"				: family_person,
					"sex"					: sex,
					"education"				: education, 
					"income"				: parseFloat(income),
					"remarks"				: remarks,							
					}],
						
		"income_agriland" 			: parseFloat(income_agriland),
		"income_extend" 			: parseFloat(income_extend),
		"income_crop" 				: parseFloat(income_crop),
		"income_annual_profit" 			: parseFloat(income_annual_profit),
		"income_annual_rentals" 		: parseFloat(income_annual_rentals),
		"income_annual_number_of_premises" 	: parseFloat(income_annual_number_of_premises),
		"income_annual_rent_received_per_month" : parseFloat(income_annual_rent_received_per_month),
		"status_of_business_check"		: status_of_business_check,
		"biz_remarks"				: biz_remarks,

		"otherBusinessArray":[{
					"other_name_of_the_firm"		: other_name_of_the_firm,
					"other_firm_type"			: other_firm_type,
					"other_firm_profit"			: parseFloat(other_firm_profit),
					"other_firm_products_sold"		: parseInt(other_firm_products_sold),
					}],
							
		"otherLoansArray":[{
					"other_loan_type"			: other_loan_type,
					"other_loan_company"			: other_loan_company,
					"other_loan_emi"			: parseFloat(other_loan_emi),
					"other_loan_tenure"			: parseInt(other_loan_tenure),
					"other_loan_month_balance"		: parseFloat(other_loan_month_balance),
					"other_loan_remarks"			: other_loan_remarks,
					"enduser_of_the_loan"			: enduser_of_the_loan,
					"Value_of_sale_during_pd"		: Value_of_sale_during_pd,
					}],

		"distributorReferenceArray":[{
						"distributor_name"		: distributor_name,
						"distributor_address"		: distributor_address,
						"distributor_phoneno"		: parseInt(distributor_phoneno),
						"name_of_the_person_spoken_to"	: name_of_the_person_spoken_to,
						"distributor_supplied_products"	: distributor_supplied_products,/*error*/
						"relationship_in_years"		: parseInt(relationship_in_years),
						"distributor_supplies_mon_avg"	: parseInt(distributor_supplies_mon_avg),
						"distributor_type_of_sale"	: distributor_type_of_sale,
						"distributor_credit_period_in_days": parseInt(distributor_credit_period_in_days),
						"customer_behaviour"		: customer_behaviour,						
						"applicant_with_shop_photo1"	: applicant_with_shop_photo1.replace(/\\/g,''),
						"applicant_with_shop_photo2"	: applicant_with_shop_photo2.replace(/\\/g,''),
						"applicant_with_shop_photo3"	: applicant_with_shop_photo3.replace(/\\/g,'')
						}]
						
			};		
		

	var dataArr_bvr = {
			"businessVerificationArray": [	dataObj_bvr ]
		};

	var remarks_arr = {
		"validation_member_id": parseInt(member_id),
		"validation_loan_id": parseInt(loan_id),
		"validation_type": parseInt(1),
		"validation_level": parseInt(1),
		"validation_status": parseInt(1),
		"remarks": biz_remarks,
		"process_id": processid,
		"task_id": task_id,
		"task_name": "Business Verification",
		"validation_fk_last_modified_by": user_id,
		"validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
		"validation_fk_sci_client_id": parseInt(1)
	};

	var remarksData = {
		"mlValidationArray": [remarks_arr]
	};
	

	/*JSON data for AVRO form*/		
	var processupdate = {'variables': {'Business_Verification_Status' : {'value' : 'New'}}    };		
	var biz_data = new FormData();
	biz_data.append("form_data", JSON.stringify(dataArr_bvr));
	biz_data.append("task_id",task_id);
	biz_data.append("process_data",JSON.stringify(processupdate));
	biz_data.append("comments",JSON.stringify(remarksData));
	
	jQuery.each(jQuery('#shop_photo_img')[0].files, function(i, file) {
	    biz_data.append("file-63",file);
	});
	jQuery.each(jQuery('#shop_photo_img1')[0].files, function(i, file) {
	    biz_data.append("file-63a",file);
	});
	jQuery.each(jQuery('#shop_photo_img2')[0].files, function(i, file) {
	    biz_data.append("file-63b",file);
	});
	var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">'
			+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			+'</div>'
			+'</div>';
	$(".popup").empty().append(theImg).fadeIn();	
	var opts = {
		    url: '/submitBusinessForm/submitBusinessFormAdd',
		    data: biz_data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    dataType: 'json',
		    type: 'POST',
		    success: function (data) 
		    {	
			$(".popup").fadeOut();
			window.location='/tasks/';
		    },
		    error: function(error) 
		    {
			console.log(error)
		    }
		
		};
	     	if(biz_data.fake) {
	    	// Make sure no text encoding stuff is done by xhr
	    		opts.xhr = function() { var xhr = jQuery.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; }
	   		opts.contentType = "multipart/form-data; boundary="+biz_data.boundary;
	    		opts.data = biz_data;
		}
		jQuery.ajax(opts);
	


}
