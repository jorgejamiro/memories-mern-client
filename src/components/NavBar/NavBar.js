import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Tab, Tablist } from 'evergreen-ui';

import decode from 'jwt-decode';

import useStyles from './NavBar.styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import recuerdosText from '../../images/recuerdos-Text.png';


const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [indexSelected, setIndexSelected] = useState(0);
    const tabsHeading = ['en', 'es'];
    const { t, i18n } = useTranslation();
    const lng = i18n.language;

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);  // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                {lng === 'en' ?
                    <img className={classes.logo} src={memoriesText} alt='icon' />
                    :
                    <img className={classes.logo} src={recuerdosText} alt='icon' />
                }   
                <img className={classes.image} src={memoriesLogo} alt='icon' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar 
                                className={classes.purple} 
                                alt={user.result.name} 
                                src={user.result.picture}
                            >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button className={classes.logout} variant='contained' 
                                    color='secondary' onClick={logout}>{t('Logout')}</Button>
                        </div>
                    ) : (
                        <Button className={classes.signIn} component={Link} to='/auth' variant='contained' 
                                color='primary'>{t('Sign In')}</Button>
                    )
                }
                <div className={classes.tabLang}>
                    <Tablist marginBottom={0}>
                    {tabsHeading.map((tab, index) => (
                        <Tab
                            key={tab}
                            isSelected={index === indexSelected}
                            appearance='secondary'
                            onSelect={() => {
                                setIndexSelected(index);
                                changeLanguage(tab);
                            }}
                        >
                            {tab}
                        </Tab>
                    ))}
                    </Tablist>
                </div>        
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;