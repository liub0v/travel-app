import React, {useState} from 'react';
import {
  AddressInput,
  ButtonWrapper,
  CheckBoxContainer,
  CheckBoxTitle,
  CheckBoxWrapper,
  CheckBoxWrapperChild,
  Container,
  InputWrapper,
  NameInput,
  PriceInput,
  StarsWrapper,
  SummaryInput,
  Title,
} from '../EditHotelScreen/EditHotelScreen.style';
import {Formik} from 'formik';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import CheckBox from '@react-native-community/checkbox';
import {
  HotelsOptions,
  HotelsOptionsProps,
} from '../../../services/HotelOptions';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import colors from '../../../constants/colors';
import {
  AddButton,
  DeleteWrapper,
  GalleryContainer,
  ImageItem,
  ImageWrapper,
} from '../EditGalleryScreen/EditGalleryScreen.style';
import FastImage from 'react-native-fast-image';
import {Delete} from '../../../components/Delete/Delete';
import {Image, Text, TouchableWithoutFeedback} from 'react-native';
import addIcon from '../../../../assets/images/addIcon.png';
import {useDispatch, useSelector} from 'react-redux';
import {addHotelIsLoadingSelector} from '../../../../redux/selectors/HotelSelectors';
import {addHotel} from '../../../../redux/actions/HotelActions';
import {hotelValidationSchema} from '../../../services/validation';
import {StarsRating} from '../../../components/StarsRating/StarsRating';
export type Props = {};

export const AddHotelScreen: React.FC<Props> = () => {
  const hotelOptions = new HotelsOptions();
  const [image, setImage] = useState<Asset>();
  const [starsNumber, setStarsNumber] = useState(0);
  const [gallery, setGallery] = useState<Array<Asset>>([]);
  const dispatch = useDispatch();
  const addLoading = useSelector(addHotelIsLoadingSelector);

  const createHandler = ({
    name,
    summary,
    price,
    address,
    starsNumber,
    hotelOptions,
  }: {
    name: string;
    summary: string;
    price: number;
    starsNumber: number;
    address: string;
    hotelOptions: HotelsOptions<HotelsOptionsProps>;
  }) => {
    dispatch(
      addHotel({
        name,
        summary,
        image,
        price: Number(price),
        address,
        starsNumber,
        hotelOptions: hotelOptions.toString(),
        gallery,
      }),
    );
  };
  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      mediaType: 'photo',
    });
    setImage(res?.assets?.[0]);
  };
  const selectFiles = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      selectionLimit: 6,
      mediaType: 'photo',
    });
    setGallery([...gallery, ...res?.assets]);
  };
  const deleteImageHandler = (img: Asset) => {
    setGallery(gallery.filter(item => item.uri !== img.uri));
  };
  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <Formik
        validationSchema={hotelValidationSchema}
        initialValues={{
          name: '',
          summary: '',
          price: '',
          address: '',
          beds: '',
          hotelOptions: hotelOptions,
          starsNumber: 0,
          image: '',
        }}
        onSubmit={createHandler}>
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
              <Title>Summary</Title>
              <SummaryInput
                placeholder="Enter some words about hotel..."
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
              <Title>Stars number</Title>
              <StarsWrapper>
                <StarsRating
                  initStarsNumber={0}
                  setStarRating={number => {
                    setStarsNumber(number);
                    setFieldValue('starsNumber', number);
                  }}
                />
              </StarsWrapper>
            </InputWrapper>
            {errors.starsNumber && touched.starsNumber && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.starsNumber}
              </Text>
            )}
            <InputWrapper>
              <Title>Hotel options</Title>
              <CheckBoxContainer>
                <CheckBoxWrapperChild>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.digitalTV}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.digitalTV', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`DigitalTV`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.coffee}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.coffee', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Coffee`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.wifi}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.wifi', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Wifi`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                </CheckBoxWrapperChild>
                <CheckBoxWrapperChild>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.pets}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.pets', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Pets`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.pool}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.pool', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Pool`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                </CheckBoxWrapperChild>
              </CheckBoxContainer>
            </InputWrapper>
            <InputWrapper>
              <Title>Gallery</Title>
              <GalleryContainer>
                {gallery?.map((img, index) => (
                  <ImageWrapper key={index}>
                    <ImageItem>
                      <FastImage
                        style={{width: 100, height: 100}}
                        source={{uri: img.uri}}
                      />
                    </ImageItem>
                    <DeleteWrapper>
                      <Delete handler={() => deleteImageHandler(img)} />
                    </DeleteWrapper>
                  </ImageWrapper>
                ))}
                <ImageWrapper>
                  <ImageItem>
                    <TouchableWithoutFeedback onPress={selectFiles}>
                      <AddButton>
                        <Image
                          style={{width: 50, height: 50}}
                          source={addIcon}
                        />
                      </AddButton>
                    </TouchableWithoutFeedback>
                  </ImageItem>
                </ImageWrapper>
              </GalleryContainer>
            </InputWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={addLoading}
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
