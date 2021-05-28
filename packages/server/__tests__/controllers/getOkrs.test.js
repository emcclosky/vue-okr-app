const { getOkrs } = require("../../controllers/okr").tests;

describe("getOkrs method", () => {
  it("returns 200", async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValue([
        { key_results: { indexOf: jest.fn() } },
        { key_results: { indexOf: jest.fn() } },
      ]);
    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    let returnStatus;

    const mockRes = {
      locals: {
        user_id: "234",
      },
      status: (status) => {
        returnStatus = status;
        return {
          send: jest.fn(),
          json: jest.fn(),
        };
      },
    };

    await getOkrs(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(200);
  });

  it("calls express's JSON", async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValue([
        { key_results: { indexOf: jest.fn() } },
        { key_results: { indexOf: jest.fn() } },
      ]);

    const mockReq = {
      params: {
        okrId: "123",
      },
    };
    const mockJson = jest.fn();
    const mockRes = {
      locals: {
        user_id: "234",
      },
      status: () => {
        return {
          send: jest.fn(),
          json: mockJson,
        };
      },
    };

    await getOkrs(mockQuery)(mockReq, mockRes);
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
      locals: {
        user_id: "234",
      },
      status: (status) => {
        returnStatus = status;
        return {
          send: jest.fn(),
          json: jest.fn(),
        };
      },
    };

    await getOkrs(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(500);
  });

  it("sends error message to client", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("woops"));

    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    const mockSend = { send: jest.fn() };

    const mockRes = {
      locals: {
        user_id: "234",
      },
      status: (status) => {
        returnStatus = status;
        return mockSend;
      },
    };

    await getOkrs(mockQuery)(mockReq, mockRes);

    expect(mockSend.send).toHaveBeenCalledWith(
      "Error in trying to retrieve Okrs"
    );
  });
});
