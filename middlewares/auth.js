const jwt = require('jsonwebtoken');

exports.auth = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const role = decodedToken.role;
      const userId = decodedToken.userId;

      if(!roles.includes(role))
        throw 'unauthorized';

      if (role === 'user')
        if (req.body.userId && req.body.userId !== userId)
          throw 'Invalid user ID';

      // if (role === 'admin')
      //   if (req.body.adminId && req.body.adminId !== adminId)
      //     throw 'Invalid admin ID';

      next();

    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
}
