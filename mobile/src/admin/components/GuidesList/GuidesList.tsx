import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {Guide} from '../../../screens/ExploreScreen/components/Guide';
import {useDispatch, useSelector} from 'react-redux';
import {
  guidesSelector,
  hasMoreGuidesSelector,
} from '../../../../redux/selectors/GuideSelectors';
import {getGuides} from '../../../../redux/actions/GuideActions';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import colors from '../../../constants/colors';
import {ButtonWrapper} from '../../screens/HotelsListScreen/HotelsScreen.style';
import {PAGE_SIZE} from '../../../constants/api';

type Props = {
  closeHandler: any;
  pressHandler: any;
};

export const GuidesList: React.FC<Props> = ({closeHandler, pressHandler}) => {
  const guides = useSelector(guidesSelector);
  const hasMore = useSelector(hasMoreGuidesSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    hasMore && dispatch(getGuides({page, limit: PAGE_SIZE}));
  }, [page]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.screenBackground,
        }}>
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={guides}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            hasMore && setPage(page + 1);
          }}
          renderItem={({item}) => <Guide item={item} handler={pressHandler} />}
          keyExtractor={item => item._id}
        />
        <ButtonWrapper>
          <ButtonItem title={'Cancel'} handler={closeHandler} />
        </ButtonWrapper>
      </SafeAreaView>
    </>
  );
};
