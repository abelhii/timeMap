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
});


/* Javascript to setup/initialise FullCalendar */
$(document).ready(function() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendarr').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      googleCalendarApiKey: 'AIzaSyBIkPthcMusoSDbqB9gxVWbcS-lYo6mx34',
      eventSources: [
            {
                googleCalendarId: 'p52pqevg7jmba3d8lla6l9afhs@group.calendar.google.com'
            },
            {
                url:'../timeMap/PHP/timetable_json.php',
                color:'#ffee55',
                textColor:'#555'
            }
      ]
      
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
    });
    
  });
