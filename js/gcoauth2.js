var clientId = '281391249721-msahpvaiu7s8r2s9elvik1iuh7dsh51n.apps.googleusercontent.com';
var apiKey = 'AIzaSyD1JxlR86LiHAEd_h4zBcAVROocoN83c4o';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    console.log(authResult);
    makeApiCall();
    //loadCalendarApi();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary'
    });

    if(request != null){
      request.execute(function(response) {
          console.log(response.items);
          for (var i = 0; i < response.items.length(); i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(response.items[i].summary));
            document.getElementById('events').appendChild(li);
          }
      });
    }
    else{
      console.log("error error error");
    }
  });
}

  /**
   * Load Google Calendar client library. List upcoming events
   * once client library is loaded.
   */
  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'singleEvents': true,
      'orderBy': 'startTime',
      'timeMin': (new Date()).toISOString() 
      });

    request.execute(function(resp) {
      var events = resp.items;
      appendPre('Upcoming events:');

      console.log(events);
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }

    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }