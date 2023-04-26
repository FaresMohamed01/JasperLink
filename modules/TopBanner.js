import React, {useState} from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text, Pressable} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Style';


const TopBanner = () => {
    return(
        <View style = {styles.TopBannerBorder}>
           
                <HamburgerMenu></HamburgerMenu>
            
        </View>

    );
};

const HamburgerMenu = () => {

    const [isShown, setIsShown] = useState(false);

    const toggleMenu = () => {
        setIsShown(!isShown);
    };

    return (
        <View style = {styles.TopBannerBorder}>

            <TouchableOpacity onPress={toggleMenu}>

                <View style={styles.box} >
                <Image
                    source={require('../assets/menuIcon.png')}
                    style={styles.menuIcon}
                />
                </View>

            </TouchableOpacity>

            {isShown && <Menu></Menu>}

        </View>
    );

};

const Menu = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ViewFriends')}>
                <Text style={styles.menuText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Messaging')}>
                <Text style={styles.menuText}>Direct Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
                <Text style={styles.menuText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Bookmarks')}>
                <Text style={styles.menuText}>Bookmarks</Text>
            </TouchableOpacity>
        </View>
    );

};


export default TopBanner;