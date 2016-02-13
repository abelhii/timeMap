<!--GOOGLE MAPS API KEY:
	AIzaSyC-cgzdVAPjujK1ET49QHxj_9f1fIoCdQk-->
<?php
	require_once 'vendor/autoload.php';
	//require 'Custom_Calendar/Custom_Calendar/custom_calendar.php';
	require 'PHP/config.php';
	session_start();
?>

<!DOCTYPE html>
<html> 
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--Style-->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<!--Script-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/date.js"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
	<!--FullCalendar.io-->
	<link href="bower_components/fullcalendar/dist/fullcalendar.css" rel="stylesheet" />
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js" type="text/javascript"></script>
	<script src='bower_components/moment/min/moment.min.js' type="text/javascript"></script>
	<script src="bower_components/fullcalendar/dist/fullcalendar.js" type="text/javascript"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo MAK; ?>&signed_in=true&callback=initMap&libraries=places" type="text/javascript"></script>

</head>
  
<body>
	<h1 class="text-center">Time Map</h1>
	<div class="container">	
		<!--To upload the excel file-->
		<form class="form-inline" id="submitTimetable" action="PHP/uploadExcel.php" method="post" enctype="multipart/form-data" role="form">
			<div class="form-group">
			    Upload your timetable as an excel file:
			    <div class="input-group">
				    <span class="input-group-btn">
					    <span class="btn btn-default btn-file">
		    				Browse&hellip; <input type="file" name="uploadedfile" multiple>
						</span>
					</span>
                	<input type="text" class="form-control" readonly>
				</div>
			    <input id="sbtn" class="btn btn-success form-control" type="submit" value="Upload File" name="submit">
			</div>
		</form>	

		<!--Tab layout for calendar and map-->
		<ul class="nav nav-tabs nav-justified nav-size">
			<li class="active"><a data-toggle="tab" href="#gMap">Map</a></li>
			<li><a data-toggle="tab" href="#calendar">Calendar</a></li>
		</ul>
		
		<div class="tab-content">
			<!--Map
			<input id="searchMap" class="controls" type="text" placeholder="Search Box">-->
			<div id="gMap" class="tab-pane fade in active"></div>
			
			<!--Calendar-->
			<div id="calendar" class="tab-pane fade">
				<a class="btn btn-info" href="PHP/GCOAuth.php">connect calendar</a>
				<br>
				<div id="calendarr"></div>
			</div>
		</div>
		



		<?php
			//Initialising variables for use with uploadExcel.php
			$timetable_path = "";
			$sem1_JSON = "";
			$sem2_JSON = "";
			if(!empty($_SESSION['timetable'])){
				$timetable_path = $_SESSION['timetable'];
			}
			//gets the JSON timetable from uploadExcel.php
			if(!empty($_SESSION['sem1_JSON']) && !empty($_SESSION['sem2_JSON']) ){
				$sem1_JSON = $_SESSION['sem1_JSON'];
				$sem2_JSON = $_SESSION['sem2_JSON'];
			}
		
			echo '<p id="test" style="float:right;">',
					$timetable_path,
					'</p>';

			/*TEST:*/
			echo "<b>SEMESTER 1:</b>";
			echo '<pre>'; 
			print_r(json_decode($sem1_JSON, true));
			echo '</pre>'; 

			echo "<b>SEMESTER 2:</b>";
			echo '<pre>'; 
			print_r(json_decode($sem2_JSON, true));
			echo '</pre>'; 
			/**/   

			//Export the HTML for calendar
			//echo $dom->saveHTML();
		?>
		<script type="text/javascript">
			var timetable_path = '<?php echo $timetable_path; ?>'
		</script>
	</div>

</body>

</html>