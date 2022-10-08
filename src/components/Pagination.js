import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

import useStyles from './Pagination.styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}

        />
    );
};

export default Paginate;