import React from 'react';
import {Comment} from './Comment';
import {CommentsContainer} from './ReviewsScreen.style';

export const Comments = React.memo(({comments}) => {
  return (
    <CommentsContainer style={{flex: 1}}>
      {comments?.map(item => (
        <Comment item={item} key={item._id} />
      ))}
    </CommentsContainer>
  );
});
