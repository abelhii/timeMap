<?php
	require_once 'vendor/autoload.php';
	require 'PHP/config.php';
	session_start();

	//if theres a timetable already in local storage use the same timetable
	if(isset($_POST["sem1_JSON"]))
		$_SESSION['sem1_JSON'] = $_POST["sem1_JSON"];
	if(isset($_POST["sem2_JSON"]))
		$_SESSION['sem2_JSON'] = $_POST["sem2_JSON"];

	//print_r($_SESSION['sem1_JSON']);
?>

<!DOCTYPE html>
<html> 
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Time Map</title>
	<!--Style-->
	<link rel="stylesheet" href="css/style.css">
	<link rel="icon" href="https://2016.moodle.maynoothuniversity.ie/theme/image.php/nuim/theme/1456143310/favicon">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<!--Script-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script type="text/javascript">
		//checks local storage for if the user uploaded a timetable before from this browser
		//typeof object != undefined equivalent to isset(object) in php
		if(typeof localStorage.getItem('timeMap_sem1') != undefined){
			sem1_JSON = JSON.parse(localStorage.getItem('timeMap_sem1'));
			console.log(sem1_JSON);
			$.post("index.php", {sem1_JSON: sem1_JSON}); //ajax post to php session
		}
		if(typeof localStorage.getItem('timeMap_sem2') != undefined){
			sem2_JSON = JSON.parse(localStorage.getItem('timeMap_sem2'));
			console.log(sem2_JSON);
			$.post("index.php", {sem2_JSON: sem2_JSON}); //ajax post to php session
		}
	</script>
	<script src="js/main.js" type="text/javascript"></script>
	<!--FullCalendar.io-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js" type="text/javascript"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/gcal.js" type="text/javascript"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo MAK; ?>&signed_in=true&callback=initMap&libraries=places" type="text/javascript"></script>

</head>
  
<body>
	<div id="heading">
		<img src="imgs/mu_logo1.png" align="left|top">
		<h1>Time Map<br>
		<small>Maynooth University</small></h1>
	</div>
	<div class="container">	

		<!--*** To upload the excel file ***-->
		<form class="form-inline" id="submitTimetable" action="PHP/uploadExcel.php" method="post" enctype="multipart/form-data" role="form">
			<div class="form-group">
			<div id="submitExcel">
			    <i class="btn fa fa-info-circle" data-toggle="modal" data-target="#howTo"></i>
			    Upload your timetable as an excel file:
				<!-- Upload Timetable -->
			    <div class="input-group">
				    <span class="input-group-btn">
					    <span class="btn btn-default btn-file">
		    				Browse&hellip; <input id="ttFile" type="file" name="uploadedfile" multiple>
						</span>
					</span>
                	<input type="text" class="form-control" readonly>
				</div>
			    <input id="sbtn" class="btn btn-success form-control" type="submit" value="Upload File" name="submit">
				<input id="allLectures" class="btn btn-info" type="button" value="Display All Lectures" onclick="displayAllLectures();"></input>
		    </div>

			    <!-- Info Modal -->
				<div class="modal fade" id="howTo" role="dialog">
					<div class="modal-dialog">

					  <!-- Modal content-->
					  <div class="modal-content">
					    <div class="modal-header">
					      <button type="button" class="close" data-dismiss="modal">&times;</button>
					      <h3 class="modal-title">FAQ:</h3>
					    </div>
					    <div class="modal-body">
					    	<h4><b>How to find your MU student timetable:</b></h4>
					    	<p>
					    		1. To find your timetable go to: 
					    		<a href="https://apps.maynoothuniversity.ie/timetable/">https://apps.maynoothuniversity.ie/timetable/</a>
					    		and login using your student details. <br>
					    		2. Once you're logged in, you can download your timetable in Excel format as shown below.
					    	</p>
					    	<p>
					    		Or try it with a sample timetable: <a href='excelFiles/nuim_student.xls' target="_blank">nuim_student.xls</a>
				    		</p>
					    	<img id="excelImg" src="imgs/excelFormat.PNG">
				    		<br><br>
					    	<h4><b>How to make your google calendar public:</b></h4>
					    	<p>
								1. Go into the calendar settings for your primary calendar.<br>
								2. Click the "Share this Calendar" tab.<br>
								3. Tick the "Make this Calendar Public" box and save
							</p>
							<img id="gcHowTo" src="imgs/gcHowTo.PNG">
					    </div>
					    <div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					  </div>
					  
					</div>
				</div>
			    
			</div>
		</form>	


		<!---*** Tab layout for calendar and map ***-->
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
				<form id="switchSem" method="get" action="">
					<button class="btn btn-info btn-sm" id="sem1Btn" type="submit" name="sem" value="sem1" onClick="changeT('sem1', event);">Sem1</button>
					<button class="btn btn-info btn-sm" id="sem2Btn" type="submit" name="sem" value="sem2" onClick="changeT('sem2', event);">Sem2</button>
					<!--BOOTSTRAP MODAL-->
					<a id="gLoginBtn" class="btn btn-primary btn-sm bootpopup" data-toggle="modal" data-target="#gLogin">connect to google calendar</a>
				</form>
				<div id="output"></div>

			
				<!-- Connect to Calendar Modal -->
				<div class="modal fade" id="gLogin" tabindex="-1" role="dialog">
					<div class="modal-dialog">
					  <!-- Modal content-->
					  <div class="modal-content">
					    <div class="modal-header">
					      <button type="button" class="close" data-dismiss="modal">&times;</button>
					      <h4 class="modal-title">Google Authorisation</h4>
					    </div>
					    <div class="modal-body">
					    	<p>To connect to Google Calendar you need to set your primary calendar to public as shown above:</p>
					    	<pre>
								<?php 
									include 'PHP/GCOAuth.php'; 
								?>
							</pre>
					    </div>
					    <div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					  </div>
					</div>
				</div>

				<!--Add Google Event-->
				<div class="modal fade" id="addEvent-modal" tabindex="-1" role="dialog">
					<div class="modal-dialog">
					  <!-- Modal content-->
					  <div class="modal-content">
					    <div class="modal-header">
					      <button type="button" class="close" data-dismiss="modal">&times;</button>
					      <h4 class="modal-title">Add Event to your Google Calendar:</h4>
					    </div>
					    <div class="modal-body">
					    	<form class="form-horizontal">
					    		<div class="form-group">
								  <label class="control-label col-sm-2" for="email">Title:</label>
								  <div class="col-sm-10">
								  	<input type="text" id="title" name="title">
								  </div>
								</div>
								<div class="form-group">
								  <label class="control-label col-sm-2" for="email">Location:</label>
								  <div class="col-sm-10">
								  	<input type="text" id="where_event" name="where_event">
								  </div>
								</div>
								<div class="form-group">
								  <label class="control-label col-sm-2" for="email">Description:</label>
								  <div class="col-sm-10">
								  	<textarea id="content_event" name="content_event"></textarea>
								  </div>
								</div>
							    <input type="hidden" id="start" name="start" value="">
							    <input type="hidden" id="end" name="end" value="">
							    <div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal" style="float:left">Cancel</button>
									<input type="submit" class="btn btn-default" value="Save">
								</div>
							</form>
					    </div>
					  </div>					  
					</div>
				</div>

				<div id="calendarr">
					<script type="text/javascript">
						//users google calendar id
						var calendarId = '<?php 
											if(isset($calendarId)){
												echo $calendarId->getSummary(); 
											}else
												echo " ";
											?>';
						initialiseCal();
					</script>
				</div>
				<!--?php readfile("PHP/GCOAuth.php"); ?-->
				<div id="gcal_loader"></div>
			</div>
		</div>
		


		<!--For Testing:-->
		<!--?php
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
			var timetable_path = '<?php //echo $timetable_path; ?>'
		</script-->
	</div>

</body>

</html>