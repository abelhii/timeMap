<?php
	require 'config.php';
	//retrieve event title and such from ajax:
	if(isset($_POST['eventTitle']))
	{
		$eventTitle = $_POST['eventTitle'];
		echo $eventTitle." -- ";
	}
	//get lecture room from square brackets:
	preg_match('/\[(.*?)\]/', $eventTitle, $eventName);
	echo $eventName[1] . " :: ";
	//take out lecture room number to just get the building code:
	$ec = preg_replace("/[^a-zA-Z]+/", "", $eventName[1]);
	echo $ec." : ";
	//To prevent mixing up the same tag names in column tagName
	$first = substr($ec, 0, 2);


	//st_geomFromtext

	$dbp = DBP;
	$link = pg_connect("host=webcourse.cs.nuim.ie port=5432 dbname=se415003 user=se415003 password=$dbp");
	if (!$link) {
	    die('Could not connect: ' . pg_last_error());
	}

	//This is just querying anythhing with the two letters in the name for now:
	$query = "SELECT location FROM mu_campus 
				WHERE tagName LIKE '%$ec%'
				OR tagName LIKE '$first%'";
	$result = pg_query($link,$query);
	if(!$result){
		echo "false";
	}else{
		$location= pg_fetch_row($result);
		echo $location[0];	
	}

	pg_close($link);
?>