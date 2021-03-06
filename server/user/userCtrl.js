/*

userCtrl.js
configuring routes for userRouter

 */

module.exports = function (db) {
  return {
    retrieveAll: function (req, res) {
      // console.log('api/user/ retrieving users');
      // query for all users but the currently logged in user
      db.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL'],
        where: {
          email: {
            $ne: req.user.email
          }
        },
        raw: true
      }).then(function (users) {
        res.json(users);
      });
    },
    update: function (req, res) {
      // pull out data
      var id = req.user.id;
      var updateModel = {
        photoURL: req.body.photoURL
      };
      // query for specific user
      db.User.find({
        where: {
          id: id
        }
      }).then(function (user) {
        user.update(updateModel)
          .then(function (user) {
            res.status(200).end();
          });
      });
    },
    retrieveUser: function (req, res) {
      // console.log('/api/user/one');
      // pull out data
      var id = req.query.id;
      db.User.find({
        attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL'],
        where: {
          id: id
        }
      }).then(function (user) {
        if (!user) {
          res.send('no such user exists');
        } else {
          res.json(user);
        }
      });
    }
  };
};
