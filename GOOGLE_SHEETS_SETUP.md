# Google Sheets Integration Setup

To integrate registration data with Google Sheets, follow these steps:

## 1. Create a Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default code with:

\`\`\`javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Team ID',
        'Team Name',
        'Team Leader Name',
        'Team Leader Email',
        'Team Leader Phone',
        'Team Size',
        'Member Names',
        'Member Emails',
        'Member Phones',
        'Problem Track'
      ]);
    }
    
    // Add the registration data
    sheet.appendRow([
      data.timestamp,
      data.teamId,
      data.teamName,
      data.teamLeaderName,
      data.teamLeaderEmail,
      data.teamLeaderPhone,
      data.teamSize,
      data.memberNames,
      data.memberEmails,
      data.memberPhones,
      data.problemTrack
    ]);
    
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

## 2. Deploy the Script

1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the web app URL

## 3. Create Google Sheet

1. Create a new Google Sheet
2. Copy the sheet ID from the URL
3. Replace 'YOUR_SHEET_ID' in the script with your actual sheet ID

## 4. Set Environment Variable

Add the web app URL to your Vercel environment variables:
- Variable name: `GOOGLE_SHEETS_URL`
- Value: Your Google Apps Script web app URL

## 5. Test the Integration

Once set up, all registration submissions will automatically appear in your Google Sheet with live updates.
