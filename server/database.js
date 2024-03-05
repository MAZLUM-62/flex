import mysql from 'mysql2';
//Create a Database Connection

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'flex'
})

con.connect((err) => {
    if(err)
    {
        console.log(err)
    }else{
        console.log("CONNECTION SUCCESSFUL!")
    }
})
export default con;
