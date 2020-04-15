const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: "no_count",
      passwordField: "pass",
      passReqToCallback: true
    },
    async (req, no_count, pass, done) => {
      const rows = await pool.query("SELECT * FROM ccount WHERE no_count = ?", [
        no_count
      ]);
      if (rows.length > 0) {
        const count = rows[0];
        const validPassword = await helpers.matchPassword(
          pass,
          count.pass
        );
        if (validPassword) {
          done(null, count, req.flash("success", "Welcome " + count.no_count));
        } else {
          done(null, false, req.flash("message", "Incorrect Password"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "The Count does not exists.")
        );
      }
    }
  )
);

passport.serializeUser((count, done) => {
    done(null, count.no_count);
  });
  
  passport.deserializeUser(async (no_count, done) => {
    const rows = await pool.query("SELECT * FROM ccount WHERE no_count = ?", [no_count]);
    done(null, rows[0]);
  });