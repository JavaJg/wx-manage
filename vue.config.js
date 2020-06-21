module.exports = {
	publicPath: "./",
    devServer: {
		// 后端请求转发，此配置仅开发环境有效，生产环境请参考生产环境部署文档配置nginx转发
		proxy: {
			'/wx': {
				//target: 'http://39.106.143.56:8088/'
				target: 'http://127.0.0.1:8088/'
			},
			'memains':{
				target:	'http://127.0.0.1:8080/',
				bypass: function(req,res,proxyOptions){
					if(req.headers.accept.indexOf("html")!==-1){
						console.log("Skipping proxy for browser request.");
						return"/index.html";
					}
					}
				}
		},
		port:8001,
		inline:false //实时编译
	},
	configureWebpack:{
		devServer: {
			disableHostCheck: true
		},
		externals: {
			vue: "Vue",
			"vue-router": "Router",
            "element-ui": "ELEMENT",
            "tinymce":"tinymce"
		}
	},
	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('prefetch')
	},

	outputDir: undefined,
	assetsDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined,
	css: undefined
}