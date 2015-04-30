define(function(require, exports, module){

    var $ = require("jquery");

    var config1 = require("apps/multi_data.js");

    var config2 = require("apps/line_data.js");
    var config3 = require("apps/line2_data.js");

	
	var myChart2 = echarts.init($("#line-chart")[0]);
	var myChart3 = echarts.init($("#line2-chart")[0]);

	
	myChart2.setOption(config2);
	myChart3.setOption(config3);



	myChart_multi1 = echarts.init($("#multi-chart1")[0]);
	myChart_multi1.setOption(config1.option1);

	myChart_multi2 = echarts.init($("#multi-chart2")[0]);
	myChart_multi2.setOption(config1.option2);

	myChart_multi3 = echarts.init($("#multi-chart3")[0]);
	myChart_multi3.setOption(config1.option3);

	myChart_multi1.connect([myChart_multi2, myChart_multi3]);
	myChart_multi2.connect([myChart_multi1, myChart_multi3]);
	myChart_multi3.connect([myChart_multi1, myChart_multi2]);

	setTimeout(function (){
	    window.onresize = function () {
	        myChart_multi1.resize();
	       	myChart_multi3.resize();
	        myChart_multi3.resize();
	    }
	},200)
});