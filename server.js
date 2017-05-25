var express= require('express');
var bodyParser=require('body-parser')
var morgan=require('morgan')
var router=express.Router();
var app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use('/api', router);
var port = process.env.PORT || 8000; 
app.listen(port,function()
{
	console.log("server started running on port",port);
})

var tesseractAPI=require('./apis/tesseract/tesseract_example').ImageToText(app, router);

module.exports=router;