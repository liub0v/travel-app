import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {PAGE_SIZE} from '../../../constants/api';
import {Footer} from '../../../components/Footer/Footer';
import {Spinner} from '../../../components/Loaders/Spinner';
import {Search} from '../../../components/Seacrh/Search';
import {SearchWrapper} from '../../../screens/DestinationsCatalogScreen/DestinationsCatalog.style';

type Props = {
  renderItem: any;
  data: any;
  hasMore: any;
  isLoading: any;
  getItemsByTerm: any;
  getItems: any;
  clearItems: any;
  flatListProps: any;
};
export const SearchList: React.FC<Props> = ({
  renderItem,
  data,
  hasMore,
  isLoading,
  getItemsByTerm,
  getItems,
  clearItems,
  flatListProps = {numColumns: 1},
}) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [timerId, setTimerId] = useState();

  const searchAdventures = useCallback(
    (term, page) => {
      if (term.trim()) {
        dispatch(getItemsByTerm({page, limit: PAGE_SIZE, term}));
      } else {
        dispatch(getItems({page, limit: PAGE_SIZE}));
      }
    },
    [dispatch],
  );
  const handleEndReached = useCallback(() => {
    if (hasMore) {
      setPage(page + 1);
      searchAdventures(searchTerm, page + 1);
    }
  }, [page, hasMore, searchTerm, searchAdventures]);

  useEffect(() => {
    searchAdventures('', 1);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearItems());
    };
  }, []);

  const handleSearchTermChange = (term: string) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newId = setTimeout(() => {
      dispatch(clearItems());
      setPage(1);
      setSearchTerm(term);
      searchAdventures(term, 1);
    }, 500);

    setTimerId(newId);
  };
  const footerComponent = useCallback(() => {
    if (!hasMore) {
      return <Footer />;
    } else {
      return isLoading ? <Spinner /> : null;
    }
  }, [isLoading, hasMore]);

  return (
    <>
      <SearchWrapper>
        <Search
          placeholder={'Where are you going?'}
          onChangeHandler={handleSearchTermChange}
        />
      </SearchWrapper>
      <FlatList
        numColumns={flatListProps.numColumns}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={footerComponent}
      />
    </>
  );
};
