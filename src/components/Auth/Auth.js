import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';

import { signup, signin } from '../../actions/auth';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import useStyles from './Auth.styles';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = jwt_decode(res.credential);
        const token = res.credential;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
           console.log(error) 
        }
    };

    const googleError = (error) => {
        console.log(error);    
        console.log('Google Sign In was unsuccessful. Try Again Later'); 
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography variant='h5'>
                    {
                        isSignUp ? 'Sign Up' : 'Sign In'
                    }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <> 
                                    <Input
                                        name='firstName' 
                                        label='First Name' 
                                        handleChange={handleChange}
                                        autoFocus
                                        half 
                                    />
                                    <Input 
                                        name='lastName' 
                                        label='Last Name' 
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                        }
                    </Grid>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item>
                            <Button type='submit' variant='contained' color='primary' className={classes.submit}>
                                {
                                    isSignUp ? 'Sign Up' : 'Sign In'
                                }
                            </Button>
                        </Grid>
                        <Grid item>
                            <GoogleLogin
                                onSuccess={googleSuccess}
                                onError={googleError}
                                cookiePolicy='single_host_origin'
                                locale='en-US'
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} className={classes.submit}>
                                {
                                    isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>   
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;