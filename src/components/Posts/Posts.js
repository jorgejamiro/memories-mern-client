import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';

import Post from './Post/Post';

import useStyle from './Posts.styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts); // these 'posts' come from 'combineReducers' from Reducers/index.js
    const classes = useStyle();

    if (!posts.length && !isLoading) 
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant='h6' align='center'>
                    No Posts
                </Typography>
            </Paper>
        );

    return (
        isLoading ? <CircularProgress style={{ color: 'white' }} /> : (
          <Grid className={classes.container} container alignItems='stretch' spacing={3}>
            {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))
            }
          </Grid>  
        )
    );
};

export default Posts;