const PROFILE_INFO = {
  firstName: 'FirstName',
  lastName: 'LastName',
  imageURL:
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  address: 'City, Country',
  phone: '80291234567',
  birthDate: 'November 23, 2001',
};
const USER_INFO = {
  username: 'username',
  email: 'user@mail.com',
  role: 'client',
};
const ADMIN = {
  userID: {
    username: 'admin',
    email: 'admin@mail.com',
    role: 'admin',
  },
};
export const AUTH = {
  user: {
    userID: USER_INFO,
  },
  ...PROFILE_INFO,
};

export const USER_MOCKS = {
  PROFILE_INFO,
  USER_INFO,
  ADMIN,
};
