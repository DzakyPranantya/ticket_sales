const userModel = require("../models/index").user; // Perbaikan: Sesuaikan path untuk import model

const md5 = require("md5");

const { Op } = require("sequelize"); // Perbaikan: Destructuring Op dari sequelize

exports.getAllUser = async (request, response) => {
  try {
    let users = await userModel.findAll();
    return response.json({
      success: true,
      data: users,
      message: "All users have been loaded",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.findUser = async (request, response) => {
  try {
    let keyword = request.params.key;
    let users = await userModel.findAll({
      where: {
        [Op.or]: [
          { userID: { [Op.substring]: keyword } },
          { firstname: { [Op.substring]: keyword } },
          { lastname: { [Op.substring]: keyword } },
          { email: { [Op.substring]: keyword } },
          { role: { [Op.substring]: keyword } },
        ],
      },
    });
    return response.json({
      success: true,
      data: users,
      message: "All Users have been loaded",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.addUser = (request, response) => {
  try {
    let newUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: md5(request.body.password),
      role: request.body.role,
    };
    userModel.create(newUser).then((result) => {
      return response.json({
        success: true,
        data: result,
        message: "New user has been inserted",
      });
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = (request, response) => {
  try {
    let dataUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      role: request.body.role,
    };
    if (request.body.password) {
      dataUser.password = md5(request.body.password);
    }
    let userID = request.params.id;
    userModel.update(dataUser, { where: { userID: userID } }).then((result) => {
      return response.json({
        success: true,
        message: "Data user has been updated",
      });
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = (request, response) => {
  try {
    let userID = request.params.id;
    userModel.destroy({ where: { userID: userID } }).then((result) => {
      return response.json({
        success: true,
        message: "Data user has been deleted",
      });
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.register = (request, response) => {
  let newUser = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    password: md5(request.body.password),
    role: "user",
  };
  /** execute inserting data to user's table */
  userModel
    .create(newUser)
    .then((result) => {
      /** if insert's process success */
      return response.json({
        success: true,
        data: result,
        message: "New user has been inserted",
      });
    })
    .catch((error) => {
      /** if insert's process fail */
      return response.json({
        success: false,
        // message: error.message
      });
    });
};

/** create function for reset password */
exports.resetPwd = async (request, response) => {
  /** define id user for whom the password will be reset */
  let userID = request.params.id;

  /** prepare data from request */
  let oldPassword = md5(request.body.oldPassword);
  let newPassword = md5(request.body.newPassword);

  try {
    /** check if the old password matches the existing password */
    const user = await userModel.findOne({
      where: { userID: userID, password: oldPassword },
    });

    if (!user) {
      return response.json({
        success: false,
        message: "Old password is incorrect. Password reset failed.",
      });
    }

    /** update the password with the new password */
    await userModel.update(
      { password: newPassword },
      { where: { userID: userID } }
    );

    return response.json({
      success: true,
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

/** create function for reset password */
exports.resetPwd = async (request, response) => {
  /** define id user for whom the password will be reset */
  let userID = request.params.id;

  /** prepare data from request */
  let oldPassword = md5(request.body.oldPassword);
  let newPassword = md5(request.body.newPassword);

  try {
    /** check if the old password matches the existing password */
    const user = await userModel.findOne({
      where: { userID: userID, password: oldPassword },
    });

    if (!user) {
      return response.json({
        success: false,
        message: "Old password is incorrect. Password reset failed.",
      });
    }

    /** update the password with the new password */
    await userModel.update(
      { password: newPassword },
      { where: { userID: userID } }
    );

    return response.json({
      success: true,
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};