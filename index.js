const http = require('http');

http.createServer(function (req, res) {
  const remoteFileUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; // Replace with the actual file URL

  http.get(remoteFileUrl, function (remoteRes) {
    if (remoteRes.statusCode !== 200) {
      console.error('Failed to fetch remote file:', remoteRes.statusCode);
      res.statusCode = 500;
      res.end('Failed to fetch remote file');
      return;
    }

    res.setHeader('Content-Disposition', 'attachment; filename="file.mp4"');
    res.setHeader('Content-Type', 'video/mp4');

    remoteRes.pipe(res);
  }).on('error', function (error) {
    console.error('Error fetching remote file:', error);
    res.statusCode = 500;
    res.end('Error fetching remote file');
  });
}).listen(process.env.PORT || 3000, function () {
  console.log('Server started on port', this.address().port);
});
