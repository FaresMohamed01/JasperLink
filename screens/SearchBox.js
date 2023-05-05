//Search Box Page implementing the search box that has search functionalities
import React from 'react';
import {View, TextInput} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';

// Search box to be implemented in the search
const SearchBox = ({currentRefinement, refine}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 19,
        position: 'relative',
      }}>

      <Ionic
        name="search"
        style={{
          position: 'absolute',
          zIndex: 4,
          left: 25,
        }}
      />

      <TextInput
        onChangeText={value => refine(value)}
        value={currentRefinement}
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
          width: '95%',
          backgroundColor: 'white',
          borderRadius: 26,
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

//Proptypes for the search box
SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};


export default connectSearchBox(SearchBox);

