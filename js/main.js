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




/*Javascript to switch between semesters in FullCalendar */
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
                googleCalendarId: 'abelhii@gmail.com'
            },
            {
                url: timetable,
                color:'#ffee55',
                textColor:'#555'
            }
      ],
      eventClick: function(event, jsEvent, view) {

        alert('Event: ' + event.title + '\n' +
          'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY + '\n' +
          'View: ' + view.name);

        //ajax to call php function which will show the location of the lecture.
        $.ajax({
            url:'js/test.php',
            complete: function (response) {
                $('#output').html(response.responseText);
            },
            error: function () {
                $('#output').html('Bummer: there was an error!');
            }
        });

        // change the border color just for fun
        //$(this).css('border-color', 'red');


        //open in a new window
        if (event.url) {
            window.open(event.url);
            return false;
        }

      }
    });
}
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