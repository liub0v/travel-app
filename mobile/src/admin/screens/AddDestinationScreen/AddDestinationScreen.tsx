import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {
  Container,
  NameInput,
  Title,
  InputWrapper,
} from '../EditHotelScreen/EditHotelScreen.style';

import {addDestination} from '../../../../redux/actions/DestinationActions';
import {addDestinationLoader} from '../../../../redux/selectors/DestinationSelector';
import {ButtonWrapper} from '../HotelsListScreen/HotelsScreen.style';
import colors from '../../../constants/colors';

export type Props = {};

export const AddDestinationScreen: React.FC<Props> = () => {
  const addLoading = useSelector(addDestinationLoader);
  const dispatch = useDispatch();
  const [image, setImage] = useState<Asset>();
  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      mediaType: 'photo',
    });
    setImage(res?.assets?.[0]);
  };

  const addHandler = ({countryName}: {countryName: string}) => {
    dispatch(
      addDestination({
        countryName,
        image,
      }),
    );
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <Formik
        initialValues={{
          countryName: '',
          image: '',
        }}
        onSubmit={addHandler}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <ButtonItem title={'Select image'} handler={selectFile} />
            <InputWrapper>
              <Title>Name</Title>
              <NameInput
                placeholder="Enter name"
                placeholderTextColor={colors.grey}
                onChangeText={handleChange('countryName')}
                onBlur={handleBlur('countryName')}
                value={values.countryName}
              />
            </InputWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={addLoading}
                title={'Add destination'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default AddDestinationScreen;
