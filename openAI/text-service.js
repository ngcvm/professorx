import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
    apiKey: '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',
}));

const indentifyEmotion = async (conversation, participants) => {
    const conversationPrompt = `Classify emotion of people in this conversation:
    ${conversation}
    Show emotion of each one from the conversation above`;
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: conversationPrompt,
        temperature: 0,
        max_tokens: 20,
    });
    
    const rawResult = response.data.choices[0].text.split('\n').filter(x => x.length > 0);
    let results = {};
    participants.forEach(name => {
        results[name] = rawResult.find(x => x.includes(name))?.replace(`${name}:`, '')?.trim();
    });
    return results;
}
export default { indentifyEmotion };