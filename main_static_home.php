<div id="static_create">
    <form action="todo.php"><!--make question view--> 
        <h3>Question:</h3>
        <input type="text" name="question" value="question" title="Question">
        <br>
        <br>
        <?php
        for ($x = 1; $x <= 8; $x++) {
            echo "Option $x: <input type=\"text\" name=\"option$x\" title=\"Option$x\"><br>\n";
        }
        ?>
        <input type="submit" value="Generate">
    </form>

</div>