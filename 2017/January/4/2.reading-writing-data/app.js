var fs = require( 'fs' );

// synchronous method
var readable = fs.createReadStream( __dirname + '/greet.txt',
	{ encoding : 'utf8', highWaterMark : 32 * 1024 } );

var writable = fs.createWriteStream( __dirname + '/greetcopy.txt' );

readable.on( 'data', function ( chunk ) {
	// emitting 2 chunks, 64kb files divided into by 32 equals to 2 chunks..
	console.log( chunk.length )
	writable.write( chunk )
} );