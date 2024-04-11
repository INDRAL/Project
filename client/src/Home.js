import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Divider from '@material-ui/core/Divider';
import CardContent from '@mui/material/CardContent';
import {CardActions} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
const pages = ['Login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Home() {
    const navigate = useNavigate();
  const openmenu=()=>{
    navigate('/Login');
    }
  

  return (
    <div >
        <Container maxWidth={false} disableGutters>
    <AppBar position="sticky" sx={{ bgcolor: "crimson"}}>
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
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UniBooks
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={openmenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Card sx={{ maxWidth: "xl" }}>
      <CardMedia
        sx={{ height:700 }}
        image="/istockphoto.png"
        title="green iguana"
      />
      </Card>
    </Container>
    </div>
    
  );
}
export default Home;
