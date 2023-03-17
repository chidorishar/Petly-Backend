const bcrypt = require('bcrypt');



// Хеш пароля при регістрації
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
// Хеш пароля при логіні
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
