

function mandelpel( imgData ) {

  var mandleCache = new Array( imgData.data.length / 4 ) ;

  var width = Math. sqrt( imgData.data.length / 4 ) ;
  var scale = 3 ;
  var max   = 255 ;
  var centerR = 0 ;
  var centerI = 0 ;

  for ( var kpel = 0 ; kpel < mandleCache.length ; kpel ++ ) {

    const x =  (kpel)      % width ;
    const y = ((kpel) - x) / width ;

    const r = (centerR - scale) + (x / width) * 2 * scale ;
    const i = (centerI + scale) - (y / width) * 2 * scale ;

    const incsToEscape = expandMandlebrot(r, i, max) ;

    mandleCache[kpel] = incsToEscape ;

  }

  return mandleCache ;

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
    width: canvasSize,
    height: canvasSize,
    collision_detect: function() {},
  } ;

  var viz = $Z.helper.viz.setup(vizConfig) ; // frameDuration computed

  var imageWidth  = canvasSize ;
  var imageHeight = canvasSize ;

  var fracImage = $Z.helper.image.create( imageWidth, imageHeight ) ;
  var imgData = $Z.helper.image.get_data(fracImage) ;

  // console.log('imgData', imgData) ;

  var cache = mandelpel( imgData ) ;

  // console.log(  'cache', cache, 'max', Math.max.apply(null, cache), 'min', Math.max.apply(null, cache) ) ;

  setgray( cache, fracImage ) ;

  var fractalItem = viz.setup_item({
    
    image: fracImage,
    x: 0,
    y: 0,

  }) ;

  // var fractalConfig = { 

  //   x: viz.width  * 0.5,
  //   y: viz.height * 0.5,
  //   xOrigin: fractalCanvas.width * 0.5,
  //   yOrigin: fractalCanvas.height * 0.5,
  //   image: fractalImage,
  //   opacity: .25,
  //   uiSwitch: false,
  //   addSwitch: true,
  //   viz: viz,

  // } ;

}