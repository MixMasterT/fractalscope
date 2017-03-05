function grey2rgb(grey) {
  var rgb = grey.map(function(d) {
    var tmp = d.toString(16) ;
    if (tmp.length === 1) {
      tmp = '0' + tmp ;
    }
    return tmp ;
  }) ;
  return rgb ;
}

function mandelpel(imgData) {

  var mandleCache = new Array( imgData.data.length / 4 ) ;

  var width = sqrt( imgData.data.length / 4 ) ;
  var scale = 3 ;
  var max   = 255 ;

  for (let j = 0; j < imgData.data.length; j += 4) {

    const x =  (j / 4)      % width;
    const y = ((j / 4) - x) / width;

    const r = (centerR - scale) + (x / width) * 2 * scale;
    const i = (centerI + scale) - (y / width) * 2 * scale;

    const incsToEscape = expandMandlebrot(r, i, max);

    mandleCache[kpel] = incsToEscape ;
  }

}


const expandMandlebrot = (real, imaginary, max) => {
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
  return incsCount;
};

function fractal_viz() {
  console.log('fractal viz start') ;
  
  var canvasSize = 500 ;

  var vizConfig = {
    width: canvasSize,
    height: canvasSize,
    collision_detect: function() {},
  } ;

  var viz = $Z.helper.viz.setup(vizConfig) ; // frameDuration computed

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