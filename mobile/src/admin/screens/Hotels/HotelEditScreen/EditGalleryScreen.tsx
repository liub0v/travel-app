import React, {useState} from 'react';
import {ScrollView, Text, Image} from 'react-native';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateHotelGallery} from '../../../../../redux/actions/HotelActions';
import {useDispatch} from 'react-redux';
export type Props = {
  route: any;
};
export const EditGalleryScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotel;
  const [images, setImages] = useState(undefined);
  const dispatch = useDispatch();
  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      selectionLimit: 6,
    });
    console.log(res.assets);
    setImages(res?.assets);
  };
  const saveHandler = () => {
    dispatch(updateHotelGallery({hotelID: hotel._id, images}));
  };
  return (
    <ScrollView>
      {images?.map(img => (
        <Image style={{width: 100, height: 100}} source={{uri: img.uri}} />
      ))}
      <Text>GALLERY</Text>
      <ButtonItem
        isLoading={false}
        title={'Select image'}
        handler={selectFile}
      />
      <ButtonItem isLoading={false} title={'Save'} handler={saveHandler} />
    </ScrollView>
  );
};
