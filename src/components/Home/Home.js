import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@material-ui/core';
//import ChipInput from 'material-ui-chip-input';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useNavigate, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';

import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';

import Pagination from '../Pagination'; 
import useStyles from './Home.styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
};


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1; // if not given page we must be on the first one as default
    const classes = useStyles();
    const { t } = useTranslation();

    const searchPost = () => {
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        navigate('/');
      }
    };

    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };

    const handleKeyDown = event => {
      switch (event.key) {
        case ",":
        case " ": {
          event.preventDefault();
          event.stopPropagation();
          if (event.target.value.length > 0) {
            setTags([...tags, event.target.value]);
          }
          break;
        }
        default:
      }
    };

  
  return (
    <Grow in>
      <Container maxWidth ='xl'>
        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
              <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField 
                name='search' 
                variant='outlined' 
                label={t('searchMemories')}
                onKeyPress={handleKeyPress} 
                fullWidth 
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
              />

              <Autocomplete
                multiple
                freeSolo
                id="tags-outlined"
                options={[]}
                getOptionLabel={option => option.title || option}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                filterSelectedOptions
                renderInput={params => {
                  params.inputProps.onKeyDown = handleKeyDown;
                  return (
                    <TextField
                      {...params}
                      style={{ margin: '10px 0'}}
                      variant="outlined"
                      label={t('searchTags')}
                      margin="normal"
                      fullWidth
                    />
                  );
                }}
              />

              <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>{t('Search')}</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} elevation={6} />
            {
              (!search && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;