import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;


document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/logo.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    // create AR object
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const model = await loadGLTF('./assets/models/test1.gltf');

    // create anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);
    anchor.group.add(model.scene);

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
