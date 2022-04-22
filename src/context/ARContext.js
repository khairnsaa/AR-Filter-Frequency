import { createContext } from "react";
import * as THREE from 'three';
import { GLTFLoader } from '../Loaders/GLTFLoader';
import model from '../assets/modelFilter.gltf'

export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {
    const { XRWebGLLayer } = window;
    let session, renderer;

    const activateAR = async () => {
        // creating canvas, camera, scene, and renderer
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl', {xrCompatible: true})
    
        document.querySelector('.content-container').classList.add('ar')
        document.querySelector('.close-btn').classList.add('ar')
        document.querySelector('.model-menu').classList.add('ar')
        document.getElementById('arApp').appendChild(canvas)
        
        const scene = new THREE.Scene()
        
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: canvas,
            context: gl
        });
        renderer.autoClear = false;
    
        const camera = new THREE.PerspectiveCamera()
        camera.matrixAutoUpdate = false;
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 15, 10);
        scene.add(directionalLight);
    
        // create new AR session
        session = await navigator.xr.requestSession('immersive-ar',{
            requiredFeatures: ['hit-test', 'dom-overlay'],
            domOverlay: {root: document.body}
        })
        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, gl)
        })

        const referenceSpace = await session.requestReferenceSpace('local');
        const viewerSpace = await session.requestReferenceSpace('viewer');
        const hitTestSource = await session.requestHitTestSource({space: viewerSpace});

        // load the reticle and model
        const loader = new GLTFLoader()
        let reticle, lpfModel;

        loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", gltf => {
            reticle = gltf.scene;
            reticle.visible = false;
            scene.add(reticle);
        })

        loader.load(model, gltf => lpfModel = gltf.scene)

        session.addEventListener('select', () => {
            if(lpfModel){
                const clone = lpfModel.clone();
                clone.position.copy(reticle.position);
                scene.add(clone)
            }
        })

        const onXRFrame = (time, frame) => {
            session.requestAnimationFrame(onXRFrame);

            gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

            const pose = frame.getViewerPose(referenceSpace);
            if (pose) {
                const view = pose.views[0];

                const viewport = session.renderState.baseLayer.getViewport(view);

                renderer.setSize(viewport.width, viewport.height);
                
                camera.matrix.fromArray(view.transform.matrix);
                camera.projectionMatrix.fromArray(view.projectionMatrix);
                camera.updateMatrixWorld(true);
                const hitTestResults = frame.getHitTestResults(hitTestSource);

                if(hitTestResults.length > 0 && reticle){
                    const hitPose = hitTestResults[0].getPose(referenceSpace);
                    reticle.visible = true;
                    reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
                    reticle.updateMatrixWorld(true);
                }

                renderer.render(scene, camera);
            }
        }
        session.requestAnimationFrame(onXRFrame);
        
        
        document.querySelector('.close-btn').addEventListener('click', () => {
            session.end();
            document.querySelector('.content-container').classList.remove('ar')
            document.querySelector('.close-btn').classList.remove('ar')
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    return (
        <ARContext.Provider value={{activateAR}}>
            { children }
        </ARContext.Provider>
    )
}