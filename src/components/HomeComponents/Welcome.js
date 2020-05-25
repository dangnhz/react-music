import React from 'react';
import { Typography, Button } from '@material-ui/core';
import AppIcon from '../../assets/favicon.png';
import { connect } from 'react-redux';
import { setCurrentView } from '../../redux/actions/setCurrentViewActions';

const Welcome = ({ setCurrentView }) => {
  const handleOnClick = () => {
    setCurrentView('search');
  };
  return (
    <div style={style}>
      <img
        src={AppIcon}
        alt='welcome'
        style={{ maxHeight: '100px', marginBottom: '2rem' }}
      ></img>
      <Typography variant='h5'>Welcome To Muzik</Typography>
      <br />
      <Button onClick={handleOnClick} variant='outlined' color='primary'>
        Search For Music
      </Button>
    </div>
  );
};

const style = {
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 300px)',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
};
export default connect(null, { setCurrentView })(Welcome);
