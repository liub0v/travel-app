import React from 'react';
import {View} from 'react-native';
import {CommentInput} from '../../components/CommentInput/CommentInput';

export const ReviewsScreen = ({route}) => {
  const comments = route.params?.comments;
  const commentSelector = route.params?.commentSelector;
  const onSubmit = route.params?.onSubmit;
  const showCriterionRating = route.params?.showCriterionRating;

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <CommentInput
          commentSelector={commentSelector}
          comments={comments}
          onSubmit={onSubmit}
          showCriterionRating={showCriterionRating}
        />
      </View>
    </View>
  );
};
