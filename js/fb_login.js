// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI(true);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    testAPI(false);
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    testAPI(false);
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    //console.log(response.authResponse.userID); //GETS USER ID, USE THIS TO IDENTIFY USERS OF TIMEMAP
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1220850114594589',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

/* Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.6&appId=1220850114594589";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




//handles converting circular structure to json
function censor(censor) { 
  var i = 0;
  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '';//'[Circular]'; 
    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';
    ++i; // so we know we aren't using the original object anymore
    return value;  
  }
}

function getEvents(userId){ //load events wehn user logs in
  $.ajax({
    url: 'PHP/getEvents.php',
    type: "POST",
    data: {userId: userId},
    success: function(data){
      $('#output').html(data);
      //timetable = '../timeMap/PHP/getEvents.php';
      //remove events
      //$('#calendarr').fullCalendar('removeEventSource', '../timeMap/PHP/timetable_json.php?sem=sem1');
      //$('#calendarr').fullCalendar('removeEventSource', '../timeMap/PHP/timetable_json.php?sem=sem2');
      //add events switch events
      $('#calendarr').fullCalendar('addEventSource', JSON.parse(data));
      
      //$('#calendarr').fullCalendar('renderEvent', data, true);
    },
    error: function(data){
      console.log(data);
      $('#output').html(data+'</br>'+data['status']+'</br>there was an error');
    }
  });
}


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(connected) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    var login = document.getElementById('login');
    
    if(connected){//if account is connected
      console.log('Successful login for: ' + response.name);
      

      writeCookie('loggedin', 'true', 1);//to notify fullcalendar that the user is logged in
      login.value = response.name;
      login.className = "btn btn-warning"
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
      $('#saveCal').show();


      $('#saveCal').click(function(){ //the user will click this to save their calendar in the database
        var events = getAllLectures('source');
        var jsonev = "";//= JSON.stringify(events[0], censor(events[0])); 
        var createEvent, desc = "", loc = "" ;

        if(events[0] != null){
          for(var i = 0; i<=events.length; i++){
            try{
              console.log(events[i]);
              console.log(events[i].description);
              if(events[i].description != null)
                desc = events[i].description;
              if(events[i].location != null)
                loc = events[i].location;
              createEvent = "{"+
                               "title:" + events[i].title   +","+
                               "start:" + events[i].start.format() +","+
                               "end:" + events[i].end.format()   +","+
                               "description: "+ desc + "," +
                               "location: "+ loc +
                            "}"
              jsonev = jsonev.concat(createEvent);//JSON.stringify(events[i], censor(events[i]))); //concat each event (json objects) together 
            }catch(err){
              console.log(err);
            }
          }
        }
        sendUserDetails('PHP/saveCal_mdb.php', response.id, jsonev, true);
      });

      console.log(response.id);
      getEvents(response.id); //load events into fullcalendar:
    }
    else if(!connected){
      writeCookie('loggedin', 'false', 1);
      $('#saveCal').hide();
      login.value = "Login";
      login.className = "btn btn-primary";
      document.getElementById('status').innerHTML = 'Please log into Facebook';
    }
  });
}