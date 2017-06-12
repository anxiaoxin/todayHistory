<template>
	<div class="jokeList">
		<ul>
			<li v-for="item in list">
				<div class="addtime" v-if="item.addtime">
					AddTime: {{item.addtime}}
				</div>
				<div class="textContent" v-if="item.content">
					<span>{{item.content}}</span>
					<div class="imgdiv">
						<img v-bind:src="item.pic" alt="暂无">
					</div>
				</div>
				<div v-if="item.refresh" class="refresh">
					<span v-on:click="refresh">点击刷新</span>
				</div>				
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[]
			}
		},
		created(){
			console.log(1);
			this.$store.commit("getJokeImg",this);
		},
		methods:{
			refresh(){
				document.getElementsByClassName("jokeLinkActive")[0].className = "jokeLinkActive jokeLinkAnimation";
				window.scrollTo(0,0);
				this.$store.commit("getJokeImg",this);
			}
		},		
		watch:{
			list(){
				document.getElementsByClassName("jokeLinkActive")[0].className="jokeLinkActive";
			}
		}		
	}
</script>