const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Usha@123',
  database: 'lecturehall'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //Insert a record in the "customers" table:
    
  });
connection.connect((error) => {
  if(error){
    console.log(error);
    return;
  }
  console.log('Connection established sucessfully');
  });
  var sql = "INSERT INTO user (USN, Time,Section,LHNumber,Subject) VALUES ('ENG22CS0323', CURRENT_TIME(),'E','101','DBMS')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
connection.query('select * from user', function (error, results, fields) {
    // When done with the connection, release it.
   

    console.log(results);
    // Handle error after the release.
    if (error) throw error; 
  });
  connection.end((error) => {});