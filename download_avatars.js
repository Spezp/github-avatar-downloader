var request = require('request');
var token = require('./secrets.js');
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  request(options, function(err, res, body) {
    var objBody = JSON.parse(body);
    cb(err, objBody);
  });
}

getRepoContributors('jquery', 'jquery', function(err, result){
  result.forEach(function(element){
    console.log(element.avatar_url);
  });

});