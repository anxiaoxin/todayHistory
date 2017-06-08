export default {
	state:{
		thistmp:"",
		flag:1
	},
	mutations:{
		//调用读取数据api
		gethistoryData(state,_this){
			state.flag = 1;
			_this.$api.getHistoryList();
			state.thistmp = _this;
		},
		getDetailData(state,ob){
			state.flag = 0;
			ob._this.$api.getDetails(ob.id);
			state.thistmp = ob._this;
		},
		//设置状态中的历史数据
		setData(state,data){
			if(state.flag){
				state.thistmp.list = state.thistmp.$api.refresh(data);
			}else{
				state.thistmp.historycontent = state.thistmp.$api.refresh(data);
				state.thistmp.historycontent[0].content = state.thistmp.historycontent[0].content.replace(/(\s){3}/g, "<br/>");
			}
			//移除script标签
			document.body.removeChild(document.getElementById("getData"));
		},				
	}
}