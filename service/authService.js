import authRepository from "../repository/authRepository";

const authenticateUser = async (userId, userPassword) => {
  try {
    const result = authRepository.signInUserByCredentials(userId, userPassword);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const signUpUser = async (userId, userPassword) => {
  try {
    const result = authRepository.createUser(userId, userPassword);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const signOutUser = async () => {
  try {
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const checkRefreshToken = async () => {
  try {
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const checkAccessToken = async () => {
  try {
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const readUser = async (uuid) => {
  try {
    const result = authRepository.findUserById(uuid);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const updateUser = async (userId, userOldPassword, userNewPassword) => {
  try {
    const result = authRepository.updateUserById(
      userId,
      userOldPassword,
      userNewPassword
    );
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

export default {
  authenticateUser,
  signUpUser,
  signOutUser,
  updateUser,
  checkRefreshToken,
  checkAccessToken,
  readUser,
};
