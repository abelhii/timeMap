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
    
    //For loging out.
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
		//print "<a class='login' href='$authUrl'>Connect Me!</a>";
		echo "<script> window.location.href = '$authUrl';  </script>";
    }    

    // Step 3: We have access we can now create our service
    if (isset($_SESSION['token'])) {
		$client->setAccessToken($_SESSION['token']);
		print "<a class='logout' href='http://127.0.0.1/timeMap?logout=1'>LogOut</a><br>";	

		$service = new Google_Service_Calendar($client);    

		$calendarrr = $service->calendars->get('primary');

		echo $calendarrr->getSummary();

		/********************INSERT SINGLE EVENT********************************
		$event = new Google_Service_Calendar_Event();
		$event->setSummary('Appointment');
		$event->setLocation('Somewhere');
		$start = new Google_Service_Calendar_EventDateTime();
		$start->setDateTime('2011-06-03T10:00:00.000-07:00');
		$event->setStart($start);
		$end = new Google_Service_Calendar_EventDateTime();
		$end->setDateTime('2011-06-03T10:25:00.000-08:00');
		$event->setEnd($end);
		$attendee1 = new Google_Service_Calendar_EventAttendee();
		$attendee1->setEmail($calendarrr->getSummary());
		// ...
		$attendees = array($attendee1,
		                   // ...,
		                  );
		$event->attendees = $attendees;
		$organizer = new Google_Service_Calendar_EventOrganizer();
		$organizer->setEmail($calendarrr->getSummary());
		$organizer->setDisplayName('organizerDisplayName');
		$event->setOrganizer($organizer);
		$event->setICalUID('originalUID');
		$importedEvent = $service->events->import('primary', $event);

		echo "<br>".$importedEvent->getId();
		/*************************************************************/



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
