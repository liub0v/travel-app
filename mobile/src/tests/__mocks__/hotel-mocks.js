import {USER_MOCKS} from './user-mocks';

const review1 = {
  _id: 12,
  date: new Date(),
  clientID: {
    profileInfo: USER_MOCKS.PROFILE_INFO,
  },
  userID: USER_MOCKS.USER_INFO,
  rating: {
    generalRating: 9,
    starsNumber: 4,
  },
  comment: 'comment1',
};
const review2 = {
  _id: 13,
  date: new Date(),
  clientID: {
    profileInfo: USER_MOCKS.PROFILE_INFO,
  },
  userID: USER_MOCKS.USER_INFO,
  rating: {
    generalRating: 8,
    starsNumber: 3,
  },
  comment: 'comment2',
};
const review3 = {
  _id: 14,
  date: new Date(),
  clientID: {
    profileInfo: USER_MOCKS.PROFILE_INFO,
  },
  userID: USER_MOCKS.USER_INFO,
  rating: {
    generalRating: 10,
    starsNumber: 5,
  },
  comment: 'comment3',
};
const hotelData = {
  reviews: [review1, review2, review3],
  name: 'Hotel Name',
  imageURL:
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106286/hotels/hiujfmsuy8mtbtnxdobt.jpg',
  price: 10.0,
  gallery: [
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106399/hotelsGallery/izluzyzhpd4hbtiv942k.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106401/hotelsGallery/pw6svrnnsyav4fehlboh.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106403/hotelsGallery/djvfhhddrzwte2uuhopy.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106405/hotelsGallery/acoq1ypciuahsazvroy9.jpg',
  ],
  starsNumber: 5,
  summary: 'Hoetl summary',
  address: 'Hotel address',
  hotelOptions: 'option1,option2,option3,option4,option5',
  rating: {
    _id: 222,
    generalRating: 10,
    starsNumber: 5,
  },
};

const hotel1 = {
  _id: '343',
  reviews: [review1, review2, review3],
  name: 'Hotel1 Name',
  imageURL:
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106286/hotels/hiujfmsuy8mtbtnxdobt.jpg',
  price: 10.0,
  gallery: [
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106399/hotelsGallery/izluzyzhpd4hbtiv942k.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106401/hotelsGallery/pw6svrnnsyav4fehlboh.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106403/hotelsGallery/djvfhhddrzwte2uuhopy.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106405/hotelsGallery/acoq1ypciuahsazvroy9.jpg',
  ],
  starsNumber: 5,
  summary: 'Hoetel1 summary',
  address: 'Hotel1 address',
  hotelOptions: 'option1,option2,option3,option4,option5',
  rating: {
    _id: 222,
    generalRating: 10,
    starsNumber: 5,
  },
};
const hotel2 = {
  _id: '345',
  reviews: [review1, review2, review3],
  name: 'Hotel2 Name',
  imageURL:
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106286/hotels/hiujfmsuy8mtbtnxdobt.jpg',
  price: 10.0,
  gallery: [
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106399/hotelsGallery/izluzyzhpd4hbtiv942k.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106401/hotelsGallery/pw6svrnnsyav4fehlboh.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106403/hotelsGallery/djvfhhddrzwte2uuhopy.jpg',
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106405/hotelsGallery/acoq1ypciuahsazvroy9.jpg',
  ],
  starsNumber: 5,
  summary: 'Hoetel2 summary',
  address: 'Hotel1 address',
  hotelOptions: 'option1,option2,option3,option4,option5',
  rating: {
    _id: 222,
    generalRating: 10,
    starsNumber: 5,
  },
};
export const newHotelMock = {
  _id: '455',
  name: 'Hotel3 Name',
  imageURL:
    'https://res.cloudinary.com/dbu190ejg/image/upload/v1640106286/hotels/hiujfmsuy8mtbtnxdobt.jpg',
  price: 15.0,
  starsNumber: 6,
  summary: 'Hotel3 summary',
  address: 'Hotel3 address',
  hotelOptions: 'option1,option2,option3,option4,option5',
};
export const HOTEL = {
  currentHotel: {
    data: hotelData,
    isLoading: false,
  },
  hotels: [hotel1, hotel2],
  add: {
    isLoading: false,
    error: undefined,
  },
};
