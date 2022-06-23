const moment = require('moment');

function formatUserMessage (messageData) {

    return {
        
        sender: messageData.sender, 
        message: messageData.message,
        timeStamp: moment().format('h:mm a')
    }
};

function formatSystemMessage (systemMessage) {

    return {
        message: systemMessage,
    }
};

module.exports = {
    formatUserMessage,
    formatSystemMessage
};