


var grpTask_name, grpTask_name_Dimension, myTask_name, myTask_name_Dimension,user;
var jsonData=[];
function leftPaneTaskList_Load(){

	tokenId     = taskData.tokenId;
	user		= taskData.user;
	/*for(var i=0;i<taskData["myTask"].length;i++){
	
	jsonData[i] = taskData["myTask"][i];
	}*/
	var myTask  = taskData.myTask;
	var grpTask = taskData.grpTask;	
	document.getElementById('left-pane-grp-task').innerHTML = "";	
	document.getElementById('left-pane-my-task').innerHTML = "";	

	var grpTask_cf = crossfilter(grpTask);
	grpTask_name_Dimension = grpTask_cf.dimension(function(d) {
	   return d.name;
	});
	var dist = grpTask_name_Dimension.group(function(t) { return t; });
	grpTaskLength = dist.top(Infinity);

	var myTask_cf = crossfilter(myTask);
	myTask_name_Dimension = myTask_cf.dimension(function(d) {
	   return d.name;
	});
	var myTaskDist = myTask_name_Dimension.group(function(t) { return t; });
	myTaskLength = myTaskDist.top(Infinity);
	
	var grpList ="";
	for (var i=0; i<grpTaskLength.length; i++){
		grpTaskNameDetails[grpTaskLength[i].key] = grpTask[i];
		if(grpTaskLength[i].value == 1){
			grpList += '<label class="label-text" id="id_grp_'+grpTaskLength[i].key.replace(/ /g,"_").replace(/-/g,"_") +'" onclick="loadGrpTask('+"'"+grpTaskLength[i].key+"',''"+');" > '+grpTaskLength[i].key+'</label><br/>';	
		} else{
			grpList += '<label class="label-text" id="id_grp_'+grpTaskLength[i].key.replace(/ /g,"_").replace(/-/g,"_")+'" onclick="loadGrpTask('+"'"+grpTaskLength[i].key+"','"+grpTaskLength[i].value+"'"+');"> '+grpTaskLength[i].key+'  -  '+grpTaskLength[i].value+'</label><br/>';	
		}
	}

	var myList ="";
	for (var i=0; i<myTaskLength.length; i++){
		myTaskNameDetails[myTaskLength[i].key] = myTask[i];
		if(myTaskLength[i].value == 1){
			myList += '<label class="label-text" id="id_my_'+myTaskLength[i].key.replace(/ /g,"_").replace(/-/g,"_")+'" onclick="loadMyTask('+"'"+myTaskLength[i].key+"',''"+')" > '+myTaskLength[i].key+'</label><br/>';			} else{
			myList += '<label class="label-text" id="id_my_'+myTaskLength[i].key.replace(/ /g,"_").replace(/-/g,"_")+'" onclick="loadMyTask('+"'"+myTaskLength[i].key+"','"+myTaskLength[i].value+"'"+');"> '+myTaskLength[i].key+'  -  '+myTaskLength[i].value+'</label><br/>';	
		}		
	}

	document.getElementById('left-pane-grp-task').innerHTML = grpList;
	document.getElementById('left-pane-my-task').innerHTML = myList;	

	$("#left-pane-my-task").css('display', 'block');
	$("#left-pane-grp-task").css('display', 'block');

	// Get all the links.
	var link = $("#accordion a");

	// On clicking of the links do something.
	link.on('click', function(e) {
	    e.preventDefault();
	    var a = $(this).attr("href");
	    //$(a).slideDown('fast');
	    $(a).slideToggle('fast');
	    //$("#accordion div").not(a).slideUp('fast');
	});

	if(screenHeight){
		var height = screenHeight*(0.9);
		var slipHeight = height/3;
		document.getElementById('left-pane-my-task').style.maxHeight = slipHeight+'px';
		document.getElementById('left-pane-my-task').style.overflowY = 'auto';
		document.getElementById('left-pane-grp-task').style.maxHeight = slipHeight+'px';
		document.getElementById('left-pane-grp-task').style.overflowY = 'auto';
		document.getElementById('left-pane-task').style.maxHeight = (height*0.87)+'px';
		document.getElementById('right-pane-task').style.maxHeight = (height*0.87)+'px';
		document.getElementById('right-pane-task').style.overflowY = 'auto';
	}

	if(myTaskLength.length > 0){
		loadMyTask(myTaskLength[0].key,'');
	}else{
		loadMyTask('','');
	}
}
function loadGrpTask(name, no){


	$('.label-text.active').attr("class","label-text");
	$("#id_grp_"+name.replace(/ /g,"_").replace(/&/g,"_")+"").addClass("active");

	var loadData_filter = grpTask_name_Dimension.filter(name);
	loadData = print_filter(loadData_filter);
	var assignHtml = '';
	
	if(taskData.assignees.length > 0){
		assignHtml = '<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Assign</th>';
	}else{
		assignHtml = '<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Claim</th>';
	}

	var html ="<br><h3 style='display:inline-block;'>&nbsp Group Tasks"+"&nbsp - &nbsp"+ name + "</h3>"+'<input type="search" id="search" value="" class="form-control search" onkeyup="this.onchange();" onpaste="this.onchange();" style="width:30%;float:right;" placeholder="Search"><i class="entypo search"></i></input>';
	html +='<table class="table table-bordered dataTable-head paginated " id="loantableHead" aria-describedby="loantable_info">'
		  +'<thead>'
		     +'<tr role="row">'
		        +'<th width="5%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">S.No</th>'
			+'<th width="10%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Created Date">Task Date</th>'
			+'<th width="7%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member ID</th>'
			+'<th width="25%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member Name</th>'
			+'<th width="30%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Member Address">Member Address</th>'
			+'<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Mobile No.">Mobile No.</th>'
			+assignHtml
		     +'</tr>'
		   +'</thead></table>'
		   +'<table class="table table-bordered dataTable-body paginated" id="loantableBody" aria-describedby="loantable_info">'	
		   +'<tbody role="alert" aria-live="polite" aria-relevant="all">';
	var sortedData= loadData.sort((function (a, b) {  return new Date(b.created) - new Date(a.created) }));
	loadData = sortedData;
	
	if(loadData.length != 0){
		for (var i=0; i<loadData.length; i++){
			var App_Mem_ID="";
			var App_Mem_Name="";
			var App_Loan_ID ="";
			var App_Mem_MobNo="";
			var createdDate='';
			var dueDate='';
			var taskDescription='';
			
			if(loadData[i].created){ 
				createdDate= convertmyDateTime(loadData[i].created);
				/*var dateCreated = new Date(''+createdDate+'');
				var minutes = dateCreated.getMinutes();
				var hours = dateCreated.getHours();
				createdDate =  dateCreated.toDateString();*/
				var dateCreatedSplit = createdDate.split(" ");
				var createdDate = dateCreatedSplit[0]+', '+dateCreatedSplit[1]+'-'+dateCreatedSplit[2]+'-'+dateCreatedSplit[3]+', '+dateCreatedSplit[4];		
				
			}else{createdDate= ""; }
			if(loadData[i].App_Mem_Details){
				var splitMemberDetails = loadData[i].App_Mem_Details.split("@#");
				App_Mem_ID = splitMemberDetails[0];
				App_Loan_ID = splitMemberDetails[1];
				App_Mem_Name = splitMemberDetails[2];
				App_Mem_MobNo = splitMemberDetails[3];
			}
			if(loadData[i].due){
				dueDate= loadData[i].created;
				var dateDue = new Date(''+dueDate+'');
				dueDate =  dateDue.toDateString();
			}else{dueDate= "No Due date"; }
			
			if(loadData[i].description){ taskDescription= loadData[i].description;}else{taskDescription= ""; }
			if(taskData.assignees.length > 0){
				var selectHtml = '<select class="extra select form-control" id="assignId">'
						+'<option value="">Choose Assignee</option>';
				for(var j=0; j<taskData.assignees.length; j++){
					selectHtml+='<option value="'+taskData.assignees[j]+'">'+taskData.assignees[j]+'</option>';
				}
				selectHtml += '</select>';

				html +='<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
						+'<td width="10%" class="">'+createdDate+'</td>'
						+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
						+'<td width="25%" class=""><strong>'+App_Mem_Name+'</strong></td>'
						
						+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
						+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
						+'<td width="15%" class=" ">'
						    +selectHtml	
						    +'<div class="form-group text-center">'
							+'<div class="" style="float:left;">'
								+'<a href="javascript:void(0)" onclick="assign('+"'"+loadData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'/*padding:4px 4px;*/
								+'<i class="icon-entypo-check" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
								+'Assign</a>'
							+'</a>'
							+'</div>'
						    +'</div>'
						+'</td>'	
					+'</tr>';

			}else{

				if(taskData.grp == "Distributor"){
					html +='<tr class="gradeA odd">'
							+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
							+'<td width="25%" class=""><strong>'+App_Mem_Name+'</strong></td>'
							+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
							+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
							+'<td width="15%" class=" ">'
							+'</td>'	
						+'</tr>';

				} else {
					
					html +='<tr class="gradeA odd">'
							+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
							+'<td width="25%" class=""><strong>'+App_Mem_Name+'</strong></td>'
							+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
							+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
							+'<td width="15%" class=" ">'
							    +'<div class="form-group text-center">'
								+'<div class="" style="float:left;">'
									+'<a href="javascript:void(0)" onclick="claim('+"'"+loadData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'/*padding:4px 4px;*/
									+'<i class="icon-entypo-check" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
									+'Claim</a>'
								+'</a>'
								+'&nbsp&nbsp&nbsp&nbsp&nbsp<label class ="history" onclick="getHistory('+"'"+loadData[i].processInstanceId+"','"+App_Mem_ID+"','"+App_Mem_Name+"'"+');" ><i class="entypo-back-in-time" style="font-size:medium;"></i></label>'
								+'</div>'
							    +'</div>'
							+'</td>'	
						+'</tr>';


				}
			}
		}
	}else{
		html +='<tr class="gradeA odd">'
				+'<td class=" " colspan="5">No Group Task found</td>'
			+'</tr>';

	}
	html += '</tbody></table>'
	document.getElementById('right-pane-task-detail').innerHTML = html;
	
	triggerCommentToggle();

}


function getHistory(processId,memberid,memberName){
	var historyDict =[];
	var remarksDict = [];
	var historyWithCommentsDict =[];
	$.ajax({
	    url: '/getHistory/'+processId,
	    dataType: 'json',
	    success: function (data) {
		var history = JSON.parse(data);
		for(var i=0;i<history.length;i++){
			var arr={};
			if(history[i]["activityType"] == "serviceTask" || history[i]["activityType"] == "userTask" ){
				arr["startTime"]= history[i]["startTime"];
				arr["activityName"] = history[i]["activityName"];
				arr["taskId"]=history[i]["taskId"];
				historyDict.push(arr);
			}
		}
		var html="";
		var sortedData= historyDict.sort((function (a, b) {  return new Date(a.startTime) - new Date(b.startTime) }));
		historyDict = sortedData;
		$.ajax({
		    url: '/getMemberId/'+processId,
		    dataType: 'json',
		    success: function (data1) {
			    if(data1['MemberId'].value && data1['LoanId'].value){
				    $.ajax({
					    url: '/readMLValidationData/'+data1['MemberId'].value+'/'+data1['LoanId'].value,
					    dataType: 'json',
					    success: function (data2) {
							if(data2["mlValidationArray"]){
								for(var j=0;j<historyDict.length;j++){
									for(var i=0;i<data2["mlValidationArray"].length; i++){
										var arr1={};
										arr1["remarks"]=data2["mlValidationArray"][i]["remarks"];
										var commentdate= convertmyDateTime(data2["mlValidationArray"][i]["validation_last_modified_date"]);
										var commentdateSplit = commentdate.split(" ");
										comment_date = commentdateSplit[0]+', '+commentdateSplit[1]+'-'+commentdateSplit[2]+'-'+commentdateSplit[3]+', '+commentdateSplit[4];
										arr1["validation_last_modified_date"] = comment_date;
										arr1["taskName"]= data2["mlValidationArray"][i]["task_name"];
										arr1["task_id"]= data2["mlValidationArray"][i]["task_id"];
										arr1["commented_user"] =data2["mlValidationArray"][i]["validation_fk_last_modified_by"];
											remarksDict.push(arr1);
											    if(historyDict[j]["activityName"] == remarksDict[i]["taskName"] && remarksDict[i]["task_id"] == historyDict[j]["taskId"] ){
										     		historyDict[j]["remarks"] = remarksDict[i]["remarks"];
											    	    if(remarksDict[i]["remarks"] && remarksDict[i]["validation_last_modified_date"]){
															historyDict[j]["remarks"] =remarksDict[i]["remarks"];
															historyDict[j]["remarksDate"]= 'Commented by <label style="font-size:13px;font-weight:bold;">'+remarksDict[i]["commented_user"].toUpperCase()+ "</label> on " +remarksDict[i]["validation_last_modified_date"];
										   				 }
														else{
																historyDict[j]["remarks"] ="";
															historyDict[j]["remarksDate"]= "";
														}
												}
										}
								}
								$('#Modal').css('display','block');
								var html="";
								html += '<div class="classmemberDetails">'+memberName+'<div><font >Member ID : '+data1['MemberId'].value+'</font>&nbsp&nbsp&nbsp&&nbsp&nbsp&nbsp<font>Loan ID : '+data1['LoanId'].value+'</font></div></div><div class="main"><ul class="cbp_tmtimeline">';
								for(var i=0;i<historyDict.length-1;i++){                         
									if(!historyDict[i].remarksDate || !historyDict[i].remarks ){
										 historyDict[i].remarksDate ="";
										 historyDict[i].remarks ="";
									}
									var date= convertmyDateTime(historyDict[i].startTime);
									var dateCreatedSplit = date.split(" ");
									//date = dateCreatedSplit[0]+', '+dateCreatedSplit[1]+'-'+dateCreatedSplit[2]+'-'+dateCreatedSplit[3]+', '+dateCreatedSplit[4];	
									var onlyDate = dateCreatedSplit[1]+'-'+dateCreatedSplit[2]+'-'+dateCreatedSplit[3];
									var onlyTime = dateCreatedSplit[4];	
									/*var onlyTime = dateCreatedSplit[4].split(':');	
									onlyTime = onlyTime[0]+':'+onlyTime[1];*/
									
									if(!historyDict[i].remarks){
										html += '<li><time class="cbp_tmtime" datetime="'+onlyDate+' '+onlyTime+'"><span>'+onlyDate+'</span> <span>'+onlyTime+'</span></time>'
												+'<div class="cbp_tmicon cbp_tmicon-phone"></div><div class="cbp_tmlabel"><h3>'+historyDict[i].activityName+'</h3>';
												+'</div></li>';
									}
									else{
										html += '<li><time class="cbp_tmtime" datetime="'+onlyDate+' '+onlyTime+'"><span>'+onlyDate+'</span> <span>'+onlyTime+'</span></time>'
												+'<div class="cbp_tmicon cbp_tmicon-phone"></div><div class="cbp_tmlabel"><h3>'+historyDict[i].activityName+'</h3>'
												+'<p class="tmtime_ptag">'+historyDict[i].remarks+'<br><br><p class="tmtime_innerptag clearfix">'+historyDict[i]["remarksDate"]+'</p></p></div></li>';
									}
								}	
								html +='</ul></div>';
								if(document.getElementById("historyModal")){
									document.getElementById('historyModal').innerHTML = html;	
								}
							}
						}
			  	    });	
			    }
		     }
		 });
	   }
	});
}


function courierNameInput(val,id){
	var html="";
	if(val == "Others"){
		html +='<input type=text" id="courierId" placeholder="COURIER NAME" style="margin-top:3px;width:40%;margin-left:41%;"></input>';
		$("#courierNameDiv").append(html);
	}
	else{
		$("#courierId").remove();
	}


}


function loadMyTask(name, no){
	
	$('.label-text.active').attr("class","label-text");
	$("#id_my_"+name.replace(/ /g,"_").replace(/&/g,"_")+"").addClass("active");
	var loadData_filter = myTask_name_Dimension.filter(name);
	loadData = print_filter(loadData_filter);
	if(name == "Despatch Documents to CO" ){
	var html ="<br><h3 style='display:inline-block;'>&nbsp My Task "+"&nbsp - &nbsp"+ name + "</h3>";
	html +='<div class="despatch_form"><div class="form_content"><div class="member_class" ><div class="colomn-div" id="courierNameDiv"><label>Courier Name</label><font> : </font><select id="doc_courier_name" class="extra select form-control chq_courier_name"  name="chq_courier_name"  onchange="courierNameInput(this.value,this.id);" placeholder="chq_courier_name"></select><font class="mandatory">*</font></div></div>'
		  +'<div class="member_class" ><div class="colomn-div"><label>Courier Number/Tracking Id</label><font> : </font><input  type="text" id="doc_courier_tracking_id"  name="doc_courier_tracking_id" placeholder="COURIER NUMBER/ TRACKING ID"/></div></div><br>'
		  +'<div class="member_class" ><div class="colomn-div"><label>Receipt Number</label><font> : </font><input  type="text" id="doc_courier_receipt_number"  name="doc_courier_receipt_number" placeholder="RECEIPT NUMBER"/></br></div></div><br>'
		  +'<div class="member_class" ><div class="colomn-div"><label>Date</label><font>  : </font><input  type="date" id="doc_courier_handover_date"  name="doc_courier_handover_date" placeholder="DATE"/></br></div></div><br>'
		  +'<div class="member_class" ><div class="colomn-div"><label>Place</label><font>  : </font><input  type="text" id="place"  name="place" placeholder="PLACE"/></br></div></div><br>'
		  +'</div></div><br><br><table class="table table-bordered dataTable-head display" id="loantableHead" aria-describedby="loantable_info">'
		  +'<thead>'
		     +'<input type="search" id="search" value="" class="form-control search" onkeyup="this.onchange();" onpaste="this.onchange();" style="width:30%;float:right;margin-right:2%;" placeholder="Search"><i class="entypo search"></i></input><br><br><br><tr role="row">'
		    	+'<th width="5%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">S.No</th>'
			+'<th width="10%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Created Date">Task Date</th>'		     	
			+'<th width="7%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">Member ID</th>'
			+'<th width="25%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member Name</th>'
			+'<th width="30%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member Address</th>'
			+'<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Due Date">Mobile No.</th>'
			+'<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Unclaim</th>'
		     +'</tr>'
		   +'</thead></table>'
		   +'<div style="float:right;width:13%;"><input type="checkbox" style="width:15%;" id="ckbCheckAll">Select All</input></div><table class="table table-bordered dataTable-body display" id="loantableBody" aria-describedby="loantable_info">'	
		   +'<tbody role="alert" aria-live="polite" aria-relevant="all">';
		 
	}
	else{
	var html ="<br><h3 style='display:inline-block;'>&nbsp My Task "+"&nbsp - &nbsp"+ name + "</h3>"+'<input type="search" id="search" value="" class="form-control search" onkeyup="this.onchange();" onpaste="this.onchange();" style="width:30%;float:right;margin-right:2%;" placeholder="Search"><i class="entypo search"></i></input>';
	html +='<table class="table table-bordered dataTable-head display" id="loantableHead" aria-describedby="loantable_info">'
		  +'<thead>'
		     +'<tr role="row">'
		    	+'<th width="5%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">S.No</th>'
			+'<th width="10%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Created Date">Task Date</th>'		     	
			+'<th width="7%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">Member ID</th>'
			+'<th width="25%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member Name</th>'
			+'<th width="30%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Member Address</th>'
			+'<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Due Date">Mobile No.</th>'
			+'<th width="15%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Unclaim</th>'
		     +'</tr>'
		   +'</thead></table>'
		   +'<table class="table table-bordered dataTable-body display" id="loantableBody" aria-describedby="loantable_info">'	
		   +'<tbody role="alert" aria-live="polite" aria-relevant="all">';
		   }
	if(loadData.length != 0){
		for (var i=0; i<loadData.length; i++){
			var App_Mem_ID="";
			var App_Mem_Name="";
			var App_Loan_ID ="";
			var App_Mem_MobNo="";
			//jsonData.push(loadData[i]);
			var sortedData= loadData.sort((function (a, b) {  return new Date(b.created) - new Date(a.created) }));
			loadData = sortedData;
			var createdDate='';
			var dueDate='';
			var taskDescription='';
			if(loadData[i].created){ 
				createdDate= convertmyDateTime(loadData[i].created);
				var dateCreatedSplit = createdDate.split(" ");
				var createdDate = dateCreatedSplit[0]+', '+dateCreatedSplit[1]+'-'+dateCreatedSplit[2]+'-'+dateCreatedSplit[3]+', '+dateCreatedSplit[4];				
			}else{createdDate= ""; }
			if(loadData[i].App_Mem_Details){
				var splitMemberDetails = loadData[i].App_Mem_Details.split("@#");
				App_Mem_ID = splitMemberDetails[0];
				App_Loan_ID = splitMemberDetails[1];
				App_Mem_Name = splitMemberDetails[2];
				App_Mem_MobNo = splitMemberDetails[3];
			}
			if(loadData[i].due){
				dueDate= loadData[i].created;
				var dateDue = new Date(''+dueDate+'');
				dueDate =  dateDue.toDateString();
			}else{dueDate= "No Due date";}
			if(loadData[i].description){ taskDescription= loadData[i].description;
			}else{taskDescription= ""; }
			if(taskData.grp == "Distributor"){

				html +='<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
						+'<td width="10%" class="">'+createdDate+'</td>'
						+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
						+'<td width="25%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+loadData[i].processInstanceId+"','"+loadData[i].processInstanceId+"','"+loadData[i].id+"','"+loadData[i].name+"'"+')">'+App_Mem_Name+'</strong></td>'
						+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
						+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
						+'<td width="15%" class=" ">'
						+'</td>'	
					+'</tr>';
			}else{
				if(name == "Despatch Documents to CO"){
					html +='<tr class="gradeA odd">'
							+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
							+'<td width="25%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+loadData[i].processInstanceId+"','"+loadData[i].processInstanceId+"','"+loadData[i].id+"','"+loadData[i].name+"'"+')">'+App_Mem_Name+'</strong></td>'
							+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
							+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
							+'<td width="15%" class=" ">'
								+'<div class="form-group text-center">'
								+'<div class="">'
									+'<input type="checkbox" id="Mem_'+App_Mem_ID+'_'+App_Loan_ID+'_'+loadData[i].id+'" class="checkBoxClass" style="width:20%;margin-left:-5px;"></input>&nbsp<a href="javascript:void(0)" id='+"'"+loadData[i].id+"'"+' class="btn btn-red btn-icon icon-left confirmDialog" style="height:30px;padding-left:30px;width:85px;">'
									+'<i class="icon-entypo-cancel" style="width:25px;height: 28px;color: white;padding:6px;"></i>'
									+'Unclaim</a>'
								+'</a>'
								+'&nbsp&nbsp<label class="history" onclick="getHistory('+"'"+loadData[i].processInstanceId+"','"+App_Mem_ID+"'"+');"><i class="entypo-back-in-time" style="font-size:medium;"></i></label>'
								+'</div>'
								+'</div>'
							+'</td>'	
						+'</tr>';
				}
				else{
					html +='<tr class="gradeA odd">'
							+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="7%" class=""><strong>'+App_Mem_ID+' </strong></td>'
							+'<td width="25%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+loadData[i].processInstanceId+"','"+loadData[i].processInstanceId+"','"+loadData[i].id+"','"+loadData[i].name+"'"+')">'+App_Mem_Name+'</strong></td>'
							+'<td width="30%" class=" ">'+loadData[i].App_Mem_Address+'</td>'
							+'<td width="15%" class=" ">'+App_Mem_MobNo+'</td>'
							+'<td width="15%" class=" ">'
								+'<div class="form-group text-center">'
								+'<div class="" style="float:left;">'
									+'<a href="javascript:void(0)" onclick="unClaim('+"'"+loadData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
									+'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
									+'Unclaim</a>'
								+'</a>'
								+'&nbsp&nbsp&nbsp&nbsp&nbsp<label class="history" onclick="getHistory('+"'"+loadData[i].processInstanceId+"','"+App_Mem_ID+"','"+App_Mem_Name+"'"+');"><i class="entypo-back-in-time" style="font-size:medium;"></i></label>'
								+'</div>'
								+'</div>'
							+'</td>'	
						+'</tr>';
					}

			}
		}
	}else{
		html +='<tr class="gradeA odd">'
				+'<td class=" " colspan="5">No Tasks found</td>'
			+'</tr>';

	}
	if(name == "Despatch Documents to CO"){
		var newtask ="New";
		html += '</tbody></table><br><div class="form-group text-center" >'
			+'<div class="" >'
			+'<a href="javascript:void(0)" 	 class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">'
			+'<i class="icon-entypo-cancel"	 style="width:30px;height: 28px;color: white;padding:6px;"></i>'
			+'Cancel</a>'
			+'&nbsp<a href="javascript:void(0)" onclick="submitCourierForm();" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
			+'<i class="icon-entypo-check"  style="width:30px;height: 28px;color: white;padding:6px;"></i>'
			+'Submit</a>'
			+'</div></div><br><br>'
	}
	/*else if(name == "Redespatch Documents to CO"){
		var Rework ="ReworkCompleted";
		html += '</tbody></table><br><div class="form-group text-center" >'
			+'<div class="" >'
			+'<textarea style="width:45%;height:20%;background-color:white;font-size: 11px;" id="comments"    placeholder="Comments"></textarea><font class="mandatory">*</font>'
			+'<br><a href="javascript:void(0)" 	 class="btn btn-red btn-icon icon-left"  style="height:30px;padding-left:40px;">'
			+'<i class="icon-entypo-cancel"	 style="width:30px;height: 28px;color: white;padding:6px;"></i>'
			+'Cancel</a>'
			+'&nbsp<a href="javascript:void(0)" onclick="submitCourierForm(2);" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
			+'<i class="icon-entypo-check"  style="width:30px;height: 28px;color: white;padding:6px;"></i>'
			+'Rework Completed</a>'
			+'</div></div><br><br>'
	}*/
	else{
		html += '</tbody></table>';
	}
	document.getElementById('right-pane-task-detail').innerHTML = html;
	confirmBox();
	setSelectOptionInForm();
	changePage(1);
	triggerCommentToggle();
		
}

function confirmBox(){
	$('.confirmDialog').confirm({
		    title: 'Are you sure want to continue?',
		    confirmButton: 'Yes',
		    cancelButton: 'No',
		    confirm: function(){
		    var self =this;
		    var id;
		    $('.confirmDialog').each(function (){
			id=this.id;
		    });
		    	unClaim(id)
		    },
		    cancel: function(){
		      $.alert({
		       title: 'Cancelled!!',
		      	confirmButton: 'Okay',
		    	});
		     }
		});


}


function submitCourierForm(){
		var dataArr =[];
		var doc_courier_name			= document.getElementById("doc_courier_name").value;
		var doc_courier_tracking_id		= document.getElementById("doc_courier_tracking_id").value;
		var doc_courier_receipt_number		= document.getElementById("doc_courier_receipt_number").value;
		var doc_courier_handover_date		= document.getElementById("doc_courier_handover_date").value;
		var place				= document.getElementById("place").value;
		var dataObj 		= {};
		var arr=[];
		$("input:checkbox").each(function(){
			var memberId='';
			var loanId ='';
			var taskId='';
		 	if($(this).is(":checked")){
			var val =$(this).attr("id") ;
			if(val.startsWith("Mem_") == true){
				var splitVal = val.split('_');
				memberId = parseInt(splitVal[1]);
				loanId = parseInt(splitVal[2]);
				taskId = splitVal[3];
				var temp_arr = 
				
						{
						"fk_member_id"			: parseInt(memberId)		,
						"fk_loan_id"			: parseInt(loanId)		,
						"doc_courier_tracking_id" 	: doc_courier_tracking_id	,
						"doc_courier_handover_date" 	: doc_courier_handover_date	,
						"doc_courier_name"	  	: doc_courier_name		,
						"doc_courier_receipt_number"	: doc_courier_receipt_number	,	
						"doc_courier_tracking_id "	: doc_courier_tracking_id 	,
						"last_modified_by"		: user			,
						"place"				: place,
						"task_id"			: taskId
						};
				arr.push(temp_arr);
				}
				
				}
			});
				dataArr = {
					"dcphysicalArray":arr
					};
				var processCompleteTask = { "variables": { "Despatch_Doc_Status" : { "value" : "New" } } };
				
				dataObj['process'] 	= processCompleteTask;
				
					dataObj = {
					"dispatchDetails": dataArr,
					"processDetails" : processCompleteTask
					};
				var theImg = '<div class="loading"><img style="width:350px;height:250px;" src="/static/images/buffer-loading.gif">'
						+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
						+'</div>'
						+'</div>';
				$(".popup").empty().append(theImg).fadeIn();
				/*AJAX call:*/
				
				$.ajax({
					url: '/dispatchDocsBatchUpdate/',
					type: 'POST',
					dataType: 'json',
					success: function (data) {
						$(".popup").fadeOut();
						window.location='/tasks/';
					},
					error: function(error) {
						console.log(error);
					},
					data: JSON.stringify(dataObj)			
				});
			
	//}
 }






$(document).on('click',"#ckbCheckAll", function (){
    $(".checkBoxClass").prop('checked', $(this).prop('checked'));  
});

function unClaimAlertDispatchDocuments(id){ 
 /*$.alerts.okButton = ' Yes ';
    $.alerts.cancelButton = ' No ';                  
       jConfirm('Are you sure??',  '', function(r) {
         if (r == true) {                    
            unClaim(id);
         }  
       });*/
	var val = confirm("Are you sure want to Unclaim??");
	if(val == true)
	    unClaim(id);
	else{
	return false;}
}



function changePage(page) {
    /*var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("loantableBody");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < Object.keys(jsonData).length; i++) {
        listing_table.innerHTML  +='<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+jsonData[i]["Member ID"]+'. </strong></td>'
						+'<td width="30%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+jsonData[i].processInstanceId+"','"+jsonData[i].processInstanceId+"','"+jsonData[i].id+"','"+jsonData[i].name+"'"+')">'+jsonData[i].name+'</strong></td>'
						+'<td width="10%" class="">'+jsonData[i]["createdDate"]+'</td>'
						+'<td width="10%" class=" ">'+jsonData[i]["dueDate"]+'</td>'
						+'<td width="30%" class=" ">'+jsonData[i]["description"]+'</td>'
						+'<td width="20%" class=" ">'
						    +'<div class="form-group text-center">'
							+'<div class="" style="float:left;">'
								+'<a href="javascript:void(0)" onclick="unClaim('+"'"+jsonData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
								+'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
								+'Unclaim</a>'
							+'</a>'
							+'</div>'
						    +'</div>'
						+'</td>'	
					+'</tr>';
    }
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
*/

}
 

	
/*$.confirm({
    confirmButton: 'Yes',
    cancelButton: 'No',
    confirm: function(){
    var self =this;
    	unClaim(id)
    },
    cancel: function(){
     $.alert("Cancelled!!")
     }
});*/



$(document).on("change", ".search", function() { 
var yourtext = $(this).val();
     id=parseInt(yourtext);
    if (yourtext.length > 0) {
        var abc = $("#loantableBody tr").filter(function () {
            var str = $(this).text();
            var re = new RegExp(yourtext, "i");
            var result = re.test(str);
            
            if (!result) {
                return $(this);
            }
           
        }).hide();
    } else {
        $("#loantableBody tr").show();
    }
    

});

$(document).on("keyup", ".search", function() {
var yourtext = $(this).val();
     id=parseInt(yourtext);
    if (yourtext.length > 0) {
        var abc = $("#loantableBody tr").filter(function () {
            var str = $(this).text();
            var re = new RegExp(yourtext, "i");
            var result = re.test(str);
            
            if (!result) {
                return $(this);
            }
           
        }).hide();
    } else {
        $("#loantableBody tr").show();
    }
    

});




function numPages()
{
    return Math.ceil(Object.keys(jsonData).length / records_per_page);
}
 
function convertmyDateTime(date){

var dt = new Date(Date.parse(date));
    var localDate = dt;
    var min = localDate.getTime() / 1000 / 60; // convert gmt date to minutes
    var localNow = new Date().getTimezoneOffset(); // get the timezone
    var localTime = min+localNow; // get the local time

    var dateStr = new Date(localTime * 1000 * 60);
    dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    return dateStr;
    }

function triggerCommentToggle(){
	$('.comment-toggle').on('click', function () {
		$('#right-pane-task-detail').toggleClass('detail-max detail-min');
		$('#right-pane-task-comment-list').toggleClass('comment-min comment-max');
	});
}


function getMemberId(id, processid, taskid, taskName){

	var taskid = taskid;
	$.ajax({
	    url: '/getMemberId/'+id+'',
	    dataType: 'json',
	    success: function (data) {
		console.log(data);
		if(data['MemberId'] && data['LoanId']){
		    if(data['MemberId'].value && data['LoanId'].value){
		        //if(data['ChequeId'].value){	
			//    window.location ="/vvlFormsRead/"+data['MemberId'].value+"/"+data['LoanId'].value+"/"+processid+"/"+taskid+"/"+taskName+"/"+data['ChequeId'].value;
		        //}else{
			    window.location ="/vvlFormsRead/"+data['MemberId'].value+"/"+data['LoanId'].value+"/"+processid+"/"+taskid+"/"+taskName+"/0";
			    //console.log("/vvlFormsRead/"+data['MemberId'].value+"/"+data['LoanId'].value+"/"+processid+"/"+taskid+"/"+taskName+"/0");			    
		        //}	
		    }
		}	
	    }
	});

}

function claim(d){

	$.ajax({
	    url: '/task/'+d+'/claim/user',
	    dataType: 'json',
	    success: function (data) {
		taskData = data; 
		leftPaneTaskList_Load();
	    }
	});
}

function assign(d){

	var userName =  document.getElementById('assignId').value;
	if(!userName){
		alert("Please assign a person");
		return false;
	}

	$.ajax({
	    url: '/task/'+d+'/claim/'+userName+'',
	    dataType: 'json',
	    success: function (data) {
		taskData = data; 
		leftPaneTaskList_Load();
	    }
	});
}


function unClaim(d){
	$.ajax({
	    url: '/task/'+d+'/unclaim/user',
	    //type: 'post',
	    dataType: 'json',
	    success: function (data) {
		taskData = data; 
		leftPaneTaskList_Load();
	    }
	});
}


var current_page = 1;
var records_per_page = 5;


function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}


//Function called for getting datas into array from a crossfilter filter::
function print_filter(filter) {
	var f = eval(filter);	
	if (typeof(f.length) != "undefined") {}
	else {}
	if (typeof(f.top) != "undefined") {
		    f = f.top(Infinity);
		}
	else {}
	if (typeof(f.dimension) != "undefined") {
		    f = f.dimension(function(d) {
			return d;
		    }).top(Infinity);
		}
	else {}
	return f;
 };
