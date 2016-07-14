<?php
	//****USED TO SWITCH AND DISPLAY SEMESTERS****//
	session_start();
	if(isset($_SESSION['sem1_JSON']))
		$sem1_JSON = $_SESSION['sem1_JSON'];
	if(isset($_SESSION['sem2_JSON']))
		$sem2_JSON = $_SESSION['sem2_JSON'];


	if($_GET["sem"] == "sem1" && !empty($sem1_JSON)){
		echo json_encode($sem1_JSON);		
		//print "<script>console.log('SEMESTER1 LOG');</script>";
	}else if($_GET["sem"] == "sem2" && !empty($sem2_JSON)){
		echo json_encode($sem2_JSON);
		//print "<script>console.log('SEMESTER TWO');</script>";
	}else{
		print "<script>console.log('Something went wrong with $_GET[sem]');</script>";
	}
	//echo $sem1_JSON;

	exit;	
?>