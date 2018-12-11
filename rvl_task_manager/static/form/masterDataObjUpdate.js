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
var masterStateArrayDic		   = {};
var masterVillageArrayDic	   = {};

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
	
	/*masterStateArray*/
	for(var i = 0; i< masterData.masterStateArray.length; i++){
		if(masterData.masterStateArray[i].state_code){
			var id   = masterData.masterStateArray[i].state_code;
			var name = masterData.masterStateArray[i].state_name;			
			masterStateArrayDic[id] = name;
		}
	}	
	
	/*masterVillageArray*/
	for(var i = 0; i< masterData.masterVillageArray.length; i++){
		if(masterData.masterVillageArray[i].village_id){
			var id   = masterData.masterVillageArray[i].village_id;
			var name = masterData.masterVillageArray[i].village_name;			
			masterVillageArrayDic[id] = name;
		}
	}			
}

