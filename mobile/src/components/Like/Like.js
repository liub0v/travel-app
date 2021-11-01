import {TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {LikeContainer, LikedImage, LikeImage} from './Like.style';
import likeIcon from '../../../assets/images/like.png';
import likedIcon from '../../../assets/images/savedActiveIcon.png';

export const Like = () => {
  const [like, setLike] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => setLike(!like)}>
      <LikeContainer>
        {like ? (
          <LikedImage source={likedIcon} />
        ) : (
          <LikeImage source={likeIcon} />
        )}
      </LikeContainer>
    </TouchableWithoutFeedback>
  );
};
