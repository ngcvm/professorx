const model = require('../db');
const saveUserWorkspaceInstall = async function(installation) {
  const resp = await model.User.updateOne(
      {_id: installation.user?.id || installation.bot?.id},
      {
        team: {id: installation.team.id, name: installation.team.name},
        // entperise id is null on workspace install
        enterprise: {id: 'null', name: 'null'},
        // user scopes + token is null on workspace install
        user: {
          scopes: installation.user?.scopes,
          token: installation.user?.token,
          id: installation.user?.id,
        },
        tokenType: installation.tokenType,
        isEnterpriseInstall: installation.isEnterpriseInstall,
        appId: installation.appId,
        authVersion: installation.authVersion,
        bot: {
          scopes: installation.user?.scopes,
          token: installation.user?.token,
          userId: installation.user?.userId,
          id: installation.user?.id,
        },
      },
      {upsert: true},
  );
  return resp;
};
module.exports = {saveUserWorkspaceInstall};