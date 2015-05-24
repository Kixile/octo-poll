<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// define variables and set to empty values
$id = $password = "";

// get values
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $id = test_input($_POST["id"]);
  $password = test_input($_POST["password"]);
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());

#check pass
$result = pg_query($pg_conn, "SELECT COUNT(pass) FROM passwords WHERE pass = '". md5($password) ."';");
$check = pg_num_rows($result);

if ($check == "1"){
	# delete data from database
	pg_query($pg_conn, "DELETE FROM questions WHERE questions_id =". $id);
}
pg_close ($pg_conn);


?>