const { deleteOkr } = require("../../controllers/okr").tests;

describe("deleteOkr method", () => {
  it("returns 200", async () => {
    const mockQuery = jest.fn().mockResolvedValue({ some: "okr" });
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

    await deleteOkr(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(200);
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

    await deleteOkr(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(500);
  });

  it("sends error message to client", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("woops"));
    const mockReq = {
      params: {
        okrId: "123",
      },
    };

    const mockSend = jest.fn();

    const mockRes = {
      locals: {
        user_id: "234",
      },
      status: () => {
        return {
          send: mockSend,
          json: jest.fn(),
        };
      },
    };

    await deleteOkr(mockQuery)(mockReq, mockRes);
    expect(mockSend).toHaveBeenCalledWith("Error in trying to delete Okr");
  });
});
