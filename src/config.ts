import 'dotenv/config'

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    db_user: process.env.DB_USER,
    db_name: process.env.DB_NAME,
    db_pass: process.env.DB_PASS,
    db_port: process.env.DB_PORT,
    secretkey_token: process.env.SECRETKEY_TOKEN,
    secretkey_refreshtoken: process.env.SECRETKEY_REFRESHTOKEN,
    url: ["url1", "url2"]
}

export default config