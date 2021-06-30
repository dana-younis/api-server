'use strict';

const logger = require('../src/middleware/logger.js');



describe('TEST THE LOGGER ', () => {
    let consoleTest;
    let req = {}
    let res = {}
    let next = jest.fn();


    beforeEach(() => {
        consoleTest = jest.spyOn(console, "log").mockImplementation();
    });


    afterEach(() => {
        consoleTest.mockRestore();
    });


    it('Logs', () => {
        logger(req, res, next);
        expect(consoleTest).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

});