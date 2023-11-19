import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Loading } from "element-ui";
import * as THREE from "three";

export const loader = (modelPath) => {
  let manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
    // 更新进度条的宽度
    console.log(loaded, total);
    let progress = (loaded / total) * 100;
    let dom = document.getElementById("loading-bar");
    if (dom) {
      dom.style.width = progress + "%";
    }
  };
  return new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader(manager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/lib/3d/js/draco/gltf/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(modelPath, (gltf) => {
      const scene = gltf.scene;
      resolve(scene);
      dracoLoader.dispose();
      gltf.scene.traverse((model) => {
        if (model.isMesh) {
          model.geometry.dispose();
          model.material.dispose();
        }
      });
    });
  });
};

export const loaderAnimation = (modelPath) => {
  return new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/lib/3d/js/draco/gltf/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(modelPath, (gltf) => {
      const scene = gltf.scene;
      resolve(gltf);
      dracoLoader.dispose();
      gltf.scene.traverse((model) => {
        if (model.isMesh) {
          model.geometry.dispose();
          model.material.dispose();
        }
      });
    });
  });
};
