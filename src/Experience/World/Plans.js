import * as THREE from 'three'
import Experience from '../Experience.js'
import screenVertexShader from '../../shaders/sorting/vertex.glsl'
import screenFragmentShader from '../../shaders/sorting/fragment.glsl'

export default class Plans
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.audio = this.experience.world.audio
        this.textures = [
            this.resources.items.picture1Texture,
            this.resources.items.picture2Texture,
            this.resources.items.picture3Texture,
        ]
        this.meshes = []
        this.materials = []


        this.setGeometry()


        for(let i = 0; i < this.textures.length; i++){
            this.setMaterial(i)
            this.setMesh(i)
        }

    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry( 10, 10, 1024, 1024);
    }

    setMaterial(i)
    {
        /*
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures[i],
            normalMap: this.textures[i],
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            //blending: THREE.SubtractiveBlending  
        })
        */
        
        this.materials[i] = new THREE.ShaderMaterial({
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
                uTexture: { type: "t", value: this.textures[i]},
                uTextureAlpha: { type: "t", value: this.textures[2]},

            }
        })
        
    }

    setMesh(i)
    {
        this.mesh = new THREE.Mesh(this.geometry, this.materials[i])
        this.mesh.position.z = -3 + i * 3.0
        // this.mesh.rotation.x = - Math.PI * 0.5

        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
        this.meshes.push(this.mesh)
    }
    update()
    {

        
        if(this.materials && this.materials.length > 0)
        {
            
            for(let i = 0; i < this.materials.length; i++ ){
                this.materials[i].uniforms.uTime.value = this.time.elapsed

            }

        }
        
    }
}