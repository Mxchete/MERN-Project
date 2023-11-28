// AudioVisualizer.js
import React, { useEffect, useContext, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { AudioContextState } from '../Context/AudioContext';

const AudioVisualizer = () => {
    const visualizerContainerRef = useRef();
    const { audioContext } = useContext(AudioContextState);

    console.log('AudioVisualizer render');


    useLayoutEffect(() => {
        if (!audioContext) {
            return;
        }

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const container = visualizerContainerRef.current;

        // three.js setup should be done after ensuring the ref is not undefined
        if (container) {

          console.log('we can render the scene');
        
          const scene = new THREE.Scene();

          const aspectRatio = window.innerWidth / 400; // Match the height to 400px
          const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);        

          // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer();

          // renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setSize(visualizerContainerRef.current.clientWidth, visualizerContainerRef.current.clientHeight);
          visualizerContainerRef.current.appendChild(renderer.domElement);

          // const geometry = new THREE.BoxGeometry(1, 1, 1);
          // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          // const cube = new THREE.Mesh(geometry, material);
          // scene.add(cube);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // color, intensity
          directionalLight.position.set(1, 1, 1); // x, y, z
          scene.add(directionalLight);

          //create geometry and material
          const greenGeo = new THREE.SphereGeometry(1, 4, 4);

          const blueGeo = new THREE.SphereGeometry(0.5, 4, 4);

          const greenMat = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });

          const blueMat = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: true });

          // create a mesh from geometry and material
          const outer = new THREE.Mesh(greenGeo, greenMat);

          const inner = new THREE.Mesh(blueGeo, blueMat);


          // add cube to the scene
          scene.add(outer);
          scene.add(inner);
      
          camera.position.z = 5;
          console.log("Camera position:", camera.position);




          renderer.setClearColor(0x212121, 1); // Black background

          renderer.render(scene, camera);

          // Event listener for window resize
          const onWindowResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
          };

          window.addEventListener('resize', onWindowResize);

          console.log(container.clientWidth, container.clientHeight);


          const animate = () => {

            requestAnimationFrame(animate);

            // rotation that automatically occurs
            outer.rotation.z += 0.002;
            outer.rotation.y += 0.002;

            inner.rotation.z += 0.004;
            inner.rotation.y += 0.004;
        
            analyser.getByteFrequencyData(dataArray);
        
            // Simple visualization: scale the cube based on the first frequency data point
            const scale = dataArray[0] / 128;
        
            renderer.render(scene, camera);
          };
        
          animate();

          // const onWindowResize = () => {
          //   camera.aspect = window.innerWidth / window.innerHeight;
          //   camera.updateProjectionMatrix();
          //   // renderer.setSize(window.innerWidth, window.innerHeight);
          //   renderer.setSize(window.innerWidth, 400); // Match the height to 400px as set in the container style
          // };
      
          // Cleanup function to disconnect everything
          return () => {
            window.removeEventListener('resize', onWindowResize);

            renderer.dispose();
            if (container) {
              container.removeChild(renderer.domElement);
            }
          };
        };
  }, [audioContext]);

  return (
    <div ref={visualizerContainerRef} id="visualizerContainer" style={{ width: '800px', height: '400px', border: '1px solid red' }}>
        {/* This will give a visible boundary to your container */}
    </div>
  );
};

export default AudioVisualizer;
