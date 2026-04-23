# GitHub Repository Setup

## Step 1: Create Repository

1. Go to github.com
2. Create new public repository: `kythera-website`
3. Initialize with README (optional)

## Step 2: Push Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/kythera-website.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Source: GitHub Actions
4. Save

## Step 4: Configure Secrets (if using Google Sheets)

1. Go to Settings > Secrets and variables > Actions
2. Add new repository secrets:
   - `GOOGLE_SERVICE_ACCOUNT`: Paste entire JSON content
   - `GOOGLE_SHEET_ID`: Your sheet ID

## Step 5: Run First Build

1. Go to Actions tab
2. Click "Build and Deploy" workflow
3. Click "Run workflow"
4. Wait for completion (~2 minutes)

## Step 6: Verify Deployment

1. Go to Settings > Pages
2. Check deployed URL
3. Visit your site!

## Custom Domain (kythera.city)

1. Go to Settings > Pages
2. Add custom domain: `kythera.city`
3. Save
4. Follow DNS instructions:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record
5. Wait for SSL certificate (auto-provisioned)
