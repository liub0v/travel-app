const authenticateRole = (rolesArray) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("User is unauthorized");
  }
  let authorized = false;

  rolesArray.forEach((role) => {
    authorized = req.user.role === role;
  });
  if (authorized) {
    next();
  } else {
    return res.status(401).send("User doesn't have access");
  }
};
module.exports = authenticateRole;
