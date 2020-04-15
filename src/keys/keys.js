module.exports = {
    PORT : 3000,
    URI : "",
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'us-cdbr-iron-east-04.cleardb.net',
        user: process.env.DATABASE_USER || 'b06c2734c89016',
        password: process.env.DATABASE_PASSWORD || '1271132a',
        database: process.env.DATABASE_NAME || 'heroku_e0076885037980a'
    }
}

//mysql://b06c2734c89016:1271132a@us-cdbr-iron-east-04.cleardb.net/heroku_e0076885037980a?reconnect=true
