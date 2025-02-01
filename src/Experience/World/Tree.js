import * as THREE from 'three'
import Experience from '../Experience.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Tree
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.uniforms = null

        console.log(CustomShaderMaterial)
        this.setMaterial = this.setMaterial.bind(this)

        this.video = document.querySelector('.js-video-tree')


        // Resource
        this.tree = this.resources.items.arbres.scene

        this.tree.position.y -= 0

        // this.tree2 = this.tree.clone()

        this.scene.add(this.tree)
        // this.scene.add(this.tree2)


        this.tree.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = false

            }
        })

        //this.setModel()
        // this.loadTexture()
        // this.tweakMaterial()
        this.setMaterial()


        // Debug
        if(this.debug.active )
        {
            this.debugFolder = this.debug.ui.addFolder('Tree')

            this.debugFolder
                .add(this.tree.position, 'y')
                .name('position y')
                .min(-20)
                .max(20)
                .step(0.1)

        }
    }
    setMaterial()
    {
        // this.tree.children[0].material.emissive = new THREE.Color('#000000')
        this.uniforms = {
            uTime: new THREE.Uniform(0)
        }

        const material = new CustomShaderMaterial({
            // CSM
            baseMaterial: this.tree.children[0].material,
            vertexShader: screenVertexShader,
            fragmentShader: screenFragmentShader,

            uniforms: this.uniforms,
        })

        this.tree.children[0].material = material
    }
    loadTexture()
    {
        this.video.addEventListener('canplaythrough', ()=> {
            // contreee.log('load')
            this.texture = new THREE.VideoTexture( this.video)
            this.texture.flipY = false
            console.log(this.tree)

            this.tree.children[0].material.emissiveMap = this.texture
            // this.texture.magFilter = THREE.NearestFilter
            // this.texture.minFilter = THREE.NearestFilter
            // this.tree.children[0].material.map = this.texture
            // this.tree.children[0].material.emissive = new THREE.Color('#FFFFFF')


            this.tree.children[0].material.needsUpdate = true
            
            this.tweakMaterial()
        }, {once: true})
    }
    tweakMaterial(){
        // this.tree.children[0].material.map = null
        // this.tree.children[0].material.emissiveMap = null
        this.tree.children[0].material.emissive = new THREE.Color('#000000')
        // this.tree.children[0].material.color = new THREE.Color('#000000')
        this.tree.children[0].material.needsUpdate = true


        this.tree.children[0].material.onBeforeCompile = (shader) =>
        {
            console.log(shader)
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <begin_vertex>',
                `
                    #include <begin_vertex> 
                    vPosition = vec3( position );
                    varying vec2 vUv;
                    vUv = uv;
                `
            )
            
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <color_fragment>',
                `
                    #include <color_fragment> 

                    diffuseColor.rgb *=  step(0.5, mod(vUv.y * 10.0, 1.0));


                `
            )
            // shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '')
            
        } 
    }
    update()
    {
        if(this.uniforms){
            //let _scale = this.experience.world.audio.frequenceAverage * 0.005
            //this.model.scale.set(_scale, _scale, _scale)

            // Materials
            this.uniforms.uTime.value = this.time.elapsed
        }

    }
}