import authorInfo from '../page/author/info'

import home from '../page/home/home'
import homehead from '../page/home/homehead'
import homecontent from '../page/home/homeContent'

import history from '../page/historyToday/todayHistory'
import historyhead from '../page/historyToday/historyhead'
import details from '../page/historyToday/details'

import jokeHead from '../page/joke/jokehead'
import jokeContent from '../page/joke/jokeContent'
import joketext from '../page/joke/text'
import jokeimg from '../page/joke/img'

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
				path: '/authorInfo/:type',
				components: {
					head:homehead,
					content:authorInfo
				}	
			},
			{
				path: '/history/:id',
				components: {
					head:historyhead,
					content:history
				}			
			},
			{
				path: '/joke/:type',
				components: {
					head:jokeHead,
					content:jokeContent
				},				
				children:[
					{
						path: '/joke/joketext',
						component: joketext
					},
					{
						path: '/joke/jokeimg',
						component: jokeimg
					}
				]
			}			
		]
	},

]