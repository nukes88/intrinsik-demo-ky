import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import UserContainer from '../containers/UserContainer';



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
                    <Button
                        onPress={logOut}
                        title="Logout"
                    /> : null
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
    }
})
