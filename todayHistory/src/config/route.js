import home from '../page/home/home'
import homehead from '../page/home/homehead'
import history from '../page/historyToday/todayHistory'
import historyhead from '../page/historyToday/historyhead'
import homecontent from '../page/home/homeContent'
import authorInfo from '../page/author/info'
import details from '../page/historyToday/details'

export default [
	{
		path: '/',
		component: home,
		children: [
			{
				path: '/',
				components: {
					head:homehead,
					content:homecontent
				},
			},
			{
				path: '/authorInfo',
				components: {
					head:homehead,
					content:authorInfo
				},				
			},
			{
				path: '/history/:id',
				components: {
					head:historyhead,
					content:history
				},		
			},
			{
				path: '/history/details/:id',
				components: {
					head: historyhead,
					content: history
				}
			}
		]
	},

]