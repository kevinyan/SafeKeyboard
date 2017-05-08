fis.match( '*.less', {
	parser: fis.plugin( 'less' ),
	rExt: '.css'
} )


fis.match( '*.es6', {
	parser: fis.plugin( 'babel-6.x', {
		sourceMaps: true
	} ),
	rExt: '.js'
} );



fis.hook( 'commonjs' );
fis.match( '::package', {
	postpackager: fis.plugin( 'loader', {

		// allInOne: true
	} ),
} );


fis.match( '*.es6', {
	isMod: true
} );
