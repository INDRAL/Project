import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActions} from '@mui/material';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import { Button } from '@mui/material';
import Axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

// s
const pages = ['Bookshelf'];
function MyDashboard (  ) {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(' ');
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const navigate = useNavigate();
    const openmenu=()=>{
      navigate('/MyBookshelf');
      }


    useEffect(() => {
    fetch(`https://server-g1s0.onrender.com/mywishlist/`+sessionStorage.getItem('email'))
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
      setData(result);
      console.log(result); // Log the fetched data
  })
    .catch(error => {
        console.error('Error fetching wishlist:', error);
        // Handle error appropriately, e.g., show an error message to the user
    });
  }, [ ]);

  

  const logout=(e)=>{
    sessionStorage.clear();
    navigate('/Home')
  }


    return (
      <div style={{ height: 350, width: '100%' }}>
        <Container maxWidth={false} disableGutters>
               <AppBar position="sticky" sx={{ bgcolor: "#FF474C",maxWidth:"100%"}}>
              <Container maxWidth="lg">
                <Toolbar disableGutters maxWidth="xl">
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
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'initial',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
        
          </Typography>
          {pages.map((page) => (
              <Button
                key={page}
                onClick={openmenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
             
              
                  <Box sx={{ flexGrow: 2,fontFamily: 'initial', display: { xs: 'none', md: 'flex' } }}>  
                  </Box>
                  {alert ? <Alert variant="filled" severity="success">{alertContent}</Alert> : <></> }          
                  <Badge badgeContent={sessionStorage.getItem('name')} color="primary">
        <IconButton  onClick={logout} sx={{ p: 0 }}>
        
        <LogoutIcon> </LogoutIcon>
      </IconButton>
      </Badge>
      </Toolbar>
      </Container>
      </AppBar>
      <Grid container spacing={1} style={{marginTop:"20px"}}>
            {
              
               data.map((result,index)=>(
                
                <Grid item xs={12} sm={3} ms={3} key={index} >
                  <Card sx={{ maxWidth:500,backgroundColor:"white"}}>
                 
      
                  <CardMedia
                    sx={{ height: 350}}
                    image= {`http://books.google.com/books/content?id=${result.id}&printsec=frontcover&img=1&zoom=1&edge=curl`}
                    title={result.title}
                    
                  />
                   <Divider /> 
                  <Tooltip title={`Updated progress: ${result.progress}%`} arrow>
                <LinearProgress variant="determinate" color='success'  value={result.progress}  />
                </Tooltip>
                  <CardActions >
                  <Stack direction="row" spacing={2} >
                  <TextField id="outlined-basic" label="progress" variant="outlined"  onChange={(e) => {setProgress(e.target.value) }} size='small'/>
        <Button onClick={() => {
          var id=result.id
          if((progress>0)&&(progress<=100))
          {
          Axios.put('/updateprogress', { progress,id }).then((resp) => {
            if(resp.status===200)
              {
                setAlertContent('progress updated successfully');
                setAlert(true);
               
      
              }
              else if(resp.status===203)
              {
                setAlertContent('No updates');
                setAlert(true);
              }
            })
          }
          else
            {
            setAlertContent('Enter a valid progress.');
            setAlert(true);
            }
          
        }}
        >
          <Tooltip title="update progress" arrow>
        <CheckCircleIcon></CheckCircleIcon>
        </Tooltip>
        </Button>
        <Button sx={{color:red[500]}}  onClick={() => {
                    var rid=result.id
          Axios.delete('/remove', { data:{rid}  }).then((resp) => {
            if(resp.status===200)
              {
                setAlertContent('Book removed successfully');
                setAlert(true);
      
              }
              else if(resp.status===203)
              {
                setAlertContent('No updates');
                setAlert(true);
              }
          })
        }}
        >
 <Tooltip title="Delete" arrow>
                  <DeleteIcon></DeleteIcon>
                  </Tooltip>
                  </Button> 
        </Stack>
                </CardActions>
               
                </Card>
               
                </Grid>
                
                  )
                  )
               
            }
          
          </Grid>
          
          </Container>
          
          
          </div>   
          
                 )
                }

export default MyDashboard;
