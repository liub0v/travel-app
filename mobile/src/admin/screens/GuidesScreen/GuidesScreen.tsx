import React from 'react';
import {useSelector} from 'react-redux';
import {
  guidesSelector,
  hasMoreGuidesSelector,
  isLoadingGuidesSelector,
} from '../../../../redux/selectors/GuideSelectors';

import {View} from 'react-native';
import {
  clearGuides,
  getGuides,
  getGuidesByTerm,
} from '../../../../redux/actions/GuideActions';

import {Guide} from '../../../screens/ExploreScreen/components/Guide';
import {SearchList} from '../../components/SearchList/SearchList';

export const GuidesScreen = () => {
  const guides = useSelector(guidesSelector);
  const hasMore = useSelector(hasMoreGuidesSelector);
  const isLoading = useSelector(isLoadingGuidesSelector);

  return (
    <View style={{flex: 1}}>
      <SearchList
        renderItem={({item}) => <Guide item={item} />}
        data={guides}
        hasMore={hasMore}
        isLoading={isLoading}
        getItemsByTerm={getGuidesByTerm}
        getItems={getGuides}
        clearItems={clearGuides}
        flatListProps={{numColumns: 1}}
      />
    </View>
  );
};
