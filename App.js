import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Views/Authenticate/Login";
import Signup from "./Views/Authenticate/Signup";
import Tab from "./Views/Tabs/Tab";
const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: "none",
					contentStyle: { backgroundColor: 'white' },
				}}
			>
				<Stack.Screen
					name="Home"
					component={Tab}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Signup"
					component={Signup}
					options={{ headerShown: false }}
					/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
