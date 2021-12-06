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
import {getAdventuresByDestination} from '../../../redux/actions/AdventureActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import colors from '../../constants/colors';

import {
  Footer,
  Spinner,
} from '../DestinationsCatalogScreen/DestinationsCatalog';
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

const Adventure = ({item}) => {
  const navigation = useNavigation();

  const adventureReviewsSelector = getAdventureReviewsSelector(item._id);

  const goAdventureScreen = () => {
    navigation.navigate('AdventureScreen', {
      adventure: item,
      reviewsSelector: adventureReviewsSelector,
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
  const destination = route.params.destination;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const adventures = useSelector(adventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  useEffect(() => {
    hasMore &&
      dispatch(getAdventuresByDestination({page, limit: 8, destination}));
  }, [page]);

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
