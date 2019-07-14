
const express = require('express');
const app = express();
var router = express.Router();
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: true});
const http = require('http'); 
__dirname+="/";
const port = 27017;
var nodemailer=require('nodemailer');
////for table//////
app.use(bodyParser.urlencoded({ 
  extended: true
})); 
app.use(bodyParser.json());
//////////// connection to mongodb through mongoose/////////////////////////////
mongoose.connect("mongodb+srv://arik:arik12345@cluster0-ineie.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
//////////// finish connection to mongodb through mongoose/////////////////////////////
///////////////////connect to mongodb(log-in)///////////////////
/////////////connect with special account admin(not in mondodb)////////////
app.post('/log-in',function(req,res){
  if(req.body.usrname=="admin@gmail.com" && req.body.psw=="Admin1!")
        {
          res.redirect("addtreatment"); 
        }
        else
        {
   ///////// finish checking special account admin////////////////       
  db.collection('devices').findOne({ name: req.body.usrname,password:req.body.psw}, function(err, user) {
            if(user ===null){
              res.end("Login invalid");
           } else if ((user.name === req.body.usrname) && (user.password === req.body.psw) ){
            res.redirect("addtreatment");  
         } else {
           console.log("Credentials wrong");
           res.end("Login invalid");
         }
  });
}});
/////////////////////finish connect to mongodb(log-in)////////////////////////////
//register to DB================================================================
app.post('/register', function(req,res){ 
  var User = req.body.signupusrname; 
  var pass =req.body.signuppsw; 
  var passconfirm = req.body.signupcpsw; 
  var data = { 
      "name": User, 
      "password":pass, 
      "passwordconfirm":passconfirm 
  } 
  /////////check if username already exists///////////////////////////////
  db.collection('devices').findOne({ name:req.body.signupusrname}, function(err, user) 
  {
    if(user ===null){
      db.collection('devices').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully");
        res.redirect("log-in");          
    }); 
    }else if (user.name === User && user.password === pass)
      {
        console.log("User already exists");
           res.end("The user you have entered already exists.");
      }
    });
      ///////// if username dont exists adds a new username(account)///////////////////////////////
}); 
 /////////////////finish register to DB================================================================
 //////////////*************datatables start***************** */
 //////////////////add table row to tabledb in mongodb/////////////////////////////////////////
 app.post('/addtreatment', function(req,res){ 
  var numbercar = req.body.number; 
  var carname =req.body.carname; 
  var customer = req.body.name;
  var id = req.body.id;
  var status = req.body.status; 
  var data = { 
     "number" : numbercar, 
     "Carname" :carname, 
     "Customer" : customer,
     "Id" : id,
     "Status" : status 
  }
  db.collection('tabledb').findOne({ number:req.body.number}, function(err, user) 
  {
    if(user ===null){
      db.collection('tabledb').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record Added Successfully");
        res.redirect("addtreatment"); 
      });
    }else if (user.number === req.body.number && user.Carname === req.body.carname && user.Customer === req.body.name && user.Id === req.body.id&& user.Status ===req.body.status)
      {
        res.end("already exists");
           
      } 
    });
    });
  ////////////////// finish add table row to tabledb in mongodb/////////////////////////////////////////
  ////////////////// edit table row to tabledb in mongodb/////////////////////////////////////////
  app.post('/edittreatment', function(req,res){   
    var Tr=req.body.TrId;
    var numbercar = req.body.number; 
    var carname =req.body.carname; 
    var customer = req.body.name;
    var id = req.body.id;
    var status = req.body.status; 
    var data = {
       "number":numbercar,
       "Carname" :carname, 
       "Customer" : customer,
       "Id" : id,
       "Status" : status 
    }
    db.collection('tabledb').findOneAndDelete({ number:req.body.number}, function(err, user) 
    {
      if(user ===null){
        res.end("Treatment do not exist"); 
        res.redirect("edittreatment");    
      }else 
      {
          db.collection('tabledb').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Record Updated Successfully");
            res.redirect("edittreatment"); 
            });      
      };
      });  
    });   
//////////////////////finish edit table row/////////////////////////////////////////////      
////////////////////*****delete table row******////////////////// */
app.post('/deletetreatment', function(req,res){ 
  var numbercar = req.body.number; 
  var carname =req.body.carname; 
  var customer = req.body.name;
  var id = req.body.id;
  var status = req.body.status; 
  var data = { 
     "number" : numbercar, 
     "Carname" :carname, 
     "Customer" : customer,
     "Id" : id,
     "Status" : status 
  }
  db.collection('tabledb').findOneAndDelete({ number:req.body.number}, function(err, user) 
  {
    if(user ===null ){
      res.end("This Treatment does not exist");
      
     
    }else 
      {
          console.log("Record deleted Successfully");
          res.redirect("deletetreatment"); 
      };  
      }); 
      });
 ///////////////////////finish delete table row/////////////////////
/////////insert data into table////////////////////////////
      app.get('/work', (req, res) => {
        db.collection('tabledb').find({}).toArray( (err,data ) => {
            if (!err) {
                  return res.json(data)
            }else {
                console.log('Error in retrieving employee list :' + err);
            }
        } );
    });
/////////insert data into table////////////////////////////
//////////////*************datatables done***************** */
/////////////////load all files////////////////////////////////////////
       // app.use(express.static('public'));
       app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap')));
        app.use('/css', express.static(path.join(__dirname, 'css')));
        app.use('/html', express.static(path.join(__dirname, 'html')));
        app.use('/js', express.static(path.join(__dirname, 'js')));
        app.use('/img', express.static(path.join(__dirname, 'img')));
        //////////////////////finish loading static files//////////////////////////
        ////////////////get and post requests for web pages//////////////////////////
        app.get("/edittreatment", function(req, res) {
            res.sendFile(path.join(__dirname +"html"+ "/editTreatment.html"));
        });
        app.get("/addtreatment", function(req, res) {
          res.sendFile(path.join(__dirname +"html"+ "/addTreatment.html"));
      });
      app.get("/deletetreatment", function(req, res) {
        res.sendFile(path.join(__dirname +"html"+ "/deleteTreatment.html"));
    });
    app.get("/log-in", function(req, res) {
      res.sendFile(path.join(__dirname +"html"+ "/Login.html"));
  });
    app.get("/",function(req, res) {
      res.sendFile(path.join(__dirname +"html"+ "/Login.html"));
    });
    app.post("/",function(req, res) {
      res.sendFile(path.join(__dirname +"html"+ "/addTreatment.html"));
    });   
        app.get("/register", function(req, res) {
          res.sendFile(path.join(__dirname +"html"+ "/Register.html"));
      });
        app.get("/contact-us", function(req, res) {
          res.sendFile(path.join(__dirname +"html"+ "/ContactForm.html"));      
      });
    app.get("/rec-pass", function(req, res) {
      res.sendFile(path.join(__dirname +"html"+ "/Rec-Pass.html"));  
  });
  app.get('/favicon.ico',function(req,res){
    res.end();
  });
     //////////////// finish get and post requests for web pages//////////////////////////   
//******************************send mail************************************ */
        app.post('/sendEmailContactUss', urlencodeParser,function(req,res){
          console.log(req.body ); 
          var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "testlocakhost@gmail.com",
              pass : "S12345678*"
            }
          });
          var mailOptions= {
            from: "testlocakhost@gmail.com",
            to:req.body.email,
            subject: "Mr" +req.body.name +" Thank you for contacting us",
            text: "We will respond to your question as soon as possible sir" + "\ "
          };
          transporter.sendMail(mailOptions,function(error,info){
            if(error) {
              console.log(error);
            }else{
              console.log("Email send: " + info.response);
              res.redirect("log-in");  
              }
            });  
        });
        ////////*************************send mail done********************************* */
        ////////////*****************retrieve password ********************************* */       
        app.post('/rec-pass', urlencodeParser,function(req,res){
          console.log(req.body );   
          var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "testlocakhost@gmail.com",
              pass : "S12345678*"
            }
          });  
          db.collection('devices').findOne({ name: req.body.username}, function(err, user) {
            if(user ===null){
              res.end("Please type your email before tyring to get your password");
           }else if (user.name === req.body.username ){
            var mailOptions= {
              from: "testlocakhost@gmail.com",
              to:req.body.username,
              subject:req.body.username +" Thank you for contacting us",
              text: "your password " +user.password +"\ "
            };
            transporter.sendMail(mailOptions,function(error,info){
              if(error) {
                console.log(error);
              }else{
                console.log("Email send: " + info.response);
                res.redirect("log-in");             
                }
              });
         } else {
           console.log("username not found please type your proper email");
           res.end("Login invalid");
         }
  });
});      
          //////////////////////////******************finish retrieve password************** */
          app.listen(process.env.PORT || 8080, function(){
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
          });