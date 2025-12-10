# Website Status Monitor with Logmill

## Overview

This extension monitors your website's availability and automatically reports the status to Logmill. It sends regular health checks at configurable intervals and alerts you through Logmill when your website goes down.

## Features

- **Automated Monitoring**: Checks your website at regular intervals (1-60 minutes)
- **Logmill Integration**: Automatically reports operational status and critical errors
- **Configurable**: Set your own check intervals, timeouts, and environments
- **Lightweight**: Minimal resource usage with efficient scheduled checks

## Prerequisites

Before installing this extension, make sure you have:

1. **Logmill Account**: You need an active Logmill account with API credentials
2. **Firebase Project**: A Firebase project with billing enabled (Cloud Scheduler requires billing)
3. **Website to Monitor**: A publicly accessible website URL

## How It Works

1. The extension creates a scheduled Cloud Function that runs at your specified interval
2. Each run checks if your website is accessible
3. If the website responds successfully, it reports an "Operational" status to Logmill
4. If the website fails to respond or returns an error, it reports a "Critical Error" to Logmill

## Billing

This extension uses the following Firebase services which may have associated charges:

- **Cloud Functions**: Scheduled function executions
- **Cloud Scheduler**: Triggering the function at intervals

The Firebase free tier includes:

- 2 million function invocations per month
- 3 Cloud Scheduler jobs per month

For a 5-minute interval check, you'll use approximately:

- 8,640 function invocations per month (well within free tier)
- 1 Cloud Scheduler job

Learn more about [Firebase pricing](https://firebase.google.com/pricing)

## Configuration Parameters

You'll need to provide:

- **Website URL**: The full URL of the website to monitor (e.g., https://example.com)
- **Logmill API Key**: Your Logmill credentials in format: `apiKey|secret|endpoint`
- **Environment**: Environment name for Logmill (e.g., LIVE, DEV, STAGING)
- **Check Interval**: How often to check (1 minute to 1 hour)
- **Timeout**: How long to wait for website response (in milliseconds)

## Support

For issues or questions:

- Logmill support: [Logmill Documentation](https://logmill.io)
- Firebase support: [Firebase Support](https://firebase.google.com/support)
