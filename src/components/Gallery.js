import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  TextField,
  ImageList,
  ImageListItem,
  Button,
  Modal,
  Pagination,
} from '@mui/material';
import config from './Config';
import axios from 'axios';
import Popup from './Popup';
import ImageCard from './ImageCard';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isPhotos, setIsPhotos] = useState(false);
  const [randomPhoto, setRandomPhoto] = useState(
    {}
  );
  const [isRandom, setIsRandom] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async (value) => {
    setIsRandom(false);
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${
        config.unsplash_client_id
      }&order_by=latest&page=${value ? value : 1}`
    );
    setPhotos(response.data);
    setIsPhotos(true);
  };

  const getRandomPhoto = async () => {
    setIsPhotos(false);
    setIsRandom(true);
    const response = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${config.unsplash_client_id}`
    );
    setRandomPhoto(response.data);
  };

  const handleImageClick = async (id) => {
    setOpen(true);
    const response = await axios.get(
      `https://api.unsplash.com/photos/${id}?client_id=${config.unsplash_client_id}`
    );
    setModalData(response.data);
  };

  const handleSearch = async (text) => {
    setIsRandom(false);
    if (text === '') {
      getPhotos();
    } else {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${config.unsplash_client_id}&query=${text}`
      );
      setPhotos(response.data.results);
    }
  };

  const handlePagination = (event, value) => {
    getPhotos(value);
  };

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
            cursor: 'pointer',
          }}
          onClick={async () => getPhotos()}
        />
        <Button
          variant='text'
          style={{
            color: 'black',
            textTransform: 'capitalize',
            fontSize: 'medium',
          }}
          sx={{ minWidth: 100 }}
          onClick={getRandomPhoto}
        >
          Random
        </Button>{' '}
        <TextField
          fullWidth
          label='Search'
          id='search'
          onChange={(e) =>
            handleSearch(e.target.value)
          }
        />
      </Box>

      {isPhotos && (
        <>
          <h1>Photos</h1>
          <ImageList
            variant='masonry'
            sx={{
              columnCount: {
                xs: '1 !important',
                sm: '2 !important',
                md: '3 !important',
                lg: '4 !important',
                xl: '5 !important',
              },
            }}
            gap={30}
            visible='false'
          >
            {photos.map((photo) => (
              <ImageListItem
                key={photo.id}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={async () =>
                  handleImageClick(photo.id)
                }
              >
                <ImageCard photo={photo} />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}

      {isRandom &&
        Object.keys(randomPhoto).length > 0 && (
          <>
            <h1>Random Photo</h1>
            <ImageList
              variant='masonry'
              sx={{
                columnCount: {
                  xs: '1 !important',
                  sm: '2 !important',
                  md: '3 !important',
                  lg: '4 !important',
                  xl: '5 !important',
                },
              }}
              gap={30}
              visible='false'
            >
              <ImageListItem
                key={randomPhoto.id}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={async () =>
                  handleImageClick(randomPhoto.id)
                }
              >
                <ImageCard photo={randomPhoto} />
              </ImageListItem>
            </ImageList>
          </>
        )}

      {Object.keys(modalData).length > 0 ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              overflow: 'scroll',
              height: '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Popup modalData={modalData} />
          </Box>
        </Modal>
      ) : null}

      <Pagination
        count={10}
        disabled={isRandom ? true : false}
        onChange={handlePagination}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      />
    </div>
  );
};

export default Gallery;
