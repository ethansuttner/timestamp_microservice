var express = require('express');
var app = express();

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

app.use(express.static(__dirname + "/client/"))

app.get('/:arg', function (req, res) {
    var dateInput = req.params.arg
    var unixInput = parseInt(dateInput)
    if (Number.isInteger(unixInput)){
        var date = new Date(unixInput*1000)
        if (date.toDateString() === "Invalid Date") {
            res.send({unix:null,natural:null})
        } else {
            var naturalOutput = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
            res.send({unix:unixInput,natural:naturalOutput})
        }
    }
    else {
        var naturalInput = dateInput.split(" ")
        if (naturalInput.length !== 3) {
            res.send({unix:null,natural:null})
        } else if (months.indexOf(naturalInput[0]) === -1) {
            res.send({unix:null,natural:null})
        } else {
            var dateFromNatural = new Date(dateInput)
            if (dateFromNatural.toDateString() === "Invalid Date") {
                res.send({unix:null,natural:null})
            } else {
                res.send({unix:Date.UTC(dateFromNatural.getFullYear(),dateFromNatural.getMonth(),dateFromNatural.getDate())/1000,natural:dateInput})
            }
        }
    } 
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});