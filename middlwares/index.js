require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const db = require("../database/db");

module.exports.messageContext = async ({ client, event, context, next }) => {
    try {
        if (event.channel_type === 'im') {
            const receiverUserId = event.user;
            const receiverUserToken = await client.auth
            .test({ token: context.botToken })
            .then((result) =>
                client.users
                .info({ token: result.access_token, user: receiverUserId })
                .then((result) => result.user.access_token)
            );
            context.receiverUserToken = receiverUserToken;
            const senderId = event.user;
            const result = await client.conversations.members({
                channel: event.channel,
            });
            const receiverId = result.members.filter(x => x !== senderId)[0];
            context.result = result;
            context.botToken = process.env.SLACK_BOT_TOKEN;
            context.senderId = senderId;
            context.receiverId = receiverId;
            context.botUserToken = process.env.SLACK_USER_TOKEN;

            const receiverInfo = await db.findUser(receiverId);
            context.receiverInfo = receiverInfo;
        }
        
        // Call the next function to continue processing the event
        await next();
    } catch (error) {
        console.error(error);
    }
  };