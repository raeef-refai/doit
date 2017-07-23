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

  Account.disableRemoteMethodByName('prototype.__findById__markers');
  Account.disableRemoteMethodByName('prototype.__delete__markers');
  Account.disableRemoteMethodByName('prototype.__updateById__markers');
  Account.disableRemoteMethodByName('prototype.__destroyById__markers');
  Account.disableRemoteMethodByName('prototype.__count__markers');

  excludedProperties.forEach((property) => {
    delete Account.definition.rawProperties[property];
  });

  Account.prototype.deleteMarkers = function(ids, next) {
    this.markers.destroyAll({
      id: {
        inq: ids,
      },
    }, next);
  };
};
