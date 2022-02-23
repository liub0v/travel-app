import React from 'react';
import {ReviewForm} from './ReviewForm';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

describe('Testing ReviewForm component', () => {
  describe('rendering and submitting a basic Formik form', () => {
    let wrapper: any;
    let onSubmitHandler: () => void;
    let showCriterionRating: boolean;
    onSubmitHandler = jest.fn();
    showCriterionRating = true;
    let commentInput: ReactTestInstance;
    let submitButton: ReactTestInstance;
    const props = {
      onSubmitHandler,
      showCriterionRating,
    };
    beforeEach(() => {
      wrapper = render(<ReviewForm {...props} />);
      commentInput = wrapper.getByTestId('comment-text-input');
      submitButton = wrapper.getByText('Send');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should changed the text', async () => {
      await waitFor(() => {
        fireEvent.changeText(commentInput, 'test comment');
      });
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(commentInput.props.value).toEqual('test comment');
      });
    });
    it('should show validation error ', async () => {
      await waitFor(() => {
        fireEvent.changeText(commentInput, ' ');
      });
      fireEvent.press(submitButton);

      const validationErrorText = wrapper.getByTestId('validation-error');
      await waitFor(() => {
        expect(validationErrorText).toBeTruthy();
      });
      expect(validationErrorText.props.children).toBe('Your review is empty');
    });
    it('should not show validation error ', async () => {
      await waitFor(() => {
        fireEvent.changeText(commentInput, 'text');
      });
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(wrapper.queryByTestId('validation-error')).toBeFalsy();
      });
    });

    it('should send init values if comment is not empty', async () => {
      await waitFor(() => {
        fireEvent.changeText(commentInput, 'text');
      });
      fireEvent.press(submitButton);

      await waitFor(() =>
        expect(onSubmitHandler).toHaveBeenCalledWith({
          commentText: 'text',
          interestingRatingValue: 0,
          guideRatingValue: 0,
          serviceRatingValue: 0,
          priceRatingValue: 0,
          starsRatingValue: 0,
        }),
      );
    });

    it('should send interesting rating ', async () => {
      const interestingRatingSlider = wrapper.getByTestId(
        'interesting-rating-value-slider',
      );
      const guideRatingSlider = wrapper.getByTestId(
        'guide-rating-value-slider',
      );
      const serviceRatingSlider = wrapper.getByTestId(
        'service-rating-value-slider',
      );
      const priceRatingSlider = wrapper.getByTestId(
        'price-rating-value-slider',
      );

      await waitFor(() => {
        fireEvent(interestingRatingSlider, 'onValueChange', 10);
        fireEvent(guideRatingSlider, 'onValueChange', 9);
        fireEvent(serviceRatingSlider, 'onValueChange', 8);
        fireEvent(priceRatingSlider, 'onValueChange', 7);
        fireEvent.changeText(commentInput, 'text');
      });

      fireEvent.press(submitButton);

      await waitFor(() =>
        expect(onSubmitHandler).toHaveBeenCalledWith({
          commentText: 'text',
          interestingRatingValue: 10,
          guideRatingValue: 9,
          serviceRatingValue: 8,
          priceRatingValue: 7,
          starsRatingValue: 0,
        }),
      );
    });
  });
});
