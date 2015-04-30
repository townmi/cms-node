define(function(require, exports, module){

    var $ = require("jquery");

    var datatables = require("datatables")($);

    var datatables_ext = require("datatables_ext")($,datatables);


    $(document).ready(function() {
    	
        $('#dataTables-example').DataTable({
            "sInfo": "当前<span> _START_ </span>到<span> _END_ </span>&nbsp;共&nbsp;<span> _TOTAL_ </span>条数据",
        	"processing": true,
        	"serverSide": true,
        	"ajax": {
                "url": "/data/grid",
                "type": "post"
            },
            "columns": [
                { "data": "first_name" },
                { "data": "last_name" },
                { "data": "position" },
                { "data": "office" },
                { "data": "start_date" },
                { "data": "salary" }
            ]
        });
		

        
    });

});