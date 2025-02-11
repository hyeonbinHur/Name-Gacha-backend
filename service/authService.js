import authRepository from "../repository/authRepository.js";
import authUtils from "../utils/authUtils.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (userId, userPassword) => {
  try {
    const userData = await authRepository.findUserByUserId(userId);
    //userId기반으로 데이터베이스에서 정보를 가져옴
    if (userData.length === 1) {
      //가져온 정보의 갯수가 1이면
      //데이터 베이스에서 가져온 salt를 이용해서, 데이터베이스에서 가져온 비밀번호를 decrypt
      const { hashedPassword } = authUtils.decryptPassword(
        userData[0].Salt,
        userPassword
      );
      if (hashedPassword === userData[0].User_Password) {
        const { accessToken, refreshToken } = authUtils.issueTokens(
          userData.UUID
        );
        //decrypt한 비밀번호와 유저가 입력한 비밀번호가 맞으면
        // 로그인 성공 -> access token, refresh token 발급
        //두개의 비밀번호가 서로 맞지 않으면?
        // 404에러 비번이 맞지 않음
        return {
          statusCode: 201,
          response: {
            uuid: userData.UUID,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        };
        //decrypt한 비밀번호와 유저가 입력한 비밀번호가 맞으면
        // 로그인 성공 -> access token, refresh token 발급
        //두개의 비밀번호가 서로 맞지 않으면?
        // 404에러 비번이 맞지 않음
      } else {
        //비번이 맞지 않음 에러
        return { statusCode: 401, response: "Invalid password" };
      }
    } else if (userData.length === 0) {
      //가져온 정보의 갯수가 0이면 아이디가 맞지 않음 에러
    } else {
      //404 notFound 에러를 던져
      throw new Error("Unknown error occurred");
    }
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

const signUpUser = async (userId, userPassword) => {
  try {
    //입력받은 아이디가 데이터베이스에 이미 존재하는지 확인
    const userData = await authRepository.findUserByUserId(userId);
    if (userData.length === 0) {
      //존재하지 않는 아이디라면
      //비번을 암호화
      const { salt, hashedPassword } = authUtils.encryptPassword(userPassword);
      //아이디, hashed password, salt를 db에 저장
      const result = await authRepository.createUser(
        userId,
        hashedPassword,
        salt
      );
      return { statusCode: 200, response: result };
    } else {
      return { statusCode: 409, response: "User ID already exists" };
      //현재 입력받은 유저아이디는 이미 db에 존재하기때문에 입력받은 아이디로 회원가입이 불가능
    }
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

const checkAccessToken = async (cookie) => {
  const accessToken = cookie["accessToken"];
  if (!accessToken) {
    //accesstoken이 존재하는지 확인
    //존재하지 않는다면 존재하지 않는다는 에러코드와 에러메세지를 전달
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    return decoded;
    // 존재한다면 토큰 verify
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return buildCookieResponse(401, "Access token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      return buildCookieResponse(403, "Invalid access token");
    } else {
      return buildCookieResponse(500, "Internal Server Error");
    }
  }
};

const checkRefreshToken = async (cookie) => {
  const refreshToken = cookie["accessToken"];
  if (!refreshToken) {
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const { accessToken, refreshToken } = authUtils.issueTokens(decoded.uuid);
    return { decoded, accessToken, refreshToken };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return buildCookieResponse(401, "Refresh token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      return buildCookieResponse(403, "Invalid refresh token");
    } else {
      return buildCookieResponse(500, "Internal Server Error");
    }
  }
};

const readUser = async (uuid) => {
  try {
    const result = await authRepository.findUserByUUID(uuid);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

const updateUser = async (userId, userOldPassword, userNewPassword) => {
  try {
    const userData = authRepository.findUserByUserId(userId);
    if (userData === 1) {
      const { hashedPassword } = authUtils.decryptPassword(
        salt,
        userOldPassword
      );
      if (hashedPassword === userData.userPassword) {
        const result = authRepository.updateUserById(
          userData.uuid,
          userNewPassword
        );
        return result;
      }
    } else {
      //아이디가 맞지 않음 에러
    }
    return result;
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

export default {
  authenticateUser,
  signUpUser,
  updateUser,
  checkRefreshToken,
  checkAccessToken,
  readUser,
};
