import React from 'react';
import {StyleSheet, View, TouchableOpacity,Text, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Style';

const TopHeaderBar = ({navigation}) => {
  return (
    <View style = {styles.Top_Header_Bar_Border}>

        <Image style={styles.Jasper_left_image}
            source={require('../assets/Jasper_logo.png')}>
        </Image>

        <Text style = {styles.Top_Header_Bar_Text}>
            JasperLink
        </Text>

        <Image style={styles.Jasper_right_image}
            source={require('../assets/Jasper_logo.png')}>
        </Image>

    </View>
  )
}

export default TopHeaderBar