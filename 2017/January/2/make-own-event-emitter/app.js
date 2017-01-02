var Emitter = require( './emitter' );
var emtr = new Emitter();

emtr.on( 'greet', function () {
	console.log( 'Testing if my listener works' );
} );

emtr.on( 'greet', function () {
	console.log( 'Testing..')
} );

emtr.emit( 'greet' );