import React, {useCallback, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {ProfileForm} from '../../components/ProfileForm/ProfileForm';
import {Container} from '../ProfileScreen/Profile.style';
import {clearGuide, getGuide} from '../../../redux/actions/GuideActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentGuideLoaderSelector,
  currentGuideSelector,
} from '../../../redux/selectors/GuideSelectors';
import {RefreshControl} from 'react-native';
import colors from '../../constants/colors';

export const GuideScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const guideID = route.params.guideID;

  const guide = useSelector(currentGuideSelector);
  const isLoading = useSelector(currentGuideLoaderSelector);

  useEffect(() => {
    dispatch(getGuide(guideID));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getGuide(guideID));
  }, [dispatch, getGuide]);

  useEffect(() => {
    return () => dispatch(clearGuide());
  }, []);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={colors.white}
          colors={colors.white}
        />
      }>
      <ProfileForm
        profileInfo={guide?.profileInfo}
        userInfo={guide?.userID}
        isLoading={isLoading}
      />
    </Container>
  );
};
