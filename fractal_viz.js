function mandelpel( N, scale ) {

  if( scale === undefined ) {
    scale = 3 ;
  }

  var mandleCache = new Array( N ) ;

  var width = Math.sqrt( N ) ;
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
  var fracSprite = $Z.helper.image.create( size, size ) ;
  var max       = 255 ;

  var invertedCache = new Array( cache.length ) ;

  for ( var kpel = 0 ; kpel < cache.length ; kpel ++ ) {
    invertedCache[kpel] = max - cache[kpel] ;
  }

  setgray( invertedCache, fracSprite ) ;

  return fracSprite ;

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

  // console.log('fractal viz start') ;

  var canvasSize = 500 ;

  var vizConfig = {
    frameDurationFactor: 4,
    width:  canvasSize,
    height: canvasSize,
    collision_detect: function() {},
  } ;

  var scaleScale = 1.075 ;
  var Nscale     = 30 ;
  var scaleGrid  = new Array( Nscale ) ;

  scaleGrid[0] = .25 ;
  for( var ks = 1 ; ks < Nscale ; ks ++ ) {
    scaleGrid[ks] = scaleGrid[ks - 1] * scaleScale ;
  }

  // console.log('scaleGrid', scaleGrid) ;

  var viz = $Z.helper.viz.setup( vizConfig ) ; // frameDuration computed

  var imageWidth  = canvasSize ;
  var imageHeight = canvasSize ;

  var fracSprite = new Array( Nscale ) ;
  var rev        = new Array( Nscale ) ;
  for( var kimg = 0 ; kimg < Nscale ; kimg++ ) { // builds the sprite
    fracSprite[kimg] = $Z.helper.image.create( imageWidth, imageHeight ) ;
    var cache = mandelpel( imageWidth * imageHeight, scaleGrid[kimg] ) ;
    setgray( cache, fracSprite[kimg] ) ;
    rev[kimg] = fracSprite[kimg] ; // copy pointer to image
  }

  rev.reverse() ;
  fracSprite = fracSprite.concat( rev ) ;

  var Nitem = 1 ;
  var fractalItem = new Array( Nitem ) ;

  fractalItem[0] = viz.setup_item({

    image: fracSprite[0],
    x: 0,
    y: 0,
    opacity: 1,

  }) ;

  // var zoomTransition = $Z.helper.sprite.animate( fracSprite, viz.image_transition )[0] ;
  function zoom_trans() {
    return $Z.helper.sprite.animate_loop({ Nstep: 60 }, fracSprite, viz.image_transition ).animation[0] ;
  }

  // var zoomTransition = $Z.helper.sprite.animate_loop({ Nstep: 60 }, fracSprite, viz.image_transition ).animation ;

  // fractalItem[0].add_transition( zoomTransition ) ;
  fractalItem[0].loop( zoom_trans ) ;

  viz.run() ;

  // viz.fadeDuration = 500 ;

  // console.log('zoomTransition', zoomTransition) ;

  // var fracSprite2 = invertedImage( cache ) ;

  // fractalItem[1] = viz.setup_item({

  //   image: fracSprite2,
  //   x: 0,
  //   y: 0,
  //   opacity: 1,

  // }) ;

  // fractalItem[0].loop_fade() ;
  // fractalItem[0].call('focus', 1) ; // weird delay bug

}
