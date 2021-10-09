export class OnIntersectionElement extends HTMLElement {
  private observer?: IntersectionObserver
  private observerOptions = {
    threshold: [0, 1],
  }
  private showOnIntersection?: boolean

  static get observedAttributes(): string[] {
    return ['of', 'hide']
  }

  connectedCallback(): void {
    this.observer = new IntersectionObserver(this.handleIntersectionChange.bind(this), this.observerOptions)
    const elementIdToObserve = this.getAttribute('of')
    if (elementIdToObserve) {
      this.observeElementWithId(elementIdToObserve)
    }
    this.showOnIntersection = !this.hasAttribute('hide')
  }

  disconnectedCallback(): void {
    this.observer?.disconnect()
  }

  attributeChangedCallback(attrName: string, oldValue: string, newValue: string): void {
    if (attrName === 'of') {
      this.unobserveElementWithId(oldValue)
      this.observeElementWithId(newValue)
    } else if (attrName === 'hide') {
      this.showOnIntersection = !this.hasAttribute('hide')
    }
  }

  observeElementWithId(id: string): void {
    const element = document.getElementById(id)
    if (element) {
      this.observer?.observe(element)
    }
  }

  unobserveElementWithId(id: string): void {
    const element = document.getElementById(id)
    if (element) {
      this.observer?.unobserve(element)
    }
  }

  handleIntersectionChange(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting === this.showOnIntersection) {
        this.style.visibility = 'visible'
        this.style.opacity = '1'
        this.classList.add('show')
      } else {
        this.style.visibility = 'hidden'
        this.style.opacity = '0'
        this.classList.remove('show')
      }
    }
  }
}

if (!customElements.get('on-intersection')) {
  window.OnIntersectionElement = OnIntersectionElement
  customElements.define('on-intersection', OnIntersectionElement)
}

declare global {
  interface Window {
    OnIntersectionElement: typeof OnIntersectionElement
  }
  interface HTMLElementTagNameMap {
    'on-intersection': OnIntersectionElement
  }
}
