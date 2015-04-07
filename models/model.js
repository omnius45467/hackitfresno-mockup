/**
 * Created by jeremyrobles on 4/7/15.
 */
require([], function(){
    // detect WebGL
    if( !Detector.webgl ){
        Detector.addGetWebGLMessage();
        throw 'WebGL Not Available'
    }
    // setup webgl renderer full page
    var renderer	= new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    // setup a scene and camera
    var scene	= new THREE.Scene();
    var camera	= new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 5;

    // declare the rendering loop
    var onRenderFcts= [];

    // handle window resize events
    var winResize	= new THREEx.WindowResize(renderer, camera)

    //////////////////////////////////////////////////////////////////////////////////
    //		default 3 points lightning					//
    //////////////////////////////////////////////////////////////////////////////////

    var ambientLight= new THREE.AmbientLight( 0xffffff )
    scene.add( ambientLight)
    var frontLight	= new THREE.DirectionalLight('white', 1)
    frontLight.position.set(0.5, 1.5, 2)
    scene.add( frontLight )
    var backLight	= new THREE.DirectionalLight('white', 10)
    backLight.position.set(-0.5, -0.5, -2)
    scene.add( backLight )

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object and make it move					//
    //////////////////////////////////////////////////////////////////////////////////
    var num 	= Math.floor((Math.random() * 10) + 2);
    var geometry	= new THREE.SphereGeometry( num, num, num, num);
    var material	= new THREE.MeshBasicMaterial({wireframe:true});
    var mesh	= new THREE.Mesh( geometry, material );
    scene.add( mesh );

    onRenderFcts.push(function(delta, now){
        mesh.rotateX(5 * delta);
        mesh.rotateY(1 * delta);
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		Camera Controls							//
    //////////////////////////////////////////////////////////////////////////////////
    var mouse	= {x : 0, y : 0}
    document.addEventListener('mousemove', function(event){
        mouse.x	= (event.clientX / window.innerWidth ) - 1
        mouse.y	= (event.clientY / window.innerHeight) - 1
    }, false)
    onRenderFcts.push(function(delta, now){
        camera.position.x += (mouse.x*3 - camera.position.x) * (delta*3)
        camera.position.y += (mouse.y*2 - camera.position.y) * (delta*3)
        camera.lookAt( scene.position )
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		render the scene						//
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function(){
        renderer.render( scene, camera );
    })

    //////////////////////////////////////////////////////////////////////////////////
    //		Rendering Loop runner						//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec	= nowMsec
        // call each update function
        onRenderFcts.forEach(function(onRenderFct){
            onRenderFct(deltaMsec/1000, nowMsec/1000)
        })
    })
})