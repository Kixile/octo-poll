<div id="static_table">
	<br>
	<form action="todo.php"> //search from datebase 
	<input type="text" name="search" value="Search">
	<select name="search_type">
	  <option value="Question">Question</option>
	  <option value="Author">Author</option>
	  <option value="ID">ID</option>
	</select>
	<input type="submit" value="Search">
	</form>
	<br>
	<table> //TODO pull data from database
		<tr>
			<th>Question</th>
			<th>Author</th> 
			<th>Date</th>
		</tr>
		<tr>
			<td width="60%">What am I filling this with?</td>
			<td width="30%">nobody</td> 
			<td width="10%">1996-04-22</td>
		</tr>
		<tr>
			<td>A question that sometimes drives me hazy: am I or are the others crazy?</td>
			<td>Albert Einstein</td> 
			<td>2018-13-39</td>
		</tr>
	</table>
</div>