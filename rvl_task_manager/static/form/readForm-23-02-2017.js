$("body").on('click', ".wrap", function(){
    $(".popup").fadeOut();
})

jQuery(document).ready(function($) {
    $('.dropDownHook span').on('click', function() {
        $(this).parents('.dropDownHook').children('.dropDownContent').stop(true, true).slideToggle('medium', function() {
            if ($('.dropDownContent').is(':visible')) {
            }
            else {
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

function showPopup1111(imgSrc) {
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

function changeForms22(d){
	$('.label-text.active').attr("class","label-text");
	$('#label-text'+d).attr("class","label-text active");
}

function isInt22(n){
	return Number(n) === n && n % 1 === 0;
}

function isFloat22(n){
	return n === Number(n) && n % 1 !== 0;
}

window.onload = function(){

 	memberdetails = memberdetails.replace(/\\/g,"/"); 	
	if(memberdetails){
		data = JSON.parse(memberdetails);
	}

	var FOOTER_HTML ='';
	if(taskName == "Verify KYC Document"){
		FOOTER_HTML = '<textarea style="width:90%;height:20%;background-color:white;font-size: 11px;" id="comments"    placeholder="Comments"></textarea><font class="mandatory">*</font>'
				    +'<div style="padding-top:1%;">'
					+'<a href="javascript:void(0)" onclick="window.location='+"'/tasks/'"+'" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Cancel Verify KYC Document'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessForm('+"'Rejected','4'"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Reject'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessForm('+"'Rework','2'"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-backward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Rework'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessForm('+"'Approved','1'"+');"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-forward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Verify'
					+'</a>'
				    +'</div>';
	}
	if(taskName == "Verify Loan Document"){
		FOOTER_HTML = '<textarea style="width:90%;height:20%;background-color:white;font-size: 11px;" id="comments"    placeholder="Comments"></textarea><font class="mandatory">*</font>'
				    +'<div style="padding-top:1%;">'
					+'<a href="javascript:void(0)" onclick="window.location='+"'/tasks/'"+'" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Cancel Verify Loan Document'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessFormApproval('+"'Rejected','4'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Reject'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessFormApproval('+"'Rework','2'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-backward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Rework'
					+'</a>'
					+'<a href="javascript:void(0)" onclick="submitProcessFormApproval('+"'Approved','1'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-forward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					   +'Approve'
					+'</a>'
				    +'</div>';
		
	}
	if(taskName == "Verify KA Loan Document"){
		FOOTER_HTML = '<textarea style="width:90%;height:20%;background-color:white;font-size: 11px;" id="comments"    placeholder="Comments"></textarea><font class="mandatory">*</font>'
				    +'<div style="padding-top:1%;">'
					+'<a href="javascript:void(0)" onclick="window.location='+"'/tasks/'"+'" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Cancel Verify KA Loan Document'
					+'</a>'
					+'<a href="javascript:void(0)" 	onclick="submitProcessKALoanApproval('+"'Rejected','4'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Reject'
					+'</a>'
					+'<a href="javascript:void(0)" 	onclick="submitProcessKALoanApproval('+"'Rework','2'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					  +'<i class="icon-entypo-backward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Rework'
					+'</a>'
					+'<a href="javascript:void(0)" 	onclick="submitProcessKALoanApproval('+"'Approved','1'"+');" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
					   +'<i class="icon-entypo-forward" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
					    +'Approve'
					+'</a>'
				    +'</div>';
		
	}	
	
	document.getElementById('colomn-div-footer').innerHTML = FOOTER_HTML; 

	if(screenHeight){
		var height = screenHeight*(0.9);
		var slipHeight = height/3;
		$('body').height((height*(0.80)));
		$('.task-div').height((height*(0.80)));
		$('.main-task').height((height*(0.80)));
		$('#right-pane-task').height((height));
		$('#right-pane-task-detail').height((height*(0.75)));
		$('#right-pane-task-document-list').height((height*(0.795)));
		$('#right-pane-task-comment-list').height((height*(0.795)));
		//document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-min";
		//document.getElementById("right-pane-task-document-list").className = "right-pane-task-comment-list comment-min";
		document.getElementById('right-pane-task-detail').style.overflowY = 'auto';
		if(document.getElementById('right-pane-task-comment-list')){
			document.getElementById('right-pane-task-comment-list').style.overflowY = 'auto';
		}
	}

	//masterDataLoad();		/*Function in masterDataLoad.js	*/
	setSelectOptionInForm();	/*Function in masterDataLoad.js	*/
	loadingReadMlCompositeData();	/*Function in readFrom.js	*/
	imagePopUp();			/*Function in masterDataLoad.js	*/
}   

function loadingReadMlCompositeData(){

	var keyFields = Object.keys(data.mlcompositeArray[0]);
	var arrayKeys = ['alfNodeArray','memberAssetArray', 'memberNetworkArray', 'idProofArray', 'businessStaffArray','memberFamilyArray','phoneNumberArray'];
	var imgFiles  = ['member_bank_fk_alf_node_ref','member_bank_fk_alf_node_ref1','biz_address_fk_alf_node_ref','biz_address_fk_alf_node_ref1',
			'biz_id_alf_node_ref', 'biz_id_alf_node_ref1', 'alf_node_ref', 'alf_node_ref1', 'current_address_fk_alf_node_ref','current_document_url' ];	

	/*For Comments*/
	var objData = data.mlcompositeArray[0];
	var html='<label class="comment-user" >No Comments</label>'; 	
	if(objData['mlValidationArray'].length>0){
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
	document.getElementById('comment-list-pane').innerHTML = html;
		
	/*For data Loading*/			
	for(var i = 0; i<arrayKeys.length;i++){
		if(objData[arrayKeys[i]]){
			for(var j = 0; j<objData[arrayKeys[i]].length; j++){
				var data_select = data.mlcompositeArray[0][arrayKeys[i]][j];
				var objKeys 	= Object.keys(data.mlcompositeArray[0][arrayKeys[i]][j]);
				for( var k = 0; k < objKeys.length ; k++ ){
					if( data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] || (data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] == 0) ){
						if(document.getElementById(objKeys[k]+'_'+(j+1))){

							if($.inArray(objKeys[k], selectionFields) != -1){
								$("#"+objKeys[k]+"_"+(j+1)+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] == 0)
									data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] = "";	
								document.getElementById(''+objKeys[k]+"_"+(j+1)+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
								
								if(selectionFieldMasters[objKeys[k]]){
									if(selectionFieldMasters[objKeys[k]][data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]]){						
										document.getElementById(''+objKeys[k]+"_"+(j+1)+'').innerHTML = selectionFieldMasters[objKeys[k]][data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]];
									}
								}
							}else{
								$("#"+objKeys[k]+"_"+(j+1)+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
								document.getElementById(''+objKeys[k]+"_"+(j+1)+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
							}
						}
						if(arrayKeys[i] == 'idProofArray'){
							if(j && data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								$('#id_proof_'+(j+1)).css('display','block');
							if(document.getElementById(objKeys[k]+"_img_pop_"+(j+1))){
								$('#'+objKeys[k]+'_img_pop_'+(j+1)+"").attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]+'?alf_ticket='+alf_token);
							}
							
						}
						if(arrayKeys[i] == 'phoneNumberArray'){
							if(j && data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								$('#mob_div_'+(j+1)).css('display','block');
							if(document.getElementById("mobile_number"+"_"+(j+1))){
								document.getElementById('mobile_number'+"_"+(j+1)+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j]["number"];
							}
						}
						if(arrayKeys[i] == 'emailIdArray'){
							if(j && data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								$('#email_div_'+(j+1)).css('display','block');
							if(document.getElementById("email"+"_"+(j+1))){
								document.getElementById('email'+"_"+(j+1)+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j]["email"];
							}
						}
						if(arrayKeys[i] == 'alfNodeArray'){
							if(j && data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
								$('#shopImgDiv_'+(j+1)).css('display','inline-block');
							if(document.getElementById(objKeys[k]+'_'+(j+1)+'_img_pop')){
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
									$('#'+objKeys[k]+'_'+(j+1)+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]+'?alf_ticket='+alf_token);
							}
							if(document.getElementById(objKeys[k]+'_'+(j+1)+'_img_pop_shop')){
								if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]])
									$('#'+objKeys[k]+'_'+(j+1)+'_img_pop_shop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]+'?alf_ticket='+alf_token);
							}
						
						}
						//Modified by vickram on 13-02-2017
						/*For IMages src*/
						/*if(document.getElementById(''+objKeys[k]+'_'+(j+1)+'_img_pop')){
							console.log("\nobjKeys");
							console.log(''+objKeys[k]+'_'+(j+1)+'_img_pop');
						        if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]){	
						        	/*Addded
								$('#'+objKeys[k]+"_"+(j+1)+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]+'?alf_ticket='+alf_token);
								//$('#'+objKeys[k]+"_"+(j+1)+'_img_pop').attr("src", 'http://madura.scimergent.com:8080/share/proxy/alfresco/api/node/workspace/SpacesStore/f0466be5-6918-4e29-9bd1-148c1779ce33/content/image/doclib?ph=true');
								
								
							}
						}*/

						//End modification by vickram on 13-02-2017	
						if(document.getElementById(''+objKeys[k] +'')){ 
							if($.inArray(objKeys[k], selectionFields) != -1){
								document.getElementById(''+objKeys[k]+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
								if(selectionFieldMasters[objKeys[k]]){
									if(selectionFieldMasters[objKeys[k]][data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]]){						
										document.getElementById(''+objKeys[k]+'').innerHTML = selectionFieldMasters[objKeys[k]][data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]];
									}
								}
							}else{
								$("#"+objKeys[k]+" select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
								document.getElementById(''+objKeys[k]+'').innerHTML = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
							}
						}	
							//Modified by vickram on 13-02-2017
						/*if(document.getElementById(objKeys[k]+'_img_pop')){ 	
							/*For IMages src
							if(document.getElementById(''+objKeys[k]+'_img_pop')){
							        if(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]){
									$('#'+objKeys[k]+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]+'?alf_ticket='+alf_token);									
									//$('#'+objKeys[k]+'_img_pop').attr("src", data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);																		
								}
							}
						}*/	
						//End modification by vickram on 13-02-2017			
					}
				}
			}
		}
	}

	for(var i = 0; i<keyFields.length;i++){
		if(($.inArray(keyFields[i], arrayKeys) == -1)){// && ($.inArray(keyFields[i], imgFiles) == -1)
			if(document.getElementById(''+keyFields[i]+'')){
				if( data.mlcompositeArray[0][keyFields[i]]  ||  (data.mlcompositeArray[0][keyFields[i]]==0) ){
					if($.inArray(keyFields[i], selectionFields) != -1){

						document.getElementById(''+keyFields[i]+'').innerHTML = (data.mlcompositeArray[0][keyFields[i]]);
						if(selectionFieldMasters[keyFields[i]]){
							if(selectionFieldMasters[keyFields[i]][data.mlcompositeArray[0][keyFields[i]]]){						
								document.getElementById(''+keyFields[i]+'').innerHTML = selectionFieldMasters[keyFields[i]][data.mlcompositeArray[0][keyFields[i]]]
							}
						}
					}else{
						if(document.getElementById(keyFields[i])){
							if(data.mlcompositeArray[0][keyFields[i]] == 0)
								data.mlcompositeArray[0][keyFields[i]] = "";
							document.getElementById(keyFields[i]).innerHTML = data.mlcompositeArray[0][keyFields[i]];
						}
					}
				}
			}
			//Modified by vickram on 13-02-2017
			/*For IMages src*/
			if(document.getElementById(keyFields[i]+'_img_pop') && data.mlcompositeArray[0][keyFields[i]]){
				if(data.mlcompositeArray[0][keyFields[i]]){	
					$('#'+keyFields[i]+'_img_pop').attr("src", data.mlcompositeArray[0][keyFields[i]]+'?alf_ticket='+alf_token);
					//$('#'+keyFields[i]+'_img_pop').attr("src", data.mlcompositeArray[0][keyFields[i]]);					
				}
			}
			//End modification by vickram on 13-02-2017
		}
	}
	/*For  Loading Master State, District, Taluk and Village*/
		var keyFields = Object.keys(data.mlcompositeArray[0]);
				  
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

		/*Getting State Name from id Which is already in the master Data*/
		var AddressArray = ['current','biz'];
		for(var i=0; i<AddressArray.length; i++ ){
			document.getElementById(''+AddressArray[i]+'_state').innerHTML = state[eval(''+AddressArray[i]+'_state_id')];
		}    	
		/*Ajax Call to for District, Taluk and Village of Current and Business Address */
		if(current_state_id || biz_state_id){
			/*District and Taluk */
			var url = "/masterLocation/";
			$.ajax({
				url		:  url	,
				type	: 'post',
				dataType	: 'json',
				success	: function (masterLocationData) {
				    /* Load Taluk Data*/
					if( masterLocationData ){
						data 		= masterLocationData;	
						talukndx  		= crossfilter(data);		//--> set Taluk Values into cross filter
						all 		= talukndx.groupAll();
						talukDim  = talukndx.dimension(function (d) {		//--> Create Dimension for a taluk
							return  d.taluk_code;
					});		
					filteredTalukData = talukDim.filter(current_taluk_id).top(Infinity);    	    	
					filteredTalukDataBiz = talukDim.filter(biz_taluk_id).top(Infinity);    	    	
					if(document.getElementById('current_district') || document.getElementById('biz_district')){ 
					    document.getElementById('current_district').innerHTML 	= filteredTalukData[0].district_name;
					    document.getElementById('biz_district').innerHTML 	= filteredTalukDataBiz[0].district_name;
					}
					if(document.getElementById('current_taluk') || document.getElementById('biz_taluk')){ 
					    document.getElementById('current_taluk').innerHTML 		= filteredTalukData[0].taluk_name;
					    document.getElementById('biz_taluk').innerHTML 	= filteredTalukDataBiz[0].taluk_name;
					}
					/*Load Village Data of Current Address and business address*/
					var url = "/villageDetails/";
					$.ajax({
						url	:  url	,
						type	: 'post',
						dataType: 'json',
						success	: function (villageData) {
							if( villageData ){
								data 	= villageData;	
								villageNDX 	= crossfilter(villageData);	
								villageDim 	= villageNDX.dimension(function (d) {		//--> Create Dimension for a taluk
									return  d.village_code;
							});
							filteredVillageData = villageDim.filter(current_village_id).top(Infinity);
							filteredVillageDataBiz = villageDim.filter(biz_village_id).top(Infinity);
							if(filteredVillageData){
								if(filteredVillageData[0]){
							    	if(document.getElementById('fk_curr_village_or_town_id') || document.getElementById('fk_biz_village_or_town')){ 
								   		document.getElementById('fk_curr_village_or_town_id').innerHTML = filteredVillageData[0].village_name;
								   		document.getElementById('fk_biz_village_or_town').innerHTML = filteredVillageDataBiz[0].village_name;
									}
								}	
							}
						}		
					},
					data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+filteredTalukData[0].taluk_code+"/t"
					});
				}		
				},
				data: "madura-coreservice/rest/api/readmasterloc/mlocdetail/"+current_state_id+"/s"
			});
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

function setURL(id){
		var id_split  = id.split('_');	
		var inp_img_id = id.substring(0,(id.length-1));	
		var id_select = id_split[id_split.length-1];
		var inp_url_id =  inp_img_id+"url_"+id_select;
		$("#"+id).change(function(){
			document.getElementById(inp_url_id).value = this.value;
			readURL(this, inp_img_id+"img_"+id_select);
		});
}



function imagePopUp22(){

	/*ID proof*/
	$(".alf_node_ref_img").change(function(){
		readURL(this, 'alf_node_ref_img_pop');
	});

	$(".alf_node_ref1_img").change(function(){
		readURL(this, 'alf_node_ref1_img_pop');
	});

	/*Address proof*/
	$(".current_document_url_img").change(function(){
		readURL(this, 'current_document_url_img_pop');
	});
	$(".current_address_fk_alf_node_ref_img").change(function(){
		readURL(this, 'current_address_fk_alf_node_ref_img_pop');
	});

	/*Bank Address proof*/
	$(".member_bank_fk_alf_node_ref_img").change(function(){
		readURL(this, 'member_bank_fk_alf_node_ref_img_pop');
	});
	$(".member_bank_fk_alf_node_ref1_img").change(function(){
		readURL(this, 'member_bank_fk_alf_node_ref1_img_pop');
	});

	/*Business proof*/
	$(".biz_address_fk_alf_node_ref_img").change(function(){
		readURL(this, 'biz_address_fk_alf_node_ref_img_pop');
	});
	$(".biz_address_fk_alf_node_ref1_img").change(function(){
		readURL(this, 'biz_address_fk_alf_node_ref1_img_pop');
	});

	/*Business proof*/
	$(".biz_id_alf_node_ref_img").change(function(){
		readURL(this, 'biz_id_alf_node_ref_img_pop');
	});
	$(".biz_id_alf_node_ref1_img").change(function(){
		readURL(this, 'biz_id_alf_node_ref1_img_pop');
	});
	
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
	
	$(".file_img").on('click',function (){
	    var theSrc = $(this).attr('src');
	    showPopup(theSrc);
	});
	
	$(".popup").on('click', ".wrap", function(){
	    $(".popup").fadeOut();
	})
}

/*For KA Loan Process*/
function submitProcessKALoanApproval(d,val){
	var processupdate = {"variables": {"KALoanDoc_Verify_Status" : {"value" : ""+d+""}}    };
	var dataObj = {};

	var currentDateValue  = (new Date());
	currentDateValue = JSON.stringify(currentDateValue);
	currentDateValue = currentDateValue.replace(/"/g,'');

	var remarks = document.getElementById('comments').value;
	
	if(remarks.length < 1){
		alert('Please type Comments to Resolve Query');
		return false;
	}
		
	var LoanId = processObj.LoanId.value;
	var MemberId = processObj.MemberId.value;

	var remarksData =    { 
				"validation_member_id" : parseInt(MemberId),
				"validation_loan_id" : parseInt(LoanId),
				"validation_type" : parseInt(1),
				"validation_level": parseInt(1),
				"validation_status" :parseInt(val),
				"remarks" : remarks, 
				"process_id" : processid,
				"task_id" : taskid,
				"validation_fk_last_modified_by": parseInt(userid),
				"validation_last_modified_date": currentDateValue,
				"validation_fk_sci_client_id": parseInt(1)
			     };

	dataObj['process'] = processupdate;
	dataObj['processid'] = processid;
	dataObj['taskid'] = taskid;
	dataObj['taskremarks'] = remarksData;

	/*Loading IMages*/	
	var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">'
		 +'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			    +'</div>'
		+'</div>';
	$(".popup").empty().append(theImg).fadeIn();	
	
	$.ajax({
		url: '/updateVerificationtaskprocess/'+d+'',
		type: 'post',
		dataType: 'json',
		success: function(data){
			$(".popup").fadeOut();
			if(data.message == "Successful"){
				window.location='/tasks/';
			}else{
				alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
			}
		},
		data: JSON.stringify(dataObj)
	});
}

function submitProcessFormApproval(d,val){
	var processupdate = {"variables": {"LoanDoc_Verify_Status" : {"value" : ""+d+""}}    };
	var dataObj = {};

	var currentDateValue  = (new Date());
	currentDateValue = JSON.stringify(currentDateValue);
	currentDateValue = currentDateValue.replace(/"/g,'');

	var remarks = document.getElementById('comments').value;
	var LoanId = processObj.LoanId.value;
	var MemberId = processObj.MemberId.value;

	var remarksData =    { 
				"validation_member_id" 	: parseInt(MemberId),
				"validation_loan_id" 	: parseInt(LoanId),
				"validation_type" 	: parseInt(1),
				"validation_level"	: parseInt(1),
				"validation_status" 	: parseInt(val),
				"remarks" 		: remarks, 
				"process_id" 		: processid,
				"task_id" 		: taskid,
				"validation_fk_last_modified_by"	: parseInt(userid),
				"validation_last_modified_date"		: currentDateValue,
				"validation_fk_sci_client_id"		: parseInt(1)
			     };

	dataObj['process'] = processupdate;
	dataObj['processid'] = processid;
	dataObj['taskid'] = taskid;
	dataObj['taskremarks'] = remarksData;

	$.ajax({
		url: '/updateVerificationtaskprocess/'+d+'',
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

function submitProcessForm(d,val){

	var currentDateValue  = (new Date());
	currentDateValue = JSON.stringify(currentDateValue);
	currentDateValue = currentDateValue.replace(/"/g,'');

	var processupdate = {"variables": { "Application_Status" : { "value" : ""+d+""}}  };
	var dataObj = {};

	var remarks = document.getElementById('comments').value;
	var LoanId = processObj.LoanId.value;
	var MemberId = processObj.MemberId.value;

	var remarksData =    { 
				"validation_member_id" 	: parseInt(MemberId),
				"validation_loan_id" 	: parseInt(LoanId),
				"validation_type" 	: parseInt(1),
				"validation_level"	: parseInt(1),
				"validation_status" 	: parseInt(val),
				"remarks" 		: remarks, 
				"process_id" 		: processid,
				"task_id" 		: taskid,
				"validation_fk_last_modified_by": 1,//parseInt(userid),/*USERNAME REPLACE*/
				"validation_last_modified_date"	: currentDateValue,
				"validation_fk_sci_client_id"	: parseInt(1)
			     };

	dataObj['process'] = processupdate;
	dataObj['processid'] = processid;
	dataObj['taskid'] = taskid;
	dataObj['taskremarks'] = remarksData;

	$.ajax({
		url: '/updateVerificationtaskprocess/'+d+'',
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
