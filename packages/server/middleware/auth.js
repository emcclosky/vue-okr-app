const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const verifiedToken = jwt.verify(token, process.env.secret);
      res.locals.user_id = verifiedToken.user_id;
      return next();
    } catch (err) {
      return res.statusStatus(401);
    }
  } else return res.sendStatus(401);
};
// const fs = require('fs');

// const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
// const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

// // ============================================================
// // -------------------  SIGN ----------------------------------
// // ============================================================

// const payloadObj = {
//     sub: '1234567890',
//     name: 'John Doe',
//     admin: true,
//     iat: 1516239022
// };

// /**
//  * Couple things here:
//  *
//  * First, we do not need to pass in the `header` to the function, because the
//  * jsonwebtoken module will automatically generate the header based on the algorithm specified
//  *
//  * Second, we can pass in a plain Javascript object because the jsonwebtoken library will automatically
//  * pass it into JSON.stringify()
//  */
// const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});

// console.log(signedJWT); // Should get the same exact token that we had in our example

// // ============================================================
// // -------------------  VERIFY --------------------------------
// // ============================================================

// // Verify the token we just signed using the public key.  Also validates our algorithm RS256
// jwt.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {

//     if (err.name === 'TokenExpiredError') {
//         console.log('Whoops, your token has expired!');
//     }

//     if (err.name === 'JsonWebTokenError') {
//         console.log('That JWT is malformed!');
//     }

//     if (err === null) {
//         console.log('Your JWT was successfully validated!');
//     }

//     // Both should be the same
//     console.log(payload);
//     console.log(payloadObj);
// });
