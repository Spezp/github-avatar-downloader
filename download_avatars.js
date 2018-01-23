var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var repoInfo = process.argv.slice(2);
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var objBody = JSON.parse(body);
    cb(err, objBody);
  });
}

function downloadImageByURL(url, filePath) {
  console.log(filePath);
  console.log(url);
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoInfo[0], repoInfo[1], function(err, result){
  if(repoInfo.length !== 2) {
    console.log('Provide arguments - repo owner & repo name');
    return null;
  }
  result.forEach(function(element){
    var fileName = element.avatar_url.split('').slice(-9, -4).join('');
    fileName = fileName.replace(/\D/g, '0');
    downloadImageByURL(element.avatar_url, './images/' + fileName + '.png');

  });

});

