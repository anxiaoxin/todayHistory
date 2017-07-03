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

//前端聊天功能的实现
const _io = {
	socket:{},
	vue:{}, //与当前聊天的vue组件绑定，可能是login.vue或者talkContent.vue
	iflogin:false,//是否已经登录
	//以下变量是进行缓存的用的
	onlineUsers:{},
	onlineCount:0,
	friends:{len:0},
	friendvue:{},
	myName:"",
	messageList:[],
	init(vue){
		//绑定vue组件
		this.vue = vue;
		//绑定this
		let _this = this;
		//如果该用户还没登录
		if(!this.iflogin){
			this.socket = io.connect('ws://172.16.22.18:3000');
			this.socket.on("login",function(data){
				if(data){
					//对基本数据进行缓存，当用户回到聊天界面时显示
					_this.onlineUsers = data.onlineUsers;
					_this.onlineCount = data.onlineCount;
					if(!this.iflogin){ //如果已经登录，则直接跳到群聊页面
						_this.vue.$router.push({ path: '/talk/rome' });
						_this.iflogin = true;
					}
					_this.messageList.push({inout:true,content:data.userName + "加入群聊"});
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
			//如果处于登录状态
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
	//与组件中的数据进行绑定
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
}


export default {
	getHistoryList: getHistoryList,
	getDetails: getDetails,
	refresh: refresh,
	getJokeText: getJokeText,
	getJokeImg: getJokeImg,
	_io: _io
}