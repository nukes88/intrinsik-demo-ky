import React, { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { appPrefix } from '../config';
import AsyncStorage from '@react-native-community/async-storage';

function useUser() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [username, setUsername] = useState('');
    let [facebookToken, setFacebookToken] = useState();

    const sUsername = `${appPrefix}username`;
    const sFacebookToken = `${appPrefix}facebookToken`;

    async function getSavedUserInfo() {
        try {
            let _username = await AsyncStorage.getItem(sUsername);
            let _token = await AsyncStorage.getItem(sFacebookToken);
            setUsername(_username);
            setFacebookToken(_token);
            if (_username) {
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.error('get saved error', e)
        }
    }

    async function saveUserInfo() {
        try {
            console.log('attempting to store', username, facebookToken);
            await AsyncStorage.setItem(sUsername, username)
            if (facebookToken) {
                await AsyncStorage.setItem(sFacebookToken, facebookToken)
            }
        } catch (e) {
            console.error('save user info error', e)
        }
    }

    return {
        isLoggedIn, setIsLoggedIn,
        username, setUsername,
        facebookToken, setFacebookToken,
        saveUserInfo,
        getSavedUserInfo
    }
}
const UserContainer = createContainer(useUser)
export default UserContainer;