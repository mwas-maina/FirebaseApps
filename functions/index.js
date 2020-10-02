const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
  //1.get the user
  //2. add a custom claims
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `success! ${data.email} has been approved to be an admin`,
      };
    })
    .catch((err) => err);
});
