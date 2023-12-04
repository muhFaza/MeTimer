export default class Validator {
  static firstnameValidator(name) {
    if (!name) return "Name can't be empty.";
    if (/\d/.test(name)) return "Name cannot contain numbers.";
    return "";
  }

  static lastnameValidator(name) {
    if (name && /\d/.test(name)) return "Name cannot contain numbers.";
    return "";
  }

  static emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "Email can't be empty.";
    if (!re.test(email)) return "Ooops! We need a valid email address.";
    return "";
  }

  static passwordValidator(password) {
    if (!password) return "Password can't be empty.";
    if (password.length < 5)
      return "Password must be at least 5 characters long.";
    return "";
  }
}
