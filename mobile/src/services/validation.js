import * as yup from 'yup';
import colors from '../constants/colors';

export const singUpValidationSchema = yup.object().shape({
  username: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});
export const logInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
export function getValidationStyles(errors, touched) {
  if (touched && !errors) {
    return {
      borderWidth: 2,
      borderColor: colors.valid,
    };
  }
  if (touched && errors) {
    return {
      borderWidth: 2,
      borderColor: colors.red,
    };
  }
}
export const profileValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  username: yup.string().required('Username is required'),
});

export const adventureValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  price: yup
    .string()
    .required('Price is required')
    .matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, 'Enter the price correctly'),
  guideID: yup.string().required('Guide is required'),
});
export const hotelValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  price: yup
    .string()
    .required('Price is required')
    .matches(/^[0-9]*([,.][0-9]{1,2})?$/, 'Enter the price correctly'),
  starsNumber: yup
    .number()
    .min(1, 'Stars number is required')
    .max(5, 'Max number is 5')
    .required('Stars number is required'),
});
export const commentValidationSchema = yup.object().shape({
  commentText: yup.string().trim().required('Your review is empty'),
});
