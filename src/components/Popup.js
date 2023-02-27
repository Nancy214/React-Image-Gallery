import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Chip,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import DownloadIcon from '@mui/icons-material/Download';

const Popup = ({ modalData }) => {
  return (
    <Card sx={{ borderRadius: '15px' }}>
      <CardMedia
        component='img'
        image={modalData.urls.regular}
      />
      <CardContent>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={
              modalData.user.profile_image.medium
            }
          />
          <Container>
            <Typography variant='h6'>
              {modalData.user.name}
            </Typography>
            <Typography variant='subtitle'>
              @{modalData.user.username}
            </Typography>
          </Container>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                fontStyle: 'italic',
                display: 'flex',
                marginRight: '10px',
              }}
            >
              <InstagramIcon
                fontSize='small'
                sx={{
                  marginRight: '1px',
                }}
              />
              {modalData.user.instagram_username}
            </Typography>

            <Typography
              variant='subtitle2'
              sx={{
                fontStyle: 'italic',
                display: 'flex',
              }}
            >
              <TwitterIcon
                fontSize='small'
                sx={{
                  marginRight: '1px',
                }}
              />
              {modalData.user.twitter_username}
            </Typography>
          </Container>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              marginRight: -30,
            }}
          >
            <FavoriteIcon
              style={{
                color: 'red',
                marginRight: '5px',
              }}
            />
            <Typography>
              {modalData.likes}
            </Typography>
            <DownloadIcon
              style={{
                marginRight: '3px',
                marginLeft: '15px',
              }}
            />
            <Typography>
              {modalData.downloads}
            </Typography>
          </Container>
          <Container
            sx={{
              top: -70,
              position: 'relative',
              right: -100,
              marginBottom: '30px',
            }}
          >
            <Button
              variant='contained'
              sx={{
                bgcolor: '#eb6d09',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#eb6d09',
                },
              }}
            >
              <a
                href={modalData.links.download}
                target='_blank'
                rel='noreferrer'
              >
                {' '}
                Download
              </a>
            </Button>
          </Container>
        </Container>
        <Container sx={{ marginTop: '35px' }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: 'bold',
            }}
          >
            Related Tags
          </Typography>
          {modalData.tags.map((tag) => (
            <Chip
              label={tag.title}
              sx={{
                marginRight: '5px',
                marginTop: '10px',
              }}
            />
          ))}
        </Container>
      </CardContent>
    </Card>
  );
};

export default Popup;
