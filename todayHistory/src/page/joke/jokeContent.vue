<template>
	<div class="jokeContent">
		<div class="jokeroute" id="jokeroute" v-on:click="change">
			<div class="jokelink">
				<router-link to="/joke/joketext" replace><img id="text" src="../../assets/img/text.png" class="jokeLinkActive jokeLinkAnimation" alt=""></router-link>
			</div>
			<div class="jokelink">
				<router-link to="/joke/jokeimg" replace><img id="img" src="../../assets/img/img.png" alt=""></router-link>
			</div>			
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		methods:{	
			change(){
				let a = document.getElementsByClassName("jokeLinkActive")[0];
				if(a == event.target){
					return ;
				}else{
					a.className = "";
					event.target.className = "jokeLinkActive jokeLinkAnimation";
				}
			}
		}
	}
</script>