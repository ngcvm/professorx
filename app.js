const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
const { FileInstallationStore } = require("@slack/oauth");
const { registerListeners } = require("./listeners");
const { customRoutes } = require('./custom-routes');
const bodyParser = require('body-parser');
require('dotenv').config();
const orgInstall = require("./database/auth/store-user-org-install");
const workspaceAuth = require("./database/auth/store-user-workspace-install");
const db = require("./database/db");
const querystring = require('querystring');
const { sendMessageActionCallback } = require('./listeners/actions/send-message');
const { WebClient } = require('@slack/web-api');

db.connect();

// Initializes your app with your bot token and signing secret
const app = new App({
    logLevel: LogLevel.INFO,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: "horea-is-a-human",
    customRoutes: [
        ...customRoutes,
        {
            path: '/slack/actions',
            method: ['POST'],
            handler: async (req, res) => {
                res.writeHead(200);
                res.end();
            },
        },
    ],
    installerOptions: {
      stateVerification: false,
    },
    installationStore: {
      storeInstallation: async (installation) => {
        console.log('installation: ')
        console.log(installation)
        if (
          installation.isEnterpriseInstall &&
          installation.enterprise !== undefined
        ) {
          return await orgInstall.saveUserOrgInstall(installation);
        }
        if (installation.team !== undefined) {
          return await workspaceAuth.saveUserWorkspaceInstall(installation);
        }
        throw new Error("Failed saving installation data to installationStore");
      },
      fetchInstallation: async (installQuery) => {
        console.log('installQuery')
        console.log(installQuery)
        if (
          installQuery.isEnterpriseInstall &&
          installQuery.enterpriseId !== undefined
        ) {
          return await db.findUser(installQuery.userId);
        }
        if (installQuery.teamId !== undefined) {
          return await db.findUser(installQuery.userId);
        }
        throw new Error("Failed fetching installation");
      },
    },
});

/** Register Listeners */
registerListeners(app);

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();
