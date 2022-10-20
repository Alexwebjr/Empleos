const { Op } = require('sequelize');
const crypto = require('crypto');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Role = require('../models/Role');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const sendEmail = require('../helpers/email');

//======== TOKEN ========
//Generate Token
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//CorrectPassword
const correctPassword = async (userPassword, password) =>
  await bcrypt.compare(userPassword, password);

//createSendToken
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//======== METHODS ========

//SINGUP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

//LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1.Check email and password
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  //2.Check user && password
  const user = await User.findOne({ where: { email } });
  if (!user || !correctPassword(user.password, password)) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3.Send token
  createSendToken(user, 200, res);
});

//PROTECT
exports.protect = catchAsync(async (req, res, next) => {
  //1.Get token by header||cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    return next(
      new AppError('Your are not logged in! Please log in to get access.', 401)
    );
  }

  //2. Check token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. User exists?
  const currentUser = await User.findOne({ where: { id: decode.id } });
  if (!currentUser) {
    return next(
      new AppError(
        'The token belonging to this user does no longer exist.',
        401
      )
    );
  }

  //  4. Changed password after jwt
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

//IS_LOGGED_IN (to render pages)

//LOGOUT
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  console.log(res.cookie);

  res.status(200).json({
    status: 'success',
  });
});

//RESTRICT_TO
exports.restrictTo =
  (...rolesId) =>
  async (req, res, next) => {
    //roles['user', 'editor']
    const role = await Role.findByPk(req.user.roleId);
    if (!rolesId.includes(role.name)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

//TODO:
//FORGOT_PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1. Get User by email
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  //2. Generate reset token
  const resetToken = user.createPasswordResetToken();
  //await user.save({validateBeforeSave: false});
  await user.save();

  //3. Send to email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and
  passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //await user.save({ validateBeforeSave: false });
    await user.save();

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

//RESET_PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. Get user from token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { where: { [Op.gt]: Date.now() } },
  });

  //2. token && user : new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.set({ password: req.body.password, passwordChangedAt: Date.now() });
  const newUser = await user.save();

  //4. Log new User and create jwt
  createSendToken(newUser, 200, res);
});

//UPDATE_PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  //1.Get user
  const user = await User.findOne({ where: { id: req.user.id } });

  //2. Chek current password
  if (!(await correctPassword(user.password, req.body.passwordCurrent))) {
    return next(new AppError('Your current password is wrong.', 404));
  }

  //3. Update
  user.password = req.body.password;
  user.set({ password: req.body.password, passwordChangedAt: Date.now() });
  const newUser = await user.save();

  //4. Log new User and create jwt
  createSendToken(newUser, 200, res);
});
