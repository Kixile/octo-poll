<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());
# Get data from database
$id = $_GET["id"];
print_r($id);
pg_query($pg_conn, "UPDATE answers SET count = count + 1 WHERE answers_id = '" . $id . "';" );
pg_close ($pg_conn);
?>