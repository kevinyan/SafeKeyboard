fis.match( '*.less', {
	parser: fis.plugin( 'less' ),
	rExt: '.css',
	release: './index.css'
} )


fis.match( '*.es6', {
	parser: fis.plugin( 'babel-6.x', {
		sourceMaps: true
	} ),
	rExt: '.js',
	release: './index.js'
} );

fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('**', {
  relative: true
})


fis.hook( 'commonjs' );
fis.match( '::package', {
	postpackager: fis.plugin( 'loader', {
		// allInOne: true
	} ),
} );


fis.match( '*.es6', {
	isMod: true
} );
