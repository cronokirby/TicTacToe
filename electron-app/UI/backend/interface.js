/*This module exports functions relating to API calls with the backend */

const host = 'http://127.0.0.1:8080';

exports.post = function postToBackend(path, postData, callback) {
    $.ajax({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        url:      host + path,
        type:     'POST',
        data:     JSON.stringify(postData),
        dataType: 'json',
        success: callback
    });
};
