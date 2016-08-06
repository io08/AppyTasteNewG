var response = function (status, message, data , response) {
    return { status : status , errMessage: message , data: data , response: response };
};
module.exports = response;