import React from 'react';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ReviewsScreen} from './ReviewsScreen';
import {useRoute} from '@react-navigation/native';
import * as redux from 'react-redux';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {STORE} from '../../tests/__mocks__/store-mock';
import {Container} from './ReviewsScreen.style';

jest.mock('@react-navigation/native');
Enzyme.configure({adapter: new Adapter()});

describe('Testing ReviewScreen component', () => {
  let mockDispatch;
  let useEffect;
  let wrapper;
  let mockSelector;
  let mockMemo;
  let mockCallback;
  let useSelector;

  const initMockStore = STORE;
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    mockDispatch = jest.fn();
    // mockSelector = jest.fn();

    store = mockStore(initMockStore);

    useRoute.mockReturnValue({
      params: {type: 'hotel', onSubmit: () => jest.fn()},
    });
    useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockImplementation(f => f());

    mockCallback = jest.spyOn(React, 'useCallback');
    mockCallback.mockImplementation(f => f());

    mockMemo = jest.spyOn(React, 'useMemo');
    mockMemo.mockImplementation(f => f());

    mockDispatch.mockImplementation(() => () => {});
    // mockSelector.mockImplementation(selector => selector(store));

    useSelector = jest
      .spyOn(redux, 'useSelector')
      .mockImplementation(cb => cb(initMockStore));
    wrapper = mount(
      <Provider store={store}>
        <ReviewsScreen />
      </Provider>,
    );
  });
  afterEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockClear();
  });

  it('should match snapshot', () => {
    // wrapper = shallow(<ReviewsScreen />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be container ', () => {
    // const nodes = wrapper.render().find(CommentInputContainer);

    expect(wrapper.find(Container)).toExist();
  });
});
