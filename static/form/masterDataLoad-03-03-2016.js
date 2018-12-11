var avroObj = {};var data;

var masterAddressProofArrayDic 	   = {};
var masterIdProofArrayDic 	   = {};
var masterValidationLevelArrayDic  = {};
var masterEducationArrayDic	   = {};
var masterNetQuestionArrayDic	   = {};
var masterDistanceArrayDic	   = {};
var masterOccupationArrayDic	   = {};
var masterPurposeArrayDic	   = {}; 
var masterProcessRemarkArrayDic    = {};
var masterAssetArrayDic 	   = {};
var masterValidationTypeArrayDic   = {};
var masterCourierArrayDic	   = {};
var masterProductArrayDic	   = {};
var masterBankArrayDic		   = {};
var masterRelationArrayDic	   = {};	
var masterValidationStatusArrayDic = {};

var jobs = {
	'1':' Full Time ',
	'2':' Part Time ',
	};

var marital = {
	'1':' Married ',
	'2':' Single ',
	'3':' Divorced '
	};

var family = {			/*masterRelationArray*/
		'1':'Self',
		'2':'Father',
		'3':'Mother',	
		'4':'Child'
	};

var mandatory_array 	= ['firstname', 'lastname', 'father_name', 'gender', 'dob', 'age', 'mobile_number' ];
var business_mandatory 	= ['biz_nature','biz_no_of_yrs', 'biz_location', 'rent_pay_month', 'biz_door_no', 'biz_street_name', 'biz_location_name', 
				   'fk_biz_village_or_town','biz_state', 'biz_pincode','biz_office_address_landline_number','biz_office_address_mobile_number',
				   /*'biz_address_fk_alf_file_name','biz_address_fk_alf_file_name1',*/'biz_localbody_app',/*'biz_address_fk_alf_node_name','biz_address_fk_alf_node_name1',*/
				   'biz_issued_by','biz_no','biz_valid_upto','brand_sale','nonbrand_sale','total_sale','min_sale_day','annual_household_income','annual_expenses',
				   'surplus_available'];


var stringValidate	= ['firstname','father_name','dob','current_door_no','current_street_name','current_location_name','current_state',
				'current_pincode','id_proof_type','alf_node_ref','current_document_value','current_document_url','id1_name_as_per_bank_records',
				'id1_bank_account_number','id1_bank_ifsc_code','member_bank_fk_alf_node_ref','biz_nature','biz_location','biz_door_no','biz_street_name',
				'biz_location_name','biz_state','biz_address_fk_alf_node_ref','biz_id_alf_node_ref','biz_issued_by','biz_no','biz_valid_upto','marital_status',
				'family_member_employment_type_1','live_with', 'no_of_child_above17', 'no_of_child_below17'];

var intValidate   	= ['mobile_number','age','fk_curr_village_or_town_id','fk_id_proof_type_id','fk_current_address_proof_type_id','fk_bank_account_type_id1',
				'fk_purpose_id','fk_product_id_loan','biz_no_of_yrs','fk_biz_village_or_town','biz_pincode','biz_office_address_landline_number',
				'fk_family_member_education_type_id_1'];

var floatValidate 	= ['application_loan_amount','rent_pay_month'];

var radioValidate 	= ['gender','relation','biz_localbody_app'];
	
var selectOptionValidate= ['fk_family_member_education_type_id_1', 'marital_status'];

/*For reading data only*/
var selectionFields = ['fk_id_proof_type_id', 'fk_current_address_proof_type_id', 'fk_biz_staff_rel_type', 'fk_family_member_education_type_id', 
			'fk_member_asset_type_id', 'network_details_question', 'network_details_answer', 'family_member_employment_type',
			'marital_status', 'biz_staff_work_hour', 'fk_biz_staff_rel_type_id', 'fk_purpose_id', 'fk_product_id_loan', 'doc_courier_name',
			'chq_issue_bank_name', 'chq_courier_name', 'id1_bank_name'];

var selectionFieldMasters = {
	'fk_id_proof_type_id'			:masterIdProofArrayDic		, 
	'fk_current_address_proof_type_id'	:masterAddressProofArrayDic	,	 
	'fk_biz_staff_rel_type_id'		:masterRelationArrayDic		, 
	'fk_family_member_education_type_id'	:masterEducationArrayDic	, 
	'fk_member_asset_type_id'		:masterAssetArrayDic		, 
	'network_details_question'		:masterNetQuestionArrayDic	, 
	'network_details_answer'		:masterDistanceArrayDic		, 
	'family_member_employment_type'		:masterOccupationArrayDic	,
	'marital_status'			:marital		, 
	'biz_staff_work_hour'			:jobs			, 
	'fk_purpose_id'				:masterPurposeArrayDic	,
	'fk_product_id_loan'			:masterProductArrayDic	,
	'chq_issue_bank_name'			:masterBankArrayDic	,
	'id1_bank_name'				:masterBankArrayDic	,
	'doc_courier_name'			:masterCourierArrayDic  ,
	'chq_courier_name'			:masterCourierArrayDic  
};	
	
function masterDataLoad(){
	
	/*masterAddressProofArray*/
	for(var i = 0; i< masterData.masterAddressProofArray.length; i++){
		if(masterData.masterAddressProofArray[i].address_proof_id){
			var id   = masterData.masterAddressProofArray[i].address_proof_id;
			var name = masterData.masterAddressProofArray[i].address_proof_name;			
			masterAddressProofArrayDic[id] = name;
		}
	}
	
	/*masterIdProofArray*/
	for(var i = 0; i< masterData.masterIdProofArray.length; i++){
		if(masterData.masterIdProofArray[i].id_proof_id){
			var id   = masterData.masterIdProofArray[i].id_proof_id;
			var name = masterData.masterIdProofArray[i].id_proof_name;			
			masterIdProofArrayDic[id] = name;
		}
	}	

	/*masterValidationLevelArray*/
	for(var i = 0; i< masterData.masterValidationLevelArray.length; i++){
		if(masterData.masterValidationLevelArray[i].validation_level_id){
			var id   = masterData.masterValidationLevelArray[i].validation_level_id;
			var name = masterData.masterValidationLevelArray[i].validation_level_name;			
			masterValidationLevelArrayDic[id] = name;
		}
	}	

	/*masterEducationArray*/
	for(var i = 0; i< masterData.masterEducationArray.length; i++){
		if(masterData.masterEducationArray[i].education_id){
			var id   = masterData.masterEducationArray[i].education_id;
			var name = masterData.masterEducationArray[i].education_name;			
			masterEducationArrayDic[id] = name;
		}
	}

	/*masterNetQuestionArray*/
	for(var i = 0; i< masterData.masterNetQuestionArray.length; i++){
		if(masterData.masterNetQuestionArray[i].netquestion_id){
			var id   = masterData.masterNetQuestionArray[i].netquestion_id;
			var name = masterData.masterNetQuestionArray[i].netquestion_name;			
			masterNetQuestionArrayDic[id] = name;
		}
	}

	/*masterDistanceArray*/
	for(var i = 0; i< masterData.masterDistanceArray.length; i++){
		if(masterData.masterDistanceArray[i].distance_id){
			var id   = masterData.masterDistanceArray[i].distance_id;
			var name = masterData.masterDistanceArray[i].distance_in_km;			
			masterDistanceArrayDic[id] = name;
		}
	}	

	/*masterOccupationArray*/
	for(var i = 0; i< masterData.masterOccupationArray.length; i++){
		if(masterData.masterOccupationArray[i].occupation_id){
			var id   = masterData.masterOccupationArray[i].occupation_id;
			var name = masterData.masterOccupationArray[i].occupation_name;			
			masterOccupationArrayDic[id] = name;
		}
	}

	/*masterPurposeArray*/
	for(var i = 0; i< masterData.masterPurposeArray.length; i++){
		if(masterData.masterPurposeArray[i].purpose_id){
			var id   = masterData.masterPurposeArray[i].purpose_id;
			var name = masterData.masterPurposeArray[i].purpose_name;			
			masterPurposeArrayDic[id] = name;
		}
	}	

	/*masterProcessRemarkArray*/	
	for(var i = 0; i< masterData.masterProcessRemarkArray.length; i++){
		if(masterData.masterProcessRemarkArray[i].process_remark_id){
			var id   = masterData.masterProcessRemarkArray[i].process_remark_id;
			var name = masterData.masterProcessRemarkArray[i].process_remark_name;			
			masterProcessRemarkArrayDic[id] = name;
		}
	}	

	/*masterAssetArray*/	
	for(var i = 0; i< masterData.masterAssetArray.length; i++){
		if(masterData.masterAssetArray[i].asset_id){
			var id   = masterData.masterAssetArray[i].asset_id;
			var name = masterData.masterAssetArray[i].asset_name;			
			masterAssetArrayDic[id] = name;
		}
	}	

	/*masterValidationTypeArray*/
	for(var i = 0; i< masterData.masterValidationTypeArray.length; i++){
		if(masterData.masterValidationTypeArray[i].validation_type_id){
			var id   = masterData.masterValidationTypeArray[i].validation_type_id;
			var name = masterData.masterValidationTypeArray[i].validation_type_name;			
			masterValidationTypeArrayDic[id] = name;
		}
	}	

	/*masterCourierArray*/
	for(var i = 0; i< masterData.masterCourierArray.length; i++){
		if(masterData.masterCourierArray[i].courier_id){
			var id   = masterData.masterCourierArray[i].courier_id;
			var name = masterData.masterCourierArray[i].courier_name;			
			masterCourierArrayDic[id] = name;
		}
	}

	/*masterProductArray*/
	for(var i = 0; i< masterData.masterProductArray.length; i++){
		if(masterData.masterProductArray[i].product_id){
			var id   = masterData.masterProductArray[i].product_id;
			var name = masterData.masterProductArray[i].product_name;			
			masterProductArrayDic[id] = name;
		}
	}	

	/*masterBankArray*/
	for(var i = 0; i< masterData.masterBankArray.length; i++){
		if(masterData.masterBankArray[i].bank_id){
			var id   = masterData.masterBankArray[i].bank_id;
			var name = masterData.masterBankArray[i].bank_name;			
			masterBankArrayDic[id] = name;
		}
	}	
	
	/*masterRelationArray*/
	for(var i = 0; i< masterData.masterRelationArray.length; i++){
		if(masterData.masterRelationArray[i].relation_id){
			var id   = masterData.masterRelationArray[i].relation_id;
			var name = masterData.masterRelationArray[i].relation_name;			
			masterRelationArrayDic[id] = name;
		}
	}

	/*masterValidationStatusArray*/
	for(var i = 0; i< masterData.masterValidationStatusArray.length; i++){
		if(masterData.masterValidationStatusArray[i].validation_status_id){
			var id   = masterData.masterValidationStatusArray[i].validation_status_id;
			var name = masterData.masterValidationStatusArray[i].validation_status_name;			
			masterValidationStatusArrayDic[id] = name;
		}
	}	
}		

function setSelectOptionInForm(){
	
	//transportation_information 			//Assets 	/*masterAssetArrayDic*/
	$('.transportation_information').append('<option value="">   Select Information  </option>');
	for(var i = 0; i< Object.keys(masterAssetArrayDic).length; i++){		
		$('.transportation_information').append('<option value="'+(i+1)+'">'+masterAssetArrayDic[(i+1)]+'</option>');
	}
	
	//Network Information of the member:				/*masterNetQuestionArray*/
	$('.network_details_question').append('<option value="">   Select Question </option>');
	for(var i = 0; i< Object.keys(masterNetQuestionArrayDic).length; i++){
		$('.network_details_question').append('<option value="'+(i+1)+'">'+masterNetQuestionArrayDic[(i+1)]+'</option>');
	}

	//Network Information of the member:				/*masterDistanceArrayDic*/
	$('.network_details_answer').append('<option value="">   Select Answer </option>');
	for(var i = 0; i< Object.keys(masterDistanceArrayDic).length; i++){
		$('.network_details_answer').append('<option value="'+(i+1)+'">'+masterDistanceArrayDic[(i+1)]+'</option>');
	}

	//staffInfo:		/*masterRelationArrayDic*/
	$('.fk_biz_staff_rel_type').append('<option value="">   Select  </option>');
	for(var i = 0; i< Object.keys(masterRelationArrayDic).length; i++){
		$('.fk_biz_staff_rel_type').append('<option value="'+(i+1)+'">'+masterRelationArrayDic[(i+1)]+'</option>');
	}	

	//jobs:			//jobs
	$('.biz_staff_work_hour').append('<option value="" disabled>   Select Jobs </option>');
	for(var i = 0; i < Object.keys(jobs).length ; i++){
		$('.biz_staff_work_hour').append('<option value="'+(i+1)+'">'+jobs[(i+1)]+'</option>');
	}
	
	//marital		//marital
	for(var i = 0; i < Object.keys(marital).length ; i++){
		$('.marital_status').append('<option value="'+(i+1)+'">'+marital[(i+1)]+'</option>');
	}

	//education:		/*masterEducationArrayDic*/
	$('.education').append('<option value="">   Select Education </option>');
	for(var i = 0; i < Object.keys(masterEducationArrayDic).length ; i++){
		$('.education').append('<option value="'+(i+1)+'">'+masterEducationArrayDic[(i+1)]+'</option>');
	}		

	//occupation:		/*masterOccupationArrayDic*/
	$('.occupation').append('<option value="">   Select Occupation </option>');
	for(var i = 0; i < Object.keys(masterOccupationArrayDic).length ; i++){
		$('.occupation').append('<option value="'+(i+1)+'">'+masterOccupationArrayDic[(i+1)]+'</option>');
	}		

	//IdProof		/*masterIdProofArray: Account Type:*/
	$('.fk_id_proof_type_id').append('<option value="" disabled>   Select ID Proof </option>');
	for(var i = 0; i < Object.keys(masterIdProofArrayDic).length ; i++){
		$('.fk_id_proof_type_id').append('<option value="'+(i+1)+'">'+masterIdProofArrayDic[(i+1)]+'</option>');
	}

	//AddressProof 		/*masterAddressProofArray: Account Type:*/
	$('.fk_current_address_proof_type_id').append('<option value="" disabled>   Select Address Proof </option>');
	for(var i = 0; i < Object.keys(masterAddressProofArrayDic).length ; i++){
		$('.fk_current_address_proof_type_id').append('<option value="'+(i+1)+'">'+masterAddressProofArrayDic[(i+1)]+'</option>');
	}	
	
	/*Bank*/		/*masterBankArrayDic*/
	$('.bank_name').append('<option value="" disabled>   Select Bank </option>');
	var keyValueMasterBankArray = [];
	var keys = Object.keys(masterBankArrayDic);
	for(var i = 0; i < Object.keys(masterBankArrayDic).length ; i++){
		var obj={};
		obj['key'] = keys[i];
		obj['value']   = masterBankArrayDic[keys[i]];
		keyValueMasterBankArray.push(obj);
	}
	/*Sorted Bank Master Data*/
	keyValueMasterBankArray = keyValueMasterBankArray.sort(function(a, b){ var a1= a.value, b1= b.value;    if(a1== b1) return 0;    return a1> b1? 1: -1; })
	for(var i = 0; i < keyValueMasterBankArray.length ; i++){
		$('.bank_name').append('<option value="'+keyValueMasterBankArray[i].key+'">'+keyValueMasterBankArray[i].value+'</option>');
	}	
		/*for(var i = 0; i < Object.keys(masterBankArrayDic).length ; i++){
			$('.bank_name').append('<option value="'+(i+1)+'">'+masterBankArrayDic[(i+1)]+'</option>');
		}*/		
	
	
	/*Purpose*/		/*masterPurposeArrayDic*/
	$('.fk_purpose').append('<option value="" disabled>   Select Purpose </option>');
	for(var i = 0; i < Object.keys(masterPurposeArrayDic).length ; i++){
		$('.fk_purpose').append('<option value="'+(i+1)+'">'+masterPurposeArrayDic[(i+1)]+'</option>');
	}	
	
	/*masterProductArray*/	/*masterProductArrayDic*/
	$('.fk_product_id_loan').append('<option value="" disabled>   Select Product </option>');
	for(var i = 0; i < Object.keys(masterProductArrayDic).length ; i++){
		$('.fk_product_id_loan').append('<option value="'+(i+1)+'">'+masterProductArrayDic[(i+1)]+'</option>');
	}	
	
	/*masterCourierArrayDic*/
	$('.doc_courier_name').append('<option value="" disabled>   Select Courier </option>');
	for(var i = 0; i < Object.keys(masterCourierArrayDic).length ; i++){
		$('.doc_courier_name').append('<option value="'+(i+1)+'">'+masterCourierArrayDic[(i+1)]+'</option>');
	}
	$('.chq_courier_name').append('<option value="" disabled>   Select Courier </option>');
	for(var i = 0; i < Object.keys(masterCourierArrayDic).length ; i++){
		$('.chq_courier_name').append('<option value="'+(i+1)+'">'+masterCourierArrayDic[(i+1)]+'</option>');
	}
}
		
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

/*Image to Show on File browser*/
function readURL(input, id) {
	if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function (e) {
		$('#'+id+'').attr('src', e.target.result);
	    }
	    reader.readAsDataURL(input.files[0]);
	}
}

function imagePopUp(){
	/*ID proof*/
	$('.alf_node_ref_img').change(function(){
		readURL(this, 'alf_node_ref_img_pop');
	});
	$('.alf_node_ref1_img').change(function(){
		readURL(this, 'alf_node_ref1_img_pop');
	});

	/*Address proof*/
	$('.current_document_url_img').change(function(){
		readURL(this, 'current_document_url_img_pop');
	});
	$('.current_address_fk_alf_node_ref_img').change(function(){
		readURL(this, 'current_address_fk_alf_node_ref_img_pop');
	});

	/*Bank Address proof*/
	$('.member_bank_fk_alf_node_ref_img').change(function(){
		readURL(this, 'member_bank_fk_alf_node_ref_img_pop');
	});
	$('.member_bank_fk_alf_node_ref1_img').change(function(){
		readURL(this, 'member_bank_fk_alf_node_ref1_img_pop');
	});

	/*Business proof*/
	$('.biz_address_fk_alf_node_ref_img').change(function(){
		readURL(this, 'biz_address_fk_alf_node_ref_img_pop');
	});
	$('.biz_address_fk_alf_node_ref1_img').change(function(){
		readURL(this, 'biz_address_fk_alf_node_ref1_img_pop');
	});

	/*Business proof*/
	$('.biz_id_alf_node_ref_img').change(function(){
		readURL(this, 'biz_id_alf_node_ref_img_pop');
	});
	$('.biz_id_alf_node_ref1_img').change(function(){
		readURL(this, 'biz_id_alf_node_ref1_img_pop');
	});

	/*Loan Proof*/
	$('.ml_fk_alf_node_ref_img').change(function(){
		readURL(this, 'ml_fk_alf_node_ref_img_pop');
	});	


	/*id proof img*/
	$('#alf_node_ref_img').change(function(){
		document.getElementById('alf_node_ref').value = this.value;
	});
	$('#alf_node_ref1_img').change(function(){
		document.getElementById('alf_node_ref1').value = this.value;
	});
	
	/*Address proof Img*/	
	$('#current_document_url_img').change(function(){
		document.getElementById('current_document_url').value = this.value;
	});
	$('#current_address_fk_alf_node_ref_img').change(function(){
		document.getElementById('current_address_fk_alf_node_ref').value = this.value;
	});

	/*Bank Pass book Img*/	
	$('#member_bank_fk_alf_node_ref_img').change(function(){
		document.getElementById('member_bank_fk_alf_node_ref').value = this.value;
	});
	$('#member_bank_fk_alf_node_ref1_img').change(function(){
		document.getElementById('member_bank_fk_alf_node_ref1').value = this.value;
	});


	/*BUSINESS PASSBOOK PROOF*/
	$('#biz_id_alf_node_ref_img').change(function(){
		document.getElementById('biz_id_alf_node_ref').value = this.value;
	});
	$('#biz_id_alf_node_ref1_img').change(function(){
		document.getElementById('biz_id_alf_node_ref1').value = this.value;
	});

	/*BUSINESS PASSBOOK PROOF*/
	$("#biz_address_fk_alf_node_ref_img").change(function(){
		document.getElementById('biz_address_fk_alf_node_ref').value = this.value;
	});
	$("#biz_address_fk_alf_node_ref1_img").change(function(){
		document.getElementById('biz_address_fk_alf_node_ref1').value = this.value;
	});

	/*LOAN DOCUMENT ATTACHMENT*/
	$("#ml_fk_alf_node_ref_img").change(function(){
		document.getElementById('ml_fk_alf_node_ref').value = this.value;
	});


	/*POPUP IMAGES*/
	$(".file_img").on('click',function (){
	    var theSrc = $(this).attr('src');
	    showPopup(theSrc);
	});
	$("body").on('click', ".wrap", function(){
	    $(".popup").fadeOut();
	})
}

/*Image Show on click in popup*/
function showPopup(imgSrc) {
	if(imgSrc){ 	
    		var theImg = '<div class="wrap"><img src="'+imgSrc+'">'
			 +'<div style="padding-top:1%;">'
				+'<a href="javascript:void(0)" onclick="closePopUp();"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					+'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					      +'Close'
					+'</a>'
				    +'</div>'
			+'</div>';
    		$(".popup").empty().append(theImg).fadeIn();
	} else {
    		var theImg = '<div class="wrap"><label>No Image Added</label></div>';
	}	
}

function loadingMlCompositeData(){

	var keyFields = Object.keys(data.mlcompositeArray[0]);
	var arrayKeys = [ 'memberAssetArray', 'memberNetworkArray', 'idProofArray', 'businessStaffArray','memberFamilyArray' ];
	var imgFiles = ['member_bank_fk_alf_node_ref','member_bank_fk_alf_node_ref1','biz_address_fk_alf_node_ref','biz_address_fk_alf_node_ref1',
			'biz_id_alf_node_ref', 'biz_id_alf_node_ref1', 'alf_node_ref', 'alf_node_ref1', 'current_address_fk_alf_node_ref','current_document_url' ];

	for(var i = 0; i<keyFields.length;i++){
		if(($.inArray(keyFields[i], arrayKeys) == -1)){// && ($.inArray(keyFields[i], imgFiles) == -1)
			if(document.getElementById(''+keyFields[i]+'')){
				if( data.mlcompositeArray[0][keyFields[i]]  ||  (data.mlcompositeArray[0][keyFields[i]]==0) ){
					$("#"+keyFields[i]+" select").val(data.mlcompositeArray[0][keyFields[i]]);

					/*For IMages src*/
					if(document.getElementById(''+keyFields[i]+'_img_pop')){
						if(data.mlcompositeArray[0][keyFields[i]]){
							$('#'+keyFields[i]+'_img_pop').attr("src", "/static/"+data.mlcompositeArray[0][keyFields[i]])
						}
					}
					document.getElementById(''+keyFields[i]+'').value = data.mlcompositeArray[0][keyFields[i]];	
				}
			}
		}
	}

	var objData = data.mlcompositeArray[0];

	/*For Comments */
	var html='<label class="comment-user" >No Comments</label>'; 	
	if(objData['mlValidationArray']){
	    html='';	
	    for(var i=0;i<objData['mlValidationArray'].length; i++){
	    	var usernme = objData['mlValidationArray'][i]['validation_fk_last_modified_by'];
	    	var remarks = objData['mlValidationArray'][i]['remarks'];	
	    	var validation_last_modified_date = objData['mlValidationArray'][i]['validation_last_modified_date'];	
	    	 
		html +='<div id="comment-pane" class="comment-pane">'
			    +'<div class="comments-list-pane">'
				+'<label class="comment-user" ><i class="entypo-user"></i>'+usernme+'</label> <font class="comment-date"> '+validation_last_modified_date+' </font>'
				+'<div class="comment-comment">'+remarks+'</div>'
			    +'</div>'
			+'</div>';	    
	    }	
	}
	if(document.getElementById('comment-list-pane')){
		document.getElementById('comment-list-pane').innerHTML = html;	
	}

	/*For Loading Data */	
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

							/*For IMages src*/
							if(document.getElementById(''+objKeys[k]+"_"+(j+1)+'_img_pop')){
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]){	
									$('#'+objKeys[k]+"_"+(j+1)+'_img_pop').attr("src", "/static/"+data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								}
							}
						}
						if(document.getElementById(''+objKeys[k] +'')){ 
							$("#"+objKeys[k]+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
							document.getElementById(''+objKeys[k]+'').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];

							/*For IMages src*/
							if(document.getElementById(''+objKeys[k]+'_img_pop')){
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]){
									$('#'+objKeys[k]+'_img_pop').attr("src", "/static/"+data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								}
							}
						}				
					}
				}
			}
		}
	}
}
	
		
		
