var express = require("express"); 
var app = express(); 
var path = require("path"); 

app.get('/',function(req,res){ 
res.sendFile(path.join(__dirname+'/index.html')); 
//__dirname : It will resolve to your project folder. 
}); 

app.use('/', express.static(__dirname + '/')); 

var port = process.env.PORT || 5000; 
app.listen(port, function() { 
console.log("Listening on " + port); 
});