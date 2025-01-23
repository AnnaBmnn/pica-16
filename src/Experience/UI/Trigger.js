import EventEmitter from '../Utils/EventEmitter.js'


export default class Trigger extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.buttonStimulus = document.querySelector('.js-button-trigger-stimulus')
        this.buttonOrder = document.querySelector('.js-button-trigger-order')

        // Binding
        this.onButtonStimulusClick = this.onButtonStimulusClick.bind(this)
        this.onButtonOrderClick = this.onButtonOrderClick.bind(this)


        // Event
        this.buttonStimulus.addEventListener('click', this.onButtonStimulusClick)
        this.buttonOrder.addEventListener('click', this.onButtonOrderClick)
    }

    onButtonStimulusClick()
    {
        this.trigger('trigger-stimulus')
        this.buttonStimulus.classList.add('display-none')

    }
    onButtonOrderClick()
    {
        this.trigger('trigger-order')
    }
}