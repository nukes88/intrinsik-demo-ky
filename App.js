import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserContainer from './containers/UserContainer';

import Home from './screens/Home';
import Login from './screens/Login';
import NavHeader from './components/NavHeader';
import DayWeather from './screens/DayWeather';


function AppWithContainer() {
	return (
		<UserContainer.Provider>
			<App />
		</UserContainer.Provider>
	)
}

function App() {

	const Stack = createStackNavigator();
	const User = UserContainer.useContainer();

	useEffect(() => {
		async function getSavedUserInfo() {
			await User.getSavedUserInfo();
		}
		getSavedUserInfo();
	}, [])


	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitle: props => <NavHeader {...props} isLoggedIn={User.isLoggedIn} />
				}}
			>
				{
					User.isLoggedIn ? <>
						<Stack.Screen name="Home" component={Home} />
						<Stack.Screen name="DayWeather" component={DayWeather} />
					</> : <>
							<Stack.Screen name="Login" component={Login} />
						</>
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppWithContainer;

