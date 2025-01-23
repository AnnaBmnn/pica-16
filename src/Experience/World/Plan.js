import * as THREE from 'three'
import Experience from '../Experience.js'
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Plan
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.audio = this.experience.world.audio
        this.camera = this.experience.camera
        this.videos = document.querySelectorAll('.js-video-texture')

        this.textures = [
            this.resources.items.picture1Texture,
            this.resources.items.picture2Texture,
            this.resources.items.picture3Texture,
        ]
        this.debug = this.experience.debug
        this.meshes = []


        this.setGeometry()


        for(let i = 0; i < 1; i++){
            this.setMaterial(i)
            this.setMesh(i)
        }
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Plan')

            this.debugFolder
                .add(this.mesh.position, 'x')
                .name('position x')
                .min(-100)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.position, 'y')
                .name('position y')
                .min(-100)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.position, 'z')
                .name('position z')
                .min(-100)
                .max(100)
                .step(0.01)

            this.debugFolder
                .add(this.mesh.scale, 'x')
                .name('scale x')
                .min(0)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.scale, 'y')
                .name('scale y')
                .min(0)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.scale, 'z')
                .name('scale z')
                .min(0)
                .max(100)
                .step(0.01)

            this.debugFolder
                .add(this.mesh.rotation, 'x')
                .name('rotation x')
                .min(0)
                .max(7)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.rotation, 'y')
                .name('rotation y')
                .min(0)
                .max(7)
                .step(0.01)
            this.debugFolder
                .add(this.mesh.rotation, 'z')
                .name('rotation z')
                .min(0)
                .max(7)
                .step(0.01)
        }
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry( 10, 10, 124, 124);
    }

    setMaterial(i)
    {
        
        this.material = new THREE.MeshStandardMaterial({
            map: new THREE.VideoTexture( this.videos[i]),
            //normalMap: new THREE.VideoTexture( this.videos[i]),
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            //blending: THREE.SubtractiveBlending  
        })
        
        /*
        this.material = new THREE.ShaderMaterial({
            depthWrite: true,
            // blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: screenVertexShader,
            fragmentShader: screenFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.8,
            uniforms: {
                uTime: {value: 0},
                uTexture: { type: "t", value: this.textures[i]}
            }
        })
        */
    }

    setMesh(i)
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.x = 9.04
        this.mesh.position.y = -5.71
        this.mesh.position.z = -3

        this.mesh.scale.x = 28.7 
        this.mesh.scale.y = 28.7 
        this.mesh.scale.z = 28.7 

        this.mesh.rotation.x = 4.85


        // this.mesh.rotation.x = - Math.PI * 0.5

        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
        this.meshes.push(this.mesh)
    }
    update()
    {
        //this.mesh.rotation.z += 0.00001
        
        this.mesh.lookAt(this.camera.controls.object.position)
            

        
    }
}