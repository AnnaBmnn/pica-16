


import * as THREE from 'three'
import Experience from '../Experience.js'

// https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/

export default class Snow
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.camera = this.experience.camera

        this.isOrder = false


        // Resource
        this.resources = 
        [
            this.resources.items.snowFlakeTexture1,
            this.resources.items.snowFlakeTexture2,
            this.resources.items.snowFlakeTexture3,
            this.resources.items.snowFlakeTexture4,
        ]


        this.parameters = [
            [[ 0.0, 0.0, 1.0 ], this.resources[0], 1.0 ],
            [[ 0.0, 0.0, 1.0 ], this.resources[1], 0.9 ],
            [[ 0.0, 0.0, 1.0 ], this.resources[2], 0.7 ],
            [[ 0.0, 0.0, 1.0 ], this.resources[3], 0.5 ],
        ]

        /*
        parameters = [
            [[ 1.0, 0.2, 0.5 ], sprite2, 20 ],
            [[ 0.95, 0.1, 0.5 ], sprite3, 15 ],
            [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
            [[ 0.85, 0, 0.5 ], sprite5, 8 ],
            [[ 0.80, 0, 0.5 ], sprite4, 5 ]
        ]
        */

        // Geometry
        this.particlesGeometry = new THREE.BufferGeometry()
        this.count = 25000

        // Position
        this.positions = new Float32Array(this.count * 3)
        this.setPositions()

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        // Materials
        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            color: new THREE.Color('#4ab8e2'),
            transparent: true,
            // alphaMap: this.resources[0],
            // alphaTest: 0.5,
            //depthTest: false,
            depthWrite: false,
            // blending: THREE.AdditiveBlending,
            vertexColors: true,
        });


        // Points
        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.particles.position.set(0, 0, 0);
        this.particles.scale.set(10.0, 10.0, 10.0);
        this.scene.add(this.particles);

        this.initialParams = {
            Attractor: "Lorenz variation",
            sigma: 10,
            rho: 28,
            beta: 8 / 3,
            kappa: 200,
            speed: 0.001,
            autoRotate: true
        };
        // attractor chua
        this.dt = 1.0; // Time step for attractor simulation
        // this.dt = 0.0001;
        this.setCurve = this.setCurve.bind(this)
        this.attractor = this.attractor.bind(this)
        this.attractorChau = this.attractorChau.bind(this)

        const axesHelper = new THREE.AxesHelper( 5 )
        this.scene.add( axesHelper );

        this.initialPositions = []
        this.resetInitialPositions()
        this.setCurve()

        this.experience.trigger.on('trigger-stimulus', ()=>{
            this.curveObject.visible = true
        })

        this.experience.trigger.on('trigger-order', ()=>{
            this.isOrder = true

            this.camera.instance.position.set(
                40,
                7,
                -68
            )
            this.camera.instance.rotation.set(
                -3,
                0.5,
                3
            )
        })

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Snow')

            /*
            this.debugFolder
                .add(this.geometry.position, 'x')
                .name('position x')
                .min(-100)
                .max(100)
                .step(0.01)
            */
            
        }
    }
    resetInitialPositions (){
        this.initialPositions = []

        //chua 
        const size = 1.0;
        
        // const size = 40;

        for (let i = 0; i < this.count; i++) {
            this.initialPositions.push({
                x: (Math.random() - 0.5) * size,
                y: (Math.random() - 0.5) * size,
                z: (Math.random() - 0.5) * size
            });
        }
    }
    setPositions()
    {
        for (let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5) * 1;
        }
    }
    setVertices()
    {
        for ( let i = 0; i < count; i ++ ) {

            const x = Math.random() * 0.5 - 1.0
            const y = Math.random() * 0.5 - 1.0
            const z = Math.random() * 0.5 - 1.0

            this.vertices.push( x, y, z )

        }
    }
    setCurve()
    {
        //Create a closed wavey loop
        this.positionCurve = []
        /*
        this.initalPositionsCurve = new THREE.Vector3(
            3.619173690171568,
            2.4277559947551337,
            0.08119092966911379
        )
        */
        // CHAU
        
        this.initalPositionsCurve = new THREE.Vector3(
            0.01,
            0.1,
            0.0
        )
        
        var dx = 0
        var dy = 0
        var dz = 0

        this.positionCurve.push(new THREE.Vector3( this.initalPositionsCurve.x, this.initalPositionsCurve.y, this.initalPositionsCurve.z ))

        for (let i = 0; i < 20000; i++) {
            
            const { dx, dy, dz } = this.attractorChau( this.initalPositionsCurve.x, this.initalPositionsCurve.y, this.initalPositionsCurve.z)

            
            // chua
            this.initalPositionsCurve.x += dx;
            this.initalPositionsCurve.y += dy;
            this.initalPositionsCurve.z += dz;
            
            /*
            this.initalPositionsCurve.x += dx * 0.0001;
            this.initalPositionsCurve.y += dy * 0.0001;
            this.initalPositionsCurve.z += dz * 0.0001;
            */
            // console.log(this.initalPositionsCurve)
    
            this.positionCurve.push(new THREE.Vector3( this.initalPositionsCurve.x, this.initalPositionsCurve.y, this.initalPositionsCurve.z))
        }

        const curve = new THREE.CatmullRomCurve3(this.positionCurve );

        const points = curve.getPoints( 20000 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        this.curveObject = new THREE.Line( geometry, material );
        this.curveObject.scale.set(10.0, 10.0, 10.0)
        this.curveObject.visible = false

        this.scene.add(this.curveObject)
    }
    attractor(x, y, z) 
    {
        /*
        const { sigma, rho, beta, kappa, speed } = this.initialPositions;

        const dx = (sigma * (y - x) + (Math.sin(y / 5) * Math.sin(z / 5) * kappa)) * speed;
        const dy = (x * (rho - z) - y + (Math.sin(x / 5) * Math.sin(z / 5) * kappa)) * speed;
        const dz = (x * y - beta * z + Math.cos(y / 5) * Math.cos(x / 5) * kappa) * speed;

        return { dx, dy, dz };
        */
        const b = 0.19
        const timestep = 1000
        const dx = (-b*x + Math.sin(y)) * timestep
        const dy = (-b*y + Math.sin(z)) * timestep
        const dz = (-b*z + Math.sin(x)) * timestep


        return { dx, dy, dz };

    }

    setGeometry()
    {
        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) )
    }

    setPoints()
    {
        this.customUniforms = {
            uTime: { value: 0 }
        }
        for ( let i = 0; i < this.parameters.length; i ++ ) {

            const color = this.parameters[ i ][ 0 ]
            const sprite = this.parameters[ i ][ 1 ]
            const size = this.parameters[ i ][ 2 ]

            this.materials[ i ] = new THREE.PointsMaterial( { 
                size: size, 
                map: sprite, 
                blending: THREE.AdditiveBlending,  
                depthTest: false, 
                transparent: true, 
                sizeAttenuation: true, 
                alphaMap: sprite,
            } )
            this.materials[ i ].color = new THREE.Color('#ffffff')

            const particles = new THREE.Points( this.geometry, this.materials[ i ] )

            particles.rotation.x = Math.random() * 6
            particles.rotation.y = Math.random() * 6
            particles.rotation.z = Math.random() * 6

            this.scene.add( particles )
            console.log(particles)

        }
    }
    
    attractorChau(x, y, z)
    {

        const c1 = 15.6
        const c2 = 1
        const c3 = 28
        const m0 = -1.143
        const m1 = -0.714

        const timestep = 0.025
        const dx = c1*(y-x-(m1*x+(m0-m1)/2*(Math.abs(x+1)-Math.abs(x-1)))) * timestep
        const dy = c2*(x-y+z) * timestep
        const dz = -c3*y * timestep

        return { dx, dy, dz };         
    }
    update()
    {
        if(this.experience){
            
            for (let i = 0; i < this.count; i++) {
                const { x, y, z } = this.initialPositions[i];
                const { dx, dy, dz } = this.attractorChau(x, y, z);
        
                this.initialPositions[i].x += dx * this.dt;
                this.initialPositions[i].y += dy * this.dt;
                this.initialPositions[i].z += dz * this.dt;

                // console.log(dx)
        
                const i3 = i * 3;
                this.positions[i3] = this.initialPositions[i].x;
                this.positions[i3 + 1] = this.initialPositions[i].y;
                this.positions[i3 + 2] = this.initialPositions[i].z;
                /*
                if(!this.isOrder){
                    if(i == 0){
                        this.camera.instance.position.set(
                            this.initialPositions[i].x,
                            this.initialPositions[i].y,
                            this.initialPositions[i].z
                        )
                    }
                }

                */
                
                
            }
        
            this.particlesGeometry.attributes.position.needsUpdate = true;
            
            
        }
        
    }
}
