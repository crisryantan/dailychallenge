module.exports = function ( app ) {

	app.get( '/api/person/:id', function ( req, res ) {
		// get data from database
		res.json( { 'firstname' : 'john', 'lastname' : 'doe' } );
	} );

	app.post( '/api/person', function ( req, res ) {
		// save data from database
	} );

	app.delete( '/api/person/:id', function ( req, res ) {
		// delete data from database
	} );

};