const localStrategy = require('passport-local').Strategy
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')

//load User Model
const User = require('../models/User')


 module.exports = function(passport){
      passport.use(
           new localStrategy({ usernameField: 'email' }, (email,password,done) => {
                User.findOne({ where: { email: email } })
                     .then(user => {
                          if (!user) {
                               return done(null,false,{message:'The email not Registered'})
                          }
                          bcrypt.compare(password, user.password)
                               .then(isMatch => {
                                    if (isMatch) {
                                         return done(null,user)
                                    }
                                    else {
                                         return done(null,false,{message:'Password incorrect'})
                                    }
                               })
                          .catch(err=>console.log(err))

                     })
                .catch(err=>console.log(err))
          })
     )
}
