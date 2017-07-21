'use strict';

const excludedProperties = [
  'realm',
  'username',
  'emailVerified',
];

module.exports = function(Account) {
  Account.disableRemoteMethodByName('prototype.__get__accessTokens');
  Account.disableRemoteMethodByName('prototype.__create__accessTokens');
  Account.disableRemoteMethodByName('prototype.__delete__accessTokens');
  Account.disableRemoteMethodByName('prototype.__findById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__count__accessTokens');

  excludedProperties.forEach((property) => {
    delete Account.definition.rawProperties[property];
  });
};
