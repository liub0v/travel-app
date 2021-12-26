import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  clearGuides,
  getGuides,
  getGuidesByTerm,
} from '../../../redux/actions/GuideActions';
import {
  guidesSelector,
  hasMoreGuidesSelector,
  isLoadingGuidesSelector,
} from '../../../redux/selectors/GuideSelectors';
import {Guide} from '../ExploreScreen/components/Guide';
import {SearchList} from '../../admin/components/SearchList/SearchList';

export const GuidesCatalogScreen = () => {
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
