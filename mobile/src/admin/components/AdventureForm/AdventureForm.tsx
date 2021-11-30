import React, {useState} from 'react';
import {Formik} from 'formik';
import {Modal} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  AddressInput,
  Container,
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
  const [guide, setGuide] = useState();
  const initGuide = adventure?.guideID;
  const [image, setImage] = useState<Asset>();

  const setGuideHandler = (guide: string) => {
    setGuide(guide);
    setModalVisible(false);
  };
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
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <Formik
        initialValues={{
          name: adventure?.name ?? '',
          summary: adventure?.summary ?? '',
          price: adventure?.price?.toString() ?? '',
          address: adventure?.address ?? '',
        }}
        onSubmit={values => handler({...values, guideID: guide?._id, image})}>
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
                placeholder="Enter name"
                placeholderTextColor={colors.grey}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </InputWrapper>
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
                  pressHandler={setGuideHandler}
                />
              </Modal>
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
    </Container>
  );
};
