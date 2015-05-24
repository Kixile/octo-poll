<!DOCTYPE HTML>
<html> 
<body>
<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());
# Get data from database
$result = pg_query($pg_conn, "SELECT * FROM user_questions");
pg_close ($pg_conn);
$out = array();
# Add all to a array
while ($row = pg_fetch_row($result)) { 
	echo "id: ". (string)$row[0] . "\t question: " . (string)$row[1] . "\t owner: " . (string)$row[5] . "<br>";
}
?>

<form action="del.php" method="post">
ID: <input type="text" name="id"><br>
Password: <input type="text" name="password"><br>
<input type="submit">
</form>

</body>
</html>