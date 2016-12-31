//Run jquery
$(document).ready(function(){
  var following = [];
  var onlineUsers = [];
  //freecodecamp stream info and status api call
  var url = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp";
  $.getJSON(url, function(data1){
    if(data1.stream === null) {
      $("#fccStatus").html("FreeCodeCamp is currently OFFLINE");
    }
    else {
      $("#fccStatus").html("FreeCodeCamp is currently ONLINE");
    }
  });
  //Using the api to get FCC's followers and push them to the 'following' array
  var urlFollowers = "https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels";
  $.getJSON(urlFollowers, function(data2){
    for (var i = 0; i < data2.follows.length; i++) {
      var displayName = data2.follows[i].channel.display_name;
      following.push(displayName);

    }
    //Pushing the tester channels
    following.push('comster404');
    following.push('brunofin');
    following.push('ESL_SC2');
    following.push('gallantgamerstv');
    following.push('opsct');
    following.push('frogpants');
    following.push('freecodecamp');
    following.push('hardlydifficult');

    //Iterating through the 'following' array and getting nonexistent channels
    for(var i = 0; i<following.length; i++) {
      var url2 = "https://wind-bow.gomix.me/twitch-api/channels/" + following[i];
      //$.getJSON(url2).done(function(data3){
      $.getJSON(url2, function(data3){
        var logo;
        var name;
        var status;
        if (data3.error){
          logo = "http://prancingthroughlife.com/wp-content/uploads/2014/03/na.jpg";
          name = data3.error;
          status = data3.message;
          $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" +
          "<img class='logo' src = '" + logo + "'>" + "</div>" + "<div class='col-md-4'>" +
          name + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div><br>");
        }

      });
    }
    //Getting channels that are currently streaming
    for (var i=0; i<following.length; i++) {

      var onlineURL = "https://wind-bow.gomix.me/twitch-api/streams/" + following[i];
      $.getJSON(onlineURL).done(function(data4){
        var logo;
        var name;
        var status;
        var channelURL;
        if (data4.stream != null) {
          logo = data4.stream.channel.logo;
          name = data4.stream.channel.display_name;
          onlineUsers.push(name);
          status = data4.stream.channel.status;
          channelURL = data4.stream.channel.url;
          $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" +
          "<a href='" + channelURL + "' target='_blank'><img class='logo' src = '" + logo + "'></a>" +
          "</div>" + "<div class='col-md-4'>" +
          name + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div><br>");
        }
        });




    }
    //Getting channels that aren't currenly streaming
    for (var i=0; i<following.length; i++) {
      var userURL = "https://wind-bow.gomix.me/twitch-api/users/" + following[i];
      $.getJSON(userURL, function(data5){
        var logo;
        var name;
        var status;
        var channelURL;
        if (onlineUsers.indexOf(data5.display_name) === -1 & data5.display_name != undefined) {
          if (data5.logo === null) {
            logo = "http://prancingthroughlife.com/wp-content/uploads/2014/03/na.jpg";
          }
          else {
            logo = data5.logo;
          }
          name = data5.display_name;
          status = "OFFLINE";
          channelURL = "https://www.twitch.tv/" + data5.name;
          $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" +
          "<a href='" + channelURL + "' target='_blank'><img class='logo' src = '" + logo + "'></a>" +
          "</div>" + "<div class='col-md-4'>" +
          name + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div><br>");
        }


      });
    }

  });
});
