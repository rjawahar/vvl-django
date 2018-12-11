
var Assets = {
		"1":"Cycle",
		"2":"Moped/Motorized Cycle",
		"3":"Bike/Scooter",
		"4":"Auto/Share Auto",
		"5":"Tempo",
		"6":"Car",
		"7":"Van",
		"8":"Other Transportation Vehicle",
		"9":"Basic Mobile Phone",
		"10":"Smart Phone",
		"11":"Laptop/Computer",
		"12":"Net Connection",
		"13":"Email Id",
		"14":"FaceBook Account",
		"15":"Driving License",
		"16":"Land",
		"17":"Pakka House",
		"18":"Water Pump",
		"19":"TV",
		"20":"DVD Player",
		"21":"Fridge",
		"22":"Gas Stove",
		"23":"Mixie",
		"24":"Electric Grinder",
		"25":"Microwave Oven",
		"26":"Fan",
		"27":"Airconditioner",
		"28":"Water Heater",
		"29":"Animal Cow/Goat etc."
	};

var kilometer = {
		"1":" 1 Km ",
		"3":" 3 Km ",
		"5":" 5 Km ",	
		"10":" 10 Km"
	};

var family = {
		"1":"Self",
		"2":"Father",
		"3":"Mother",	
		"4":"Child"
	};

var staffInformation = {
		"1":" Self ",
		"2":" Spouse ",
		"3":" Father ",	
		"4":" Mother ",
		"5":" Sons ",
		"6":" Daughter ",
		"7":" Other Relatives ",
		"8":" Non relatives ",
	};

var jobs = {
		"1":" Full Time ",
		"2":" Part Time ",
		};

var marital = {
		"1":" Married ",
		"2":" Single ",
		"3":" Divorced "
		};


var education ={
		"1":"Post Graduate",
		"2":"Masters Degree",
		"3":"Bachelors Degree",
		"4":"SSLC",
		"5":"HSC",
		"6":"ITI",	
		"7":"Diploma",
	};

var occupationDetails = {
		"1":"Government",
		"2":"Private",
	};


var networkQuestion ={
		"1":"HAVE FRIENDS LIVING IN",
		"2":"HAVE FAMILY LIVING IN",
		"3":"HAVE TRAVELLED IN THE LAST ONE YEAR TO",
		"4":"HAVE TRAVELLED IN ENTIRE LIFE TO",
		"5":"HAVE LIVED FOR MORE THEN ONE MONTH IN",
	};



var mandatory_array 	= ['firstname', 'lastname', 'father_name', 'gender', 'dob', 'age', 'mobile_number', ];
var business_mandatory 	= ["biz_nature","biz_no_of_yrs", "biz_location", "rent_pay_month", "biz_door_no", "biz_street_name", "biz_location_name", 
			   "fk_biz_village_or_town","biz_state", "biz_pincode","biz_office_address_landline_number","biz_office_address_mobile_number",
			   /*"biz_address_fk_alf_file_name","biz_address_fk_alf_file_name1",*/"biz_localbody_app",/*"biz_address_fk_alf_node_name","biz_address_fk_alf_node_name1",*/
			   "biz_issued_by","biz_no","biz_valid_upto","brand_sale","nonbrand_sale","total_sale","min_sale_day","annual_household_income","annual_expenses",
			   "surplus_available"];


var stringValidate= ['firstname','father_name','dob','current_door_no','current_street_name','current_location_name','current_state',
			'current_pincode','id_proof_type','alf_node_ref','current_document_value','current_document_url','id1_name_as_per_bank_records',
			'id1_bank_account_number','id1_bank_ifsc_code','member_bank_fk_alf_node_ref','biz_nature','biz_location','biz_door_no','biz_street_name',
			'biz_location_name','biz_state','biz_address_fk_alf_node_ref','biz_id_alf_node_ref','biz_issued_by','biz_no','biz_valid_upto','marital_status',
			'family_member_employment_type_1','live_with', 'no_of_child_above17', 'no_of_child_below17'];

var intValidate   = ['mobile_number','age','fk_curr_village_or_town_id','fk_id_proof_type_id','fk_current_address_proof_type_id','fk_bank_account_type_id1',
			'fk_purpose_id','fk_product_id_loan','biz_no_of_yrs','fk_biz_village_or_town','biz_pincode','biz_office_address_landline_number',
			'fk_family_member_education_type_id_1'];
var floatValidate = ['application_loan_amount','rent_pay_month'];

var radioValidate = ['gender','relation','biz_localbody_app'];

var selectOptionValidate = ['fk_family_member_education_type_id_1', 'marital_status'];

