var EventEmitter = require( 'events' );
var util         = require( 'util' );

function Greetr () {
	this.greeting = 'Hello World';
}

util.inherits( Greetr, EventEmitter );

Greetr.prototype.greet = function ( data ) {
	console.log( this.greeting + ': ' + data );

	// since we inherit everything from EventEmitter we could use the emit method.
	this.emit( 'greet', data );
}

var greeter = new Greetr();

greeter.on( 'greet', function ( data ) {
	console.log( 'greet has been triggered' + ': ' + data )
} )

greeter.greet( 'Ryan' );