<template>
	<div>
		<div class="talkHead">
			<div>
				<div class="left" v-on:click='showList("onlineList")'>共{{onlineCount}}人<i class="fa fa-chevron-down"></i></div>
				<div class="right">{{myName}}<span v-on:click='showList("friendsList")'><i class="fa fa-address-book-o"></i>:{{friends.len}}</span></div>
			</div>
		</div>
		<div class="talkContent" id="content">
			<li v-for="item in messageList" > 
				<div v-if="!item.inout" class="msgBox" v-bind:class='item.from == myName ? "right" : "left"'>
					<span v-on:click="talkPrivate(item.from)">{{item.from}}</span>
					<div>{{item.content}}</div>
				</div>
				<div v-if="item.inout" class="inout">
					{{item.content}}
				</div>
			</li>
		</div>
		<div class="talkFoot">
			<div class="footdiv">
				<div contenteditable="true" id="text" v-on:click="scrollLate"></div>
				<button v-on:click="sendMessage">发送</button>	
			</div>
		</div>
		<div class="onlineList" id="onlineList" style="display:none;">
			<div>
				<i class="fa fa-window-close-o close" v-on:click='closeList("onlineList")'></i>
				<li v-for="item in onlineUsers" v-on:click="talkPrivate(item)">
					{{item}}
				</li>
			</div>
		</div>
		<div class="friendsList" id="friendsList" style="display:none">
			<div>
				<i class="fa fa-window-close-o close" v-on:click='closeList("friendsList")'></i>
				<li v-for="(value,key) in friends" v-on:click="talkPrivate(key)" v-if='key != "len"'>
					<span>{{key}}：</span><span>{{value[value.length - 1].content.replace(/^(\S{9})(.*)/,"$1...")}}</span>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				onlineUsers:{},
				onlineCount:0,
				friends:{len:0},
				talkWith:"",
				userName:"",
				myName:"",
				messageList:[],
				private:false,
				msgContent:"",
			}
		},
		created(){
			this.$api._io.init(this);
		},
		mounted(){
			this.msgContent = document.getElementById("content");
		},
		methods:{
			sendMessage(){
				let msg = document.getElementById("text");
				if(!msg.innerHTML){
					return ;
				}
				this.$api._io.sendMessage(msg.innerText);
				msg.innerText = "";
				msg.focus();
			},
			showList(id){
				document.getElementById(id).style.display="";
				document.body.overflow = "hidden";
			},
			closeList(id){
				document.getElementById(id).style.display="none";
				document.body.overflow = "";
			},
			talkPrivate(name){
				if(name == this.myName){
					return ;
				}
				this.$router.push({path: "/talk/private/"+name})
			},
			scroll(){
				this.msgContent.scrollTop = this.msgContent.scrollHeight;
			},
			//键盘出来后延时滚动
			scrollLate(){
				let _this = this;
				new Promise(function(res,rej){
					let fun = function(){
						res();
						document.getElementById("text").scrollIntoView(); 
					}
					setTimeout(fun,300);
				}).then(function(){
					_this.scroll();
				})
			}
		},
/*		watch:{
			messageList(){
				this.msgContent.scrollTop = this.msgContent.scrollHeight;
			}
		},*/
		//watch要早于DOM更新，updated为DOM更新后触发
		updated(){
			this.scroll();
		},
		beforeRouteEnter (to,from,next){
			//如果页面刷新
			if(to.path == "/talk/rome" && from.path == "/"){
				next({ path: '/' });
			}else{
				next();
			}
		},
		beforeRouteLeave (to,from,next){
			if(to.path == "/tlogin" && from.path == "/talk/rome"){
				next({ path: '/' });
			}else{
				next();
			}
		},
/*		beforeDestroy(){
			//重新初始化_io中的数据
			this.$api._io.refresh();
		},*/
	}
</script>		