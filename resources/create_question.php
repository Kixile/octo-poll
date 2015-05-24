<?php
function pg_connection_string_from_database_url() {
    extract(parse_url($_ENV["DATABASE_URL"]));
    return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
}
# Here we establish the connection.
$pg_conn = pg_connect(pg_connection_string_from_database_url());

$str_json = file_get_contents('php://input');
$markers = stripslashes($str_json);
$obj = json_decode($markers);
$question_id = 0;


# And we close the connection.
	$sql_user_check = "SELECT users_id FROM users WHERE email='" . $obj->author . "';";
    $user_check_result = pg_fetch_row(pg_query($pg_conn, $sql_user_check))[0];
    if($user_check_result == ''){
		$sql_insert_user = "INSERT INTO users (email) VALUES ('". $obj->author ."')";
		pg_query($pg_conn,$sql_insert_user);    
        $user_check_result = pg_fetch_row(pg_query($pg_conn,"SELECT LASTVAL();"))[0];
    }

#print_r($user_check_result);
$multioption = '0'; #TODO later add to creation
if($multioption=="") $multioption = '0';
$other = '0'; #TODO later add to creation
if($other=="") $other = '0';
$sql_questions = "INSERT INTO questions (users_id,question, description, multioption, other) VALUES ('"
    . $user_check_result . "', '"
    . $obj->question . "', '"
    . "non" . "', '" #TODO later add to creation
    . $multioption . "', '"
    . $other . "');";

pg_query($pg_conn,$sql_questions);

$question_id = pg_fetch_row(pg_query($pg_conn,"SELECT LASTVAL();"))[0];
# answers sql creation
$answers_list = $obj->answers;
$sql_answers = "INSERT INTO answers (questions_id, answer ) VALUES";
foreach($answers_list as $line){
    if(!empty($line)){
        $sql_answers .= "(". $question_id .", '". $line->value ."'),";	
    } else {
        break;
    }
}
$sql_answers = rtrim($sql_answers, ",");
pg_query($pg_conn,$sql_answers);
pg_close ($pg_conn);
?>