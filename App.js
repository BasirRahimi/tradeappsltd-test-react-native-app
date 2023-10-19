import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllJobs from "./components/screens/AllJobs";
import CreateJob from "./components/screens/CreateJob";
import SingleJob from "./components/screens/SingleJob";
import { Provider } from "react-redux";
import Store from "./Store";
import EditJob from "./components/screens/EditJob";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AllJobs">
                    <Stack.Screen
                        name="AllJobs"
                        component={AllJobs}
                        options={{ title: "All Jobs" }}
                    />
                    <Stack.Screen
                        name="CreateJob"
                        component={CreateJob}
                        options={{ title: "Create a Job" }}
                    />
                    <Stack.Screen
                        name="SingleJob"
                        component={SingleJob}
                        options={{ title: "" }}
                    />
                    <Stack.Screen
                        name="EditJob"
                        component={EditJob}
                        options={{ title: "Edit Job" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
