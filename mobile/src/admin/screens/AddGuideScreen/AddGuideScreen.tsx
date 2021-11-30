import React from 'react';
import {GuideForm} from '../../components/GuideForm/GuideForm';
import {useDispatch, useSelector} from 'react-redux';
import {addGuide} from '../../../../redux/actions/GuideActions';
import {addGuideLoaderSelector} from '../../../../redux/selectors/GuideSelectors';
import {View} from 'react-native';

type Props = {};

export const AddGuideScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(addGuideLoaderSelector);
  const addHandler = ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(addGuide({username, email, password}));
  };
  return (
    <View style={{flex: 1}}>
      <GuideForm submitHandler={addHandler} isLoading={isLoading} />
    </View>
  );
};
