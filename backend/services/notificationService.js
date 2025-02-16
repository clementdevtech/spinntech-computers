const { Notification } = require('../models');

exports.sendNotification = async (userId, message) => {
    try {
        await Notification.create({ userId, message, status: 'unread' });
        console.log(`🔔 Notification sent to user ${userId}`);
    } catch (error) {
        console.error("Notification error:", error.message);
    }
};
