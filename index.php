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
	<title>Time Map</title>
	<!--Style-->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<!--Script-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/date.js"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
	<!--FullCalendar.io-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js" type="text/javascript"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/gcal.js" type="text/javascript"></script>
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
		    				Browse&hellip; <input id="ttFile" type="file" name="uploadedfile" multiple>
						</span>
					</span>
                	<input type="text" class="form-control" readonly>
				</div>
			    <input id="sbtn" class="btn btn-success form-control" type="submit" value="Upload File" name="submit">
			</div>
		</form>	

		<!--Tab layout for calendar and map-->
		<ul id="tabs" class="nav nav-tabs nav-justified nav-size">
			<li class="active" ><a data-toggle="tab" href="#gMap">Map</a></li>
			<li><a data-toggle="tab" href="#calendar">Calendar</a></li>
		</ul>
		
		<div class="tab-content">
			<!--Map-->
			<input id="searchMap" class="controls" type="text" placeholder="Search Box">
			<div id="gMap" class="tab-pane fade in active"></div>
			
			<!--Calendar-->
			<div id="calendar" class="tab-pane fade">
				<form method="get" action="">
					<button class="btn btn-info btn-sm" id="sem1Btn" type="submit" name="sem" value="sem1" onClick="changeT('sem1')">Sem1</button>
					<button class="btn btn-info btn-sm" id="sem2Btn" type="submit" name="sem" value="sem2" onClick="changeT('sem2')">Sem2</button>
				</form>
				<div id="output"></div>
				<!--TODO: USE BOOTSTRAP MODAL-->
				<br>
				<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#gLogin">connect to google calendar</button>
				<!-- Modal -->
				<div class="modal fade" id="gLogin" role="dialog">
					<div class="modal-dialog">

					  <!-- Modal content-->
					  <div class="modal-content">
					    <div class="modal-header">
					      <button type="button" class="close" data-dismiss="modal">&times;</button>
					      <h4 class="modal-title">Google Authorisation</h4>
					    </div>
					    <div class="modal-body">
					    	<pre>
								<?php include "PHP/GCOAuth.php"; ?>
							</pre>
					    </div>
					    <div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					  </div>
					  
					</div>
				</div>

				<div id="calendarr">
					<script type="text/javascript">initialise();</script>
				</div>
				<!--?php readfile("PHP/GCOAuth.php"); ?-->
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