#!/bin/sh

/usr/sbin/nginx

cd $WEBAPP_HOME
PORT=3000 node server.js &
npm run dev

exec "$@"
