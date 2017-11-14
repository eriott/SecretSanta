let config = {
    staging: {
        db: 'mongodb://secretsanta:G5fk1q85hgverTQ0@ds261755.mlab.com:61755/secretsanta-staging'
    },
    local: {
        db: 'mongodb://localhost/secretsanta'
    }
};

export default config[process.env.NODE_ENV || 'local']