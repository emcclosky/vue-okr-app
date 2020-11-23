const { putOkr } = require('../../controllers/okr').tests;


describe('putOkr method', () => {
    it('returns 200', async () => {
        const mockOkr = { findOneAndUpdate: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockputOkr = putOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            body: {
                objective: '',
                keyResults: '',
                okrId: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                }
            }
        };

        await mockputOkr(mockReq, mockRes);
        expect(returnStatus).toBe(200);
    })

    it('findOneAndUpdate called with correct params', async () => {
        const mockOkr = { findOneAndUpdate: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockputOkr = putOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            body: {
                objective: 'some objective',
                keyResults: 'some key results',
                okrId: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                }
            }
        };

        await mockputOkr(mockReq, mockRes);
        expect(mockOkr.findOneAndUpdate).toHaveBeenCalledWith({"_id": "123"}, {"keyResults": "some key results", "objective": "some objective"}, {upsert: true});
    })

    it('status is 500 if error', async () => {
        const mockOkr = { findOneAndUpdate: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockputOkr = putOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            body: {
                objective: '',
                keyResults: ''
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                }
            }
        };
        await mockputOkr(mockReq, mockRes);
        expect(returnStatus).toBe(500);
    })

    it('logs error', async () => {
        const mockOkr = { findOneAndUpdate: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockputOkr = putOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            body: {
                objective: '',
                keyResults: ''
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return {
                    send: jest.fn()
                }
            }
        };

        await mockputOkr(mockReq , mockRes);
        expect(mockLogger.error).toHaveBeenCalledWith(new Error('woops'));
    })

    it('sends error message to client', async () => {
        const mockOkr = { findOneAndUpdate: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockputOkr = putOkr(mockOkr, mockLogger);
        const mockSend = { send: jest.fn() };
        let returnStatus;
        const mockReq = {
            body: {
                objective: '',
                keyResults: ''
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockSend
            }
        };

        await mockputOkr(mockReq, mockRes);
        expect(mockSend.send).toHaveBeenCalledWith('Error in trying to edit Okr');
    })

});