import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const CollectionCard = ({ collection }) => {
  return (
    <Card
      sx={{
        borderRadius: '15px',
      }}
    >
      <CardMedia>
        <div
          style={{
            float: 'left',
            width: '60%',
            height: '50vh',
            overflow: 'hidden',
          }}
        >
          <img
            style={{ objectFit: 'fill' }}
            src={
              collection.preview_photos[0].urls
                .small
            }
            alt='preview photo'
          />
        </div>
        <div
          style={{
            float: 'right',
            width: '40%',
            height: '50vh',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '25vh',
            }}
          >
            <img
              style={{ objectFit: 'fill' }}
              src={
                collection.preview_photos[1].urls
                  .small
              }
              alt='preview photo'
            />
          </div>
          <div
            style={{
              height: '25vh',
            }}
          >
            <img
              style={{ objectFit: 'fill' }}
              src={
                collection.preview_photos[2].urls
                  .small
              }
              alt='preview photo'
            />
          </div>
        </div>
      </CardMedia>

      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold' }}
          >
            {collection.title}
          </Typography>
          <Typography variant='subtitle2'>
            {collection.total_photos} photos
            {collection &&
              collection.user &&
              collection.user.name &&
              ` - Curated by ${collection.user.name}`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
