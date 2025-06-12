import { message } from "antd";
import { Meteor } from "meteor/meteor";

export const errorResponse = (error, defaultMessage) => {
    console.error(error);
    
    if (error.reason) {
        return message.error(error.reason);
    }
    
    if (error.message) {
        return message.error(error.message);
    }
    
    if (defaultMessage) {
        return message.error(defaultMessage);
    }
    
    return message.error("An unexpected error occurred");
};
