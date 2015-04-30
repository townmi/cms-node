var express = require('express');

var Read = require("../src/readSQL.js");

var app = express();
var router = express.Router();

// exports
module.exports = router;

router.get("/", function (req, res){
	res.render("index");
});
router.get("/data/grid", function (req, res){
	res.render("grid");
});
router.post("/data/grid", function (req, res){

	var arr = [
		{
		  "first_name": "Tiger",
		  "last_name": "Nixon",
		  "position": "System Architect",
		  "office": "Edinburgh",
		  "start_date": "25th Apr 11",
		  "salary": "$320,800"
		},
		{
		  "first_name": "Garrett",
		  "last_name": "Winters",
		  "position": "Accountant",
		  "office": "Tokyo",
		  "start_date": "25th Jul 11",
		  "salary": "$170,750"
		},
		{
		  "first_name": "Ashton",
		  "last_name": "Cox",
		  "position": "Junior Technical Author",
		  "office": "San Francisco",
		  "start_date": "12th Jan 09",
		  "salary": "$86,000"
		},
		{
		  "first_name": "Cedric",
		  "last_name": "Kelly",
		  "position": "Senior Javascript Developer",
		  "office": "Edinburgh",
		  "start_date": "29th Mar 12",
		  "salary": "$433,060"
		},
		{
		  "first_name": "Airi",
		  "last_name": "Satou",
		  "position": "Accountant",
		  "office": "Tokyo",
		  "start_date": "28th Nov 08",
		  "salary": "$162,700"
		},
		{
		  "first_name": "Brielle",
		  "last_name": "Williamson",
		  "position": "Integration Specialist",
		  "office": "New York",
		  "start_date": "2nd Dec 12",
		  "salary": "$372,000"
		},
		{
		  "first_name": "Herrod",
		  "last_name": "Chandler",
		  "position": "Sales Assistant",
		  "office": "San Francisco",
		  "start_date": "6th Aug 12",
		  "salary": "$137,500"
		},
		{
		  "first_name": "Rhona",
		  "last_name": "Davidson",
		  "position": "Integration Specialist",
		  "office": "Tokyo",
		  "start_date": "14th Oct 10",
		  "salary": "$327,900"
		},
		{
		  "first_name": "Colleen",
		  "last_name": "Hurst",
		  "position": "Javascript Developer",
		  "office": "San Francisco",
		  "start_date": "15th Sep 09",
		  "salary": "$205,500"
		},
		{
		  "first_name": "Sonya",
		  "last_name": "Frost",
		  "position": "Software Engineer",
		  "office": "Edinburgh",
		  "start_date": "13th Dec 08",
		  "salary": "$103,600"
		},
		{
		  "first_name": "Jena",
		  "last_name": "Gaines",
		  "position": "Office Manager",
		  "office": "London",
		  "start_date": "19th Dec 08",
		  "salary": "$90,560"
		},
		{
		  "first_name": "Quinn",
		  "last_name": "Flynn",
		  "position": "Support Lead",
		  "office": "Edinburgh",
		  "start_date": "3rd Mar 13",
		  "salary": "$342,000"
		},
		{
		  "first_name": "Charde",
		  "last_name": "Marshall",
		  "position": "Regional Director",
		  "office": "San Francisco",
		  "start_date": "16th Oct 08",
		  "salary": "$470,600"
		},
		{
		  "first_name": "Haley",
		  "last_name": "Kennedy",
		  "position": "Senior Marketing Designer",
		  "office": "London",
		  "start_date": "18th Dec 12",
		  "salary": "$313,500"
		},
		{
		  "first_name": "Tatyana",
		  "last_name": "Fitzpatrick",
		  "position": "Regional Director",
		  "office": "London",
		  "start_date": "17th Mar 10",
		  "salary": "$385,750"
		},
		{
		  "first_name": "Michael",
		  "last_name": "Silva",
		  "position": "Marketing Designer",
		  "office": "London",
		  "start_date": "27th Nov 12",
		  "salary": "$198,500"
		},
		{
		  "first_name": "Paul",
		  "last_name": "Byrd",
		  "position": "Chief Financial Officer (CFO)",
		  "office": "New York",
		  "start_date": "9th Jun 10",
		  "salary": "$725,000"
		},
		{
		  "first_name": "Gloria",
		  "last_name": "Little",
		  "position": "Systems Administrator",
		  "office": "New York",
		  "start_date": "10th Apr 09",
		  "salary": "$237,500"
		},
		{
		  "first_name": "Bradley",
		  "last_name": "Greer",
		  "position": "Software Engineer",
		  "office": "London",
		  "start_date": "13th Oct 12",
		  "salary": "$132,000"
		},
		{
		  "first_name": "Dai",
		  "last_name": "Rios",
		  "position": "Personnel Lead",
		  "office": "Edinburgh",
		  "start_date": "26th Sep 12",
		  "salary": "$217,500"
		},
		{
		  "first_name": "Jenette",
		  "last_name": "Caldwell",
		  "position": "Development Lead",
		  "office": "New York",
		  "start_date": "3rd Sep 11",
		  "salary": "$345,000"
		},
		{
		  "first_name": "Yuri",
		  "last_name": "Berry",
		  "position": "Chief Marketing Officer (CMO)",
		  "office": "New York",
		  "start_date": "25th Jun 09",
		  "salary": "$675,000"
		},
		{
		  "first_name": "Caesar",
		  "last_name": "Vance",
		  "position": "Pre-Sales Support",
		  "office": "New York",
		  "start_date": "12th Dec 11",
		  "salary": "$106,450"
		},
		{
		  "first_name": "Doris",
		  "last_name": "Wilder",
		  "position": "Sales Assistant",
		  "office": "Sidney",
		  "start_date": "20th Sep 10",
		  "salary": "$85,600"
		},
		{
		  "first_name": "Angelica",
		  "last_name": "Ramos",
		  "position": "Chief Executive Officer (CEO)",
		  "office": "London",
		  "start_date": "9th Oct 09",
		  "salary": "$1,200,000"
		},
		{
		  "first_name": "Tiger",
		  "last_name": "Nixon",
		  "position": "System Architect",
		  "office": "Edinburgh",
		  "start_date": "25th Apr 11",
		  "salary": "$320,800"
		},
		{
		  "first_name": "Garrett",
		  "last_name": "Winters",
		  "position": "Accountant",
		  "office": "Tokyo",
		  "start_date": "25th Jul 11",
		  "salary": "$170,750"
		},
		{
		  "first_name": "Ashton",
		  "last_name": "Cox",
		  "position": "Junior Technical Author",
		  "office": "San Francisco",
		  "start_date": "12th Jan 09",
		  "salary": "$86,000"
		},
		{
		  "first_name": "Cedric",
		  "last_name": "Kelly",
		  "position": "Senior Javascript Developer",
		  "office": "Edinburgh",
		  "start_date": "29th Mar 12",
		  "salary": "$433,060"
		},
		{
		  "first_name": "Airi",
		  "last_name": "Satou",
		  "position": "Accountant",
		  "office": "Tokyo",
		  "start_date": "28th Nov 08",
		  "salary": "$162,700"
		},
		{
		  "first_name": "Brielle",
		  "last_name": "Williamson",
		  "position": "Integration Specialist",
		  "office": "New York",
		  "start_date": "2nd Dec 12",
		  "salary": "$372,000"
		},
		{
		  "first_name": "Herrod",
		  "last_name": "Chandler",
		  "position": "Sales Assistant",
		  "office": "San Francisco",
		  "start_date": "6th Aug 12",
		  "salary": "$137,500"
		},
		{
		  "first_name": "Rhona",
		  "last_name": "Davidson",
		  "position": "Integration Specialist",
		  "office": "Tokyo",
		  "start_date": "14th Oct 10",
		  "salary": "$327,900"
		},
		{
		  "first_name": "Colleen",
		  "last_name": "Hurst",
		  "position": "Javascript Developer",
		  "office": "San Francisco",
		  "start_date": "15th Sep 09",
		  "salary": "$205,500"
		},
		{
		  "first_name": "Sonya",
		  "last_name": "Frost",
		  "position": "Software Engineer",
		  "office": "Edinburgh",
		  "start_date": "13th Dec 08",
		  "salary": "$103,600"
		},
		{
		  "first_name": "Jena",
		  "last_name": "Gaines",
		  "position": "Office Manager",
		  "office": "London",
		  "start_date": "19th Dec 08",
		  "salary": "$90,560"
		},
		{
		  "first_name": "Quinn",
		  "last_name": "Flynn",
		  "position": "Support Lead",
		  "office": "Edinburgh",
		  "start_date": "3rd Mar 13",
		  "salary": "$342,000"
		},
		{
		  "first_name": "Charde",
		  "last_name": "Marshall",
		  "position": "Regional Director",
		  "office": "San Francisco",
		  "start_date": "16th Oct 08",
		  "salary": "$470,600"
		},
		{
		  "first_name": "Haley",
		  "last_name": "Kennedy",
		  "position": "Senior Marketing Designer",
		  "office": "London",
		  "start_date": "18th Dec 12",
		  "salary": "$313,500"
		},
		{
		  "first_name": "Tatyana",
		  "last_name": "Fitzpatrick",
		  "position": "Regional Director",
		  "office": "London",
		  "start_date": "17th Mar 10",
		  "salary": "$385,750"
		},
		{
		  "first_name": "Michael",
		  "last_name": "Silva",
		  "position": "Marketing Designer",
		  "office": "London",
		  "start_date": "27th Nov 12",
		  "salary": "$198,500"
		},
		{
		  "first_name": "Paul",
		  "last_name": "Byrd",
		  "position": "Chief Financial Officer (CFO)",
		  "office": "New York",
		  "start_date": "9th Jun 10",
		  "salary": "$725,000"
		},
		{
		  "first_name": "Gloria",
		  "last_name": "Little",
		  "position": "Systems Administrator",
		  "office": "New York",
		  "start_date": "10th Apr 09",
		  "salary": "$237,500"
		},
		{
		  "first_name": "Bradley",
		  "last_name": "Greer",
		  "position": "Software Engineer",
		  "office": "London",
		  "start_date": "13th Oct 12",
		  "salary": "$132,000"
		},
		{
		  "first_name": "Dai",
		  "last_name": "Rios",
		  "position": "Personnel Lead",
		  "office": "Edinburgh",
		  "start_date": "26th Sep 12",
		  "salary": "$217,500"
		},
		{
		  "first_name": "Jenette",
		  "last_name": "Caldwell",
		  "position": "Development Lead",
		  "office": "New York",
		  "start_date": "3rd Sep 11",
		  "salary": "$345,000"
		},
		{
		  "first_name": "Yuri",
		  "last_name": "Berry",
		  "position": "Chief Marketing Officer (CMO)",
		  "office": "New York",
		  "start_date": "25th Jun 09",
		  "salary": "$675,000"
		},
		{
		  "first_name": "Caesar",
		  "last_name": "Vance",
		  "position": "Pre-Sales Support",
		  "office": "New York",
		  "start_date": "12th Dec 11",
		  "salary": "$106,450"
		},
		{
		  "first_name": "Doris",
		  "last_name": "Wilder",
		  "position": "Sales Assistant",
		  "office": "Sidney",
		  "start_date": "20th Sep 10",
		  "salary": "$85,600"
		},
		{
		  "first_name": "Angelica",
		  "last_name": "Ramos",
		  "position": "Chief Executive Officer (CEO)",
		  "office": "London",
		  "start_date": "9th Oct 09",
		  "salary": "$1,200,000"
		},
		{
		  "first_name": "Yuri",
		  "last_name": "Berry",
		  "position": "Chief Marketing Officer (CMO)",
		  "office": "New York",
		  "start_date": "25th Jun 09",
		  "salary": "$675,000"
		},
		{
		  "first_name": "Caesar",
		  "last_name": "Vance",
		  "position": "Pre-Sales Support",
		  "office": "New York",
		  "start_date": "12th Dec 11",
		  "salary": "$106,450"
		},
		{
		  "first_name": "Doris",
		  "last_name": "Wilder",
		  "position": "Sales Assistant",
		  "office": "Sidney",
		  "start_date": "20th Sep 10",
		  "salary": "$85,600"
		},
		{
		  "first_name": "Angelica",
		  "last_name": "Ramos",
		  "position": "Chief Executive Officer (CEO)",
		  "office": "London",
		  "start_date": "9th Oct 09",
		  "salary": "$1,200,000"
		}
	];

	var start = parseInt( req.body.start ),
		len = parseInt( req.body.length );

	var page = start/len;

	var con = arr.slice(start, start+len);
	
	var data = {
		"draw": 0,
		"recordsTotal": arr.length,
		"recordsFiltered": arr.length,
		"data": con
	}

	res.send(data)
})