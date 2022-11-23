const express = require('express');
const {google} = require('googleapis');

const app = express();

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    });

    const spreadsheetId = '1oCL8kcM9f0chXf_yHABJsDSeeS8oYYKJq9eA4rmdI7o'

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Lista de Doces!A1:C5'
    })
    
    res.send(getRows.data);
})

app.listen(3000, (req, res) => {
    console.log('>> Servidor rodando na porta 3000');
});