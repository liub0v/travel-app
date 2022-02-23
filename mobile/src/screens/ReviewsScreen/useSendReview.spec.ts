import {act, renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useReviewsType} from './useReviews';
import {useSendReview} from './useSendReview';
import {useDispatch} from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('useSendReview hook', () => {
  let hook: RenderHookResult<void, useReviewsType>;
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => {});
  });
  it('should hide form if sending is successful', async () => {
    hook = renderHook(() => useSendReview(() => Promise.resolve({})));
    await act(async () => {
      await hook.result.current.onSubmitHandler({
        commentText: 'text',
        interestingRatingValue: 0,
        guideRatingValue: 0,
        serviceRatingValue: 0,
        priceRatingValue: 0,
        starsRatingValue: 0,
      });
    });

    expect(hook.result.current.isCommentForm).toBe(false);
  });
  it('should show form if error', async () => {
    hook = renderHook(() => useSendReview(() => Promise.reject({})));
    await act(async () => {
      await hook.result.current.onSubmitHandler({
        commentText: 'text',
        interestingRatingValue: 0,
        guideRatingValue: 0,
        serviceRatingValue: 0,
        priceRatingValue: 0,
        starsRatingValue: 0,
      });
    });

    expect(hook.result.current.isCommentForm).toBe(true);
  });
});
