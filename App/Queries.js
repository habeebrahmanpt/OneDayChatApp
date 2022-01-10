import { gql } from '@apollo/client';
export const MessagePost = gql`
    mutation ($channelId:String!,$text:String!,$userId:String!){
        postMessage (channelId:$channelId,text:$text,userId:$userId){
        messageId,
        text,
        datetime,
        userId
    }
    }
`;

export const FetchLatestMessages = gql`
    query (
        $channelId:String!
    ) {
    fetchLatestMessages(channelId:$channelId){
        messageId ,
        text,
        userId,
        datetime
    }
    }
`;

export const FetchMoreMessages = gql`
    query (
        $channelId:String!,
        $messageId: String!,
        $old: Boolean!
    ) {
        fetchMoreMessages(channelId:$channelId,messageId:$messageId,old:$old){
        messageId ,
        text,
        userId,
        datetime
    }
    }
`;
