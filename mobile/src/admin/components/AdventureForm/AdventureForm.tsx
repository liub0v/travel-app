import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Modal, Text, View} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  AddressInput,
  NameInput,
  PriceInput,
  SummaryInput,
  Title,
  ButtonWrapper,
  InputWrapper,
} from '../../screens/EditHotelScreen/EditHotelScreen.style';
import colors from '../../../constants/colors';
import {GuidesList} from '../GuidesList/GuidesList';
import {Guide} from '../../../screens/ExploreScreen/components/Guide';
import {useSelector} from 'react-redux';
import {errorGuidesSelector} from '../../../../redux/selectors/GuideSelectors';
import {adventureValidationSchema} from '../../../services/validation';

type Props = {
  adventure: any;
  handler: any;
  isLoading: boolean;
};

export const AdventureForm: React.FC<Props> = ({
  adventure = {},
  handler,
  isLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const initGuide = adventure?.guideID;
  const [guide, setGuide] = useState(initGuide);
  const [image, setImage] = useState<Asset>();

  const error = useSelector(errorGuidesSelector);

  useEffect(() => setModalVisible(false), [error]);

  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      mediaType: 'photo',
    });
    setImage(res?.assets?.[0]);
  };

  const goGuideList = () => {
    setModalVisible(true);
  };
  return (
    <View style={{width: '100%', alignItems: 'center', marginTop: 24}}>
      <Formik
        validationSchema={adventureValidationSchema}
        initialValues={{
          name: adventure?.name ?? '',
          summary: adventure?.summary ?? '',
          price: adventure?.price?.toString() ?? '',
          address: adventure?.address ?? '',
          guideID: adventure?.guideID._id ?? '',
        }}
        onSubmit={values => handler({...values, image})}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <ButtonItem
              isLoading={false}
              title={'Select image'}
              handler={selectFile}
            />
            <InputWrapper>
              <Title>Name</Title>
              <NameInput
                placeholder="Enter name"
                placeholderTextColor={colors.grey}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </InputWrapper>
            {errors.name && touched.name && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.name}
              </Text>
            )}
            <InputWrapper>
              <Title>Guide</Title>
              {initGuide && !guide && <Guide item={initGuide} />}
              {guide && <Guide item={guide} />}
              <ButtonWrapper style={{marginBottom: 24, marginTop: 24}}>
                <ButtonItem
                  title={'Choose guide'}
                  handler={goGuideList}
                  theme={{
                    backgroundColor: colors.white,
                    textColor: colors.screenBackground,
                  }}
                  size={{
                    height: 50,
                    width: 90,
                  }}
                />
              </ButtonWrapper>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <GuidesList
                  closeHandler={() => {
                    setModalVisible(!modalVisible);
                  }}
                  pressHandler={guide => {
                    setFieldValue('guideID', guide._id);
                    setModalVisible(false);
                    setGuide(guide);
                  }}
                />
              </Modal>
            </InputWrapper>
            {errors.guideID && touched.guideID && (
              <Text
                style={{
                  color: colors.red,
                  padding: 6,
                }}>
                {' '}
                {errors.guideID}
              </Text>
            )}
            <InputWrapper>
              <Title>Price</Title>
              <PriceInput
                placeholder="0.0"
                placeholderTextColor={colors.screenBackground}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType="numeric"
              />
            </InputWrapper>
            {errors.price && touched.price && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.price}
              </Text>
            )}
            <InputWrapper>
              <Title>Address</Title>
              <AddressInput
                placeholder="Enter address"
                placeholderTextColor={colors.grey}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                keyboardType="numeric"
              />
            </InputWrapper>
            {errors.address && touched.address && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.address}
              </Text>
            )}
            <InputWrapper>
              <Title>Summary</Title>
              <SummaryInput
                placeholder="Enter some words about adventure..."
                placeholderTextColor={colors.grey}
                multiline={true}
                onChangeText={handleChange('summary')}
                onBlur={handleBlur('summary')}
                value={values.summary}
              />
            </InputWrapper>

            <ButtonWrapper>
              <ButtonItem
                isLoading={isLoading}
                title={'Save'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </View>
  );
};
