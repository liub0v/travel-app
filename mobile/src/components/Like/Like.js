import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {Container, FillImage, InitImage} from './Like.style';
import likeImage from '../../../assets/images/like.png';
import likedImage from '../../../assets/images/savedActiveIcon.png';
import colors from '../../constants/colors';

export const Like = ({
  handler = () => {},
  likeInit = false,
  isLoading = false,
}) => {
  const [likeIcon, setLikeIcon] = useState(likeInit);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
        setLikeIcon(!likeIcon);
      }}>
      <Container>
        {isLoading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="small"
            color={colors.green}
          />
        ) : likeIcon ? (
          <FillImage source={likedImage} />
        ) : (
          <InitImage source={likeImage} />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};
