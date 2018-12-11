var avroObj = {};

$("body").on('click', ".wrap", function(){
    $(".popup").fadeOut();
})

jQuery(document).ready(function($) {
    $('.dropDownHook span').on('click', function() {
        $(this).parents('.dropDownHook').children('.dropDownContent').stop(true, true).slideToggle('medium', function() {

            if ($('.dropDownContent').is(':visible')) {
                //  This alters the content of the "hook" when we open the drop down
            }
            else {
                //  This alters the content of the "hook" when we close the dropdown
            }
        });
    });
    
    $('html').on('click', function() {
        $('.dropDownContent:visible').slideToggle('fast');
    });

    $('.dropDownHook > *').on('click', function(event) {
        event.stopPropagation();
    });
});

$('.dropDownContent').css('display','none');

window.onload = function(){
	
	if(screenHeight){
		var height = screenHeight*(0.9);
		var slipHeight = height/3;
		$('body').height((height*(0.80)));
		$('.task-div').height((height*(0.80)));
		$('.main-task').height((height*(0.80)));
		$('#right-pane-task').height((height));
		$('#right-pane-task-detail').height((height*(0.75)));
		$('#right-pane-task-comment-list').height((height*(0.795)));

		document.getElementById('right-pane-task-detail').style.overflowY = 'auto';
		if(document.getElementById('right-pane-task-comment-list')){
			document.getElementById('right-pane-task-comment-list').style.overflowY = 'auto';
		}
	}
	
	var FOOTER_HTML ='';
	if((taskName == "Upload KA Loan Document") || (taskName == "Reupload KA Loan Document") || (taskName == "Reupload Loan Document")){
		FOOTER_HTML = '<textarea style="width:90%;height:20%;background-color:white;" id="comments"    placeholder="Comments"></textarea><font class="mandatory" style="display:none;">*</font>'
			   	   +'<div style="padding-top:1%;">'
					+'<a href="javascript:void(0)" onclick="window.location='+"'/tasks/'"+'"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					+'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					+' Cancel'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitForm('+"'ReworkCompleted','LoanDoc_Verify_Status'"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					+'<i class="icon-entypo-forward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					+'Submit'
					+'</a>'
				   +'</div>';
	}
	if(taskName == "Rework Loan Application"){
		FOOTER_HTML = '<textarea style="width:90%;height:20%;background-color:white;font-size: 11px;" id="comments"    placeholder="Comments"></textarea><font class="mandatory">*</font>'
				   +'<div style="padding-top:1%;">'
					+'<a href="javascript:void(0)" onclick="window.location='+"'/tasks/'"+'" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Cancel'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitForm('+"'ProcessStopped',''"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Stop Process'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitForm('+"'ReworkCompleted',''"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-forward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Rework Completed'
					+'</a>'
				    +'</div>';
	}		
	document.getElementById('colomn-div-footer').innerHTML = FOOTER_HTML; 	 

	setSelectOptionInForm();	/*Function in masterDataLoad.js	*/
	loadingMlCompositeData();	/*Function in masterDataLoad.js	*/
	imagePopUp();			/*Function in masterDataLoad.js	*/
}   

function submitForm(d, statusKey){
	
	if(d =="ProcessStopped"){
		var cmmts = document.getElementById('comments').value;

		if(statusKey == "LoanDoc_Verify_Status"){
			var processupdate = {"variables": {
						"LoanDoc_Verify_Status" : {
							"value" : ""+d+"", 
							"type": "String"
						},
						"Application_Remarks" : {
							"value" : cmmts, 
							"type": "String"
						}
					}};
		}else if(statusKey == "KALoanDoc_Upload_Status"){
			var processupdate = {"variables": {
						"KALoanDoc_Upload_Status" : {
							"value" : ""+d+"", 
							"type": "String"
						},
						"Application_Remarks" : {
							"value" : cmmts, 
							"type": "String"
						}
					}};
		}else{
			var processupdate = {"variables": {
						"Application_Status" : {
							"value" : ""+d+"", 
							"type": "String"
						},
						"Application_Remarks" : {
							"value" : cmmts, 
							"type": "String"
						}
					}};
		}

		var dataObj = {};

		dataObj['process'] = processupdate;
		dataObj['processid'] = processid;
		dataObj['taskid'] = taskid;

		$.ajax({
			url: '/updateReworktaskprocess/ProcessStopped',
			type: 'post',
			dataType: 'json',
			success: function(data){
				//console.log(data);
			},
			data: JSON.stringify(dataObj)
		});

	} else {

		var currentDateValue  = (new Date());
		currentDateValue = JSON.stringify(currentDateValue);
		currentDateValue = currentDateValue.replace(/"/g,'');

		/*************** Basic Details ****************/
		/*Name Details*/
		var firstname 		= document.getElementById("firstname").value;
		var middlename 		= document.getElementById("middlename").value;	
		var lastname 		= document.getElementById("lastname").value;	
		var mobile_number 	= document.getElementById("mobile_number").value;	

		/*Gender relation and age Details*/
		var gender 		= $('input[name="gender"]:checked').val();
		var relation 		= $('input[name="relation"]:checked').val();

		var father_name		= document.getElementById("father_name").value;	
		var spouse_name		= document.getElementById("spouse_name").value;	
		var dob 		= document.getElementById("dob").value;	
		var age 		= document.getElementById("age").value;	

		/*Address details*/
		var doorNo 		= document.getElementById("current_door_no").value;	
		var streetName 		= document.getElementById("current_street_name").value;	
		var locationName 	= document.getElementById("current_location_name").value;	
		var city_town 		= document.getElementById("fk_curr_village_or_town_id").value;	
		
		var state 		= document.getElementById("current_state").value;	
		var district 		= document.getElementById("current_district").value;	
		var taluk 		= document.getElementById("current_taluk").value;	
		var pincode 		= document.getElementById("current_pincode").value;	

		/*ID Proof Information*/
		var fk_id_proof_type_id	= document.getElementById("fk_id_proof_type_id").value;	
		var id_proof_type	= document.getElementById("id_proof_type").value;	
		var alf_node_ref_img_1 	= document.getElementById("alf_node_ref").value;	
		var alf_node_ref_img_2  = document.getElementById("alf_node_ref1").value;	

		/*Address Proof Information*/
		var fk_current_address_proof_type_id	= document.getElementById("fk_current_address_proof_type_id").value;	
		var current_document_value   		= document.getElementById("current_document_value").value;	
		var current_document_url		= document.getElementById("current_document_url").value;
		var current_address_fk_alf_node_ref	= document.getElementById("current_address_fk_alf_node_ref").value;

		/*Bank Information*/
		var id1_name_as_per_bank_records = document.getElementById("id1_name_as_per_bank_records").value;	
		var id1_bank_name   	 	 = document.getElementById("id1_bank_name").value;	
		var id1_bank_account_number	 = document.getElementById("id1_bank_account_number").value;	
		var id1_bank_ifsc_code		 = document.getElementById("id1_bank_ifsc_code").value;	

		var member_bank_fk_alf_node_ref	 = document.getElementById("member_bank_fk_alf_node_ref").value;	
		var member_bank_fk_alf_node_ref1 = document.getElementById("member_bank_fk_alf_node_ref1").value;	

		/*Loan Information*/
		var fk_purpose_id 		 = document.getElementById("fk_purpose_id").value;	
		var fk_product_id_loan   	 = document.getElementById("fk_product_id_loan").value;	
		var application_loan_amount	 = document.getElementById("application_loan_amount").value;
		var ml_fk_alf_node_ref	 	 = document.getElementById("ml_fk_alf_node_ref").value;

		/*************** Business Details ****************/
		/*Business Info*/
		var biz_nature 		= document.getElementById("biz_nature").value;
		var biz_no_of_yrs 	= document.getElementById("biz_no_of_yrs").value;	
		var biz_location 	= document.getElementById("biz_location").value;	
		var rent_pay_month 	= document.getElementById("rent_pay_month").value;

		var biz_door_no			= document.getElementById("biz_door_no").value;
		var biz_street_name 		= document.getElementById("biz_street_name").value;	
		var biz_location_name 		= document.getElementById("biz_location_name").value;	
		var fk_biz_village_or_town 	= document.getElementById("fk_biz_village_or_town").value;

		var biz_state 				= document.getElementById("biz_state").value;
		var biz_district			= document.getElementById("biz_district").value;
		var biz_taluk 				= document.getElementById("biz_taluk").value;
		var biz_pincode 			= document.getElementById("biz_pincode").value;	
		
		var biz_office_address_landline_number 	= document.getElementById("biz_office_address_landline_number").value;	
		var biz_office_address_mobile_number 	= document.getElementById("biz_office_address_mobile_number").value;

		var biz_address_fk_alf_node_ref 	= document.getElementById("biz_address_fk_alf_node_ref").value;	
		var biz_address_fk_alf_node_ref1 	= document.getElementById("biz_address_fk_alf_node_ref1").value;

		/*Regulatory Information*/
		var biz_localbody_app 		= $('input[name="biz_localbody_app"]:checked').val();
		var biz_id_alf_node_ref 	= document.getElementById("biz_id_alf_node_ref").value;	
		var biz_id_alf_node_ref1	= document.getElementById("biz_id_alf_node_ref1").value;	

		var biz_issued_by 	= document.getElementById("biz_issued_by").value;
		var biz_no 		= document.getElementById("biz_no").value;
		var biz_valid_upto 	= document.getElementById("biz_valid_upto").value;

		/*Sales and Expense information*/
		var brand_sale 		= document.getElementById("brand_sale").value;
		var nonbrand_sale 	= document.getElementById("nonbrand_sale").value;	
		var total_sale	 	= document.getElementById("total_sale").value;	
		var min_sale_day 	= document.getElementById("min_sale_day").value;

		var annual_household_income	= document.getElementById("annual_household_income").value;
		var annual_expenses 		= document.getElementById("annual_expenses").value;	
		var surplus_available 		= document.getElementById("surplus_available").value;

		/*************** Demographic Details ****************/
		/*Famil Details*/
		var marital_status	= document.getElementById("marital_status").value;
		var no_of_child_below17	= document.getElementById("no_of_child_below17").value;	
		var no_of_child_above17 = document.getElementById("no_of_child_above17").value;	
		var live_with 	 	= document.getElementById("live_with").value;	

		/*Education* /
		var self_education_id 	= document.getElementById("self_education_id").value;
		var father_education_id	= document.getElementById("father_education_id").value;	
		var mother_education_id = document.getElementById("mother_education_id").value;	
		var child_education_id 	= document.getElementById("child_education_id").value;		

		/*Occupation* /
		var self_occupation_id 		= document.getElementById("self_occupation_id").value;
		var father_occupation_id	= document.getElementById("father_occupation_id").value;	
		var mother_occupation_id 	= document.getElementById("mother_occupation_id").value;	
		var child_occupation_id 	= document.getElementById("child_occupation_id").value;		

		/*Transportation and communication and other assets*/
		var Transportation_communication_assets= [];
		for(var i=1; i <= data.mlcompositeArray[0]['memberAssetArray'].length; i++){

			var obj = {};
			if(document.getElementById("fk_member_asset_type_id_"+i+"")){
				var self_occupation_id 	= document.getElementById("fk_member_asset_type_id_"+i+"").value;
				if( self_occupation_id != ""){

					obj["member_asset_member_id"] 		= data.mlcompositeArray[0]['memberAssetArray'][i-1]["member_asset_member_id"];
					obj["member_asset_id"] 			= data.mlcompositeArray[0]['memberAssetArray'][i-1]["member_asset_id"];	

					obj["fk_member_asset_type_id"] 		= 1  ;
					obj["member_asset_category"] 		= '1';
					obj["member_asset_fk_last_modified_by"] = 1;
					obj["member_asset_fk_sci_client_id"] 	= 1;
					obj["member_asset_last_modified_date"] 	= currentDateValue;

					Transportation_communication_assets.push( obj );
				}
			}
		}

		/*Network Details*/
		var network_details= [];
		for(var i=1; i<=data.mlcompositeArray[0]['memberNetworkArray'].length;i++){

			var obj = {};
			if(document.getElementById("network_details_question_"+i+"")){
				var network_question = document.getElementById("network_details_question_"+i+"").value;
				var network_value    = document.getElementById("network_details_answer_"+i+"").value;
				if( (network_value  != "") && (network_question !="") ){

					obj["member_network_id"] 	   	   = data.mlcompositeArray[0]['memberNetworkArray'][i-1]["member_network_id"];
					obj["member_network_member_id"] 	   = data.mlcompositeArray[0]['memberNetworkArray'][i-1]["member_network_member_id"];

					obj["network_details_question"] 	   = 1;
					obj["network_details_answer"]   	   = 1;
					obj["member_network_fk_last_modified_by"]  = 1;
					obj["member_network_fk_sci_client_id"]     = 1;
					obj["member_network_last_modified_date"]   = currentDateValue;
					network_details.push( obj );
				}
			}
		}

		/*Staff Information*/
		var staff_details=[];	
		for(var i=1; i <= data.mlcompositeArray[0]['businessStaffArray'].length;i++){
			var obj = {};
			if(document.getElementById("fk_biz_staff_rel_type_id_"+i+"")){
				var staffVal = document.getElementById("fk_biz_staff_rel_type_id_"+i+"").value;
				var jobVal   = document.getElementById("biz_staff_work_hour_"+i+"").value;

				if( (staffVal  != "") && (jobVal !="") ){

					obj["biz_staff_id"] 	   		= data.mlcompositeArray[0]['businessStaffArray'][i-1]["biz_staff_id"];// 1;biz_staff_id
					obj["biz_staff_member_id"] 	   	= data.mlcompositeArray[0]['businessStaffArray'][i-1]["biz_staff_member_id"];//1;
					obj["fk_biz_staff_rel_type_id"]    	= parseInt(staffVal);//1
					obj["biz_staff_work_hour"]   	   	= jobVal;
					obj["biz_staff_fk_last_modified_by"]  	= 1;
					obj["biz_staff_fk_sci_client_id"]  	= 1;
					obj["biz_staff_last_modified_date"]   	= currentDateValue;

					staff_details.push( obj );
				}
			}
		}

		/*Family Information*/
		var family_details=[];	
		for(var i=1; i <= data.mlcompositeArray[0]['memberFamilyArray'].length;i++){
			var obj = {};
			if(document.getElementById("fk_family_member_education_type_id_"+i+"")){
				var education 	= document.getElementById("fk_family_member_education_type_id_"+i+"").value;
				var occupation  = document.getElementById("family_member_employment_type_"+i+"").value;

				obj["member_family_memberid"]			= data.mlcompositeArray[0]['memberFamilyArray'][i-1]["member_family_memberid"];
				obj["member_family_id"]				= data.mlcompositeArray[0]['memberFamilyArray'][i-1]["member_family_id"];
				obj["family_member_name"]			= masterRelationArrayDic[i];/*Family*/
				obj["fk_family_member_relationship_type_id"]	= parseInt(i);	
				obj["family_member_employment_type"]		= occupation;
				obj["fk_family_member_education_type_id"]	= parseInt(education);
				obj["member_family_fk_last_modified_by"]	= 1;
				obj["member_family_last_modified_date"]		= currentDateValue;
				obj["member_family_sci_client_id"]		= 1;

				family_details.push( obj );
			}
		}

		var remarks = document.getElementById('comments').value;
		var LoanId = processObj.LoanId.value;
		var MemberId = processObj.MemberId.value;

		var dataObj = {

			"memberid"			: data.mlcompositeArray[0]['memberid'],
			"loanid"			: data.mlcompositeArray[0]['loanid'],

			"firstname"			: firstname,
			"middlename"			: middlename,
			"lastname"			: lastname,
			"mobile_number" 		: parseInt(mobile_number),

			"gender"			: gender,
			"dob"				: dob,
			"age"				: parseInt(age),
			"father_name"			: father_name,
			"spouse_name"			: spouse_name,

			"current_door_no"		: doorNo,
			"current_street_name"		: streetName,
			"current_location_name"		: locationName,
			"fk_curr_village_or_town_id"	: parseInt(city_town),//parseInt(1) ,// 
			"current_state"			: parseInt(state),
			"current_district"		: parseInt(district),
			"current_taluk"			: parseInt(taluk),						
			"current_pincode"		: parseInt(pincode),

			/*"id_proof_type"		: parseInt(proofType),
			"id_proof_no"			: parseInt(proofNo),
			"alf_node_ref"			: alf_node_ref_img_1,
			"alf_node_ref1"			: alf_node_ref_img_2,*/

			"fk_current_address_proof_type_id"	: parseInt(fk_current_address_proof_type_id),//address_proof_type,
			"current_document_value"		: current_document_value,
			"current_document_url"			: current_document_url,
			"current_address_fk_alf_node_ref"	: current_address_fk_alf_node_ref,		

			"id1_name_as_per_bank_records"	: id1_name_as_per_bank_records,
			"id1_bank_name"			: id1_bank_name,
		 	"id1_bank_account_number"	: id1_bank_account_number,
			"id1_bank_ifsc_code"		: id1_bank_ifsc_code,

			"member_bank_fk_alf_node_ref"	: member_bank_fk_alf_node_ref,
			"member_bank_fk_alf_node_ref1"	: member_bank_fk_alf_node_ref1,

			"fk_purpose_id"			: parseInt(fk_purpose_id),
			"fk_product_id_loan"		: parseInt(fk_product_id_loan),
			"application_loan_amount"	: parseFloat(application_loan_amount),
			"ml_fk_alf_node_ref"		: ml_fk_alf_node_ref,

			"biz_nature"			: biz_nature,
			"biz_no_of_yrs"			: parseInt(biz_no_of_yrs),
			"biz_location"			: biz_location,
			"rent_pay_month"		: parseFloat(rent_pay_month),

			"biz_door_no"			: biz_door_no,
			"biz_street_name"		: biz_street_name,
			"biz_location_name"		: biz_location_name,
			"fk_biz_village_or_town"	: parseInt(fk_biz_village_or_town),

			"biz_state"			: parseInt(biz_state),
			"biz_district"			: parseInt(biz_district),
			"biz_taluk"			: parseInt(biz_taluk),
			"biz_pincode"			: parseInt(biz_pincode),
			
			"biz_office_address_landline_number"	: parseInt(biz_office_address_landline_number),
			"biz_office_address_mobile_number"	: parseInt(biz_office_address_mobile_number),

			"biz_address_fk_alf_node_ref"	: biz_address_fk_alf_node_ref,
			"biz_address_fk_alf_node_ref1"	: biz_address_fk_alf_node_ref1,

			"biz_localbody_app"		: biz_localbody_app,
			"biz_id_alf_node_ref"		: biz_id_alf_node_ref,
			"biz_id_alf_node_ref1"		: biz_id_alf_node_ref1,

			"biz_issued_by"			: biz_issued_by,
			"biz_no"			: biz_no,
			"biz_valid_upto"		: biz_valid_upto,

			"brand_sale"			: parseFloat(brand_sale),
			"nonbrand_sale"			: parseFloat(nonbrand_sale),
			"total_sale"			: parseFloat(total_sale),
			"min_sale_day"			: parseFloat(min_sale_day),

			"annual_household_income"	: parseFloat(annual_household_income),
			"annual_expenses"		: parseFloat(annual_expenses),
			"surplus_available"		: parseFloat(surplus_available),

			"marital_status"		: marital_status,
			"no_of_child_below17"		: no_of_child_below17,
			"no_of_child_above17"		: no_of_child_above17,
			"live_with"			: live_with,

			"self_education_id"		: 1,
			"father_education_id"		: 1,
			"mother_education_id"		: 1,
			"child_education_id"		: 1,

			"self_occupation_id"		: 1,
			"father_occupation_id"		: 1,
			"mother_occupation_id"		: 1,
			"child_occupation_id"		: 1,
	
			"businessStaffArray"		: staff_details,
			"memberAssetArray"		: Transportation_communication_assets,
			"memberNetworkArray"		: network_details,
			"memberFamilyArray"		: family_details,

			"fk_channel_partner_id"			:1,
			"fk_product_id"				:1,
			"last_modified_date"			:currentDateValue,
			"fk_last_modified_by"			:1, 
			"fk_sci_client_id"			:1,
			"member_bank_last_modified_date"	:currentDateValue,
			"member_bank_fk_last_modified_by" 	:1,
			"member_bank_fk_sci_client_id"		:1,
			"biz_details_last_modified_by"		:1,
			"biz_details_last_modified_date"	:currentDateValue,
			"biz_details_fk_sci_client_id"		:1,
			"permanent_address_fk_last_modified_by"	:1,
			"permanent_address_last_modified_date"	:currentDateValue,
			"permanent_address_fk_sci_client_id"	:1,
			"current_address_fk_last_modified_by"	:1,
			"current_address_last_modified_date"	:currentDateValue,
			"current_address_sci_client_id"		:1,
			"biz_address_fk_last_modified_by"	:1,
			"biz_address_last_modified_date"	:currentDateValue,
			"biz_address_fk_sci_client_id"		:1,

			/*"memberFamilyArray":[{
				"member_family_fk_last_modified_by"	:1,
				"member_family_last_modified_date"	:currentDateValue,
				"member_family_sci_client_id"		:1,
				}],*/

			"idProofArray":[{
				"id_proof_id"				:data.mlcompositeArray[0]['idProofArray'][0]['id_proof_id'],
				"id_proof_fk_last_modified_by"		:1,
				"id_proof_last_modified_date"		:currentDateValue,
				"id_proof_fk_sci_client_id"		:1,
				"id_proof_type"				: id_proof_type,
				"fk_id_proof_type_id"			: parseInt(fk_id_proof_type_id),
				"alf_node_ref"				: alf_node_ref_img_1,
				"alf_node_ref1"				: alf_node_ref_img_2,
				}],

			"mlValidationArray":[{
					"validation_member_id" 	: parseInt(MemberId),
					"validation_loan_id" 	: parseInt(LoanId),
					"validation_type" 	: parseInt(1),
					"validation_level"	: parseInt(1),
					"validation_status" 	: parseInt(1),
					"remarks" 		: remarks, 
					"process_id" 		: processid,
					"task_id" 		: taskid,
					"validation_fk_last_modified_by": 1,//parseInt(userid),/*USERNAME REPLACE*/
					"validation_last_modified_date"	: currentDateValue,
					"validation_fk_sci_client_id"	: parseInt(1)
				}],
			/*"businessStaffArray":[{
				"biz_staff_fk_last_modified_by"		:1,
				"biz_staff_last_modified_date"		:JSON.stringify(currentDateValue),
				"biz_staff_fk_sci_client_id"		:1,
				}],*/
	
			/*"memberAssetArray":[{
				"member_asset_fk_last_modified_by"	:1,
				"member_asset_last_modified_date"	:currentDateValue,
				"member_asset_fk_sci_client_id"		:1,
				}],*/

			/*"memberNetworkArray":[{
				"member_network_fk_last_modified_by"	:1,
				"member_network_last_modified_date"	:currentDateValue,
				"member_network_fk_sci_client_id"	:1,
				}],*/
	
			"fk_product_id_loan"			:1,                 
			"fk_member_id"				:data.mlcompositeArray[0]['memberid'],                
			"fk_purpose_id"				:1,                
			"fk_last_modified_by_loan"		:1,                 
			"last_modified_date_loan"		:currentDateValue,                 
			"fk_sci_client_id_loan"			:1,  

			"biz_income_last_modified_date"		:currentDateValue,
			"biz_income_fk_last_modified_by"	:1,
			"biz_income_fk_sci_client_id"		:1,
	
		};

		var dataArr = {
				"mlcompositeArray": [	dataObj	    ]
			};

		var biz_data = new FormData();

		/*Business Address proof 1*/
		jQuery.each(jQuery('#biz_id_alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-1', file);
		});
		/*Business Address proof 2*/
		jQuery.each(jQuery('#biz_id_alf_node_ref1_img')[0].files, function(i, file) {
		    biz_data.append('file-2', file);
		});
		/*Business Address proof 3*/
		jQuery.each(jQuery('#biz_address_fk_alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-3', file);
		});
		/*Business Address proof 4*/
		jQuery.each(jQuery('#biz_address_fk_alf_node_ref1_img')[0].files, function(i, file) {
		    biz_data.append('file-4', file);
		});
		/*ID PROOF*/
		jQuery.each(jQuery('#alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-5', file);
		});
		/*ID PROOF*/
		jQuery.each(jQuery('#alf_node_ref1_img')[0].files, function(i, file) {
		    biz_data.append('file-6', file);
		});
		/*ADDRESS PROOF*/
		jQuery.each(jQuery('#current_document_url_img')[0].files, function(i, file) {
		    biz_data.append('file-7', file);
		});
		/*ADDRESS PROOF*/
		jQuery.each(jQuery('#current_address_fk_alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-8', file);
		});
		/*BANK PASSBOOK PROOF*/
		jQuery.each(jQuery('#member_bank_fk_alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-9', file);
		});
		/*BANK PASSBOOK PROOF*/
		jQuery.each(jQuery('#member_bank_fk_alf_node_ref1_img')[0].files, function(i, file) {
		    biz_data.append('file-10', file);
		});
		/*LOAN PROOF*/
		jQuery.each(jQuery('#ml_fk_alf_node_ref_img')[0].files, function(i, file) {
		    biz_data.append('file-11', file);
		});

		/*JSON data for AVRO form*/
		biz_data.append('form_data' , JSON.stringify(dataArr) );
	
		var opts = {
		    url: '/submitForm/submitFormUpdate',
		    data: biz_data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    success: function(data){
			console.log(data);
			var cmmts = document.getElementById('comments').value;

			if(statusKey == "KALoanDoc_Upload_Status"){
				var processupdate = {"variables": {
						"KALoanDoc_Upload_Status" : {
							"value" : ""+d+"", 
							"type": "String"
						},
						"Application_Remarks" : {
							"value" : cmmts, 
							"type": "String"
						}
					}};

			} else if(statusKey == "LoanDoc_Verify_Status"){
				var processupdate = {"variables": {
							"LoanDoc_Verify_Status" : {
								"value" : ""+d+"", 
								"type": "String"
							},
							"Application_Remarks" : {
								"value" : cmmts, 
								"type": "String"
							}
						}};
			}else{
				var processupdate = {"variables": {
							"Application_Status" : {
								"value" : ""+d+"", 
								"type": "String"
							},
							"Application_Remarks" : {
								"value" : cmmts, 
								"type": "String"
							}
						}};
			}

			var dataObj = {};

			dataObj['process'] = processupdate;
			dataObj['processid'] = processid;
			dataObj['taskid'] = taskid;

			$.ajax({
				url: '/updateReworktaskprocess/'+d+'',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if(data.message == "Successful"){
						window.location='/tasks/';
					}else{
						alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
					}
				},
				data: JSON.stringify(dataObj)
			});			
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
}
