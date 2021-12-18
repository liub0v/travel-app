import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {
  Container,
  NameInput,
  Title,
  ButtonWrapper,
  InputWrapper,
} from '../EditHotelScreen/EditHotelScreen.style';
import colors from '../../../constants/colors';
import {useRoute} from '@react-navigation/native';
import {
  deleteDestination,
  updateDestination,
} from '../../../../redux/actions/DestinationActions';
import {
  deleteDestinationLoader,
  updateDestinationLoader,
} from '../../../../redux/selectors/DestinationSelector';

export type Props = {};

export const EditDestinationScreen: React.FC<Props> = () => {
  const route = useRoute();
  const destination = route.params?.destination;

  const deleteLoading = useSelector(deleteDestinationLoader);
  const updateLoading = useSelector(updateDestinationLoader);
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

  const editHandler = ({countryName}: {countryName: string}) => {
    dispatch(
      updateDestination({
        destinationID: destination._id,
        countryName,
        image,
      }),
    );
  };
  const deleteDestinationHandler = () => {
    dispatch(deleteDestination(destination._id));
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <Formik
        initialValues={{
          countryName: destination.countryName ?? 'no name',
          image: '',
        }}
        onSubmit={editHandler}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <ButtonItem
              isLoading={false}
              title={'Select image'}
              handler={selectFile}
            />
            <InputWrapper>
              <Title>Name</Title>
              <NameInput
                onChangeText={handleChange('countryName')}
                onBlur={handleBlur('countryName')}
                value={values.countryName}
              />
            </InputWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={updateLoading}
                title={'Save changes'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={deleteLoading}
                title={'Delete destination'}
                handler={deleteDestinationHandler}
                theme={{backgroundColor: colors.red, textColor: colors.white}}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default EditDestinationScreen;
