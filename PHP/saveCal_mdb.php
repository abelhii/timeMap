<?php
	session_start();

	// connect to mongodb
	$m = new MongoClient();

	// select a database
	$db = $m->timemap;
	$collection = $db->users;
	
	if(isset($_POST['userId']) && isset($_POST['events'])){
		$userId = $_POST['userId'];
		$events = $_POST['events'];

		//check if user exists; If yes update
		$query = array("userId" => $userId);
		if($collection->findOne($query) !=  null){	//if user exists in the database load calendar events
			echo "Logged In Successfully";
			//$_SESSION['userId'] = $userId;
			//update user data
			$newdata = array('$set' => array("events" => $events));
			$collection->update(array("userId" => $userId), $newdata);
			//var_dump($collection->findOne($query));
		}else{
			//create new user in users collection
			$a = array("userId" => $userId, "events" => $events);
			if($collection->insert($a)){
				echo "Inserted successfully";
				$_SESSION['userId'] = $userId;
			}
		}

	}
	

	function lastError() {
    	return $this->command(array('getlasterror' => 1));
	}


	/* //now display the available documents
	$cursor = $collection->find();
	foreach ($cursor as $doc) {
		if($doc['userId'] == "abel")
	  		var_dump($doc); //$doc['userId'];
	}
	// iterate cursor to display title of documents
	// now remove the document
	$collection->remove(array("title"=>"MongoDB Tutorial"));
	echo "Documents deleted successfully";

	echo "Updated document";

	}*/

?>