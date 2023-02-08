import { GLTFLoader } from './GLTFLoader.js';
import { RGBELoader } from './RGBELoader.js';
import * as THREE from 'three';

import HDRAsset from './assets/royal_esplanade_1k.hdr';
import DamagedHelmetAsset from './assets/DamagedHelmet.gltf';
import './assets/DamagedHelmet.bin';
import './assets/Default_albedo.jpg';
import './assets/Default_AO.jpg';
import './assets/Default_normal.jpg';
import './assets/Default_emissive.jpg';
import './assets/Default_metalRoughness.jpg';

export const main = ({ renderer, renderTarget, camera, scene, gui }) => {
  const clock = new THREE.Clock();
  let helmet;

  console.log(scene);

  new RGBELoader()
    .load(HDRAsset, function(texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.backgroundBlurriness = 0.3;
      scene.environment = texture;

      const loader = new GLTFLoader();
      loader.load(DamagedHelmetAsset, function(gltf) {
        helmet = gltf.scene;
        helmet.scale.set(0.4, 0.4, 0.4);
        scene.add(helmet);
      });
    });

  const render = () => {
    const delta = clock.getDelta();

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    if (helmet) {
      helmet.rotation.y += delta * 0.1;
    }
    renderer.render(scene, camera);
  };

  const resize = (width, height) => {
    //
  };

  const dispose = () => {
    //
  };

  return {
    render: render,
    resize: resize,
    dispose: dispose,
  };
};
