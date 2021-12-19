import React from 'react';
import {AdventureForm} from '../../components/AdventureForm/AdventureForm';
import {Asset} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addAdventure} from '../../../../redux/actions/AdventureActions';
import {addAdventureLoaderSelector} from '../../../../redux/selectors/AdventureSelectors';
import {ScrollView} from 'react-native';

type Props = {};
export const AddAdventureScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(addAdventureLoaderSelector);

  const createHandler = ({
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
      addAdventure({
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
        isLoading={isLoading}
        handler={createHandler}
        adventure={{}}
      />
    </ScrollView>
  );
};
