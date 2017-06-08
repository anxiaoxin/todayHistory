<template>
	<div class="todayHistory">
		<ul>
			<li v-for="item in list" v-on:click='getDetails(item.e_id)'>
				<div class="historyDetail">
					<div class="historyDate">
						{{item.date}}
					</div>
					<div class="historyTitle">
						{{item.title}}
					</div>
					<div class="arrow">></div>
				</div>
			</li>
		</ul>
		<div class="historycontent" v-if="historycontent.length" id="historycontent" tabindex="-1">
			<div class="historycontentTitle">
				<span>{{historycontent[0].title}}</span>
			</div>
			<div class="historycontentPage" v-html="historycontent[0].content">
				<span></span>
			</div>
			<div class="historycontentImg">
				<ul>
					<li v-for="item in historycontent[0].picUrl">
						<img v-bind:src="item.url" alt="">
						<div>
							{{item.pic_title}}
						</div>
					</li>
				</ul>
			</div>
			<div class="close" v-on:click="close()">
				<-- Back TO List
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				list:[],
				historycontent:[]
			}
		},
		created(){
			this.$store.commit("gethistoryData",this);
		},
		methods:{
			getDetails(id){
				document.body.style.overflow = "hidden";
				this.$store.commit("getDetailData",{_this:this,id:id});
			},
			close(){
				document.body.style.overflow = "";
				this.historycontent = [];
			}
		}
	}
</script>