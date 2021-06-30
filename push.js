var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGPm6uxYuRkQvZz-I8N0-fegCISwm3puFFJiezdv2A6xhG8ali4UvMtosRUMpkhU9RNSa0x8BkGAmocQlR7aBtI",
    "privateKey": "br_SXA0OYFrSUqn2NNPyPZxEEONVpDAWBucwJMNAHHY"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fAtbYsNHWT4:APA91bFK9QFOW9rkih2-J0Tz7fVhBYTd-SBv5Smcj4KkEMYEN7oR7XdjUhLvBBiETFisviueHaKvFTwwG6vQ4Sj8mMQIveWM7s4QXMfQ--SIdEKfZ1qnreZNKPX0pCwEY0MQNv3AMh_x",
    "keys": {
        "p256dh": "BOqCVLRmmXoVIxL/1mFz/dnCq+S7FLwakf3fjloWX6enUqDSX+6fCpU2q4++21jOZSfcpX3126zhP/odBtnLB/s=",
        "auth": "5dLeb5jALa12/RpOzuEgoQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '582296914117',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);