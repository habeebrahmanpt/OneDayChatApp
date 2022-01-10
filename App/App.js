import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ChatView from './ChatView';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from './Themes/Images';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
    cache: new InMemoryCache()
});
const Drawer = createDrawerNavigator();
const userList = ['Joyse', 'Russell', 'Sam']

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        padding: 20,
    },
    chanelSelect: {
        padding: 10,
        margin: 10
    }
});
const getChanelName = (id) => {

    if (id === '3') {
        return 'LGTM Channel '
    } else if (id === '2') {
        return 'Technology Channel'
    } else {
        return 'General Channel'
    }
}


export const getProfileImage = (id) => {
    if (id === 'Joyse') {
        return Images.profileJoyse;
    } else if (id === 'Russell') {
        return Images.profileRussell;
    } else {
        return Images.profileSam;
    }
}
export const getApolloClient = () => {
    return client
}


const App = () => {
    const [user, setUser] = useState('Joyse');
    const [chanel, setChanel] = useState('1');
    const NavigationDrawerContent = (props) => {
        return (
            <View style={styles.container}>
                {(Platform.OS == 'ios') ?
                    <View style={{ height: 100 }} />
                    : null}
                <Text>1. Choose your user</Text>
                <SelectDropdown
                    data={userList}
                    defaultValue={user}
                    onSelect={setUser}
                    buttonStyle={[styles.chanelSelect, { backgroundColor: '#fff' }]}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
                <Text>2. Choose your Channel</Text>
                <TouchableOpacity style={[styles.chanelSelect, (chanel === '1') ? { backgroundColor: '#fff' } : {}]}
                    onPress={() => setChanel('1')}>
                    <Text>General Channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chanelSelect, (chanel === '2') ? { backgroundColor: '#fff' } : {}]}
                    onPress={() => setChanel('2')}>
                    <Text>Technology Channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.chanelSelect, (chanel === '3') ? { backgroundColor: '#fff' } : {}]}
                    onPress={() => setChanel('3')}>
                    <Text>LGTM Channel </Text>
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <NavigationDrawerContent {...props} />}
                    initialRouteName={'ChatView'}
                    screenOptions={{
                        headerShown: true,
                        drawerPosition: 'left',
                        drawerType: 'back',
                    }}>
                    <Drawer.Screen name={'ChatView'}
                        headerShown={true} options={{
                            title: getChanelName(chanel),
                        }}
                        children={() => <ChatView chanel={chanel} user={user} />}
                    />
                </Drawer.Navigator>
                {(Platform.OS == 'ios') ?
                    <View style={{ height: 20 }} />
                    : null}
            </NavigationContainer>
        </ApolloProvider>
    )
};

export default App