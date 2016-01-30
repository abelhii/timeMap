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
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="Custom_Calendar/Custom_Calendar/custom_calendar.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo AK; ?>&signed_in=true&callback=initMap&libraries=places" type="text/javascript"></script>
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="js/readTable.js" type = "text/javascript"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
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
			<input id="searchMap" class="controls" type="text" placeholder="Search Box">
			<div id="gMap" class="tab-pane fade in active"></div>
			
			<div id="calendar" class="tab-pane fade">
				<h2>Calendar</h2>
				<a href="PHP/GCOAuth.php">connect calendar</a>
				<span style="font-family: monospace;">
				<?php 	 
					require 'Custom_Calendar/Custom_Calendar/custom_calendar.php';
				?> 
				https://calendar.google.com/calendar/embed?src=p52pqevg7jmba3d8lla6l9afhs%40group.calendar.google.com&ctz=Europe/Dublin
				</span>
				<!--
				<iframe src="<?php //require 'Custom_Calendar/Custom_Calendar/custom_calendar.php';?> "
				style="border-width:0" 
				width="1500" 
				height="800" 
				frameborder="0" 
				scrolling="yes"></iframe>-->
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
			print_r(json_decode($sem1_JSON));
			echo '</pre>'; 

			echo "<b>SEMESTER 2:</b>";
			echo '<pre>'; 
			print_r(json_decode($sem2_JSON));
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