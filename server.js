const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./client/src/book.model.js");
const path = require('path');
const mongoose = require('mongoose');
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
app.use(express.static('./client/build'))
app.get("/", (req, res) => { //our GET route needs to point to the index.html in our build
  res.sendFile(path.resolve(__dirname,"client", "build","index.html"));
  // res.redirect('/Home');
});


app.post("/", async (req, res) => {
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

app.post("/login", async function(req, res)
{
  try {
      console.log(req.body);
      const user = await User.findOne({ email :req.body.email},{name:1,paswd:1});
      if (user) { 
        //check if password matches
        if(req.body.paswd == user.paswd);
        res.status(200).send(user);
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
});














 
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}.`);
});