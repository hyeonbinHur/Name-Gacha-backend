import crypto from "crypto";
import jwt from "jsonwebtoken";

// encrypt password -> 비밀번호를 암호화해서 암호화한 비밀번호와 salt를 리턴
const encryptPassword = (password) => {
  const salt = crypto.randomBytes(128).toString("base64");
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");
  return { salt, hashedPassword };
};

// decrypt password// salt와 user가 입력한 비번을 이용해서 복호화
const decryptPassword = (salt, password) => {
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");
  return { hashedPassword };
};

const issueTokens = (uuid) => {
  const accessToken = jwt.sign({ uuid: uuid }, process.env.ACCESS_SECRET, {
    expiresIn: "1m",
    issuer: "uncle.hb",
  });

  const refreshToken = jwt.sign({ uuid: uuid }, process.env.REFRESH_SECRET, {
    expiresIn: "24h",
    issuer: "uncle.hb",
  });
  return { accessToken, refreshToken };
};

export default {
  encryptPassword,
  decryptPassword,
  issueTokens,
};
