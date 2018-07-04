  function start() {

    IN.Event.on(IN, "auth", getProfileData);

    // Setup an event listener to make an API call once auth is complete
    function onLinkedInLoad() {
      console.log("onLinkedInLoad")
    }

    // Logout user
    function logout(){
      IN.User.logout(onLogout);
    }

    function onLogout(){
      console.log('Logout successfully');
    }

    $( "#logout" ).click(function() {
      console.log("onclick");
      logout();
    });

    // Use the API call wrapper to request the member's basic profile data
    function getProfileData() {

      IN.API.Profile("me").fields("first-name", "last-name", "email-address","picture-url",
          "summary", "specialties", "industry", "positions").result(function (data) {
        
        var userdata = data.values[0];

        console.log(userdata);

        console.log(userdata.positions[0]);
        // var govJobsUrl = "https://jobs.search.gov/jobs/search.json?query=%Technology%+jobs+in+Atlanta,Georgia";


      }).error(function (data) {
        console.log(data);
      });
    }

    var linkedInUrl = "https://api.linkedin.com/v2/recommendedJobs?q=byMember";
    $.ajax({url: linkedInUrl,
      type: 'GET',
      contentType: "application/json",
      // Access-Control-Allow-Origin: "GET",
      // headers: header, /* pass your header object */
      dataType: 'jsonp',
      async: false,
      // headers: {},
      success: function(data) {
        console.log("success");
        console.log(data);
      },
      error: function(err) {
        console.log('Error', err);
      }
    }).then(function(response) {
      console.log(response);
    });

    var githubURL = "https://jobs.github.com/positions?description=technology&location=atlanta";
    $.ajax({url: githubURL,
      type: 'GET',
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(data) {
        console.log("success");
        console.log(data);
      },
      error: function(err) {
        console.log('Error', err);
      }
    }).then(function(response) {
      console.log(response);
    });

    var queryURL = "https://jobs.search.gov/jobs/search.json?query=%Technology%+jobs+in+Atlanta,Georgia";
    // var queryURL = "https://api.linkedin.com/v2/recommendedJobs?q=byMember";

    $.ajax({
      url: queryURL,
      method: "GET",
      contentType: "application/json",
      dataType: 'jsonp'
    }).then(function(response) {
        console.log(response);
    });
  }

  $(document).ready(function() {
    // when document is ready, call the start method
    start();
    
  })