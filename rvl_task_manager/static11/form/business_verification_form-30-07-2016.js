var avroObj = {};


function submitBvrForm(){
	console.log('submitForm 1');
	var url = "/submit/";
	
	/*************** Business Verification Report  ****************/
	/*MMFL*/
	//var biz_verification_id				= document.getElementById("biz_verification_id").value;
	//var member_id					= document.getElementById("member_id").value;
	//var loan_id					= document.getElementById("loan_id").value;	
	//var date					= document.getElementById("date").value;	
	//var branch_name					= document.getElementById("branch_name").value;
	//var time_in					= document.getElementById("time_in").value;	
	//var time_out					= document.getElementById("time_out").value;	
	//var user_id					= document.getElementById("user_id").value;		

	

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
	var shop_photo_with_the_applicant		= document.getElementById("shop_photo_with_the_applicant").value;	
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

	/*Business verification report json data*/
	var dataObj_bvr = {
		"member_id" 				: parseInt(member_id),
		"loan_id"				: parseInt(loan_id),		
		"date" 					: currentDateValueDateOnly,
		"branch_name" 				: "",
		"time_in" 				: timeIn,
		"time_out" 				: timeOut,
		"user_id"				: user_id,
		//"user_id"				: 1,

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
						"disbributor_supplied_products"	: distributor_supplied_products,/*errror*/
						"relationship_in_years"		: parseInt(relationship_in_years),
						"distributor_supplies_mon_avg"	: parseInt(distributor_supplies_mon_avg),
						"distributor_type_of_sale"	: distributor_type_of_sale,
						"distributor_credit_period_in_days": parseInt(distributor_credit_period_in_days),
						"customer_behaviour"		: customer_behaviour,
						"shop_photo_with_the_applicant"	: shop_photo_with_the_applicant
						}]
						
			};		
		

		var dataArr_bvr = {
				"businessVerificationArray": [	dataObj_bvr ]
			};
	
		/*JSON data for AVRO form*/		
		var processupdate = {'variables': {'Business_Verification_Status' : {'value' : 'New'}}    };		
		var biz_data = {};
		biz_data["form_data"]	 = dataArr_bvr;
		biz_data["task_id"]  	 = task_id;
		biz_data["process_data"] = processupdate;			
			
		$.ajax({
		    url: '/submitBusinessForm/submitBusinessFormAdd',
		    type: 'post',
		    dataType: 'json',
		    success: function (data) {
			console.log("data");
			console.log(data);
			window.location='/tasks/';
		    },
		    error: function(error) {
			console.log(error);
		    },
		    data: JSON.stringify(biz_data)
		});






	}
