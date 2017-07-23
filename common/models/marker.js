'use strict';

module.exports = function(Marker) {
  Marker.beforeRemote('create', (ctx, instance, next) => {
    const data = ctx.args.data;

    const accountId = ctx.req.accessToken.userId;

    if (data.length) {
      data.forEach((marker) => {
        marker.accountId = accountId;
      });
    } else {
      data.accountId = accountId;
    }

    next();
  });

  Marker.beforeRemote('find', (ctx, obj, next) => {
    const filter = ctx.args.filter || {};

    if (!filter.where) {
      filter.where = {};
    }

    filter.where.accountId = ctx.req.accessToken.userId;

    ctx.args.filter = filter;

    next();
  });
};
