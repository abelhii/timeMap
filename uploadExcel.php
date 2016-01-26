<?php
/***
TODO: 
LocalStroage of the timetable file!

*/
//error_reporting(E_ALL ^ E_NOTICE);
//require 'excel_reader2.php';

/*******************SET UP**************************/
session_start();

$timetable_tmp = $_FILES['uploadedfile']['tmp_name'];
$timetable_name = basename($_FILES['uploadedfile']['name']);

if (isset ($_FILES['uploadedfile']['tmp_name'])){
	echo "Successfully uploaded " . $timetable_name ."<br>";
}


//using excel reader
//$data = new Spreadsheet_Excel_Reader($timetable_name);


//if its a broken excel file try it as html:
//$data = false;
if(!$data && !strpos($timetable_name, 'html')){
	$timetable_name = basename($timetable_name, "xls") . "html";
	echo "<br>" . trim($timetable_name, " ") . "<br>";
}

//stores the file somewhere and sets the target path of the timetable
$target_path  = "../timemap/excelFiles/" . trim($timetable_name, " "); 

if(move_uploaded_file($timetable_tmp, $target_path)) 
{
    echo "The file ". $timetable_name . " has been uploaded to " . $target_path;
    $_SESSION['timetable']  = $target_path;
}


//initiialise variables:
$timetable = new DOMDocument;
$timetable->preserveWhiteSpace = FALSE;
$timetable->loadHTMLFile($target_path);

$lectures = $timetable->getElementsByTagname('tr');
$lecture = array();

$sem1 = array();
$sem2 = array();
$timetable_arr = array();
$x = 0;


//convert from DOM to array 
foreach ($lectures as $tag) {
    $timetable_arr[$x] = $tag->nodeValue;
    ++$x;
}



//Â == chr(194)
//chr(160) == &nbsp;        chr(93) == ]
//$timetable_arr[0] = str_replace(chr(194), "..", $timetable_arr[0]);
//echo $timetable_arr[0]."</br>";
//replacing 't' with &nbsp, ']' with ']t' and :00 with :00t to split the string evenly
// so i can get position 1 - 5 to match mon - fri
//remove Â symbols and to seperate the lectures and the times:
for($x = 0; $x < sizeof($timetable_arr); $x++){
    if(strpos($timetable_arr[$x], chr(194)) !== false){
        $timetable_arr[$x] = str_replace(chr(194), "", $timetable_arr[$x]);
        $timetable_arr[$x] = html_entity_decode($timetable_arr[$x]);
        $timetable_arr[$x] = str_replace(chr(160),'t ',$timetable_arr[$x]);
        $timetable_arr[$x] = str_replace(array(']'),']t',$timetable_arr[$x]);
        $timetable_arr[$x] = str_replace(':00',':00t',$timetable_arr[$x]); 
        htmlentities($timetable_arr[$x]);
    }
    //echo' | '.$timetable_arr[$x]."</br>";
}

//splits the timetable into semester 1 and semester 2
$sem1 = array_slice($timetable_arr, 0, 55);
$sem2 = array_slice($timetable_arr, 55);

//25
//chr(160) == &nbsp;    chr(93) == ]
echo "</br>"."</br>"."<b>"."nine o'clock semester 1: "."</b></br>";
echo $sem1[1]." ".str_word_count($sem1[1],0,chr(160))."</br>";
print_r (preg_split("/t\s/",$sem1[1]));
//=> Array ( [0] => 09:00 [1] => CS355 ELT [2] => CS424 CB1 [3] => CS322 RH2.21 [4] => CS322 PH [5] => [6] => ) 




$sem1_JSON = JSONEncoder($sem1);
$sem2_JSON = JSONEncoder($sem2);
//Stores it as a session object for index to retrieve:
$_SESSION['sem1_JSON']  = $sem1_JSON;
$_SESSION['sem2_JSON']  = $sem2_JSON;
/*** TEST: ***
echo '<pre>'; 
print_r(json_decode($sem1_JSON));
echo '</pre>'; 
*/
/*******************************************************************************/




/*****************************JSON FORMATTER*********************************/
function JSONEncoder($semester){
    //This stores the times of each semester in seperate arrays, 
    //and splits them by the random characters inserted earlier e.g.  9:00 semester 1 = $sem1_9
    $y = 9;
    for($x = 0; $x < sizeof($semester); $x++){
        $dummy= preg_split("/t\s/",$semester[$x]);
        if(splitTimetable($dummy) != null){
            ${'sem_'.$y} = splitTimetable($dummy);
            $y++;
        }
    }
    /***TEST DATA
    for($x = 9; $x < 18; $x++){
        echo "<b>sem_".$x."</b>    ";
        print_r(${'sem_'.$x});   
        echo "</br>";
    }
    */
    
    //creates Days Mon-Fri in JSON format:
    $timetableForJSON = (object) array(
                "Monday" => array("9:00" => "","10:00" => "","11:00" => "","12:00" => "","13:00" => "","14:00" => "","15:00" => ""), 
                "Tuesday" => array("9:00" => "","10:00" => "","11:00" => "","12:00" => "","13:00" => "","14:00" => "","15:00" => ""),
                "Wednesday" => array("9:00" => "","10:00" => "","11:00" => "","12:00" => "","13:00" => "","14:00" => "","15:00" => ""),
                "Thursday" => array("9:00" => "","10:00" => "","11:00" => "","12:00" => "","13:00" => "","14:00" => "","15:00" => ""),
                "Friday" => array("9:00" => "","10:00" => "","11:00" => "","12:00" => "","13:00" => "","14:00" => "","15:00" => ""));

    //echo "</br> ". $timetableForJSON->Monday["09:00"];
    echo "</br>";

    for($days = 1; $days <= 6; $days++){
        for($hours = 9; $hours <= 17; $hours++){
            switch($days){
                case 1:
                    $timetableForJSON->Monday[$hours.":00"] = assignLectures($days, ${'sem_'.$hours});
                    break;
                case 2:
                    $timetableForJSON->Tuesday[$hours.":00"] = assignLectures($days, ${'sem_'.$hours});
                    break;
                case 3:
                    $timetableForJSON->Wednesday[$hours.":00"] = assignLectures($days, ${'sem_'.$hours});
                    break;
                case 4:
                    $timetableForJSON->Thursday[$hours.":00"] = assignLectures($days, ${'sem_'.$hours});
                    break;
                case 5:
                    $timetableForJSON->Friday[$hours.":00"] = assignLectures($days, ${'sem_'.$hours});
                    break;
            }
        }   
    }
    //print_r($timetableForJSON);
    $timetableJSON = json_encode($timetableForJSON) ;
    return $timetableJSON;
}

function assignLectures($day, $hour){
    if($hour[$day] != null){
        return $hour[$day];
    }
}

//splits the times accordingly
function splitTimetable($time){
    switch ($time[0]){
        case "09:00":
            return $time;
            break;
        case "10:00":
            return $time;
            break;
        case "11:00":
            return $time;
            break;
        case "12:00":
            return $time;
            break;
        case "13:00":
            return $time;
            break;
        case "14:00":
            return $time;
            break;
        case "15:00":
            return $time;
            break;
        case "16:00":
            return $time;
            break;
        case "17:00":
            return $time;
            break;
        //echo' | '.$sem1[$x]."</br>";    
    }
}

//return $timetable->saveHTML();






//get the days and times
/**$days = $timetable->getElementsByTagname('th');
$days_array = array();

foreach ($days as $day){
    if($day->nodeValue !== $time[$x]){
        $days_array[] = $day->nodeValue;   
    }
}

foreach($days_array as $day){
    echo $day."</br>";
}

*/

?>

<!--Go back to the previous page after its done uploading-->
<script>
    window.location = '../timemap';
</script>

<!--
    *****NOTES:*****
general Format before i split up the timetable with splitTimetable() Function:
| Monday Tuesday Wednesday Thursday Friday 
| 09:00l CS355 ELT] CS424 CB1] CS322 RH2.21] CS322 PH] 
| CS355 [ELT]
| CS424 [CB1]
| CS322 [RH2.21]
| CS322 [PH]
| 



-->