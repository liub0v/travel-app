import React, {useState} from 'react';
import {ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  updateHotelGallery,
  deleteGalleryImage,
} from '../../../../redux/actions/HotelActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddButton,
  DeleteWrapper,
  GalleryContainer,
  ImageItem,
  ImageWrapper,
} from './EditGalleryScreen.style';

import addIcon from '../../../../assets/images/addIcon.png';
import {Delete} from '../../../components/Delete/Delete';
import {getHotelGallerySelector} from '../../../../redux/selectors/HotelSelectors';

export type Props = {
  route: any;
};
export const EditGalleryScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotel;
  const [images, setImages] = useState<Array<Asset>>([]);
  const dispatch = useDispatch();
  const galleySelector = getHotelGallerySelector(hotel._id);
  const gallery = useSelector(galleySelector);
  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      selectionLimit: 6,
      mediaType: 'photo',
    });
    setImages([...images, ...res?.assets]);
  };
  const saveHandler = () => {
    dispatch(updateHotelGallery({hotelID: hotel._id, images}));
  };
  const deleteImageHandler = (imageURL: string) => {
    dispatch(deleteGalleryImage({hotelID: hotel._id, imageURL}));
  };
  const deleteImageFromStateHandler = (img: Asset) => {
    setImages(images.filter(item => item.uri !== img.uri));
  };
  return (
    <ScrollView>
      <GalleryContainer>
        {gallery.map((imgURL, index) => (
          <ImageWrapper key={index}>
            <ImageItem>
              <FastImage
                style={{width: 100, height: 100}}
                source={{uri: imgURL}}
              />
            </ImageItem>
            <DeleteWrapper>
              <Delete handler={() => deleteImageHandler(imgURL)} />
            </DeleteWrapper>
          </ImageWrapper>
        ))}
        {images?.map((img, index) => (
          <ImageWrapper key={index}>
            <ImageItem>
              <FastImage
                style={{width: 100, height: 100}}
                source={{uri: img.uri}}
              />
            </ImageItem>
            <DeleteWrapper>
              <Delete handler={() => deleteImageFromStateHandler(img)} />
            </DeleteWrapper>
          </ImageWrapper>
        ))}
        <ImageWrapper>
          <ImageItem>
            <TouchableWithoutFeedback onPress={selectFile}>
              <AddButton>
                <Image style={{width: 50, height: 50}} source={addIcon} />
              </AddButton>
            </TouchableWithoutFeedback>
          </ImageItem>
        </ImageWrapper>
      </GalleryContainer>
      <ButtonItem
        isLoading={false}
        title={'Save changes'}
        handler={saveHandler}
      />
    </ScrollView>
  );
};
