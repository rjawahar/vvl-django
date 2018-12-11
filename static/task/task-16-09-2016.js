
var grpTask_name, grpTask_name_Dimension, myTask_name, myTask_name_Dimension;
var jsonData=[];
function leftPaneTaskList_Load(){

	tokenId     = taskData.tokenId;
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

	console.log('loadGrpTask');	

	$('.label-text.active').attr("class","label-text");
	$("#id_grp_"+name.replace(/ /g,"_").replace(/&/g,"_")+"").addClass("active");

	var loadData_filter = grpTask_name_Dimension.filter(name);
	loadData = print_filter(loadData_filter);
	var assignHtml = '';
	
	if(taskData.assignees.length > 0){
		assignHtml = '<th width="20%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Assign</th>';
	}else{
		assignHtml = '<th width="20%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Claim</th>';
	}

	var html ="<h3 style='display:inline-block;'>Group Tasks</h3>"+'';
	html +='<table class="table table-bordered dataTable-head paginated " id="loantableHead" aria-describedby="loantable_info">'
		  +'<thead>'
		     +'<tr role="row">'
			+'<th width="5%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">S.No</th>'
			+'<th width="30%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Name</th>'
			+'<th width="10%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Created Date">Created Date</th>'
			+'<th width="10%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Due Date">Due Date</th>'
			+'<th width="30%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Description</th>'
			+assignHtml
		     +'</tr>'
		   +'</thead></table>'
		   +'<table class="table table-bordered dataTable-body paginated" id="loantableBody" aria-describedby="loantable_info">'	
		   +'<tbody role="alert" aria-live="polite" aria-relevant="all">';

	if(loadData.length != 0){
		for (var i=0; i<loadData.length; i++){
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
						+'<td width="5%" class=""><strong>'+(i+1)+' </strong></td>'
						+'<td width="30%" class=""><strong>'+loadData[i].name+'</strong></td>'
						+'<td width="10%" class="">'+createdDate+'</td>'
						+'<td width="10%" class=" ">'+dueDate+'</td>'
						+'<td width="30%" class=" ">'+taskDescription+'</td>'
						+'<td width="20%" class=" ">'
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
							+'<td width="30%" class=""><strong>'+loadData[i].name+'</strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="10%" class=" ">'+dueDate+'</td>'
							+'<td width="30%" class=" ">'+taskDescription+'</td>'
							+'<td width="20%" class=" ">'
							+'</td>'	
						+'</tr>';

				} else {

					html +='<tr class="gradeA odd">'
							+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
							+'<td width="30%" class=""><strong>'+loadData[i].name+'</strong></td>'
							+'<td width="10%" class="">'+createdDate+'</td>'
							+'<td width="10%" class=" ">'+dueDate+'</td>'
							+'<td width="30%" class=" ">'+taskDescription+'</td>'
							+'<td width="20%" class=" ">'
							    +'<div class="form-group text-center">'
								+'<div class="" style="float:left;">'
									+'<a href="javascript:void(0)" onclick="claim('+"'"+loadData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'/*padding:4px 4px;*/
									+'<i class="icon-entypo-check" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
									+'Claim</a>'
								+'</a>'
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

function loadMyTask(name, no){
	$('.label-text.active').attr("class","label-text");
	$("#id_my_"+name.replace(/ /g,"_").replace(/&/g,"_")+"").addClass("active");
	var loadData_filter = myTask_name_Dimension.filter(name);
	loadData = print_filter(loadData_filter);
	
	var html ="<h3 style='display:inline-block;'>My Task</h3>"+'<input type="search" id="search" value="" class="form-control" style="width:30%;float:right;" placeholder="Search"><i class="entypo search"></i></input>';
	html +='<table class="table table-bordered dataTable-head display" id="loantableHead" aria-describedby="loantable_info">'
		  +'<thead>'
		     +'<tr role="row">'
			+'<th width="5%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="S">S.No</th>'
			+'<th width="30%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Group Name">Name</th>'
			+'<th width="10%" data-hide="phone" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Created Date">Created Date</th>'
			+'<th width="10%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Due Date">Due Date</th>'
			+'<th width="30%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Description</th>'
			+'<th width="20%" class="sorting" role="columnheader" tabindex="0" aria-controls="loantable" rowspan="1" colspan="1" aria-label="Description">Unclaim</th>'
		     +'</tr>'
		   +'</thead></table>'
		   +'<table class="table table-bordered dataTable-body display" id="loantableBody" aria-describedby="loantable_info">'	
		   +'<tbody role="alert" aria-live="polite" aria-relevant="all">';
		   //loadData = JSON.parse(loadData);
	if(loadData.length != 0){
		for (var i=0; i<loadData.length; i++){
			
			jsonData.push(loadData[i]);
			var sortedData= loadData.sort((function (a, b) {  return new Date(b.created) - new Date(a.created) }));
			loadData = sortedData;
			var createdDate='';
			var dueDate='';
			var taskDescription='';

			if(loadData[i].created){ 
			
				createdDate= convertmyDateTime(loadData[i].created);
				
				
				/*var dateCreated = new Date(''+createdDate+'');
				createdDate =  dateCreated.toDateString();*/
				
				var dateCreatedSplit = createdDate.split(" ");
				/*var dateCreatedSplitTim = dateCreatedSplit[1].split(':');				*/
//				var createdDate      = dateCreatedSplit[0]+", "+dateCreatedSplitTim[0]+":"+dateCreatedSplitTim[1];
				var createdDate = dateCreatedSplit[0]+', '+dateCreatedSplit[1]+'-'+dateCreatedSplit[2]+'-'+dateCreatedSplit[3]+', '+dateCreatedSplit[4];				
			}else{createdDate= ""; }
			
			if(loadData[i].due){
				dueDate= loadData[i].created;
				var dateDue = new Date(''+dueDate+'');
				dueDate =  dateDue.toDateString();
			}else{dueDate= "No Due date"; }
			if(loadData[i].description){ taskDescription= loadData[i].description;}else{taskDescription= ""; }

			if(taskData.grp == "Distributor"){

				html +='<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
						+'<td width="30%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+loadData[i].processInstanceId+"','"+loadData[i].processInstanceId+"','"+loadData[i].id+"','"+loadData[i].name+"'"+')">'+loadData[i].name+'</strong></td>'
						+'<td width="10%" class="">'+createdDate+'</td>'
						+'<td width="10%" class=" ">'+dueDate+'</td>'
						+'<td width="30%" class=" ">'+taskDescription+'</td>'
						+'<td width="20%" class=" ">'
						+'</td>'	
					+'</tr>';
			}else{
				html +='<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
						+'<td width="30%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+loadData[i].processInstanceId+"','"+loadData[i].processInstanceId+"','"+loadData[i].id+"','"+loadData[i].name+"'"+')">'+loadData[i].name+'</strong></td>'
						+'<td width="10%" class="">'+createdDate+'</td>'
						+'<td width="10%" class=" ">'+dueDate+'</td>'
						+'<td width="30%" class=" ">'+taskDescription+'</td>'
						+'<td width="20%" class=" ">'
						    +'<div class="form-group text-center">'
							+'<div class="" style="float:left;">'
								+'<a href="javascript:void(0)" onclick="unClaim('+"'"+loadData[i].id+"'"+')" class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">'
								+'<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>'
								+'Unclaim</a>'
							+'</a>'
							+'</div>'
						    +'</div>'
						+'</td>'	
					+'</tr>';


			}
		}
	}else{
		html +='<tr class="gradeA odd">'
				+'<td class=" " colspan="5">No Tasks found</td>'
			+'</tr>';

	}
	html += '</tbody></table>'
	document.getElementById('right-pane-task-detail').innerHTML = html;
	printJsonData();
	triggerCommentToggle();
	gridPaginationCall();
		
}
//console.log(typeof(jsonDData);
//console.log(jsonData);

function printJsonData() {
    var output ='';
	var id;

for(var i=0;i<jsonData.length;i++){
/*console.log(i);
    output += '<tr class="gradeA odd">'
						+'<td width="5%" class=""><strong>'+(i+1)+'. </strong></td>'
						+'<td width="30%" class="" ><strong style="cursor:pointer;color:#981b1b;" onclick="getMemberId('+"'"+jsonData[i].processInstanceId+"','"+jsonData[i].processInstanceId+"','"+jsonData[i].id+"','"+jsonData[i].name+"'"+')">'+jsonData[i].name+'</strong></td>'
						+'<td width="10%" class="">'+jsonData[i].created+'</td>'
						+'<td width="10%" class=" ">'+jsonData[i].due+'</td>'
						+'<td width="30%" class=" ">'+jsonData[i].taskDescription+'</td>'
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
					+'</tr>';}
    $('#pg1').append(output);*/
    
$('#search').keyup(function () {
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
    
    /*console.log(id);
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
});*/
	});



}
}
function gridPaginationCall(){
	$grid_table_rows = $('#loantableBody tr');
	var grid_table_row_limit = 5;
	var gridTotalPage = Math.ceil($grid_table_rows.length / grid_table_row_limit);
	if(gridTotalPage==0){
		gridTotalPage=1;
	}
	$('#pg1').jqPagination('option', 'max_page', gridTotalPage);
	$('#pg1').jqPagination('option', 'current_page', 1);
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

/*
var current_page = 1;
var records_per_page = 3;


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
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("right-pane-task-detail");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < taskData.length; i++) {
        listing_table.innerHTML += taskData[i].adName + "<br>";
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
}

function numPages()
{
    return Math.ceil(taskData.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};

*/
$(document).ready(function () {
if (jQuery().dataTable) {
    $("#loantableBody").dataTable({
        "sPaginationType": "full_numbers",
        "bJQueryUI": true
    }); 
    }
});

 

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
