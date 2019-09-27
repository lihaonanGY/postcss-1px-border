# PostCSS 1px Border [![Build Status][ci-img]][ci]

[PostCSS] plugin Solve the problem of 1 pixel border on the mobile side.

## Install

```
npm i postcss-1px-border -D
```

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/lihaonan/postcss-1px-border.svg
[ci]: https://travis-ci.org/lihaonan/postcss-1px-border

```css
.foo {
  /* Input example */
  border: 1px solid #000;
}
```

```css
.foo {
  /* Output example */
  .test {
    border: 1px solid #000;
    @media (min-resolution: 2dppx) {
      .test {
        position: relative;
        border: none;
      }
      .test::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #000;
        border-radius: 0px;
        transform-origin: 0 0;
        transform: scale(0.5);
        box-sizing: border-box;
        pointer-events: none;
      }
    }
    @media (min-resolution: 3dppx) {
      .test::before {
        width: 300%;
        height: 300%;
        border-radius: 0px;
        transform: scale(0.33);
      }
    }
  }
}
```

## Usage

```js
postcss([require('postcss-1px-border')]);
```

See [PostCSS] docs for examples for your environment.
