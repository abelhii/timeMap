<?php
	session_start();
	// connect to mongodb
	$m = new MongoClient();

	// select a database
	$db = $m->timemap;
	$collection = $db->users;
	
	if(isset($_POST["userID"])){// isset($_POST['username']) && isset($_POST['password'])){
		//$username = $_POST["username"];
		//$password = $_POST["password"];
		$userID = $_POST["userID"];

		//check if user exists; If yes login
		$query = array("userID" => $userID);//, "password" => $password);
		if($collection->find($query)){
			echo "Logged In Successfully";
			//$_SESSION['username'] = $username;
		}else
			lastError();
	}

	function lastError() {
    	return $this->command(array('getlasterror' => 1));
	}

?>