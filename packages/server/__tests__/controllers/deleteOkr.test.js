const { deleteOkr } = require('../../controllers/okr').tests;


describe('deleteOkr method', () => {
    it('returns 200', async () => {
        const mockOkr = { findByIdAndDelete: jest.fn(), find: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
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

        await mockdeleteOkr(mockReq, mockRes);
        expect(returnStatus).toBe(200);
    })

    it('findByIfAndDelete called with correct params', async () => {
        const mockOkr = { findByIdAndDelete: jest.fn(), find: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
                okrId: '123'
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

        await mockdeleteOkr(mockReq, mockRes);
        expect(mockOkr.findByIdAndDelete).toHaveBeenCalledWith("123");
    })

    it('find called', async () => {
        const mockOkr = { findByIdAndDelete: jest.fn(), find: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
                okrId: '123'
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

        await mockdeleteOkr(mockReq, mockRes);
        expect(mockOkr.find).toHaveBeenCalled();
    })

    it('status is 500 if error', async () => {
        const mockOkr = { findByIdAndDelete: () => { throw new Error('woops')}, find: jest.fn() };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
                okrId: '123'
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
        await mockdeleteOkr(mockReq, mockRes);
        expect(returnStatus).toBe(500);
    })

    it('logs error', async () => {
        const mockOkr = { findByIdAndDelete: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
        let returnStatus;
        const mockReq = {
            params: {
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

        await mockdeleteOkr(mockReq , mockRes);
        expect(mockLogger.error).toHaveBeenCalledWith(new Error('woops'));
    })

    it('sends error message to client', async () => {
        const mockOkr = { findByIdAndDelete: () => { throw new Error('woops')} };
        const mockLogger = { error: jest.fn() };
        const mockdeleteOkr = deleteOkr(mockOkr, mockLogger);
        const mockSend = { send: jest.fn() };
        let returnStatus;
        const mockReq = {
            params: {
                okrId: '123'
            }
        }
        const mockRes = {
            status: (status) => {
                returnStatus = status;
                return mockSend
            }
        };


        await mockdeleteOkr(mockReq, mockRes);
        expect(mockSend.send).toHaveBeenCalledWith('Error in trying to delete Okr');
    })

});