import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
export const MainContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;
export const ImageContainer = styled.ImageBackground`
  width: 100%;
  height: 410px;
  justify-content: space-between;
  align-items: center;
`;
export const InfoContainer = styled.View`
  flex-direction: row;
  padding: 24px;
  justify-content: space-between;
`;
export const NameContainer = styled.View`
  flex-direction: column;
  width: 60%;
`;
export const NameTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 16px;
  color: ${colors.white};
  margin-top: 5px;
  margin-bottom: 5px;
`;
export const LocationTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
`;
export const PriceTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${colors.white};
`;
export const RateTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 12px;
  color: ${colors.grey};
`;
export const PriceContainer = styled.View`
  align-items: flex-end;
`;
export const SummaryContainer = styled.View``;
export const SummaryWrapper = styled.View`
  padding: 24px;
`;
export const SummaryText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
  line-height: 24px;
`;
export const GuideContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.grey};
  align-items: center;
  margin-top: 40px;
  padding-bottom: 24px;
`;
export const GuideAvatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-top: -40px;
`;
export const RatingContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.grey};
  flex-direction: column;
  padding-top: 24px;
`;

export const GeneralRatingWrapper = styled.View`
  flex-direction: row;
  padding: 24px;
  align-items: center;
  width: 50%;
  justify-content: space-between;
`;
export const GeneralRatingTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${colors.white};
`;
export const CategoryRatingItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 12px;
`;
export const CategoryRatingTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
`;
export const CategoryRatingLine = styled.View`
  background-color: ${colors.white};
  height: 6px;
  width: 50%;
  border-radius: 3px;
`;
export const CategoryRatingLineValue = styled.View`
  position: absolute;
  height: 6px;
  width: ${props => props.value}%;
  border-radius: 3px;
  background-color: ${colors.blue};
`;

export const ReviewsContainer = styled.View`
  flex-direction: column;
  padding-top: 24px;
`;

export const LocationContainer = styled.View``;
export const ButtonWrapper = styled.View`
  padding-top: 24px;
  align-items: center;
`;

export const Map = styled.View`
  margin-top: 24px;
  height: 170px;
  width: 100%;
  background-color: rgba(15, 20, 52, 0.38);
`;

export const IntroReviews = styled.View`
  padding-top: 24px;
`;

export const GuideNameWrapper = styled.View`
  margin-top: 12px;
`;
export const GuideNameTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${colors.white};
`;
export const TitleWrapper = styled.View`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
  background-color: ${colors.grey};
  opacity: 0.7;
  padding: 24px;
  border-radius: 32px;
`;
