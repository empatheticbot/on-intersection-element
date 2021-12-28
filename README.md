# On Intersection Element

[Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) used to hide and show elements based the viewports intersection with other elements.

## Installation

```bash
$ npm install --save @empatheticbot/on-intersection-element
```

## Import

**Import as ES module:**

```javascript
import '@empatheticbot/on-intersection-element'
```

**With a script tag:**

```html
<script type="module" src="./node_modules/@empatheticbot/on-intersection-element/dist/index.js">
```

_Note that the path is relative to the root of your project, this may not be the case in your application, so check to make sure your path is correct and the module is being served._

## Usage

**Example usage to create back to top anchor once header scrolls out of view:**

```html
<header id="global-header">
  <h1>On Intersection Element Examples</h1>
</header>
<main>...</main>
<on-intersection of="global-header" hide>
  <a href="#">Back to top</a>
</on-intersection>
```

**Example usage to create a to bottom anchor when header is in view:**

```html
<header id="global-header">
  <h1>On Intersection Element Examples</h1>
</header>
<main>...</main>
<footer id="footer"></footer>
<on-intersection of="global-header">
  <a href="#footer">To bottom</a>
</on-intersection>
```

The `on-intersection` component recieves the class `show` when the element with id `of` is in view. This allows custom styles to be used for animating your element. For instance, this could be used to create a sticky footer button that animates in and out from the bottom of the screen:

```css
on-intersection {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  margin-right: 4vw;
  bottom: 4vh;
  transition: 0.5s;
}

on-intersection:not(.show) {
  bottom: 0;
}
```

Finally, the changes performed to `on-intersection` when hiding/showing are:

- Sets style `visibility` to `hidden|visible`
- Sets style `opacity` to `0|1`
- Adds/removes class of `show`

## Attributes

- **`of`** - the **id** of the element to be observed for intersection.
- **`hide`** (optional) - if true, the child elements of `on-intersection` will be hidden while the element with the `of` **id** is intersecting with the viewport.

## Development

To install dependencies and build the custom element:

```
npm install
npm run build
```

The resulting built custom element can be found in the `dist` directory. From here you can start a simple HTTP server with `npm run start` and navigate to http://localhost:3000/examples/. Note that if you make changes to source you will need to run `npm run build` again and refresh the page.

Tests should be written and live next to the source code it tests. The file name should match that of what it tests with an extension of `.test.ts`. Tests can be ran with `npm run test`.

## Notes

- Special thanks to [Github Custom Element Boilerplate](https://github.com/github/custom-element-boilerplate) project for a lot of inspiration with this template.
