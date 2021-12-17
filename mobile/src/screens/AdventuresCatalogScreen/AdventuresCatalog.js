import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  adventuresSelector,
  getAdventureReviewsSelector,
  hasMoreAdventuresSelector,
  isLoadingAdventureSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {MainContainer} from '../DestinationsCatalogScreen/DestinationsCatalog.style';
import {
  clearAdventures,
  getAdventuresByDestination,
} from '../../../redux/actions/AdventureActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import colors from '../../constants/colors';

import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {
  InfoContainer,
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
import {
  AdventureWrapper,
  GuideContainer,
  GuideName,
  GuideTitle,
  GuideTitleWrapper,
} from './AdventuresCatalog.style';
import {GuideImage} from './AdventuresCatalog.style';
import {Spinner} from '../../components/Loaders/Spinner';
import {Footer} from '../../components/Footer/Footer';
import {PAGE_SIZE} from '../../constants/api';
import {
  clearHotels,
  getHotelsByDestination,
} from '../../../redux/actions/HotelActions';
import {hotelsSelector} from '../../../redux/selectors/HotelSelectors';

const Adventure = ({item}) => {
  const navigation = useNavigation();

  const goAdventureScreen = () => {
    navigation.navigate('AdventureScreen', {
      adventureID: item._id,
    });
  };

  return (
    <TouchableWithoutFeedback>
      <AdventureWrapper>
        <FastImage
          style={{width: 150, height: 250, borderRadius: 16}}
          blurRadius={5}
          source={{uri: item?.imageURL}}
        />
        <InfoContainer>
          <NormalText>{item?.name}</NormalText>
          <StarsContainer>
            {[...Array(item?.rating?.starsNumber)]?.map((item, index) => {
              return <Star key={index} source={star} />;
            })}
          </StarsContainer>
          <HotelPriceWrapper>
            <HotelPrice>{` $${item?.price} / `}</HotelPrice>
            <HotelPricePeriod>{'per person'}</HotelPricePeriod>
          </HotelPriceWrapper>
          <GuideContainer>
            <GuideImage source={{uri: item?.guideID?.profileInfo?.imageURL}} />
            <GuideTitleWrapper>
              <GuideTitle>Guide</GuideTitle>
              <GuideName>{item?.guideID?.profileInfo?.firstName}</GuideName>
            </GuideTitleWrapper>
          </GuideContainer>
          <ButtonItem
            handler={goAdventureScreen}
            titleSize={12}
            title={'More details'}
            size={{height: 40, width: 100}}
            theme={{
              backgroundColor: colors.white,
              textColor: colors.screenBackground,
            }}
          />
        </InfoContainer>
      </AdventureWrapper>
    </TouchableWithoutFeedback>
  );
};

export const AdventuresCatalog = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const destination = route?.params?.destination;

  const adventures = useSelector(adventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  const [page, setPage] = useState(1);

  console.log(page);
  useEffect(() => {
    dispatch(getAdventuresByDestination({page, limit: PAGE_SIZE, destination}));
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(clearAdventures());
    };
  }, []);
  return (
    <MainContainer>
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={adventures}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          hasMore && setPage(page + 1);
        }}
        renderItem={({item}) => <Adventure item={item} />}
        keyExtractor={item => item._id}
        ListFooterComponent={isLoading ? <Spinner /> : <Footer />}
      />
    </MainContainer>
  );
};
