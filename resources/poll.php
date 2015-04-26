<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());
# Get data from database
$id = $_GET["id"];
$question = pg_fetch_row(pg_query($pg_conn, "SELECT * FROM questions WHERE questions_id =". $id ));
$answers = pg_query($pg_conn, "SELECT * FROM answers WHERE questions_id=" .$id);
pg_close ($pg_conn);
$out = array();
# Add all answers to a array
while ($row = pg_fetch_row($answers)) { 
	$data = ["id" => (string)$row[0],"answer" => (string)$row[2],"count" => (string)$row[3]];
	array_push($out,$data);
}
# Create json
print(json_encode(["poll" => ["id" => (string)$id,"question" => (string)$question[1],"description" => (string)$question[2],"multioption" => (string)$question[3],"other" => (string)$question[4],"owner" => (string)$question[5]  ,"answers" => $out]]));
?>