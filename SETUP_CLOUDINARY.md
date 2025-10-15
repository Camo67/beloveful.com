# Cloudinary Import Setup

## Get Your Cloudinary Credentials

You have several options to get your Cloudinary API credentials:

### Option 1: From Cloudinary Dashboard (Recommended)
1. Go to [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. Sign in to your account
3. Navigate to **Settings** → **API Keys**
4. Copy the following values:
   - **Cloud Name**
   - **API Key** 
   - **API Secret**

### Option 2: From Cloudflare Workers Dashboard
1. Go to [Cloudflare Workers Dashboard](https://dash.cloudflare.com)
2. Select your beloveful-visions worker
3. Go to **Settings** → **Variables**
4. Look for the encrypted variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Setup .env File

Create a `.env` file in your project root:

```bash
# Copy the template and edit with your values
cp .env.template .env

# Edit the file with your actual credentials
nano .env  # or use your preferred editor
```

Your `.env` file should look like:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

## Run the Import

Once your `.env` file is set up with real credentials:

```bash
# Import all images from Cloudinary
node cloudinary-import.cjs
```

This will:
- ✅ Connect to your Cloudinary account
- ✅ Fetch all images organized by country codes (EGY-, CHI-, etc.)
- ✅ Generate an updated `src/lib/data.ts` with all your images
- ✅ Create a backup of your existing data (`data.ts.backup`)
- ✅ Organize images by regions and countries automatically

## Troubleshooting

- **401 Unauthorized**: Check that your credentials are correct
- **Module not found**: Run `npm install dotenv cloudinary`
- **Network errors**: Check your internet connection and Cloudinary service status

## Security

The `.env` file is already ignored by git (in `.gitignore`), so your credentials won't be committed to version control.