import { message } from 'antd';

export const success = (textValue) => {
    message.success(textValue);
};

export const errorMessage = (textValue) => {
    message.error(textValue);
};

export const warning = (textValue) => {
    message.warning(textValue);
};