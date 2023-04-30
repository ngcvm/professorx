const sendMessageActionCallback = async ({ ack, client, body }) => {
  try {
    console.info('[INFO] Received new sendMessage action', JSON.stringify(body));
    const { actions = [], channel = undefined } = body;
    const action = actions[0];
    const channelId = channel?.id;
    const text = action.value;
    const message = {
        username: "ProfessorX",
        text,
        channel: channelId,
    };
    console.info(`[INFO] Send message on behalf of user "${text}"`);

    await client.chat.postMessage(message);
    await ack();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendMessageActionCallback };
