import React from 'react';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './login.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import Axios from 'axios';
import { Button } from '@mui/material';
const pages = ['Home'];


function Signup()  
{
  const navigate = useNavigate();
  const openmenu=()=>{
    navigate('/Login');
    }
const validateemail = e =>
{
        var em=e.target.value;
       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       const isOk = re.test(em);
       if (isOk) {
         document.getElementById("email").innerHTML="Valid";
         document.getElementById("email").style.color = "green"
       } else{
         document.getElementById("email").innerHTML="Invalid"  
         document.getElementById("email").style.color = "red"
       }
}
  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()
if (paswd !== cpaswd) {
  setAlertContent('password do not match');
  setAlert(true);
    } 
else
{
      Axios.post('/register', { email, paswd,name}).then((resp) => {
        console.log(resp.data)
        if(resp.status===200)
        {
          setAlertContent('User registered successfully');
          setAlert(true);
          

        }
      })
}
    }




  const [email, setEmail] = useState()
  const [paswd, setPassword] = useState()
const [cpaswd, setConfirmPassword] = useState()
  const [name,setName]=useState()
  const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
  return (
    <div >
        <Container maxWidth={false} disableGutters>
            <AppBar position="sticky" sx={{ bgcolor: "#FF474C"}}>
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box
                    component="img"
                    sx={{
                    height: 70,
                    borderRadius:50
                    
                    }}
                    alt="Your logo."
                    src="/bookicon.png"
                />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                        mr: 4,
                      display: { xs: 'none', md: 'flex'},
                      fontFamily: 'initial',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    UniBooks
                  </Typography>
                   {pages.map((page) => (
              <Button
                key={page}
                onClick={openmenu}
                sx={{ mx: 4, color: 'white', display: 'block', fontFamily: 'initial' }}
              >
                {page}
              </Button>
            ))}
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>  
                  </Box>
                   {alert ? <Alert variant="filled" severity="info">{alertContent}</Alert> : <></> }
                </Toolbar>
              </Container>
            </AppBar>
    
    <Grid container spacing={0.5} >
        <Grid item xs={8} >
        <Card sx={{ maxWidth: "50" }}> 
        <CardMedia
            sx={{ height:700 }}
            image="/istockphoto.png"
            title="green iguana"
          />
        </Card>
        </Grid>

  <Grid item xs={12} sm={4} ms={4} >
 <Typography variant="h5" gutterBottom="false" align="center" >
            User Registration
          </Typography>
    <Card sx={{ maxWidth: 500,height: '100%'  }}> 
   
    <form action="" id="login" method="post" onSubmit={handleSubmit}>
    <div class="form-box">

    <div class="form-group">
    <label for="email">Email</label>
      <input class="form-control" id="email" type="email" name="Email" onInput={validateemail} onChange={(e) => {setEmail(e.target.value) } }/>
    </div><br></br>

    <div class="form-group">
      <label for="email">Password</label>
      <input class="form-control" id="paswd" type="password" name="paswd" onChange={(e) => {setPassword(e.target.value) }}/>
    </div>
    <br></br>
    <div class="form-group">
      <label for="email">Retype Password</label>
      <input class="form-control" id="cpaswd" type="password" name="cpaswd" onChange={(e) => {setConfirmPassword(e.target.value) }}/>
    </div>
    <br></br>
<div class="form-group">
    <label for="email">User Name</label>
      <input class="form-control" id="name" type="name" name="name" onChange={(e) => {setName(e.target.value) }}/>
    </div><br></br>
  <input class="btn btn-danger" type="submit" value="Submit"/>
    </div>
    </form>
        <Alert icon={false} severity="info">
      click
    <Button 
     onClick={openmenu}
    >
      LOGIN
    </Button>
</Alert>
    </Card>
   
  </Grid>
</Grid>
</Container>
</div>
  )
  }

export default Signup
