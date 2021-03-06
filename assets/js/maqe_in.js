(function(){
  var canvas = document.getElementById('canvas-in');
  var degrees = Math.PI/180;
  var container, stats;
  var camera, scene, renderer;
  var group;
  var targetRotation = 0;
  var targetRotationOnMouseDown = 0;
  var mouseX = 0;
  var mouseXOnMouseDown = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var cardText = "Sample text";
  var loader = new THREE.FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {
    init( font );
    animate();
  });

  function init(font) {
    container = document.createElement( 'div' );
    canvas.appendChild( container );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 150, 500 );
    scene = new THREE.Scene();

    cardText = decodeURIComponent(document.location.search.substring("6")).replace(/\+/g, ' ').toUpperCase();

    console.log(cardText.length)

    group = new THREE.Group();

    // Floor
    var floorCube = new THREE.BoxGeometry(400, 1, 200);
    var floorMat = new THREE.MeshBasicMaterial({ color: 0xa8a8a8 });
    var floor = new THREE.Mesh(floorCube, floorMat);
    floor.position.set(0,0,100);
    group.add(floor);
    scene.add(group);

    // Back wall
    var wallCube = new THREE.BoxGeometry(400, 1, 200);
    var wallMat = new THREE.MeshBasicMaterial({ color: 0xa8a8a8 });
    var backWall = new THREE.Mesh(wallCube, wallMat );
    backWall.rotation.x = degrees * 90;
    backWall.position.set(0,100,0);
    group.add(backWall);
    scene.add(group);

    var geometry = new THREE.TextGeometry( cardText, {
      font: font,
      size: 40,
      height: 20,
      curveSegments: 2
    });
    geometry.computeBoundingBox();

    var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    var material = new THREE.MultiMaterial( [
      new THREE.MeshBasicMaterial( { color: 0x404040, overdraw: 0.5 } ),
      new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
    ] );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(centerOffset,2,0);
    mesh.rotation.x = degrees * -2;
    group.position.set(0,100,0);
    group.add( mesh );
    scene.add( group );

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.domElement );

    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  //
  // function onDocumentMouseDown( event ) {
  //   event.preventDefault();
  //   document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //   document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  //   document.addEventListener( 'mouseout', onDocumentMouseOut, false );
  //   mouseXOnMouseDown = event.clientX - windowHalfX;
  //   targetRotationOnMouseDown = targetRotation;
  // }

  // function onDocumentMouseMove( event ) {
  //   mouseX = event.clientX - windowHalfX;
  //   targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
  // }

  // function onDocumentMouseUp( event ) {
  //   document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  //   document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  //   document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  // }

  // function onDocumentMouseOut( event ) {
  //   document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  //   document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  //   document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  // }

  // function onDocumentTouchStart( event ) {
  //   if ( event.touches.length == 1 ) {
  //     event.preventDefault();
  //     mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
  //     targetRotationOnMouseDown = targetRotation;
  //   }
  // }

  // function onDocumentTouchMove( event ) {
  //   if ( event.touches.length == 1 ) {
  //     event.preventDefault();
  //     mouseX = event.touches[ 0 ].pageX - windowHalfX;
  //     targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
  //   }
  // }
  //
  function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
  }

  function render() {
    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
    renderer.render( scene, camera );
  }
})();
