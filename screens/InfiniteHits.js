import React from 'react';
import { View, FlatList, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { styles } from '../Style';
import { useNavigation } from '@react-navigation/native';


const InfiniteHits = ({ hits, hasMore, refineNext, route, navigation}) => {
  
    navigation = useNavigation()

    return (
      //Create A FlatList with all information. item.objectID is fetched from the Algolia database.
      // Afterwards, the username are displayed in the search page and each username are pressable to the SearchProfiles.js
      <FlatList
            data={hits}
            keyExtractor={item => item.objectID}
            ItemSeparatorComponent={() => <View style={styles.page} />}
            onEndReached={() => hasMore && refineNext()}
            renderItem={({ item }) => (
                  
                <View style={styles.item}>
      
      <TouchableOpacity
          onPress={() =>navigation.navigate('SearchProfiles')}
      >
       
       <Text>{item.Username}</Text> 
       <Text>{item.Email}</Text> 
       
               </TouchableOpacity>
                </View>
            )}
        />
    )
    
}
//PropTypes for hits, hasmore, refinenext.
InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits (InfiniteHits);