const { getOkr } = require("../../controllers/okr").tests;

describe("getOkr method", () => {
  it("returns 200", async () => {
    const mockQuery = jest.fn().mockResolvedValue({ some: "okr" });
    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    let returnStatus;

    const mockRes = {
      status: (status) => {
        returnStatus = status;
        return {
          send: jest.fn(),
          json: jest.fn(),
        };
      },
    };

    await getOkr(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(200);
  });

  it("calls express's JSON", async () => {
    const mockQuery = jest.fn().mockResolvedValue({ some: "okr" });
    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    mockJson = jest.fn();
    const mockRes = {
      status: () => {
        return {
          send: jest.fn(),
          json: mockJson,
        };
      },
    };

    await getOkr(mockQuery)(mockReq, mockRes);
    expect(mockJson).toHaveBeenCalled();
  });

  it("status is 500 if error", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("woops"));
    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    let returnStatus;

    const mockRes = {
      status: (status) => {
        returnStatus = status;
        return {
          send: jest.fn(),
        };
      },
    };

    await getOkr(mockQuery)(mockReq, mockRes);

    expect(returnStatus).toBe(500);
  });

  it("throws error properly", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("woops"));
    const mockReq = {
      params: {
        okrId: "123",
      },
    };
    const mockRes = {
      status: () => {
        return {
          send: jest.fn(),
        };
      },
    };

    try {
      getOkr(mockQuery)(mockReq, mockRes);
    } catch (err) {
      expect(err).toBe(new Error("woops"));
    }
  });

  it("sends error message to client", async () => {
    const mockOkr = {
      findById: () => {
        throw new Error("woops");
      },
    };
    const mockLogger = { error: jest.fn() };
    const mockgetOkr = getOkr(mockOkr, mockLogger);
    const mockSend = { send: jest.fn() };
    let returnStatus;
    const mockReq = {
      params: {
        id: "123",
      },
    };
    const mockRes = {
      status: (status) => {
        returnStatus = status;
        return mockSend;
      },
    };

    await mockgetOkr(mockReq, mockRes);
    expect(mockSend.send).toHaveBeenCalledWith(
      "Error in trying to retrieve Okr"
    );
  });
});
