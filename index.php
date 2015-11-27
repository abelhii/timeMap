<!--GOOGLE MAPS API KEY:
	AIzaSyC-cgzdVAPjujK1ET49QHxj_9f1fIoCdQk-->
<?php
require 'config.php';
session_start();
?>

<!DOCTYPE html>
<html> 
<head>
	<link rel="stylesheet" href="css/style.css">
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo AK; ?>&signed_in=true&callback=initMap&libraries=places" type="text/javascript"></script>
	<script src="js/readTable.js" type = "text/javascript"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script type="text/javascript">initMap();</script>

</head>
  
<body>
	<div class="header"><h1>TimeMap</h1></div>
	<div class="container">
		<form id ="submitTimetable" action="uploadExcel.php" method="post" enctype="multipart/form-data">
		    Upload your timetable in xmls format:
		    <input type="file" name="uploadedfile" id="uploadedfile">
		    <input type="submit" value="Upload File" name="submit">
		</form>


		<div id="calender"></div>

		<input id="searchMap" class="controls" type="text" placeholder="Search Box">
		<div id="gMap"></div>

		<?php
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
			echo '<pre>'; 
			print_r(json_decode($sem1_JSON));
			echo '</pre>'; 
			/**/
		?>
		<script type="text/javascript">
			var timetable_path = '<?php echo $timetable_path; ?>'
			readTable("table_listing", timetable_path);
		</script>


	</div>

</body>

</html>