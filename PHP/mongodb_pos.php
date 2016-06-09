<?php
	/*
	Notes for mongodb: 
	table = collection
	row = document
	*/
	
	// connect to mongodb
	$m = new MongoClient();
	echo "Connection to database successfully</br>";

	// select a database
	$db = $m->mydb;
	echo "Database mydb selected</br>";
	$collection = $db->mycol;
	echo "Collection selected succsessfully</br>";

	// now remove the document
	$collection->remove(array("title"=>"MongoDB Tutorial"));
	echo "Documents deleted successfully";

	// now display the available documents
	$cursor = $collection->find();

	// iterate cursor to display title of documents
	echo "Updated document";

	foreach ($cursor as $doc) {
	  var_dump($doc);
	}

   /*
	$js = "function(){
		return this.title == 'MongoDB' || this.gid == 1;
	}";

	$cursor = $collection->find();
	var_dump($cursor->getNext());
	// iterate cursor to display title of documents
	/*foreach ($cursor as $doc) {
		print $doc[0];
	}*/

?>