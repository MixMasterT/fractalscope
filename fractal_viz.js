function mandelpel( N ) {

  var mandleCache = new Array( N ) ;

  var width = Math.sqrt( N ) ;
  var scale = 3 ;
  var max   = 255 ;
  var centerR = 0 ;
  var centerI = 0 ;

  for ( var kpel = 0 ; kpel < N ; kpel ++ ) {

    const x =  (kpel)      % width ;
    const y = ((kpel) - x) / width ;

    const r = (centerR - scale) + (x / width) * 2 * scale ;
    const i = (centerI + scale) - (y / width) * 2 * scale ;

    const incsToEscape = expandMandlebrot(r, i, max) ;

    mandleCache[kpel] = incsToEscape ;

  }

  return mandleCache ;

}

function invertedImage( cache ) {

  var size      = Math.sqrt( cache.length ) ;
  var fracImage = $Z.helper.image.create( size, size ) ;
  var max       = 255 ;

  var invertedCache = new Array( cache.length ) ;

  for ( var kpel = 0 ; kpel < cache.length ; kpel ++ ) {
    invertedCache[kpel] = max - cache[kpel] ;
  }

  setgray( invertedCache, fracImage ) ;  

  return fracImage ;

}

function expandMandlebrot (real, imaginary, max) {

  var incsCount = 0;
  var r = real;
  var i = imaginary;
  var magnitude = Math.sqrt(real * real + imaginary * imaginary);
  var newReal = 0;
  
  while(magnitude < 4.0) {
  
    ++incsCount;
    if(incsCount > max) { return -1; }
    newReal = r * r - i * i + real;
    i = r * i * 2 + imaginary;
    r = newReal;
    magnitude = Math.sqrt(r * r + i * i);
  
  }

  return incsCount ;

} ;

function setgray(gray, canvas) {

    img = $Z.helper.image.get_data(canvas) ;

    var Npel = gray.length ;
    var opacity = 255 ;

    for (var k = 0 ; k < Npel ; k++) {

      var offset = k * 4 ;
      img.data[offset + 0] = gray[k] ;
      img.data[offset + 1] = gray[k] ;
      img.data[offset + 2] = gray[k] ;
      img.data[offset + 3] = opacity ;

    }

    canvas.context().putImageData(img, 0, 0) ;

}

function fractal_viz() {

  console.log('fractal viz start') ;
  
  var canvasSize = 500 ;

  var vizConfig = {
    width:  canvasSize,
    height: canvasSize,
    collision_detect: function() {},
  } ;

  var viz = $Z.helper.viz.setup( vizConfig ) ; // frameDuration computed

  var imageWidth  = canvasSize ;
  var imageHeight = canvasSize ;

  var fracImage = $Z.helper.image.create( imageWidth, imageHeight ) ;
  var cache     = mandelpel( imageWidth * imageHeight ) ;

  setgray( cache, fracImage ) ;

  var fractalItem = new Array( 2 ) ;

  fractalItem[0] = viz.setup_item({
    
    image: fracImage,
    x: 0,
    y: 0,
    opacity: 0,

  }) ;

  var fracImage2 = invertedImage( cache ) ;

  fractalItem[1] = viz.setup_item({
    
    image: fracImage2,
    x: 0,
    y: 0,
    opacity: 1,

  }) ;

  viz.run() ;

  viz.fadeDuration = 1000 ;

  fractalItem[0].loop_fade() ;
  fractalItem[0].call('focus', 1) ; // weird delay bug

}