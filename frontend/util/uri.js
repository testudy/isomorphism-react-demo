module.exports = {
    param: function encode(object) {
        const keys = Object.keys(object);
        const params = [];
        keys.forEach((key) => {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
        })

        return params.join('&');
    },
};
