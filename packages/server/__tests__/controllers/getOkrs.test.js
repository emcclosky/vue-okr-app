const { getOkrs } = require('../../controllers/okr').tests;

describe('getOkrs method', () => {
    it('returns 200', async () => {
        const mockOkr = { find: jest.fn() };
        const mockLogger = jest.fn();
        const mockGetOkrs = getOkrs(mockOkr, mockLogger);
        let returnStatus;

        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    json: jest.fn()
                }
            }
        };

        await mockGetOkrs(undefined, mockRes);
        expect(returnStatus).toBe(200);
    })

    it('calls express\'s JSON', async () => {
        const mockOkr = { find: jest.fn() };
        const mockLogger = jest.fn();
        const mockGetOkrs = getOkrs(mockOkr, mockLogger);
        let returnStatus;
        const mockJson = { json: jest.fn() };
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockJson;
            }
        };

        await mockGetOkrs(undefined, mockRes);
        expect(mockJson.json).toHaveBeenCalled();
    })

    it('status is 500 if error', async () => {
        const mockOkr = { find: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockGetOkrs = getOkrs(mockOkr, mockLogger);
        let returnStatus;
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                };
            }
        };

        await mockGetOkrs(undefined, mockRes);
        expect(returnStatus).toBe(500);
    })

    it('logs error', async () => {
        const mockOkr = { find: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockGetOkrs = getOkrs(mockOkr, mockLogger);
        let returnStatus;
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                };
            }
        };

        await mockGetOkrs(undefined, mockRes);
        expect(mockLogger.error).toHaveBeenCalledWith(new Error('woops'));
    })

    it('sends error message to client', async () => {
        const mockOkr = { find: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockGetOkrs = getOkrs(mockOkr, mockLogger);
        const mockSend = { send: jest.fn() };
        let returnStatus;
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockSend;
            }
        };

        await mockGetOkrs(undefined, mockRes);
        expect(mockSend.send).toHaveBeenCalledWith('Error in trying to retrieve Okrs');
    })

});