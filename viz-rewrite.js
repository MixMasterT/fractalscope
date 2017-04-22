document.vizRewrite = function vizRewrite() {

  console.log('fractal-viz page start') ;

  document.ratio = 1 ;

  var vizSize = 1600 ;
  var fadeDur  = 500 ;

  var viz = $Z.helper.viz.setup({

    width:  vizSize,
    height: vizSize,
    fadeDuration: fadeDur,
    coverSwitch: true,
    hCenter: true,
    vCenter: true,
    opacity: 1,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance

  }) ;

  document.viz = viz;

  viz.run();

  var upArrow = $Z.helper.image.to_canvas(document.imageList[0]);

  console.log(upArrow);

  viz.setup_item({
    image: upArrow,
    x: vizSize * 0.5,
    y: vizSize * 0.5,
    xScale: 0.5,
    yScale: 0.5,
    uiSwitch: true,
    callback: function() { console.log('callback invoked');},
  })
  var upArrow = $Z.helper.image.to_canvas(document.imageList[0]);

  console.log(upArrow);

  viz.setup_item({
    image: upArrow,
    x: vizSize * 0.5,
    y: vizSize * 0.5,
    xScale: 0.5,
    yScale: 0.5,
    uiSwitch: true,
    callback: function() { console.log('callback invoked');},
  })
  var upArrow = $Z.helper.image.to_canvas(document.imageList[0]);

  viz.setup_item({
    image: upArrow,
    x: vizSize * 0.5,
    y: vizSize * 0.5,
    xScale: 0.5,
    yScale: 0.5,
    uiSwitch: true,
    callback: function() { console.log('callback invoked');},
  })
  var rightArrow = $Z.helper.image.to_canvas(document.imageList[1]);

  console.log(rightArrow);

  viz.setup_item({
    image: rightArrow,
    x: vizSize * 0.5,
    y: vizSize * 0.5,
    xScale: 0.5,
    yScale: 0.5,
    uiSwitch: true,
    callback: function() { console.log('callback invoked');},
  })

  // var socialSize = 100 ;
  //
  // var simg = [
  //   './img/social/facebook.png',
  //   './img/social/twitter.png',
  //   './img/social/linkedin.png',
  // ] ;
  //
  // var socialPad = socialSize * 0.5 ;
  //
  // viz.social = {
  //   facebook: viz.setup_item({
  //     image: $Z.helper.image.to_canvas(simg[0]),
  //     fixed: true,
  //     opacity: 0.8,
  //     x: 10,
  //     y: 10,
  //     xScale: 0.5,
  //     yScale: 0.5,
  //     uiSwitch: true,
  //     callback: function() {
  //       window.location.href = 'https://facebook.com/nanobio.md' ;
  //     }
  //   }),
  //   twitter: viz.setup_item({
  //     image: $Z.helper.image.to_canvas(simg[1]),
  //     fixed: true,
  //     opacity: 0.8,
  //     x: 10,
  //     y: socialPad + socialSize * 0.5,
  //     xScale: 0.5,
  //     yScale: 0.5,
  //     uiSwitch: true,
  //     callback: function() {
  //       window.location.href = 'https://twitter.com/nanobiomd' ;
  //     }
  //   }),
  //   linkedin: viz.setup_item({
  //     image: $Z.helper.image.to_canvas(simg[2]),
  //     fixed:true,
  //     opacity: 0.8,
  //     x: socialPad + socialSize * 0.5,
  //     y: 10,
  //     xScale: 0.5,
  //     yScale: 0.5,
  //     uiSwitch: true,
  //     callback: function() {
  //       window.location.href = 'https://linkedin.com/company/nanobio-md' ;
  //     }
  //   }),
  // } ;

  // console.log('viz', viz) ;

} ;
