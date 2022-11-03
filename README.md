<h1>Database by Google</h1>

<h4>This web application uses <a href="https://docs.google.com/spreadsheets/d/1WKyhPK1pvySJSImA5TYMedz5HJySDvorV-_jAIaaW3A/edit#gid=0" target="_blank" rel="noreferrer">Google Sheets</a> as backend and database. That is, all information is stored in a table format, and the backend logic is written in the table script.</h4>

<hr/>

<h5>Code in Apps Script:</h5>

<pre>
/* 
  POST request
*/
function doPost(requst) {
  const sheet = SpreadsheetApp.getActiveSheet()
  const {id, name, edit, remove} = requst.parameter
  const lastRow = sheet.getLastRow()

// Deletes user if (remove === 'true') { let match = 0

    removeUser()

    while (match > 0) {
      match = 0

      removeUser()
    }

    function removeUser() {
      for (let i = 2; i < lastRow + 1; i++) {
        let userName = sheet.getRange(`B${i}`).getValue()

        if (userName === name) {
          let range = sheet.getRange(`A${i}:Z${i}`);

          range.deleteCells(SpreadsheetApp.Dimension.ROWS)

          match += 1
        }
      }
    }

    return

}

// Edits usesr if (edit === 'true') { editUser()

    function editUser() {
      for (let i = 2; i < lastRow + 1; i++) {
        let userId = sheet.getRange(`A${i}`).getValue()

        if (userId == id) {
          sheet.getRange(`B${i}`).setValue(name)
        }
      }
    }

    return

}

// Creates user sheet.getRange(`A${lastRow+1}`).setValue(sheet.getRange(`A${lastRow}`).getValue() + 1) sheet.getRange(`B${lastRow+1}`).setValue(name)

const result = getRresult(requst.parameter)

return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON) }

/_ GET request _/ function doGet(requst) { const {id} = requst.parameter

let result = null

if (id === 'all') { result = getAll(requst.parameter) } else { result = getRresult(requst.parameter) }

return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON) }

/_ Get user by id _/ function getRresult({id, name}) { const sheet = SpreadsheetApp.getActiveSheet() const lastRow = sheet.getLastRow() let result = {status: 200, data: {id, name}}

for (let i = 2; i < lastRow + 1; i++) { let userId = sheet.getRange(`A${i}`).getValue() let userName = sheet.getRange(`B${i}`).getValue()

    if (userId == id) {
      result = {...result, data: {id: userId, name: userName}}
    }

}

return result }

/_ Get all users _/ function getAll() { const sheet = SpreadsheetApp.getActiveSheet() const lastRow = sheet.getLastRow()

let result = {status: 200, data: []}

for (let i = 2; i <= lastRow; i++) { result.data.push({id: sheet.getRange(`A${i}`).getValue(), name: sheet.getRange(`B${i}`).getValue()}) }

return result }

</pre>
