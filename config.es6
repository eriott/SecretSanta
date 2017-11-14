let config = {
    staging: {
        db: process.env.STAGING_DB_URI
    },
    local: {
        db: 'mongodb://localhost/secretsanta'
    }
};

export default config[process.env.NODE_ENV || 'local']