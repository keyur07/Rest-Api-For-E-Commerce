<?php

require __DIR__ . "/inc/bootstrap.php";


//echo (($_SERVER['REQUEST_URI']));
//echo ((PHP_URL_PATH));

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

//echo ("URI :" . $uri);

$uri = explode( '/', $uri );
//echo "<br> URI 1 == " . $uri[1];
//echo "<br> URI 2 == " . $uri[2];
//echo "<br> URI 3 == " . $uri[3];
//echo "<br> URI 4 == " . $uri[4];
//echo "<br>"

if ((isset($uri[4]) && $uri[4] != 'user') || !isset($uri[5])) {
    //echo($uri[1] + " " + $uri[2]);
    header("HTTP/1.1 404 Not Found");
    exit();
}


require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
//echo (PROJECT_ROOT_PATH);
$objFeedController = new UserController();
$strMethodName = $uri[5] . 'Action'; //e.g. see listAction

// Call the controller action
$objFeedController->{$strMethodName}();
//echo ($strMethodName);
?>