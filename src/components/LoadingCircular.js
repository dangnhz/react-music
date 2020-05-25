import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9,
    display: 'flex',
    background: 'rgba(255,255,255,.8)',
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingCircular() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color='primary' />
    </div>
  );
}
