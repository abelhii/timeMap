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
        {
          title: 'All Day Event',
          start: '2016-01-01'
        },
        {
          title: 'Long Event',
          start: '2016-01-07',
          end: '2016-01-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-01-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-01-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2016-01-11',
          end: '2016-01-13'
        },
        {
          title: 'Meeting',
          start: '2016-01-12T10:30:00',
          end: '2016-01-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-01-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-01-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-01-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-01-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-01-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-01-28'
        }
      ]
    });
    
  });
