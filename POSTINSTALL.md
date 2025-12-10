# Installation Complete!

Your Website Status Monitor extension has been successfully installed and configured.

## What's Next?

### 1. Verify Installation

The extension is now monitoring your website at the configured interval. To verify it's working:

1. Check your Firebase Console > Functions to see the deployed `logmillSensor` function
2. Check Cloud Scheduler to confirm the schedule is active
3. Wait for the first execution and check the function logs
4. Verify in your Logmill dashboard that sensor data is being received

### 2. Monitor Function Logs

View logs in the Firebase Console:

```
Firebase Console > Functions > logmillSensor > Logs
```

Successful logs will show:

```
Website https://your-site.com is online (Status: 200) — Logmill updated
```

If your website is down, you'll see:

```
Website https://your-site.com is offline — logging DOWN
Critical error reported to Logmill
```

### 3. Configure Logmill Alerts

In your Logmill dashboard, set up alerts to notify you when critical errors are detected:

1. Go to your Logmill project
2. Create alert rules for `CriticalError` sensor type
3. Configure notification channels (email, Slack, etc.)

### 4. Testing

To test the extension manually:

1. Go to Firebase Console > Functions
2. Find the `logmillSensor` function
3. Click "Test function" to trigger an immediate execution
4. Check logs and Logmill dashboard for results

### 5. Reconfigure (if needed)

To change any settings:

1. Go to Firebase Console > Extensions
2. Find "Website Status Monitor"
3. Click "Reconfigure extension"
4. Update parameters as needed

## Monitoring Best Practices

- **Check Interval**: Start with 5-10 minutes. Reduce if you need faster alerts, but be mindful of costs
- **Timeout**: Set to 5-10 seconds for most websites. Increase for slower sites
- **Multiple Sites**: Install the extension multiple times (with different names) to monitor multiple websites

## Troubleshooting

### Function not executing

- Verify Cloud Scheduler is enabled in your project
- Check that billing is enabled (required for Cloud Scheduler)
- Review function logs for errors

### Logmill not receiving data

- Verify your Logmill API key is correct
- Check that the key format is: `apiKey|secret|https://api.logmill.io/v1`
- Ensure your Logmill account is active

### False positive alerts

- Increase the timeout value if your website is slow to respond
- Check if your website has rate limiting that might block the checks

## Need Help?

- **Documentation**: See the [extension README](https://github.com/janstrbik/WebsiteStatusMonitor)
- **Issues**: Report bugs on [GitHub](https://github.com/janstrbik/WebsiteStatusMonitor/issues)
- **Firebase Support**: [Firebase Support Center](https://firebase.google.com/support)

## Costs

Monitor your usage in Firebase Console > Usage and Billing to ensure you stay within expected costs.

---

Thank you for installing Website Status Monitor! Your website monitoring is now active. 🎉
