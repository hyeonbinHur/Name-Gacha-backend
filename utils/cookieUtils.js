const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/);
      if (parts) {
        cookies[parts[1].trim()] = (parts[2] || "").trim();
      }
    });
  }
  return cookies;
};
