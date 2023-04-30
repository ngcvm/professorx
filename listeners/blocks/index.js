const buildBlocks = ({
  predictionMessage = "N/A",
  suggestionResponses = [],
  issueDate = new Date(),
}) => {
  const predictionBlocks = buildPredictionBlocks(predictionMessage, issueDate);
  const suggestionBlocks = buildSuggestionBlocks(suggestionResponses);
  return [
    ...predictionBlocks,
    {
      type: "divider",
    },
    ...suggestionBlocks,
  ];
};

const buildPredictionBlocks = (predictionMessage, issueDate) => {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Prediction",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Emotion:*\n${predictionMessage}`,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Time:*\n${issueDate?.toLocaleString()}`,
        },
        {
          type: "mrkdwn",
          text: "*Created by:*\nProfessorX",
        },
      ],
    },
  ];
};

const buildSuggestionBlocks = (suggestionResponses) => {
  const suggestionBlocks = suggestionResponses
    ?.sort(((a,b) => a?.text?.length - b?.text?.length))
    ?.reduce((acc, o) => {
      acc.push(
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: o.text,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Send",
              },
              style: "primary",
              value: o.text,
              "action_id": o.actionName
            },
          ],
        }
      );
      return acc;
    }, []);
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Suggestions on response",
        emoji: true,
      },
    },
    ...suggestionBlocks,
  ];
};

module.exports.buildBlocks = buildBlocks;
