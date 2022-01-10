import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getProfileImage } from '../App';
import DateUtils from '../Utils/DateUtils';

const LeftMessage = (props) => {

    return (
        <View style={styles.container}>
            <View >
                <Image style={styles.profileImage} source={getProfileImage(props.item.userId)} />
                <Text style={styles.name}>{props.item.userId}</Text>
            </View>
            <View style={styles.chatMessageView}>
                <Text style={styles.chatMessageText}>{props.item.text}</Text>

            </View>
            <Text style={styles.time}>{DateUtils.toTimeOnly(props.item.datetime)}</Text>
        </View>
    )
}
export default LeftMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        marginTop: 15,
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'flex-start'
    },
    name: {
        color: "#999999",
    },
    profileImage: {
        width: 40,
        height: 40
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 300,
        padding: 5,
    },
    time: {
        margin: 10,
        fontSize: 14,
        color: "#212529",
    },
    chatMessageView: {
        maxWidth: '80%',
        minHeight: 30,
        backgroundColor: '#fff',
        marginStart: 6,
        borderRadius: 10,
        padding: 10
    },
    chatMessageText: {
        fontSize: 14,
        color: "#212529",
    }
});