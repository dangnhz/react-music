import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  getSuggestSearchQueryAction,
  clearSuggestSearchQuery,
  clearQuery,
  setIsSearching,
  searchYouTubeAction,
  clearSearchYouTubeResult,
} from '../../redux/actions/searchActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  search: {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelIcon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(0, 2),
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}));

const SearchBar = ({
  getSuggestSearchQueryAction,
  clearSuggestSearchQuery,
  searchQueryFromStore,
  isSearching,
  clearQuery,
  searchYouTubeAction,
  clearSearchYouTubeResult,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);

  const searchInput = useRef(null);

  const onInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onInPutFocus = () => {
    setIsInputFocus(true);
  };

  const onInPutBlur = () => {
    setIsInputFocus(false);
  };
  const onClearSearch = () => {
    setSearchQuery('');
    clearSuggestSearchQuery();
    clearQuery();
    clearSearchYouTubeResult();
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    clearSuggestSearchQuery();
    searchYouTubeAction(searchQuery);
    setIsInputFocus(false);
    searchInput.current.blur();
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0 && isInputFocus && !isSearching)
      getSuggestSearchQueryAction(searchQuery.trim());
    else if (isInputFocus && searchQuery.trim().length === 0) {
      clearSuggestSearchQuery();
      clearQuery();
    }
  }, [
    searchQuery,
    getSuggestSearchQueryAction,
    clearSuggestSearchQuery,
    isSearching,
    isInputFocus,
    clearQuery,
  ]);

  // set value of search input when user click on suggest result
  useEffect(() => {
    setSearchQuery(searchQueryFromStore);
  }, [searchQueryFromStore]);

  const classes = useStyles();

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <form onSubmit={onSearchSubmit}>
            <InputBase
              fullWidth
              onInput={onInputChange}
              onFocus={onInPutFocus}
              onBlur={onInPutBlur}
              value={searchQuery}
              placeholder='Search Youtube…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={searchInput}
            />
          </form>
          <div className={classes.cancelIcon}>
            {searchQuery.length > 0 && (
              <CancelIcon fontSize='small' onClick={onClearSearch} />
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  searchQueryFromStore: state.search.query,
  isSearching: state.search.isSearching,
});
export default connect(mapStateToProps, {
  getSuggestSearchQueryAction,
  clearSuggestSearchQuery,
  setIsSearching,
  clearQuery,
  searchYouTubeAction,
  clearSearchYouTubeResult,
})(SearchBar);
