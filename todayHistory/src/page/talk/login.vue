<template> 
	<div class="loginContent">
		<div>
			<input type="text" id="name" placeholder="吾名唤作" maxlength="6">
			<button v-on:click="sendName">提交</button>
			<div class="globe">
				<i class="fa fa-globe"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		created(){
			//如果已经登录了，并且链接还没断开就直接到群聊界面
			if(this.$api._io.iflogin){
				this.$router.push({path:"/talk/rome"});
			}
		},
		methods:{
			sendName(){
				this.$api._io.init(this);
				this.$api._io.login(document.getElementById("name").value);
			}
		},
/*		beforeRouteLeave(to,from,next){
			let _this = this;
			let p = new Promise(function(res,rej){
				_this.sendName()
			})
		}*/
	}
</script>