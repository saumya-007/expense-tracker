function formatResponse({ contentType, status, statusCode, body, headers }) {
  const formattedResponse = {
    statusCode: statusCode,
    headers: headers ? headers : {},
    body,
  };
  formattedResponse.headers['content-type'] = contentType ? contentType : 'application/json';
  return formattedResponse;
}

function formatError({ error }) {
  return formatResponse({
    status: 'error',
    statusCode: error.httpStatusCode ? error.httpStatusCode : 500,
    body: {
      message: error.message,
      name: error.name,
      code: error.errorCode || error.code,
    },
  });
}

function formatHtmlResponse({htmlContent, statusCode}) {
  const formattedResponse = {
    statusCode,
    isHtml: true,
    body: htmlContent,
  };
  return formattedResponse;
}

module.exports = { formatResponse, formatError, formatHtmlResponse };
