<?php
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
	echo $ec[0].",";
	echo $ec[1]." : ";



	$link = mysqli_connect('localhost', 'root', '', 'timemap');
	if (!$link) {
	    die('Could not connect: ' . mysqli_error());
	}

	//This is just querying anythhing with the two letters in the name for now:
	$query = "SELECT location FROM mu_campus WHERE name LIKE '%$ec[0]%$ec[1]%'";
	$result = mysqli_query($link,$query);
	if(!$result){
		echo "false";
	}else{
		$location= mysqli_fetch_row($result);
		echo $location[0];	
	}

	mysqli_close($link);
?>