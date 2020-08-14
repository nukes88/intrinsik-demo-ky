import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';

import * as Facebook from 'expo-facebook';
import UserContainer from '../containers/UserContainer';
import { facebookAppId, mainStyle } from '../Config';
import HeaderText from '../components/HeaderText';

function Login() {

    let [error, setError] = useState();
    let [allGood, setAllGood] = useState(false);
    let [username, setUsername] = useState('');
    let [loading, setLoading] = useState(false);

    const User = UserContainer.useContainer();

    async function facebookLogin() {
        try {
            setLoading(true)
            setError(null);
            await Facebook.initializeAsync(facebookAppId);
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                User.setFacebookToken(token);
                let res = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
                let pRes = await res.json();
                if (pRes.name) {
                    User.setUsername(pRes.name);
                    setAllGood(true)
                } else {
                    setError('No name')
                }
            } else {
                setError('Something went wrong logging in to facebook.')
            }
        } catch ({ message }) {
            setError(`Facebook Login Error: ${message}`)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert(
                'Login Error',
                error.toString(),
                [
                    {
                        text: 'OK',
                        onPress: () => { }
                    }
                ]
            )
        }
    }, [error])

    useEffect(() => {
        let saveData = async () => {
            await User.saveUserInfo();
            User.setIsLoggedIn(true);
        }
        if (allGood === true) {
            saveData();
        }
    }, [allGood])

    function normalLogin() {
        User.setUsername(username);
        setAllGood(true);
    }

    return (
        <SafeAreaView style={[mainStyle.bg, styles.container]}>
            <View style={styles.normalLogin}>
                <HeaderText text="Normal Login" />
                <View style={styles.nameView}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.nameTextInput}
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                </View>
                {
                    loading ? <ActivityIndicator size="large" /> : <Button
                        onPress={normalLogin}
                        title="Normal Login"
                    />
                }
            </View>
            {
                loading ? <ActivityIndicator size="large" /> : <Button
                    onPress={facebookLogin}
                    title="Facebook Login"
                />
            }
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    normalLogin: {
        padding: 10,
        borderRadius: 2,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 10
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    nameTextInput: {
        borderColor: 'grey',
        borderBottomWidth: 2,
        height: 40,
        marginLeft: 2,
        flex: 1
    }
})