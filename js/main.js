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
 
//googleCalendarApiKey: 'AIzaSyBIkPthcMusoSDbqB9gxVWbcS-lYo6mx34', 

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
      defaultDate: '2016-01-12',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
            // some original fullCalendar examples
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
        ]
    });

    // adding a every monday and wednesday events:
    $('#calendarr').fullCalendar( 'addEventSource',        
        function(start, end, callback) {
            // When requested, dynamically generate virtual
            // events for every monday and wednesday.
            var events = [];

            for (loop = start.getTime();
                 loop <= end.getTime();
                 loop = loop + (24 * 60 * 60 * 1000)) {

                var test_date = new Date(loop);

                if (test_date.is().monday()) {
                    // we're in Moday, create the event
                    events.push({
                        title: 'I hate mondays - Garfield',
                        start: test_date
                    });
                }

                if (test_date.is().wednesday()) {
                    // we're in Wednesday, create the Wednesday event
                    events.push({
                        title: 'It\'s the middle of the week!',
                        start: test_date
                    });
                }
            } // for loop

            // return events generated
            callback( events );
        }
    );
    
  });
