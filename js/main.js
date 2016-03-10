//For Browse style feedback to user to show what file they uploaded:
//http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });


    /*To make sure input timetable is in correct format and isn't empty*/
    $("#submitTimetable").on("submit", function(){
        var fileName = $("#ttFile").val();

        if(fileName.split('.').pop() == "xls" || fileName.split('.').pop() == "xlsx"){
        }else{
            alert("Error: not in excel Format (your file name should end with .xls or .xlsx)");
            return false;
        }
    });
});




//*---- switch between semesters in FullCalendar ----*//
var timetable = '../timeMap/PHP/timetable_json.php?sem=sem1';
function changeT(time){
    event.preventDefault();
    if(time == "sem1"){
      $('#sem2Btn').removeClass('active');
      $('#sem1Btn').addClass('active');
    }
    else if(time == "sem2"){
      $('#sem1Btn').removeClass('active');
      $('#sem2Btn').addClass('active');
    }
    initPath = '../timeMap/PHP/timetable_json.php?sem=';
    timetable = initPath.concat(time);
    //remove events
    $('#calendarr').fullCalendar('removeEventSource', '../timeMap/PHP/timetable_json.php?sem=sem1');
    $('#calendarr').fullCalendar('removeEventSource', '../timeMap/PHP/timetable_json.php?sem=sem2');
    //add events switch events
    $('#calendarr').fullCalendar('addEventSource', {
                url: timetable,
                color:'#ffee55',
                textColor:'#555'
    });
}


//function to change url after connecting to google calendar to avoid reuse of token error
$('.bootpopup').click(function(){
    var frametarget = $(this).attr('href');
  var targetmodal = $(this).attr('target');
  if (targetmodal == undefined) {
    targetmodal = '#popupModal';
  } else { 
    targetmodal = '#'+targetmodal;
  }
  if ($(this).attr('title') != undefined) {
    $(targetmodal+ ' .modal-header h3').html($(this).attr('title'));
    $(targetmodal+' .modal-header').show();
  } else {
     $(targetmodal+' .modal-header h3').html('');
    $(targetmodal+' .modal-header').hide();
  }  
    $(targetmodal).on('show', function () {
        $('iframe').attr("src", frametarget );   
  });
    $(targetmodal).modal({show:true});
  return false;
    
});





//*---- Main CALENDAR / MAP interaction -----*//

/*Javascript to setup/initialise FullCalendar */
function initialise(){
    $('#calendarr').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      minTime:'7:00',
      maxTime:'22:00',
      googleCalendarApiKey: 'AIzaSyBIkPthcMusoSDbqB9gxVWbcS-lYo6mx34',
      eventSources: [
            {
                googleCalendarId: 'p52pqevg7jmba3d8lla6l9afhs@group.calendar.google.com'
            },
            {
                url: timetable,
                color:'#ffee55',
                textColor:'#555'
            }
      ],
      eventClick: function(event, jsEvent, view) {
        var point = new Array();
        //format the time to be readable using 'moment'
        var start = moment(event.start).format('dddd: hh:mm');
        var end = moment(event.end).format('hh:mm');

        //On CLick event for when the user clicks an item in the calendar:
        /*alert('Event: ' + event.title + '\n' +
          'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY + '\n' +
          'View: ' + view.name);*/

        //ajax to call php function which will show the location of the lecture.
        $.ajax({
            url:'PHP/getPos.php',
            type: "POST",
            data: { eventTitle: event.title},
            success: function(data){
                console.log(data);
            },
            complete: function (response) {
                //$('#output').html(response.responseText);
                point = getLatLng(response.responseText);

                //switch to Google Map tab and place location marker:
                $('#tabs a[href="#gMap"]').tab('show');
                var pos = {lat: parseFloat(point[1]) , lng: parseFloat(point[0])};
                placeMarker(pos, event.title, start, end);

            },
            error: function () {
                $('#output').html('there was an error!');
            }
        });


        //open event in a seperate tab if it has a URL
        if (event.url) {
            window.open(event.url);
            return false;
        }

      }
    });
}


//display location on map as a marker:
var marker, infowindow;
function placeMarker(location, title, start, end) {
  if ( marker ) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title
    });
  }

  //content for the info window:
  var contentString = '<div id="infoContent">'+
                      '<h3 id="firstHeading">'+title+'</h3>'+
                      '<div id="bodyContent">'+
                      '<h4>'+start+'-'+end+'</h4>'+
                      '</div>'
                      '</div>';

  infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  //open infor window on click:    
  marker.addListener('click', function() {
      infowindow.open(map, marker);
  });
}

//splits the lat and lng into array
//NOTE: Lat is [1] and Lng is [0]
function getLatLng(point){
  var result;
  //just extracts the coordinates from the parenthesis:
  var matches = point.match(/\((.+?)\)/);
  if (matches) {
      result = matches[1].split(" ");
  }

  return result;
}



//*---------------------------------------------------*//


//for google calendar reference needed to add gcal:
//var gcal = $.fullCalendar.gcalFeed(source); // the reference




 /**[
            // some original fullCalendar examples
            {
              "allDay":"",
              "title":"\n\t\tCS355 [ELT]",
              "id":0,
              "end":"10:00",
              "start":"9:00",
              "dow":"[1]"
            }
            {
                title:"My repeating event",
                start: '10:00', // a start time (10am in this example)
                end: '14:00', // an end time (6pm in this example)
                dow: [1, 5]// Repeat monday and friday
            },
            {
                title: 'All Day Event',
                start: new Date(y, m, 1)
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2)
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
            }
        ]*/