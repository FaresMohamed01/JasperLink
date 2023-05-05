//Filtering the Results
import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-native';
import ButtonNavBar from '../modules/NavBar';
import { styles } from '../Style';

//Refine is used to filter the username that the user is searching for.
const RefinementList = ({ items, refine }) => {
  return (
    <SafeAreaView style={styles.page}>
        <View>
          {items.map(item => {
              const labelStyle = {
                fontSize: 54,
                fontWeight: item.isRefined ? '800' : '400',
              };
      
          <TouchableOpacity
            key={item.value}
            onPress={() => refine(item.value)}
            style={styles.item}
          >
       
            <ButtonNavBar />

          </TouchableOpacity>
      })}
      
        </View>
    </SafeAreaView>
  )
};

//PropTypes 
const ItemPropType = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

RefinementList.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectRefinementList(RefinementList);
