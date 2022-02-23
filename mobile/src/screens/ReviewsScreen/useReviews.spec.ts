import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useSelector} from 'react-redux';
import {useReviews, useReviewsType} from './useReviews';
import {STORE} from '../../tests/__mocks__/store-mock';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('useReviews hook', () => {
  let hook: RenderHookResult<void, useReviewsType>;
  let reviews = STORE.hotel.currentHotel.data.reviews;
  beforeEach(() => {
    useSelector.mockReturnValueOnce(reviews);
  });
  it('should not show criterion rating if hotel', () => {
    hook = renderHook(() => useReviews('hotel'));
    expect(hook.result.all[0].comments).toEqual(reviews);
    expect(hook.result.all[0].isCriterionRating).toBe(false);
  });
  it('should show criterion rating if adventure', () => {
    hook = renderHook(() => useReviews('adventure'));
    expect(hook.result.all[0].comments).toEqual(reviews);
    expect(hook.result.all[0].isCriterionRating).toBe(true);
  });
});
