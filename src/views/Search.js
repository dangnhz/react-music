import React from 'react';
import SearchBar from '../components/SearchComponents/SearchBar';
import SuggestSearchResult from '../components/SearchComponents/SuggestSearchResult';
import SearchYouTubeResult from '../components/SearchComponents/SearchYouTubeResult';
import { connect } from 'react-redux';
import LoadingCircular from '../components/LoadingCircular';

const Search = ({ suggestQueryResult, isSearching }) => {
  return (
    <div style={{ position: 'relative' }}>
      <SearchBar />
      {isSearching && <LoadingCircular />}
      <SuggestSearchResult />
      {suggestQueryResult.length === 0 && <SearchYouTubeResult />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSearching: state.search.isSearching,
  searchYouTubeResult: state.search.searchResults,
  suggestQueryResult: state.search.suggestQueries,
});

export default connect(mapStateToProps, {})(Search);
