import {  useMutation, useQuery } from '@apollo/client';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import { getApolloClient } from '../App';
import { FetchLatestMessages, FetchMoreMessages, MessagePost } from '../Queries';
import Colors from '../Themes/Colors';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

const ChatView = (props) => {

    const [postMessage] = useMutation(MessagePost)
    const [message, setMessage] = useState('');
    const [failedMessage, setFailedMessage] = useState(null);
    const [readMoreButton, SetReadMoreButton] = useState(true);
    const [moreMessages, setMoreMessages] = useState([]);
    const { getItem, setItem } = useAsyncStorage('@storage_key/message');

    const { loading, error, data, refetch } = useQuery(FetchLatestMessages, {
        variables: {
            channelId: props.chanel
        },
        pollInterval: 2000
    })

    console.log('FetchLatestMessages 2', error)

    useEffect(() => {
        readItemFromStorage()
        return () => {
        };
    }, [])

    useEffect(() => {
        setFailedMessage(null)
    }, [props.user, props.chanel])
    const readItemFromStorage = async () => {
        const item = await getItem();
        setMessage(item);
    };

    const writeItemToStorage = async (msg) => {
        setMessage(msg)
        await setItem(msg);
    };

    const onMessageSend = () => {
        if (message) {
            setMoreMessages([])
            SetReadMoreButton(true)
            postMessage({
                variables: { channelId: props.chanel, text: message, userId: props.user }
            }).then((response) => {
                console.log('rrr response', response)
                writeItemToStorage('')
                setFailedMessage(null)
                refetch()

            }).catch((err) => {
                console.log('rrr response err', err.message)
                setFailedMessage({
                    messageId: Date.now(),
                    text: message,
                    userId: props.user,
                    error: true,
                    datetime: new Date()
                })
            })
        }
    }

    const getNextMessageID = () => {

        if (moreMessages && moreMessages.length > 0) {
            return moreMessages[moreMessages.length - 1].messageId
        } else {
            return data?.fetchLatestMessages[data?.fetchLatestMessages.length - 1].messageId
        }
    }
    const fetchMoreMessagesOnPress = () => {
        getApolloClient().query({
            query: FetchMoreMessages,
            variables: {
                channelId: props.chanel,
                messageId: getNextMessageID(),
                old: true
            }
        }).then((response) => {
            console.log('fetchMoreMessages', response)
            if (response?.data?.fetchMoreMessages) {
                if (moreMessages) {
                    setMoreMessages([...moreMessages, ...response.data.fetchMoreMessages])
                } else {
                    setMoreMessages(response.data.fetchMoreMessages)
                }
                if (response.data.fetchMoreMessages.length < 10) {
                    SetReadMoreButton(false)
                } else {
                    SetReadMoreButton(true)
                }

            }

        }).catch((error) => {
            console.log('fetchMoreMessages error', error)

        })
    }

    return (
        <View style={styles.container}>
            {(loading || !data?.fetchLatestMessages) ? null :
                <FlatList style={styles.list}
                    inverted
                    data={(failedMessage) ?
                        [...[failedMessage], ...data?.fetchLatestMessages]
                        : (moreMessages && moreMessages.length > 0)
                            ? [...data?.fetchLatestMessages, ...moreMessages] : data?.fetchLatestMessages}
                    keyExtractor={(item) => {
                        return item.messageId;
                    }}
                    // onEndReached={ o}
                    renderItem={(message) => {
                        const item = message.item;
                        console.log('renderItem', message);
                        if (item.userId === props.user)
                            return (
                                <RightMessage chanel={props.chanel} sent={message.index === 0} user={props.user} item={item} />
                            )
                        else
                            return (
                                <LeftMessage chanel={props.chanel} user={props.user} item={item} />
                            )

                    }} />}
            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        value={message}
                        placeholder="Write a message..."
                        underlineColorAndroid='transparent'
                        onChangeText={(message) => {
                            writeItemToStorage(message)
                        }} />
                </View>

                <TouchableOpacity style={styles.btnSend} onPress={onMessageSend}>
                    <Image source={{ uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
                </TouchableOpacity>
            </View>
            {(readMoreButton && !loading && data?.fetchLatestMessages && data?.fetchLatestMessages.length > 9) ?
                <View style={styles.readMoreContainer}>
                    <TouchableOpacity style={styles.readMoreContainerButton} onPress={fetchMoreMessagesOnPress}>
                        <Text style={styles.readMoreContainerText}>Read More</Text>
                    </TouchableOpacity>
                </View> : null}
        </View>
    );
}
export default ChatView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        maxHeight: 120,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        backgroundColor: "#00BFFF",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        // height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    readMoreContainer: {
        position: 'absolute'
    },
    readMoreContainerButton: {
        margin: 10,
        padding: 15,
        backgroundColor: '#17a2b8',
        borderRadius: 5
    },
    readMoreContainerText: {
        color: Colors.white
    },
}); 