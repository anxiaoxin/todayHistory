const getDate = ()=>{
	let date = new Date();
	return date.getMonth()+1+"/"+date.getDate();
}

function getHistoryList(){
	let date = getDate();
	console.log(date);
	let s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://www.kyctj.com/todayOnhistory/queryEvent.php?key=27c1807cdb79b8defc8a92fd784fad4f&date="+date+"&callback=callback";
	s.id = "getData";
	document.body.appendChild(s);
}

function getDetails(id){
	let s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://www.kyctj.com/todayOnhistory/queryDetail.php?key=27c1807cdb79b8defc8a92fd784fad4f&e_id="+id+"&callback=callback";
	s.id = "getData";
	document.body.appendChild(s);
}

function refresh(data){
	if(data.reason == "success"){
		return data.result;
	}else{
		return data.error_code;
	}
}

export default {
	getHistoryList: getHistoryList,
	getDetails: getDetails,
	refresh: refresh
}