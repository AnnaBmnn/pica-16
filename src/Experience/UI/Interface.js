export default class Interface
{
    constructor()
    {
        this.firstButton = document.querySelector('.js-button-next')
        this.firstSection = document.querySelector('.js-section-first')

        this.hideScreen = this.hideScreen.bind(this)


        this.firstButton.addEventListener('click', this.hideScreen)
    }

    hideScreen()
    {
        this.firstSection.classList.add('is-hidden')
    }
}