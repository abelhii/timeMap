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

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      //on toggle tab display calendar; without this fullcalendar wouldnt load properly:
      $('#calendarr').fullCalendar('render');
      //recenter google maps to maynooth
      var mu = new google.maps.LatLng({lat: 53.382207, lng: -6.598396});
      map.setCenter(mu);
      map.setZoom(16);
  });
});

//For bootstrap tabs to work with hashes, so I can switch tabs with the URL:
//http://stackoverflow.com/questions/12131273/twitter-bootstrap-tabs-url-doesnt-change
$(function(){
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});  


/*
window.onbeforeunload = myFunction;
function myFunction(event){
    var currentURL = document.location.href;
    var index = currentURL.indexOf("?code=");

    if(index > -1){
        //setTimeout(function(){document.location.href = currentURL.substring(0, index);},500);
        document.location.href = currentURL.substring(0, index); 
    }
    return console.log(false);
}*/

//****DOESNT WORK IN CHROME FOR SOME REASON :/
//change the url to prevent reuse of token on refresh
$(window).unload(function() {
    var currentURL = document.location.href;
    var index = currentURL.indexOf("?code=");
    if(index > -1) 
        document.location.href = currentURL.substring(0, index); 

    return false;
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




//*************** Main CALENDAR / MAP interaction *****************//
/*Javascript to setup/initialise FullCalendar */
function initialiseCal(){
    $('#calendarr').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay'
      },
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      minTime:'7:00',
      maxTime:'22:00',
      googleCalendarApiKey: 'AIzaSyBIkPthcMusoSDbqB9gxVWbcS-lYo6mx34',
      eventSources: [
            {
                googleCalendarId: calendarId
                //,color: #3a87ad; <-- default color
            },
            {
                url: timetable,
                color:'#ffee55',
                textColor:'#555'
            }
      ],
      eventClick: function(event, jsEvent, view) {
        //On CLick event for when the user clicks an item in the calendar:

        var point = new Array();
        //format the time to be readable using 'moment'
        var start = moment(event.start).format('dddd: hh:mm');
        var end = moment(event.end).format('hh:mm');
        //ajax to call php function to query sql which will show the location of the lecture.
        getPos(event.title, point, start, end, false);
        //switch to Google Map tab and place location marker:
        if(getPos)
          $('#tabs a[href="#gMap"]').tab('show');
        
        //open event in a seperate tab if it has a URL (google calendar)
        if (event.url) {
            window.open(event.url);
            return false;
        }

      }
    });
    var event={id:1 , title: 'New event', start:  new Date()};
    $('#calendar').fullCalendar( 'renderEvent', event, true);
}


//ajax for sql query to get the locations of lectures:
function getPos(event, pointArr, start, end, nMark){
  $.ajax({
    url:'PHP/getPos.php',
    type: "POST",
    data: { eventTitle: event},
    success: function(data){
        console.log(data);
    },
    complete: function (response) {
        pointArr = getLatLng(response.responseText);
        //var pos = {lat:  , lng: };
        var pos = new google.maps.LatLng(parseFloat(pointArr[1]),parseFloat(pointArr[0]));
        if(nMark)
          newMarker(pos, event, start, end);
        else
          placeMarker(pos, event, start, end);
    },
    error: function () {
        $('#output').html('there was an error!');
    }
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


//displays whole week on Google Map:
function displayAllLectures(){
    //remove previous markers:
    clearMarkers();
    //switch to Maps tab:
    $('#tabs a[href="#gMap"]').tab('show');

    var start, end;
    var pointArr = new Array;
    var event = $('#calendarr').fullCalendar('clientEvents', function(evt) {
        return evt.source;
    });
    console.log(event[0].source.color);
    for(var i = 0; i<event.length; i++){
      start = moment(event[i].start).format('dddd: hh:mm');
      end = moment(event[i].end).format('hh:mm');
      if(event[i].source.color == '#ffee55')//if it isn't a google calendar event I can query my SQL
        getPos(event[i].title, pointArr, start, end, true);
      //else
        //TODO: GET GOOGLE CALENDAR LOCATION
    }

}


//****************************************************************************************//


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