var avroObj = {};
var data;

var jobs = {
	'1' : ' Full Time ',
	'2' : ' Part Time ',
	};

var marital = {
	'1' : ' Married ',
	'2' : ' Single ',
	'3' : ' Divorced '
	};
	
var state1 = {
	'TN': 'Tamil Nadu',
	'KA': 'Karanataka ',
	};	

var loanFilterDropdown = {
	'1' : 'Date',
	'2' : 'Week',
	'3' : 'Month'
};

var masterLiveWithArrayDic = {
	"1": " Parents",
	"2": " Family",
	"3": " Other Brothers/Sisters" 
	};
		
var masterBusinessLocationArrayDic = {
	"1" : "Own Property",
	"2" : "Leased/Rented Property"

	};
	
var masterDocumentTypeArrayDic = {
	"1" : "Association",
	"2" : "Corporation",
	"3" : "Licence"
};
var state = {
	"33" : "TAMIL NADU",
	"29" : "KARNATAKA",
	"34" : "PUDUCHERRY",
	"28" : "MAHARASHTRA",
	"32" : "KERALA"
};	
	
var masterResidenceTypeArrayDic ={
	"1" : "Own Property",
	"2" : "Leased/Rented Property"
};

var family = {			/*masterRelationArray*/
	'1' : 'Self',
	'2' : 'Father',
	'3' : 'Mother',	
	'4' : 'Child'
	};
	
var LoanAmountDict = {
	'10004'	 : 'VVL Retail 30K (9 months)',
	'10000'  : 'VVL Retail 50K (12 months)',
	'10001'  : 'VVL Retail 1L (12 months)',
	'10008'  : 'VVL Retail 100K (18 months)'
};

var mandatory_array 	= ['firstname', 'lastname', 'father_name', 'gender', 'dob', 'age', 'mobile_number_1','mobile_number_2' ];
var business_mandatory 	= ["biz_nature","biz_no_of_yrs", "biz_location", /*"rent_pay_month", */"biz_door_no", "biz_street_name", "biz_location_name", 
				   /*"fk_biz_village_or_town",*/"biz_state", "biz_pincode","biz_office_address_landline_number","biz_office_address_mobile_number",
				   /*"biz_address_fk_alf_file_name","biz_address_fk_alf_file_name1", *//*"biz_localbody_app" Taken out for a reason *//*,/*"biz_address_fk_alf_node_name","biz_address_fk_alf_node_name1",*/
				   /*"biz_issued_by","biz_no","biz_valid_upto",*/"brand_sale","nonbrand_sale","total_sale","min_sale_day","annual_household_income","annual_expenses",
				   "surplus_available",'current_pincode', 'biz_address_fk_alf_node_ref','biz_address_fk_alf_node_ref1'];


var stringValidate	= ['firstname','lastname','father_name','dob','current_door_no','current_street_name','current_location_name','current_state',
				/*'id_proof_type_1','alf_node_ref_1','current_document_value','current_document_url'*/,'id1_name_as_per_bank_records',
				'id1_bank_account_number','id1_bank_ifsc_code','member_bank_fk_alf_node_ref','biz_nature','biz_location','biz_door_no','biz_street_name',
				'biz_location_name','biz_state','biz_address_fk_alf_node_ref_1','biz_address_fk_alf_node_ref_2',/*'biz_id_alf_node_ref','biz_issued_by','biz_no','biz_valid_upto',*/'marital_status',
				/*'biz_id_alf_node_ref1'*/,'no_of_child_above17', 'no_of_child_below17',/*'alf_node_ref1_1','current_address_fk_alf_node_ref'*/];

var intValidate   	= ['mobile_number_1','mobile_number_2','age',/*'fk_curr_village_or_town_id',*/'fk_id_proof_type_id_1',/*'fk_current_address_proof_type_id'*/,'fk_bank_account_type_id1',
				'fk_purpose_id','fk_product_id_loan','biz_no_of_yrs',/*'fk_biz_village_or_town',*/'biz_pincode',
				'fk_family_member_education_type_id_1', 'biz_office_address_mobile_number', 'no_of_child_below17', 'no_of_child_above17',
				'brand_sale','nonbrand_sale', 'current_pincode','biz_office_address_mobile_number' ];

var floatValidate 	= ['application_loan_amount',/*'rent_pay_month',*/'total_sale', 'min_sale_day', 'annual_household_income', 'annual_expenses', 'surplus_available'];

var radioValidate 	= ['gender','relation','biz_localbody_app'];
	
	
var selectOptionValidate= [/*'fk_biz_village_or_town'*/,'current_state','biz_state',/*'fk_curr_village_or_town_id'*/,'fk_id_proof_type_id_1',  'fk_biz_staff_rel_type', 'fk_family_member_education_type_id', 
			'network_details_question', 'network_details_answer', 'family_member_employment_type',
			'marital_status', 'biz_staff_work_hour', 'fk_biz_staff_rel_type_id', 'fk_purpose_id', 'fk_product_id_loan', 'doc_courier_name',
			'chq_issue_bank_name', 'chq_courier_name', 'id1_bank_name','fk_family_member_education_type_id_1'];

var file_inputs 	= ['member_bank_fk_alf_node_ref',/*'biz_id_alf_node_ref1',*/'member_bank_fk_alf_node_ref1',/*'alf_node_ref_1','current_document_url',*/'biz_address_fk_alf_node_ref_1','biz_address_fk_alf_node_ref_2',/*'biz_id_alf_node_ref','alf_node_ref1_1','current_address_fk_alf_node_ref'*/];

var checkBoxValidate = ['fk_member_asset_type_id'];

/*For reading data only*/
var selectionFields = ['fk_id_proof_type_id', 'fk_current_address_proof_type_id', 'fk_biz_staff_rel_type', 'fk_family_member_education_type_id', 
			/*'fk_member_asset_type_id',*/ 'network_details_question', 'network_details_answer', 'family_member_employment_type',
			'marital_status', 'biz_staff_work_hour', 'fk_biz_staff_rel_type_id', 'fk_purpose_id', 'fk_product_id_loan', 'doc_courier_name',
			'chq_issue_bank_name', 'chq_courier_name', 'id1_bank_name','live_with','biz_location','biz_type','application_loan_amount'];

var selectionFieldMasters = {
	'fk_id_proof_type_id'			: masterIdProofArrayDic		, 
	'fk_current_address_proof_type_id'	: masterAddressProofArrayDic	,	 
	'fk_biz_staff_rel_type_id'		: masterRelationArrayDic	, 
	'fk_family_member_education_type_id'	: masterEducationArrayDic	, 
	/*'fk_member_asset_type_id'		: masterAssetArrayDic		, */
	'network_details_question'		: masterNetQuestionArrayDic	, 
	'network_details_answer'		: masterDistanceArrayDic	, 
	'family_member_employment_type'		: masterOccupationArrayDic	,
	'marital_status'			: marital			, 
	'fk_purpose_id'				: masterPurposeArrayDic		,
	'fk_product_id_loan'			: masterProductArrayDic		,
	'chq_issue_bank_name'			: masterBankArrayDic		,
	'id1_bank_name'				: masterBankArrayDic		,
	'doc_courier_name'			: masterCourierArrayDic  	,
	'chq_courier_name'			: masterCourierArrayDic  	,
	'biz_staff_work_hour'			: jobs,
	
	'current_state'				: masterStateArrayDic		,
	'current_district'			: masterDistrictArrayDic	,
	'current_taluk'				: masterTalukArrayDic		,		
	'fk_curr_village_or_town_id'		: masterVillageArrayDic		,
	
	'biz_state'				: masterStateArrayDic		,
	'biz_district'				: masterDistrictArrayDic	,		
	'biz_taluk'				: masterTalukArrayDic		,
	'fk_biz_village_or_town'		: masterVillageArrayDic		,
	'live_with'				: masterLiveWithArrayDic,
	'biz_location'				: masterBusinessLocationArrayDic,
	'biz_type'				: masterDocumentTypeArrayDic,
	'current_address_location_name' : masterResidenceTypeArrayDic,
	'loanFilterDropdown'		: loanFilterDropdown,
	'application_loan_amount'	: LoanAmountDict
};	





function setSelectOptionInForm(){
	
	for(var i = 0; i< Object.keys(masterAssetArrayDic).length; i++){
		$("#transportation_information").append('<div class=colomn-div><input id=fk_member_asset_type_id_'+(i+1)+' style="width:10%;" type="checkbox" value="'+masterAssetArrayDic[(i+1)]+'">'+masterAssetArrayDic[i+1].toUpperCase()+'</input></div>');
	}
	
	
	$('.live_with').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(masterLiveWithArrayDic).length; i++){
		$('.live_with').append('<option value="'+(i+1)+'">'+masterLiveWithArrayDic[(i+1)]+'</option>');
	}
	
	$('.current_address_location_name').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(masterResidenceTypeArrayDic).length; i++){
		$('.current_address_location_name').append('<option value="'+(i+1)+'">'+masterResidenceTypeArrayDic[(i+1)]+'</option>');
	}
	
	$('.biz_location').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(masterBusinessLocationArrayDic).length; i++){
		$('.biz_location').append('<option value="'+(i+1)+'">'+masterBusinessLocationArrayDic[(i+1)]+'</option>');
	}
	
	$('.biz_type').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(masterDocumentTypeArrayDic).length; i++){
		$('.biz_type').append('<option value="'+(i+1)+'">'+masterDocumentTypeArrayDic[(i+1)]+'</option>');
	}
	
	$('.loanFilterDropdown').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(loanFilterDropdown).length; i++){
		$('.loanFilterDropdown').append('<option value="'+(i+1)+'">'+loanFilterDropdown[(i+1)]+'</option>');
	}
	/*$('.application_loan_amount').append('<option value="">   Select </option>');
	for(var i = 0; i< Object.keys(LoanAmountDict).length; i++){
		$('.application_loan_amount').append('<option value="'+Object.keys(LoanAmountDict)[(i)]+'">'+Object.keys(LoanAmountDict)[(i)]+'</option>');
	}*/
	
		//Network Information of the member:				/*masterNetQuestionArray*/
	$('.network_details_question').append('<option value="">   Select Question </option>');
	for(var i = 0; i< Object.keys(masterNetQuestionArrayDic).length; i++){
		$('.network_details_question').append('<option value="'+(i+1)+'">'+masterNetQuestionArrayDic[(i+1)]+'</option>');
	}

	//Network Information of the member:				/*masterDistanceArrayDic*/
	$('.network_details_answer').append('<option value="">   Select Answer </option>');
	for(var i = 0; i< Object.keys(masterDistanceArrayDic).length; i++){
		$('.network_details_answer').append('<option value=	"'+(i+1)+'">'+masterDistanceArrayDic[(i+1)]+'</option>');
	}

	//staffInfo:		/*masterRelationArrayDic*/
	$('.fk_biz_staff_rel_type').append('<option value="">   Select  </option>');
	for(var i = 0; i< Object.keys(masterRelationArrayDic).length; i++){
		$('.fk_biz_staff_rel_type').append('<option value="'+(i+1)+'">'+masterRelationArrayDic[(i+1)]+'</option>');
		$("select#fk_biz_staff_rel_type_id_"+(i+1)).val(i+1);
	}	

	//jobs:			//jobs
	$('.biz_staff_work_hour').append('<option value="" >   Select Jobs </option>');
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
	$('.fk_id_proof_type_id').append('<option value="" >   Select ID Proof </option>');
	for(var i = 0; i < Object.keys(masterIdProofArrayDic).length ; i++){
		$('.fk_id_proof_type_id').append('<option value="'+(i+1)+'">'+masterIdProofArrayDic[(i+1)]+'</option>');
		$("select#fk_id_proof_type_id_"+(i+1)).val(i+1);
	}

	//AddressProof 		/*masterAddressProofArray: Account Type:*/
	$('.fk_current_address_proof_type_id').append('<option value="0" >   Select Address Proof </option>');
	for(var i = 0; i < Object.keys(masterAddressProofArrayDic).length ; i++){
		$('.fk_current_address_proof_type_id').append('<option value="'+(i+1)+'">'+masterAddressProofArrayDic[(i+1)]+'</option>');
	}	
	
	/*Bank*/		/*masterBankArrayDic*/
	//BANK to sort by Names and then Appended in Select Box:
		$('.bank_name').append('<option value="" >   Select Bank </option>');
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
	
		$.each($('.bank_name option'), function(key, optionElement) {
   			 var curText = $(optionElement).text();
	 		 $(this).attr('title', curText);
			 var lengthToShortenTo = Math.round(parseInt('350px', 10) / 7.3);
	    		 if (curText.length > lengthToShortenTo) {
        			$(this).text(curText.substring(0,lengthToShortenTo)+'...');
    			 }
		});

		// Show full name in tooltip after choosing an option
		$('.bank_name').change(function() {
			$(this).attr('title', ($(this).find('option:eq('+$(this).get(0).selectedIndex +')').attr('title')));
		});
	
	/*Purpose*/		/*masterPurposeArrayDic*/
	$('.fk_purpose').append('<option value="" >   Select Purpose </option>');
	for(var i = 0; i < Object.keys(masterPurposeArrayDic).length ; i++){
		$('.fk_purpose').append('<option value="'+(i+1)+'">'+masterPurposeArrayDic[(i+1)]+'</option>');
	}	
	
	/*masterProductArray*/	/*masterProductArrayDic*/
	$('.fk_product_id_loan').append('<option value="" >   Select Product </option>');
	for(var i = 0; i < Object.keys(masterProductArrayDic).length ; i++){
		$('.fk_product_id_loan').append('<option value="'+(i+1)+'">'+masterProductArrayDic[(i+1)]+'</option>');
	}	
	/*masterCourierArrayDic*/
	$('.doc_courier_name').append('<option value="" >   Select Courier </option>');
	for(var i = 0; i < Object.keys(masterCourierArrayDic).length ; i++){
		$('.doc_courier_name').append('<option value="'+(i+1)+'">'+masterCourierArrayDic[(i+1)]+'</option>');
	}
	
	$('.chq_courier_name').append('<option value="Select Courier" selected>   Select Courier </option>');
	for(var i = 0; i < Object.keys(masterCourierArrayDic).length ; i++){
		$('.chq_courier_name').append('<option value="'+ Object.keys(masterCourierArrayDic)[(i)]+'">'+ Object.keys(masterCourierArrayDic)[(i)]+'</option>');
	}
	
	/*StateLoad*/
	$('.current_state').append('<option value="" >   Select State1 </option>');
	for(var i = 0; i < Object.keys(state).length ; i++){
		$('.current_state').append('<option value="'+(Object.keys(state)[i])+'">'+state[Object.keys(state)[i]]+'</option>');
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

/*Sorting Function*/
function compare(a,b) {
	if (a.key < b.key){
		return -1;
	}else if (a.key > b.key){
		return 1;
	}else {
		return 0;
	}
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
	/*$("body").on('click', ".wrap", function(event){
	    console.log(event);
	    console.log(event.target);
	    console.log(event.target['id']);
	    if(event.target['id'] =='cboxRight'){
		 return false;
	    }else if(event.target['id'] =='cboxLeft'){
		 return false;
	    }else{
		$(".popup").fadeOut();

	    }	
	   	
	     /*if (!$(event.target).closest('#menutop').length) {	
	    }* /
	    //$(".popup").fadeOut();
	})*/
}

/*Image Show on click in popup*/
function showPopup1(imgSrc) {	
	if(imgSrc){ 	
		var theImg = '<div class="wrap">'
	    			 +'<img src="'+imgSrc+'">'
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


/*Image Show on click in popup*/
function showPopup(imgSrc) {	
	if(imgSrc){ 	
		var theImg = '<div class="wrap" >'
	    			 +'<div id="wrap"><img src="'+imgSrc+'" id="cboxImg"></div>'
				 +'<br>'
				 +'<button id="plusLeft" style="width:30px;height: 28px;color: #b11b1b;padding:6px;"><i class="entypo-minus" style="width:30px;height: 28px;padding:0px;"></i></button>'
				 +'<button id="cboxLeft" style="width:30px;height: 28px;color: #b11b1b;padding:6px;"><i class="entypo-ccw" style="width:30px;height: 28px;padding:0px;"></i></button>'
				 +'<button id="cboxRight" style="width:30px;height: 28px;color: #b11b1b;padding:6px;"><i class="entypo-cw" style="width:30px;height: 28px;padding:0px;"></i></button>'
				 +'<button id="plustRight" style="width:30px;height: 28px;color: #b11b1b;padding:6px;"><i class="entypo-plus" style="width:30px;height: 28px;padding:0px;"></i></button>'
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

	var degreesRotate = 0;
    	$("#cboxRight").on('click', function (event) {
		event.stopPropagation();
        	degreesRotate+= 90;
        	$('#cboxImg').css('-ms-transform', 'rotate(' + degreesRotate+ 'deg)');
        	$('#cboxImg').css('-webkit-transform', 'rotate(' + degreesRotate+ 'deg)');
        	$('#cboxImg').css('transform', 'rotate(' + degreesRotate+ 'deg)');
		return false;
		//$(".popup").fadeIn();


    	});

    	$("#cboxLeft").on('click', function (event) {
		event.stopPropagation();

        	degreesRotate-= 90;
        	$('#cboxImg').css('-ms-transform', 'rotate(' + degreesRotate+ 'deg)');
        	$('#cboxImg').css('-webkit-transform', 'rotate(' + degreesRotate+ 'deg)');
        	$('#cboxImg').css('transform', 'rotate(' + degreesRotate+ 'deg)');
		return false;
		//$(".popup").fadeIn();

    	});

        $('#plusLeft').click(function(event){
		event.stopPropagation();
	        $('#cboxImg').width($('#cboxImg').width()/(1.5))
	        $('#cboxImg').height($('#cboxImg').height()/(1.5))
		return false;

	});

	$('#plustRight').click(function(event){
		event.stopPropagation();
	        $('#cboxImg').width($('#cboxImg').width()*(1.5))
	        $('#cboxImg').height($('#cboxImg').height()*(1.5))
		return false;
	});

	var lastScrollTop = 0;

	$('#wrap').bind('mousewheel',function(event) {
	    if (event.originalEvent.wheelDelta >= 0) {
	        console.log('Scroll up');
		event.stopPropagation();
	        $('#cboxImg').width($('#cboxImg').width()*(1.2))
	        $('#cboxImg').height($('#cboxImg').height()*(1.2))
		return false;

	    }
	    else {
	        console.log('Scroll down');
		event.stopPropagation();
	        $('#cboxImg').width($('#cboxImg').width()/(1.2))
	        $('#cboxImg').height($('#cboxImg').height()/(1.2))
		return false;
	    }
	});

	//wrapZoom() 

	$('#popup').click(function(){
   	    //$('#modal').show();
	    $('#popup').draggable();   
	});

	var screenHeight = $(window).height();
	var screenwidth = $(window).width();

	$("#wrap").css("width", screenwidth * (0.5));
	$("#wrap").css("height", screenHeight * (0.5));
	document.getElementById('wrap').style.overflow= 'auto';	

	/*var cboxImge = document.getElementById("cboxImg");

	cboxImge.addEventListener("mousedown", initialClick, false);*/

	$(".wrap").draggable();
	//$("#cboxImg").draggable();
	
	/*jQuery("#cboxImg").draggable({ 
	    cursor: "move", 
	    containment: "parent",
	    stop: function() {
	      //if(jQuery("#child").position().left < 1)
	          //jQuery("#child").css("left", "1220px");
	    }
	});*/
	//move();
}


function move(){


  var curDown = false,
      curYPos = 0,
      curXPos = 0;
  $("#wrap").mousemove(function(m){
    if(curDown === true){
     $("#wrap").scrollTop($(window).scrollTop() + (curYPos - m.pageY)); 
     $("#wrap").scrollLeft($(window).scrollLeft() + (curXPos - m.pageX));
    }
  });
  
  $("#wrap").mousedown(function(m){
    curDown = true;
    curYPos = m.pageY;
    curXPos = m.pageX;
  });
  
  $("#wrap").mouseup(function(){
    curDown = false;
  });

  
}



function wrapZoom() {
    var c = $('#wrap'), im = $('#cboxImg'), z = $('#cboxImg');
    var imageHeight = $('#cboxImg').height(),
        imageWidth = $('#cboxImg').width(),
        contWidth = c.width(),
        contHeight = c.height();
    var ratio = Math.min(contWidth * 0.9 / imageWidth, contHeight * 0.9 / imageHeight);
    im.css({
        'height': imageHeight * ratio + 'px',
        'width': imageWidth * ratio + 'px'
    });
    var currentScale = 1, currentLocation = {x: 180, y: 135}, mouseLocation = {x: 180, y: 135};
    var minZoom = 0.1, maxZoom = 10, zoomFactor = 0.2, moveSmooth = 0.2;
	
	
    //Increase moveSmooth for more moving intensity when zooming
    //When moveSmooth = 1, pointed point is centered at every mousewheel impulsion
    var zoomFactorInvertLog = 1 / Math.log(zoomFactor);
    c.on('mousewheel', function(e, delta) {
        var cOffset = c.offset();
        mouseLocation.x = e.pageX - cOffset.left;
        mouseLocation.y = e.pageY - cOffset.top;
        var newZoom = Math.max(minZoom, Math.min(maxZoom, currentScale * (1 + delta * zoomFactor)));
        var sliderVal = Math.log(newZoom) * zoomFactorInvertLog;
        if(slidInvert) sliderVal = slidMin + slidMax - sliderVal;
        //z.slider('value', sliderVal);
        zoom(newZoom);
    });
    var slidMin = Math.log(minZoom) * zoomFactorInvertLog, slidMax = Math.log(maxZoom) * zoomFactorInvertLog;
    var slidInvert = (slidMin > slidMax);
    /*z.slider({
    	orientation: 'vertical',
    	min: Math.min(slidMin, slidMax),
    	max: Math.max(slidMin, slidMax),
    	step: Math.abs(slidMin - slidMax) / 20,
    	value: slidMin + slidMax
    }).on('slide slidechange', function (event, ui) {
    	var v = slidInvert ? slidMin + slidMax - ui.value : ui.value;
    	var newZoom = Math.pow(zoomFactor, v);
    	zoom(newZoom);
    });*/

    function zoom(scale)
    {
        if(scale <= 1)
        {
            currentLocation.x = im.width() / 2;
        	currentLocation.y = im.height() / 2;
        }
        else
        {
            currentLocation.x += moveSmooth * (mouseLocation.x - currentLocation.x) / currentScale;
            currentLocation.y += moveSmooth * (mouseLocation.y - currentLocation.y) / currentScale;
        }
        var compat = ['-moz-', '-webkit-', '-o-', ''];
        var newCss = {};
        for(var i = compat.length - 1; i; i--)
        {
            newCss[compat[i]+'transform'] = 'scale('+scale+')';
            newCss[compat[i]+'transform-origin'] = currentLocation.x + 'px ' + currentLocation.y + 'px';
        }
        im.css(newCss);
        currentScale = scale;
    }
}

/*Calculate Years between two dates*/
function calcDate(date1,date2) {
	var diff   = Math.floor(date1.getTime() - date2.getTime());
	var day    = 1000 * 60 * 60 * 24;

	var days   = Math.floor(diff/day);
	var months = Math.floor(days/31);
	var years  = Math.floor(months/12);
	var message = years;

	return message
}

/*Age auto populate*/
function ageAutoPopulate(){

 	var dob = document.getElementById('dob').value;
    today = new Date()
	past  = new Date(dob) // remember this is equivalent to 06 01 2010

	document.getElementById('age').value = calcDate(today,past);
}

var current_state_id, 
    current_district_id, 
    current_taluk_id, 
    current_village_id, 
    current_pincode_id ;
    
var biz_state_id, 
    biz_district_id, 
    biz_taluk_id, 
    biz_village_id, 
    biz_pincode_id;

function loadingMlCompositeData(){
	st_id = 33;
	var keyFields = Object.keys(data.mlcompositeArray[0]);
	var arrayKeys = [ 'memberAssetArray',
			  'memberNetworkArray',
			  'idProofArray', 
			  'businessStaffArray',
			  'memberFamilyArray' ];
			  
	var imgFiles  = [ 'member_bank_fk_alf_node_ref',
			  'member_bank_fk_alf_node_ref1',
			  'biz_address_fk_alf_node_ref',
			  'biz_address_fk_alf_node_ref1',
			  'biz_id_alf_node_ref', 
			  'biz_id_alf_node_ref1', 
			  'alf_node_ref', 
			  'alf_node_ref1', 
			  'current_address_fk_alf_node_ref',
			  'current_document_url' ];

	if(keyFields.length > 0){
		current_state_id    = data.mlcompositeArray[0]['current_state'];
		current_district_id = data.mlcompositeArray[0]['current_district'];		
		current_taluk_id    = data.mlcompositeArray[0]['current_taluk'];				
		current_village_id  = data.mlcompositeArray[0]['fk_curr_village_or_town_id'];
		current_pincode_id  = data.mlcompositeArray[0]['current_pincode'];								
		
		biz_state_id        = data.mlcompositeArray[0]['biz_state'];
		biz_district_id     = data.mlcompositeArray[0]['biz_district'];		
		biz_taluk_id        = data.mlcompositeArray[0]['biz_taluk'];				
		biz_village_id      = data.mlcompositeArray[0]['fk_biz_village_or_town'];								
		biz_pincode_id      = data.mlcompositeArray[0]['biz_pincode'];										
	}

	if(current_state_id){

		/*District and Taluk */
		var url = "/masterLocation/";
		$.ajax({
		    url		:  url	,
		    type	: 'post',
		    dataType	: 'json',
		    success	: function (masterLocationData) {
		        /* Load Taluk Data */
			if( masterLocationData ){
		
			    districtAndTalukData = masterLocationData;	

		   	    document.getElementById('current_district').innerHTML 	    = "";	
		   	    document.getElementById('current_taluk').innerHTML 	  	    = "";	
		   	    document.getElementById('fk_curr_village_or_town_id').innerHTML = "";			   	    		   	    
		   	    		
			    masterLocationData	= masterLocationData 	
		    	    data 		= masterLocationData;	
		    	    ndx 		= crossfilter(data);	
		    	    all 		= ndx.groupAll();	
		    	    
		    	    districtDim = ndx.dimension(function (d) {
				return  d.district_name+'*'+d.district_code;
			    });
			    
			    $('.current_district').append('<option value ="" >   Select District </option>');
			    var districtData	= districtDim.group().top(Infinity);
			    districtData 	= districtData.sort(sortData);
			    			    
			    for(var i = 0; i< districtData.length; i++){
			    	var dist 	= (districtData[i]['key']);
			    	var distSplit 	= dist.split('*') 
			    	$('.current_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
			    }
			    
			    document.getElementById('current_district').value = current_district_id;

			    /* Load Taluk Data */
			    if(current_district_id){				    
			        filteredTalukData = districtDim.filter(name).top(Infinity); 

				talukndx  = crossfilter(filteredTalukData);		//--> set Taluk Values into cross filter
				talukDim  = talukndx.dimension(function (d) {		//--> Create Dimension for a taluk
				    return  d.taluk_name+'*'+d.taluk_code;
				});
		
				$('.current_taluk').append('<option value ="" >   Select Taluk </option>');
				var talukData	= talukDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
				talukData 	= talukData.sort(sortData);
			    			    
				for(var i = 0; i< talukData.length; i++){
			    		var taluk 	= (talukData[i]['key']);
			    		var talukSplit 	= taluk.split('*') 
			    		$('.current_taluk').append('<option value ="'+talukSplit[1]+'">'+talukSplit[0]+'</option>');
				}
				document.getElementById('current_taluk').value = current_taluk_id;
				
				/* Load Village Data */
				if(current_taluk_id){
				
					var url = "/villageDetails/";
	
					$.ajax({
					    url		:  url	,
					    type	: 'post',
					    dataType	: 'json',
					    success	: function (villageData) {
						if( villageData ){
					    	    data 	= villageData;	
					    	    villageNDX 	= crossfilter(villageData);	
						    villageDim 	= villageNDX.dimension(function (d) {		//--> Create Dimension for a taluk
						    	return  d.village_name+'*'+d.village_code;
						    });
	
						    $('.fk_curr_village_or_town_id').append('<option value = "" >   Select Village </option>');
						    var villageData	= villageDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
						    villageData		= villageData.sort(sortData);
					    			    
						    for(var i = 0; i< villageData.length; i++){
					    		var village 	 = (villageData[i]['key']);
					    		var villageSplit = village.split('*') 
					    		$('.fk_curr_village_or_town_id').append('<option value ="'+villageSplit[1]+'">'+villageSplit[0]+'</option>');
						    }
						    document.getElementById('fk_curr_village_or_town_id').value = current_village_id;
						}		
					    },
					    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+current_taluk_id+"/t"

					});
				
				}
				
				
			    }
			    
			    
			}		
		    },
		    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+st_id+"/s"

		});	

	
	}

	for(var i = 0; i<keyFields.length;i++){
		if(($.inArray(keyFields[i], arrayKeys) == -1)){
			if(document.getElementById(''+keyFields[i]+'')){

				if( data.mlcompositeArray[0][keyFields[i]]  ||  (data.mlcompositeArray[0][keyFields[i]]==0) ){
					$("#"+keyFields[i]+" select").val(data.mlcompositeArray[0][keyFields[i]]);
					/*For IMages src*/
					if(document.getElementById(''+keyFields[i]+'_img_pop')){
						if(data.mlcompositeArray[0][keyFields[i]]){
							$('#'+keyFields[i]+'_img_pop').attr("src", data.mlcompositeArray[0][keyFields[i]])							
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
									$('#'+objKeys[k]+"_"+(j+1)+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								}
							}
						}
						if(document.getElementById(''+objKeys[k] +'')){ 
							$("#"+objKeys[k]+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
							document.getElementById(''+objKeys[k]+'').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];

							/*For IMages src*/
							if(document.getElementById(''+objKeys[k]+'_img_pop')){
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]){
									$('#'+objKeys[k]+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								}
							}
						}				
					}
				}
			}
		}
	}
}
	
	
/*Location Change */
var masterLocationData 	 = '';
var districtAndTalukData = [];
			
/*Cross Filter data*/
var ndx, all, stateDim, districtDim, talukDim, villageDim, statePinDim, districtPinDim, talukPinDim, villagePinDim;

function currentStateChange(){
	var st_id =  document.getElementById('current_state').value;
	var url = "/masterLocation/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (masterLocationData) {
		if( masterLocationData ){
		
		    districtAndTalukData = masterLocationData;	

	   	    document.getElementById('current_district').innerHTML 	    = "";	
	   	    document.getElementById('current_taluk').innerHTML 	  	    = "";	
	   	    document.getElementById('fk_curr_village_or_town_id').innerHTML = "";			   	    		   	    
	   	    		
		    masterLocationData	= masterLocationData 	
	    	    data 		= masterLocationData;	
	    	    ndx 		= crossfilter(data);	
	    	    all 		= ndx.groupAll();	
	    	    
	    	    districtDim = ndx.dimension(function (d) {
			return  d.district_name+'*'+d.district_code;
		    });
		    
		    $('.current_district').append('<option value ="" >   Select District </option>');
		    var districtData	= districtDim.group().top(Infinity);
		    districtData 	= districtData.sort(sortData);
		    
		    
		    			    
		    for(var i = 0; i< districtData.length; i++){
		    	var dist 	= (districtData[i]['key']);
		    	var distSplit 	= dist.split('*') 
		    	$('.current_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
		    }
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+st_id+"/s"

	});		    
	    	
}


function setSelectedValue(hierarchyID,current_state_id,hierarchyValue,hierarchy){
	//var loc_id =  document.getElementById(hierarchyID).value;
	if(hierarchy == "district"){
		var url = "/masterLocation/";
	}
	if(hierarchy == "taluk"){
		var url = "/villageDetails/";
	}
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (masterLocationData) {
		if( masterLocationData ){
		
		    districtAndTalukData = masterLocationData;	

	   	    /*document.getElementById('current_district').innerHTML 	    = "";	
	   	    document.getElementById('current_taluk').innerHTML 	  	    = "";	
	   	    document.getElementById('fk_curr_village_or_town_id').innerHTML = ""; */
	   	    		
		    masterLocationData	= masterLocationData 	
	    	    data 		= masterLocationData;	
	    	    ndx 		= crossfilter(data);	
	    	    all 		= ndx.groupAll();	
	    	    
	    	    
	    	    if(hierarchy == "district"){
	    	    	districtDim = ndx.dimension(function (d) {
				return  d.district_name+'*'+d.district_code;
		   	});
		   	$('.'+hierarchyID+'').append('<option value ="" >   Select District </option>');
		    	var districtData	= districtDim.group().top(Infinity);
		   	districtData 	= districtData.sort(sortData);
		    			    
		   	for(var i = 0; i< districtData.length; i++){
		    		var dist 	= (districtData[i]['key']);
		    		var distSplit 	= dist.split('*') 
		    		$('.'+hierarchyID+'').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
		   	 }
		   	 document.getElementById(hierarchyID).value = hierarchyValue;
		    }
		     
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+current_state_id+"/s"

	});		    
	    	
}

function businessStateChange(){
	var st_id =  document.getElementById('biz_state').value;
	var url = "/masterLocation/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (masterLocationData) {
		if( masterLocationData ){


	   	    document.getElementById('biz_district').innerHTML 	    = "";	
	   	    document.getElementById('biz_taluk').innerHTML 	  	    = "";	
	   	    document.getElementById('fk_biz_village_or_town').innerHTML  = "";			   	    		   	    
	   	    		
		    masterLocationData	= masterLocationData 	
	    	    data 		= masterLocationData;	
	    	    ndx 		= crossfilter(data);	
	    	    all 		= ndx.groupAll();	
	    	    
	    	    districtDim = ndx.dimension(function (d) {
			return  d.district_name+'*'+d.district_code;
		    });
		    
		    $('.biz_district').append('<option value ="" >   Select District </option>');
		    var districtData	= districtDim.group().top(Infinity);
		    districtData 	= districtData.sort(sortData);
		    			    
		    for(var i = 0; i< districtData.length; i++){
		    	var dist 	= (districtData[i]['key']);
		    	var distSplit 	= dist.split('*') 
		    	$('.biz_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
		    }
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+st_id+"/s"

	});		    
	    	
}
function businessStateChange(){
	var st_id =  document.getElementById('biz_state').value;
	var url = "/masterLocation/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (masterLocationData) {
		if( masterLocationData ){


	   	    document.getElementById('biz_district').innerHTML 	    = "";	
	   	    document.getElementById('biz_taluk').innerHTML 	  	    = "";	
	   	    document.getElementById('fk_biz_village_or_town').innerHTML  = "";			   	    		   	    
	   	    		
		    masterLocationData	= masterLocationData 	
	    	    data 		= masterLocationData;	
	    	    ndx 		= crossfilter(data);	
	    	    all 		= ndx.groupAll();	
	    	    
	    	    districtDim = ndx.dimension(function (d) {
			return  d.district_name+'*'+d.district_code;
		    });
		    
		    $('.biz_district').append('<option value ="" >   Select District </option>');
		    var districtData	= districtDim.group().top(Infinity);
		    districtData 	= districtData.sort(sortData);
		    			    
		    for(var i = 0; i< districtData.length; i++){
		    	var dist 	= (districtData[i]['key']);
		    	var distSplit 	= dist.split('*') 
		    	$('.biz_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
		    }
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+st_id+"/s"

	});		    
	    	
}	


/*Change district value to set options in Taluk*/
function businessDistrictChange(){
        document.getElementById('biz_taluk').innerHTML   	       = "";	
        document.getElementById('fk_biz_village_or_town').innerHTML = "";
			
	var Dt_id 	  = document.getElementById('biz_district');
	var Dt_id_inrhtml = Dt_id.options[Dt_id.selectedIndex].innerHTML;
	var Dt_id_val 	  = Dt_id.options[Dt_id.selectedIndex].value;		
	
	/*Filter by the Value returned in District Dimension created*/
        var name  	  = Dt_id_inrhtml+'*'+Dt_id_val;
        
	/*Filtered Data OF taluk*/
        filteredTalukData = districtDim.filter(name).top(Infinity); 

	talukndx  = crossfilter(filteredTalukData);		//--> set Taluk Values into cross filter
	talukDim  = talukndx.dimension(function (d) {		//--> Create Dimension for a taluk
	    return  d.taluk_name+'*'+d.taluk_code;
        });
        
        $('.biz_taluk').append('<option value ="" >   Select Taluk </option>');
        var talukData	= talukDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
        talukData 	= talukData.sort(sortData);
    			    
        for(var i = 0; i< talukData.length; i++){
    		var taluk 	= (talukData[i]['key']);
    		var talukSplit 	= taluk.split('*') 
    		$('.biz_taluk').append('<option value ="'+talukSplit[1]+'">'+talukSplit[0]+'</option>');
        }	        
}

/*Change district value to set options in Taluk*/
function currentDistrictChange(){
        document.getElementById('current_taluk').innerHTML   	        = "";	
        document.getElementById('fk_curr_village_or_town_id').innerHTML = "";
	var Dt_id 	  = document.getElementById('current_district');
	var Dt_id_inrhtml = Dt_id.options[Dt_id.selectedIndex].innerHTML;
	var Dt_id_val 	  = Dt_id.options[Dt_id.selectedIndex].value;		
	/*Filter by the Value returned in District Dimension created*/
        var name  	  = Dt_id_inrhtml+'*'+Dt_id_val;
        
	/*Filtered Data OF taluk*/
        filteredTalukData = districtDim.filter(name).top(Infinity); 

	talukndx  = crossfilter(filteredTalukData);		//--> set Taluk Values into cross filter
	talukDim  = talukndx.dimension(function (d) {		//--> Create Dimension for a taluk
	    return  d.taluk_name+'*'+d.taluk_code;
        });
        
        $('.current_taluk').append('<option value ="" >   Select Taluk </option>');
        var talukData	= talukDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
        talukData 	= talukData.sort(sortData);
    			    
        for(var i = 0; i< talukData.length; i++){
    		var taluk 	= (talukData[i]['key']);
    		var talukSplit 	= taluk.split('*') 
    		$('.current_taluk').append('<option value ="'+talukSplit[1]+'">'+talukSplit[0]+'</option>');
        }
}

/*Change district value to set options in Taluk*/
function businessTalukChange(){
	document.getElementById('fk_biz_village_or_town').innerHTML = "";
	
	var Tlk_id 	   = document.getElementById('biz_taluk');//fk_biz_taluk
	var Tlk_id_inrhtml = Tlk_id.options[Tlk_id.selectedIndex].innerHTML;
	var Tlk_id_val 	   = Tlk_id.options[Tlk_id.selectedIndex].value;		
	
	var url = "/villageDetails/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (villageData) {		        
		if( villageData ){
	    	    data 	= villageData;	
	    	    villageNDX 	= crossfilter(villageData);	
		    villageDim 	= villageNDX.dimension(function (d) {		//--> Create Dimension for a taluk
		    	return  d.village_name+'*'+d.village_code;
		    });
	
		    $('.fk_biz_village_or_town').append('<option value ="" >   Select Village </option>');
		    var villageData	= villageDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
		    villageData		= villageData.sort(sortData);
	    			    
		    for(var i = 0; i< villageData.length; i++){
	    		var village 	 = (villageData[i]['key']);
	    		var villageSplit = village.split('*') 
	    		$('.fk_biz_village_or_town').append('<option value ="'+villageSplit[1]+'">'+villageSplit[0]+'</option>');
		    }
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+Tlk_id_val+"/t"

	});
        
}

/*Change district value to set options in Taluk*/
function currentTalukChange(){
	document.getElementById('fk_curr_village_or_town_id').innerHTML = "";
	
	var Tlk_id 	   = document.getElementById('current_taluk');
	var Tlk_id_inrhtml = Tlk_id.options[Tlk_id.selectedIndex].innerHTML;
	var Tlk_id_val 	   = Tlk_id.options[Tlk_id.selectedIndex].value;		
	
	var url = "/villageDetails/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (villageData) {
		if( villageData ){
	    	    data 	= villageData;	
	    	    villageNDX 	= crossfilter(villageData);	
		    villageDim 	= villageNDX.dimension(function (d) {		//--> Create Dimension for a taluk
		    	return  d.village_name+'*'+d.village_code;
		    });
	
		    $('.fk_curr_village_or_town_id').append('<option value = "" >   Select Village </option>');
		    var villageData	= villageDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
		    villageData		= villageData.sort(sortData);
	    			    
		    for(var i = 0; i < villageData.length; i++){
	    		var village 	 = (villageData[i]['key']);
	    		var villageSplit = village.split('*') 
	    		$('.fk_curr_village_or_town_id').append('<option value ="'+villageSplit[1]+'">'+villageSplit[0]+'</option>');
		    }
		}		
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+Tlk_id_val+"/t"

	});
        
}	


/* Pincode Change */

function pincodeChange(d){
    var pinId	    = d;
    var pincode     = ''	    
    var pincodeType = {
    		'curr':'current_pincode',
    		'biz'	 :'biz_pincode'	    		
    	}
    if(pincodeType[d]){		
	pincode = document.getElementById(pincodeType[d]).value;
    }
    
    if(pincode.length == 6){
	var url = "/pincodeDetails/";
	
	$.ajax({
	    url		:  url	,
	    type	: 'post',
	    dataType	: 'json',
	    success	: function (pincodeData) {
	    	
	    	if(pincodeData.length==0){
			alert("Data not available for the pincode you have entered "+pincode+".!\n\nSelect the State, District, Taluk and Village Manually!");
			document.getElementById("current_state").value = "";
			document.getElementById("current_district").value = "";
			document.getElementById("current_taluk").value = "";
			document.getElementById("fk_curr_village_or_town_id").value = "";
			return false;
		}
	    
	        pincodeNDX 	= crossfilter(pincodeData);	
	        
	        
		/*State*/
		statePinDim 	= pincodeNDX.dimension(function (d) {		//--> Create Dimension for a State
				  	return  d.state_name+'*'+d.state_code;
				    });		        
		/*District*/		    
		districtPinDim 	= pincodeNDX.dimension(function (d) {		//--> Create Dimension for a District
				  	return  d.district_name+'*'+d.district_code;
				    });	
		/*Taluk*/		    
		talukPinDim 	= pincodeNDX.dimension(function (d) {		//--> Create Dimension for a Taluk
				  	return  d.taluk_name+'*'+d.taluk_code;
				    });		        
		/*Village*/		    
		villagePinDim 	= pincodeNDX.dimension(function (d) {		//--> Create Dimension for a Village
				  	return  d.village_name+'*'+d.village_code;
				    });		        
		
		/*State*/
		var stateId 	= (statePinDim.group().top(Infinity)[0]['key'].split('*')[1]);
		
		/*District*/
		var district 	= (districtPinDim.group().top(Infinity)[0]['key']);				
		var districtId 	= (districtPinDim.group().top(Infinity)[0]['key'].split('*')[1]);							
		
		/*Taluk*/
		var talukId 	= (talukPinDim.group().top(Infinity)[0]['key'].split('*')[1]);		        
		
		/*Village*/		        		
		var villageId 	= (villagePinDim.group().top(Infinity)[0]['key'].split('*')[1]);	
				
	        masterData 	= '';
        	/*Ajax call for getting District and Taluk Data*/
		$.ajax({
		    url		: '/masterLocation/',
		    type	: 'post',
		    dataType	: 'json',
		    success	: function (masterLocationData) {
			if( masterLocationData ){
	
			    districtAndTalukData = masterLocationData;	
			    
			    if(d=='curr'){
			   	    document.getElementById('current_district').innerHTML 	    = "";	
			   	    document.getElementById('current_taluk').innerHTML 	  	    = "";	
			   	    document.getElementById('fk_curr_village_or_town_id').innerHTML = "";			   	    		   	    
		   	    }
			    if(d=='biz'){
			   	    document.getElementById('biz_district').innerHTML 	    = "";	
			   	    document.getElementById('biz_taluk').innerHTML 	  	    = "";	
			   	    document.getElementById('fk_biz_village_or_town').innerHTML = "";			   	    		   	    
		   	    }
		   	    		
			    masterLocationData	= masterLocationData 	
		    	    data 		= masterLocationData;	
		    	    ndx 		= crossfilter(data);	
		    	    all 		= ndx.groupAll();	
		    	    
		    	    districtDim = ndx.dimension(function (d) {
				return  d.district_name+'*'+d.district_code;
			    });
			    if(d == 'curr'){
				    $('.current_district').append('<option value ="" >   Select District </option>');
			    }else{
				    $('.biz_district').append('<option value ="" >   Select District </option>');					    
			    }
			    var districtData	= districtDim.group().top(Infinity);
			    districtData 	= districtData.sort(sortData);
			    			    
			    for(var i = 0; i< districtData.length; i++){
			    	var dist 	= (districtData[i]['key']);
			    	var distSplit 	= dist.split('*') 
			    	if(d == 'curr'){
				    	$('.current_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');
			    	}else{
				    	$('.biz_district').append('<option value ="'+distSplit[1]+'">'+distSplit[0]+'</option>');					    	
			    	}
			    }

			    if(d=='curr'){
				document.getElementById('current_state').value    = stateId;
				document.getElementById('current_district').value = districtId;
			    }
			    if(d=='biz'){
				document.getElementById('biz_state').value    	  = stateId;
				document.getElementById('biz_district').value  = districtId;
			    }    					    

			    /*Filtered Data OF taluk*/
			    filteredTalukData = districtDim.filter(district).top(Infinity); 

			    talukndx  = crossfilter(filteredTalukData);			//--> set Taluk Values into cross filter
			    talukDim  = talukndx.dimension(function (d) {		//--> Create Dimension for a taluk
				    return  d.taluk_name+'*'+d.taluk_code;
			    });
	
			    if(pinId =='biz'){	
			    	$('.biz_taluk').append('<option value ="" >   Select Taluk </option>');
		    	    }else{
			    	$('.current_taluk').append('<option value ="" >   Select Taluk </option>');				    	    
		    	    }	
			    var talukData	= talukDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
			    talukData	 	= talukData.sort(sortData);
			    			    
			    for(var i = 0; i< talukData.length; i++){
		    		var taluk 	= (talukData[i]['key']);
		    		var talukSplit 	= taluk.split('*') 
		    		if(pinId =='biz'){
			    		$('.biz_taluk').append('<option value ="'+talukSplit[1]+'">'+talukSplit[0]+'</option>');
		    		}else{
			    		$('.current_taluk').append('<option value ="'+talukSplit[1]+'">'+talukSplit[0]+'</option>');				    		
		    		}
			    }
			    if(pinId =='biz'){
			        document.getElementById('biz_taluk').value = talukId;
			    }
			    if(pinId =='curr'){
			        document.getElementById('current_taluk').value = talukId;
			    }					    
			       
			    /*Village*/
			    if(pinId =='curr'){
				    $('.fk_curr_village_or_town_id').append('<option value ="" >   Select Village </option>');
			    }
			    if(pinId =='biz'){
				    $('.fk_biz_village_or_town').append('<option value ="" >   Select Village </option>');					    
			    }						    
			    var villageData	= villagePinDim.group().top(Infinity);	//--> Get All the filtered taluk values and Sort
			    villageData		= villageData.sort(sortData);
		    			    
			    for(var i = 0; i< villageData.length; i++){
		    		var village 	 = (villageData[i]['key']);
		    		var villageSplit = village.split('*') 
			        if(pinId =='curr'){				    		
		    		    $('.fk_curr_village_or_town_id').append('<option value ="'+villageSplit[1]+'">'+villageSplit[0]+'</option>');
	    		        }
			        if(pinId =='biz'){				    		
		    		    $('.fk_biz_village_or_town').append('<option value ="'+villageSplit[1]+'">'+villageSplit[0]+'</option>');
	    		        }			    		        
			    }	

			    if(pinId =='curr'){					    				    
			        document.getElementById('fk_curr_village_or_town_id').value = villageId;					    
			        if(current_village_id >0 ){
			        	return false
			        	alert(current_village_id + '  --1---   '+ villageId);
				        document.getElementById('fk_curr_village_or_town_id').value = current_village_id;					    
				        $('#fk_curr_village_or_town_id option[value="' + current_village_id + '"]').prop('selected', true);
			        }				        
			    }
			    if(pinId =='biz'){					    				    
			        document.getElementById('fk_biz_village_or_town').value = villageId;					    
			        if(biz_village_id >0 ){
			        	alert(biz_village_id + '  --2---   '+ villageId);
				        document.getElementById('fk_biz_village_or_town').value = biz_village_id;
				        $('#fk_biz_village_or_town option[value="' + biz_village_id + '"]').prop('selected', true);					    
			        }
			    }					        
			}		
		    },
		    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+stateId+"/s"

		});        
	    },
	    data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+pincode+"/p"

	});	    	
    	
    }else{
    	return false;
    }

}
	
/*Sorting Function*/
function sortData(a,b) {
  if (a.key < b.key)
    return -1;
  else if (a.key > b.key)
    return 1;
  else 
    return 0;
}	

function alpha(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k >= 63 && k <= 91) || (k >= 97 && k < 123) || (k >= 93 && k < 96) || k == 8 || k == 32 || k == 33 || (k >= 40 && k <= 59) || k == 61 ||( k >= 35 && k <= 38));
}


