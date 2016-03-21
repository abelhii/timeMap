<?php
	require_once '../vendor/google/apiclient/src/Google/autoload.php';
	session_start();
	if(isset($_SESSION['client'])){
		$client = $_SESSION['client']; //reusing the client token to insert event
		$service = new Google_Service_Calendar($client);  
		$calendarId = $service->calendars->get('primary');

		if((isset($_POST['title']) || isset($_POST['location'])) && (isset($_POST['start']) && isset($_POST['end'])))
		{
			$title = $_POST['title'];
			$location = $_POST['location'];
			if(isset($_POST['description']))
				$description = $_POST['description'];
			$start = $_POST['start'];
			$end = $_POST['end'];

			echo $title." -- ".$location." -- ".$start." -- ".$end;
			insertTimetable($title, $location, $description, $start, $end, $service); //, $calendarId);
		}
	}

 	function insertTimetable($title, $location, $description, $start, $end, $service){ //, $calendarId){
		$event = new Google_Service_Calendar_Event(array(
			  'summary' => $title,
			  'location' => $location,
			  'description' => $description,
			  'start' => array(
			    'dateTime' => $start,
			    'timeZone' => 'Europe/Dublin',
			  ),
			  'end' => array(
			    'dateTime' => $end,
			    'timeZone' => 'Europe/Dublin',
			  ),
			  /*'attendees' => array(
			    array('email' => $calendarId->getSummary()),
			  ),*/
		  )
		);

		$calendarId = 'primary';
		$event = $service->events->insert($calendarId, $event);
		printf('Event created: %s\n', $event->htmlLink);

    }

    	//QUICK ADD
 		/*$createdEvent = $service->events->quickAdd(
		    'primary',
		    $title.' at '.$location.' '.$start.$end);

		echo '<br>'.$createdEvent->getId();*/
	

		/********************INSERT SINGLE EVENT************************
		$event = new Google_Service_Calendar_Event();
		$event->setSummary($title);
		$event->setLocation($location);
		$start = new Google_Service_Calendar_EventDateTime();
		$start->setDateTime($start);
		$event->setStart($start);
		$end = new Google_Service_Calendar_EventDateTime();
		$end->setDateTime($end);
		$event->setEnd($end);
		$attendee1 = new Google_Service_Calendar_EventAttendee();
		$attendee1->setEmail($calendarId->getSummary());
		// ...
		$attendees = array($attendee1,
		                   // ...,
		                  );
		$event->attendees = $attendees;
		$organizer = new Google_Service_Calendar_EventOrganizer();
		$organizer->setEmail($calendarId->getSummary());
		$organizer->setDisplayName('organizerDisplayName');
		$event->setOrganizer($organizer);
		$event->setICalUID('originalUID');
		$importedEvent = $service->events->import('primary', $event);

		echo "<br>".$importedEvent->getId();
		echo "<script>console.log($importedEvent->getId();)</script>";
		/*************************************************************/
?>