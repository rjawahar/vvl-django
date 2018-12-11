function setScreenHeightWithComments(){
	$(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    var screenHeight = $(window).height();
    var screenwidth = $(window).width();
    if (screenHeight) {
        var height = screenHeight * (0.9);
        var slipHeight = height / 3;
        $('body').height((height * (0.80)));
        $('.task-div').height((height * (0.80)));
        $('.main-task').height((height * (0.80)));
        $('#right-pane-task').height((height));
        $('#right-pane-task-detail').height((height * (0.895)));
        $('#right-pane-task-comment-list').height((height * (0.895)));
        $('#right-pane-task-document-list').height((height * (0.895)));
        document.getElementById('right-pane-task-detail').style.overflowY = 'auto';
    }
    if ($(window).width() >= 601) {
        $('.comment-toggle').on('click', function() {

            var tastDetails = document.getElementById("right-pane-task-detail").className;
            var docDetails = document.getElementById("right-pane-task-document-list").className;
            var commDetails = document.getElementById("right-pane-task-comment-list").className;

            if (tastDetails == "right-pane-task-detail detail-max" && docDetails == "right-pane-task-document-list comment-min" && commDetails == "right-pane-task-comment-list comment-min") {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-min";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-max";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-min";
            } else if (tastDetails == "right-pane-task-detail detail-min" && docDetails == "right-pane-task-document-list comment-min" && commDetails == "right-pane-task-comment-list comment-max") {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-max";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-min";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-min";
            } else {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-min";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-max";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-min";
            }
        });
        $('.document-toggle').on('click', function() {

            var tastDetails = document.getElementById("right-pane-task-detail").className;
            var docDetails = document.getElementById("right-pane-task-document-list").className;
            var commDetails = document.getElementById("right-pane-task-comment-list").className;
            if (tastDetails == "right-pane-task-detail detail-max" && docDetails == "right-pane-task-document-list comment-min" && commDetails == "right-pane-task-comment-list comment-min") {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-min";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-max";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-min";

            } else if (tastDetails == "right-pane-task-detail detail-min" && docDetails == "right-pane-task-document-list comment-max" && commDetails == "right-pane-task-comment-list comment-min") {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-max";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-min";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-min";
            } else {
                document.getElementById("right-pane-task-detail").className = "right-pane-task-detail detail-min";
                document.getElementById("right-pane-task-comment-list").className = "right-pane-task-comment-list comment-min";
                document.getElementById("right-pane-task-document-list").className = "right-pane-task-document-list comment-max";
            }
        });
    }
    if ($(window).width() <= 600) {
        $('.comment-toggle').on('click', function() {
            $('#commentsModal').css('display', 'block');
        });
        $('.close').on('click', function() {
            $('#commentsModal').css('display', 'none');
        });

        commentsPopUp(json_data);

        $('.document-toggle').on('click', function() {
            $('#documentsModal').css('display', 'block');
        });
        $('.close').on('click', function() {
            $('#documentsModal').css('display', 'none');
        });
        window.onclick = function(event) {
            if (event.target == document.getElementById('documentsModal')) {
                $('#documentsModal').css('display', 'none');
            }
            if (event.target == document.getElementById('commentsModal')) {
                $('#commentsModal').css('display', 'none');
            }
        }
        documentsPopUp(json_data);

    }
    $(function() {
        $("#tabs").tabs();
    });
    $("#upload_doc_tag").click(function() {
            $("#upload_doc_content").slideToggle("slow");
    });

}

function commentsPopUp(json_data){
	var objData = json_data.mlcompositeArray[0];
	/*For Comments */
	var html='<label class="comment-user" >No Comments</label>'; 	
	if(objData['mlValidationArray'][0]){
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
	if($(window).width() <= 600){
		if(document.getElementById('commentsTab')){
			document.getElementById('commentsTab').innerHTML = html;	
		}
	}
}

function documentsPopUp(json_data){
	var doc_array = {};
    var imgFiles = {
        'member_bank_fk_alf_node_ref': "Bank Pass Book Image 1",
        'member_bank_fk_alf_node_ref1': "Bank Pass Book Image 2",
        'biz_id_alf_node_ref': "Business Identity Doc 1",
        'biz_id_alf_node_ref1': "Business Identity Doc 2"
    };
    var idProofArray = [];
    var alfNodeArray=[];
    var html = '<label class=doc-user" >No documents</label>';

    if (json_data.updocArray || json_data.mlcompositeArray) {
        html = '';
		if (json_data.mlcompositeArray[0].documentsArray) {
	        if (json_data.mlcompositeArray[0].documentsArray){//json_data.documentsArray[0]) {
	            for (var i = 0; i < json_data.mlcompositeArray[0].documentsArray.length; i++) {
	                var document_Name = json_data.mlcompositeArray[0].documentsArray[i].doc_status;
	                var document_url = json_data.mlcompositeArray[0].documentsArray[i].doc_url;
	                if(document_url != "Document Not Attached"){
	                	html += '<div id="document-pane" class="document-pane">' + '<div class="document-list-pane">' + '<label class="entypo-check" style="color:black;width:60%;padding-left:10%;font-weight:normal;">' + " " + document_Name + '</label>' + '<a href="' + document_url + '?alf_ticket=' + alf_token + '" class="file_img"> <i class="fa fa-file" aria-hidden="true" style="color:#981b1b;font-size:20px;"></i></a>' + '</div>' + '</div>';
	            	}
	            }
	        }
	    }
        if (json_data.mlcompositeArray) {
            if (json_data.mlcompositeArray[0]) {
                var objData = json_data.mlcompositeArray[0];
                var keys = Object.keys(json_data.mlcompositeArray[0]);
                var imgFiles_keys = Object.keys(imgFiles);
                for (var i = 0; i < keys.length; i++) {
                    for (var j = 0; j < imgFiles_keys.length; j++) {
                        if (keys[i] == imgFiles_keys[j]){
                            doc_array[imgFiles[imgFiles_keys[j]]] = json_data.mlcompositeArray[0][keys[i]];
                        }
                    }
					if(keys[i]=="alfNodeArray"){
						for(var k=0;k<json_data.mlcompositeArray[0]["alfNodeArray"].length;k++){
							if(json_data.mlcompositeArray[0]["alfNodeArray"][k]){
								var id_obj = {};
								id_obj["Shop Image "+(k+1)] =json_data.mlcompositeArray[0]["alfNodeArray"][k]['alf_node_ref'];
								alfNodeArray.push(id_obj);
								doc_array["alfNodeArray"] = alfNodeArray;
							}
						}
					}		
                    if (keys[i] == "idProofArray"){
                        for (var k = 0; k < json_data.mlcompositeArray[0]["idProofArray"].length; k++) {
                            if (json_data.mlcompositeArray[0]["idProofArray"][k]) {
                                var id_obj = {};
                                id_obj[masterIdProofArrayDic[json_data.mlcompositeArray[0]["idProofArray"][k]['fk_id_proof_type_id']] + ' ( I ) ' + ""] = json_data.mlcompositeArray[0]["idProofArray"][k]['alf_node_ref'];;
                                id_obj[masterIdProofArrayDic[json_data.mlcompositeArray[0]["idProofArray"][k]['fk_id_proof_type_id']] + ' ( II ) ' + ""] = json_data.mlcompositeArray[0]["idProofArray"][k]['alf_node_ref1'];;
                                idProofArray.push(id_obj);
                                doc_array["idProofArray"] = idProofArray;
                            }
                        }
                    }
                }
            }
           for(var key in doc_array){
				if(key != 'idProofArray' && key != 'alfNodeArray'){
					html +='<div id="document-pane" class="document-pane">'
						+'<div class="document_list_pane">'
						+'<label class="entypo-check" style="color:black;width:60%;padding-left:10%;font-weight:normal;">'+" "+key+'</label>'
						+'<a href="'+doc_array[key]+'?alf_ticket='+alf_token+'" class="file_img" target="_blank"><i class="fa fa-file" aria-hidden="true" style="color:#981b1b;font-size:20px;"></i></a>'
						+'</div>'
						+'</div>';
				}
			}
			if(doc_array['idProofArray']){
				for(var i=0;i<doc_array['idProofArray'].length;i++){
					var id_Arr = doc_array['idProofArray'][i];
					for(var key in id_Arr){
						html +='<div id="document-pane" class="document-pane">'
						+'<div class="document-list-pane">'
						+'<label class="entypo-check" style="color:black;width:60%;padding-left:10%;font-weight:normal;">'+" "+capitalise(key)+'</label>'
						+'<a href="'+id_Arr[key]+'?alf_ticket='+alf_token+'" class="file_img" target="_blank"><i class="fa fa-file" aria-hidden="true" style="color:#981b1b;font-size:20px;"></i></a>'
						+'</div>'
						+'</div>';	
					}
				}
			}
			if(doc_array['alfNodeArray']){
				for(var i=0;i<doc_array['alfNodeArray'].length;i++){
					var id_Arr = doc_array['alfNodeArray'][i];
					for(var key in id_Arr){
						html +='<div id="document-pane" class="document-pane">'
						+'<div class="document-list-pane">'
						+'<label class="entypo-check" style="color:black;width:60%;padding-left:10%;font-weight:normal;">'+" "+key+'</label>'
						+'<a href="'+id_Arr[key]+'?alf_ticket='+alf_token+'" class="file_img" target="_blank"><i class="fa fa-file" aria-hidden="true" style="color:#981b1b;font-size:20px;"></i></a>'
						+'</div>'
						+'</div>';	
					}	
				}
			}
		}
	}
	if(document.getElementById('document-list-pane')){
		document.getElementById('document-list-pane').innerHTML = html;
	}
	
	if($(window).width() <= 600){
		if(document.getElementById('documentsTab')){
			document.getElementById('documentsTab').innerHTML = html;	
		}
	}
	
}

function capitalise(string) {
  	 return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// DATA PAINTING FUNTION OF ASSESS VERIFICATION REPORT
function paintAssessVerificationData() {
    arr = {};
    var dataName = Object.keys(allData);
    var residenceArray = ["memberid_res", "loanid_res", "applicant_name_res", "current_address_res", "live_with_res", "mobile_number_res", "no_of_children_res", "business_address_res", "biz_office_address_mobile_number_res", "biz_nature_res", "biz_no_of_yrs_res", "biz_location_res", "rent_pay_month_res"];
    var businessArray = ["memberid_biz", "loanid_biz", "applicant_name_biz", "current_address_biz", "live_with_biz", "mobile_number_biz", "no_of_children_biz", "business_address_biz", "biz_office_address_mobile_number_biz", "biz_nature_biz", "biz_no_of_yrs_biz", "biz_location_biz", "rent_pay_month_biz"];

    for (var memberDataIndex in dataName) {
        var dateNameObj = (dataName[memberDataIndex]);
        var obj = allData[dateNameObj][0];
        for (var key in obj) {
            arr[key] = obj[key];
            if (key == "family_member_with_residence_photo1" && document.getElementById('res-photo-pop')) {
                if (arr[key] != "") {
                    $('#res-photo-pop').attr("src", obj[key] + '?alf_ticket=' + alf_token);
                    $('#resPhoto').css('display', 'block');
                }
            }
            if (key == "family_member_with_residence_photo2" && document.getElementById('res-photo-pop1')) {
                if (arr[key] != "") {
                    $('#res-photo-pop1').attr("src", obj[key] + '?alf_ticket=' + alf_token);
                    $('#resPhoto').css('display', 'block');
                }
            }
            if (key == "family_member_with_residence_photo3" && document.getElementById('res-photo-pop2')) {
                if (arr[key] != "") {
                    $('#res-photo-pop2').attr("src", obj[key] + '?alf_ticket=' + alf_token);
                    $('#resPhoto').css('display', 'block');
                }
            }
            for (var i = 0; i < residenceArray.length; i++) {
                if (document.getElementById(residenceArray[i]))
                    if ((key + "_res") == residenceArray[i]) {
                        document.getElementById(residenceArray[i]).innerHTML = obj[key];
                        document.getElementById(businessArray[i]).innerHTML = obj[key];
                    }
                if (key == "firstname") {
                    document.getElementById('applicant_name_res').innerHTML = obj['firstname'] + " " + obj['lastname'];
                    document.getElementById('applicant_name_biz').innerHTML = obj['firstname'] + " " + obj['lastname'];
                }
                if (key == "current_door_no" || key == "biz_door_no") {
                    document.getElementById('current_address_res').innerHTML = obj['current_door_no'] + ' , ' + obj['current_street_name'] + ' , ' + obj['current_location_name'] + ' , ' + obj['current_pincode'];
                    document.getElementById('current_address_biz').innerHTML = obj['current_door_no'] + ' , ' + obj['current_street_name'] + ' , ' + obj['current_location_name'] + ' , ' + obj['current_pincode'];
                    document.getElementById('business_address_res').innerHTML = obj['biz_door_no'] + ' , ' + obj['biz_street_name'] + ' , ' + obj['biz_location_name'] + ' , ' + obj['biz_pincode'];
                    document.getElementById('business_address_biz').innerHTML = obj['biz_door_no'] + ' , ' + obj['biz_street_name'] + ' , ' + obj['biz_location_name'] + ' , ' + obj['biz_pincode'];
                }
                if (key == "no_of_child_below17") {
                    var no_of_children = parseInt(obj['no_of_child_below17']) + parseInt(obj['no_of_child_above17']);
                    document.getElementById('no_of_children_res').innerHTML = no_of_children;
                    document.getElementById('no_of_children_biz').innerHTML = no_of_children;
                }
            }
            if (document.getElementById(key)){
                document.getElementById(key).innerHTML = obj[key];			 	// Assigning the value to the element
            }
            if (arr[key] != null && typeof(arr[key]) === 'object') { 			// Checking whether the value of key is object  
                var obj1 = arr[key];
                var keys = Object.keys(obj1);
                for (var i = 0; i < keys.length; i++) { 						//Looping till the length of inner array of objects in JSON   
                    var obj2 = obj1[i];
                    for (var key1 in obj2) {									// Looping through each and every array of object  							
                        if (key1 == "applicant_with_shop_photo1" && document.getElementById('shop-photo-img')) {
                            if (obj2[key1] != "") {
                                $('#shopPhoto').css('display', 'block');
                                $('#shop-photo-img').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                            }
                        }
                        if (key1 == "applicant_with_shop_photo2" && document.getElementById('shop-photo-img1')) {
                            if (obj2[key1] != "") {
                                $('#shopPhoto').css('display', 'block');
                                $('#shopPhoto').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                            }
                        }
                        if (key1 == "applicant_with_shop_photo3" && document.getElementById('shop-photo-img2')) {
                            if (obj2[key1] != "") {
                                $('#shopPhoto').css('display', 'block');
                                $('#shop-photo-img2').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                            }
                        }
                        if (document.getElementById(key1 + "_" + (i + 1) + "")){ 								// Checking whether the element exists in DOM 
                            document.getElementById(key1 + "_" + (i + 1) + "").innerHTML = obj2[key1]; 			// Assigning the value to the element	
                        }
                        if (document.getElementById(key1)){							 							// Checking whether the element exists in DOM 
                            document.getElementById(key1).innerHTML = obj2[key1]; 								// Assigning the value to the element
                        }
                    }
                }
            }
        }
    }imagePopUp();
   
}

function currentDate(){
    var d = new Date(); // for now
    var currentTime = (d.getHours() + ":" + d.getMinutes()).toString();

    var currentDateValue = (new Date());
    currentDateValue = JSON.stringify(currentDateValue);
    currentDateValue = currentDateValue.replace(/"/g, '');
    currentDateValue = currentDateValue.split('T')[0];
    return [currentDateValue,currentTime];
}



function loadData(){
	var arr = {};
	var dataName = Object.keys(json_data);
    for (var memberDataIndex in dataName) {
        var dateNameObj = (dataName[memberDataIndex]);
        var obj = json_data[dateNameObj][0];
        for (var key in obj) {
            arr[key] = obj[key];
       		if (document.getElementById(key)) {
                document.getElementById(key).innerHTML = obj[key];
            }
            if (key == "firstname") {
                document.getElementById('applicant_name').innerHTML = obj['firstname'] + " " + obj['lastname'];
            }
            if (key == "current_door_no" || key == "biz_door_no") {
                document.getElementById('current_address').innerHTML = obj['current_door_no'] + ' , ' + obj['current_street_name'] + ' , ' + obj['current_location_name'] + ' , ' + obj['current_pincode'];
                document.getElementById('business_address').innerHTML = obj['biz_door_no'] + ' , ' + obj['biz_street_name'] + ' , ' + obj['biz_location_name'] + ' , ' + obj['biz_pincode']; //document.getElementById('address').value=obj['current_door_no']+' , '+obj['current_street_name']+' , '+obj['current_location_name'];
            }
            if (key == "no_of_child_below17") {
                var no_of_children = parseInt(obj['no_of_child_below17']) + parseInt(obj['no_of_child_above17']);
                document.getElementById('no_of_children').innerHTML = no_of_children;
            }
            if (key == "family_member_with_residence_photo1" && obj[key] != "") {
                $("#" + key + "_id").css("display", "block");
                $('#res-photo-pop').attr("src", obj[key] + '?alf_ticket=' + alf_token);
            }
            if (key == "family_member_with_residence_photo2" && obj[key] != "") {
                $("#" + key + "_id").css("display", "block");
                $('#res-photo-pop1').attr("src", obj[key] + '?alf_ticket=' + alf_token);
            }
            if (key == "family_member_with_residence_photo3" && obj[key] != "") {
                $("#" + key + "_id").css("display", "block");
                $('#res-photo-pop2').attr("src", obj[key] + '?alf_ticket=' + alf_token);
            }
            console.log(typeof(key));
            if (arr[key] != null && typeof(arr[key]) === 'object') { // Checking whether the value of key is object  
                var obj1 = arr[key];
                var keys = Object.keys(obj1);
                for (var i = 0; i < keys.length; i++) { //Looping till the length of inner array of objects in JSON   
                    var obj2 = obj1[i];
                    for (var key1 in obj2) { // Looping through each and every array of object  
                    	if (key1 == "applicant_with_shop_photo1" && obj2[key1] != "") {
                            $("#" + key1 + "_id").css("display", "inline-block");
                            $('#shop-photo-img').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                        }
                        if (key1 == "applicant_with_shop_photo2" && obj2[key1] != "") {
                            $("#" + key1 + "_id").css("display", "inline-block");
                            $('#shop-photo-img1').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                        }
                        if (key1 == "applicant_with_shop_photo3" && obj2[key1] != "") {
                            $("#" + key1 + "_id").css("display", "inline-block");
                            $('#shop-photo-img2').attr("src", obj2[key1] + '?alf_ticket=' + alf_token);
                        }
                         console.log(key1);
                        if (document.getElementById(key1 + "_" + (i + 1) + "")) { // Checking whether the element exists in DOM 
                        console.log(key1);
                            document.getElementById(key1 + "_" + (i + 1) + "").innerHTML = obj2[key1]; // Assigning the value to the element	
                        }
                        if (document.getElementById(key1)) { // Checking whether the element exists in DOM 
                            document.getElementById(key1).innerHTML = obj2[key1]; // Assigning the value to the element	
                        }

                    }
                }
            }
        }
    }
    imagePopUp();
}

// SUBMIT FORM FUNCTION OF CIBIL VERIFICATION PAGE...
function submitProcessFormCibil(status, val) {
    var StatusFlag='';
        if(status == "Reject"){
        	StatusFlag = 'Rejected';}
		if(status == "Approved"){
			StatusFlag = "Approved";
		}

        var processupdate = {
            'variables': {
                'Cibil_Verification_Status': {
                    'value': status
                },
            }
        };

        var dataObj = {};

        var remarks = '';
        if (document.getElementById('comments')) {
            remarks = document.getElementById('comments').value;
        }
        if (remarks.length == 0) {
            $.alert("Please input comments");
            return false;
        }
		[currentDateValue,currentTime] = currentDate();

        var remarks_arr = {
            "validation_member_id": parseInt(member_id),
            "validation_loan_id": parseInt(loan_id),
            "validation_type": parseInt(1),
            "validation_level": parseInt(1),
            "validation_status": parseInt(val),
            "remarks": remarks,
            "process_id": processid,
            "task_id": task_id,
            "process_status" : StatusFlag,
            "task_name": "CIBIL Verfication",
            "validation_fk_last_modified_by": user_id,
            "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
            "validation_fk_sci_client_id": parseInt(1)
        };

        var remarksData = {
            "mlValidationArray": [remarks_arr]
        };

        dataObj['taskremarks'] = processupdate;
        dataObj['loanid'] = loan_id;
        dataObj['taskid'] = task_id;
        dataObj['userid'] = user_id;
        dataObj['process'] = processupdate;
        dataObj['remarksData'] = remarksData;
        urls = '/updateTask';
        var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
        $(".popup").empty().append(theImg).fadeIn();

        $.ajax({
            url: urls,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.message == "Successful") {
                    $(".popup").fadeOut();
                    window.location = '/tasks/';
                } else {
                    $.alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
                }
            },
            data: JSON.stringify(dataObj)
        });
    }



// SUBMIT FORM FUNCTION OF RESOLVE QUERY PAGE....
function submitProcessFormResolveQuery(status, val) {
        var dataObj = new FormData();
        //var dataObj = {};
        [currentDateValue,currentTime] = currentDate();
        var updocArray = [];
        var doc_url_count = $(':input[type=file]').length;

        for (var i = 1; i <= doc_url_count; i++) {
            var doc_details = {};
            //var doc_name = 'RQ Doc '+i+" {{user}}";
            if (!document.getElementById("upload_doc_url_" + i).value) {
                doc_name = "Document Not Attached";
                doc_details["doc_type"] = "Document Not attached";
            } else {
                if (document.getElementById("upload_doc_name_" + i).value) {
                    var doc_name = document.getElementById("upload_doc_name_" + i).value + " " +user_id;
                    var doc_url = document.getElementById("upload_doc_url_" + i).value;
                } else {
                    $.alert("Enter the document name!!!!!!");
                    return false;
                }
            }
            doc_details["doc_member_id"] = parseInt(member_id);
            doc_details["doc_loan_id"] = parseInt(loan_id);
            doc_details["doc_fk_last_modified_by"] =user_id;
            doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
            doc_details["doc_fk_sci_client_id"] = 1;

            if (jQuery('#upload_doc_' + i + "")) {
                if (jQuery('#upload_doc_' + i + "")[0]) {
                    jQuery.each(jQuery('#upload_doc_' + i + "")[0].files, function(j, file) {
                        dataObj.append('file-' + (i + 12), file);
                        doc_details["doc_url"] = doc_url;
                        var fileNameSplit = doc_details["doc_url"].split('.');
                        var lengthOfNameArr = (fileNameSplit.length - 1);
                        doc_details["doc_status"] = doc_name;
                        doc_details["doc_type"] = fileNameSplit[lengthOfNameArr];
                        doc_details["doc_name"] = doc_name;
                        doc_details["doc_remarks"] = "Remarks: Document Attached";
                        doc_details["doc_loan_doc_type"] = "RQ:Document";

                    });
                }
            }
            if (!document.getElementById("upload_doc_" + i).value) {
                doc_details["doc_status"] = "Document Not Attached";
                doc_details["doc_type"] = "No doc";
                doc_details["doc_name"] = "Document Not Attached";
                doc_details["doc_remarks"] = "Remarks: Document Not Attached";
                doc_details["doc_loan_doc_type"] = "RQ:Document";
                doc_details["doc_url"] = "Document Not Attached";

            }

            updocArray.push(doc_details);
            var arr = {
                "updocArray": updocArray
            };
        }

        var processupdate = {
            'variables': {
                'Cibil_Verification_Status': {
                    'value': status
                },
            }
        };

        var remarks = '';
        if (document.getElementById('comments')) {
            remarks = document.getElementById('comments').value;
        }
        if (remarks.length == 0) {
            $.alert("Please input comments");
            return false;
        }
		[currentDateValue,currentTime]  = currentDate();

        var remarks_arr = {
            "validation_member_id": parseInt(member_id),
            "validation_loan_id": parseInt(loan_id),
            "validation_type": parseInt(1),
            "validation_level": parseInt(1),
            "validation_status": parseInt(val),
            "remarks": remarks,
            "process_id": processid,
            "task_id": task_id,
            "task_name": "Resolve Query",
            "validation_fk_last_modified_by": user_id,
            "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
            "validation_fk_sci_client_id": parseInt(1)
        };
        var remarksData = {
            "mlValidationArray": [remarks_arr]
        };
        dataObj.append('taskremarks', JSON.stringify(processupdate));
        dataObj.append('loanid', loan_id);
        dataObj.append('taskid', task_id);
        dataObj.append('userid', user_id);
        dataObj.append('process', JSON.stringify(processupdate));
        dataObj.append('comments', JSON.stringify(remarksData));
        dataObj.append('updocArray', JSON.stringify(updocArray));
        dataObj.append('form_data', JSON.stringify(arr));
        var obj = {
            "task_id": task_id,
            "process_id": processid,
            "processupdate": processupdate
        };
        dataObj.append('process_data', JSON.stringify(obj));

        urls = '/updateTask';

        var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
        $(".popup").empty().append(theImg).fadeIn();

        var opts = {
            url: '/uploadDocument',
            data: dataObj,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $(".popup").fadeOut();
                window.location = '/tasks/';
            },
            error: function(error) {
                console.log(error)
            }
        };
        if (dataObj.fake) {
            // Make sure no text encoding stuff is done by xhr
            opts.xhr = function() {
                var xhr = jQuery.ajaxSettings.xhr();
                xhr.send = xhr.sendAsBinary;
                return xhr;
            }
            opts.contentType = "multipart/form-data; boundary=" + dataObj.boundary;
            opts.data = dataObj;
        }
        jQuery.ajax(opts);
    }
    
    
// SUBMIT FORM FUNCTION OF ASSESS VERIFICATION PAGE...

function submitProcessFormAssessVerification() {

            var remarks = '';
            if (document.getElementById('comments')) {
                remarks = document.getElementById('comments').value;
            }

            var selectedBizVal = "";
            var selectedBiz = $("input[type='radio'][name='Business']:checked");
            if (selectedBiz.length > 0) {
                selectedBizVal = selectedBiz.val();
            }
            var selectedResiVal = "";
            var selectedResi = $("input[type='radio'][name='Resident']:checked");
            if (selectedResi.length > 0) {
                selectedResiVal = selectedResi.val();
            }
            var val = 1;
            if (remarks.length == 0) {
                $.alert("Please Comment");
                return false;
            } else if (selectedResiVal == "Rework" || selectedBizVal == "Rework") {
                val = 2;
                $.confirm({
		    title: 'Do you really want to Rework??',
		    confirmButton: 'Yes',
		    cancelButton: 'No',
		    confirm: function(){
		    confirmBox()
		    },
		    cancel: function(){
		    
		     }
		});
                
                
            } else if (selectedResiVal == "Approved" || selectedBizVal == "Approved") {
                val = 2;
                $.confirm({
		    title: 'Do you really want to Approve it??',
		    confirmButton: 'Yes',
		    cancelButton: 'No',
		    confirm: function(){
		   	confirmBox()
		    },
		    cancel: function(){
		    
		     }
		});
            }
            var processupdate = {
                "variables": {
                    "Resident_Verification_Status": {
                        "value": "" + selectedResiVal + ""
                    },
                    "Business_Verification_Status": {
                        "value": "" + selectedBizVal + ""
                    }
                }
            };
            var dataObj = {};

            [currentDateValue,currentTime] = currentDate();

            dataObj['process'] = processupdate;
            dataObj['memberid'] = member_id;

            var remarks_arr = {
                "validation_member_id": parseInt(member_id),
                "validation_loan_id": parseInt(loan_id),
                "validation_type": parseInt(1),
                "validation_level": parseInt(1),
                "validation_status": parseInt(val),
                "remarks": remarks,
                "process_id": processid,
                "task_id": task_id,
                "task_name": "Assess Verification Report",
                "validation_fk_last_modified_by": user_id,
                "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
                "validation_fk_sci_client_id": parseInt(1)
            };
            var remarksData = {
                "mlValidationArray": [remarks_arr]
            };
            dataObj['processid'] = processid;
            dataObj['taskremarks'] = remarksData;
            dataObj['loanid'] = loan_id;
            dataObj['taskid'] = task_id;
            dataObj['userid'] = user_id;
            dataObj['process'] = processupdate;
            dataObj['remarksData'] = remarksData;
	    
	    //return false;
	    	function confirmBox(){
            var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
            $(".popup").empty().append(theImg).fadeIn();
            urls = '/updateTask';
            $.ajax({
                url: urls,
                type: 'post',
                dataType: 'json',
                success: function(data) {
                    if (data.message == "Successful") {
                        $(".popup").fadeOut();
                        window.location = '/tasks/';
                    } else {
                        $.alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
                    }
                },
                data: JSON.stringify(dataObj)
            });}
        }

// SUBMIT FORM FUNCTION OF READ RESIDENCE VERIFICATION FORM...

 function submitProcessFormReadResidence() {
        var selectedBizVal = "";
        var selectedResiVal = "";
        var processupdate = {
            "variables": {
                "Resident_Verification_Status": {
                    "value": "ReworkCompleted"
                }
            }
        };

        var dataObj = new FormData();

       [currentDateValue,currentTime] = currentDate();
        var updocArray = [];
        var doc_url_count = $(':input[type=file]').length;

        for (var i = 1; i <= doc_url_count; i++) {
            var doc_details = {};
            //var doc_name = 'RQ Doc '+i+" {{user}}";
            if (!document.getElementById("upload_doc_url_" + i).value) {
                doc_name = "Document Not Attached";
                doc_details["doc_type"] = "Document Not attached";
            } else {
                if (document.getElementById("upload_doc_name_" + i).value) {
                    var doc_name = document.getElementById("upload_doc_name_" + i).value + " "+user_id;
                    var doc_url = document.getElementById("upload_doc_url_" + i).value;
                } else {
                    $.alert("Enter the document name!!!!!!");
                    return false;
                }
            }

            doc_details["doc_member_id"] = parseInt(member_id);
            doc_details["doc_loan_id"] = parseInt(loan_id);
            doc_details["doc_fk_last_modified_by"] = user_id;
            doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
            doc_details["doc_fk_sci_client_id"] = 1;

            if (jQuery('#upload_doc_' + i + "")) {
                if (jQuery('#upload_doc_' + i + "")[0]) {
                    jQuery.each(jQuery('#upload_doc_' + i + "")[0].files, function(j, file) {
                        dataObj.append('file-' + (i + 12), file);
                        doc_details["doc_url"] = doc_url;
                        var fileNameSplit = doc_details["doc_url"].split('.');
                        var lengthOfNameArr = (fileNameSplit.length - 1);
                        doc_details["doc_status"] = doc_name;
                        doc_details["doc_type"] = fileNameSplit[lengthOfNameArr];
                        doc_details["doc_name"] = doc_name;
                        doc_details["doc_remarks"] = "Remarks: Document Attached";
                        doc_details["doc_loan_doc_type"] = "RV:Document";

                    });
                }
            }
            if (!document.getElementById("upload_doc_" + i).value) {
                doc_details["doc_status"] = "Document Not Attached";
                doc_details["doc_type"] = "No doc";
                doc_details["doc_name"] = "Document Not Attached";
                doc_details["doc_remarks"] = "Remarks: Document Not Attached";
                doc_details["doc_loan_doc_type"] = "RV:Document";
                doc_details["doc_url"] = "Document Not Attached";

            }


            updocArray.push(doc_details);
            var arr = {
                "updocArray": updocArray
            };
        }

        var remarks = '';
        if (document.getElementById('comments')) {
            remarks = document.getElementById('comments').value;
        }
        if (remarks.length == 0) {
            $.alert("Please input comment!");
            return false;
        }
      	[currentDateValue,currentTime]  = currentDate();

        var remarks_arr = {
            "validation_member_id": parseInt(member_id),
            "validation_loan_id": parseInt(loan_id),
            "validation_type": parseInt(1),
            "validation_level": parseInt(1),
            "validation_status": parseInt(3),
            "remarks": remarks,
            "process_id": processid,
            "task_id": task_id,
            "task_name": "Rework Resident Verification",
            "validation_fk_last_modified_by": user_id,
            "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
            "validation_fk_sci_client_id": parseInt(1)
        };

        var remarksData = {
            "mlValidationArray": [remarks_arr]
        };
        dataObj.append('memberid', member_id);
        dataObj.append('processid', processid);
        dataObj.append('taskremarks', JSON.stringify(remarksData));
        dataObj.append('loanid', loan_id);
        dataObj.append('taskid', task_id);
        dataObj.append('userid', user_id);
        dataObj.append('processupdate', JSON.stringify(processupdate));
        var obj = {
            "task_id": task_id,
            "process_id": processid,
            "processupdate": processupdate
        };
        dataObj.append('process_data', JSON.stringify(obj));
        dataObj.append('comments', JSON.stringify(remarksData));
        dataObj.append("updocArray", JSON.stringify(updocArray));
        dataObj.append('form_data', JSON.stringify(arr));

        /*dataObj['memberid'] 	= member_id;
        dataObj['processid'] 	= processid;
        dataObj['taskremarks']  = remarksData;
        dataObj['loanid'] 	= loan_id;
        dataObj['taskid'] 	= task_id;
        dataObj['userid'] 	= user_id;
        dataObj['process'] 	= processupdate;
        dataObj['remarksData'] 	= remarksData;	*/

        urls = '/updateTask';
        var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
        $(".popup").empty().append(theImg).fadeIn();
        var opts = {
            url: '/uploadDocument',
            data: dataObj,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $(".popup").fadeOut();
                window.location = '/tasks/';
            },
            error: function(error) {
                console.log(error)
            }
        };
        if (dataObj.fake) {
            // Make sure no text encoding stuff is done by xhr
            opts.xhr = function() {
                var xhr = jQuery.ajaxSettings.xhr();
                xhr.send = xhr.sendAsBinary;
                return xhr;
            }
            opts.contentType = "multipart/form-data; boundary=" + dataObj.boundary;
            opts.data = dataObj;
        }
        jQuery.ajax(opts);
    }


// COMMON SET IMAGE URL FUNCTION - FILE UPLOAD OF REWORK PAGE
function setURL(id) {
        var id_split = id.split('_');
        var inp_img_id = id.substring(0, (id.length - 1));
        var id_select = id_split[id_split.length - 1];
        var inp_url_id = inp_img_id + "url_" + id_select;
        $("#" + id).change(function() {
            document.getElementById(inp_url_id).value = this.value;
            readURL(this, inp_img_id + "img_" + id_select);
        });
    }


// SUBMIT FORM FUNCTION OF READ BUSINESS VERIFICATION FORM...
function submitProcessFormReadBusiness(selectedBizVal) {
    var processupdate = {
        "variables": {
            "Business_Verification_Status": {
                "value": "" + selectedBizVal + ""
            }

        }
    };
    var dataObj = new FormData();
    [currentDateValue,currentTime]= currentDate();
    var updocArray = [];
    var doc_url_count = $(':input[type=file]').length;

    for (var i = 1; i <= doc_url_count; i++) {
        var doc_details = {};
        //var doc_name = 'RQ Doc '+i+" {{user}}";
        if (!document.getElementById("upload_doc_url_" + i).value) {
            doc_name = "Document Not Attached";
            doc_details["doc_type"] = "Document Not attached";
        } else {
            if (document.getElementById("upload_doc_name_" + i).value) {
                var doc_name = document.getElementById("upload_doc_name_" + i).value + " "+user_id;
                var doc_url = document.getElementById("upload_doc_url_" + i).value;
            } else {
                $.alert("Enter the document name!!!!!!");
                return false;
            }
        }
        doc_details["doc_member_id"] = parseInt(member_id);
        doc_details["doc_loan_id"] = parseInt(loan_id);
        doc_details["doc_fk_last_modified_by"] = user_id;
        doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
        doc_details["doc_fk_sci_client_id"] = 1;

        if (jQuery('#upload_doc_' + i + "")) {
            if (jQuery('#upload_doc_' + i + "")[0]) {
                jQuery.each(jQuery('#upload_doc_' + i + "")[0].files, function(j, file) {
                    dataObj.append('file-' + (i + 12), file);
                    doc_details["doc_url"] = doc_url;
                    var fileNameSplit = doc_details["doc_url"].split('.');
                    var lengthOfNameArr = (fileNameSplit.length - 1);
                    doc_details["doc_status"] = doc_name;
                    doc_details["doc_type"] = fileNameSplit[lengthOfNameArr];
                    doc_details["doc_name"] = doc_name;
                    doc_details["doc_remarks"] = "Remarks: Document Attached";
                    doc_details["doc_loan_doc_type"] = "BV:Document";

                });
            }
        }
        if (!document.getElementById("upload_doc_" + i).value) {
            doc_details["doc_status"] = "Document Not Attached";
            doc_details["doc_type"] = "No doc";
            doc_details["doc_name"] = "Document Not Attached";
            doc_details["doc_remarks"] = "Remarks: Document Not Attached";
            doc_details["doc_loan_doc_type"] = "BV:Document";
            doc_details["doc_url"] = "Document Not Attached";

        }


        updocArray.push(doc_details);
        var arr = {
            "updocArray": updocArray
        };
    }

    var remarks = '';
    if (document.getElementById('comments')) {
        remarks = document.getElementById('comments').value;
    }
    if (remarks.length == 0) {
        $.alert("Please input Comments!!!");
        return false;
    }

    [currentDateValue,currentTime] = currentDate();

    dataObj.append('processupdate', JSON.stringify(processupdate));
    dataObj.append('memberid', member_id);
    dataObj.append('loanid', loan_id);
    dataObj.append('taskid', task_id);
    dataObj.append('userid', user_id);

    var obj = {
        "task_id": task_id,
        "process_id": processid,
        "processupdate": processupdate
    };
    dataObj.append('process_data', JSON.stringify(obj));
    var remarks_arr = {
        "validation_member_id": parseInt(member_id),
        "validation_loan_id": parseInt(loan_id),
        "validation_type": parseInt(1),
        "validation_level": parseInt(1),
        "validation_status": parseInt(3),
        "remarks": remarks,
        "process_id": processid,
        "task_id": task_id,
        "task_name": "Rework Business Verification",
        "validation_fk_last_modified_by": user_id,
        "validation_last_modified_date":"" + currentDateValue + " at " + currentTime + "",
        "validation_fk_sci_client_id": parseInt(1)
    };
    var remarksData = {
        "mlValidationArray": [remarks_arr]
    };

    dataObj.append('processid', processid);
    dataObj.append('taskremarks', JSON.stringify(remarksData));
    dataObj.append('comments', JSON.stringify(remarksData));
    dataObj.append("updocArray", JSON.stringify(updocArray));
    dataObj.append('form_data', JSON.stringify(arr));

    urls = '/updateTask';
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();

    var opts = {
        url: '/uploadDocument',
        data: dataObj,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error)
        }
    };
    if (dataObj.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + dataObj.boundary;
        opts.data = dataObj;
    }
    jQuery.ajax(opts);
}

//SUBMIT FORM FUNCTION OF UPLOAD DOCUMENTS

function onUpload() {
    var doc_url_count = 0;
    for (var i = 1; i <= 50; i++) {
        if (document.getElementById("doc_name_" + i + "")) {
            if (document.getElementById("doc_name_" + i + "").value) {
                doc_url_count += 1;
            }
        }
    }

    var processupdate = {
        "variables": {
            "Upload_Doc_Status": {
                "value": "New"
            }
        }
    };
    [currentDateValue,currentTime]   =   currentDate();
    
    var updocArray = [];
    var arr = {
        "updocArray": updocArray
    };
    var doc_data = new FormData();
    var ProcessType = "Upload";

    var doc_url_count = $(':input[type=file]').length;
    if (doc_url_count < 7) {
        doc_url_count = 7
    }
    var Flag = 0;
    var returnflag = 0;
    var value_from_Process = 1;
    if (json_data.updocArray) {
        if (uploadDocumentsArrayDummy[0] && (uploadDocumentsArrayDummy.length > 2)) {
            if (uploadDocumentsArrayDummy.length > 0) {
                value_from_Process = 3;
                Flag = 1;
                var cbl_flag = 0;
                if (uploadDocumentsArrayDummy[0].doc_status == "CIBIL DOC") {
                    cbl_flag = 1;
                }
                for (var i = 1; i <= (doc_url_count + cbl_flag); i++) {
                    if (jQuery('#doc_' + (i) + "")) {
                        if (jQuery('#doc_' + (i) + "")[0]) {
                            if (jQuery('#doc_' + (i) + "")[0].files) {
                                jQuery.each(jQuery('#doc_' + (i) + "")[0].files, function(j, file) {

                                    if (uploadDocumentsArrayDummy[(i)]) {
                                        uploadDocumentsArrayDummy[(i)]["doc_fk_last_modified_by"] = user_id;
                                        uploadDocumentsArrayDummy[(i)]["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
                                        uploadDocumentsArrayDummy[(i)]["doc_name"] = document.getElementById("doc_name_" + i + "").value;
                                        uploadDocumentsArrayDummy[(i)]["doc_url"] = document.getElementById("doc_name_" + i + "").value;
                                        doc_data.append('file-' + (i + 13), file);
                                        if (uploadDocumentsArrayDummy[(i)]["doc_name"]) {
                                            uploadDocumentsArrayDummy[(i)]["doc_type"] = file.type;
                                            uploadDocumentsArrayDummy[(i)]["doc_name"] = document.getElementById("doc_name_" + i + "").value.replace(/^.*[\\\/]/, '');
                                            if (uploadDocumentsArrayDummy[(i)]["doc_name"] && uploadDocumentsArrayDummy[(i)]["doc_url"]) {

                                                uploadDocumentsArrayDummy[(i)]["doc_status"] = document.getElementById("doc_status_" + i + "").value;
                                                uploadDocumentsArrayDummy[(i)]["doc_remarks"] = "remarks:Document attached";
                                                uploadDocumentsArrayDummy[(i)]["doc_loan_doc_type"] = "Document Uploaded";
                                            } else {
                                                uploadDocumentsArrayDummy[(i)]["doc_status"] = "Document not attached";
                                                uploadDocumentsArrayDummy[(i)]["doc_remarks"] = "remarks:Document not attached";
                                                uploadDocumentsArrayDummy[(i)]["doc_url"] = "Document not attached";
                                                uploadDocumentsArrayDummy[(i)]["doc_name"] = "Document not attached";
                                                uploadDocumentsArrayDummy[(i)]["doc_type"] = "NoDoc.Noo";
                                                uploadDocumentsArrayDummy[(i)]["doc_loan_doc_type"] = "Document not Uploaded";
                                            }
                                        }
                                    } else {
                                        if (document.getElementById("doc_name_" + (i) + "")) {
                                            var doc_details = {};
                                            doc_details["doc_member_id"] = parseInt(member_id);
                                            doc_details["doc_loan_id"] = parseInt(loan_id);
                                            doc_details["doc_name"] = document.getElementById("doc_name_" + (i) + "").value;
                                            doc_details["doc_url"] = document.getElementById("doc_name_" + (i) + "").value;
                                            doc_details["doc_fk_last_modified_by"] = user_id;
                                            doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
                                            doc_details["doc_fk_sci_client_id"] = 1;
                                            doc_data.append('file-' + (i + 13), file);
                                            doc_details["doc_type"] = file.type;
                                            doc_details["doc_name"] = doc_details["doc_name"].replace(/^.*[\\\/]/, '');

                                            if (doc_details["doc_name"] && doc_details["doc_url"]) {
                                                if (!document.getElementById("doc_status_" + i + "").value) {
                                                    $.alert("Enter the document name!!!!!!");
                                                    returnflag = 1;
                                                    return false;

                                                } else {
                                                    doc_details["doc_status"] = document.getElementById("doc_status_" + (i) + "").value;
                                                    doc_details["doc_remarks"] = "remarks:Document attached";
                                                    doc_details["doc_loan_doc_type"] = "Document Uploaded";
                                                }
                                            } else {
                                                doc_details["doc_status"] = "Document not attached";
                                                doc_details["doc_remarks"] = "remarks:Document not attached";
                                                doc_details["doc_loan_doc_type"] = "Document not Uploaded";
                                            }

                                            uploadDocumentsArrayDummy.push(doc_details);
                                        } else {}

                                    }
                                });
                            }
                        }
                    }
                }
                if (returnflag == 1) {
                    return false;
                }
                for (var k = 1; k < uploadDocumentsArrayDummy.length; k++) {
                    var obj = uploadDocumentsArrayDummy[k];
                    if (uploadDocumentsArrayDummy[k].doc_status != "CIBIL DOC")
                        uploadDocumentsArray.push(uploadDocumentsArrayDummy[k]);
                }
                json_data.updocArray = uploadDocumentsArray;
                processupdate = {
                    "variables": {
                        "Upload_Doc_Status": {
                            "value": "ReworkCompleted"
                        }
                    }
                };
                ProcessType = "ReUpload";
                arr = json_data;
            }

        }
    }
    if (Flag == 0) { /* If uploading documents */
        updocArray = [];
        var doc_url_count = $(':input[type=file]').length;

        if (doc_url_count < 7) {
            doc_url_count = 7;
        }

        for (var i = 1; i <= doc_url_count; i++) {
            var doc_details = {};
            var doc_name = '';
            if (!document.getElementById("doc_name_" + i + "").value) {
                doc_name = "Document Not Attached";
                doc_details["doc_type"] = "Document Not attached";

            } else {
                doc_name = document.getElementById("doc_name_" + i + "").value;
            }

            doc_details["doc_member_id"] = parseInt(member_id);
            doc_details["doc_loan_id"] = parseInt(loan_id);
            doc_details["doc_name"] = doc_name;
            doc_details["doc_url"] = doc_name;
            doc_details["doc_fk_last_modified_by"] = user_id;
            doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
            doc_details["doc_fk_sci_client_id"] = 1;

            if (jQuery('#doc_' + i + "")) {
                if (jQuery('#doc_' + i + "")[0]) {
                    if (!document.getElementById("doc_status_" + i + "").value) {
                        $.alert("Enter the document name!!!!!!");
                        return false;
                    }
                    jQuery.each(jQuery('#doc_' + i + "")[0].files, function(j, file) {
                        doc_data.append('file-' + (i + 12), file);
                        var fileNameSplit = doc_details["doc_name"].split('.');
                        var lengthOfNameArr = (fileNameSplit.length - 1);

                        doc_details["doc_type"] = fileNameSplit[lengthOfNameArr];
                        doc_details["doc_name"] = doc_details["doc_name"].replace(/^.*[\\\/]/, '');
                    });
                }
            }
            if (doc_details["doc_name"] && doc_details["doc_url"] && (doc_details["doc_name"] != "Document Not Attached")) {
                if (doc_details["doc_name"] && doc_details["doc_url"]) {
                    doc_details["doc_status"] = document.getElementById("doc_status_" + i + "").value;
                    doc_details["doc_remarks"] = "remarks:Document attached";
                    doc_details["doc_loan_doc_type"] = "Document Uploaded";
                } else {
                    if (document.getElementById("doc_status_" + i + "")) {
                        doc_details["doc_status"] = document.getElementById("doc_status_" + i + "").value;
                        doc_details["doc_loan_doc_type"] = "Document Uploaded";
                    } else {
                        doc_details["doc_status"] = "Document not attached";
                        doc_details["doc_loan_doc_type"] = "Document not Uploaded";
                    }
                    doc_details["doc_remarks"] = "remarks:Document not attached";
                }

            } else {
                if (document.getElementById("doc_status_" + i + "")) {
                    doc_details["doc_status"] = document.getElementById("doc_status_" + i + "").value;
                    doc_details["doc_loan_doc_type"] = "Document Uploaded";
                } else {
                    doc_details["doc_status"] = "Document not attached";
                    doc_details["doc_loan_doc_type"] = "Document not Uploaded";
                }
                doc_details["doc_remarks"] = "remarks:Document not attached";

            }
            updocArray.push(doc_details);
        }
        arr = {
            "updocArray": updocArray
        };
    }
    

    var remarksData;

    doc_data.append('form_data', JSON.stringify(arr));
    var obj = {
        "task_id": task_id,
        "process_id": processid,
        "processupdate": processupdate
    };
    doc_data.append('process_data', JSON.stringify(obj));
    doc_data.append('ProcessType', ProcessType);

    var remarks = '';

    if (uploadDocumentsArray) {
        if (uploadDocumentsArray[0]) {
            if (uploadDocumentsArray.length > 0 && (uploadDocumentsArray.length != 1)) {
                remarks = document.getElementById('comments').value;
                var remarks_arr = {
                    "validation_member_id": parseInt(member_id),
                    "validation_loan_id": parseInt(loan_id),
                    "validation_type": parseInt(1),
                    "validation_level": parseInt(1),
                    "validation_status": parseInt(value_from_Process),
                    "remarks": remarks,
                    "process_id": processid,
                    "task_id": task_id,
                    "task_name": "Reupload Documents",
                    "validation_fk_last_modified_by": user_id,
                    "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
                    "validation_fk_sci_client_id": parseInt(1)
                };
                remarksData = {
                    "mlValidationArray": [remarks_arr]
                };
                doc_data.append('comments', JSON.stringify(remarksData));
                if (remarks.length == 0) {
                    $.alert("Please Comment");
                    return false;
                }
            }
        }
    }
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();
    var opts = {
        url: '/uploadDocument',
        data: doc_data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error)
        }
    };
    if (doc_data.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + doc_data.boundary;
        opts.data = doc_data;
    }
    jQuery.ajax(opts);
}

//SET IMAGE URL OF UPLOAD DOCUMENTS PAGE
 function setURLUploadDoc(id) {
        var id_split = id.split('_');
        var id_select = id_split[id_split.length - 1];
        $("#" + id).change(function() {
            var fileName = this.value;
            fileName = fileName.replace(/\\/g, '');
            var fileNameSplit = fileName.split('.');
            var fileFormat = fileNameSplit[(fileNameSplit.length - 1)];
            if (($.inArray(fileFormat, imageArr)) != -1) {
                $('#doc_url_' + (id_select) + '_img_pop').css("display", "block");
                $('#doc_url_' + (id_select) + '_anchor').css("display", "none");
            } else {
                $('#doc_url_' + (id_select) + '_img_pop').css("display", "none");
                $('#doc_url_' + (id_select) + '_anchor').css("display", "block");
                if (fileFormat == "pdf") {
                    $('#doc_url_' + (id_select) + '_anchor').html('<i class="fa fa-file-pdf-o" aria-hidden="true"></i>');
                }
                if (fileFormat == "xlsx") {
                    $('#doc_url_' + (id_select) + '_anchor').html('<i class="fa fa-file-excel-o" aria-hidden="true"></i>');
                }
                if (fileFormat == "docx" || fileFormat == "doc") {
                    $('#doc_url_' + (id_select) + '_anchor').html('<i class="fa fa-file-text" aria-hidden="true"></i>');
                }
                $('#doc_url_' + (id_select) + '_anchor').css("color", '#981b1b');
                $('.fa').css("font-size", '25px');
            }
            document.getElementById("doc_name_" + id_select + "").value = this.value;
            readURL(this, "doc_url_" + id_select + "_img_pop");
        });
        imagePopUp();
    }



function loadingUploadDocumentsData(json_data){
  
    if (document.getElementById("loan_id")) {
        document.getElementById("loan_id").innerHTML = 'Loan ID : <span id="loan_Id">' + loan_id + '</span>, Member Id : <span id="member_Id">' + member_id + '</span> '
    }

    /*Data load*/
   
    var cbl_flag = 1;
    if (uploadDocumentsArrayDummy) {
        if (uploadDocumentsArrayDummy.length > 1) {
            if (uploadDocumentsArrayDummy[0]) {
                $('#upload_button').css("display", "none");
                $('#reupload_button').css("display", "block");
                var rq_flag = 0;
                var cbl_minus = 0;
                if (uploadDocumentsArrayDummy[0].doc_status == "CIBIL DOC") {
                    cbl_flag = 0;
                    cbl_minus = 1;
                }

                if (uploadDocumentsArrayDummy.length > 7 && (cbl_flag == 1)) {
                    var child = document.getElementById("add-more-btn");
                    child.remove();
                } else if (uploadDocumentsArrayDummy.length > 8 && (cbl_flag == 0)) {
                    var child = document.getElementById("add-more-btn");
                    child.remove();
                }

                for (var i = 0; i < (uploadDocumentsArrayDummy.length + cbl_flag); i++) {
                    var objTo = document.getElementById('center-pane')
                    var member_class = document.createElement("div");
                    var obj = uploadDocumentsArrayDummy[i];
                    if (obj) {

                        if (i > (6 + cbl_minus)) {
                            if ((uploadDocumentsArrayDummy.length - (1 + cbl_flag)) != i) {
                                member_class.innerHTML = '<div class="member_class"><div class="colomn-div">' +
                                    '<input type="text"  readonly="true" id="doc_status_' + (i + cbl_flag) + '" name="doc_status_' + (i + cbl_flag) + '" class="title-text"></input>' +
                                    '&nbsp;&nbsp;<font>:</font>' +
                                    '<input  type="text" readonly id="doc_name_' + (i + cbl_flag) + '" 	name="doc_name_' + (i + cbl_flag) + '" ></input>' +
                                    '<input  type="file" style="width: 15%;" 	 id="doc_' + (i + cbl_flag) + '"  name="doc_' + (i + cbl_flag) + '" onclick="setURLUploadDoc(this.id);" ></input>' +
                                    '<img  id="doc_url_' + (i + cbl_flag) + '_img_pop"  class="file_img" 	src=""></img>' +
                                    '<a    id="doc_url_' + (i + cbl_flag) + '_anchor" 	class="file_img" > <i class="fa fa-file-text" aria-hidden="true"></i></a>' +
                                    '</div></div>';
                            } else {
                                member_class.innerHTML = '<div class="member_class"><div class="colomn-div">' +
                                    '<input type="text"  readonly="true" id="doc_status_' + (i + cbl_flag) + '" name="doc_status_' + (i + cbl_flag) + '" class="title-text"></input>' +
                                    '&nbsp;&nbsp;<font>:</font>' +
                                    '<input  type="text" readonly id="doc_name_' + (i + cbl_flag) + '" 	name="doc_name_' + (i + cbl_flag) + '" ></input>' +
                                    '<input  type="file" style="width: 15%;" 	 id="doc_' + (i + cbl_flag) + '"  name="doc_' + (i + cbl_flag) + '" onclick="setURLUploadDoc(this.id);" ></input>' +
                                    '<img  id="doc_url_' + (i + cbl_flag) + '_img_pop"  class="file_img" 	src=""></img>' +
                                    '<a    id="doc_url_' + (i + cbl_flag) + '_anchor" 	class="file_img" > <i class="fa fa-file-text" aria-hidden="true"></i></a>' +
                                    '</div></div>' +
                                    '<div class="member_class" id="add-more-btn">' +
                                    '<div class="form-button text-right" style="margin-right:5%;">' +
                                    '<a href="javascript:void(0)"  id="add-btn-id" class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">' +
                                    '<i 	class="entypo-plus"	 style="width:30px;height: 28px;color: white;padding:6px;">	</i>Add more</a>' +
                                    '</div><br>' +
                                    '</div>';
                            }
                            objTo.appendChild(member_class);
                        }

                        if (obj["doc_name"]) {
                            if (document.getElementById("doc_name_" + (i + cbl_flag) + "")) {
                                document.getElementById("doc_name_" + (i + cbl_flag) + "").value = obj["doc_name"];
                            }
                        }
                        if (obj["doc_url"]) {
                            if (document.getElementById("doc_url_" + (i + cbl_flag) + "_img_pop")) {
                                if (($.inArray(obj['doc_type'], imageArr)) != -1) {
                                    $('#doc_url_' + (i + cbl_flag) + '_img_pop').attr("src", obj['doc_url'] + '?alf_ticket=' + alf_token);
                                    $('#doc_url_' + (i + cbl_flag) + '_img_pop').css("display", "block");
                                    $('#doc_url_' + (i + cbl_flag) + '_anchor').css("display", "none");
                                } else if (obj['doc_url'] != 'Document Not attached') {
                                    if (obj['doc_type'] == "pdf") {
                                        $('#doc_url_' + (i + cbl_flag) + '_anchor').html('<i class="fa fa-file-pdf-o" aria-hidden="true"></i>');
                                    }
                                    if (obj['doc_type'] == "xlsx") {
                                        $('#doc_url_' + (i + cbl_flag) + '_anchor').html('<i class="fa fa-file-excel-o" aria-hidden="true"></i>');
                                    } else {
                                        $('#doc_url_' + (i + cbl_flag) + '_anchor').html('<i class="fa fa-file-text" aria-hidden="true"></i>');
                                    }
                                    $('#doc_url_' + (i + cbl_flag) + '_anchor').attr("href", obj['doc_url'] + '?alf_ticket=' + alf_token);
                                    $('#doc_url_' + (i + cbl_flag) + '_anchor').css("color", '#981b1b');
                                    $('.fa').css("font-size", '25px');
                                    $('#doc_url_' + (i + cbl_flag) + '_img_pop').css("display", "none");
                                } else {
                                    $('#doc_url_' + (i + cbl_flag) + '_img_pop').css("display", "none");
                                    $('#doc_url_' + (i + cbl_flag) + '_anchor').css("display", "none");
                                }
                            }
                        }
                        if (obj["doc_status"] && document.getElementById("doc_status_" + (i + cbl_flag) + "")) {
                            document.getElementById("doc_status_" + (i + cbl_flag) + "").value = obj["doc_status"];
                        }
                        if (document.getElementById("doc_url_" + (i + cbl_flag) + "")) {
                            document.getElementById("doc_url_" + (i + cbl_flag) + "").innerHTML = obj['doc_url'];
                        }
                        var obj = uploadDocumentsArrayDummy[i];
                    }
                }
            }
        }
        imagePopUp();
    }
    
    /*For Extra Files to be Uploaded*/
    var id_val = 7;
    
    if (uploadDocumentsArrayDummy.length > 1) {
        id_val = (uploadDocumentsArrayDummy.length);
    }

    /*On Every Click in Add More File Button*/
    $(document).on('click', '#add-btn-id', function() {
        var upload_flag = 0;
        for (var j = 0; j <= json_data.updocArray.length; j++) {
            var a = json_data.updocArray[j];
            for (var key in a) {
                var value = a[key];
                if (value == 'Document Uploaded') {
                    upload_flag = 1;
                }

            }
        }

        if (upload_flag == 1) {
            if (id_val == 8) {
                var child = document.getElementById("add-more-btn");
                child.remove();
                var objTo = document.getElementById('center-pane')
                var member_class = document.createElement("div");
                member_class.innerHTML = '<div class="member_class" ><div class="colomn-div">' + '<input  type="text " id="doc_status_' + id_val + '" 	name="doc_status_' + id_val + '" placeholder="File Name" style="width: 22%;text-align: left;padding-left: 5%;" ></input>&nbsp;' + '<font>:</font>&nbsp;<input  type="text " id="doc_name_' + id_val + '" 	name="doc_name_' + id_val + '" readonly ></input>' + '<input  type="file" style="width:15%;" 	 id="doc_' + id_val + '"  name="doc_' + id_val + '" onclick="setURLUploadDoc(this.id);" ></input>' + '<img  id="doc_url_' + id_val + '_img_pop"  class="file_img" 	src=""></img>' + '<a    id="doc_url_' + id_val + '_anchor" 	class="file_img" > ' + '<i class="fa fa-file-text" aria-hidden="true"></i></a>' + '</div></div>' + '<div class="member_class" id="add-more-btn">' + '<div class="form-button text-right" style="margin-right:5%;">' + '<a href="javascript:void(0)"  id="add-btn-id" class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">' + '<i 	class="entypo-plus"	 style="width:30px;height: 28px;color: white;padding:6px;">	</i>Add more</a>' + '</div><br></div>';

                objTo.appendChild(member_class);
            } else {
                if (document.getElementById("doc_status_" + (id_val - 1)) && document.getElementById("doc_name_" + (id_val - 1)))
                    if (document.getElementById("doc_status_" + (id_val - 1)).value && document.getElementById("doc_name_" + (id_val - 1)).value) {
                        $("#doc_" + id_val).click();
                        var child = document.getElementById("add-more-btn");
                        child.remove();
                        var objTo = document.getElementById('center-pane')
                        var member_class = document.createElement("div");

                        member_class.innerHTML = '<div class="member_class"><div class="colomn-div">' + '<input  type="text " id="doc_status_' + id_val + '" 	name="doc_status_' + id_val + '" placeholder="File Name" style="width: 22%;text-align: left;padding-left: 5%;" ></input>&nbsp;' + '<font>:</font>&nbsp;<input  type="text " id="doc_name_' + id_val + '" 	name="doc_name_' + id_val + '" readonly ></input>' + '<input  type="file" style="width:15%;" 	 id="doc_' + id_val + '"  name="doc_' + id_val + '" onclick="setURLUploadDoc(this.id);" ></input>' + '<img  id="doc_url_' + id_val + '_img_pop"  class="file_img" 	src=""></img>' + '<a    id="doc_url_' + id_val + '_anchor" 	class="file_img" > ' + '<i class="fa fa-file-text" aria-hidden="true"></i></a>' + '</div></div>' + '<div class="member_class" id="add-more-btn">' + '<div class="form-button text-right" style="margin-right:5%;">' + '<a href="javascript:void(0)"  id="add-btn-id" class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">' + '<i 	class="entypo-plus"	 style="width:30px;height: 28px;color: white;padding:6px;">	</i>Add more</a>' + '</div><br></div>';
                        objTo.appendChild(member_class);
                    } else {
                        $.alert("Please use already appended fields to upload more documents!!!");
                        id_val--;
                    }
            }
           id_val++;
        } else {
        id_val++;
            if (id_val == 8) {
                var child = document.getElementById("add-more-btn");
                child.remove();
                var objTo = document.getElementById('center-pane')
                var member_class = document.createElement("div");
                member_class.innerHTML = '<div class="member_class" ><div class="colomn-div">' + '<input  type="text " id="doc_status_' + id_val + '" 	name="doc_status_' + id_val + '" placeholder="File Name" style="width: 22%;text-align: left;padding-left: 5%;" ></input>&nbsp;' + '<font>:</font>&nbsp;<input  type="text " id="doc_name_' + id_val + '" 	name="doc_name_' + id_val + '" readonly ></input>' + '<input  type="file" style="width:15%;" 	 id="doc_' + id_val + '"  name="doc_' + id_val + '" onclick="setURLUploadDoc(this.id);" ></input>' + '<img  id="doc_url_' + id_val + '_img_pop"  class="file_img" 	src=""></img>' + '<a    id="doc_url_' + id_val + '_anchor" 	class="file_img" > ' + '<i class="fa fa-file-text" aria-hidden="true"></i></a>' + '</div></div>' + '<div class="member_class" id="add-more-btn">' + '<div class="form-button text-right" style="margin-right:5%;">' + '<a href="javascript:void(0)"  id="add-btn-id" class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">' + '<i 	class="entypo-plus"	 style="width:30px;height: 28px;color: white;padding:6px;">	</i>Add more</a>' + '</div><br></div>';

                objTo.appendChild(member_class);
            } else {
                if (document.getElementById("doc_status_" + (id_val - 1)) && document.getElementById("doc_name_" + (id_val - 1)))
                    if (document.getElementById("doc_status_" + (id_val - 1)).value && document.getElementById("doc_name_" + (id_val - 1)).value) {
                        $("#doc_" + id_val).click();
                        var child = document.getElementById("add-more-btn");
                        child.remove();
                        var objTo = document.getElementById('center-pane')
                        var member_class = document.createElement("div");

                        member_class.innerHTML = '<div class="member_class"><div class="colomn-div">' + '<input  type="text " id="doc_status_' + id_val + '" 	name="doc_status_' + id_val + '" placeholder="File Name" style="width: 22%;text-align: left;padding-left: 5%;" ></input>&nbsp;' + '<font>:</font>&nbsp;<input  type="text " id="doc_name_' + id_val + '" 	name="doc_name_' + id_val + '" readonly ></input>' + '<input  type="file" style="width:15%;" 	 id="doc_' + id_val + '"  name="doc_' + id_val + '" onclick="setURLUploadDoc(this.id);" ></input>' + '<img  id="doc_url_' + id_val + '_img_pop"  class="file_img" 	src=""></img>' + '<a    id="doc_url_' + id_val + '_anchor" 	class="file_img" > ' + '<i class="fa fa-file-text" aria-hidden="true"></i></a>' + '</div></div>' + '<div class="member_class" id="add-more-btn">' + '<div class="form-button text-right" style="margin-right:5%;">' + '<a href="javascript:void(0)"  id="add-btn-id" class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">' + '<i 	class="entypo-plus"	 style="width:30px;height: 28px;color: white;padding:6px;">	</i>Add more</a>' + '</div><br></div>';
                        objTo.appendChild(member_class);
                    } else {
                        $.alert("Please use already appended fields to upload more documents!!!");
                        id_val--;
                    }
            } 
        }
    });
   
}

// SETS THE READ DATA OF UPLOAD DOCUMENTS
function loadUploadDocsReadData(json_data){
	var otherDocumentsArray = [];
    var uploadDocumentsArray = [];

    for (var data in json_data.updocArray) {
       console.log(data);
       var dataVal = json_data.updocArray[data]["doc_loan_doc_type"];
       if ( dataVal != "RQ:Document" && dataVal !=  "RV:Document" && dataVal != "BV:Document" )
            uploadDocumentsArray.push(json_data.updocArray[data]);
    }
   
    var imageArr = ["jpeg", "jpg", "exif", "tiff", "gif", "bmp", "png", "image/jpeg"];

    if (uploadDocumentsArray) {
        if (uploadDocumentsArray[0]) {
            for (var i = 0; i < uploadDocumentsArray.length; i++) {
                var objTo = document.getElementById('center-pane')
                var member_class = document.createElement("div");
                var obj = uploadDocumentsArray[i];
                member_class.innerHTML = '<div class="member_class"><div class="colomn-div"><label id="doc_status_' + (i + 1) + '" style="width:45%;"></label><font>:</font>' +
                    '<font id="doc_name_' + (i + 1) + '" 	name="doc_name_' + (i + 1) + '"  style="width:40%;"    ></font>' +
                    '<img  id="doc_url_' + (i + 1) + '_img_pop"  class="file_img" 	src=""></img>' +
                    '<a    id="doc_url_' + (i + 1) + '_anchor" 	class="file_img" > <i class="fa fa-file-text" aria-hidden="true"></i></a>' +
                    '</div></div>';
                objTo.appendChild(member_class);
                if (obj["doc_name"] && document.getElementById("doc_name_" + (i + 1) + "")) {
                    document.getElementById("doc_name_" + (i + 1) + "").innerHTML = obj["doc_name"];
                }

                if (obj["doc_url"] && document.getElementById("doc_url_" + (i + 1) + "_img_pop")) {

                    if (($.inArray(obj['doc_type'], imageArr)) != -1) {
                        $('#doc_url_' + (i + 1) + '_img_pop').attr("src", obj['doc_url'] + '?alf_ticket=' + alf_token);
                        $('#doc_url_' + (i + 1) + '_anchor').css("display", "none");

                    } else if (obj['doc_url'] != 'Document not attached') {
                        if (obj['doc_type'] == "pdf") {
                            $('#doc_url_' + (i + 1) + '_anchor').html('<i class="fa fa-file-pdf-o" aria-hidden="true"></i>');
                        }
                        if (obj['doc_type'] == "xlsx") {
                            $('#doc_url_' + (i + 1) + '_anchor').html('<i class="fa fa-file-excel-o" aria-hidden="true"></i>');
                        }
                        if (obj['doc_type'] == "docx" || obj['doc_type'] == "doc") {
                            $('#doc_url_' + (i + 1) + '_anchor').html('<i class="fa fa-file-text" aria-hidden="true"></i>');
                        }
                        $('#doc_url_' + (i + 1) + '_anchor').attr("href", obj['doc_url'] + '?alf_ticket=' + alf_token);
                        $('#doc_url_' + (i + 1) + '_anchor').css("color", '#981b1b');
                        $('.fa').css("font-size", '25px');
                        $('.fa').css("margin-left", '-14px');
                        $('#doc_url_' + (i + 1) + '_img_pop').css("display", "none");
                        $('#doc_url_' + (i + 1) + '_img_pop').css("max-height", "100%");
                        $('#doc_url_' + (i + 1) + '_img_pop').css("max-width", "100%");

                    } else {
                        $('#doc_url_' + (i + 1) + '_img_pop').css("display", "none");
                        $('#doc_url_' + (i + 1) + '_anchor').css("display", "none");
                    }
                }
                if (obj["doc_status"] && document.getElementById("doc_status_" + (i + 1) + "")) {
                    document.getElementById("doc_status_" + (i + 1) + "").innerHTML = obj["doc_status"];
                }
                if (document.getElementById('doc_url')) {
                    document.getElementById('doc_url').innerHTML = obj['doc_url'];
                }
                document.getElementById("doc_loan_id").innerHTML = obj['doc_loan_id'];
                document.getElementById("doc_member_id").innerHTML = obj['doc_member_id'];
                document.getElementById("doc_fk_last_modified_by").innerHTML = obj['doc_fk_last_modified_by'];
                var obj = json_data.updocArray[i];

            }
            imagePopUp();
        }
    }
} 
  
//SUBMIT FORM FUNCTION OF UPLOAD DOCUMENTS READ PAGE
function submitFormUploadDocsRead(d) {
        var processupdate = {
            "variables": {
                "Upload_Doc_Status": {
                    "value": d
                }
            }
        };
        data = {
            "process": processupdate,
            "taskid": task_id
        }

        var remarks = '';
        if (document.getElementById('comments')) {
            remarks = document.getElementById('comments').value;
        }
        if (remarks.length == 0) {
            $.alert("Please input Comments!!!!");
            return false;
        }

		[currentDateValue,currentTime] = currentDate();
        var remarks_arr = {
            "validation_member_id": parseInt(member_id),
            "validation_loan_id": parseInt(loan_id),
            "validation_type": parseInt(1),
            "validation_level": parseInt(1),
            "validation_status": parseInt(3),
            "remarks": remarks,
            "process_id": processid,
            "task_id": task_id,
            "task_name": "Verify Scan Docs",
            "validation_fk_last_modified_by": user_id,
            "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
            "validation_fk_sci_client_id": parseInt(1)
        };
        var remarksData = {
            "mlValidationArray": [remarks_arr]
        };

        var dataObj = {};
        dataObj['processid'] = processid;
        dataObj['taskremarks'] = remarksData;
        dataObj['loanid'] = loan_id;
        dataObj['taskid'] = task_id;
        dataObj['userid'] = user_id;
        dataObj['process'] = processupdate;
        dataObj['remarksData'] = remarksData;

        urls = '/updateTask';
        var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
        $(".popup").empty().append(theImg).fadeIn();
        $.ajax({
            url: urls,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.message == "Successful") {
                    $(".popup").fadeOut();
                    window.location = '/tasks/';
                } else {
                    $.alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
                }
            },
            data: JSON.stringify(dataObj)
        });
    }


function courierNameInput(val, id) {
    var html = "";
    if (val == "Others") {
        html += '<input type=text" id="courierId" placeholder="COURIER NAME" style="width:22%;"></input>';
        $("#courierNameDiv").append(html);
    } else {
        $("#courierId").remove();
    }
}


function loadDispatchDocsData(){
	/*Div header with loan and member id*/
    if (loan_id) {
        document.getElementById("loan_id").innerHTML = "Loan Id :  " + loan_id + "    &   Member Id : " + memberId;
    }
    /*Parse Data*/
    if (memberdetails) {
        json_data = JSON.parse(memberdetails);
    }
    /*Master Data Parse and paint on screen*/
    setSelectOptionInForm(); /*Function in masterDataLoad.js	*/

    if (json_data.dcphysicalArray) {
        if (json_data.dcphysicalArray.length > 0) {
            $('#despatch_button').css("display", "none");
            $('#redespatch_button').css("display", "block");
            $('.labelDispatchDocs').css("display", "none");
            $('.labelReDispatchDocs').css("display", "block");
        }
        
    }
}

//SUBMIT FORM FUNCTION OF DISPATCH DOCUMENTS FORM
function onSubmitDispatchDocForm(dataSubmit, val) {
    /*Input Values*/
    var doc_courier_name = document.getElementById("doc_courier_name").value;
    var doc_courier_tracking_id = document.getElementById("doc_courier_tracking_id").value;
    var doc_courier_receipt_number = document.getElementById("doc_courier_receipt_number").value;
    var doc_courier_handover_date = document.getElementById("doc_courier_handover_date").value;
    var place = document.getElementById("place").value;

    var dataObj = new FormData();
    /*Input value validation*/
    if (!doc_courier_name) {
        $.alert('Please enter Courier Name');
        return false;
    }
    if (!doc_courier_receipt_number) {
        $.alert('Please enter Courier receipt Number');
        return false;
    }
    if (!doc_courier_handover_date) {
        $.alert('Please enter Date');
        return false;
    }
    if (!doc_courier_tracking_id) {
        $.alert('Please enter Tracking Id');
        return false;
    }

    [currentDateValue,currentTime] = currentDate();

    var updocArray = [];
    var doc_url_count = $(':input[type=file]').length;

    for (var i = 1; i <= doc_url_count; i++) {
        var doc_details = {};
        //var doc_name = 'RQ Doc '+i+" {{user}}";
        if (!document.getElementById("upload_doc_url_" + i).value) {
            doc_name = "Document Not Attached";
            doc_details["doc_type"] = "Document Not attached";
        } else {
            if (document.getElementById("upload_doc_name_" + i).value) {
                var doc_name = document.getElementById("upload_doc_name_" + i).value + " " +user_id;
                var doc_url = document.getElementById("upload_doc_url_" + i).value;
            } else {
                $.alert("Enter the document name!!!!!!");
                return false;
            }
        }

        doc_details["doc_member_id"] = parseInt(memberId);
        doc_details["doc_loan_id"] = parseInt(loan_id);
        doc_details["doc_fk_last_modified_by"] = user_id;
        doc_details["doc_last_modified_date"] = "" + currentDateValue + " at " + currentTime + "";
        doc_details["doc_fk_sci_client_id"] = 1;

        if (jQuery('#upload_doc_' + i + "")) {
            if (jQuery('#upload_doc_' + i + "")[0]) {
                jQuery.each(jQuery('#upload_doc_' + i + "")[0].files, function(j, file) {
                    dataObj.append('file-' + (i + 12), file);
                    doc_details["doc_url"] = doc_url;
                    var fileNameSplit = doc_details["doc_url"].split('.');
                    var lengthOfNameArr = (fileNameSplit.length - 1);
                    doc_details["doc_status"] = doc_name;
                    doc_details["doc_type"] = fileNameSplit[lengthOfNameArr];
                    doc_details["doc_name"] = doc_name;
                    doc_details["doc_remarks"] = "Remarks: Document Attached";
                    doc_details["doc_loan_doc_type"] = "RDDCO:Document";

                });
            }
        }
        if (!document.getElementById("upload_doc_" + i).value) {
            doc_details["doc_status"] = "Document Not Attached";
            doc_details["doc_type"] = "No doc";
            doc_details["doc_name"] = "Document Not Attached";
            doc_details["doc_remarks"] = "Remarks: Document Not Attached";
            doc_details["doc_loan_doc_type"] = "RDDCO:Document";
            doc_details["doc_url"] = "Document Not Attached";

        }


        updocArray.push(doc_details);
        var arr = {
            "updocArray": updocArray
        };
    }

    /*Process Details formating*/
    var processCompleteTask = {
        "variables": {
            "Despatch_Doc_Status": {
                "value": dataSubmit
            }
        }
    };

    dataObj.append('memberid', memberId);

    var remarks = '';
    if (json_data.dcphysicalArray) {
        if (json_data.dcphysicalArray.length > 0) {
            /*Comments*/
            if (document.getElementById('comments')) {
                remarks = document.getElementById('comments').value;
            }
            var remarks_arr = {
                "validation_member_id": parseInt(memberId),
                "validation_loan_id": parseInt(loan_id),
                "validation_type": parseInt(1),
                "validation_level": parseInt(1),
                "validation_status": parseInt(val),
                "remarks": remarks,
                "process_id": processid,
                "task_id": task_id,
                "task_name": "Redespatch Documents to CO",
                "validation_fk_last_modified_by": user_id,
                "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
                "validation_fk_sci_client_id": parseInt(1)
            };
            var remarksData = {
                "mlValidationArray": [remarks_arr]
            };
            dataObj.append('comments', JSON.stringify(remarksData));
            /*Alert if no Comments*/
            if (remarks.length < 1) {
                $.alert('Please Comment.');
                return false;
            }
        }
    }

    dataObj.append('processid', processid);
    dataObj.append('taskremarks', JSON.stringify(remarksData));
    dataObj.append('loanid', loan_id);
    dataObj.append('taskid', task_id);
    dataObj.append('userid', userid);
    dataObj.append('process', JSON.stringify(processCompleteTask));
    dataObj.append('remarksData', JSON.stringify(remarksData));

    dataObj.append('form_data', JSON.stringify(arr));

    var obj = {
        "task_id": task_id,
        "process_id": processid,
        "processupdate": processCompleteTask
    };
    dataObj.append('process_data', JSON.stringify(obj));
    /*Formating the input values for AVRO*/
    var dataArr = {
        "dcphysicalArray": [{
            "fk_member_id": parseInt(memberId),
            "fk_loan_id": parseInt(loanId),
            "doc_courier_tracking_id": doc_courier_tracking_id,
            "doc_courier_handover_date": doc_courier_handover_date,
            "doc_courier_name": doc_courier_name,
            "doc_courier_receipt_number": doc_courier_receipt_number,
            "last_modified_by": userid,
            "place": place,
            "last_modified_date": "" + currentDateValue + " at " + currentTime + "",
            "task_id": task_id
        }]
    };

    dataObj.append('dispatchDetails', JSON.stringify(dataArr));
    dataObj.append("processDetails", JSON.stringify(processCompleteTask));
    /*Merging of data for sending through POST AJAX*/
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();
    var opts = {
        url: '/uploadDocument',
        data: dataObj,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error)
        }
    };
    if (dataObj.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + dataObj.boundary;
        opts.data = dataObj;
    }
    jQuery.ajax(opts);
}

//SUBMIT FORM FUNCTION OF READ DISPATCH DOCUMENTS
function onSubmitFormReadDispatchDocs(d) {
    var processupdate = {
        "variables": {
            "Despatch_Doc_Status": {
                "value": d
            }
        }
    };
    var data = {
        "process": processupdate,
        "taskid": task_id
    }
    var remarks = '';
    if (document.getElementById('comments')) {
        remarks = document.getElementById('comments').value;
    }

    if (remarks.length == 0) {
        $.alert("Please Comment.");
        return false;
    }

    [currentDateValue,currentTime]  = currentDate();

    var remarks_arr = {
        "validation_member_id": parseInt(memberId),
        "validation_loan_id": parseInt(loan_id),
        "validation_type": parseInt(1),
        "validation_level": parseInt(1),
        "validation_status": parseInt(3),
        "remarks": remarks,
        "process_id": processid,
        "task_id": task_id,
        "task_name": "Check Documents",
        "validation_fk_last_modified_by": user_id,
        "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
        "validation_fk_sci_client_id": parseInt(1)
    };
    var remarksData = {
        "mlValidationArray": [remarks_arr]
    };

    var dataObj = {};
    dataObj['processid'] = processid;
    dataObj['taskremarks'] = remarksData;
    dataObj['loanid'] = loan_id;
    dataObj['taskid'] = task_id;
    dataObj['userid'] = user_id;
    dataObj['process'] = processupdate;
    dataObj['remarksData'] = remarksData;
    urls = '/updateTask';
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();
    $.ajax({
        url: urls,
        type: 'post',
        dataType: 'json',
        success: function(data) {
            if (data.message == "Successful") {
                $(".popup").fadeOut();
                window.location = '/tasks/';
            } else {
                $.alert("Failed due to some Issue . Please try after sometime or contact your Administrator");
            }
        },
        data: JSON.stringify(dataObj)
    });
}


//SUBMIT FORM FUNCTION OF PREPARE CHEQUE
function onUploadPrepareCheque(value){
	/*Input Values*/
	var loan_account_number 		= document.getElementById("loan_account_number").value;
	var preche_cheque_number 		= document.getElementById("preche_cheque_number").value;
	var preche_bank_name 			= document.getElementById("preche_bank_name").value;
	var preche_bank_branch 			= document.getElementById("preche_bank_branch").value;
	var payee_name 					= document.getElementById("payee_name").value;
	var loan_sanctioned_amount 		= document.getElementById("loan_sanctioned_amount").value;
	var loan_sanctioned_date 		= document.getElementById("loan_sanctioned_date").value;
	var chq_issued_on_date			= document.getElementById("chq_issued_on_date").value;

	/*Input value validation*/
	if(!preche_cheque_number){
		$.alert('Please enter Cheque Number');
		return false;
	}
	if(!preche_bank_name){
		$.alert('Please enter Bank Name');
		return false;
	}
	if(!preche_bank_branch){
		$.alert('Please enter Bank Branch Name');
		return false;
	}
	if(!payee_name){
		$.alert('Please enter Payee Name');
		return false;
	}
	if(!loan_sanctioned_amount){
		$.alert('Please enter Sanctioned Amount of Loan');
		return false;
	}
	if(!loan_sanctioned_date){
		$.alert('Please enter Loan Sanctioned Date');
		return false;
	}
	if(!chq_issued_on_date){
		$.alert('Please enter Cheque Issued Date');
		return false;
	}

	[currentDateValue,currentTime] = currentDate();
	/*Process Details formating*/
	var processCompleteTask = { "variables": { "Book_Loan_&_Cheque_Status" : { "value" : "New" } } };
	var dataObj 		= {};

	dataObj['memberid'] 	= memberId;

	var remarksData =    { 
				"validation_member_id" 		: parseInt(memberId),
				"validation_loan_id" 		: parseInt(loan_id),
				"validation_type" 		: parseInt(1),
				"validation_level"		: parseInt(1),
				"validation_status" 		: parseInt(1),
				"remarks" 			: remarks, 
				"process_id" 			: processid,
				"task_id" 			: task_id,
				"validation_fk_last_modified_by": user_id,
				"validation_last_modified_date"	: ""+currentDateValue +" at "+ currentTime+"",
				"validation_fk_sci_client_id"	: parseInt(1)
				 };


	dataObj['processid'] 	= processid;
	dataObj['taskremarks']  = remarksData;
	dataObj['loanid'] 	= loan_id;
	dataObj['taskid'] 	= task_id;
	dataObj['userid'] 	= userid;
	dataObj['process'] 	= processCompleteTask;
	dataObj['remarksData'] 	= remarksData;		

	/*Formating the input values for AVRO*/
	var dataArr = {
		"preche_member_id"		: parseInt(memberId),
		"preche_loan_id"		: parseInt(loan_id),
		"loan_account_number"		: loan_account_number,
		"preche_cheque_number"		: preche_cheque_number,
		"preche_bank_name"		: preche_bank_name,
		"preche_bank_branch"		: preche_bank_branch,
		"payee_name"			: payee_name,
		"loan_sanctioned_amount"	: parseFloat(loan_sanctioned_amount),
		"loan_sanctioned_date"		: loan_sanctioned_date,
		"chq_issued_on_date"		: chq_issued_on_date,
		"last_modified_date"		: ""+currentDateValue +" at "+ currentTime+"",	
		"last_modified_by"		: user_id				
	     };

	
	dataObj["preparecheque"]  = dataArr;
	dataObj["processDetails"] = processCompleteTask;
	dataObj["taskid"]	  = task_id;

	var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">'
			+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			+'</div>'
			+'</div>';
	$(".popup").empty().append(theImg).fadeIn();
	/*AJAX call:*/
	var url = "/preparecheque";
	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		success: function (data) {		
			$(".popup").fadeOut();
			window.location='/tasks/';
		},
		data: JSON.stringify(dataObj)
	});
}

function loadChequeDetails(){
	if (memberdetails) {
        memberdetails = JSON.parse(memberdetails);
        
        if (memberdetails['dcphysicalArray']) {
            if (memberdetails['dcphysicalArray'][0]) {
                var dispatchData = memberdetails['dcphysicalArray'][0];
                var keys = Object.keys(dispatchData);
                for (var i = 0; i < keys.length; i++) {
                    if (document.getElementById(keys[i])) {
                        document.getElementById(keys[i]).innerHTML = dispatchData[keys[i]];
                    }
                }
            }
        }
        if (memberdetails['mlcompositeArray']) {
            if (memberdetails['mlcompositeArray'][0]['account_number']) {
                var account_number = memberdetails['mlcompositeArray'][0]['account_number'];
                if(document.getElementById('loan_account_number')){
	                document.getElementById('loan_account_number').value = account_number;
	            }
                document.getElementById('che_loan_id').innerHTML = loanId;
                document.getElementById('che_member_id').innerHTML = memberId;
            }
        }
        if (memberdetails['PrepareCheque']) {
            var preche_cheque_number = memberdetails['PrepareCheque']['preche_cheque_number'];
            document.getElementById('cheque_number').value = preche_cheque_number;
        }
        if (memberdetails['sendChequeToCo']) {
            var pre_emi_cheque_number = memberdetails['sendChequeToCo']['pre_emi_cheque_number'];
            document.getElementById('cheque_number').value = pre_emi_cheque_number;
        }
    }

    setSelectOptionInForm(); /*Function in masterDataLoad.js	*/
}


//SUBMIT FORM FUNCTION OF SEND  CHEQUE
function onSubmitFormSendCheque() {
    var che_member_id = document.getElementById("che_member_id").innerHTML;
    var che_loan_id = document.getElementById("che_loan_id").innerHTML;
    var loan_account_number = document.getElementById("loan_account_number").value;
    var cheque_number = document.getElementById("cheque_number").value;
    var che_courier_name = document.getElementById("che_courier_name").value;
    var che_courier_tracking_id = document.getElementById("che_courier_tracking_id").value;
    var che_courier_receipt_number = document.getElementById("che_courier_receipt_number").value;
    var che_courier_handover_date = document.getElementById("che_courier_handover_date").value;
    var place = document.getElementById("place").value;
    var last_modified_by = User;
    [currentDateValue,currentTime]  = currentDate();
    
    
    if(!che_courier_name){
	$.alert('Please enter Courier Name');
	return false;
	}
	if(!che_courier_tracking_id){
		$.alert('Please enter Courier tracking id');
		return false;
	}
	if(!che_courier_receipt_number){
		$.alert('Please enter Courier Receipt Number');
		return false;
	}
	if(!che_courier_handover_date){
		$.alert('Please enter Courier handover date');
		return false;
	}
	if(!place){
		$.alert('Please enter Place');
		return false;
	}
	[currentDateValue,currentTime] = currentDate();
    /*Formating the input values for AVRO*/
    var dataArr = {
        "memberChequeArray": [{
            "che_member_id": parseInt(che_member_id),
            "che_loan_id": parseInt(che_loan_id),
            "loan_account_number": loan_account_number,
            "cheque_number": cheque_number,
            "che_courier_name": che_courier_name,
            "che_courier_tracking_id": che_courier_tracking_id,
            "che_courier_receipt_number": che_courier_receipt_number,
            "che_courier_handover_date": che_courier_handover_date,
            "place": place,
            "last_modified_by": last_modified_by,
            "last_modified_date": "" + currentDateValue + " at " + currentTime + "",

        }]
    };
    var cheque_info = new FormData();
    cheque_info.append('form_data', JSON.stringify(dataArr));
    cheque_info.append('taskId', taskid);
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();
    var opts = {
        url: '/sendCheque',
        data: cheque_info,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error)
        }

    };
    if (cheque_info.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + cheque_info.boundary;
        opts.data = cheque_info;
    }
    jQuery.ajax(opts);
}

//SUBMIT FORM FUNCTION OF DISBURSE CHEQUE
function onSubmitFormDisburseCheque() {
    [currentDateValue,currentTime] = currentDate();
    var user_Id = "{{ user }}";
    var loan_account_number = document.getElementById("loan_account_number").value;
    var cheque_number = document.getElementById("cheque_number").value;
    var cheque_number_pre_emi = document.getElementById("cheque_number_pre_emi").value;
    var cheque_issuer_bank_name = document.getElementById("cheque_issuer_bank_name").value;
    var cheque_issuer_bank_branch = document.getElementById("cheque_issuer_bank_branch").value;
    var payee_name = document.getElementById("payee_name").value;
    var amount = document.getElementById("amount").value;
    var date_of_cheque = document.getElementById("date_of_cheque").value;

    if (!cheque_number_pre_emi) {
        $.alert('Please enter Cheque Number of Pre Emi');
        return false;
    }
    if (!cheque_issuer_bank_name) {
        $.alert('Please enter Bank Branch Name of the Cheque Issuer');
        return false;
    }
    if (!cheque_issuer_bank_branch) {
        $.alert('Please enter the Branch Name of the Cheque Issuer');
        return false;
    }
    if (!payee_name) {
        $.alert('Please enter Payee Name');
        return false;
    }
    if (!amount) {
        $.alert('Please enter the Amount');
        return false;
    }
    if (!date_of_cheque) {
        $.alert('Please enter Date of Cheque');
        return false;
    }

    var che_details = {
        "disburse_loan_id": parseInt(loan_id),
        "disburse_member_id": parseInt(memberId),
        "loan_account_number": loan_account_number,
        "disburse_cheque_number": cheque_number,
        "pre_emi_cheque_number": cheque_number_pre_emi,
        "pre_emi_bank_name": cheque_issuer_bank_name,
        "pre_emi_bank_branch": cheque_issuer_bank_branch,
        "pre_emi_payee_name": payee_name,
        "pre_emi_amount": parseFloat(amount),
        "pre_emi_chq_issued_on_date": date_of_cheque,
        "last_modified_date": "" + currentDateValue + " at " + currentTime + "",
        "last_modified_by": user_id
    };

    var processupdate = {
        "variables": {
            "Collect_Pre_EMI_Status": {
                "value": "Collected"
            }
        }
    };
    var dataObj = {};
    dataObj['processid'] = processid;

    dataObj['loanid'] = loan_id;
    dataObj['taskid'] = task_id;
    dataObj['userid'] = user_id;
    dataObj['process'] = processupdate;

    dataObj["disburseCheque"] = che_details;
    dataObj["processDetails"] = processupdate;
    dataObj["taskid"] = task_id;
    var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();

    urls = '/disburseChequeAndPreEmi';
    $.ajax({
        url: urls,
        type: 'post',
        dataType: 'json',
        success: function(data) {
            $(".popup").fadeOut();
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error);
        },

        data: JSON.stringify(dataObj)
    });
}


//SUBMIT FORM FUNCTION OF SEND CHEQUE TO CO
function onSubmitFormSendChequeToCO() {
    [currentDateValue,currentTime] = currentDate();
    var loan_account_number = "121";
    var cheque_number = document.getElementById("cheque_number").value;
    var che_courier_name = document.getElementById("che_courier_name").value;
    var che_courier_tracking_id = document.getElementById("che_courier_tracking_id").value;
    var che_courier_receipt_number = document.getElementById("che_courier_receipt_number").value;
    var che_courier_handover_date = document.getElementById("che_courier_handover_date").value;
    var place = document.getElementById("place").value;
    var last_modified_by = user_id;

    /*Input value validation*/
    if (!che_courier_name) {
        $.alert('Please enter Courier Name');
        return false;
    }
    if (!che_courier_tracking_id) {
        $.alert('Please enter Courier Tracking ID');
        return false;
    }
    if (!che_courier_receipt_number) {
        $.alert('Please enter Courier Reciept Number');
        return false;
    }
    if (!che_courier_handover_date) {
        $.alert('Please enter Courier Handover date');
        return false;
    }
    if (!place) {
        $.alert('Please enter Place');
        return false;
    }

    /*Formating the input values for AVRO*/
    var dataArr = {
        "memberChequeArray": [{
            "che_member_id": parseInt(memberId),
            "che_loan_id": parseInt(loanId),
            "loan_account_number": loan_account_number,
            "cheque_number": cheque_number,
            "che_courier_name": che_courier_name,
            "che_courier_tracking_id": che_courier_tracking_id,
            "che_courier_receipt_number": che_courier_receipt_number,
            "che_courier_handover_date": che_courier_handover_date,
            "place": place,
            "last_modified_by": last_modified_by,
            "last_modified_date": "" + currentDateValue + " at " + currentTime + ""

        }]
    };
    var cheque_info = new FormData();
    cheque_info.append('form_data', JSON.stringify(dataArr));
    cheque_info.append('taskId', taskid);

    var opts = {
        url: '/sendCheque',
        data: cheque_info,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            window.location = '/tasks/';
        },
        error: function(error) {
            console.log(error)
        }

    };
    if (cheque_info.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + cheque_info.boundary;
        opts.data = cheque_info;
    }

    jQuery.ajax(opts);
}


function submitFormData(id){
	$("#totalCountDiv").css("display","none");
	$("#popup1").css("display","none");
	$("#FilteredDataTable").empty();
	var fromDate='';
	var toDate ='';
	var userName = '';
	var flag=0;
	if(id == 1){
		fromDate = document.getElementById("filterByDateInput").value;
		if(!fromDate){
			$.alert("Please select the date.");
			flag=1;
			return false;
		}
		fromDateSplit = fromDate.split('/');
		fromDate = fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1];
		toDate = fromDate;
		if(document.getElementById("filterByDateInputUser")){
			userName = document.getElementById("filterByDateInputUser").value;
		}
	}
	if(id == 3){
		fromDate = document.getElementById("filterByMonthFrom").value;
		toDate = document.getElementById("filterByMonthTo").value;
		if(!fromDate){
			$.alert("Please select   \"From date\"");
			$("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		if(!toDate){
		    $.alert("Please select   \"To date\"");
		    $("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		if(document.getElementById("filterByWeekInputUser")){
			userName = document.getElementById("filterByMonthInputUser").value;
		}
		fromDateSplit = fromDate.split('/');
		toDateSplit = toDate.split('/');
		fromDate = fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1];
		toDate = toDateSplit[2]+'-'+toDateSplit[0]+'-'+toDateSplit[1];
		var timeDiff = new Date(toDate).getTime() - new Date(fromDate).getTime();
		if(timeDiff < 0){
			$.alert("Please Enter valid dates!");
			$("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		else{
			var diffDays = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24)); 
			if(!(diffDays >= 0 && diffDays <= 31)){
				$.alert("Exceeds more than 30 days!\n\n");
				$("#popup1").css("display","block");
				$("#FilteredDataTable_wrapper").css('display','none');
				return false;
			}
		}
	}
	if(id == 2){
		fromDate = document.getElementById("filterByWeekFrom").value;
		toDate = document.getElementById("filterByWeekTo").value;
		if(!fromDate){
			$.alert("Please select  \"From date\"");
			$("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		if(!toDate){
			$.alert("Please select  \"To date\"");
			$("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		fromDateSplit = fromDate.split('/');
		toDateSplit = toDate.split('/');
		fromDate = fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1];
		toDate = toDateSplit[2]+'-'+toDateSplit[0]+'-'+toDateSplit[1];
		if(document.getElementById("filterByWeekInputUser")){
			userName = document.getElementById("filterByWeekInputUser").value;
		}
		var timeDiff = new Date(toDate).getTime() - new Date(fromDate).getTime();
		if(timeDiff < 0){
			$.alert("Please Enter valid dates!");
			$("#popup1").css("display","block");
			$("#FilteredDataTable_wrapper").css('display','none');
			return false;
		}
		else{
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			if(!(diffDays >= 0 && diffDays <= 7)){
				$.alert("Exceeds more than 7 days!\n\n");
				$("#popup1").css("display","block");
				$("#FilteredDataTable_wrapper").css('display','none');
				return false;
			}
		}
	}		
		
	if(!userName)
		userName = "null"
	
	var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
    $(".popup").empty().append(theImg).fadeIn();
    if(status){
		getProcessDataList(fromDate,toDate);
	}
    else{
		getDataList(fromDate,toDate,userName);
	}
}


function getDataList(fromDate,toDate,userName){
	$.ajax({
		url: '/getLoanInfoByDate/'+fromDate+'/'+toDate+'/'+userName,
		dataType: 'json',
		success: function (data) {	
			$(".popup").fadeOut();	
			if(data["detailsArray"]){
				totalCount = data["detailsArray"].length;
				$("#totalCountDiv").css("display","block");
				document.getElementById("totalCount").innerHTML = totalCount;
				document.getElementById("recordCount").innerHTML = totalCount;
				var dataArray=[];
				for(var keyVal in data["detailsArray"]){
					var obj={};
					if(data["detailsArray"][keyVal]["status"] == "Successful")
						stathtml = '<span style="color:#981b1b;"><i class="fa fa-check-square"></i>&nbsp&nbsp'+data["detailsArray"][keyVal]["status"]+'</span>';
					else
						stathtml = '<span style="color:#981b1b;"><i class="fa fa-exclamation-triangle"></i>&nbsp&nbsp'+data["detailsArray"][keyVal]["status"]+'</span>';
			
						obj["SlNo"] = String(parseInt(keyVal)+1)+".";
						obj["createdDate"] =data["detailsArray"][keyVal]["last_modified_date"];
						obj["member_id"] = data["detailsArray"][keyVal]["member_id"];
						obj["loan_id"] = data["detailsArray"][keyVal]["loan_id"];
						obj["membername"] = data["detailsArray"][keyVal]["first_name"]+' '+data["detailsArray"][keyVal]["last_name"];
						obj["date_of_birth"] = data["detailsArray"][keyVal]["date_of_birth"];
						obj["address"] = data["detailsArray"][keyVal]["door_no"] +', '+ data["detailsArray"][keyVal]["street"]+', '+ data["detailsArray"][keyVal]["location"]
						obj["mobileNum"] = data["detailsArray"][keyVal]["mem_phno"];
						obj["user"] = data["detailsArray"][keyVal]["last_modified_by"];
						obj["status"] = stathtml;
						dataArray.push(obj);
				}
				var table = $('#FilteredDataTable').dataTable({
					data: dataArray,
					destroy: true,  
					"bProcessing": true,
					"scrollY": true,
					fixedHeader : true,
					"sPaginationType": "full_numbers",
					"bSortable": true,	

					"aoColumns": [	
						{ "mData": "SlNo", "sTitle": "S.No", "sWidth": "5%", className:"column"},     
						{ "mData": "createdDate", "sTitle": "Task Date", "sWidth": "7%", className:"column"},               	  
					{ "mData": "member_id","sTitle": "Member ID"  , "sWidth": "7%", className:"column"},
					{ "mData": "loan_id","sTitle": "Loan ID"  , "sWidth": "7%", className:"column"},
					{ "mData": "membername","sTitle": "Member Name"  , "sWidth": "16%", className:"column"},
					{ "mData": "date_of_birth","sTitle": "DOB", "sWidth": "10%", className:"column"},		
					{ "mData": "address", "sTitle": "Resident Address", "sWidth": "22%", className:"column"},
					{ "mData": "mobileNum", "sTitle": "Mobile No.", "sWidth": "8%", className:"column"},
					{ "mData": "user", "sTitle": "User Name", "sWidth": "9%", className:"column"},
					{ "mData": "status", "sTitle": "Status       ", "sWidth": "15%", className:"column"},				
			
					],           		    
				}).fnDestroy();
				table = $('#FilteredDataTable').DataTable( {
					//paging: false
				} );	 
		
				table.destroy();	 
				table = $('#FilteredDataTable').DataTable( {
					//searching: false
				} );	
				table.destroy();
				table = $('#FilteredDataTable').DataTable( {
					fixedHeader : true
				} );
				table.destroy();
				table = $('#FilteredDataTable').DataTable( {
					"fnDrawCallback": function () {
						  var rowCount = this.fnPagingInfo().iFilteredTotal;
						  document.getElementById("recordCount").innerHTML = rowCount;
					}	    
				   
				} );
				$('.column').css('padding-bottom', '0px');
				$('.column').css('padding-top', '0px');	
			}
			else{
				$.alert("No records found.");
				$("#popup1").css("display","block");
				$("#FilteredDataTable_wrapper").css('display','none');
			}
		}
	});
}


function setDataOnLoad(){
	$('.calendar').datepicker({});
	setSelectOptionInForm();
	$('#loanFilterDropdown').val(1);
	if(status){
		if(status == "Rejected"){
			$("#rejectedHeader").css("display","block");
		}
		if(status == "Approved"){
			$("#approvedHeader").css("display","block");
		}
	}
	$(document).on("change",".loanFilterDropdown",function(){
		if(this.value == 1){
			$('#filterByDate').css("display","block");
			$('#filterByMonth').css("display","none");
			$('#filterByWeek').css("display","none");
		
		}
		else if(this.value == 3){			
			$('#filterByDate').css("display","none");
			$('#filterByMonth').css("display","block");
			$('#filterByWeek').css("display","none");
		}
		else{
			$('#filterByDate').css("display","none");
			$('#filterByMonth').css("display","none");
			$('#filterByWeek').css("display","block");
		}
	
	});
	var header='';
	var totalcount = 0;
	window.onload = function(){
		$('#filterByDate').css("display","block");
		$("#totalCountDiv").css("display","none");
		$('#loanFilterDropdown').val(1);
		fromDate = new Date();
		fromDateSplit = String(fromDate).split(' ');
		var monthNumber = parseInt(fromDate.getMonth())+1;
		var inputDate = String(monthNumber)+'/'+fromDateSplit[2]+'/'+fromDateSplit[3];
		fromDate = fromDateSplit[3]+'-'+String(monthNumber)+'-'+fromDateSplit[2];
		toDate = fromDate;
		document.getElementById("filterByDateInput").value = inputDate;
		userName = "null";
		var html ="";
		var dataArray=[];	
		var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
        	$(".popup").empty().append(theImg).fadeIn();		
		if(status){
			getProcessDataList(fromDate,toDate);
		}
		else{
			getDataList(fromDate,toDate,userName);
		}
		
	}
}


function getProcessDataList(fromDate,toDate){
	$.ajax({
		url: '/getProcessListByDate/'+status+'/'+fromDate+'/'+toDate,
		dataType: 'json',
		success: function (data) {	
			$(".popup").fadeOut();	
			if(data["detailsArray"]){
				totalCount = data["detailsArray"].length;
				$("#totalCountDiv").css("display","block");
				document.getElementById("totalCount").innerHTML = totalCount;
				document.getElementById("recordCount").innerHTML = totalCount;
				var dataArray=[];
				for(var keyVal in data["detailsArray"]){
					var obj={};
					if(data["detailsArray"][keyVal]["status"] == "Successful")
						stathtml = '<span style="color:#981b1b;"><i class="fa fa-check-square"></i>&nbsp&nbsp'+data["detailsArray"][keyVal]["status"]+'</span>';
					else
						stathtml = '<span style="color:#981b1b;"><i class="fa fa-exclamation-triangle"></i>&nbsp&nbsp'+data["detailsArray"][keyVal]["status"]+'</span>';
						obj["SlNo"] = String(parseInt(keyVal)+1)+".";
						obj["createdDate"] =data["detailsArray"][keyVal]["last_modified_date"];
						obj["member_id"] = data["detailsArray"][keyVal]["member_id"];
						obj["loan_id"] = data["detailsArray"][keyVal]["loan_id"];
						obj["membername"] = data["detailsArray"][keyVal]["first_name"]+' '+data["detailsArray"][keyVal]["last_name"];
						obj["date_of_birth"] = data["detailsArray"][keyVal]["date_of_birth"];
						obj["address"] = data["detailsArray"][keyVal]["door_no"] +', '+ data["detailsArray"][keyVal]["street"]+', '+ data["detailsArray"][keyVal]["location"]
						obj["mobileNum"] = data["detailsArray"][keyVal]["mem_phno"];
						obj["user"] = data["detailsArray"][keyVal]["last_modified_by"];
						obj["status"] = stathtml;
						dataArray.push(obj);
				}
				var table = $('#FilteredDataTable').dataTable({
					data: dataArray,
					destroy: true,  
					"bProcessing": true,
					"scrollY": true,
					fixedHeader : true,
					"sPaginationType": "full_numbers",
					"bSortable": true,	
		
					"aoColumns": [	
						{ "mData": "SlNo", "sTitle": "S.No", "sWidth": "5%", className:"column"},     
						{ "mData": "createdDate", "sTitle": "Task Date", "sWidth": "7%", className:"column"},               	  
					{ "mData": "member_id","sTitle": "Member ID"  , "sWidth": "7%", className:"column"},
					{ "mData": "loan_id","sTitle": "Loan ID"  , "sWidth": "7%", className:"column"},
					{ "mData": "membername","sTitle": "Member Name"  , "sWidth": "16%", className:"column"},
					{ "mData": "date_of_birth","sTitle": "DOB", "sWidth": "10%", className:"column"},		
					{ "mData": "address", "sTitle": "Resident Address", "sWidth": "22%", className:"column"},
					{ "mData": "mobileNum", "sTitle": "Mobile No.", "sWidth": "8%", className:"column"},
					{ "mData": "user", "sTitle": "User Name", "sWidth": "9%", className:"column"},
					],           		    
				}).fnDestroy();
				table = $('#FilteredDataTable').DataTable( {
					fixedHeader : true
				} );
				table.destroy();
				table = $('#FilteredDataTable').DataTable( {
					"fnDrawCallback": function () {
						  var rowCount = this.fnPagingInfo().iFilteredTotal;
						  document.getElementById("recordCount").innerHTML = rowCount;
					}	    
				} );
				$('.column').css('padding-bottom', '0px');
				$('.column').css('padding-top', '0px');	
			}
			else{
				$.alert("No records found.");
				$("#popup1").css("display","block");
				$("#FilteredDataTable_wrapper").css('display','none');
			}
		}
	});
}




