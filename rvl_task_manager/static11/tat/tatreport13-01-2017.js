
function tatreportGen(){
	var taskList = Object.keys(taskData['Task']);
	for(var i=0; i<taskList.length; i++){
		var tk = taskList[i].replace(/ /g, "_");
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
