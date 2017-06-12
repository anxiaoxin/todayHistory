const getDate = ()=>{
	let date = new Date();
	return date.getMonth()+1+"/"+date.getDate();
}

const getData = (url) => {
	let s = document.createElement("script");
	s.type = "text/javascript";
	s.src = url;
	s.id = "getData";
	document.body.appendChild(s);	
}

 
function getHistoryList(){
	let date = getDate();
	getData("http://www.kyctj.com/todayOnhistory/queryEvent.php?key=27c1807cdb79b8defc8a92fd784fad4f&date="+date+"&callback=callback");
}

function getDetails(id){
	getData("http://www.kyctj.com/todayOnhistory/queryDetail.php?key=27c1807cdb79b8defc8a92fd784fad4f&e_id="+id+"&callback=callback");
}

function getJokeText(){
	console.log(3);
	getData("http://api.jisuapi.com/xiaohua/text?pagenum=1&pagesize=20&sort=rand&appkey=118614f89846668e&callback=callback");
}

function getJokeImg(){
	getData("http://api.jisuapi.com/xiaohua/pic?pagenum=1&pagesize=20&sort=rand&appkey=118614f89846668e&callback=callback");
}

function refresh(data){
	if(data.reason == "success" || data.msg == "ok"){
		console.log(data);
		return data.result;
	}else{
		return data.error_code;
	}
}

export default {
	getHistoryList: getHistoryList,
	getDetails: getDetails,
	refresh: refresh,
	getJokeText: getJokeText,
	getJokeImg: getJokeImg
}