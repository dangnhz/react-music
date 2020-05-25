import React from 'react';
import { connect } from 'react-redux';
import {
  setSearchQuery,
  setIsSearching,
  searchYouTubeAction,
} from '../../redux/actions/searchActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const SuggestSearchResult = ({
  suggestQueries,
  setSearchQuery,
  searchYouTubeAction,
}) => {
  const handleSearch = (query) => {
    setSearchQuery(query);
    searchYouTubeAction(query);
  };

  const renderResult = suggestQueries.map((query, index) => (
    <ListItem button onClick={() => handleSearch(query)} key={index}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary={query} />
    </ListItem>
  ));

  const classes = useStyles();

  return <List className={classes.root}>{renderResult}</List>;
};

const mapStateToProps = (state) => ({
  suggestQueries: state.search.suggestQueries,
});

export default connect(mapStateToProps, {
  setSearchQuery,
  setIsSearching,
  searchYouTubeAction,
})(SuggestSearchResult);
