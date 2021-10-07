import mainImage from '../../../../assets/images/Rome.png';
import React from 'react';
import {
  BookingButton,
  BookingButtonTitle,
  Container,
  Description,
  TextWrapper,
  Title,
  ButtonsWrapper,
  Wrapper,
  PointContainer,
  SearchBarInput,
  SearchBarWrapper,
  SearchBarIcon,
} from './Preview.style';
import {TouchableWithoutFeedback} from 'react-native';
import {Point} from '../../Onboarding/OnBoarding.style';
import searchIcon from '../../../../assets/images/searchIcon.png';
const SearchBar = () => {
  const [value, onChangeText] = React.useState();
  return (
    <SearchBarWrapper>
      <SearchBarIcon source={searchIcon} />
      <SearchBarInput
        placeholder={'Where are you going?'}
        editable
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={() => console.log(value)}
      />
    </SearchBarWrapper>
  );
};
export const Preview = () => {
  return (
    <Container source={mainImage}>
      <SearchBar />
      <Wrapper>
        <TextWrapper>
          <Title>{'Rome'}</Title>
          <Description>
            {
              'The city setting is stunning with a rich architectural and historical heritage'
            }
          </Description>
        </TextWrapper>
        <ButtonsWrapper>
          <BookingButton>
            <TouchableWithoutFeedback onPress={() => {}}>
              <BookingButtonTitle>{'Book now'}</BookingButtonTitle>
            </TouchableWithoutFeedback>
          </BookingButton>
          <PointContainer>
            <Point active={false} />
            <Point active={true} />
            <Point active={false} />
          </PointContainer>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};
