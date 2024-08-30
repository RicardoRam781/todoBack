var admin = require("firebase-admin");
require('dotenv').config();

const config = require('../config')

var serviceAccount = process.env.GOOGLE_CLOUD_CREDENTIALS
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





