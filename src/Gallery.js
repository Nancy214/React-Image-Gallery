import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import {
  Box,
  Typography,
  TextField,
  ImageList,
  ImageListItem,
} from '@mui/material';

const Gallery = () => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img
          src='favicon.ico'
          alt='logo'
          style={{
            height: '50px',
            width: '50px',
            float: 'left',
          }}
        />
        <Typography sx={{ minWidth: 100 }}>
          <a href='/'>Collections</a>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <a href='/'>Random</a>
        </Typography>
        <TextField
          fullWidth
          label='Search'
          id='search'
        />
      </Box>

      <ImageList
        variant='masonry'
        cols={5}
        gap={8}
      >
        <ImageListItem>
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
          <img
            src='favicon.ico'
            alt='images'
            loading='lazy'
          />
        </ImageListItem>
      </ImageList>

      <BallTriangle
        height={300}
        width={300}
        radius={5}
        color='#4fa94d'
        ariaLabel='ball-triangle-loading'
        wrapperClass={{}}
        wrapperStyle={{
          alignItem: 'center',
          justifyContent: 'center',
          marginTop: '5rem',
        }}
        visible={false}
      />
    </div>
  );
};

export default Gallery;
