<template>
	<div>
		<div class="talkHead">
			<div class="center">
				{{friendName}}
			</div>
		</div>
		<div class="talkContent" id="content">
			<li v-for="item in friends[friendName]" > 
				<div class="msgBox" v-bind:class='item.from == myName ? "right" : "left"'>
					<span>{{item.from}}</span>
					<div>{{item.content}}</div>
					<span class="offline" v-if="item.offline">对方不再线，发送失败</span>
				</div>
			</li>
		</div>
		<div class="talkFoot">
			<div class="footdiv">
				<div contenteditable="true" id="text" v-on:click="scrollLate"></div>
				<button v-on:click="sendMessage" id="click">发送</button>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				friends:{len:0},
				myName:"",
				friendName:"",
				msgContent:""
			}
		},
		created(){
			//在created的时候进行vue的绑定以及缓存数据的读取
			this.$api._io.bindfriend(this);
			this.friends = this.$api._io.friends;
			this.myName = this.$api._io.myName;
			this.friendName = this.$route.params.user;
		},
		mounted(){
			this.$api._io.bindEnter();
			this.msgContent = document.getElementById("content");
		},
		methods:{
			sendMessage(){
				let msg = document.getElementById("text");
				if(!msg.innerHTML){
					return ;
				}
				this.$api._io.sendMessage(msg.innerText,this.friendName);
				msg.innerText = "";
				msg.focus();
			},			
			scroll(){
				this.msgContent.scrollTop = this.msgContent.scrollHeight;
			},
			//键盘出来后延时滚动,解决ios下输入框被隐藏问题
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
		updated(){
			//收到消息后界面滚动到最底部
			this.scroll();
		},
		beforeRouteEnter (to,from,next){
			//如果页面刷新
			if(to.path.split("/")[2] == "private" && from.path == "/"){
				next({ path: '/' });
			}else{
				next();
			}
		},		
		beforeDestroy(){
			this.$api._io.friendvue = {};
		}
	}	
</script>