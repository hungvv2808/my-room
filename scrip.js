var mesh, renderer, scene, camera, controls;

init();
animate();

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color('#4285F4'));
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(20, 20, 20);
  scene.add(camera);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.maxPolarAngle = Math.PI / 2;

  // ambient
  scene.add(new THREE.AmbientLight(0x444444));

  // light
  var light = new THREE.PointLight(0xffffff, 0.8);
  camera.add(light);

  // geometry
  var geometry = new THREE.BoxGeometry(20.25, 10, 0.25);

  // material
  var material = new THREE.MeshLambertMaterial({
    color: '#F4B400',
  });

  // callbacks
  var onBeforeRender = (function () {
    var vector = new THREE.Vector3();

    return function onBeforeRender(
      renderer,
      scene,
      camera,
      geometry,
      material,
      group
    ) {
      // this is one way. adapt to your use case.
      if (vector.subVectors(camera.position, this.position).dot(this.userData.normal) < 0) {
        geometry.setDrawRange(0, 0);
      }
    };
  })();

  var onAfterRender = function (
    renderer,
    scene,
    camera,
    geometry,
    material,
    group
  ) {
    geometry.setDrawRange(0, Infinity);
  };

  // mesh
  meshWall1 = new THREE.Mesh(geometry, material);
  meshWall1.position.set(0, 0, 10);
  meshWall1.rotation.set(0, 0, 0);
  scene.add(meshWall1);
  meshWall1.userData.normal = new THREE.Vector3(0, 0, -1);
  meshWall1.onBeforeRender = onBeforeRender;
  meshWall1.onAfterRender = onAfterRender;

  // mesh
  meshWall2 = new THREE.Mesh(geometry, material);
  meshWall2.position.set(0, 0, -10);
  meshWall2.rotation.set(0, 0, 0);
  scene.add(meshWall2);
  meshWall2.userData.normal = new THREE.Vector3(0, 0, 1);
  meshWall2.onBeforeRender = onBeforeRender;
  meshWall2.onAfterRender = onAfterRender;

  // mesh
  meshWall3 = new THREE.Mesh(geometry, material);
  meshWall3.position.set(10, 0, 0);
  meshWall3.rotation.set(0, -Math.PI / 2, 0);
  scene.add(meshWall3);
  meshWall3.userData.normal = new THREE.Vector3(-1, 0, 0);
  meshWall3.onBeforeRender = onBeforeRender;
  meshWall3.onAfterRender = onAfterRender;

  // mesh
  meshWall4 = new THREE.Mesh(geometry, material);
  meshWall4.position.set(-10, 0, 0);
  meshWall4.rotation.set(0, Math.PI / 2, 0);
  scene.add(meshWall4);
  meshWall4.userData.normal = new THREE.Vector3(1, 0, 0);
  meshWall4.onBeforeRender = onBeforeRender;
  meshWall4.onAfterRender = onAfterRender;

  // geometry
  var geometry = new THREE.BoxGeometry(20.25, 20.25, 0.25);

  // mesh - floor
  var materialFloor = new THREE.MeshLambertMaterial({
    color: '#F4B40012',
  });
  // material.color.setHex(Number('#F4B40011'.toString().replace('#', '0x')));
  meshFloor = new THREE.Mesh(geometry, materialFloor);
  meshFloor.position.set(0, -5, 0);
  meshFloor.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(meshFloor);
  meshFloor.userData.normal = new THREE.Vector3(0, 1, 0);
  meshFloor.onBeforeRender = onBeforeRender;
  meshFloor.onAfterRender = onAfterRender;
}

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}