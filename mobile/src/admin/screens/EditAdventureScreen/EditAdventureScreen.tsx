import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Asset} from 'react-native-image-picker';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import colors from '../../../constants/colors';
import {
  deleteAdventure,
  updateAdventure,
} from '../../../../redux/actions/AdventureActions';
import {
  currentAdventureSelector,
  deleteAdventureLoaderSelector,
  updateAdventureLoaderSelector,
} from '../../../../redux/selectors/AdventureSelectors';
import {AdventureForm} from '../../components/AdventureForm/AdventureForm';
import {ScrollView} from 'react-native';

type Props = {};

export const EditAdventureScreen: React.FC<Props> = () => {
  const adventure = useSelector(currentAdventureSelector);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <AdventureForm
        adventure={adventure}
        handler={editHandler}
        isLoading={isLoadingUpdate}
      />
      <ButtonItem
        handler={deleteHandler}
        isLoading={isLoadingDelete}
        title={'Delete adventure'}
        theme={{backgroundColor: colors.red, textColor: colors.white}}
      />
    </ScrollView>
  );
};
