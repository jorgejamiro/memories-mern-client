import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';

import useStyles from './Form.styles';

const initialState = {
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) => 
                  currentId ? state.posts.posts.find((p) => p._id === currentId) : null); // these 'posts' come from 'combineReducers' from Reducers/index.js
  const [postData, setPostData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])
  

  const handleSubmit = (e) => {
    e.preventDefault();  // prevents page from being refreshed

    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          {t('msgToLogIn')}
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData(initialState);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>
          { currentId ? t('Editing') : t('Creating') }
        </Typography>
        <TextField 
          name='title' 
          variant='outlined' 
          label={t('Title')} 
          fullWidth 
          value={postData.title} 
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
        />
        <TextField 
          name='message' 
          variant='outlined' 
          label={t('Message')}
          multiline={true}
          minRows={3}
          fullWidth 
          value={postData.message} 
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
        />
        <TextField 
          name='tags' 
          variant='outlined' 
          label={t('editTags')}
          fullWidth 
          value={postData.tags} 
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
        />
        <div className={classes.fileInput}>
          <FileBase 
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
          {t('Submit')}
        </Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
          {t('Clear')}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
