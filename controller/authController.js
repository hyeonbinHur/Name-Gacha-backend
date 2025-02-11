import authService from "../service/authService.js";

const sign_in_user = async (req, res) => {
  try {
    const { userId, userPassword } = req.body;
    const { statusCode, response } = await authService.authenticateUser(
      userId,
      userPassword
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const sign_up_user = async (req, res) => {
  try {
    const { userId, userPassword } = req.body;
    const { statusCode, response } = await authService.signUpUser(
      userId,
      userPassword
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const sign_out_user = async (req, res) => {
  try {
    const data = authService.signOutUser();
    return data;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const check_refresh_token = async (req, res) => {
  try {
    //cookie
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const check_access_token = async (req, res) => {
  try {
    //cookie
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_user = async (req, res) => {
  try {
    const { userId, userOldPassword, userNewPassword } = req.body;
    const data = authService.updateUser(
      userId,
      userOldPassword,
      userNewPassword
    );
    return data;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_user = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { statusCode, response } = await authService.readUser(uuid);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const optionHandler = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  sign_in_user,
  sign_out_user,
  sign_up_user,
  check_access_token,
  check_refresh_token,
  update_user,
  get_user,
  optionHandler,
};
