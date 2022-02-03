import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileForm} from './ProfileForm';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ProfileFormWrapper, ProfileInfoWrapper} from './ProfileInfo.style';
import {BoldWhiteText} from '../../screens/ProfileScreen/Profile.style';
import {USER_MOCKS} from '../../tests/__mocks__/user-mocks';

Enzyme.configure({adapter: new Adapter()});
test('renders correctly', () => {
  const tree = renderer
    .create(
      <ProfileForm
        profileInfo={USER_MOCKS.PROFILE_INFO}
        userInfo={USER_MOCKS.USER_INFO}
        isLoading={false}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Testing ProfileForm component', () => {
  let wrapper;
  let profileInfo;
  let userInfo;

  describe('Testing loading', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProfileForm
          profileInfo={USER_MOCKS.PROFILE_INFO}
          userInfo={USER_MOCKS.USER_INFO}
        />,
      );
    });
    it('loading is false', () => {
      wrapper = shallow(<ProfileForm isLoading={false} />);
      wrapper.setProps({isLoading: false});
      expect(wrapper.find(ProfileFormWrapper)).toExist();
    });
    it('loading is true', () => {
      wrapper = shallow(<ProfileForm isLoading={true} />);
      wrapper.setProps({isLoading: true});
      expect(wrapper.find(ProfileFormWrapper)).not.toExist();
    });
  });

  describe('Testing fields', () => {
    describe('name field', () => {
      beforeEach(() => {
        profileInfo = {...USER_MOCKS.PROFILE_INFO};
        wrapper = shallow(
          <ProfileForm isLoading={false} userInfo={USER_MOCKS.USER_INFO} />,
        );
      });
      it('only lastName & undefined', () => {
        profileInfo.firstName = undefined;
        wrapper.setProps({profileInfo});
        expect(wrapper.find(BoldWhiteText)).toHaveText(profileInfo.lastName);
      });
      it('only lastName & empty string', () => {
        profileInfo.firstName = '';
        wrapper.setProps({profileInfo});
        expect(wrapper.find(BoldWhiteText)).toHaveText(profileInfo.lastName);
      });
      it('only firstName & undefined', () => {
        profileInfo.lastName = undefined;
        wrapper.setProps({profileInfo});
        expect(wrapper.find(BoldWhiteText)).toHaveText(profileInfo.firstName);
      });
      it('only firstName & empty string', () => {
        profileInfo.lastName = '';
        wrapper.setProps({profileInfo});
        expect(wrapper.find(BoldWhiteText)).toHaveText(profileInfo.firstName);
      });
      it('full name', () => {
        wrapper.setProps({profileInfo});
        expect(wrapper.find(BoldWhiteText)).toHaveText(
          `${profileInfo.firstName} ${profileInfo.lastName}`,
        );
      });
    });
    describe('user info fields', () => {
      beforeEach(() => {
        userInfo = {...USER_MOCKS.USER_INFO};
        wrapper = shallow(
          <ProfileForm
            isLoading={false}
            profileInfo={USER_MOCKS.PROFILE_INFO}
          />,
        );
      });
      it('userInfo is undefined', () => {
        userInfo = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'username'})).not.toExist();
        expect(wrapper.find({testID: 'email'})).not.toExist();
      });

      it('username is undefined', () => {
        userInfo.username = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'username'})).not.toExist();
      });
      it('email is undefined', () => {
        userInfo.email = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'email'})).not.toExist();
      });
    });

    describe('if profile info fields are undefined', () => {
      beforeEach(() => {
        profileInfo = {...USER_MOCKS.PROFILE_INFO};
        wrapper = shallow(
          <ProfileForm isLoading={false} userInfo={USER_MOCKS.USER_INFO} />,
        );
      });
      it('profile is undefined', () => {
        profileInfo = undefined;
        wrapper.setProps({profileInfo});
        expect(wrapper.find(ProfileInfoWrapper)).not.toExist();
      });
      it('phone is undefined', () => {
        profileInfo.phone = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'phone'})).not.toExist();
      });
      it('birthDate is undefined', () => {
        profileInfo.birthDate = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'birthDate'})).not.toExist();
      });
      it('address is undefined', () => {
        profileInfo.address = undefined;
        wrapper.setProps({userInfo});
        expect(wrapper.find({testID: 'address'})).not.toExist();
      });
    });
  });
});
