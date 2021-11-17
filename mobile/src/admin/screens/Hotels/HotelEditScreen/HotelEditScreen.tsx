import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateHotel} from '../../../../../redux/actions/HotelActions';
import {InputItem} from '../../../../screens/AuthScreens/LoginScreen/LoginScreen.style';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';

export type Props = {
  route: any;
};

export const HotelEditScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotelInfo;
  const dispatch = useDispatch();
  const editHandler = ({name, summary}: {name: string; summary: string}) => {
    dispatch(updateHotel({hotelID: hotel._id, name, summary}));
  };
  return (
    <View style={{marginTop: 50}}>
      <Formik
        initialValues={{
          name: '',
          summary: '',
          price: '',
          address: '',
          beds: '',
          hotelOptions: '',
          starsNumber: '',
          image: '',
        }}
        onSubmit={editHandler}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <Text>NAME</Text>
            <InputItem
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Text>SUMMARY</Text>
            <InputItem
              onChangeText={handleChange('summary')}
              onBlur={handleBlur('summary')}
              value={values.summary}
            />
            <Text>PRICE</Text>
            <InputItem
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
            />
            <ButtonItem
              isLoading={false}
              title={'Save changes'}
              handler={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default HotelEditScreen;
