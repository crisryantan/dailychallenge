var fs   = require( 'fs' );
var zlib = require( 'zlib' );

// synchronous method
var readable = fs.createReadStream( __dirname + '/greet.txt' );

var writable = fs.createWriteStream( __dirname + '/greetcopy.txt' );

var compressed = fs.createWriteStream( __dirname + '/greet.txt.gz' );

// readable, writable stream.
var gzip = zlib.createGzip();

// the readable is the source and the writable is the destination and it sets up the vent listener
// to listen for the chunk of data and then this whole function will return writable
readable.pipe( writable );

readable.pipe( gzip ).pipe( compressed );