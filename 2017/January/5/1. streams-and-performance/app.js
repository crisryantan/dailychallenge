var http = require( 'http' );
var fs   = require( 'fs' );

http.createServer( function ( req, res ) {

	res.writeHead( 200, { 'Content-Type' : 'text/html' } );
	// connect a readable file stream, then pipe the response stream.
	// Every chunk of data read from the file will be buffered and then piped out of the HTP response stream.
	// Rather than pulling the entire file into a buffer and then sending it, it will be sent one chunk at a time
	//  Buffer stays small and will be faster more responsive more performant
	fs.createReadStream( __dirname + '/index.htm' ).pipe( res );

} ).listen( 3000, '127.0.0.1' );