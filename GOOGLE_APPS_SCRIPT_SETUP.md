# Google Apps Script Setup for NUTPAM 2025 Registration

Since the Google Sheets API requires OAuth authentication for write operations, we'll use Google Apps Script as a simple web app to handle registration data.

## Setup Instructions

### Step 1: Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the script below
4. Save the project (name it "NUTPAM 2025 Registration Handler")

### Step 2: Apps Script Code
\`\`\`javascript
function doPost(e) {
  try {
    // Open your Google Sheet by ID
    const SHEET_ID = "1PqiEC9Iqr9oSD_jco3AjzFpeOdyivATu6e5hktTPsaM";
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Get parameters from POST request
    const params = e.parameter;
    
    // Prepare row data
    const rowData = [
      params.timestamp || new Date().toISOString(),
      params.teamId || '',
      params.teamName || '',
      params.teamLeaderName || '',
      params.teamLeaderEmail || '',
      params.teamLeaderPhone || '',
      params.teamSize || '',
      params.member2Name || '',
      params.member2Email || '',
      params.member2Phone || '',
      params.member3Name || '',
      params.member3Email || '',
      params.member3Phone || '',
      params.problemTrack || ''
    ];
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Team ID', 'Team Name', 'Leader Name', 'Leader Email', 
        'Leader Phone', 'Team Size', 'Member 2 Name', 'Member 2 Email', 
        'Member 2 Phone', 'Member 3 Name', 'Member 3 Email', 'Member 3 Phone', 
        'Problem Track'
      ];
      sheet.appendRow(headers);
    }
    
    // Append the data
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

### Step 3: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy the web app URL

### Step 4: Update the API Route
Replace `YOUR_SCRIPT_ID` in the API route with your actual Apps Script web app URL.

### Step 5: Test
Try registering a team to see if data appears in your Google Sheet.

## Troubleshooting
- Make sure the Google Sheet is accessible to your Google account
- Verify the Apps Script has permission to access Google Sheets
- Check the Apps Script execution logs for any errors
