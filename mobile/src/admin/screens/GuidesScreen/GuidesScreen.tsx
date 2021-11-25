import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  guidesSelector,
  hasMoreGuidesSelector,
  isLoadingGuidesSelector,
} from '../../../../redux/selectors/GuideSelectors';
import colors from '../../../constants/colors';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {getGuides} from '../../../../redux/actions/GuideActions';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {ButtonWrapper} from '../HotelsListScreen/HotelsScreen.style';
import {useNavigation} from '@react-navigation/native';
import {Dialog} from '../../../screens/InboxScreen/components/Dialog';

export const GuidesScreen = () => {
  const guides = useSelector(guidesSelector);
  const hasMore = useSelector(hasMoreGuidesSelector);
  const isLoading = useSelector(isLoadingGuidesSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getGuides({page, limit: 6}));
  }, [page]);

  const goAddGuideScreen = () => {
    navigation.navigate();
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color={colors.green}
        />
      ) : (
        <>
          <ButtonWrapper>
            <ButtonItem
              title={'Add guide'}
              theme={{
                backgroundColor: colors.white,
                textColor: colors.screenBackground,
              }}
              handler={goAddGuideScreen}
            />
          </ButtonWrapper>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={guides}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              hasMore && setPage(page + 1);
            }}
            renderItem={({item}) => (
              <Dialog item={item} navigation={navigation} />
            )}
            keyExtractor={item => item._id}
          />
        </>
      )}
    </View>
  );
};
