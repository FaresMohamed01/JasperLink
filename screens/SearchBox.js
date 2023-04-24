import React from 'react';
import {View, TextInput} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';

// Search box to be implemented in the search
const SearchBox = ({currentRefinement, refine, navigation}) => {

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'relative',
      }}>
      <Ionic
        name="search"
        style={{
          fontSize: 18,
          opacity: 0.7,
          position: 'absolute',
          zIndex: 1,
          left: 25,
        }}
      />
      <TextInput
      
   
      onChangeText={value => refine(value)}
      value={currentRefinement}
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
          width: '94%',
          backgroundColor: '#EBEBEB',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          padding: 4,
          paddingLeft: 40,
        }}
      />
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};


export default connectSearchBox(SearchBox);

