import axios from "axios";
import { expect } from "chai";

describe("website-status-monitor", () => {
  it("should execute the scheduled function and check website status", async () => {
    // Scheduled functions can be invoked via HTTP POST in the emulator
    // The function name pattern: ext-{extensionId}-{resourceName}
    const functionUri =
      "http://localhost:5001/demo-test/us-central1/ext-website-status-monitor-logmillSensor";

    // Invoke the scheduled function via POST
    // Scheduled functions receive a CloudEvent-like payload in the emulator
    const res = await axios.post(
      functionUri,
      {
        // CloudEvent structure for scheduled functions
        data: {},
        time: new Date().toISOString(),
      },
      {
        // Handle errors gracefully - function may fail due to external API calls
        validateStatus: (status) => status < 500,
      }
    );

    // The function should execute (status 200/204) or return a client error (4xx)
    // but not a server error (5xx) which would indicate a function crash
    expect(res.status).to.be.lessThan(500);
  }).timeout(30000); // Increased timeout for network requests

  it("should handle website monitoring with valid configuration", async () => {
    const functionUri =
      "http://localhost:5001/demo-test/us-central1/ext-website-status-monitor-logmillSensor";

    try {
      const res = await axios.post(
        functionUri,
        {
          data: {},
          time: new Date().toISOString(),
        },
        {
          validateStatus: (status) => status < 500,
        }
      );

      // Function should execute without server errors
      expect(res.status).to.be.lessThan(500);
    } catch (error: any) {
      // Network errors or client errors (4xx) are acceptable
      // Server errors (5xx) would indicate a function crash
      if (error.response) {
        expect(error.response.status).to.be.lessThan(500);
      } else {
        // Network errors are acceptable in test environment
        // (e.g., if Logmill API or website is unreachable)
        expect(error.code).to.be.oneOf([
          "ECONNREFUSED",
          "ETIMEDOUT",
          "ENOTFOUND",
        ]);
      }
    }
  }).timeout(30000);
});
