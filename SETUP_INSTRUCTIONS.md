# Registration Form Setup Guide

## Overview
This guide will help you set up the complete registration form with Google Sheets integration.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Create new spreadsheet"**
3. Name it: `Registration Data` (or any name you prefer)
4. You can leave it empty - the script will create the headers automatically

---

## Step 2: Get Your Google Sheet ID

1. **Open your Google Sheet** (the one you created in Step 1)
2. Look at the URL in your browser - it will look like:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9ijklmno/edit
   ```
3. **Copy the ID** between `/d/` and `/edit` - in this example: `1a2b3c4d5e6f7g8h9ijklmno`
4. **Save this ID** - you'll need it in the next step

---

## Step 3: Create Google Apps Script

1. **Open your Google Sheet**
2. Click **Extensions** → **Apps Script**
3. A new tab will open with the Apps Script editor
4. **Delete** the default code in `Code.gs`
5. **Copy and paste** the entire content from `google-apps-script.js` file
6. **Find this line:**
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   ```
7. **Replace `YOUR_SPREADSHEET_ID`** with the ID you copied in Step 2
8. Click **Save** (Ctrl+S)

---

## Step 4: Deploy the Script

1. In the Apps Script editor, click **Deploy** (top right)
2. Click **"New deployment"**
3. In the dropdown, select **Type** → **Web app**
4. Configure the deployment:
   - **Execute as:** Your Google account (dropdown)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Review the permissions popup and click **"Authorize access"**
7. **Copy the deployment URL** - You'll need this in the next step

   The URL will look like:
   ```
   https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercallback
   ```

---

## Step 5: Update the HTML Form

1. Open `registration-form.html` in a text editor
2. Find this line (around line 170):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercallback';
   ```
3. **Replace `YOUR_SCRIPT_ID`** with the actual script ID from the deployment URL (from Step 4)
4. Save the file

---

## Step 6: Test the Form

### Option A: Open Locally
1. Double-click the `registration-form.html` file to open it in your browser
2. Fill in the form:
   - **Username:** (3-20 characters, letters/numbers/underscores only)
   - **Password:** (6+ characters)
3. Click **Register**
4. You should see: **"✓ Registration Successful!"**

### Option B: Use a Local Server (Recommended)
```bash
# If you have Python installed:
python -m http.server 8000

# Then open in browser:
http://localhost:8000/registration-form.html
```

---

## Step 7: Verify Data in Google Sheets

1. Go back to your Google Sheet
2. You should see a new sheet named **"Registrations"**
3. The data will be stored in 3 columns:
   - **Column A:** Username
   - **Column B:** Password
   - **Column C:** Timestamp

The header row will have a purple background and bold text.

---

## Form Features

### Validation
- ✓ Username must be 3-20 characters
- ✓ Username can only contain letters, numbers, and underscores
- ✓ Password must be 6+ characters
- ✓ Password strength indicator (visual bar)
- ✓ Prevents duplicate usernames

### User Experience
- ✓ Real-time validation feedback
- ✓ Success/Failure messages
- ✓ Loading spinner during submission
- ✓ Beautiful gradient background
- ✓ Responsive design (works on mobile)
- ✓ Input field color changes based on validation status

---

## Troubleshooting

### Issue: "✗ Registration Failed: Error: TypeError: Cannot read properties of null"
**Solution:** 
- ⚠️ **This means you didn't add the SPREADSHEET_ID!**
- Go back to Step 3 and make sure you:
  1. Copied your Google Sheet ID correctly
  2. Replaced `YOUR_SPREADSHEET_ID` in the script with your actual ID
  3. Clicked **Save** after editing the script
  4. Redeployed the script (click Deploy → select the existing deployment → Update)

### Issue: "✗ Registration Failed: Error: Permission denied"
**Solution:**
- The Apps Script doesn't have permission to access your Google Sheet
- Go to the Apps Script and click **Run** → grant the required permissions
- Then redeploy the script with the new permissions

### Issue: "Something went wrong" Error
**Solution:** 
- Make sure the Apps Script URL is correctly copied in your HTML file
- Check that you authorized the Apps Script deployment
- Verify "Who has access" is set to "Anyone"
- Check the Apps Script **Executions** tab for error details

### Issue: "Username already exists" Error
**Solution:**
- This is expected! The form prevents duplicate usernames
- Try registering with a different username

### Issue: Can't deploy Script
**Solution:**
- Make sure you're signed in to the same Google account
- You may need to enable Google Apps Script API
- Make sure the SPREADSHEET_ID is correctly set before deploying

---

## Security Notes

⚠️ **Important:** This form stores passwords in plain text in Google Sheets. For production:
1. **Hash passwords** before storing using a library like crypto-js
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** to prevent spam
4. **Add CAPTCHA** for additional security

---

## Customization

### Change Colors
In the HTML file, find the `<style>` section and modify:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Fields
1. Add a new form group in the HTML:
   ```html
   <div class="form-group">
       <label for="email">Email</label>
       <input type="email" id="email" name="email" placeholder="Enter your email">
   </div>
   ```
2. Add validation in JavaScript
3. Update the Google Apps Script to save the new field

### Change Sheet Name
In the Google Apps Script, change:
```javascript
const sheet = ss.getSheetByName('Registrations') || ss.insertSheet('Registrations');
```

---

## Support

If you encounter any issues:
1. Check the browser console (F12 → Console tab) for errors
2. Check Google Apps Script logs (Apps Script → Executions)
3. Verify all URLs are correct
4. Make sure Google Sheet permissions are set correctly

---

## Files Included

1. **registration-form.html** - The registration form with UI/UX
2. **google-apps-script.js** - Backend script for Google Sheets
3. **SETUP_INSTRUCTIONS.md** - This file

Enjoy your registration form! 🎉
