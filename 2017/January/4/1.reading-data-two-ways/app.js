var fs = require( 'fs' );

// synchronous method
var greet = fs.readFileSync( __dirname + '/greet.txt', 'utf8' );
console.log( greet )

// asynchronous method
var greet2 = fs.readFile( __dirname + '/greet.txt', 'utf8',
function ( err, data ) {
	console.log( data )
});

console.log( 'Done' );