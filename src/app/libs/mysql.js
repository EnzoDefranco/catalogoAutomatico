import mysql from 'serverless-mysql'

export const conn = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'Dalelobo22##',
    port: 3306,
    database: 'local',
  }
})