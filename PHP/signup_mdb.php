<?php
	session_start();
	// connect to mongodb
	$m = new MongoClient();

	// select a database
	$db = $m->timemap;
	$collection = $db->users;
	
	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST['username'];
		$password = $_POST['password'];

		//create new user in users collection
		$a = array("name" => $username, "password" => $password);
		if($collection->insert($a)){
			echo "Inserted successfully";
			$_SESSION['username'] = $username;
		}
	}

	function lastError() {
    	return $this->command(array('getlasterror' => 1));
	}


	/* //now display the available documents
	$cursor = $collection->find();
	foreach ($cursor as $doc) {
		if($doc['name'] == "abel")
	  		var_dump($doc); //$doc['name'];
	}
	// iterate cursor to display title of documents
	// now remove the document
	$collection->remove(array("title"=>"MongoDB Tutorial"));
	echo "Documents deleted successfully";

	echo "Updated document";

	}*/

?>