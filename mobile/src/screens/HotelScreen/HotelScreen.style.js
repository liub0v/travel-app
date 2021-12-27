import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
export const MainContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;
export const ImageContainer = styled.View`
  width: 100%;
  height: 320px;
`;
export const NameContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 12.5%;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  width: 75%;
  background-color: ${colors.screenBackground};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
export const LikeWrapper = styled.View`
  position: absolute;
  right: 10px;
  top: 30px;
`;
export const BoldText = styled.Text`
  font-family: ${fonts.bold};
  font-size: 24px;
  color: ${colors.white};
  text-align: center;
`;
export const NormalText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
`;
export const InfoContainer = styled.View`
  padding: 24px;
`;
export const InfoWrapper = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 4px;
`;

export const RatingTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 14px;
  color: ${colors.white};
  background-color: ${colors.green};
  padding: 2px 12px;
  border-radius: 8px;
`;
export const ReviewsTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.white};
  border-color: ${colors.white};
  border-bottom-width: 1px;
`;
export const OptionsContainer = styled.View`
  padding: 24px;
  flex-direction: row;
  justify-content: space-around;
  border-bottom-width: 0.5px;
  border-top-width: 0.5px;
  border-color: ${colors.grey};
`;
export const ButtonSeeMoreWrapper = styled.View`
  position: absolute;
  bottom: -12px;
  right: 24px;
  width: 86px;
`;
export const OptionWrapper = styled.View`
  align-items: center;
`;
export const OptionIcon = styled.Image`
  height: 18px;
  width: 18px;
`;
export const OptionTitle = styled.Text`
  padding: 7px;
  font-family: ${fonts.normal};
  font-size: 12px;
  color: ${colors.white};
`;
export const SummeryContainer = styled.View`
  margin-top: 24px;
`;
export const LocationContainer = styled.View``;
export const GalleryContainer = styled.View`
  padding: 24px;
`;
export const GalleryHeader = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.white};
`;
export const GalleryWrapper = styled.View`
  margin-top: 12px;
  flex-direction: row;
`;
export const GalleryMainImage = styled.Image`
  width: 130px;
  height: 152px;
  border-radius: 8px;
`;
export const ColumnWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 12px;
`;
export const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const GallerySecondImage = styled.Image`
  width: 90%;
  height: 70px;
  border-radius: 8px;
`;
export const GalleryThirdImage = styled.Image`
  width: 43%;
  height: 70px;
  border-radius: 8px;
`;
export const GalleryMoreImage = styled.ImageBackground`
  width: 43%;
  height: 70px;
  margin-left: 4%;
  justify-content: center;
  align-items: center;
`;
export const GalleryMoreTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${colors.white};
`;
export const ButtonWrapper = styled.View`
  padding-bottom: 24px;
`;
