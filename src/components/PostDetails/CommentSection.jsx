import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { commentPost } from '../../actions/posts';

import useStyles from './PostDetails.styles';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();  
    const user = JSON.parse(localStorage.getItem('profile'));
    const { t } = useTranslation();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>{t('Comments')}</Typography>
                    {
                        comments.map((comment, i) => (
                            <Typography key={i} gutterBottom variant='subtitle1'>
                                <strong>{comment.split(': ')[0]}</strong>
                                {comment.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentsRef} />
                </div>
                {
                    user?.result?.name && (
                        <div style={{ width: '70%' }}>
                            <Typography gutterBottom variant='h6'>{t('Write a Comment')}</Typography>
                            <TextField 
                                fullWidth
                                multiline
                                minRows={4}
                                variant='outlined'
                                label={t('Comment')}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button 
                                style={{ marginTop: '10px' }} 
                                fullWidth 
                                disabled={!comment}
                                variant='contained'
                                color='primary'
                                onClick={handleClick}
                            >
                                {t('Post')}
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CommentSection;