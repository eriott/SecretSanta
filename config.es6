let config = {
    staging: {
        db: process.env.STAGING_DB_URI,
        googleAuth : {
            'clientID'      : '606219331744-rao3ldm0165pr686c1e2354elnijd22b.apps.googleusercontent.com',
            'clientSecret'  :  process.env.GOOGLE_CLIENT_SECRET,
            'callbackURL'   : 'https://secretme.herokuapp.com/auth/google/callback'
        }
    },
    local: {
        db: 'mongodb://localhost/secretsanta',
        googleAuth : {
            'clientID'      : '606219331744-9dl7cdr585hcre7eubl0t6b2fkbbabn6.apps.googleusercontent.com',
            'clientSecret'  :  process.env.GOOGLE_CLIENT_SECRET,
            'callbackURL'   : 'http://localhost:3000/auth/google/callback'
        }
    }
};

export default config[process.env.NODE_ENV || 'local']