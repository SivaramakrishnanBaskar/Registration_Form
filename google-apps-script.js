// Google Apps Script - Copy this to your Google Apps Script project
// IMPORTANT: Replace SPREADSHEET_ID with your actual Google Sheet ID
// To find your Sheet ID: Open the sheet URL -> the ID is between /d/ and /edit
// Example: https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9/edit
// The ID is: 1a2b3c4d5e6f7g8h9

const SPREADSHEET_ID = '1-aHN4RmGudHrSphb2TlQJFZScMPOV2v2oLTZNAcnAbM'; // ✅ Your actual ID

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the spreadsheet by ID
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Registrations');

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Registrations');
      sheet.appendRow(['Username', 'Password', 'Timestamp']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#667eea').setFontColor('white');
    }

    // Check if username already exists
    const data_range = sheet.getDataRange().getValues();
    for (let i = 1; i < data_range.length; i++) {
      if (data_range[i][0] === data.username) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          message: 'Username already exists. Please choose a different username.'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Add new row with data
    sheet.appendRow([
      data.username,
      data.password,
      data.timestamp
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration successful'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response with detailed error
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
