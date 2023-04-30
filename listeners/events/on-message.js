const { WebClient } = require("@slack/web-api");
const { buildBlocks } = require("../blocks");

const onMessage = async ({ client, event, context }) => {
  try {
    // Only support private direct message now
    if (event.channel_type === "im") {
      const { receiverId = undefined } = context;
      const incomingMessage = event.text;
      console.info("[INFO] Received this message: ", incomingMessage);

      const channelId = event.channel;
      console.info("[INFO] Sending message to channel: ", channelId);

      // Prepare predict on user emotional
      // code here

      // Build result message and suggestion response message.
      const messageBlocks = buildBlocks({
        predictionMessage:
          "He/She seems to be angry at the moment. Plese watch your words.",
        issueDate: new Date(),
        suggestionResponses: [
          {
            text: "Hey, I appreciate that you're reaching out. Is everything okay? I'm here if you need to talk.",
            actionName: "send_message",
          },
          {
            text: "Hi! Is there anything I can do to help? I'm here to support you.",
            actionName: "send_message",
          },
          {
            text: "Hi there. I'm getting the sense that something might be bothering you. Is there anything you'd like to talk about?",
            actionName: "send_message",
          },
        ],
      });

      const message = {
        username: "ProfessorX",
        text: "This message is only visible to one user",
        blocks: messageBlocks,
        user: receiverId,
        channel: channelId,
      };

      console.info("[INFO] Sending message payload: ", JSON.stringify(message));

      // Send the message using the user token
      await client.chat.postEphemeral(message);
      console.log("[INFO] Done");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { onMessage };
