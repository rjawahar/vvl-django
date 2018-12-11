
function tatreportGen1(){
	console.log("tatreportGen");
	
	var taskList = Object.keys(taskData['Task']);
	//console.log("taskList");
	//console.log(taskList);
	for(var i=0; i<taskList.length; i++){
		var tk = taskList[i].replace(/ /g, "_");
		//console.log("\n\ntk=====>");
		//console.log(tk)
		if(document.getElementById(tk)){
			if(taskData.Task[taskList[i]]){
				document.getElementById(tk).innerHTML = taskData.Task[taskList[i]];				
			}
		}
	}
}

function tatdetailsdisplay(id){
 var x = id;
 var y = x.split('_') 
 
 var id = id.replace(/ /g, "_");
 
  var bodyData=  {"id": id};
  
  var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">'
			+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			+'</div>'
			+'</div>';
  window.location = "/tattask/"+id+"";

}

function tatdetailsdisplayuser(id){
 var x = id;
 var y = x.split('_') 
 
 var id = id.replace(/ /g, "_");
 
  var bodyData=  {"id": id};
  
  var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">'
			+'<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>'
			+'</div>'
			+'</div>';
  window.location = "/tattaskuser/"+id+"";

}


function filteredDataDisp(data){

    console.log(data);	

    var details = data['memdetails']
    $(".popup").fadeOut();
    if(details){
	totalCount = data['memdetails'].length;
	$("#totalCountDiv").css("display","block");
	document.getElementById("totalCount").innerHTML = totalCount;
	document.getElementById("recordCount").innerHTML = totalCount;
	var dataArray=[];
	for(var keyVal in data['memdetails']){
	    var obj={};
		stathtml = '<span style="color:#981b1b;"><i class="fa fa-exclamation-triangle"></i>&nbsp&nbsp'+data['memdetails'][keyVal]["status"]+'</span>';
	    
	    if(data['memdetails'][keyVal]["DistributorUid"]){
		/*obj["SlNo"] = String(parseInt(keyVal)+1)+".";
		obj["createdDate"] =data['memdetails'][keyVal]["startTime"];
		obj["address"] = data['memdetails'][keyVal]["App_Mem_Address"];                    
	
		if(data['memdetails'][keyVal]["App_Mem_Details"]){
		    var data_split = data['memdetails'][keyVal]["App_Mem_Details"].split('@#');
		    obj["member_id"] = data_split [0];                            
		    obj["loan_id"] =data_split [1];
		    obj["membername"] = data_split [2];
		    obj["mobileNum"] = data_split [3];
		    obj["user"] = data['memdetails'][keyVal]["DistributorUid"];
		}
		else{
		    obj["member_id"] = "No data";                            
		    obj["loan_id"] = "No data";
		    obj["membername"] = "No data";
		    obj["mobileNum"] = "No data";
		}
		if(data['memdetails'][keyVal]['LoanAccNumber'])    {
		    obj["LoanAccNumber"] = data['memdetails'][keyVal]['LoanAccNumber'];
		}
		else{
		    obj["LoanAccNumber"] = "No data";
		}
		if(data['memdetails'][keyVal]['regionName'])    {
		    obj["regionName"] = data['memdetails'][keyVal]['regionName'];
		}
		else{
		    obj["regionName"] = "No data";
		}*/

		obj["SlNo"] = String(parseInt(keyVal)+1)+".";
		obj["createdDate"] =data['memdetails'][keyVal]["startTime"];
		obj["address"] = data['memdetails'][keyVal]["App_Mem_Address"];                    
		objDownload["SlNo"] 	   = String(parseInt(keyVal)+1)+".";
		objDownload["createdDate"] = data['memdetails'][keyVal]["startTime"];
		var pincodeVal = data['memdetails'][keyVal]["App_Mem_Address"].split(",").pop();
		objDownload["pincode"] = pincodeVal ;	
		objDownload["address"] 	   = data['memdetails'][keyVal]["App_Mem_Address"].replace(/,/g, ' */ ');                    
	
		if(data['memdetails'][keyVal]["App_Mem_Details"]){
		    var data_split = data['memdetails'][keyVal]["App_Mem_Details"].split('@#');
		    obj["member_id"] = data_split [0];                            
		    obj["loan_id"] =data_split [1];
		    obj["membername"] = data_split [2];
		    obj["mobileNum"] = data_split [3];
		    obj["user"] = data['memdetails'][keyVal]["DistributorUid"];
		    objDownload["member_id"] 	= data_split [0];                            
		    objDownload["loan_id"] 	= data_split [1];
		    objDownload["membername"] 	= data_split [2];
		    objDownload["mobileNum"] 	= data_split [3];
		    objDownload["user"] 	= data['memdetails'][keyVal]["DistributorUid"];
		}
		else{
		    obj["member_id"]  = "No data";                            
		    obj["loan_id"]    = "No data";
		    obj["membername"] = "No data";
		    obj["mobileNum"]  = "No data";
		    objDownload["member_id"]  = "No data";                            
		    objDownload["loan_id"]    = "No data";
		    objDownload["membername"] = "No data";
		    objDownload["mobileNum"]  = "No data";
		}
		if(data['memdetails'][keyVal]['LoanAccNumber'])    {
		    obj["LoanAccNumber"] = data['memdetails'][keyVal]['LoanAccNumber'];
		    objDownload["LoanAccNumber"] = data['memdetails'][keyVal]['LoanAccNumber'];
		}
		else{
		    obj["LoanAccNumber"] = "No data";
		    objDownload["LoanAccNumber"] = "No data";
		}
		if(data['memdetails'][keyVal]['regionName'])    {
		    obj["regionName"] = data['memdetails'][keyVal]['regionName'];
		    objDownload["Region_Name"] = data['memdetails'][keyVal]['regionName'];
		    if(data['memdetails'][keyVal]['clusterOfficeName'])    {
			obj["regionName"] = obj["regionName"] +" /"+data['memdetails'][keyVal]['clusterOfficeName'] 
			objDownload["Cluster_Office_Name"] = data['memdetails'][keyVal]['clusterOfficeName'] 
		    }	
		    if(data['memdetails'][keyVal]['clusterCenterName'])    {
			obj["regionName"] 	  = obj["regionName"] +" / "+data['memdetails'][keyVal]['clusterCenterName']
			objDownload["Cluster_Center_Name"] = data['memdetails'][keyVal]['clusterCenterName'] 
		    }	
		}
		else{
		    obj["regionName"] = "No data";
		    objDownload["regionName"] = "No data";
		}
		if(data['memdetails'][keyVal]["activityId"]){
		    	if(data['memdetails'][keyVal]["activityId"] == "EndEvent_1")                   
			    	obj["processStatus"] = '<span style="color:red;font-weight:bold;">REJECTED </span>&nbsp'+'<label class="history"  onclick="getProcessHistory('+"'"+obj["member_id"]+"','"+obj["loan_id"]+"','"+obj["membername"]+"'"+');"><i class="entypo-back-in-time" title="View History"  style="color:#981b1b;font-size:medium;cursor:pointer;"></i></label>';
			if(data['memdetails'][keyVal]["activityId"] == "EndEvent_2")                   
			    	obj["processStatus"] = '<span style="color:Blue;font-weight:bold;">COMPLETED </span>&nbsp'+'<label class="history" onclick="getProcessHistory('+"'"+obj["member_id"]+"','"+obj["loan_id"]+"','"+obj["membername"]+"'"+');"><i class="entypo-back-in-time" title="View History" style="color:#981b1b;font-size:medium;cursor:pointer;"></i></label>';
		 }
		else{
		    obj["processStatus"] = '<span style="color:green;font-weight:bold;">ACTIVE </span>&nbsp '+'<label class="history" onclick="getProcessHistory('+"'"+obj["member_id"]+"','"+obj["loan_id"]+"','"+obj["membername"]+"'"+');"><i class="entypo-back-in-time" title="View History" style="color:#981b1b;font-size:medium;cursor:pointer;"></i></label>';                    
		}
		dataArray.push(obj);
	    }
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
		{ "mData": "createdDate", "sTitle": "Task Date", "sWidth": "6%", className:"column"},                     
		{ "mData": "member_id","sTitle": "Member ID"  , "sWidth": "7%", className:"column"},
		{ "mData": "loan_id","sTitle": "Loan ID"  , "sWidth": "6%", className:"column"},
		{ "mData": "membername","sTitle": "Member Name"  , "sWidth": "15%", className:"column"},
		{ "mData": "address", "sTitle": "Resident Address", "sWidth": "20%", className:"column"},
		{ "mData": "mobileNum", "sTitle": "Mobile No.", "sWidth": "8%", className:"column"},                        
		{ "mData": "LoanAccNumber", "sTitle": "Loan Acc No", "sWidth": "8%", className:"column"},
		{ "mData": "regionName", "sTitle": "Region", "sWidth": "7%", className:"column"},
		{ "mData": "user", "sTitle": "User", "sWidth": "8%", className:"column"},
		{ "mData": "processStatus", "sTitle": "Loan Status", "sWidth": "10%", className:"column"},
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


function getDataListWithFilter(){
		   
        var val = $("#locationFilterDropdown").val();
        
        var region = "", clusterOffice = "", cluster = "", userName = "", state="";
        if(val == "region"){
            StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
        }
        if(val == "cluster office"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
            clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
        }
        
        if(val == "cluster center"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
            clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
            cluster      = $("#cluster option:selected").val();
            if(cluster == "0"){
            	$.alert("Please select the Cluster Center");
            	return false;
            }
        }
        
        if(val == "user"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
           clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
            cluster      = $("#cluster option:selected").val();
            if(cluster == "0"){
            	$.alert("Please select the Cluster Center");
            	return false;
            }
            userName  = $("#userSelect option:selected").text();
            userNameVal  = $("#userSelect option:selected").text();
             if(!userNameVal){
            	$.alert("Please select the User Name");
            	return false;
            }
        }
        
        var filterOption = document.getElementById("loanFilterDropdown").value;
        var valResult = validateInputFields(filterOption);
        if(valResult == false){
	        	return false;
		}
        if(filterOption == 3){
             fromDate = document.getElementById("filterByMonthFrom").value;
             toDate   = document.getElementById("filterByMonthTo").value;
        }
        if(filterOption == 2){
             fromDate = document.getElementById("filterByWeekFrom").value;
             toDate   = document.getElementById("filterByWeekTo").value;
        }
        if(filterOption == 1){
             fromDate = document.getElementById("filterByDateInput").value;
             toDate   = fromDate;
        }
        
		fromDate = setPrevNextDate(new Date(fromDate),"prev");	
		toDate = setPrevNextDate(new Date(toDate),"next");	
		
        var fromDateSplit = fromDate.split('/');
        //fromDate =  fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1]+'T00:00:00';
        fromDate =  fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1]+'T23:59:59';

        var toDateSplit = toDate.split('/');
        toDate =  toDateSplit[2]+'-'+toDateSplit[0]+'-'+toDateSplit[1]+'T00:00:00';
        
        var regionDetails = "";
        
        if (fromDate && toDate ){
            regionDetails = { "regionName":region,"userName": userName,"clusterOffice":clusterOffice, "cluster":cluster, "fromDate":fromDate, "toDate":toDate , "level":val }
        } else {
            regionDetails = {"regionName":region}
        }
        var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
	$(".popup").empty().append(theImg).fadeIn();	
	
        $.ajax({
        url : '/filteredList/',
        type: 'POST',        
        datatType: 'json',            
        success: function (data) {
            filteredDataDisp(data);
        },
        error: function(error) {
            $(".popup").fadeOut();
            $.alert("No records found.");
        },
        data: JSON.stringify(regionDetails),
                    
    });
    
}
		

function dispBack(){
	document.getElementById('row_alltask').style.display = 'block';
	document.getElementById('right-data_pane').style.display = 'none';
	//window.history.back();
}		

function disp_data(id){

	document.getElementById('row_alltask').style.display = 'none';
	document.getElementById('right-data_pane').style.display = 'block';
	var x = id;
 	var y = x.split('_') 
 
 	var id = id.replace(/ /g, "_");
 

	var val = $("#locationFilterDropdown").val();
        
        var region = "", clusterOffice = "", cluster = "", userName = "", state="";
        if(val == "region"){
            StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
        }
        if(val == "cluster office"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
            clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
        }
        
        if(val == "cluster center"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
            clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
            cluster      = $("#cluster option:selected").val();
            if(cluster == "0"){
            	$.alert("Please select the Cluster Center");
            	return false;
            }
        }
        
        if(val == "user"){
        	StateVal = $("#State option:selected").val();
            if(!StateVal){
            	$.alert("Please select the State");
            	return false;
            }
            region = $("#Region option:selected").text();
            regionVal = $("#Region option:selected").val();
            
            if(!regionVal){
            	$.alert("Please select the Region");
            	return false;
            }
           clusterOffice = $("#clusterOffice option:selected").val();
             if(clusterOffice == "0"){
            	$.alert("Please select the Cluster Office");
            	return false;
            }
            cluster      = $("#cluster option:selected").val();
            if(cluster == "0"){
            	$.alert("Please select the Cluster Center");
            	return false;
            }
            userName  = $("#userSelect option:selected").text();
            userNameVal  = $("#userSelect option:selected").text();
             if(!userNameVal){
            	$.alert("Please select the User Name");
            	return false;
            }
        }

        if (!val){
            userName  = $("#userSelect option:selected").text();
            userNameVal  = $("#userSelect option:selected").text();
            val = 'user'
        }
        
        var filterOption = document.getElementById("loanFilterDropdown").value;
        /*var valResult = validateInputFields(filterOption);
        if(valResult == false){
	        	return false;
		}*/
        if(filterOption == 3){
             fromDate = document.getElementById("filterByMonthFrom").value;
             toDate   = document.getElementById("filterByMonthTo").value;
        }
        if(filterOption == 2){
             fromDate = document.getElementById("filterByWeekFrom").value;
             toDate   = document.getElementById("filterByWeekTo").value;
        }
        if(filterOption == 1){
             fromDate = document.getElementById("filterByDateInput").value;
             toDate   = fromDate;
        }
        
		fromDate = setPrevNextDate(new Date(fromDate),"prev");	
		toDate = setPrevNextDate(new Date(toDate),"next");	
		
        var fromDateSplit = fromDate.split('/');
        fromDate =  fromDateSplit[2]+'-'+fromDateSplit[0]+'-'+fromDateSplit[1]+'T23:59:59';

        var toDateSplit = toDate.split('/');
        toDate =  toDateSplit[2]+'-'+toDateSplit[0]+'-'+toDateSplit[1]+'T00:00:00';
        
        var regionDetails = "";


        
        if (fromDate && toDate ){
            regionDetails = { "regionName":region,"userName": userName,"clusterOffice":clusterOffice, "cluster":cluster, "fromDate":fromDate, "toDate":toDate , "level":val ,"id": id}
        } else {
            regionDetails = {"regionName":region}
        }
  
	$.ajax({
		url : '/tattaskread/',
		type: 'POST',
        	datatType: 'json',  
		success: function (data) {
			console.log("data");
			console.log(data);
			taskDetailsTable(id, data);	
		},
		error: function(error) {
			console.log(error);
		},
		data: JSON.stringify(regionDetails),					
	});

	/**/
}

function taskDetailsTable(d, data){
	$("#rowCountdisp").html("");
	//$(".rowCount").html("");
	//document.getElementById(rowCountdisp).innerHTML = "";	
	globalData = [];
	taskName  = d;
 	var tName = taskName.replace('_',' ');
 	console.log("tName");
	console.log(tName);
	$('.label-text.active').attr("class","label-text");
	$("#id_my_"+name.replace(/ /g,"_").replace(/&/g,"_")+"").addClass("active");	
	var loadData = 	data;
	console.log("loadData");
	console.log(loadData);
	var memberId,loanId;
	var keys   = [];
	var hostLocation = location.hostname;
	
	for(var i=0; i<loadData["tasklist"].length; i++){	
		var obj = {};
		var objDownLoad = {};
		var n = i+1;
		var keyVal = i;
	
		obj['SlNo'] = String(n)+'.';
		
		obj['created'] = convertmyDateTime(loadData["tasklist"][i]['created']);

		objDownLoad ['S.No'] = String(n)+'.';

		obj["SlNo"] = String(parseInt(keyVal)+1)+".";
		obj["createdDate"] =data['tasklist'][keyVal]["created"];
		obj["address"] = data['tasklist'][keyVal]["App_Mem_Address"];                    
		//objDownLoad["SlNo"] 	   = String(parseInt(keyVal)+1)+".";
		objDownLoad["createdDate"] = data['tasklist'][keyVal]["created"];
		var pincodeVal = data['tasklist'][keyVal]["App_Mem_Address"].split(",").pop();
		objDownLoad["pincode"] = pincodeVal ;	
		objDownLoad["Address"] 	   = data['tasklist'][keyVal]["App_Mem_Address"].replace(/,/g, ' */ ');                    
	
		if(data['tasklist'][keyVal]["App_Mem_Details"]){
		    var data_split = data['tasklist'][keyVal]["App_Mem_Details"].split('@#');
		    obj["member_id"] = data_split [0];                            
		    obj["loan_id"] =data_split [1];
		    obj["membername"] = data_split [2];
		    obj["mobileNum"] = data_split [3];
		    obj["user"] = data['tasklist'][keyVal]["DistributorUid"];
		   /* objDownLoad["member_id"] 	= data_split [0];                            
		    objDownLoad["loan_id"] 	= data_split [1];
		    objDownLoad["membername"] 	= data_split [2];
		    objDownLoad["mobileNum"] 	= data_split [3];
		    objDownLoad["user"] 	= data['tasklist'][keyVal]["DistributorUid"];*/
		}
		else{
		    obj["member_id"]  = "No data";                            
		    obj["loan_id"]    = "No data";
		    obj["membername"] = "No data";
		    obj["mobileNum"]  = "No data";
		    /*objDownLoad["member_id"]  = "No data";                            
		    objDownLoad["loan_id"]    = "No data";
		    objDownLoad["membername"] = "No data";
		    objDownLoad["mobileNum"]  = "No data";*/
		}
		if(data['tasklist'][keyVal]['LoanAccNumber'])    {
		    obj["LoanAccNumber"] = data['tasklist'][keyVal]['LoanAccNumber'];
		    objDownLoad["LoanAccNumber"] = data['tasklist'][keyVal]['LoanAccNumber'];
		}
		else{
		    obj["LoanAccNumber"] = "No data";
		    objDownLoad["LoanAccNumber"] = "No data";
		}
		if(data['tasklist'][keyVal]['regionName'])    {
		    obj["regionName"] = data['tasklist'][keyVal]['regionName'];
		    objDownLoad["Region_Name"] = data['tasklist'][keyVal]['regionName'];
		    if(data['tasklist'][keyVal]['clusterOfficeName'])    {
			obj["regionName"] = obj["regionName"] +" /"+data['tasklist'][keyVal]['clusterOfficeName'] 
			objDownLoad["Cluster_Office_Name"] = data['tasklist'][keyVal]['clusterOfficeName'] 
		    }	
		    if(data['tasklist'][keyVal]['clusterCenterName'])    {
			obj["regionName"] 	  = obj["regionName"] +" / "+data['tasklist'][keyVal]['clusterCenterName']
			objDownLoad["Cluster_Center_Name"] = data['tasklist'][keyVal]['clusterCenterName'] 
		    }	
		}
		else{
		    obj["regionName"] = "No data";
		    objDownLoad["regionName"] = "No data";
		}
		
		objDownLoad ['Created Date'] = convertmyDateTime(loadData["tasklist"][i]['created']).toString().replace(/(,)/g, " ");


		var d = new Date(loadData["tasklist"][i]['created']);
		var dn = new Date();
		var oneDay = 24*60*60*1000;
		var diffDays = Math.round(Math.abs((dn.getTime() - d.getTime())/(oneDay)));
		obj['Duration'] = diffDays;
		objDownLoad ['Days'] = diffDays.toString().replace(/(,)/g, " ");
		console.log("date");
		console.log(objDownLoad);
		
		/*if(loadData["tasklist"][i]["App_Mem_Address"]){
			obj['App_Mem_Address'] = loadData["tasklist"][i]["App_Mem_Address"];
			objDownLoad ['Address'] = loadData["tasklist"][i]["App_Mem_Address"].replace(/(,)/g, " ");
		} else {
			obj['App_Mem_Address'] = "No Data";	    		
			objDownLoad ['Address'] = "No Data";	    		
		}*/

		if(loadData["tasklist"][i]["App_Mem_Details"]){
		    var data_split 	= loadData["tasklist"][i]["App_Mem_Details"].split('@#');
		    obj["member_id"] 	= data_split [0];                            
		    obj["loan_id"] 	= data_split [1];
		    obj["membername"] 	= data_split [2];
		    obj["mobileNum"] 	= data_split [3];
		    obj["user"] 	= loadData["tasklist"][i]["DistributorUid"];

		    objDownLoad["Member Id"] 	= data_split [0];                            
		    objDownLoad["Loan Id"] 	= data_split [1];
		    objDownLoad["Member Name"] 	= data_split [2];
		    objDownLoad["Mobile No"]	= data_split [3];
		    objDownLoad["Sales User"] 	= loadData["tasklist"][i]["DistributorUid"];

		} else {
		    obj["member_id"]	= "No data";                            
		    obj["loan_id"] 	= "No data";
		    obj["membername"] 	= "No data";
		    obj["mobileNum"] 	= "No data";

		    objDownLoad["Member Id"]	= "No data";                            
		    objDownLoad["Loan Id"] 	= "No data";
		    objDownLoad["Member Name"] 	= "No data";
		    objDownLoad["Mobile No"] 	= "No data";
		}			
	
		if(loadData["tasklist"][i]["App_Mem_Details"]){
			var x = loadData["tasklist"][i]["App_Mem_Details"];
	    		var y = x.split('@#');
	    		obj['cusname'] 	= y[2];
	    		obj['customerName'] 	= '<strong style="cursor:pointer;color:#981b1b;" onclick="'
						  //'window.open(/'+"'vvlFormsRead'"+'/'+obj["member_id"]+'/'+obj["loan_id"]+'/'+1+'/'+"'"+taskName.trim()+"'"+'/'+1+')">'+
						  + 'window.open('+ "'/vvlFormsRead/"+ obj["member_id"] +"/"+ obj["loan_id"] +"/"
						  + loadData["tasklist"][i]["processInstanceId"] +"/"+ loadData["tasklist"][i]["id"] +"/memberDetails"
						  + "/"+ 0+"'"+')">'+ obj["membername"]+'</strong>'	   ; 		
	    		obj['mobnum'] 	= y[3];
	    		//objDownLoad ['Member Name'] = y[2].replace(/(,)/g, " ");
	    		//objDownLoad ['Mobile Number'] 	= y[3].replace(/(,)/g, " ");
	    		memberId = y[0];
	    		loanId   = y[1];
		}
		else{
			obj['cusname'] 	= "No Data";
			obj['customerName'] 	= "No Data";
	    		obj['mobnum'] 	= "No Data";
			/*objDownLoad ['Member Name'] = "No Data";
	    		objDownLoad ['Mobile Number'] = "No Data";*/
		}
		if(loadData["tasklist"][i]['assignee'] != null){
		   	obj['assignee'] 	 = loadData["tasklist"][i]['assignee']+'<label class="history" onclick="getProcessHistory('+"'"+memberId+"','"+loanId+"','"+obj['cusname']+"'"+');"><i class="entypo-back-in-time" style="color:#981b1b;font-size:medium;cursor:pointer;"></i></label>';	
		   	objDownLoad ['assignee'] = loadData["tasklist"][i]['assignee'];	
		}
		else{
			obj['assignee'] 	 = "Not assigned yet" +'<label class="history" onclick="getProcessHistory('+"'"+memberId+"','"+loanId+"','"+obj['cusname']+"'"+');"><i class="entypo-back-in-time" style="color:#981b1b;font-size:medium;cursor:pointer;"></i></label>';	;
			objDownLoad ['Assignee'] = "NA" ;
		}		
		keys.push(obj);
		globalData.push(objDownLoad ); 
		
	}
	var table = $('#display').dataTable({
	    data: keys,
	    destroy: true,  
	    
	    "bProcessing": true,
	    "sPaginationType": "full_numbers",
	    "bSortable": true,	    
	    "aoColumns": [	
	    	/*{ "mData": "SlNo", "sTitle": "S.No", "sWidth": "7%", className:"column"},                    	  
		{ "mData": "customerName","sTitle": "Customer name"  , "sWidth": "20%", className:"column"},
		{ "mData": "member_id","sTitle": "Member ID"  , "sWidth": "7%", className:"column"},
		{ "mData": "loan_id","sTitle": "Loan ID"  , "sWidth": "6%", className:"column"},
		{ "mData": "App_Mem_Address","sTitle": "Address"  , "sWidth": "30%", className:"column"},
		{ "mData": "mobnum","sTitle": "Mobile No"  , "sWidth": "15%", className:"column"},
		{ "mData": "created","sTitle": "Date", "sWidth": "15%", className:"column"},		
		{ "mData": "Duration","sTitle": "Days", "sWidth": "5%", className:"column"},		
		{ "mData": "assignee", "sTitle": "Assignee", "sWidth": "20%", className:"column"},*/
		{ "mData": "SlNo", "sTitle": "S.No", "sWidth": "5%", className:"column"},     
		{ "mData": "createdDate", "sTitle": "Task Date", "sWidth": "6%", className:"column"},                     
		{ "mData": "member_id","sTitle": "Member ID"  , "sWidth": "7%", className:"column"},
		{ "mData": "loan_id","sTitle": "Loan ID"  , "sWidth": "6%", className:"column"},
		{ "mData": "customerName","sTitle": "Member Name"  , "sWidth": "15%", className:"column"},/*membername*/
		{ "mData": "address", "sTitle": "Resident Address", "sWidth": "20%", className:"column"},
		{ "mData": "mobileNum", "sTitle": "Mobile No.", "sWidth": "8%", className:"column"},                        
		{ "mData": "LoanAccNumber", "sTitle": "Loan Acc No", "sWidth": "8%", className:"column"},
		{ "mData": "regionName", "sTitle": "Region", "sWidth": "7%", className:"column"},
		{ "mData": "user", "sTitle": "User", "sWidth": "8%", className:"column"},
		{ "mData": "assignee", "sTitle": "Loan Status", "sWidth": "10%", className:"column"},			
	    ]   
         		    
	}).fnDestroy();
	
    table = $('#display').DataTable({});	 
	table.destroy();
	var rowCountdisp = [];	
	//document.getElementById(rowCountdisp).innerHTML = ""; 
	//$(".rowCount").html("");
	$("#example2").html("");

	$('#example2').append('<div style="margin-left:40%;"><div class="rowCount" style="float:left; color:#981b1b;">'+tName+'</div><div style="float:left">&nbsp&nbsp-&nbsp&nbsp</div><div style=" float:left;"  id="rowcountdisp"></div><div style="float:left;">&nbsp Of &nbsp </div><div style="float:left; color:#981b1b;margin-bottom:1%;">'+loadData["tasklist"].length+'</div></div>');	
	table = $('#display').DataTable( {
	    "fnDrawCallback": function () {
			  var rowCount = this.fnPagingInfo().iFilteredTotal;
			  rowCountdisp.push(rowCount);
			  $('#rowcountdisp').html('<h3 style="color:#981b1b; display:inline; ">'+rowCount+'</h3>')
		}	 
	    ,
        //"buttons" : [ 'copy', 'csv', 'excel', 'pdf', 'print' ]	   
	   	   
	} );
	$('.column').css('padding-bottom', '0px');
	$('.column').css('padding-top', '0px');	
	$('#btnExport').css('display', 'block');
}

function JSONToCSVConvertor(JSONData, fileName ,ShowLabel) {    
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;   
	var CSV = '';     
	if (ShowLabel) {
		 var row = "";
		 for (var index in arrData[0]) {
				 row += index + ',';
		 }
		 row = row.slice(0, -1);
		 CSV += row + '\r\n';
	}
	for (var i = 0; i < arrData.length; i++) {
		 var row = "";
		 for (var index in arrData[i]) {
				var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
				row += arrValue + ',';
		 }
		 row.slice(0, row.length - 1);
		 CSV += row + '\r\n';
	}
	if (CSV == '') {        
		 growl.error("Invalid data");
		 return;
	}   
	//var fileName = "Result";
	if(msieversion()){
	var IEwindow = window.open();
	IEwindow.document.write('sep=,\r\n' + CSV);
	IEwindow.document.close();
	IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
	IEwindow.close();
	} else {
	 var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
	 var link = document.createElement("a");    
	 link.href = uri;
	 link.style = "visibility:hidden";
	 link.download = fileName + ".csv";
	 document.body.appendChild(link);
	 link.click();
	 document.body.removeChild(link);
	}
}
function msieversion() {
	var ua = window.navigator.userAgent; 
	var msie = ua.indexOf("MSIE "); 
	if (msie != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
	{
		return true;
	} else { // If another browser, 
		return false;
	}
		return false; 
}		
		
		
function convertmyDateTime(date){
    var dt = new Date(Date.parse(date));
    var localDate = dt;
    var min = localDate.getTime() / 1000 / 60; // convert gmt date to minutes
    var localNow = new Date().getTimezoneOffset(); // get the timezone
    var localTime = min+localNow; // get the local time

    var dateStr = new Date(localTime * 1000 * 60);
    dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    dateStrSplit= dateStr.split('GMT');
    dateStr = dateStrSplit[0];
    return dateStr;
}		

/*CR - For extending upto 3 month in Inprogress */
function validateInputFieldsUpto3Month(id){
		
	console.log(id);
	var fromDate,toDate,userName;
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
					if(document.getElementById("userSelect")){
						userName = document.getElementById("userSelect").value;
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
					if(document.getElementById("userSelect")){
						userName = document.getElementById("userSelect").value;
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
						if(!(diffDays >= 0 && diffDays <= 92)){
							$.alert("Exceeds more than 3 month!\n\n");
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

					if(document.getElementById("userSelect")){
						userName = document.getElementById("userSelect").value;
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
	return [fromDate,toDate,userName];
}