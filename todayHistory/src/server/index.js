const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mysql = require("mysql");
const _under = require("underscore");
const _m = require("moment");

/*let DataBase = "talk";
let Table = 'userInfo';
let clinet = mysql.createConnection({
	user:'root',
	password:'9527'
})
clinet.connect(); //暂不需要数据库
*/

app.get('/',function(req,res){
	res.send("Hello SB");
})

let onlineUsers = {};
let onlineCount = 0;

io.on('connection',function(socket){
	console.log('A user connected');
	socket.on("login",function(obj){
		//如果用户名存在
		console.log(obj.username + "登录");
		if(onlineUsers.hasOwnProperty(obj.username)){
			socket.emit("login",false);
			return ;
		}
		//设置socket的name属性，用于私聊以及退出
		socket.name = obj.username;
		onlineUsers[obj.username] = obj.username;
		onlineCount ++;
		//定义返回的数据
		let data = {onlineUsers:onlineUsers,onlineCount:onlineCount};
		data['userName'] = obj.username;
		//查询上次登录的时间
		let res = new Promise(function(resolve,rej){
/*			clinet.query('select lastLoginTime from user.userInfo where userName = "'+obj.username+'"',function(err,res,fields){
				if(err){
					throw err;
				}
				if(res){
					if(res.length){
						data['lastLoginTime'] = res[0].lastLoginTime;
					}
				}
				resolve(data);
			});*/
			resolve(data);
		});
		res.then(function(data){
			console.log("向所有客户端广播login事件并发送数据",data);
			io.emit('login',data);
		})
	});

	socket.on("message",function(obj){
		console.log("后台接收到来自"+obj.from+"发向"+obj.to+"的消息",obj.content);
		if(!socket.name){
			socket.emit("offline",true);
			return ;
		}
		if(obj.to){
			let toSocket = _under.findWhere(io.sockets.sockets,{name:obj.to});
			if(toSocket){//如果对方在线
				toSocket.emit("message",{from:obj.from,to:obj.to,content:obj.content,private:true});
				socket.emit("message",{from:obj.from,to:obj.to,content:obj.content,private:true});//向自己发一份
				console.log("分别向"+toSocket.name+"与"+socket.name+"广播message事件并发送数据",{from:obj.from,to:obj.to,content:obj.content,private:true});
			}else{
				socket.emit("message",{from:obj.from,to:obj.to,content:obj.content,private:true,offline:true});//向自己发一份
				console.log("向"+socket.name+"广播message事件并发送数据",{from:obj.from,to:obj.to,content:obj.content,private:true,offline:true});				
			}
			
			
		}else{
			io.emit("message",{from:obj.from,to:obj.to,content:obj.content,private:false,onlineUsers:onlineUsers,onlineCount:onlineCount});
			console.log("向所有客户端广播message事件，并发送数据",{from:obj.from,to:obj.to,content:obj.content,private:false,onlineUsers:onlineUsers,onlineCount:onlineCount});
		}
		
	});

	socket.on("disconnect",function(){
		console.log(socket.name+"离开");
		if(onlineUsers.hasOwnProperty(socket.name)){
			delete onlineUsers[socket.name];
			onlineCount --;
			console.log("向所有客户端广播logout事件，并发送数据",{onlineUsers:onlineUsers,onlineCount:onlineCount,userName:socket.name});
			io.emit("logout",{onlineUsers:onlineUsers,onlineCount:onlineCount,userName:socket.name});
		}	
	})
})

http.listen(3000,function(){
	console.log("Run");
})

