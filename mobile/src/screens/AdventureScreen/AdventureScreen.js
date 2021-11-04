import React, {useCallback, useState} from 'react';
import {
  ButtonWrapper,
  CategoryRatingItem,
  CategoryRatingLine,
  CategoryRatingLineValue,
  CategoryRatingTitle,
  CommentContainer,
  ImageContainer,
  DateTitle,
  GeneralRatingTitle,
  GeneralRatingWrapper,
  GuideAvatar,
  GuideContainer,
  InfoContainer,
  LocationContainer,
  LocationTitle,
  MainContainer,
  Map,
  NameContainer,
  NameTitle,
  PriceContainer,
  PriceTitle,
  RateTitle,
  RatingContainer,
  ReviewsContainer,
  SummaryContainer,
  SummaryText,
  SummaryWrapper,
  UserAvatar,
  UserContainer,
  UserFirstNameTitle,
  UserInfoContainer,
  UserInfoWrapper,
  UserRatingTitle,
} from './AdventureScreen.style';
import {SectionHeader} from '../../components/Section/Section';
import colors from '../../constants/colors';
import guideAvatar from '../../../assets/images/avatarBig.png';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {Stars} from '../../components/Stars/Stars';
import {LikeWrapper} from '../HotelScreen/HotelScreen.style';
import {Like} from '../../components/Like/Like';
import {useDispatch, useSelector} from 'react-redux';
import {savedAdventuresSelector} from '../../../redux/selectors/UserSelector';
import {
  deleteSavedAdventure,
  saveAdventure,
} from '../../../redux/actions/AdventureActions';
import {dateParser} from '../../services/dataParser';

export const DynamicText = ({text, lineNumber = 5}) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);
  return (
    <SummaryWrapper>
      <SummaryText
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : lineNumber}>
        {text}
      </SummaryText>
      {lengthMore && (
        <SummaryText onPress={toggleNumberOfLines} style={{color: colors.blue}}>
          {textShown ? 'Hide text' : 'Read more'}
        </SummaryText>
      )}
    </SummaryWrapper>
  );
};
export const Comment = ({review}) => {
  const date = new Date(review?.date);
  return (
    <CommentContainer>
      <UserContainer>
        <UserAvatar source={{uri: review.clientID?.profileInfo?.imageURL}} />
        <UserInfoContainer>
          <UserInfoWrapper>
            <UserFirstNameTitle>{`${review.clientID?.profileInfo?.firstName} ${review.clientID?.profileInfo?.lastName}`}</UserFirstNameTitle>
            <DateTitle>{dateParser(date)}</DateTitle>
          </UserInfoWrapper>
          <UserInfoWrapper>
            <UserRatingTitle>{review?.rating?.generalRating}</UserRatingTitle>
            <Stars starsNumber={review?.rating?.starsNumber} />
          </UserInfoWrapper>
        </UserInfoContainer>
      </UserContainer>
      <DynamicText text={review?.comment} lineNumber={3} />
    </CommentContainer>
  );
};
export const Criterion = ({title = 'criterion', value = 100}) => {
  return (
    <CategoryRatingItem>
      <CategoryRatingTitle>{title}</CategoryRatingTitle>
      <CategoryRatingLine>
        <CategoryRatingLineValue value={value} />
      </CategoryRatingLine>
    </CategoryRatingItem>
  );
};
export const AdventureScreen = ({route}) => {
  const adventure = route.params.adventure;
  const dispatch = useDispatch();
  const savedAdventures = useSelector(savedAdventuresSelector);
  const like =
    savedAdventures.filter(item => item._id === adventure._id).length > 0;
  const setLikeOnAdventure = () => {
    like && dispatch(deleteSavedAdventure(adventure._id));
    !like && dispatch(saveAdventure(adventure._id));
  };
  return (
    <MainContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <ImageContainer source={{uri: adventure.imageURL}}>
        <LikeWrapper>
          <Like handler={setLikeOnAdventure} likeInit={like} />
        </LikeWrapper>
      </ImageContainer>
      <InfoContainer>
        <NameContainer>
          <Stars starsNumber={adventure?.rating?.starsNumber} />
          <NameTitle>{adventure.name}</NameTitle>
          <LocationTitle>{adventure.address}</LocationTitle>
        </NameContainer>
        <PriceContainer>
          <PriceTitle>$ {adventure.price}</PriceTitle>
          <RateTitle> per person</RateTitle>
        </PriceContainer>
      </InfoContainer>
      <SummaryContainer>
        <SectionHeader showRightButton={false} title={'Summary'} />
        <DynamicText text={adventure.summary} />
      </SummaryContainer>
      <GuideContainer>
        <GuideAvatar source={guideAvatar} />
        <DynamicText text={adventure.summary} />
        <ButtonItem title={'Contact Guide'} />
      </GuideContainer>
      <RatingContainer>
        <SectionHeader showRightButton={false} title={'Rating'} />
        <GeneralRatingWrapper>
          <GeneralRatingTitle>
            {adventure?.rating?.generalRating.toFixed(1)}
          </GeneralRatingTitle>
          <Stars starsNumber={adventure?.rating?.starsNumber} />
        </GeneralRatingWrapper>
        <Criterion
          title="Interesting"
          value={adventure?.rating?.interestingRating * 10}
        />
        <Criterion title="Guide" value={adventure?.rating?.guideRating * 10} />
        <Criterion
          title="Service"
          value={adventure?.rating?.serviceRating * 10}
        />
        <Criterion title="Price" value={adventure?.rating?.priceRating * 10} />
      </RatingContainer>
      <ReviewsContainer>
        <SectionHeader
          showRightButton={true}
          title={`Reviews (${adventure?.reviews.length})`}
        />
        {adventure?.reviews.map(review => (
          <Comment review={review} />
        ))}
      </ReviewsContainer>
      <LocationContainer>
        <SectionHeader showRightButton={false} title={'Location'} />
        <Map />
      </LocationContainer>
      <ButtonWrapper>
        <ButtonItem title={'Book now'} />
      </ButtonWrapper>
    </MainContainer>
  );
};
