# Website Status Monitor with Logmill

A Firebase Extension that automatically monitors your website's availability and reports status to Logmill at configurable intervals.

## 🚀 Features

- **Automated Website Monitoring**: Regular health checks of your website
- **Logmill Integration**: Automatic status reporting to your Logmill dashboard
- **Configurable Intervals**: Check every 1-60 minutes based on your needs
- **Real-time Alerts**: Get notified through Logmill when your site goes down
- **Easy Setup**: Install and configure in minutes through Firebase Console

## 📋 Prerequisites

- Firebase project with billing enabled (Cloud Scheduler requires billing)
- Active Logmill account with API credentials
- Publicly accessible website to monitor

## 🔧 Installation

### Via Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Extensions** in the left menu
4. Click **Install Extension**
5. Search for "Website Status Monitor"
6. Follow the configuration prompts

### Via Firebase CLI

```bash
firebase ext:install your-publisher-id/website-status-monitor --project=your-project-id
```

## ⚙️ Configuration

During installation, you'll configure:

| Parameter          | Description          | Example                                  |
| ------------------ | -------------------- | ---------------------------------------- |
| **Website URL**    | URL to monitor       | `https://example.com`                    |
| **Logmill Key**    | API credentials      | `key\|secret\|https://api.logmill.io/v1` |
| **Environment**    | Environment name     | `LIVE`, `DEV`, `STAGING`                 |
| **Check Interval** | How often to check   | Every 5 minutes                          |
| **Timeout**        | Request timeout (ms) | `5000`                                   |

## 📊 How It Works

1. **Scheduled Check**: Cloud Function runs at your configured interval
2. **Website Request**: Makes HTTP request to your website
3. **Status Report**:
   - ✅ **Online**: Reports `Operational` status to Logmill
   - ❌ **Offline**: Reports `CriticalError` status to Logmill
4. **Logmill Alerts**: Configure alerts in Logmill to get notified

## 📝 Usage

### View Logs

Check function execution logs:

```bash
firebase functions:log --only logmillSensor
```

Or in Firebase Console: **Functions > logmillSensor > Logs**

### Test Manually

Trigger an immediate check:

1. Go to Firebase Console > Functions
2. Click on `logmillSensor`
3. Click "Test function"

### Monitor Multiple Websites

Install the extension multiple times with different configurations to monitor multiple websites.

## 🔍 Monitoring & Alerts

### In Firebase Console

- **Functions Dashboard**: View execution count and errors
- **Cloud Scheduler**: Verify schedule is active
- **Logs**: Check detailed execution logs

### In Logmill Dashboard

1. View real-time sensor data
2. Create alert rules for `CriticalError` events
3. Configure notifications (email, Slack, webhook, etc.)

## 💰 Pricing

This extension uses:

- **Cloud Functions** (2M free invocations/month)
- **Cloud Scheduler** (3 free jobs/month)

**Example cost** (5-minute intervals):

- ~8,640 invocations/month (well within free tier)
- 1 scheduler job (within free tier)

**Cost estimate**: $0/month for most use cases

[Learn more about Firebase pricing](https://firebase.google.com/pricing)

## 🛠️ Troubleshooting

### Extension not running

**Problem**: Function not executing

- ✅ Verify billing is enabled
- ✅ Check Cloud Scheduler is active
- ✅ Review function logs for errors

### Logmill not receiving data

**Problem**: No data in Logmill dashboard

- ✅ Verify API key format: `key|secret|endpoint`
- ✅ Check Logmill account is active
- ✅ Review function logs for API errors

### False alerts

**Problem**: Getting offline alerts when site is up

- ✅ Increase timeout value (slow sites need more time)
- ✅ Check if site has rate limiting
- ✅ Verify URL is correct and publicly accessible

## 🔐 Security

- API keys are stored as Firebase secrets (encrypted)
- Function runs with minimal required permissions
- All communication over HTTPS

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/janstrbik/WebsiteStatusMonitor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/janstrbik/WebsiteStatusMonitor/discussions)
- **Firebase Support**: [Firebase Support Center](https://firebase.google.com/support)

## 📄 License

Apache-2.0 License - see [LICENSE](LICENSE) file for details
