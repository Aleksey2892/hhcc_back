const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
const User = require('../model/collectionMethods/Users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.getById(payload.id)

      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }),
)
