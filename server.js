var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var teCal = require("./calendar-const");
var app = express();

app.get('/panchang', function(req, res) {

    let url = 'http://telugu.panchangam.org/';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);


            var json = { month: "", paksham: "", thithi: "", nakshtram: "", rahukalam: "",yamagandam:""};

            const uuidv1 = require('uuid/v1');
            var uid = uuidv1()
            var responseMessage = {

                "maasamu":"",
                "paksham":"",
                "thithi":"",
                "nakshatram":"",
                "rahukalam":"",
            }

            $('div .table-responsive tbody tr').filter(function() {
                var data = $(this);


                if (data.children().first().text().trim().startsWith("Month")) {
                    json.month = data.children().first().next().text().trim();
                    json.month = ` ${teCal.teluguMonths[json.month]}`
                    console.log(json.month)
                }

                if (data.children().first().text().trim().startsWith("Paksham")) {
                    json.paksham = data.children().first().next().text().trim();
                    json.paksham = `${teCal.teluguPaksham[json.paksham]}`
                    console.log(json.paksham)
                }

                if (data.children().first().text().trim().startsWith("Tithi")) {
                    json.thithi = data.children().first().next().text().trim();
                    json.thithi = json.thithi.split(" ")[0];
                    console.log(json.thithi)
                    json.thithi = `${teCal.teluguThithi[json.thithi]}`
                }

                if (data.children().first().text().trim().startsWith("Nakshatram")) {
                    json.nakshtram = data.children().first().next().text().trim();
                    json.nakshtram = json.nakshtram.split(" ")[0];
                    console.log(json.nakshtram)
                    json.nakshtram = `${teCal.teluguNakshtralu[json.nakshtram]} `
                }

                if (data.children().first().text().trim().startsWith("Rahukalam")) {
                    json.rahukalam = data.children().first().next().text().trim();
                }


                responseMessage.maasamu =`${json.month}`,
                responseMessage.paksham =`${json.paksham}`
                responseMessage.thithi =`${json.thithi}`
                responseMessage.nakshatram=` ${json.nakshtram}`
                responseMessage.rahukalam=`${json.rahukalam}`
               
            })

        }

        res.contentType = "application/json"
        res.send(responseMessage);
        res.end()

    })
})
app.get('/calpanchang', function(req, res) {

    var d="2018-06-20";

    let url = 'http://telugu.panchangam.org/dailypanchangam.php?date='+d;

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var json = { month: "", paksham: "", thithi: "", nakshtram: "", rahukalam: "",yamagandam:"",amritakalam:""};

            const uuidv1 = require('uuid/v1');
            var uid = uuidv1()
            var responseMessage = {

                "maasamu_pakshamu":"",
                "thithi":"",
                "nakshatram":"",
                "rahukalam":"",
                "yamagandam":"",
                "amritakalam":"",
            }

            $('div .table-responsive tbody tr').filter(function() {
                var data = $(this);


                if (data.children().first().text().trim().startsWith("Month & Paksham")) {
                    json.month = data.children().first().next().text().trim();
                    json.month = ` ${teCal.teluguMaasamu[json.month]}`
                }



                if (data.children().first().text().trim().startsWith("Tithi")) {
                    json.thithi = data.children().first().next().text().trim();
                    json.thithi = json.thithi.split(" ")[0];
                    json.thithi = `${teCal.teluguThithi[json.thithi]}`
                }

                if (data.children().first().text().trim().startsWith("Nakshatram")) {
                    json.nakshtram = data.children().first().next().text().trim();
                    json.nakshtram = json.nakshtram.split(" ")[0];
                    json.nakshtram = `${teCal.teluguNakshtralu[json.nakshtram]} `
                }

                if (data.children().first().text().trim().startsWith("Rahukalam")) {
                    json.rahukalam = data.children().first().next().text().trim();
                }
                if (data.children().first().text().trim().startsWith("Yamagandam")) {
                    json.yamagandam = data.children().first().next().text().trim();
                }
                if (data.children().first().text().trim().startsWith("Amritakalam")) {
                    json.amritakalam = data.children().first().next().text().trim();
                }
                

                responseMessage.maasamu_pakshamu =`${json.month}`,
                responseMessage.thithi =`${json.thithi}`
                responseMessage.nakshatram=` ${json.nakshtram}`
                responseMessage.rahukalam=`${json.rahukalam}`
                responseMessage.yamagandam=`${json.yamagandam}`
                responseMessage.amritakalam=`${json.amritakalam}`

            })


        }


        res.contentType = "application/json"
        res.send(responseMessage);
        res.end()
    })
})
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;