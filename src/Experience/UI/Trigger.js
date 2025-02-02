import EventEmitter from '../Utils/EventEmitter.js'


export default class Trigger extends EventEmitter
{
    constructor()
    {
        super()

        this.delay = 2000

        // Setup
        this.firstButton = document.querySelector('.js-button-next')
        this.buttonStimulus = document.querySelector('.js-button-trigger-stimulus')
        this.buttonOrder = document.querySelector('.js-button-trigger-order')
        this.firstSection = document.querySelector('.js-section-first')
        this.sectionStimulus = document.querySelector('.js-section-stimulus')
        this.sectionOrder = document.querySelector('.js-section-order')



        // Binding
        this.hideScreen = this.hideScreen.bind(this)
        this.onButtonStimulusClick = this.onButtonStimulusClick.bind(this)
        this.onButtonOrderClick = this.onButtonOrderClick.bind(this)


        // Event
        this.firstButton.addEventListener('click', this.hideScreen)
        this.buttonStimulus.addEventListener('click', this.onButtonStimulusClick)
        this.buttonOrder.addEventListener('click', this.onButtonOrderClick)
    }
    hideScreen()
    {
        this.firstSection.classList.add('is-hidden')

        window.setTimeout(() => {
            this.sectionStimulus.classList.add('is-visible')
        }, this.delay);
    }
    onButtonStimulusClick()
    {

        this.trigger('trigger-stimulus')
        this.sectionStimulus.classList.remove('is-visible')

        window.setTimeout(() => {
            this.sectionOrder.classList.add('is-visible')
        }, this.delay);

    }
    onButtonOrderClick()
    {
        this.trigger('trigger-order')
        this.sectionOrder.classList.remove('is-visible')
    }
}