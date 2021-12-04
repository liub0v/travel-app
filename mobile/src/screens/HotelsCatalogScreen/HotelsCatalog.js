import React, {useEffect, useState} from 'react';

import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {
  getHotelReviewsSelector,
  hasMoreHotelsSelector,
  hotelsSelector,
  isLoadingHotelSelector,
} from '../../../redux/selectors/HotelSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterHotels,
  getHotelsByDestination,
} from '../../../redux/actions/HotelActions';
import colors from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {MainContainer} from './HotelsCatalog.style';
import {
  InfoContainer,
  ItemContainer,
  NormalText,
} from '../HotelsCatalogByDestinations/HotelsCatalogByDestination.style';
import {
  HotelPrice,
  HotelPricePeriod,
  HotelPriceWrapper,
  Star,
  StarsContainer,
} from '../ExploreScreen/components/Hotel.style';
import star from '../../../assets/images/start.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Footer,
  Spinner,
} from '../DestinationsCatalogScreen/DestinationsCatalog';
import {PAGE_SIZE} from '../../constants/api';

const Hotel = ({item}) => {
  const navigation = useNavigation();
  const hotelReviewsSelector = getHotelReviewsSelector(item._id);
  const goHotelScreen = () => {
    navigation.navigate('HotelScreen', {
      hotel: item,
      reviewsSelector: hotelReviewsSelector,
    });
  };
  return (
    <TouchableWithoutFeedback>
      <ItemContainer>
        <FastImage
          style={{width: 155, height: 155, borderRadius: 16}}
          blurRadius={5}
          source={{uri: item?.imageURL}}
        />
        <InfoContainer>
          <NormalText>{`${item?.name} ${item?.starsNumber}*`}</NormalText>
          <StarsContainer>
            {[...Array(item.starsNumber)].map((item, index) => {
              return <Star key={index} source={star} />;
            })}
          </StarsContainer>
          <HotelPriceWrapper>
            <HotelPrice>{` $${item?.price} / `}</HotelPrice>
            <HotelPricePeriod>{'per night'}</HotelPricePeriod>
          </HotelPriceWrapper>
          <ButtonItem
            handler={goHotelScreen}
            titleSize={12}
            title={'More details'}
            size={{height: 40, width: 100}}
            theme={{
              backgroundColor: colors.white,
              textColor: colors.screenBackground,
            }}
          />
        </InfoContainer>
      </ItemContainer>
    </TouchableWithoutFeedback>
  );
};

export const HotelsCatalog = () => {
  const route = useRoute();
  const destination = route?.params?.destination;
  const filter = route?.params?.filter;
  const hotels = useSelector(hotelsSelector);
  const hasMore = useSelector(hasMoreHotelsSelector);
  const isLoading = useSelector(isLoadingHotelSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (destination) {
      dispatch(getHotelsByDestination({page, limit: PAGE_SIZE, destination}));
    }
    if (filter) {
      dispatch(filterHotels({page, limit: PAGE_SIZE, filter}));
    }
  }, [page]);
  return (
    <MainContainer>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={hotels}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          hasMore && setPage(page + 1);
        }}
        renderItem={({item}) => <Hotel item={item} />}
        keyExtractor={item => item._id}
        ListFooterComponent={isLoading ? <Spinner /> : <Footer />}
      />
    </MainContainer>
  );
};
