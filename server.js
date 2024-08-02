const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/book.model.js");
const mongoose = require('mongoose');
const Book = require("./src/booklist.model.js");
require('dotenv').config();
const PORT=process.env.PORT | 5000;
mongoose
  .connect(process.env.DBUrl
  //   {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
)  
  .then(e => console.log("MongoDB is ready and connected"))
  .catch(console.error); // If you 
const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.post("/register", async function(req, res)
{
  const {email,paswd,name } = req.body;
  try {
    const user = new User({
      email,
      paswd,
      name,
    });
    await user.save();
    res.send("Saved Successfully.");
  } catch (err) {
    console.log(err);
    res.json(err);
 
  }
});

app.post("/addbook", async function(req, res)
{
  const {email,id,title,authors} = req.body;
  try {
    const book = new Book({ email,id,title,authors});
    await book.save();
    res.send("Saved Successfully.");
  } catch (err) {
    console.log(err);
    res.json(err);
 
  }
});


app.post("/login", async function(req, res)
{
 
      console.log(req.body);
      const user = await User.findOne({ email :req.body.email},{name:1,paswd:1,email:1});
      if (user) { 
        //check if password matches
        const result = req.body.paswd.toUpperCase() === user.paswd.toUpperCase();
        if(result)
        {
        res.status(200).send(user);
        }
        else 
        {
          res.sendStatus(203);
        }
      } 
      else 
        {
          res.sendStatus(203);
        }
});

app.put("/updateprogress", async function(req, res)
{
 
      console.log(req.body.progress,req.body.id);
      const book = await Book.findOneAndUpdate({ id :req.body.id},{$set: {progress:req.body.progress}});
      if (book) { 
        res.status(200).send(book);
        // console.log(book)
      } 
      else 
        {
          res.sendStatus(203);
        } 
      
});

app.delete("/remove", async function(req, res)
{
 
      console.log(req.body.rid);
      const book = await Book.deleteOne({ id :req.body.rid});
      if (book) { 
        res.status(200).send(book);
        console.log(book)
      } 
      else 
        {
          res.sendStatus(203);
        } 
      
});


app.get('/mywishlist/:email', async function(req, res) 
{
  // console.log(req.params.email)
  const book = await Book.find({ email :req.params.email},{id:1,title:1,authors:1,progress:1,comments:1});
  if (book) { 
    res.status(200).send(book);
    // console.log(book)
  } 
  else 
    {
      res.sendStatus(203);
    } 
})

app.get('/', (req, res) => {
  res.send('hello world')
})












 
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}.`);
});
