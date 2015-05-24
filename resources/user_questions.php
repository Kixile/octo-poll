<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());
# Get data from database
$result = pg_query($pg_conn, "SELECT * FROM user_questions");
$out = array();
# Add all to a array
while ($row = pg_fetch_row($result)) { 
	$answers_data = pg_query($pg_conn, "SELECT * FROM answers WHERE questions_id=" . (string)$row[0]);
	pg_close ($pg_conn);
	$answers = array();
	# Add all answers to a array
	while ($row2 = pg_fetch_row($answers_data)) { 
		$data = ["id" => (string)$row2[0],"answer" => (string)$row2[2],"count" => (string)$row2[3]];
		array_push($answers,$data);
	}	
	$data = ["id" => (string)$row[0],"question" => (string)$row[1],"description" => (string)$row[2],"multioption" => (string)$row[3],"other" => (string)$row[4],"owner" => (string)$row[5] ,"answers" => $answers ];
	array_push($out,$data);
}
pg_close ($pg_conn);
# Create json
echo json_encode(["polls" => $out]);
?>