<?php
	session_start();
	if(!empty($_SESSION['sem1_JSON']) && !empty($_SESSION['sem2_JSON']) ){
		$sem1_JSON = $_SESSION['sem1_JSON'];
		$sem2_JSON = $_SESSION['sem2_JSON'];
	}

	if($_GET["sem"] == "sem1"){
		console.log("tessst");
		echo $sem1_JSON;		
	}else if($_GET["semTwo"] == "sem2"){
		echo $sem2_JSON;
	}else{
		console.log("tessst");
	}

	exit;	
?>