import authorInfo from '../page/author/info'
import authorname from '../page/author/name'
import authorage from '../page/author/age'
import defaultpage from '../page/default'

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
				},			
				children:[
					{
						path:"/authorInfo/default",
						component:defaultpage
					},
					{
						path:"/authorInfo/name",
						component:authorname
					},
					{
						path:"/authorInfo/age",
						component:authorage
					}
				]	
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