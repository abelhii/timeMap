//For Browse style feedback to user to show what file they uploaded:
//http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
var passEquals = false;
var pass, confirm_pass, username, edit;

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
      //close info window when switching tabs so that the right infowindow appears for each marker
      if(infowindow != null)
        infowindow.close(); 
  });


  //search option for Maynooth Campus
  var point = new Array;
  var options = {
    url: "mu_campus.json",
    getValue: "name",
    list: {
      /*onSelectItemEvent: function(){
        var selected_bld = $("#searchCampus").getSelectedItemData().name;
        console.log(selected_bld);
        getLocation(selected_bld, point, "", "", false);
      },*/
      onHideListEvent: function() {
        if($("#searchCampus").val() != ""){
          //switch to Maps tab:
          $('#tabs a[href="#gMap"]').tab('show');
          getLocation($("#searchCampus").val(), point, "", "", false);
          $('#howTo').modal('hide'); 
        }
      },
      match: {
        enabled: true
      }
    }
  }
  $("#searchCampus").easyAutocomplete(options)


  //check if passwords equal each other
  $('#password_su, #confirm_pass_su').on('input', function() {
    pass = $("#password_su").val();
    confirm_pass = $("#confirm_pass_su").val();
    if(confirm_pass == pass){
      $("#equal_pass").show();
      $("#not_equal").hide();
      passEquals = true;
    }else{
      $("#equal_pass").hide();
      $("#not_equal").show();
      passEquals = false;
    }
  });


  //on modal close
  $('#addEvent-modal').on('hidden.bs.modal', function () {
    $('#delete_btn').hide();
  })


  $('#origin').geocomplete();
  $('#destination').geocomplete();
  $('#location').geocomplete(); //autocompletes location field like in Google Maps
});

//For bootstrap tabs to work with hashes, to enable switching tabs with the URL:
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

/*window.onbeforeunload = myFunction;
function myFunction(event){
    var currentURL = document.location.href;
    var index = currentURL.indexOf("?code=");
    if(index > -1){
        document.location.href = currentURL.substring(0, index); 
    }
    return console.log(false);
    //return false;
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


//*******COOKIES*******//
//http://stackoverflow.com/questions/2257631/how-create-a-session-using-javascript
function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

//check if user is logged in to their google calendar 
window.onload = function() {
    $("a.login").click(function() {
      writeCookie('gLoggedin', 'true', 1);
    });
    $("a.logout").click(function() {
      writeCookie('gLoggedin', 'false', 1);
    });
}
console.log(readCookie('gLoggedin'));
console.log(readCookie('loggedin'));
//*********************//



//*---- switch between semesters in FullCalendar ----*//
var timetable = '../timeMap/PHP/timetable_json.php?sem=sem1';
function changeT(time, e){
    e.preventDefault();
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
        right: 'month,agendaWeek,agendaDay'
      },
      prev: function(){
        alert("test");
      },
      defaultView: 'agendaWeek',
      allDaySlot:false,
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      minTime:'7:00',
      maxTime:'23:00',
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
      //set all options : options,
      selectable: true,
      selectHelper: true,
      eventOverlap: function(stillEvent, movingEvent) {
        var allEvents = getAllLectures('source'); 
        for(var i = 0; i<allEvents.length; i++)
          if(allEvents[i].color != "#ffee55")
            return stillEvent.allDay && movingEvent.allDay;
      },
      //FOR ADD EVENT //TO GOOGLE CALENDAR:
      select: function(start, end) {
        if(readCookie('loggedin') == 'true')
          addEvent(start.format(), end.format(), false);//moment(start).format('dddd hh:mm a'),moment(end).format('dddd hh:mm a'));
      },
      eventClick: function(event, jsEvent, view) {
        curr_event = event;
        //On CLick event for when the user clicks an item in the calendar:
        var point = new Array();
        //format the time to be readable using 'moment'
        var start = moment(event.start).format('dddd: hh:mm');
        var end = moment(event.end).format('hh:mm');

        if(readCookie('loggedin') == 'false' || event.source.color == "#ffee55"){ //open modal of events
          //ajax to call php function to query sql which will show the location of the lecture.
          //getPos(event.title, point, start, end, false);
          getLocation(event.title, point, start, end, false); //get location of campus buildings
        }else if(readCookie('loggedin') == 'true' && event.source.color != "#ffee55"){
          editEvent(event.title, event.location, event.description, start, end, true);
        }

        
        if (event.url) {//open event in a seperate tab if it has a URL (google calendar)
          window.open(event.url);
          return false;
        }
      },
      eventRender: function (event, element) {
        element.bind('dblclick', function() {
          if(event.source.color == '#ffee55'){
            setTimeout(function() {
              $('#addEvent-modal').modal('hide');
            }, 260);
            var point = new Array();
            var start = moment(event.start).format('dddd: hh:mm');
            var end = moment(event.end).format('hh:mm');
            getLocation(event.title, point, start, end, false); //get location of campus buildings
          }
        });
        
        if(readCookie('loggedin') == 'true'){ //right click to get location if user is logged in
          element.bind('mousedown', function (e) {
              if (e.which == 3) {
                
                if(event.source.color == '#ffee55'){
                  var point = new Array();
                  var start = moment(event.start).format('dddd: hh:mm');
                  var end = moment(event.end).format('hh:mm');
                  getLocation(event.title, point, start, end, false); //get location of campus buildings
                }
                else{
                  return false;
                }
                /*if(confirm('Are you sure you want to delete this event?')){
                  $('#calendarr').fullCalendar('removeEvents', event.id);
                  if(event.url != null)//check to see if its a gcal event:
                    deleteGCalEvent();
                }else{
                  return false;
                }*/
              }
          });
        }
      }
    });

    //re-enables import calendar events to Google Calendar for other weeks/days.
    if($('#addEventsToGCAL')[0] != null){
      $('.fc-next-button').click(function() {
        $('#addEventsToGCAL')[0].disabled = false;
      });     
      $('.fc-prev-button').click(function() {
        $('#addEventsToGCAL')[0].disabled = false;
      });
    }
}


//gets the building locations by querying a JSON file, **without querying an SQL database.**
function getLocation(event, pointArr, start, end, nMark){
  //get building locations in a variable
  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", "mu_campus.json", false);
  xhReq.send(null);
  var locations = JSON.parse(xhReq.responseText);

  //takes out the venue code from square brackets in the timetable event title
  if(event.indexOf('[') > -1){
    var tag = event.match(/\[(.*?)\]/)[1].match(/[^1-9]+/);
    for(var i = 0; i< locations.length; i++){
      if(locations[i].tagName.indexOf(tag) > -1){
        pointArr = getLatLng(locations[i].location);
      }
    } 
  }else{
    for(var i = 0; i< locations.length; i++){
      if(locations[i].name.toLowerCase().indexOf(event.toLowerCase()) > -1 || locations[i].tagName.indexOf(event.toUpperCase()) > -1){
        pointArr = getLatLng(locations[i].location);
      }
    }
  }

  //var pos = {lat:  , lng: };
  var pos = new google.maps.LatLng(parseFloat(pointArr[1]),parseFloat(pointArr[0]));
  if(pos != null){
    $('#tabs a[href="#gMap"]').tab('show'); //switch to google maps tab
    if(nMark)
      newMarker(pos, event, start, end);
    else
      placeMarker(pos, event, start, end);
  }
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
    //so it doesnt return all the events in the one month
    $(".fc-agendaWeek-button").click;//***************************************************************************************************
    $('#tabs a[href="#gMap"]').tab('show');//switch to Maps tab:
    var start, end;
    var pointArr = new Array;
    var event = getAllLectures('source');
    var center= {lat: 53.382207, lng: -6.598396} //coordinates for maynooth university
    map.setCenter(center);
    map.setZoom(16);
    //console.log(event[0].source.color);
    for(var i = 0; i<event.length; i++){
      start = moment(event[i].start).format('dddd: hh:mm');
      end = moment(event[i].end).format('hh:mm');
      if(event[i].source.color == '#ffee55')//if it isn't a google calendar event I can query the location
        getLocation(event[i].title, pointArr, start, end, true);
        //getPos(event[i].title, pointArr, start, end, true);
      //else
        //TODO: GET AND DISPLAY GOOGLE CALENDAR EVENT LOCATION
    }
}

//gets filtered events in fullcalendar 
function getAllLectures(filter){
  var events = $('#calendarr').fullCalendar('clientEvents', function(evt) {
      if(filter == 'source')
        return evt.source;
  });
  return events;
}




/******************************* GOOGLE CALENDAR FUNCTIONS*****************************************/
//adds timetable to users google calendar
function addTimeToGCal(){
  var start, end;
  var event = getAllLectures('source');
  for(var i=0; i<event.length; i++){
    //if its a timetable event add it, otherwise it will add duplicates to gcal!
    if(event[i].source.color == '#ffee55'){
      start = event[i].start.format();
      end = event[i].end.format();
      sendEvents(event[i].title, start, end, '', '');
    }
  }
  $('#addEvent-modal').modal('hide'); //close modal on click
}

//Send Events to insertEvent.php to add an event to google calendar
function sendEvents(title, start, end, location, description){
  $.ajax({
    url:'PHP/insertEvent.php',
    type: "POST",
    data: { title: title,
            start: start,
            end: end,
            location: location,
            description: description
          },
    success: function(data){
        console.log(data);
        console.log(event);
    },
    error: function () {
        $('#output').html('there was an error adding this event to your Google Calendar');
    }
  });
}

function deleteGCalEvent(){
  console.log("test DELETE");
}
//****************************************************************************************//



/********************ADD EVENT********************************************/
/****Insert Google Event****/
function addEvent(start, end, eventFlag){
  $('#title').val("");
  $('#location').val("");
  $('#description').val("");
  $('#start').val(start);
  $('#end').val(end);
  $('#eventFlag').val(eventFlag);
  $('#addEvent-modal').modal('show');
}

/*******************EDIT EVENT**************************************/
function editEvent(title, location, descr, start, end, eventFlag){
  $('#delete_btn').show();
  $('#title').val(title);
  $('#location').val(location);
  $('#description').val(descr);
  $('#start').val(start);
  $('#end').val(end);
  $('#eventFlag').val(eventFlag);
  setTimeout(function() {
    $('#addEvent-modal').modal('show');
  }, 260);
}


/*********** We get the form data ****************/ 
var tempid=1000;
$(function(){
  $('#addEvent-modal').submit(function(event) {
      event.preventDefault(); // on submit prevent page from refreshing on submit
      //get the data from modal
      var title = $('#title').val();
      var start = $('#start').val();
      var end = $('#end').val();
      var location = $('#location').val();
      var description = $('#description').val();
      var eventFlag = $('#eventFlag').val();

      if(eventFlag == "true"){ //update event
        console.log(curr_event);
        curr_event.title = title;
        curr_event.location = location;
        curr_event.description = description;
       /* $.extend(curr_event, {
            title: title,
            start: moment(start, 'YYYY-MM-DDTHH:mm:ss'),
            end: moment(end, 'YYYY-MM-DDTHH:mm:ss'),
            location: location,
            description: description
        });*/
        $('#calendarr').fullCalendar('updateEvent', curr_event);
      }else{ // because we want immediate reaction of FullCalendar, we render the created event on the FullCalendar, even if it's only temporarily
        if (title) {
          $('#calendarr').fullCalendar('renderEvent',
              {
                id: tempid++,
                title: title,
                start: start,
                end: end,
                location: location,
                description: description,
                color:'#CF5656' //shade of red
              },
              true // make the event "stick"
          );

          // Now we push it to Google:
          var gLoggedin = readCookie('gLoggedin');
          if(gLoggedin == 'true'){
            sendEvents(title, start, end, location, description); 
          }
        }else{
          alert("oops title is empty!");
        }
      }

      // Wether we had the form fulfilled or not, we clean FullCalendar and close the popup  
      $('#calendarr').fullCalendar('unselect');
      $('#addEvent-modal').modal('hide');
  });

});

function deleteEvent(){
  if(confirm('Are you sure you want to delete this event?'))
    $('#calendarr').fullCalendar('removeEvents', curr_event.id);
}



/****************SIGN UP********************************************/
$(function(){
  $('#sign_up').submit(function(event) {
    event.preventDefault(); // on submit prevent page from refreshing on submit
    username = $.trim($("#username_su").val());

    if(passEquals && username != "" && confirm_pass != "" && pass != "")
      sendUserDetails('PHP/signup_mdb.php' ,username, pass, true);
    else if(!passEquals)
      alert("password not equal!");
    else
      alert("username/password field can't be empty");

  });
});


/***************LOG IN************************************************/
$(function(){
  $('#log_in').submit(function(event) {
    event.preventDefault(); // on submit prevent page from refreshing on submit
    username = $.trim($("#username").val());
    var password = $("#password").val();

    if(username != "" && password != "")
      sendUserDetails('PHP/login_mdb.php', username, pass, false);
    else
      alert("username/password field can't be empty");

  });
});




/***************SEND DETAILS*********************************/
function sendUserDetails(dbFile, userId, events, signup){
  $.ajax({
    url: dbFile,
    type: "POST",
    data: { userId: userId,
            events: events
    },
    success: function(data){
      $('#output').html(data);
      //$('#login').hide();
      //if(signup)
        //$('#signup').modal('toggle'); //close login modal       
      //else
        //$('#log_in').modal('toggle'); //close login modal
      //$('#profilem').modal('toggle'); //open profile modal
      //$('#profile').show();
      //$('#profile').val(user);
    },
    error: function(data){
      console.log(data);
      $('#output').html(data+'</br>'+data['status']+'</br>there was an error');
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