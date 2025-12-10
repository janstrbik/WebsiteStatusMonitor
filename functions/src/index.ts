import * as functions from "firebase-functions/v2";
import axios from "axios";
import { eCodeLanguage, eSensorType } from "./enums";
import { LogmillSensor } from "./interfaces";

export const logmillSensor = functions.scheduler.onSchedule(
  {
    schedule: process.env.SCHEDULE_INTERVAL || "every 5 minutes",
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async () => {
    const websiteUrl = process.env.WEBSITE_URL;
    const logmillKey = process.env.LOGMILL_KEY;
    const environment = process.env.ENVIRONMENT || "LIVE";
    const timeoutMs = parseInt(process.env.TIMEOUT_MS || "5000", 10);

    if (!websiteUrl) {
      console.error("WEBSITE_URL is not configured");
      return;
    }

    if (!logmillKey) {
      console.error("LOGMILL_KEY is not configured");
      return;
    }

    // Parse Logmill credentials
    const [apiKey, secret, endpoint] = logmillKey.split("|");
    const logmillEndpoint = endpoint || "https://api.logmill.io/v1";
    const credentials = `${apiKey}|${secret}|${logmillEndpoint}`;

    const basePayload: Omit<LogmillSensor, "SensorType"> = {
      SensorName: "Web Status Sensor",
      Environment: environment,
      Language: eCodeLanguage.JS,
      Version: "1.0.0",
      DateCreated: new Date().toISOString(),
    };

    try {
      // Check website availability
      const response = await axios.get(websiteUrl, {
        timeout: timeoutMs,
        validateStatus: (status) => status < 500, // Accept 4xx as "online"
      });

      // Report operational status to Logmill
      await axios.post(
        `${logmillEndpoint}/sensor`,
        {
          ...basePayload,
          SensorType: eSensorType.Operational,
        } as LogmillSensor,
        {
          headers: {
            "Content-Type": "application/json",
            "LM-Credentials": credentials,
          },
        }
      );

      console.log(
        `Website ${websiteUrl} is online (Status: ${response.status}) — Logmill updated`
      );
    } catch (err) {
      const error = err as Error;
      console.error(
        `Website ${websiteUrl} is offline — logging DOWN`,
        error.message
      );

      // Report critical error to Logmill
      try {
        await axios.post(
          `${logmillEndpoint}/sensor`,
          {
            ...basePayload,
            SensorType: eSensorType.CriticalError,
          } as LogmillSensor,
          {
            headers: {
              "Content-Type": "application/json",
              "LM-Credentials": credentials,
            },
          }
        );
        console.log("Critical error reported to Logmill");
      } catch (logmillError) {
        console.error("Failed to report to Logmill:", logmillError);
      }
    }
  }
);
