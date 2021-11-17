import {TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {Container, FillImage, InitImage} from './Like.style';
import likeIcon from '../../../assets/images/like.png';
import likedIcon from '../../../assets/images/savedActiveIcon.png';
export const Like = ({handler = () => {}, likeInit = false}) => {
  const [like, setLike] = useState(likeInit);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setLike(!like);
        handler();
      }}>
      <Container>
        {like ? (
          <FillImage source={likedIcon} />
        ) : (
          <InitImage source={likeIcon} />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};
