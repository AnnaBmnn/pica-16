import * as THREE from 'three'
import Experience from '../Experience.js'
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Videos
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.audio = this.experience.world.audio
        this.videos = document.querySelectorAll('.js-video-texture')

        this.texturesFixed = [
            this.resources.items.picture1Texture,
            this.resources.items.picture2Texture,
            this.resources.items.picture3Texture,
        ]

        this.textures = []
        this.meshes = []
        this.materials = []

        console.log(this.videos)

        this.loadTextures()
        this.setGeometry()

        /*
        for(let i = 0; i < this.textures.length; i++){
            this.setMaterial(i)
            this.setMesh(i)
        }
        */

    }
    loadTextures()
    {
        for(let i = 0; i < this.videos.length; i++)
        {
            //console.log('ici')
            //this.videos[i].play()
            this.videos[i].addEventListener('canplaythrough', ()=> {
                console.log('load')
                this.textures[i] = new THREE.VideoTexture( this.videos[i]);
                this.setMaterial(i)
                this.setMesh(i)
                
            }, {once: true})
        }
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry( 10, 10, 124, 124);
    }

    setMaterial(i)
    {

        this.materials[i] = new THREE.MeshStandardMaterial({
            map: this.textures[i],
            normalMap: this.texturesFixed[i],
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            // blending: THREE.SubtractiveBlending  
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
        this.mesh = new THREE.Mesh(this.geometry, this.materials[i])
        this.mesh.position.z = -3 + i * 0.1
        // this.mesh.rotation.x = - Math.PI * 0.5

        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
        this.meshes.push(this.mesh)
    }
    update()
    {
        if(this.meshes && this.meshes.length > 0)
        {
            //this.material.uniforms.uTime.value = this.time.elapsed
            
            for(let i = 0; i < this.meshes.length; i++ ){
                this.meshes[i].position.x = Math.cos(this.time.elapsed * 0.0001 + i + 3) * 10
                this.meshes[i].position.z = -3 + i * 0.1 + Math.sin(this.time.elapsed * 0.0001 + i + 2) * 10
                this.meshes[i].position.y = Math.cos(this.time.elapsed * 0.0001 + i + 3) * 10
            }

        }
    }
}