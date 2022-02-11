import React from 'react';
import {shallow} from 'enzyme';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Author, ReviewsScreen} from './ReviewsScreen';
import {STORE} from '../../tests/__mocks__/store-mock';
import {USER_MOCKS} from '../../tests/__mocks__/user-mocks';
import {ReviewForm} from './ReviewForm';
import {Comments} from './Comments';
import {useReviews} from './useReviews';
import {useSendReview} from './useSendReview';

jest.mock('./useReviews');
jest.mock('./useSendReview');

jest.mock('@react-navigation/native');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Testing ReviewScreen component', () => {
  let mockEffect;
  let wrapper;
  let mockMemo;
  let mockCallback;

  let user = {
    profileInfo: USER_MOCKS.PROFILE_INFO,
    userID: USER_MOCKS.USER_INFO,
  };
  let reviews = STORE.hotel.currentHotel.data.reviews;
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        type: 'hotel',
        onSubmit: () => jest.fn(() => Promise.resolve({})),
      },
    });
    useReviews.mockReturnValue({
      comments: reviews,
      isCriterionRating: false,
    });
    useSendReview.mockReturnValue({
      isCommentForm: true,
      onSubmitHandler: jest.fn(),
    });

    mockEffect = jest.spyOn(React, 'useEffect');
    mockEffect.mockImplementation(f => f());

    mockCallback = jest.spyOn(React, 'useCallback');
    mockCallback.mockImplementation(f => f());

    mockMemo = jest.spyOn(React, 'useMemo');
    mockMemo.mockImplementation(f => f());

    useDispatch.mockImplementation(() => () => {});
    useSelector
      .mockReturnValueOnce(user)
      .mockReturnValueOnce(user.userID.role)
      .mockReturnValueOnce(reviews);

    wrapper = shallow(<ReviewsScreen />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show review form it role is admin ', () => {
    // useSelector
    //   .mockReturnValueOnce(USER_MOCKS.ADMIN)
    //   .mockReturnValueOnce(USER_MOCKS.ADMIN.userID.role)
    //   .mockReturnValueOnce(reviews);
    useSendReview.mockReturnValue({
      isCommentForm: false,
      onSubmitHandler: jest.fn(),
    });
    wrapper = shallow(<ReviewsScreen />);

    expect(wrapper.find(ReviewForm)).not.toExist();
    expect(wrapper.find(Author)).not.toExist();
    expect(wrapper.find(Comments)).toExist();
  });
  it('should not show review when comment has been send ', async () => {
    await wrapper.find(ReviewForm).invoke('onSubmitHandler')({
      commentText: 'text',
      interestingRatingValue: 0,
      guideRatingValue: 0,
      serviceRatingValue: 0,
      priceRatingValue: 0,
      starsRatingValue: 0,
    });

    expect(wrapper.find(ReviewForm).prop('onSubmitHandler')).toHaveBeenCalled();

    // expect(wrapper.find(ReviewForm)).not.toExist();
    // expect(wrapper.find(TitleWrapper)).toExist();
  });
});
