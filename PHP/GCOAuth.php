<!--http://www.daimto.com/accessing-google-calendar-with-php-oauth2/-->
<?php    
	//require_once '../vendor/autoload.php';
	//require 'config.php';
    //session_start(); 

    // ********************************************************  //
    // Get these values from https://console.developers.google.com
    // Be sure to enable the Analytics API
    // ********************************************************    //
    $client_id = CId;	//'[Your client Id]';
    $client_secret = CS;	//'[Your Client Secret]';
    $redirect_uri = 'http://127.0.0.1/timeMap/';//'[Your Redirect URI]';

    $client = new Google_Client();
    $client->setApplicationName("timeMap");
    $client->setClientId($client_id);
    $client->setClientSecret($client_secret);
    $client->setRedirectUri($redirect_uri);
    $client->setAccessType('offline');   // Gets us our refreshtoken

    $client->setScopes(array('https://www.googleapis.com/auth/calendar'));
    
    //For logging out.
    if (isset($_GET['logout'])) {
		unset($_SESSION['token']);
    }

	// Step 2: The user accepted your access now you need to exchange it.
    if (isset($_GET['code'])) {
		$client->authenticate($_GET['code']);  
		$_SESSION['token'] = $client->getAccessToken();
		$redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
		//header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));    	
    }

    // Step 1:  The user has not authenticated we give them a link to login    
    if (!isset($_SESSION['token'])) {
		$authUrl = $client->createAuthUrl();

		//import google calendar to FullCalendar
		echo "In order to import your google calendar into this apps calendar <br>you have to set your calendar to public as shown above.<br><br>";
		print "<a id='import' class='login btn btn-info btn-sm' href='$authUrl'>Import Google Calendar</a><br><br>";

		//echo "<script> window.location.href = '$authUrl';  </script>";
    }    

    // Step 3: We have access we can now create our service
    if (isset($_SESSION['token'])) {
		$client->setAccessToken($_SESSION['token']);
		print "<a class='logout btn btn-info btn-sm ' href='http://127.0.0.1/timeMap?logout=1'>LogOut</a><br>";

		//import timetable from FullCalendar to GoogleCalendar
		echo "<br> warning press this only once to avoid adding duplicate events<br>";
		print "<button id='addEventsToGCAL' class='login btn btn-warning btn-sm' onclick='this.disabled=true; addTimeToGCal();'>Save student timetable to your Google Calendar</button><br><br>";	

		$service = new Google_Service_Calendar($client);    

		$calendarId = $service->calendarList->get('primary');
		echo("<script>console.log('".$calendarId->getSummary()."');</script>");
		echo "This is your primary google calendar ID: ";
		echo json_encode($calendarId->getSummary());

		$_SESSION['client'] = $client;
		$calendarList = $service->calendarList->listCalendarList();		
		
		while(true) {
			foreach ($calendarList->getItems() as $calendarListEntry) {

				echo "<br>\n".$calendarListEntry->getSummary()."<br>\n";


				// get events 
				$events = $service->events->listEvents($calendarListEntry->id);

				foreach ($events->getItems() as $event) {
				    echo " ".$event->getCreated();
				    echo " ".$event->getSummary()."<br>";
				}
			}
			$pageToken = $calendarList->getNextPageToken();
			if ($pageToken) {
				$optParams = array('pageToken' => $pageToken);
				$calendarList = $service->calendarList->listCalendarList($optParams);
			} else {
				break;
			}	
		}
    }

		/****** This returns all the events in the clients google calendar ***********
		$calendarList = $service->calendarList->listCalendarList();		
		
		while(true) {
			foreach ($calendarList->getItems() as $calendarListEntry) {

				echo "<br>\n".$calendarListEntry->getSummary()."<br>\n";


				// get events 
				$events = $service->events->listEvents($calendarListEntry->id);

				foreach ($events->getItems() as $event) {
				    echo " ".$event->getCreated();
				    echo " ".$event->getSummary()."<br>";
				}
			}
			$pageToken = $calendarList->getNextPageToken();
			if ($pageToken) {
				$optParams = array('pageToken' => $pageToken);
				$calendarList = $service->calendarList->listCalendarList($optParams);
			} else {
				break;
			}
		}**********/