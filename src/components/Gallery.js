import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  ImageList,
  ImageListItem,
  Button,
  Modal,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import config from './Config';
import axios from 'axios';
import Popup from './Popup';
import ImageCard from './ImageCard';
import CollectionCard from './CollectionCard';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [collections, setCollections] = useState(
    []
  );
  const [topics, setTopics] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(
    {}
  );
  const [isPhotos, setIsPhotos] = useState(false);
  const [isCollections, setIsCollections] =
    useState(false);
  const [isTopic, setIsTopic] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] =
    useState('');
  const [modalData, setModalData] = useState({});
  const suggestions = [
    { key: 0, label: 'Wallpapers' },
    { key: 1, label: 'Travel' },
    { key: 2, label: 'Nature' },
    { key: 3, label: 'Fashion' },
    { key: 4, label: 'Food' },
    { key: 5, label: 'Art' },
    { key: 6, label: 'Animals' },
    { key: 7, label: 'Architecture' },
    { key: 8, label: 'Health' },
    { key: 9, label: 'Film' },
    { key: 10, label: 'Athletics' },
    { key: 11, label: 'People' },
    { key: 12, label: 'Work' },
    { key: 13, label: 'Patterns' },
    { key: 14, label: 'Photography' },
  ];

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setIsRandom(false);
    setIsCollections(false);
    setIsTopic(false);
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${config.unsplash_client_id}&per_page=100`
    );
    setPhotos(response.data);
    setIsPhotos(true);
  };

  const getCollections = async () => {
    setIsRandom(false);
    setIsPhotos(false);
    setIsTopic(false);
    const response = await axios.get(
      `https://api.unsplash.com/collections/?client_id=${config.unsplash_client_id}&per_page=100`
    );
    setCollections(response.data);
    setIsCollections(true);
  };

  const getRandomPhoto = async () => {
    setIsPhotos(false);
    setIsCollections(false);
    setIsTopic(false);
    const response = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${config.unsplash_client_id}`
    );
    setRandomPhoto(response.data);
    setIsRandom(true);
  };

  const getTopics = async () => {
    setIsRandom(false);
    setIsPhotos(false);
    setIsCollections(false);
    const response = await axios.get(
      `https://api.unsplash.com/topics/?client_id=${config.unsplash_client_id}&per_page=100`
    );
    setTopics(response.data);
    setIsTopic(true);
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
    setIsCollections(false);
    setSearchText(text);
    if (text === '') {
      getPhotos(1);
    } else {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${config.unsplash_client_id}&query=${text}&per_page=100`
      );
      setPhotos(response.data.results);
    }
  };

  const handleSuggestions = async (
    suggestion
  ) => {
    handleSearch(suggestion);
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
          onClick={getCollections}
        >
          Collections
        </Button>{' '}
        <Button
          variant='text'
          style={{
            color: 'black',
            textTransform: 'capitalize',
            fontSize: 'medium',
          }}
          sx={{ minWidth: 100 }}
          onClick={getTopics}
        >
          Topics
        </Button>{' '}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
        />
      </Box>

      {isPhotos && (
        <>
          <Box
            sx={{
              justifyContent: 'space-evenly',
              width: '100%',
            }}
          >
            {suggestions.map((suggestion) => (
              <Chip
                clickable={true}
                label={suggestion.label}
                sx={{
                  marginRight: '5px',
                  marginTop: '30px',
                  '&.MuiChip-clickable:focus': {
                    backgroundColor: '#eb6d09',
                  },
                }}
                onClick={() =>
                  handleSuggestions(
                    suggestion.label
                  )
                }
              />
            ))}
          </Box>
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
            gap={20}
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

      {isCollections && (
        <>
          <h1>Collections</h1>
          <ImageList
            variant='masonry'
            sx={{
              columnCount: {
                xs: '1 !important',
                sm: '2 !important',
                md: '3 !important',
              },
            }}
            gap={20}
            visible='false'
          >
            {collections.map((collection) => (
              <ImageListItem key={collection.id}>
                <CollectionCard
                  collection={collection}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}

      {isTopic && (
        <>
          <h1>Topics</h1>
          <ImageList
            variant='masonry'
            sx={{
              columnCount: {
                xs: '1 !important',
                sm: '2 !important',
                md: '3 !important',
              },
            }}
            gap={20}
            visible='false'
          >
            {topics.map((topic) => (
              <ImageListItem key={topic.id}>
                <CollectionCard
                  collection={topic}
                />
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
              overflowY: 'scroll',
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
    </div>
  );
};

export default Gallery;
