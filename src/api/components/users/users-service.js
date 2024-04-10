const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

//Soal 1. Prevent Duplicate Email
async function checkEmailExists(email) {
  return await usersRepository.checkEmailExists(email);
}

//Soal 3. Change Password
async function changePassword(id, oldPassword, newPassword) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null;
  }

  const isMatch = await comparePasswords(oldPassword, user.password);
  if (!isMatch) {
    return false;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  try {
    await usersRepository.updatePassword(id, hashedNewPassword);
  } catch (err) {
    return null;
  }

  return true;
}

//Soal 3. Change Password
const bcrypt = require('bcrypt');
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmailExists,
  changePassword,
  comparePasswords,
};
