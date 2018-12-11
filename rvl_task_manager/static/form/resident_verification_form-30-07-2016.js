var avroObj = {};

function submitResidentForm(){

	//var resi_verification_id			= document.getElementById("resi_verification_id").value;
	//var member_id		  			= document.getElementById("member_id").value;
	//var loan_id					= document.getElementById("loan_id").value;	
	//var date					= document.getElementById("date").value;
	//var branch_name					= document.getElementById("branch_name").value;
	//var user_id					= document.getElementById("user_id").value;

	// Contacted person details 
	var name_of_the_person_spoken_to		= document.getElementById("name_of_the_person_spoken_to").value;
	var relationship_to_the_owner			= document.getElementById("relationship_to_the_owner").value;
	/*var time_in					= document.getElementById("time_in").value;
	var time_out					= document.getElementById("time_out").value;
	
	console.log('time_in[');
	console.log(time_in);
	console.log(time_out);	*/	
	

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
	var furnishing					= document.getElementById("furnishing").value;
	var type_of_flooring				= document.getElementById("type_of_flooring").value;
	var vehicles_owned				= $('input[name="vehicles_owned"]:checked').val();
	var household_items_visible			= document.getElementById("household_items_visible").value;
	var residence_in_negative_area			= document.getElementById("residence_in_negative_area").value;
	
	// status and remarks 
	var status_of_residence_check			= document.getElementById("status_of_residence_check").value;
	var status_of_neighbor_check			= document.getElementById("status_of_neighbor_check").value;
	var remarks_if_any				= document.getElementById("remarks_if_any").value;	
	var overall_status				= $('input[name="overall_status"]:checked').val();		
	var fi_executive_details			= document.getElementById("fi_executive_details").value;	
	var name					= document.getElementById("name").value;	
	var time_of_visit				= document.getElementById("time_of_visit").value;	
	var residence_photo_with_atleast_one_family_member  =  document.getElementById("residence_photo_with_atleast_one_family_member").value;	
	
	var neighborVerificationArray= [];
	for(var i=1; i <=2; i++){
	
		var obj = {};
		obj["name"]=document.getElementById("name_"+i+"").value;
		obj["address"]=document.getElementById("address_"+i+"").value;
		obj["phone_number"]=parseInt(document.getElementById("phone_number_"+i+"").value);
		obj["known_each_other"]=document.getElementById("known_each_other_"+i+"").value;
		obj["behaviour_of_the_customer"]=document.getElementById("behaviour_of_the_customer_"+i+"").value;
		obj["financial_status_of_the_customer"]=document.getElementById("financial_status_of_the_customer_"+i+"").value;
		obj["any_other_information"]=document.getElementById("any_other_information_"+i+"").value;
		neighborVerificationArray.push( obj );
	}


	/*Date and time,  DateOnly*/
	var currentDateValue  		= (new Date());
	currentDateValue 		= JSON.stringify(currentDateValue);
	currentDateValue 		= currentDateValue.replace(/"/g,'');
	var currentDateValuesplit 	= currentDateValue.split('T') 
	var currentDateValueDateOnly 	= currentDateValuesplit[0];
	
	console.log("timeOut");	
	console.log(timeIn);
	console.log(timeOut);
	
	/*Time Out*/
	var d = new Date(); 
	var timeOut = (d.getHours()+":"+d.getMinutes()).toString();
	

	var dataObj = {
		//"resi_verification_id"	:	 parseInt(resi_verification_id),
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
		"residence_photo_with_atleast_one_family_member"	:	 residence_photo_with_atleast_one_family_member,
		"time_of_visit"						:	 time_of_visit,
	};
		
		
	var dataArr = {
			"residentVerificationArray": [dataObj]
	};

	var processupdate = {'variables': {'Resident_Verification_Status' : {'value' : 'New'}}    };		
	var res_data = {};
	var data=JSON.stringify(dataArr);
	res_data["form_data"]	 = dataArr;
	res_data["task_id"]  	 = task_id;
	res_data["process_data"] = processupdate;
		
	$.ajax({
	    url: '/submitResidentForm/submitResidentFormAdd',
	    type: 'post',
	    dataType: 'json',
	    success: function (data) {	
		console.log(data);
		window.location='/tasks/';
	    },
	    error: function(error) {
		console.log(error)
	    },
	    data: JSON.stringify(res_data)
	});
}
	
