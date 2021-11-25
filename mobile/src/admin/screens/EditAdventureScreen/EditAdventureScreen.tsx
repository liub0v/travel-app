import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Asset} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {ButtonWrapper} from '../EditHotelScreen/EditHotelScreen.style';
import colors from '../../../constants/colors';
import {
  deleteAdventure,
  updateAdventure,
} from '../../../../redux/actions/AdventureActions';
import {
  deleteAdventureLoaderSelector,
  updateAdventureLoaderSelector,
} from '../../../../redux/selectors/AdventureSelectors';
import {AdventureForm} from '../../components/AdventureForm/AdventureForm';

type Props = {};

export const EditAdventureScreen: React.FC<Props> = () => {
  const route = useRoute();
  const adventure = route.params?.adventure;
  const dispatch = useDispatch();
  const isLoadingUpdate = useSelector(updateAdventureLoaderSelector);
  const isLoadingDelete = useSelector(deleteAdventureLoaderSelector);

  const deleteHandler = () => {
    dispatch(deleteAdventure(adventure._id));
  };
  const editHandler = ({
    name,
    summary,
    price,
    address,
    guideID,
    image,
  }: {
    name: string;
    summary: string;
    price: number;
    address: string;
    guideID: string;
    image: Asset;
  }) => {
    console.log(name, summary, price, address, guideID, image);
    dispatch(
      updateAdventure({
        adventureID: adventure._id,
        name,
        summary,
        image,
        price: Number(price),
        address,
        guideID,
      }),
    );
  };
  return (
    <>
      <AdventureForm
        adventure={adventure}
        handler={editHandler}
        isLoading={isLoadingUpdate}
      />
      <ButtonWrapper>
        <ButtonItem
          handler={deleteHandler}
          isLoading={isLoadingDelete}
          title={'Delete adventure'}
          theme={{backgroundColor: colors.red, textColor: colors.white}}
        />
      </ButtonWrapper>
    </>
  );
};
