import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Details, Search} from '../screens';
import {StatusBar} from 'expo-status-bar';

const Stack = createStackNavigator();

export default () => (
	<NavigationContainer>
		<StatusBar style='auto' />
		<Stack.Navigator
			initialRouteName='Search'
			screenOptions={{headerShown: false}}>
			<Stack.Screen name='Search' component={Search} />
			<Stack.Screen name='Details' component={Details} />
		</Stack.Navigator>
	</NavigationContainer>
);
