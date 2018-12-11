
window.onload = function(){
	//$("#left-pane-my-task").css('display', 'block');	

	if(screenHeight){
		var height = screenHeight*(0.9);
		var slipHeight = height/3;
		//document.getElementById('left-pane-task').style.minHeight  = (slipHeight*2 + 81)+'px';
		//document.getElementById('left-pane-task').style.maxHeight  = (slipHeight*2 + 81)+'px';

		//document.getElementById('right-pane-task').style.minHeight = (slipHeight*2 + 81)+'px';
		//document.getElementById('right-pane-task').style.maxHeight = (slipHeight*2 + 81)+'px';
		$('body').height((height*(0.9)));
		$('.task-div').height((height*(0.9)));
		$('.main-task').height((height*(0.9)));
		$('#right-pane-task').height((height*(0.9)));
		$('#right-pane-task-detail').height((height*(0.82)));

		//document.getElementById('right-pane-task').style.overflowY = 'auto';
		document.getElementById('right-pane-task-detail').style.overflowY = 'auto';
	}

	//transportation_information //Assets
	$('.transportation_information').append('<option value="">   Select Information  </option>');
	for(var i = 0; i< Object.keys(Assets).length; i++){
		$('.transportation_information').append('<option value="'+(i+1)+'">'+Assets[(i+1)]+'</option>');
	}
	
	//Network Information of the member:
	$('.network_details_question').append('<option value="">   Select Question </option>');
	for(var i = 0; i< Object.keys(networkQuestion).length; i++){
		$('.network_details_question').append('<option value="'+(i+1)+'">'+networkQuestion[(i+1)]+'</option>');
	}

	//Network Information of the member:
	$('.network_details_answer').append('<option value="">   Select Answer </option>');
	for(var i = 0; i<Object.keys(kilometer).length; i++){
		$('.network_details_answer').append('<option value="'+(i+1)+'">'+kilometer[Object.keys(kilometer)[i]]+'</option>');
	}

	//staffInfo:
	$('.fk_biz_staff_rel_type').append('<option value="">   Select  </option>');
	for(var i = 0; i < Object.keys(staffInformation).length ; i++){
		$('.fk_biz_staff_rel_type').append('<option value="'+(i+1)+'">'+staffInformation[(i+1)]+'</option>');
	}

	//jobs:
	$('.biz_staff_work_hour').append('<option value="">   Select Jobs </option>');
	for(var i = 0; i < Object.keys(jobs).length ; i++){
		$('.biz_staff_work_hour').append('<option value="'+(i+1)+'">'+jobs[(i+1)]+'</option>');
	}
	//marital
	for(var i = 0; i < Object.keys(marital).length ; i++){
		$('.marital_status').append('<option value="'+(i+1)+'">'+marital[(i+1)]+'</option>');
	}

	//education:
	$('.education').append('<option value="">   Select Education </option>');
	for(var i = 0; i < Object.keys(education).length ; i++){
		$('.education').append('<option value="'+(i+1)+'" >'+education[(i+1)]+'</option>');
	}

	//occupation:
	$('.occupation').append('<option value="">   Select Occupation </option>');
	for(var i = 0; i<Object.keys(occupationDetails).length; i++){
		$('.occupation').append('<option value="'+(i+1)+'" >'+occupationDetails[(i+1)]+'</option>');
	}

	var keyFields = Object.keys(data.mlcompositeArray[0]);
	var arrayKeys = [ 'memberAssetArray', 'memberNetworkArray', 'idProofArray', 'businessStaffArray','memberFamilyArray' ];
	//var imgFiles = ['member_bank_fk_alf_node_ref','member_bank_fk_alf_node_ref1','biz_address_fk_alf_file_name','biz_address_fk_alf_file_name1',
	//		'biz_address_fk_alf_node_name', 'biz_address_fk_alf_node_name1', 'alf_node_ref', 'alf_node_ref1', 'address_img_1'];

	var imgFiles = ['member_bank_fk_alf_node_ref','member_bank_fk_alf_node_ref1','biz_address_fk_alf_node_ref','biz_address_fk_alf_node_ref1',
			'biz_id_alf_node_ref', 'biz_id_alf_node_ref1', 'alf_node_ref', 'alf_node_ref1', 'current_address_fk_alf_node_ref','current_document_url' ];

	for(var i = 0; i<keyFields.length;i++){
		if(($.inArray(keyFields[i], arrayKeys) == -1)){// && ($.inArray(keyFields[i], imgFiles) == -1)
			if(document.getElementById(''+keyFields[i]+'')){
				if( data.mlcompositeArray[0][keyFields[i]]  ||  (data.mlcompositeArray[0][keyFields[i]]==0) ){
					$("#"+keyFields[i]+" select").val(data.mlcompositeArray[0][keyFields[i]]);
					document.getElementById(''+keyFields[i]+'').value = data.mlcompositeArray[0][keyFields[i]];	
				}
			}
		}
	}

	var objData = data.mlcompositeArray[0];
	for(var i = 0; i<arrayKeys.length;i++){
		if(objData[arrayKeys[i]]){
			for(var j = 0; j<objData[arrayKeys[i]].length; j++){
				var data_select = data.mlcompositeArray[0][arrayKeys[i]][j];
				var objKeys = Object.keys(data.mlcompositeArray[0][arrayKeys[i]][j]);
				for( var k = 0; k < objKeys.length ; k++ ){
					if( data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] || (data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] == 0) ){
						if(document.getElementById(objKeys[k]+'_'+(j+1))){
							$("#"+objKeys[k]+"_"+(j+1)+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
							document.getElementById(''+objKeys[k]+"_"+(j+1)+'').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
						}
						if(document.getElementById(''+objKeys[k] +'')){ 
							$("#"+objKeys[k]+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
							document.getElementById(''+objKeys[k]+'').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
						}				
					}
				}
			}
		}
	}
}   

/*******Image to Show on File browser*******/
function readURL(input, id) {
	if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    
	    reader.onload = function (e) {
		$('#'+id+'').attr('src', e.target.result);
	    }
	    
	    reader.readAsDataURL(input.files[0]);
	}
}

	/*$(".img_upload1").change(function(){
		readURL(this, 'shopImg_1');
	});

	$(".img_upload2").change(function(){
		readURL(this, 'shopImg_2');
	});

	$(".img_upload3").change(function(){
		readURL(this, 'shopImg_3');
	});

	$(".img_upload4 ").change(function(){
		readURL(this, 'shopImg_4');
	});*/

	/*id proof img*/
	$("#alf_node_ref_img").change(function(){
		document.getElementById('alf_node_ref').value = this.value;
	});
	$("#alf_node_ref1_img").change(function(){
		document.getElementById('alf_node_ref1').value = this.value;
	});
		
	/*Address proof Img*/	
	$("#current_document_url_img").change(function(){
		document.getElementById('current_document_url').value = this.value;
	});
	$("#current_address_fk_alf_node_ref_img").change(function(){
		document.getElementById('current_address_fk_alf_node_ref').value = this.value;
	});

	/*Bank Pass book Img*/	
	$("#member_bank_fk_alf_node_ref_img").change(function(){
		document.getElementById('member_bank_fk_alf_node_ref').value = this.value;
	});
	$("#member_bank_fk_alf_node_ref1_img").change(function(){
		document.getElementById('member_bank_fk_alf_node_ref1').value = this.value;
	});


	/*BUSINESS PASSBOOK PROOF*/
	$("#biz_id_alf_node_ref_img").change(function(){
		document.getElementById('biz_id_alf_node_ref').value = this.value;
	});
	$("#biz_id_alf_node_ref1_img").change(function(){
		document.getElementById('biz_id_alf_node_ref1').value = this.value;
	});

	/*BUSINESS PASSBOOK PROOF*/
	$("#biz_address_fk_alf_node_ref_img").change(function(){
		document.getElementById('biz_address_fk_alf_node_ref').value = this.value;
	});
	$("#biz_address_fk_alf_node_ref1_img").change(function(){
		document.getElementById('biz_address_fk_alf_node_ref1').value = this.value;
	});



/****************/

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

function changeForms(d){
	$('.label-text.active').attr("class","label-text");
	$('#label-text'+d).attr("class","label-text active");
}

function isInt(n){
	return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
	return n === Number(n) && n % 1 !== 0;
}

var avroObj = {};

function submitForm(){
	console.log('submitForm');
	var url = "/submit/";

	var currentDateValue  = (new Date());
	currentDateValue = JSON.stringify(currentDateValue);
	currentDateValue = currentDateValue.replace(/"/g,'');

	var validation =0;

	for(var i=0; i<stringValidate.length; i++ ){
		if(document.getElementById(""+stringValidate[i]+"")){
			if(document.getElementById(""+stringValidate[i]+"").value == ""){
				$("#"+stringValidate[i]+"").css('background-color','yellow');
				$("#"+stringValidate[i]+"").css('color','black');
				validation =1;
			}
		}
	}

	for(var i=0; i<intValidate.length; i++ ){
		if(document.getElementById(""+intValidate[i]+"")){

			if(/^[0-9]*$/.test(document.getElementById(""+intValidate[i]+"").value) == true){
			}else{
				$("#"+intValidate[i]+"").css('background-color','yellow');
				$("#"+intValidate[i]+"").css('color','black');
				validation =1;
			}
		}
	}

	for(var i=0; i<selectOptionValidate.length; i++ ){
		if(document.getElementById(""+selectOptionValidate[i]+"")){
			console.log('document.getElementById(""+selectOptionValidate[i]+"").value');
			console.log(selectOptionValidate[i]);
			console.log(document.getElementById(""+selectOptionValidate[i]+"").value);
			if(/^[0-9]*$/.test(document.getElementById(""+selectOptionValidate[i]+"").value) == true){
			}else{
				$("#"+selectOptionValidate[i]+"").css('background-color','yellow');
				$("#"+selectOptionValidate[i]+"").css('color','black');
				validation =1;
			}
		}
	}


	for(var i=0; i<floatValidate.length; i++ ){
		if(document.getElementById(""+floatValidate[i]+"")){
			if(isFloat(parseInt(document.getElementById(""+intValidate[i]+"").value))){
			}else{
				$("#"+floatValidate[i]+"").css('background-color','yellow');
				$("#"+floatValidate[i]+"").css('color','black');
				validation =1;
			}
		}
	}

	for(var i=0; i<radioValidate.length; i++ ){
		if($("input[name='"+radioValidate[i]+"']:checked").val()) {
		}else{
			$("#"+radioValidate[i]+"").css('background-color','yellow');
			$("#"+radioValidate[i]+"").css('color','black');
			validation =1;
		}
	}

	if(validation == 1){
		alert("Please Fill all the mandatory fields and Enter only numbers for numbered Fields");
		return false;
	}


	//return false;
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
	var fk_bank_account_type_id1   	 = document.getElementById("fk_bank_account_type_id1").value;	
	var id1_bank_account_number	 = document.getElementById("id1_bank_account_number").value;	
	var id1_bank_ifsc_code		 = document.getElementById("id1_bank_ifsc_code").value;	

	var member_bank_fk_alf_node_ref	 = document.getElementById("member_bank_fk_alf_node_ref").value;	
	var member_bank_fk_alf_node_ref1 = document.getElementById("member_bank_fk_alf_node_ref1").value;	

	/*Loan Information*/
	var fk_purpose_id 		 = document.getElementById("fk_purpose_id").value;	
	var fk_product_id_loan   	 = document.getElementById("fk_product_id_loan").value;	
	var application_loan_amount	 = document.getElementById("application_loan_amount").value;

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

	/*Transportation and communication and other assets*/
	var Transportation_communication_assets= [];
	//for(var i=1; i<33;i++){
	console.log("data.mlcompositeArray[0]['memberAssetArray'].length ----------->   ");	
	console.log(data.mlcompositeArray[0]['memberAssetArray'].length);	
	for(var i=1; i <= data.mlcompositeArray[0]['memberAssetArray'].length; i++){

		var obj = {};
		if(document.getElementById("fk_member_asset_type_id_"+i+"")){
			var self_occupation_id 	= document.getElementById("fk_member_asset_type_id_"+i+"").value;
			if( self_occupation_id != ""){
				obj["member_asset_member_id"] 		= 1;
				obj["fk_member_asset_type_id"] 		= 1;
				obj["member_asset_category"] 		= '1';
				obj["member_asset_fk_last_modified_by"] = 1;
				obj["member_asset_fk_sci_client_id"] 	= 1;
				obj["member_asset_last_modified_date"] 	= currentDateValue;
				//obj["member_asset_details_json"] 	= "";

				Transportation_communication_assets.push( obj );
			
			}
		}
	}

	/*Network Details*/
	var network_details= [];
	for(var i=1; i<6;i++){
		var obj = {};
		if(document.getElementById("network_details_question_"+i+"")){
			var network_question = document.getElementById("network_details_question_"+i+"").value;
			var network_value    = document.getElementById("network_details_answer_"+i+"").value;
			console.log('network_value');
			console.log(network_value);
			console.log(network_question);
			if( (network_value  != "") && (network_question !="") ){

				obj["member_network_member_id"] 	   = 1;
				obj["network_details_question"] 	   = 1;
				obj["network_details_answer"]   	   = 1;
				obj["member_network_fk_last_modified_by"]  = 1;
				obj["member_network_fk_sci_client_id"]     = 1;
				obj["member_network_last_modified_date"]   = currentDateValue;
				//obj["member_network_details_json"]         = "";
				network_details.push( obj );

			}
		}
	}

	/*Staff Information*/
	var staff_details=[];	
	for(var i=1; i<9;i++){
		var obj = {};
		if(document.getElementById("fk_biz_staff_rel_type_id_"+i+"")){
			var staffVal = document.getElementById("fk_biz_staff_rel_type_id_"+i+"").value;
			var jobVal   = document.getElementById("biz_staff_work_hour_"+i+"").value;

			if( (staffVal  != "") && (jobVal !="") ){

				obj["biz_staff_member_id"] 	   	= 1;
				obj["fk_biz_staff_rel_type_id"]    	= parseInt(staffVal);//1
				obj["biz_staff_work_hour"]   	   	= jobVal;
				obj["biz_staff_fk_last_modified_by"]  	= 1;
				obj["biz_staff_fk_sci_client_id"]  	= 1;
				obj["biz_staff_last_modified_date"]   	= currentDateValue;
				//obj["biz_staff_details_json"]         	= "";

				staff_details.push( obj );
			}
		}
	}

	/*Family Information*/
	var family_details=[];	
	for(var i=1; i<5;i++){
		var obj = {};
		if(document.getElementById("fk_family_member_education_type_id_"+i+"")){
			var education 	= document.getElementById("fk_family_member_education_type_id_"+i+"").value;
			var occupation  = document.getElementById("family_member_employment_type_"+i+"").value;

			//obj["member_family_memberid"]			= parseInt(i);
			//obj["family_member_name"]			= family[i];
			//obj["fk_family_member_relationship_type_id"]	= parseInt(i);	
			obj["family_member_employment_type"]		= occupation;
			obj["fk_family_member_education_type_id"]	= 1;//parseInt(education);
			obj["member_family_fk_last_modified_by"]	= 1;
			obj["member_family_last_modified_date"]		= currentDateValue;
			obj["member_family_sci_client_id"]		= 1;

			family_details.push( obj );
		}
	}

	var dataObj = {

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
		"fk_curr_village_or_town_id"	: parseInt(1) ,// city
		"current_state"			: state,
		"current_pincode"		: parseInt(pincode),

		"fk_current_address_proof_type_id"	: parseInt(1),//address_proof_type,
		"current_document_value"		: current_document_value,
		"current_document_url"			: current_document_url,
		"current_address_fk_alf_node_ref"	: current_address_fk_alf_node_ref,		

		"id1_name_as_per_bank_records"	: id1_name_as_per_bank_records,
		"fk_bank_account_type_id1"	: parseInt(fk_bank_account_type_id1),
	 	"id1_bank_account_number"	: id1_bank_account_number,
		"id1_bank_ifsc_code"		: id1_bank_ifsc_code,

		"member_bank_fk_alf_node_ref"	: member_bank_fk_alf_node_ref,
		"member_bank_fk_alf_node_ref1"	: member_bank_fk_alf_node_ref1,

		"fk_purpose_id"			: parseInt(fk_purpose_id),
		"fk_product_id_loan"		: parseInt(fk_product_id_loan),
		"application_loan_amount"	: parseFloat(application_loan_amount),


		"biz_nature"			: biz_nature,
		"biz_no_of_yrs"			: parseInt(biz_no_of_yrs),
		"biz_location"			: biz_location,
		"rent_pay_month"		: parseFloat(rent_pay_month),

		"biz_door_no"			: biz_door_no,
		"biz_street_name"		: biz_street_name,
		"biz_location_name"		: biz_location_name,
		"fk_biz_village_or_town"	: parseInt(fk_biz_village_or_town),

		"biz_state"			: biz_state,
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

		"idProofArray":[{
			"id_proof_fk_last_modified_by"		:1,
			"id_proof_last_modified_date"		:currentDateValue,
			"id_proof_fk_sci_client_id"		:1,
			"id_proof_type"				: id_proof_type,
			"fk_id_proof_type_id"			: parseInt(fk_id_proof_type_id),
			"alf_node_ref"				: alf_node_ref_img_1,
			"alf_node_ref1"				: alf_node_ref_img_2,
			}],

		"fk_product_id_loan"			:1,                 
		"fk_member_id"				:1,                 
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

	/*JSON data for AVRO form*/
	biz_data.append('form_data' , JSON.stringify(dataArr) );



	
	console.log("dataObj ---->>>>");
	console.log(dataObj);
	//console.log(JSON.stringify(dataArr));

	//return false;


	var opts = {
	    url: '/submitForm/submitFormAdd',
	    data: biz_data,
	    cache: false,
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    success: function(data){
		console.log(data);
		alert(data.message)
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
