const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    multiValueHeaders: {
      "Access-Control-Allow-Origin": ["http://localhost:5173"],
      "Access-Control-Allow-Methods": ["POST, GET, PUT, DELETE"],
      "Access-Control-Allow-Credentials": ["true"],
    },
  };
};

const buildCookieResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },

    body: JSON.stringify(body),
  };
};

const buildTokenResponse = (accessToken, refreshToke) => {};
