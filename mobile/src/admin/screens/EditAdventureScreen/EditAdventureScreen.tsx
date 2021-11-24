import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Asset} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {ButtonWrapper} from '../EditHotelScreen/EditHotelScreen.style';
import colors from '../../../constants/colors';
import {updateAdventure} from '../../../../redux/actions/AdventureActions';
import {updateAdventureLoaderSelector} from '../../../../redux/selectors/AdventureSelectors';
import {AdventureForm} from '../../components/AdventureForm/AdventureForm';

type Props = {};

export const EditAdventureScreen: React.FC<Props> = () => {
  const route = useRoute();
  const adventure = route.params?.adventure;
  const dispatch = useDispatch();
  const [image, setImage] = useState<Asset>();
  const isLoadingUpdate = useSelector(updateAdventureLoaderSelector);

  const editHandler = ({
    name,
    summary,
    price,
    address,
  }: {
    name: string;
    summary: string;
    price: number;
    address: string;
  }) => {
    dispatch(
      updateAdventure({
        adventureID: adventure._id,
        name,
        summary,
        image,
        price: Number(price),
        address,
      }),
    );
  };
  return (
    <>
      <AdventureForm
        adventure={adventure}
        editHandler={editHandler}
        setImage={setImage}
        isLoading={isLoadingUpdate}
      />
      <ButtonWrapper>
        <ButtonItem
          isLoading={false}
          title={'Delete hotel'}
          theme={{backgroundColor: colors.red, textColor: colors.white}}
        />
      </ButtonWrapper>
    </>
  );
};
