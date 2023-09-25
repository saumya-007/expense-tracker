const ERRORS = {
  'ER-00001': 'Error while signing up',
  'ER-00002': 'Failed to fetch google api token',
  'ER-00003': 'Failed to fetch google user info',
  'ER-00004': 'Error while adding user',
  'ER-00005': 'Google email not verified',
  'ER-00006': 'Error while addding access token',
  'ER-00007': 'User does not exists',
  'ER-00008': 'Error while getting by id',
  'ER-00009': 'Access Token Expired',
  'ER-00010': 'Invalid email provided',
  'ER-00011': 'Invalid password provided',
  'ER-00012': 'Invalid input provided',
  'ER-00013': 'Invalid token provided'
}

const DEFAULT_TTL = '30s'

const DEFAULT_AUTH_TEMPLATE = {
  htmlContent: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Created</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
          }
          .container {
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              background-color: #f9f9f9;
              max-width: 400px;
              margin: 0 auto;
          }
          .identifier {
              font-size: 18px;
              font-weight: bold;
              margin-top: 20px;
          }
          .copy-btn {
              padding: 10px 20px;
              border: none;
              background-color: #21cc0a;
              color: black;
              cursor: pointer;
              border-radius: 5px;
              font-size: 14px;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Congratulations</h1>
          <p>Your user account has been successfully created.</p>
          <p>Here is your unique identifier:</p>
          <p>Please copy this identifire and keep it saved. Only your identifire can be used to set the password of your account.</p>
          <p>Close the tab ! Once the tab is closed the identifire will be availabe so make sure to save it.</p>
          <div class="identifier">{{uuidVariable}}</div>
          <button class="copy-btn" id="copyButton">Copy Identifier</button>
      </div>
  
      <script>
          document.getElementById("copyButton").addEventListener("click", function() {
              var identifier = document.querySelector(".identifier");
              var range = document.createRange();
              range.selectNode(identifier);
              window.getSelection().removeAllRanges();
              window.getSelection().addRange(range);
              document.execCommand("copy");
              window.getSelection().removeRange(range);
              alert("Identifier copied to clipboard: " + identifier.textContent);
          });
      </script>
  </body>
  </html>
  `,
    replaceField: '{{uuidVariable}}'
}

module.exports = Object.freeze({
  ERRORS,
  DEFAULT_TTL,
  DEFAULT_AUTH_TEMPLATE,
})