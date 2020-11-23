const { getOkr } = require('../../controllers/okr').tests;

describe('getOkr method', () => {
    it('returns 200', async () => {
        const mockOkr = { findById: jest.fn() };
        const mockLogger = jest.fn();
        const mockgetOkr = getOkr(mockOkr, mockLogger);
        let returnStatus;

        const mockReq = {
            params: {
                id: '123'
            }
        }

        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    json: jest.fn()
                }
            }
        };

        await mockgetOkr(mockReq, mockRes);
        expect(returnStatus).toBe(200);
    })

    it('calls express\'s JSON', async () => {
        const mockOkr = { findById: jest.fn() };
        const mockLogger = jest.fn();
        const mockgetOkr = getOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockJson = { json: jest.fn() };
        const mockReq = {
            params: {
                id: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockJson;
            }
        };

        await mockgetOkr(mockReq, mockRes);
        expect(mockJson.json).toHaveBeenCalled();
    })

    it('status is 500 if error', async () => {
        const mockOkr = { findById: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockgetOkr = getOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
                id: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                };
            }
        };

        await mockgetOkr(mockReq, mockRes);
        expect(returnStatus).toBe(500);
    })

    it('logs error', async () => {
        const mockOkr = { findById: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockgetOkr = getOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
                id: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                };
            }
        };

        await mockgetOkr(mockReq , mockRes);
        expect(mockLogger.error).toHaveBeenCalledWith(new Error('woops'));
    })

    it('sends error message to client', async () => {
        const mockOkr = { findById: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockgetOkr = getOkr(mockOkr, mockLogger);
        const mockSend = { send: jest.fn() };
        let returnStatus;
        const mockReq = {
            params: {
                id: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockSend;
            }
        };

        await mockgetOkr(mockReq, mockRes);
        expect(mockSend.send).toHaveBeenCalledWith('Error in trying to retrieve Okr');
    })

});