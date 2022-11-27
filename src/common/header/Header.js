import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import { Button, Modal} from '@material-ui/core';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
//import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Home from '../../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';


const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

/*tab code start*/
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
/*tab code end*/


const Header = function (props) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*tab code start*/
     const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  /*tab code end*/
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setemail] = React.useState('');
    const [registerpassword, setRegisterpassword] = React.useState('');
    const [contact, setContact] = React.useState('');

    const onFirstnameChange = (e) => {
        setFirstname(e.target.value);
    }

    const onLastnameChange = (e) => {
        setLastname(e.target.value);
    }

    const onemailChange = (e) => {
        setemail(e.target.value);
    }

    const onRegisterpasswordChange = (e) => {
        setRegisterpassword(e.target.value);
    }

    const onContactChange = (e) => {
        setContact(e.target.value);
    }
  

    async function onLoginButtonCLick(){
        // let history = useHistory();
        // history.push('../../screens/home/Home');
            const param = window.btoa(`${username}:${password}`)
            try {
                const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        "Accept": "application/json;charset=UTF-8",
                        authorization: `Basic ${param}`
                    },
                })

                const response = await rawResponse.json()

                if (rawResponse.ok) {
                    window.sessionStorage.setItem('user-details', JSON.stringify(response));
                    window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                    if(sessionStorage.getItem('access-token')) {
                        setIsLoggedIn(true);
                        handleClose()
                    }
                } else {
                    const error = new Error();
                    error.message = response.message || 'Something went wrong.';
                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
            return;
        }

    async function onLogoutButtonClick() {
        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json;charset=UTF-8",
                    authorization: `Bearer ${sessionStorage.getItem('access-token')}`
                },
            });
            if (rawResponse.ok) {
                sessionStorage.clear();
                setIsLoggedIn(false)
            } else {
                const response = await rawResponse.json();
                throw (new Error(response.message || 'Something went wrong!'));
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    async function onRegisterButtonClick() {
        const params ={
            "email_address": email,
            "first_name": lastname,
            "last_name": firstname ,
            "mobile_number": contact,
            "password": registerpassword
        }
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {               
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            const result = await rawResponse.json();

            if(rawResponse.ok) {
                console.log("Success");
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }

        } catch(e){
            alert(`Error: {e.message}`);
        }
    }

    let headerButton;
    if(isLoggedIn){
        headerButton =  <Button className= "logout" variant='contained' color='default' onClick={onLogoutButtonClick}>Logout</Button>;
    } else{
        headerButton = <Button className= "login" variant='contained' color='default' onClick={handleOpen}>Login</Button>;
    }

    return (
        <div className="header">
            {props.heading}
            <img className="logo" src={logo} alt="Logo" />;
            {headerButton}
            <Button className='bookShow' variant='contained' color='primary' style={{ marginRight: "10px" }}>Book Show</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalBoxStyle}>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Login" {...a11yProps(0)} />
                                <Tab label="Register" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <form>
                        <TabPanel value={value} index={0}>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" value={username} onChange={onUsernameChanged}/>
                                <FormHelperText>
                                
                                </FormHelperText>
                            </FormControl> 
                            <FormControl required>
                                <InputLabel htmlFor="password" >Password</InputLabel>
                                <Input id="password" value={password} onChange={onPasswordChange}/>
                                <FormHelperText>                                                 
                                </FormHelperText>
                            </FormControl>  
                            <div className="btn-holder">
                                <Button variant="contained" color='primary' onClick={onLoginButtonCLick}>Login</Button>
                            </div>     
                        </TabPanel>
                        </form>
                        <TabPanel value={value} index={1}>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" onChange={onFirstnameChange}/>
                                <FormHelperText></FormHelperText>
                            </FormControl> 
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" onChange={onLastnameChange}/>
                                <FormHelperText></FormHelperText>
                            </FormControl> 
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" onChange={onemailChange}/>
                                <FormHelperText></FormHelperText>
                            </FormControl> 
                            <FormControl required>
                                <InputLabel htmlFor="registerpassword">Password</InputLabel>
                                <Input id="registerpassword" onChange={onRegisterpasswordChange}/>
                                <FormHelperText></FormHelperText>
                            </FormControl> 
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" onChange={onContactChange} />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                            <div className="btn-holder">
                                <Button variant="contained" color='primary' onClick={onRegisterButtonClick}>Register</Button>
                            </div>  
                        </TabPanel>
                    </div>
                </Box>
            </Modal>
                    
        </div>
    )
}

export default Header;