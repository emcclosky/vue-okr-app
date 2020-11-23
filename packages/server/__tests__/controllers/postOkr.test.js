const { postOkr } = require('../../controllers/okr').tests;


describe('postOkr method', () => {
    it('returns 200', async () => {
        function mockOkr() {
            return { save: jest.fn() };
        }
        const mockLogger = { error: jest.fn() };
        const mockpostOkr = postOkr(mockOkr, mockLogger);
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

        await mockpostOkr(mockReq, mockRes);
        expect(returnStatus).toBe(201);
    })

    it('calls mongoose save', async () => {
        const mockSave = {
            save: jest.fn()
        }
        function mockOkr() {
            return mockSave;
        }
        const mockLogger = { error: jest.fn() };
        const mockpostOkr = postOkr(mockOkr, mockLogger);
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

        await mockpostOkr(mockReq, mockRes);
        expect(mockSave.save).toHaveBeenCalled();
    })

    it('status is 500 if error', async () => {
        function mockOkr() {
            return { save: () => { throw new Error('woops')} };
        }
        const mockLogger = { error: jest.fn() };
        const mockpostOkr = postOkr(mockOkr, mockLogger);
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
        await mockpostOkr(mockReq, mockRes);
        expect(returnStatus).toBe(500);
    })

    it('logs error', async () => {
        function mockOkr() {
            return { save: () => { throw new Error('woops')} };
        }
        const mockLogger = { error: jest.fn() };
        const mockpostOkr = postOkr(mockOkr, mockLogger);
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

        await mockpostOkr(mockReq , mockRes);
        expect(mockLogger.error).toHaveBeenCalledWith(new Error('woops'));
    })

    it('sends error message to client', async () => {
        function mockOkr() {
            return { save: () => { throw new Error('woops')} };
        }
        const mockLogger = { error: jest.fn() };
        const mockpostOkr = postOkr(mockOkr, mockLogger);
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

        await mockpostOkr(mockReq, mockRes);
        expect(mockSend.send).toHaveBeenCalledWith('Error in creating Okr');
    })

});