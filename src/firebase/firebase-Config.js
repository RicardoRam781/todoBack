var admin = require("firebase-admin");

var serviceAccount = require("./todolist-31663-firebase-adminsdk-vh9m7-437746e4a3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




async function verifyToken(token) {
  try {
      const decodeToken = await admin.auth().verifyIdToken(token)
      console.log("token valido")
      return decodeToken
  } catch (err) {
      console.log(err)
  }
}


module.exports = {
  verifyToken
}





