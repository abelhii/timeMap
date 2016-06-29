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
	$db = $m->timemap;
	echo "Database mydb selected</br>";
	$collection = $db->users;
	echo "Collection selected succsessfully</br>";

	// now display the available documents
	$cursor = $collection->find();
	foreach ($cursor as $doc) {
	  var_dump($doc); //$doc['name'];
	}
	/* iterate cursor to display title of documents
	foreach ( $cursor as $id => $value )
	{
	    echo "$id: ";
	    var_dump( $value );
	}
	// now remove the document
	$collection->remove(array("title"=>"MongoDB Tutorial"));
	echo "Documents deleted successfully";

	echo "Updated document";

	}*/

	echo "<br>-----------------------------------------------------------------------------------------<br>";


	//make query where gid is 49
	$query = array(array('gid' => '49'));
	$cursor = $collection->find( $query );

	while ( $cursor->hasNext() )
	{
	    var_dump( $cursor->getNext());
	}


	phpinfo();
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