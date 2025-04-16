import Experience from '../Experience.js'
import Environment from './Environment.js'
import DeviceOrientation from './../Utils/DeviceOrientation.js'

import Floor from './Floor.js'
import Mountain from './Mountain.js'
import Particles from './Particles.js'
import Tree from './Tree.js'

import Audio from './Audio.js'



export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.mountain = new Mountain()
            this.particles = new Particles()
            this.tree = new Tree()



            this.audio = new Audio()

            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.mountain)
            this.mountain.update()
        if(this.particles)
            this.particles.update()
        if(this.tree)
            this.tree.update()
        if(this.plans)
            this.plans.update()
        if(this.plan)
            this.plan.update()
        if(this.videos)
            this.videos.update()
    }
}