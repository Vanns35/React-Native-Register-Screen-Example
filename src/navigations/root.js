import React, {  useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

import Auth from '../screens/auth';
import Main from '../screens/main';
import Loading from '../screens/loading';

import { AuthContext } from '../utilities/authContext';
import { StateContext } from '../utilities/stateContext';
import { reducer, initialState } from '../utilities/reducer';

const Navigation = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let UserData;
            try {
                UserData = await AsyncStorage.getItem('UserData');
            } catch (e) {
            }
            dispatch({ type: 'RESTORE_TOKEN', UserData: UserData });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', UserData: data.UserData });
            },
            signOut: () => {
                dispatch({ type: 'SIGN_OUT' })
            },
        }),
        []
    );

    if (state.isLoading) {
        return (
            <AuthContext.Provider value={authContext}>
                <StateContext.Provider value={state}>
                    <Loading />
                </StateContext.Provider>
            </AuthContext.Provider>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <StateContext.Provider value={state}>
                <NavigationContainer>
                    {state.UserData == null || state.UserData == '' ?
                        <Stack.Navigator headerMode="screen" mode="card"
                            screenOptions={() => ({
                                ...TransitionPresets.SlideFromRightIOS,
                                headerBackTitleVisible: false
                            })}
                        >
                            <Stack.Screen name="auth" component={Auth}
                                options={
                                    {
                                        headerShown: false,
                                    }}
                            />
                        </Stack.Navigator>
                        :
                        <Stack.Navigator headerMode="screen" mode="card"
                            screenOptions={() => ({
                                ...TransitionPresets.SlideFromRightIOS,
                                headerBackTitleVisible: false
                            })} >
                            <Stack.Screen name="main" component={Main}
                                options={
                                    {
                                        headerShown: false,
                                    }} />
                        </Stack.Navigator>
                    }

                </NavigationContainer>
            </StateContext.Provider>
        </AuthContext.Provider>
    );
}

export default Navigation;