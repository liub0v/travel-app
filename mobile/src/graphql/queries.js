import {gql} from '@apollo/client';

export const LOGIN = gql`
  query Query($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      token
      user {
        userID {
          _id
          username
          email
          password
          isOnBoarding
          role
        }
        savedHotels {
          _id
          name
          imageURL
          summary
          price
          address
          hotelOptions
          beds
          gallery
          starsNumber
        }
        visitedHotels {
          _id
          name
          imageURL
          summary
          price
          address
          hotelOptions
          beds
          gallery
          starsNumber
        }
      }
    }
  }
`;
