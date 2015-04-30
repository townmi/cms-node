define(function(require, exports, module){

    var $ = require("jquery");

    var dateTimePicker = require("dateTimePicker")($);

    $(function(){
	    $('#datetimepicker2').datetimepicker({
			language: 'pt-BR'
	    });
	});

});