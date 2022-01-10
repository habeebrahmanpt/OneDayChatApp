import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getProfileImage } from '../App';
import Colors from '../Themes/Colors';
import Images from '../Themes/Images';
import DateUtils from '../Utils/DateUtils';




const RightMessage = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{DateUtils.toTimeOnly(props.item.datetime)}</Text>
            {(props.item.error) ?
                <View style={styles.chatMessageStatusView}>
                    <Image style={styles.chatMessageStatusImage} source={Images.error} />
                    <Text style={styles.chatMessageStatusText}>Error</Text>
                </View> : (props.sent) ?
                    <View style={styles.chatMessageStatusView}>
                        <Text style={styles.chatMessageStatusText}> Send</Text>
                    </View> : null}
            <View style={styles.chatMessageView}>
                <Text style={styles.chatMessageText}>{props.item.text}</Text>
            </View>

            <View >
                <Image style={styles.profileImage} source={getProfileImage(props.item.userId)} />
                <Text style={styles.name}>{props.user}</Text>
            </View>
        </View>
    )
}
export default RightMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        marginTop: 15,
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
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
        marginEnd: 6,
        borderRadius: 10,
        padding: 10
    },
    chatMessageText: {
        fontSize: 14,
        color: "#212529",
    },
    chatMessageStatusView: {
        flexDirection: 'row'
    },
    chatMessageStatusText: {
        fontSize: 9,
        marginTop: 15,
        marginEnd: 5,
        color: Colors.green,

    },
    chatMessageStatusImage: {
        marginTop: 15,
        marginEnd: 5,
        width: 12,
        height: 12
    },
});