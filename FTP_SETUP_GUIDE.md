# Bluehost FTP Setup Guide

This guide will help you configure FTP access to your Bluehost server for the admin panel's image scanning functionality.

## Quick Start

1. **Copy the template file:**
   ```bash
   cp .env.local.template .env.local
   ```

2. **Edit `.env.local` and fill in your Bluehost FTP credentials**

3. **Test the connection:**
   ```bash
   node test-ftp-connection.js
   ```

## Getting Your Bluehost FTP Credentials

### Method 1: From cPanel

1. Log in to your Bluehost cPanel at `https://yourdomain.com/cpanel`
2. Navigate to **Files > FTP Accounts**
3. Find your FTP account or create a new one
4. Note down:
   - **Username**: Usually looks like `username@domain.com` or just `username`
   - **Password**: If you don't know it, click "Change Password"
   - **Host**: Can be your domain name or the server IP (e.g., `67.222.38.79`)

### Method 2: From Welcome Email

Check your Bluehost welcome email for:
- FTP Host/IP address
- FTP Username
- Initial FTP Password

## Configuration Fields

### Required Settings

```env
CPANEL_FTP_HOST=67.222.38.79          # Your Bluehost server IP or domain
CPANEL_FTP_PORT=21                     # Standard FTP port (use 22 for SFTP)
CPANEL_FTP_USER=belovefu              # Your FTP username
CPANEL_FTP_PASSWORD=your_password_here # Your FTP password
CPANEL_FTP_ROOT=/public_html/beloveful.com/public_html/images
CPANEL_FTP_SECURE=false               # Set to 'true' if using FTPS
```

### Optional Settings

```env
# For SFTP (more secure):
CPANEL_SFTP_PORT=22
CPANEL_SFTP_PRIVATE_KEY_PATH=~/.ssh/id_rsa
CPANEL_SFTP_PASSPHRASE=your_key_passphrase

# Or SFTP with password:
CPANEL_SFTP_PASSWORD=your_sftp_password
```

## Troubleshooting

### Error: "Missing FTP credentials"

**Solution:** Make sure you've set these three variables in `.env.local`:
- `CPANEL_FTP_HOST`
- `CPANEL_FTP_USER`
- `CPANEL_FTP_PASSWORD`

### Error: "Connection refused" or "ETIMEDOUT"

**Possible causes:**
1. Wrong host or port
2. Firewall blocking the connection
3. Bluehost blocking your IP

**Solutions:**
- Verify the host is correct (try both IP and domain name)
- Check if port 21 is open on your network
- Contact Bluehost support to ensure your IP isn't blocked
- Try connecting with FileZilla first to verify credentials work

### Error: "Authentication failed" or "530 Login incorrect"

**Solution:**
1. Double-check your username and password
2. Reset the FTP password in cPanel > FTP Accounts
3. Ensure you're using the full username (sometimes needs `@domain.com`)

### Error: "No such file or directory" for FTP_ROOT

**Solution:**
- The path should be relative to your FTP root, not the server root
- Try `/public_html/images` or `/images` instead
- Use an FTP client to browse and find the correct path

## Testing Your Connection

Run the diagnostic script:

```bash
node test-ftp-connection.js
```

This will:
- Check if credentials are set
- Attempt to connect to the FTP server
- List directories and verify access
- Provide detailed error messages if something fails

## Using the Admin Panel

Once configured:

1. Start your dev server: `npm run dev`
2. Navigate to Admin Panel > Images > Upload Images
3. Click **"Scan Bluehost FTP"** button
4. The system will scan your FTP server and populate image paths
5. Review and import the paths into your database

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env.local` to version control
- Keep your FTP password secure
- Consider using SFTP (port 22) instead of FTP for encrypted connections
- Regularly rotate your FTP passwords
- Use separate FTP accounts with limited permissions if possible

## Alternative: Manual Path Entry

If FTP doesn't work, you can manually enter image paths in the admin panel:

```
/Website beloveful.com/Africa/Egypt/photo1.jpg
/Website beloveful.com/Asia/Japan/photo2.jpg
```

The system will automatically detect the region and country from the path structure.

## Need Help?

If you're still having issues:
1. Run `node test-ftp-connection.js` and share the output
2. Check that you can connect using FileZilla or another FTP client
3. Verify your credentials in Bluehost cPanel
4. Contact Bluehost support if the server seems unreachable
