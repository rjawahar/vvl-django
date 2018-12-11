var avroObj = {};


$("#residence_photo").change(function(){
		document.getElementById('residence_photo_with_atleast_one_family_member').value = this.value;
		readURL(this, 'residence_photo_img');
	});	
imagePopUp();

function submitResidentForm(){
	var html='';
	$("#alertContentId").html('');
	var label='';
	var mandatoryFieldsDict = {};
	
	var validation=0;
	var stringValidate= ["name_of_the_person_spoken_to","relationship_to_the_owner","address","residence_ownership","living_with_family","approachability","type_of_house",
						"locality","landmark","roofing","area","interior_wall","furnishing","type_of_flooring","household_items_visible","residence_in_negative_area",
						"status_of_residence_check","status_of_neighbor_check","remarks_if_any","fi_executive_details","name","name_1",
						"address_1","phone_number_1","known_each_other_1","behaviour_of_the_customer_1","financial_status_of_the_customer_1","any_other_information_1"];

	var intValidate	=  ["years_in_the_address","number_of_people_living","number_of_rooms"];
	
	var neighbourFieldsArray = ["name_1","address_1","phone_number_1","known_each_other_1","behaviour_of_the_customer_1","financial_status_of_the_customer_1","any_other_information_1"];
	
	for(var i=0; i<stringValidate.length; i++ ){
		if(document.getElementById(""+stringValidate[i]+"")){
			if(document.getElementById(""+stringValidate[i]+"").value == ""){
				$("#"+stringValidate[i]+"").css('background-color','yellow');
				$("#"+stringValidate[i]+"").css('color','black');
				validation =1;
				
				if(($.inArray(stringValidate[i], neighbourFieldsArray) !== -1)){
					label = document.getElementById(""+stringValidate[i]+"_label"+"").innerHTML;
							console.log(stringValidate[i]);
							var idSplit = stringValidate[i].split('_');
							var idNum	= idSplit[idSplit.length-1];
							mandatoryFieldsDict[label+"( Check-"+idNum+" )"]="Input text";
				}
				else{
					label = document.getElementById(""+stringValidate[i]+"_label"+"").innerHTML;
					mandatoryFieldsDict[label]="Input text";
				}
			}
		}
	}

	for(var i=0; i<intValidate.length; i++ ){
		if(document.getElementById(""+intValidate[i]+"")){
			if((document.getElementById(""+intValidate[i]+"").value < 0) || (document.getElementById(""+intValidate[i]+"").value=="")){ 
				$("#"+intValidate[i]+"").css('background-color','yellow');
				$("#"+intValidate[i]+"").css('color','black');
				validation =1;	
				if(($.inArray(intValidate[i], neighbourFieldsArray) !== -1)){
					label = document.getElementById(""+intValidate[i]+"_label"+"").innerHTML;
							var idSplit = intValidate[i].split('_');
							var idNum	= idSplit[idSplit.length-1]; 
							mandatoryFieldsDict[label+"( Check-"+idNum+" )"]="Input text";
				}
				else{
					label = document.getElementById(""+intValidate[i]+"_label"+"").innerHTML;
					mandatoryFieldsDict[label]="Input text";
				}
			}
		}
	}
	if(document.getElementById("residence_photo").files.length == 0){
		$("#residence_photo_with_atleast_one_family_member").css('background-color','yellow');
		$("#residence_photo_with_atleast_one_family_member").css('color','black');
		validation =1;
		label = document.getElementById("residence_photo_with_atleast_one_family_member_label").innerHTML;
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
		$('#residenceModal').modal('show');
		html='';
	}


	// Contacted person details 
	var name_of_the_person_spoken_to		= document.getElementById("name_of_the_person_spoken_to").value;
	var relationship_to_the_owner			= document.getElementById("relationship_to_the_owner").value;

	//Verification 
	var addres_conformation				= $('input[name="addres_conformation"]:checked').val();	
	var addres_proof_shown				= $('input[name="addres_proof_shown"]:checked').val();		
	var address					= document.getElementById("address").value;

	// Residential info 
	var residence_ownership				= document.getElementById("residence_ownership").value;	
	var years_in_the_address			= document.getElementById("years_in_the_address").value;
	var living_with_family				= $('input[name="living_with_family"]:checked').val();	
	var number_of_people_living			= document.getElementById("number_of_people_living").value;
	var approachability				= document.getElementById("approachability").value;
	var type_of_house				= document.getElementById("type_of_house").value;
	var locality					= document.getElementById("locality").value;
	var landmark					= document.getElementById("landmark").value;
	var roofing					= document.getElementById("roofing").value;
	var area					= document.getElementById("area").value;
	var number_of_rooms				= document.getElementById("number_of_rooms").value;
	var interior_wall				= document.getElementById("interior_wall").value;
	console.log("interior wall", interior_wall);
	console.log("furnishing", furnishing);
	console.log("type_of_flooring",type_of_flooring);
	
	var furnishing					= document.getElementById("furnishing").value;
	var type_of_flooring				= document.getElementById("type_of_flooring").value;
	var vehicles_owned				= $('input[name="vehicles_owned"]:checked').val();
	var household_items_visible			= document.getElementById("household_items_visible").value;
	var residence_in_negative_area			= document.getElementById("residence_in_negative_area").value;

	// status and remarks 
	var status_of_residence_check			= document.getElementById("status_of_residence_check").value;
	var status_of_neighbor_check			= document.getElementById("status_of_neighbor_check").value;
	var remarks_if_any				= document.getElementById("remarks_if_any").value;	
	console.log("remarks_if_any",remarks_if_any);	
	var overall_status				= $('input[name="overall_status"]:checked').val();		
	var fi_executive_details			= document.getElementById("fi_executive_details").value;	
	var name					= document.getElementById("name").value;	
	var time_of_visit				= document.getElementById("time_of_visit").value;	
	var residence_photo_with_atleast_one_family_member  =  document.getElementById("residence_photo_with_atleast_one_family_member").value;	
	
	var neighborVerificationArray= [];
	var neighborFields = ["name","address","phone_number","known_each_other","behaviour_of_the_customer","financial_status_of_the_customer","any_other_information"];
	
	for(var i=1; i <=2; i++){
		var obj = {};
		if(document.getElementById("name_"+i+"").value && document.getElementById("address_"+i+"").value && document.getElementById("phone_number_"+i+"").value && document.getElementById("known_each_other_"+i+"").value && document.getElementById("behaviour_of_the_customer_"+i+"").value && document.getElementById("financial_status_of_the_customer_"+i+"").value && document.getElementById("any_other_information_"+i+"").value){
			obj["name"]=document.getElementById("name_"+i+"").value;
			obj["address"]=document.getElementById("address_"+i+"").value;
			obj["phone_number"]=parseInt(document.getElementById("phone_number_"+i+"").value);
			obj["known_each_other"]=document.getElementById("known_each_other_"+i+"").value;
			obj["behaviour_of_the_customer"]=document.getElementById("behaviour_of_the_customer_"+i+"").value;
			obj["financial_status_of_the_customer"]=document.getElementById("financial_status_of_the_customer_"+i+"").value;
			obj["any_other_information"]=document.getElementById("any_other_information_"+i+"").value;
			neighborVerificationArray.push( obj );
		}
	}
	console.log(neighborVerificationArray);
	/*Date and time,  DateOnly*/
	var currentDateValue  		= (new Date());
	currentDateValue 		= JSON.stringify(currentDateValue);
	currentDateValue 		= currentDateValue.replace(/"/g,'');
	var currentDateValuesplit 	= currentDateValue.split('T') 
	var currentDateValueDateOnly 	= currentDateValuesplit[0]	
	
	
	/*Time Out*/
	var d = new Date(); 
	var timeOut = (d.getHours()+":"+d.getMinutes()).toString();
	

	var dataObj = {
		"member_id" 			:	 parseInt(member_id),
		"loan_id" 			:	 parseInt(loan_id),
		"date"	 			:	 currentDateValueDateOnly,
		"branch_name" 			:	 "",
		"user_id"			:	 user_id,

		"time_in"			: 	 timeIn,
		"time_out"			:	 timeOut,
		"name_of_the_person_spoken_to"	:	 name_of_the_person_spoken_to,
		"relationship_to_the_owner"	:	 relationship_to_the_owner,
		
		"addres_conformation"		:	 addres_conformation,
		"addres_proof_shown"		: 	 addres_proof_shown,
		
		"address"			:	 address,

		"residence_ownership"		:	 residence_ownership,
		"years_in_the_address"		:	 parseInt(years_in_the_address),
		"living_with_family"		:	 living_with_family,
		"number_of_people_living"	:	 parseInt(number_of_people_living),
		"approachability"		:	 approachability,
		"type_of_house"			:	 type_of_house,
		"area"				:	 area,
		"locality"			:	 locality,
		"landmark"			:	 landmark,
		"roofing"			: 	 roofing,
		"number_of_rooms"		: 	 parseInt(number_of_rooms),
		"interior_wall"			:	 interior_wall,
		"furnishing"			:	 furnishing,
		"type_of_flooring"		:	 type_of_flooring,
		"vehicles_owned"		:	 vehicles_owned,
		"household_items_visible"	:	 household_items_visible,
		"residence_in_negative_area"	: 	 residence_in_negative_area,
		
		"neighborVerificationArray"	: 	neighborVerificationArray,
	
		"status_of_residence_check"				:	 status_of_residence_check,
		"status_of_neighbor_check"				:	 status_of_neighbor_check,
		"remarks_if_any"					:	 remarks_if_any,
		"overall_status"					:	 overall_status,
		"fi_executive_details"					:	 fi_executive_details,
		"name"							:	 name,
		"time_of_visit"						:	 time_of_visit,
		"residence_photo_with_atleast_one_family_member"	:	 residence_photo_with_atleast_one_family_member.replace(/\\/g,''),
		"time_of_visit"						:	 time_of_visit,
	};
	
	console.log(dataObj);
	var dataArr = {
			"residentVerificationArray": [dataObj]
	};
	console.log(dataArr);
	var processupdate = {'variables': {'Resident_Verification_Status' : {'value' : 'New'}}    };		
	var res_data = new FormData();
	var data=JSON.stringify(dataArr);
	res_data.append("form_data", data);
	res_data.append("task_id",task_id);
	res_data.append("process_data",JSON.stringify(processupdate));
	jQuery.each(jQuery('#residence_photo')[0].files, function(i, file) {
	    res_data.append("file-12",file);
	});
	
	console.log(res_data);
	var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">'
			+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			+'</div>'
			+'</div>';
	$(".popup").empty().append(theImg).fadeIn();		
	var opts = {
		    url: '/submitResidentForm/submitResidentFormAdd',
		    data: res_data,
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
	     	if(res_data.fake) {
	    	// Make sure no text encoding stuff is done by xhr
	    		opts.xhr = function() { var xhr = jQuery.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; }
	   		opts.contentType = "multipart/form-data; boundary="+res_data.boundary;
	    		opts.data = res_data;
		}
		jQuery.ajax(opts);
}
	
