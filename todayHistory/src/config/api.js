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
	getData("http://api.jisuapi.com/xiaohua/text?pagenum=1&pagesize=20&sort=rand&appkey=118614f89846668e&callback=callback");
}

function getJokeImg(){
	getData("http://api.jisuapi.com/xiaohua/pic?pagenum=1&pagesize=20&sort=rand&appkey=118614f89846668e&callback=callback");
}

function refresh(data){
	if(data.reason == "success" || data.msg == "ok"){
		return data.result;
	}else{
		return data.error_code;
	}
}

const _io = {
	socket:{},
	vue:{},
	firstTime:true,
	loginInfo:{},
	onlineUsers:{},
	onlineCount:0,
	friends:{len:0},
	friendvue:{},
	myName:"",
	messageList:[],
	init(vue){
		//与登录页的vue绑定
		this.vue = vue;
		//绑定this
		let _this = this;
		//如果此时socket已经断开
		if(this.firstTime){
			this.socket = io.connect('ws://172.16.22.18:3000');
			this.socket.on("login",function(data){
				if(data){
					//对基本数据进行缓存，当用户回到聊天界面时显示
					_this.onlineUsers = data.onlineUsers;
					_this.onlineCount = data.onlineCount;

					if(_this.firstTime){
						this.myName = data.userName;
						_this.vue.$router.push({ path: '/talk/rome' });
						_this.firstTime = false;
					}else{
						_this.messageList.push({inout:true,content:data.userName + "加入群聊"});
					}	
					_this.setMessageData();		
				}else{
					alert("名称已存在");
				}
			});
			this.socket.on("message",function(data){
				if(data.private){
					//来自某一用户
					if(data.from == _this.myName || data.to == _this.myName){//如果发送方或者接收方是自己
						if(data.from == _this.myName){//如果是自己发的私聊信息，则把信息加到对应的人中
							if(_this.friends.hasOwnProperty(data.to)){
								_this.friends[data.to].push(data);
							}else{
								if(Object.keys(_this.friendvue).length){ //是否处于私聊页面
									_this.friendvue.$set(_this.friendvue.friends,data.to,[data]);
								}else{
									_this.friends[data.to] = [data];
								}
								_this.friends.len ++;
							}
						}else{	//如果是朋友发的私聊信息，则把信息加到对应的人中
							if(_this.friends.hasOwnProperty(data.from)){ 
								_this.friends[data.from].push(data);
							}else{
								if(Object.keys(_this.friendvue).length){
									_this.friendvue.$set(_this.friendvue.friends,data.from,[data]);
								}else{
									_this.friends[data.from] = [data];
								}								
								_this.friends.len ++;
							}
						}
					}
				}else{
					//来自群发
					_this.vue.onlineUsers = data.onlineUsers;
					_this.vue.onlineCount = data.onlineCount;					
					_this.messageList.push({inout:false,from:data.from,content:data.content});
				}
			});
			this.socket.on("logout",function(data){
				_this.messageList.push({inout:true,content:data.userName + "离开群聊"});
				_this.vue.onlineUsers = data.onlineUsers;
				_this.vue.onlineCount = data.onlineCount;
			});
			this.socket.on("offline",function(data){
				if(data){
					alert("您刚刚已掉线，请重新进入聊天室")
					window.location.reload();
				}
			})
		}else{
			this.setMessageData();
		}
	},
	login(name){
		this.myName = name;
		this.socket.emit("login",{username:name});
	},
	sendMessage(msg,to){
		this.socket.emit("message",{content:msg,from:this.myName,to:to});
	},
	//没有刷新页面，重新进来时的缓存数据
	setMessageData(){
		this.vue.onlineUsers = this.onlineUsers;
		this.vue.onlineCount = this.onlineCount;
		this.vue.myName = this.myName;
		this.vue.messageList = this.messageList;
		this.vue.friends = this.friends;
	},
	bindfriend(t){
		this.friendvue = t;
		for(let i in this.friends){
			if(i != "length"){
				t.$set(t.friends,i,this.friends[i]);			
			}
		}
		this.friends = t.friends;
	}
/*	refresh(){
		this.socket={};
		this.vue={};
		this.firstTime=true;
		this.loginInfo={};
		this.myName="";
	}*/
}


export default {
	getHistoryList: getHistoryList,
	getDetails: getDetails,
	refresh: refresh,
	getJokeText: getJokeText,
	getJokeImg: getJokeImg,
	_io: _io
}