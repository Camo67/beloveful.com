# Welcome to beloveful.com

## Project info

**URL**: www.beloveful.com

## Project Structure

```
beloveful.com/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and data
│   │   ├── cloudinary-assets/  # Cloudinary asset data and JSON files
│   │   ├── portolio/   # Portfolio data (note: typo in directory name)
│   │   └── generated/  # Generated data files
│   └── pages/          # Page components
├── functions/          # Cloudflare Workers functions
└── server/             # Server routes
```

## How can I edit this code?
vscode Next.js

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_bash: /home/camo/snap/code-insiders/2129/.local/share/../bin/env: No such file or directory
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ npm run images:serve

> vite_react_shadcn_ts@0.0.0 images:serve
> node server/images.cjs

Could not load project data modules, falling back to sample image lists: Must use import to load ES Module: /home/camo/new/beloveful.com/src/lib/data.ts
require() of ES modules is not supported.
require() of /home/camo/new/beloveful.com/src/lib/data.ts from /home/camo/new/beloveful.com/server/images.cjs is an ES module file as it is a .ts file whose nearest parent package.json contains "type": "module" which defines all .ts files in that package scope as ES modules.
Instead change the requiring code to use import(), or remove "type": "module" from /home/camo/new/beloveful.com/package.json.

Images API running on http://localhost:4001
^C
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ curl -sS http://localhost:4001/api/travel-images | jq -r '. | length, .[0] // "(none)"'
curl: (7) Failed to connect to localhost port 4001 after 0 ms: Could not connect to server
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ printf '--- /api/travel-images ---\n'; curl -sS http://localhost:4001/api/travel-images || true; printf '\n--- /api/project-images ---\n'; curl -sS http://localhost:4001/api/project-images || true; printf '\n--- /api/logos ---\n'; curl -sS http://localhost:4001/api/logos || true;
bash: printf: --: invalid option
printf: usage: printf [-v var] format [arguments]
curl: (7) Failed to connect to localhost port 4001 after 0 ms: Could not connect to server

--- /api/project-images ---
curl: (7) Failed to connect to localhost port 4001 after 0 ms: Could not connect to server

--- /api/logos ---
curl: (7) Failed to connect to localhost port 4001 after 0 ms: Could not connect to server
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ nohup node server/images.cjs > /tmp/images-server.log 2>&1 & echo $!
[1] 600094
600094
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ ls -la /tmp | sed -n '1,120p'
total 48
drwxrwxrwt 53 root root 2200 Oct 21 07:43 .
drwxr-xr-x 20 root root 4096 Oct 19 00:22 ..
-rw-------  1 root root  134 Oct 21 07:38 anacron-XgviEk
-rw-rw-r--  1 camo camo    2 Oct 21 01:28 \auto.json
drwxrwxr-x  2 camo camo   40 Oct 21 01:05 aws-toolkit-vscode
drwx------  2 camo camo   60 Oct 21 07:07 azcp-8863f983fdab
drwx------  2 camo camo   60 Oct 20 16:37 c3-wrangler-deploy-8s2kxZ
drwx------  2 camo camo   60 Oct 20 16:49 c3-wrangler-deploy-vCH00w
drwx------  2 camo camo   60 Oct 20 20:36 c3-wrangler-init--from-dash-BtBNmQ
drwx------  2 camo camo   60 Oct 21 00:59 cloudcode-tempkZkQbZ
drwx------  2 camo camo   60 Oct 21 00:59 cloudcode-tempLg5oi1
drwx------  2 camo camo   60 Oct 21 00:59 cloudcode-tempoGlCb1
drwx------  2 camo camo   60 Oct 21 00:59 cloudcode-tempW2y4M1
prwx------  1 camo camo    0 Oct 21 07:07 clr-debug-pipe-594380-6855696-in
prwx------  1 camo camo    0 Oct 21 07:07 clr-debug-pipe-594380-6855696-out
prwx------  1 camo camo    0 Oct 21 07:07 clr-debug-pipe-594382-6855699-in
prwx------  1 camo camo    0 Oct 21 07:07 clr-debug-pipe-594382-6855699-out
srwxrwxr-x  1 camo camo    0 Oct 20 12:04 code-417755f2-f362-46f7-be87-65c956a2f7d4
srwxrwxr-x  1 camo camo    0 Oct 20 12:04 code-542627e1-5404-46ce-b619-e68c69b16758
drwx------  2 camo camo   40 Oct 21 03:07 .com.google.Chrome.01iCvu
drwx------  2 camo camo   40 Oct 20 22:07 .com.google.Chrome.9C2ddR
drwx------  2 camo camo   40 Oct 20 16:53 .com.google.Chrome.bmY8iV
drwx------  2 camo camo   40 Oct 21 01:05 .com.google.Chrome.DHErE2
drwx------  2 camo camo   60 Oct 20 12:06 .com.google.Chrome.gqzDKt
drwx------  2 camo camo   40 Oct 20 22:07 .com.google.Chrome.Kklc7u
drwx------  2 camo camo   40 Oct 21 01:06 .com.google.Chrome.MdIlWP
drwx------  2 camo camo   80 Oct 20 12:05 .com.google.Chrome.SVlR99
drwx------  2 camo camo   40 Oct 21 03:07 .com.google.Chrome.tRzu8K
drwxrwxr-x  2 camo camo   80 Oct 21 01:20 dedwewfweft32fsdaaaaaafaaaawfewfe
srw-------  1 camo camo    0 Oct 21 07:07 dotnet-diagnostic-594380-6855696-socket
srw-------  1 camo camo    0 Oct 21 07:07 dotnet-diagnostic-594382-6855699-socket
drwxrwxr-x  2 camo camo  100 Oct 21 01:20 EXP-140880SDCEFEF-YURI-SDD-DALVA-EXFOLDERSAS-EDSDS
drwxrwxrwt  2 root root   40 Oct 20 12:04 .font-unix
drwx------  2 camo camo   60 Oct 21 00:58 gkinstall386605984
drwxrwxrwt  2 root root   60 Oct 20 12:04 .ICE-unix
-rw-rw-r--  1 camo camo  664 Oct 21 07:42 images-server.log
drwxrwxr-x  5 camo camo  100 Oct 21 00:58 node-compile-cache
-rw-rw-r--  1 camo camo 3182 Oct 21 00:58 postman-collections-post-response.instructions.md
-rw-rw-r--  1 camo camo 3029 Oct 21 00:58 postman-collections-pre-request.instructions.md
-rw-rw-r--  1 camo camo 3182 Oct 21 00:58 postman-folder-post-response.instructions.md
-rw-rw-r--  1 camo camo 3029 Oct 21 00:58 postman-folder-pre-request.instructions.md
-rw-rw-r--  1 camo camo 3512 Oct 21 00:58 postman-http-request-post-response.instructions.md
-rw-rw-r--  1 camo camo 3530 Oct 21 00:58 postman-http-request-pre-request.instructions.md
drwxrwxr-x  2 camo camo   40 Oct 21 01:16 python-languageserver-cancellation
drwxrwxr-x  3 camo camo   60 Oct 21 00:58 remote-file-71752ccfe2464e99
drwx------  9 root root  180 Oct 20 15:00 snap-private-tmp
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-bluetooth.service-qHbzct
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-colord.service-exnNtC
drwx------  3 root root   60 Oct 20 12:23 systemd-private-702b1eb6f4b647629a0cce0d338b6117-fwupd.service-iTVVKU
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-ModemManager.service-uR5gvu
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-polkit.service-Ymklxy
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-power-profiles-daemon.service-RZUIa5
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-switcheroo-control.service-ZsxT0L
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-systemd-logind.service-A6NaNr
drwx------  3 root root   60 Oct 20 12:04 systemd-private-702b1eb6f4b647629a0cce0d338b6117-upower.service-5RDPhO
drwxrwxr-x  2 camo camo   60 Oct 21 00:59 tmp
-rw-------  1 camo camo    0 Oct 20 21:10 tmp.4gYJlkByVo
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.52KUZmOMnt
-rw-------  1 camo camo    0 Oct 20 22:06 tmp.68lDtYsj5o
-rw-------  1 camo camo    0 Oct 20 18:38 tmp.6fcEbpQHfr
drwx------  2 camo camo   40 Oct 21 05:22 tmp.7rZCCmtAdI
-rw-------  1 camo camo    0 Oct 20 22:06 tmp.9b105vrgAx
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.9uaPIYcHME
-rw-------  1 camo camo    0 Oct 20 23:33 tmp.9WXryHf9sp
-rw-------  1 camo camo    0 Oct 20 17:47 tmp.ADX8oBacH3
drwxrwxr-x  2 camo camo   80 Oct 21 06:37 .tmpBiE8eH
-rw-------  1 camo camo    0 Oct 20 22:52 tmp.ejwNFpBz2h
drwxrwxr-x  2 camo camo   80 Oct 21 00:58 .tmpFBdTLV
-rw-------  1 camo camo    0 Oct 20 23:31 tmp.FYcaN6RBSC
-rw-------  1 camo camo    0 Oct 21 00:42 tmp.gpf3fdlSBu
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.hHTpjxHgxA
-rw-------  1 camo camo    0 Oct 20 18:38 tmp.HnBf1viBrs
-rw-------  1 camo camo    0 Oct 20 21:02 tmp.JL1IXzVq6b
-rw-------  1 camo camo    0 Oct 21 00:42 tmp.kL1qyQ2uOy
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.KtUuTIFhPF
-rw-------  1 camo camo    0 Oct 20 20:47 tmp.kX1CJdPq8w
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.L9hrtvCKKK
-rw-------  1 camo camo    0 Oct 20 23:33 tmp.mE5iaMvRxv
-rw-------  1 camo camo    0 Oct 20 16:57 tmp.mH4vyaYPPu
-rw-------  1 camo camo    0 Oct 21 00:12 tmp.odfzwlEkSr
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.Om1yJKsaq7
-rw-------  1 camo camo    0 Oct 20 12:48 tmp.PBedPqMWk9
-rw-------  1 camo camo    0 Oct 21 00:17 tmp.QG2aZPBKso
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.QijTLESL1T
-rw-------  1 camo camo    0 Oct 20 16:57 tmp.QylTJunRBA
-rw-------  1 camo camo    0 Oct 21 00:12 tmp.R2Y9Qa0I9h
-rw-------  1 camo camo    0 Oct 20 21:10 tmp.TgdGwbqiyd
-rw-------  1 camo camo    0 Oct 21 00:17 tmp.Tleowgwdt1
-rw-------  1 camo camo    0 Oct 20 20:47 tmp.U5zzwMTzkB
-rw-------  1 camo camo    0 Oct 20 22:52 tmp.V6paVHV8qU
-rw-------  1 camo camo    0 Oct 20 21:08 tmp.WL1xgPjzrU
-rw-------  1 camo camo    0 Oct 20 23:31 tmp.y8LfFEpG9z
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.y9SPRDX1sw
-rw-------  1 camo camo    0 Oct 20 17:47 tmp.Yfoqdzw1xn
-rw-------  1 camo camo    0 Oct 21 01:27 tmp.YGGmP2zNmy
-rw-------  1 camo camo    0 Oct 20 12:48 tmp.z2DqYZtjfb
-rw-------  1 camo camo    0 Oct 20 21:02 tmp.ZnmBeaCu7j
drwxrwxr-x  2 camo camo   60 Oct 20 16:28 update-check
drwxrwxr-x  4 camo camo   80 Oct 21 07:40 v8-compile-cache-1000
drwxrwxr-x  2 camo camo   60 Oct 21 07:07 vscode-azure-github-copilot
drwxrwxr-x  2 camo camo   80 Oct 21 00:58 vscode-skaffold-events-logs
drwxrwxr-x  3 camo camo   60 Oct 21 01:39 vscode-typescript1000
drwxrwxr-x  2 camo camo   80 Oct 21 01:16 VSLiveshareLogs
-r--r--r--  1 camo camo   11 Oct 20 12:04 .X0-lock
drwxrwxrwt  2 root root   80 Oct 20 12:04 .X11-unix
-r--r--r--  1 camo camo   11 Oct 20 12:04 .X1-lock
drwxrwxrwt  2 root root   40 Oct 20 12:04 .XIM-unix
drwxrwxr-x  2 camo camo   40 Oct 21 01:20 xvba_code_debug_parsed
drwxrwxr-x  2 camo camo   40 Oct 21 01:20 xvba_immediate
drwxrwxr-x  2 camo camo   60 Oct 21 01:20 xvba_log
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ tail -n 200 /tmp/images-server.log || true
nohup: ignoring input
Could not load project data modules, falling back to sample image lists: Must use import to load ES Module: /home/camo/new/beloveful.com/src/lib/data.ts
require() of ES modules is not supported.
require() of /home/camo/new/beloveful.com/src/lib/data.ts from /home/camo/new/beloveful.com/server/images.cjs is an ES module file as it is a .ts file whose nearest parent package.json contains "type": "module" which defines all .ts files in that package scope as ES modules.
Instead change the requiring code to use import(), or remove "type": "module" from /home/camo/new/beloveful.com/package.json.

Images API running on http://localhost:4001
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ curl -sS http://localhost:4001/api/travel-images | jq -r '. | length, .[0] // "(none)"'
3
https://picsum.photos/id/1018/1200/800
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ curl -sS http://localhost:4001/api/project-images | jq -r '. | length, .[0] // "(none)"'
2
https://picsum.photos/id/1050/1200/800
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ curl -sS http://localhost:4001/api/logos | jq -r '. | length, .[0] // "(none)"'
2
https://picsum.photos/id/237/400/400
camo@camo-HP-ProDesk-600-G3-MT:~/new/beloveful.com$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
npm run dev
[sudo] password for camo: 
fs.inotify.max_user_watches=524288
fs.inotify.max_user_watches = 524288

> vite_react_shadcn_ts@0.0.0 dev
> vite


  VITE v6.4.1  ready in 249 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.18.3:8080/
  ➜  Network: http://172.17.0.1:8080/
  ➜  press h + enter to show help
Error:   Failed to scan for dependencies from entries:
  /home/camo/new/beloveful.com/debug-icons.html
/home/camo/new/beloveful.com/index.html

  ✘ [ERROR] No matching export in "src/components/Slideshow.tsx" for import "Slideshow"

    src/pages/Index.tsx:2:9:
      2 │ import { Slideshow } from "@/components/Slideshow";
        ╵          ~~~~~~~~~


    at failureErrorWithLog (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:1467:15)
    at /home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:926:25
    at runOnEndCallbacks (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:1307:45)
    at buildResponseToResult (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:924:7)
    at /home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:936:9
    at new Promise (<anonymous>)
    at requestCallbacks.on-end (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:935:54)
    at handleRequest (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:628:17)
    at handleIncomingPacket (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:653:7)
    at Socket.readFromStdout (/home/camo/new/beloveful.com/node_modules/esbuild/lib/main.js:581:7)
    URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS



Simply open (https://beloveful.com) and click on Share -> Publish.



## Accessing JSON Assets

This project includes JSON asset files in two main directories:
1. `src/lib/cloudinary-assets/` - Contains Cloudinary asset data
2. `src/lib/portolio/` - Contains portfolio data (note the typo in the directory name)

### API Routes

JSON assets can be accessed through the following API routes:

1. Cloudinary assets: `/api/content/assets/cloudinary-assets/*`
   - Example: `/api/content/assets/cloudinary-assets/index.json`
   - Example: `/api/content/assets/cloudinary-assets/Africa/Egypt/urls.json`

2. Portfolio assets: `/api/content/assets/portolio/*`
   - Example: `/api/content/assets/portolio/Africa/urls.json`

3. Main Cloudinary index: `/api/content/assets/cloudinary-assets.json`

### Frontend Usage

To access these assets from the frontend, you can use the utility functions in `src/lib/assetLoader.ts`:

```typescript
import { loadCloudinaryIndex, loadCloudinaryAsset, loadPortfolioAsset } from '@/lib/assetLoader';

// Load the main cloudinary index
const index = await loadCloudinaryIndex();

// Load a specific cloudinary asset
const assetData = await loadCloudinaryAsset('Africa/Egypt/urls.json');

// Load a specific portfolio asset
const portfolioData = await loadPortfolioAsset('Africa/urls.json');
```

Example component using these utilities can be found in `src/components/AssetExample.tsx`.

const cloudinary = require('cloudinary').v2;
// (Optional) cloudinary.config({ cloud_name: 'your-cloud-name' });
const url = cloudinary.url('docs/casual', {
  transformation: { width: 500, height: 500, crop: 'fill', fetch_format: 'auto', quality: 'auto' }
});
