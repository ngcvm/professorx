## Emotion Prediction Slack App
This Slack app listens for incoming messages and predicts their emotion based on their text using a pre-trained machine learning model. The predicted emotion is then shared with the message receiver along with some example responses.

### Requirements
1. A Slack workspace with admin access to install the app.
2. Node.js and npm installed on your local machine.
3. Using a tool which could expose your local server to the Internet: ngrok, ...
4. A MongoDB database.
5. A pre-trained machine learning model for emotion prediction.
### Installation
1. Clone this repository to your local machine.
2. Create a MONGODB database.
3. In your Slack workspace, create a new app with the manifest content as this project (you can find this file at `<root_folder>/manifest.json`). Please note to change urls in the manifest file to your correct domain (ngrok).
4. Create a .env file in the root of the cloned repository and set the following environment variables:
```
PORT=3000
SLACK_BOT_TOKEN=
SLACK_USER_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```
5. Install the dependencies using the following command:
```
npm install
```
6. Start the app using the following command:
```
npm start
(npm run dev #for development)
```
7. Install the app in your Slack workspace using the Install App button in the App Home section of your app's settings.
### Usage
- Send a message to any channel or user in your Slack workspace.
- The app will predict the emotion of the message and respond with an example response.
### Built With
- Slack API - The messaging platform used.
- Node.js - The JavaScript runtime used.
- Bolt for JavaScript - The Slack app framework used.
### License
This project is licensed under the MIT License - see the LICENSE.md file for details.