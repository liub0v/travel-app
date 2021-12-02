import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {Container, FillImage, InitImage} from './Like.style';
import likeIcon from '../../../assets/images/like.png';
import likedIcon from '../../../assets/images/savedActiveIcon.png';
import colors from '../../constants/colors';
export const Like = ({
  handler = () => {},
  likeInit = false,
  isLoading = false,
}) => {
  const [like, setLike] = useState(likeInit);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
        setLike(!like);
      }}>
      <Container>
        {isLoading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="small"
            color={colors.green}
          />
        ) : like ? (
          <FillImage source={likedIcon} />
        ) : (
          <InitImage source={likeIcon} />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};
