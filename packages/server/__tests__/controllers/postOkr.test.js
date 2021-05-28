const { postOkr } = require("../../controllers/okr").tests;

describe("postOkr method", () => {
  it("returns 200", async () => {
    const mockQuery = jest.fn().mockResolvedValue({ some: "okr" });
    const mockReq = {
      body: {
        objective: "some objective",
        keyResults: ["some key results"],
        okrId: "123",
      },
    };

    let returnStatus;

    const mockRes = {
      sendStatus: (status) => {
        returnStatus = status;
        return {
          status: jest.fn(),
        };
      },
      status: (status) => {
        returnStatus = status;
        return {
          status: jest.fn(),
        };
      },
    };

    await postOkr(mockQuery)(mockReq, mockRes);
    expect(returnStatus).toBe(201);
  });

  it("status is 500 if error", async () => {
    function mockOkr() {
      return {
        save: () => {
          throw new Error("woops");
        },
      };
    }
    const mockLogger = { error: jest.fn() };
    const mockpostOkr = postOkr(mockOkr, mockLogger);
    let returnStatus;

    const mockReq = {
      body: {
        objective: "",
        keyResults: "",
      },
    };

    const mockRes = {
      status: (status) => {
        returnStatus = status;
        return {
          send: jest.fn(),
        };
      },
    };

    await mockpostOkr(mockReq, mockRes);
    expect(returnStatus).toBe(500);
  });

  it("sends error message to client", async () => {
    function mockOkr() {
      return {
        save: () => {
          throw new Error("woops");
        },
      };
    }
    const mockLogger = { error: jest.fn() };
    const mockpostOkr = postOkr(mockOkr, mockLogger);
    const mockSend = { send: jest.fn() };
    const mockReq = {
      body: {
        objective: "",
        keyResults: "",
      },
    };
    const mockRes = {
      status: () => {
        return mockSend;
      },
    };

    await mockpostOkr(mockReq, mockRes);
    expect(mockSend.send).toHaveBeenCalledWith("Error in creating Okr");
  });
});
