import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UserContainer from '../containers/UserContainer';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function NavHeader(props) {

    const User = UserContainer.useContainer();

    function logOut() {
        User.setIsLoggedIn(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.children}
            </Text>
            {
                props.isLoggedIn ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={logOut}
                    >
                        <MaterialCommunityIcons name="logout" size={24} color="black" />
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity> : null
            }
        </View>
    )
}

export default NavHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row'
    },
    buttonText: {
        fontWeight: 'bold'
    }
})
