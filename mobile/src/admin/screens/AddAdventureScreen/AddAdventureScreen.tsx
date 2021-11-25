import React from 'react';
import {AdventureForm} from '../../components/AdventureForm/AdventureForm';
import {Asset} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addAdventure} from '../../../../redux/actions/AdventureActions';
import {addAdventureLoaderSelector} from '../../../../redux/selectors/AdventureSelectors';

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
  return <AdventureForm isLoading={isLoading} handler={createHandler} />;
};
