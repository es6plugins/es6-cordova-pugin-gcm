/**
 * Created by hyq on 2016/7/14.
 */

var onNotification = function (notification) {
    console.log('Event Received: ' + notification);
};

export default function (senderId, uuid, callback) {
    if (window.GcmPushPlugin !== undefined) {
        window.GcmPushPlugin.register(function (result) {
            let params = {};
            let update = {
                token: result.gcm
            };
            let query = {
                deviceId: uuid,
                deviceType: 'android'
            };
            params.query = JSON.stringify(query);
            params.update = JSON.stringify(update);
            console.log(result.gcm);
            if (callback) {
                callback(params);
            }else {
                return Promise.resolve(params);
            }
        }, function (error) {
            console.log('Error: ' + error);
        }, {
            'senderId': senderId,
            'jsCallback': 'onNotification'
        });
    }
};
