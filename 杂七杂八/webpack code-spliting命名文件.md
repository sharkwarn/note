```
const [ echarts, zrender ] = await Promise.all([
			import(
				/* webpackChunkName: "echarts" */
				'./echarts.min.js'), 
			import(
				/* webpackChunkName: "zrender" */
				'./zrender.min.js')
		])
```
