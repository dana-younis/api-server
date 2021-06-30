'use strict';

module.exports = (req, res, next) => {
    console.log('REQUEST METHOD: ', req.method, "PATH: ", req.path);
    next();
}