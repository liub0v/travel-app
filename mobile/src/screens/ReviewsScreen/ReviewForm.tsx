import React, {useState} from 'react';
import {commentValidationSchema} from '../../services/validation';
import {
  ButtonWrapper,
  CommentInputWrapper,
  CommentTextInput,
  CriterionRatingContainer,
  StarsRatingContainer,
} from './CommentInput.style';
import {CriterionRating} from '../../components/CriterionRating/CriterionRating';
import {StarsRating} from '../../components/StarsRating/StarsRating';
import colors from '../../constants/colors';
import {Text} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {Formik} from 'formik';

export interface FormValues {
  commentText: string;
  interestingRatingValue: number;
  guideRatingValue: number;
  serviceRatingValue: number;
  priceRatingValue: number;
  starsRatingValue: number;
}

interface ProfileFormProps {
  showCriterionRating?: boolean;
  onSubmitHandler: (values: FormValues) => void;
}
export const ReviewForm: React.SFC<ProfileFormProps> = ({
  showCriterionRating,
  onSubmitHandler,
}) => {
  const [starsRatingValue, setStarsRatingValue] = useState(0);

  return (
    <Formik
      validationSchema={commentValidationSchema}
      initialValues={{
        commentText: '',
        interestingRatingValue: 0,
        guideRatingValue: 0,
        serviceRatingValue: 0,
        priceRatingValue: 0,
        starsRatingValue: 0,
      }}
      onSubmit={async values => {
        await onSubmitHandler({...values, starsRatingValue});
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <CommentInputWrapper>
          {showCriterionRating && (
            <CriterionRatingContainer>
              <CriterionRating
                testID={'interesting-rating-value'}
                title={'Interesting'}
                ratingValue={values.interestingRatingValue}
                onValueChangeHandler={(value: number) => {
                  setFieldValue('interestingRatingValue', value);
                }}
              />
              <CriterionRating
                testID="guide-rating-value"
                title={'Guide'}
                ratingValue={values.guideRatingValue}
                onValueChangeHandler={(value: number) =>
                  setFieldValue('guideRatingValue', value)
                }
              />
              <CriterionRating
                testID="service-rating-value"
                title={'Service'}
                ratingValue={values.serviceRatingValue}
                onValueChangeHandler={(value: number) =>
                  setFieldValue('serviceRatingValue', value)
                }
              />
              <CriterionRating
                testID="price-rating-value"
                title={'Price'}
                ratingValue={values.priceRatingValue}
                onValueChangeHandler={(value: number) =>
                  setFieldValue('priceRatingValue', value)
                }
              />
            </CriterionRatingContainer>
          )}

          <StarsRatingContainer>
            <StarsRating
              setStarRating={setStarsRatingValue}
              initStarsNumber={starsRatingValue}
            />
          </StarsRatingContainer>

          <CommentTextInput
            testID="comment-text-input"
            multiline={true}
            placeholderTextColor={colors.grey}
            placeholder={'Type a comment...'}
            onChangeText={handleChange('commentText')}
            onBlur={handleBlur('commentText')}
            value={values.commentText}
            name={'comment'}
          />
          {errors.commentText && touched.commentText && (
            <Text
              testID="validation-error"
              style={{color: colors.red, padding: 6}}>
              {errors.commentText}
            </Text>
          )}
          <ButtonWrapper>
            <ButtonItem
              title={'Send'}
              titleSize={12}
              size={{height: 40, width: 100}}
              handler={handleSubmit}
            />
          </ButtonWrapper>
        </CommentInputWrapper>
      )}
    </Formik>
  );
};
