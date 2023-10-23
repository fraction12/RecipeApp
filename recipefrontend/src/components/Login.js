import { Avatar, Grid, Paper, TextField, Button } from '@mui/material'
import React, {useState} from 'react'
import LockIcon from '@mui/icons-material/Lock';
import {styled} from '@mui/material/styles';

const StyledForm = styled('form')({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    margin: '10 auto',
    backgroundColor: 'white',
    padding: '20px 20px',
    borderRadius: '10px',
  });
  
  const paperStyle = { 
    padding: '20px 20px', 
    width: 350, 
    margin: 'auto',
    align: 'center',
    backgroundColor: 'black', 
    borderRadius: '10px'
  };
  
  const headingStyle = {
    color: 'white',
    margin: '10'
  };
  
  const avStyle = { 
    width: 58, 
    height: 58, 
    backgroundColor: 'white', 
    marginBottom: '15px' 
  };

  const manageLogin = async (username, password, onLogin) => { // <-- Added parameters
    const response = await fetch('http://reci.fyi:8080/user/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
    });
    const data = await response.json();

    if (response.ok) {
        onLogin();
        console.log("Login Successful" + data);
    } else {
        console.log("Failed Login" + data);
    }
}

function Login(props) {
    const [username, setUsername] = useState(''); // <-- State for username
    const [password, setPassword] = useState(''); // <-- State for password
    const [shake, setShake] =useState(false);

    const handleSubmit = (e) => { // <-- Handle form submission
        e.preventDefault(); // Prevent default form submission
        manageLogin(username, password, props.onLogin)
        .then((success) => {
          if (!success) {
              setPassword('');
              setUsername('');
              setShake(true);
              setTimeout(() => setShake(false), 500);  // <-- Reset the shake state after the animation duration
          }
      });
    }
    return (
      <Grid style={{ display: 'flex', height: '80vh' }}>
        <Paper elevation={10} style={paperStyle} className={shake ? 'shake-animation' : ''}>
          <Grid align='center'>
            <Avatar style={avStyle}>
              <LockIcon fontSize='medium' style={{color: 'black'}}/>
            </Avatar>
            <h1 style={headingStyle}>Log In</h1>
          </Grid>
          <StyledForm noValidate autoComplete="off"  >
            <TextField label='Username' placeholder='Enter username' fullWidth required variant="outlined" 
                        value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label='Password' placeholder='Enter password' type='password' fullWidth required variant="outlined"
                        value={password} onChange={e => setPassword(e.target.value)} />
            <Button 
              variant="contained" 
              sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#313131' } }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </StyledForm>
        </Paper>
      </Grid>
    );
  }
  
  export default Login;
