export default {
	state:{
		thistmp:"",
		flag:""
	},
	mutations:{
		//调用读取数据api
		//读取历史上的今天的数据
		gethistoryData(state,_this){
			state.flag = "sethitoryData";
			_this.$api.getHistoryList();
			state.thistmp = _this;
		},
		sethitoryData(state,data){
			state.thistmp.list = state.thistmp.$api.refresh(data);
		},
		getDetailData(state,ob){
			state.flag = "setDetailData";
			ob._this.$api.getDetails(ob.id);
			state.thistmp = ob._this;
		},
		setDetailData(state,data){
			state.thistmp.historycontent = state.thistmp.$api.refresh(data);
			state.thistmp.historycontent[0].content = state.thistmp.historycontent[0].content.replace(/(\s){3}/g, "<br/>");			
		},
		//读取笑话的数据
		getJokeText(state,_this){
			state.flag = "setJokeTextData";
			_this.$api.getJokeText();
			state.thistmp = _this;
		},
		setJokeTextData(state,data){
			state.thistmp.$api.refresh(data).list.push({refresh:true});
			state.thistmp.list.splice(0,0,...state.thistmp.$api.refresh(data).list);
		},
		getJokeImg(state,_this){
			state.flag = "setJokeImgData";
			_this.$api.getJokeImg();
			state.thistmp = _this;			
		},
		setJokeImgData(state,data){
			state.thistmp.$api.refresh(data).list.push({refresh:true});
			state.thistmp.list.splice(0,0,...state.thistmp.$api.refresh(data).list);
		}			
	},
	actions:{
		//设置数据
		setData(context,data){
			context.commit(context.state.flag,data);
			//移除script标签
			document.body.removeChild(document.getElementById("getData"));
		},	
	}
}