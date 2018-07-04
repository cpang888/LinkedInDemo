  function start() {

    IN.Event.on(IN, "auth", getProfileData);

    // Setup an event listener to make an API call once auth is complete
    function onLinkedInLoad() {
      console.log("onLinkedInLoad")

      // $( "#logout" ).click(function() {
      //   console.log("onclick");
      //   logout();
      // });

      // function logout(){
      //   console.log("LinkedIn logout");
      //   IN.User.logout(onLogout);
      // }

      // function onLogout(){
      //   // window.location = "/logout";
      //   console.log('Logout successfully');
      // }
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

        var linkedInUrl = "https://api.linkedin.com/v2/recommendedJobs?q=byMember";
        $.ajax({url: linkedInUrl,
          type: 'GET',
          contentType: "application/json",
          // headers: header, /* pass your header object */
          dataType: 'jsonp',
          success: function(data) {
            console.log(data);
          },
          error: function(err) {
            console.log('Error', err);
          },
        });

        // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/recommendedJobs?q=byMember";

        // $.ajax({
        //   url: queryURL,
        //   method: "GET"
        // }).then(function(response) {
        //     console.log(response);
        // });

      }).error(function (data) {
        console.log(data);
      });
    }
  }

  $(document).ready(function() {
    // when document is ready, call the start method
    start();
    
  })