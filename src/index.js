const express = require('express');
const {google} = require('googleapis');

const app = express();

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './src/credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    // Criar a instância do cliente para autenticação
    const client = await auth.getClient();

    // Instância do Google Sheets API
    const googleSheets = google.sheets({
        version: 'v4', 
        auth: client
    })

    const spreadsheetId = '1oCL8kcM9f0chXf_yHABJsDSeeS8oYYKJq9eA4rmdI7o';

    // Pegar a metadata da tabela
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Lista de Doces!A1:B5'
    })
    
    res.send(getRows.data);;
});

app.listen(3000, (req, res) => {
    console.log('>> Listening on port 3000')
})