import moment from 'moment';

const format = (timestamp, formatStyle) => {
    if (!timestamp) return '';
    return moment(timestamp).format(formatStyle);
};

export const getDate = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD');
};

export const getTime = (timestamp) => {
    return format(timestamp, 'HH:mm:ss');
};

export const getDateTime = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD HH:mm:ss');
};