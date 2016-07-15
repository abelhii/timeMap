<?php
	session_start();

	// connect to mongodb
	$m = new MongoClient();

	// select a database
	$db = $m->timemap;
	$collection = $db->users;
	
	//if(isset($_POST['userId'])){
		$userId = $_POST['userId'];

		//check if user exists; If yes update
		$query = array("userId" => $userId);
		$user = $collection->findOne($query);
		if($user !=  null){	//if user exists in the database load calendar events
			$events = $user['events'];
			echo json_encode($events);
		}else{
			//create new user in users collection
			$a = array("userId" => $userId, "events" => $events);
			if($collection->insert($a)){
				echo "Inserted successfully";
				$_SESSION['userId'] = $userId;
			}
		}

	//}
	

	function lastError() {
    	return $this->command(array('getlasterror' => 1));
	}
