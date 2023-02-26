import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ImageCard = ({ photo }) => {
  return (
    <Card>
      <CardMedia
        component='img'
        image={photo.urls.regular}
      />
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={photo.user.profile_image.medium}
          sx={{
            marginRight: '1rem',
          }}
        />
        <Typography variant='h6'>
          {photo.user.name}
        </Typography>
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'center',
          }}
        >
          <FavoriteIcon
            style={{
              color: 'red',
              marginRight: '5px',
            }}
          />
          {'  '}
          {photo.likes}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
