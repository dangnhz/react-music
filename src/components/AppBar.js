import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function TopAppBar({ title }) {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Grid container justify='center' alignItems='center'>
            <Grid item>
              <Typography variant='h6'>{title}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
