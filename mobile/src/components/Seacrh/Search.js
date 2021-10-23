import React from 'react';
import searchIcon from '../../../assets/images/searchIcon.png';
import {SearchBarIcon, SearchBarInput, SearchBarWrapper} from './Search.style';

export const Search = ({placeholder}) => {
  const [value, onChangeText] = React.useState();
  return (
    <SearchBarWrapper>
      <SearchBarIcon source={searchIcon} />
      <SearchBarInput
        placeholder={placeholder}
        editable
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={() => console.log(value)}
      />
    </SearchBarWrapper>
  );
};
