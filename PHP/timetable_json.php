<?php
	session_start();
	if(!empty($_SESSION['sem1_JSON']) && !empty($_SESSION['sem2_JSON']) ){
		$sem1_JSON = $_SESSION['sem1_JSON'];
		$sem2_JSON = $_SESSION['sem2_JSON'];
	}
	
	echo $sem2_JSON;
	exit;	
?>