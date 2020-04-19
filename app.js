const path=require('path')
const date=require('date-and-time')
const express=require('express')
const mongoose=require('mongoose')
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://arya:123@districtportal-majju.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
var app = express()

var db=mongoose.connection
db.on('error',console.error.bind(console,'connection error'))
db.once('open',function callback() {
        console.log('Connection Succeeded')
})
var Schema=mongoose.Schema
var nameSchema = new Schema({
 Username: String,
 email: String,
 password:String
 
})

var User = mongoose.model('Users', nameSchema)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))


app.get('/', function (req, res) {
 res.sendFile(__dirname + "/index.html");
})

app.post("/addUser", (req, res) => {
 
 //console.log("data received")
 var myData = new User(req.body);

 myData.save()
 .then(item => {
 res.send("Registration Successful!");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});


app.listen(3000,()=>{
    console.log('Server is up at port 3000')
})