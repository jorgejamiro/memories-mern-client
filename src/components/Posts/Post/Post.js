import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './Post.styles';

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post.likes);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result?.sub || user?.result?._id;

  const handleLike = async (e) => {
    e.stopPropagation();

    dispatch(likePost(post._id));

    const userLikedPost = likes.find((like) => like === userId);
    if (userLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
        console.log('LIKED IT!');
        setLikes([ ...likes, userId ]);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    dispatch(deletePost(post._id));
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId)  // user liked post
        ? (
          <><ThumbUpAltIcon fontSize='small' />
            &nbsp;{likes.length > 2 ? `You and ${likes.length -1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <ThumbUpOffAltIcon fontSize='small'/>
            &nbsp;{likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </>
        );
    } else {
        return <><ThumbUpOffAltIcon fontSize='small' />&nbsp;Like</>;
    }
  };
  

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea component='a' onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {
              post.tags.map((tag) => (`#${tag} `))
            }
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions className={classes.cardActions} onClick={openPost}>
        <Button 
          size='small' 
          color='primary' 
          disabled={!user?.result} 
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button 
            size='small' 
            color='secondary' 
            onClick={handleDelete}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>  
    </Card>
  );
};

export default Post;