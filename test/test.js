const delay = async (number) => {
  return new Promise((reslove) => {
    setTimeout(() => reslove(), number)
  })
}

describe('on-intersection element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('on-intersection')
      assert.equal('ON-INTERSECTION', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.OnIntersectionElement()
      assert.equal('ON-INTERSECTION', el.nodeName)
    })
  })

  describe('intersection logic', function () {
    beforeEach(function () {
      window.innerHeight = '600px'
      document.body.innerHTML = `
        <div id="mocha-fixture">
          <header id="header" style="height: 1000px;">
            <h1>Title</h1>
          </header>
          <main id="main" style="height: 1000px;">
          </main>
          <footer id="footer" style="height: 1000px;">
          </footer>
          <on-intersection of="header">
            <a id="anchor" href="#">To bottom</a>
          </on-intersection>
        </div>
      `
    })
    it('shows child element if viewport is intersection "of" element', async function () {
      const headerElement = document.getElementById('header')
      headerElement.scrollIntoView()
      await delay(100)

      const onIntersectionElement = document.querySelector('on-intersection')
      expect(onIntersectionElement.classList.contains('show')).true
      expect(onIntersectionElement.style.visibility).to.equal('visible')
      expect(onIntersectionElement.style.opacity).to.equal('1')
    })
    it('hides child element if viewport is not intersection "of" element', async function () {
      const footerElement = document.getElementById('footer')
      footerElement.scrollIntoView()
      await delay(100)

      const onIntersectionElement = document.querySelector('on-intersection')
      expect(onIntersectionElement.classList.contains('show')).false
      expect(onIntersectionElement.style.visibility).to.equal('hidden')
      expect(onIntersectionElement.style.opacity).to.equal('0')
    })
    it('should toggle show and hide with scrolling element in and out of view', async function () {
      const headerElement = document.getElementById('header')
      const footerElement = document.getElementById('footer')
      const onIntersectionElement = document.querySelector('on-intersection')

      headerElement.scrollIntoView()
      await delay(100)
      expect(onIntersectionElement.classList.contains('show')).true
      expect(onIntersectionElement.style.visibility).to.equal('visible')
      expect(onIntersectionElement.style.opacity).to.equal('1')

      footerElement.scrollIntoView()
      await delay(100)
      expect(onIntersectionElement.classList.contains('show')).false
      expect(onIntersectionElement.style.visibility).to.equal('hidden')
      expect(onIntersectionElement.style.opacity).to.equal('0')

      headerElement.scrollIntoView()
      await delay(100)
      expect(onIntersectionElement.classList.contains('show')).true
      expect(onIntersectionElement.style.visibility).to.equal('visible')
      expect(onIntersectionElement.style.opacity).to.equal('1')
    })
  })
  describe('intersection logic with "hide" attribute passed in', function () {
    beforeEach(function () {
      window.innerHeight = '600px'
      document.body.innerHTML = `
        <div id="mocha-fixture">
          <header id="header" style="height: 1000px;">
            <h1>Title</h1>
          </header>
          <main id="main" style="height: 1000px;">
          </main>
          <footer id="footer" style="height: 1000px;">
          </footer>
          <on-intersection of="header" hide>
            <a id="anchor" href="#">To bottom</a>
          </on-intersection>
        </div>
      `
    })
    it('hides child element if viewport is intersection "of" element and "hide" attribute is passed in', async function () {
      const headerElement = document.getElementById('header')
      headerElement.scrollIntoView()
      await delay(100)

      const onIntersectionElement = document.querySelector('on-intersection')
      expect(onIntersectionElement.classList.contains('show')).false
      expect(onIntersectionElement.style.visibility).to.equal('hidden')
      expect(onIntersectionElement.style.opacity).to.equal('0')
    })

    it('shows child element if viewport is not intersection "of" element and "hide" attribute is passed in', async function () {
      const footerElement = document.getElementById('footer')
      footerElement.scrollIntoView()
      await delay(100)

      const onIntersectionElement = document.querySelector('on-intersection')
      expect(onIntersectionElement.classList.contains('show')).true
      expect(onIntersectionElement.style.visibility).to.equal('visible')
      expect(onIntersectionElement.style.opacity).to.equal('1')
    })
  })
})
