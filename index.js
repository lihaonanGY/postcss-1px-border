const postcss = require('postcss');

module.exports = postcss.plugin('postcss-1px-border', () => (css) => {
  css.walkRules((rule) => {
    rule.walkDecls('border', (decl) => {
      if (decl.value.indexOf('1px') !== -1) {
        let radius = 0;
        let color = '#000';
        let borderStyle = 'solid';
        const splitBorderValue = decl.value.split(' ');
        if (splitBorderValue.length === 3) {
          [, borderStyle, color] = splitBorderValue;
        }
        decl.parent.walkDecls('border-radius', (borderRadiusDecl) => {
          if (borderRadiusDecl.value.toLowerCase().indexOf('px') !== -1) {
            radius = borderRadiusDecl.value.substr(
              0,
              borderRadiusDecl.length - 2,
            );
          }
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 2dppx){
                ${decl.parent.selector}{
                  position: relative;
                  border: none;
                }
                ${decl.parent.selector}::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 200%;
                  height: 200%;
                  border: 1px ${borderStyle} ${color};
                  border-radius: ${radius * 2}px;
                  transform-origin: 0 0;
                  transform: scale(0.5);
                  box-sizing: border-box;
                  pointer-events: none;
                }
              }`,
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 3dppx) {
                ${decl.parent.selector}::before {
                  width: 300%;
                  height: 300%;
                  border-radius: ${radius * 3}px;
                  transform: scale(0.33);
                }
              }`,
        });
      }
    });
    function directionCommonStyle(color, top, right, bottom, left) {
      return `
          content: '';
          position: absolute;
          background-color: ${color};
          display: block;
          z-index: 1;
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          left: ${left};
        `;
    }
    rule.walkDecls('border-top', (decl) => {
      if (decl.value.indexOf('1px') !== -1) {
        let color = '#000';
        const splitBorderValue = decl.value.split(' ');
        if (splitBorderValue.length === 3) {
          [, , color] = splitBorderValue;
        }
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 2dppx){
                ${decl.parent.selector} {
                  position: relative;
                  border-top: none;
                }
                ${decl.parent.selector}::before {
                  ${directionCommonStyle(color, 0, 'auto', 'auto', 0)}
                  width: 100%;
                  height: 1px;
                  transform-origin: 50% 50%;
                  transform: scaleY(0.5);
                }
              }`,
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 3dppx) {
                ${decl.parent.selector}::before {
                  transform: scaleY(0.33);
                }
              }`,
        });
      }
    });

    rule.walkDecls('border-right', (decl) => {
      if (decl.value.indexOf('1px') !== -1) {
        let color = '#000';
        const splitBorderValue = decl.value.split(' ');
        if (splitBorderValue.length === 3) {
          [, , color] = splitBorderValue;
        }
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 2dppx){
                ${decl.parent.selector} {
                  position: relative;
                  border-right: none;
                }
                ${decl.parent.selector}::after {
                  ${directionCommonStyle(color, 0, 0, 'auto', 'auto')}
                  width: 1px;
                  height: 100%;
                  background: ${color};
                  transform-origin: 100% 50%;
                  transform: scaleX(0.5);
                }
              }`,
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 3dppx) {
                ${decl.parent.selector}::before {
                  transform: scaleX(0.33);
                }
              }`,
        });
      }
    });

    rule.walkDecls('border-bottom', (decl) => {
      if (decl.value.indexOf('1px') !== -1) {
        let color = '#000';
        const splitBorderValue = decl.value.split(' ');
        if (splitBorderValue.length === 3) {
          [, , color] = splitBorderValue;
        }
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 2dppx){
                ${decl.parent.selector} {
                  position: relative;
                  border-bottom: none;
                }
                ${decl.parent.selector}::after {
                  ${directionCommonStyle(color, 'auto', 'auto', 0, 0)}
                  width: 100%;
                  height: 1px;
                  transform-origin: 50% 100%;
                  transform: scaleY(0.5);
                }
              }`,
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 3dppx) {
                ${decl.parent.selector}::before {
                  transform: scaleY(0.33);
                }
              }`,
        });
      }
    });

    rule.walkDecls('border-left', (decl) => {
      if (decl.value.indexOf('1px') !== -1) {
        let color = '#000';
        const splitBorderValue = decl.value.split(' ');
        if (splitBorderValue.length === 3) {
          [, , color] = splitBorderValue;
        }
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 2dppx){
                ${decl.parent.selector} {
                  position: relative;
                  border-left: none;
                }
                ${decl.parent.selector}::before {
                  ${directionCommonStyle(color, 0, 'auto', 'auto', 0)}
                  width: 1px;
                  height: 100%;
                  transform-origin: 100% 50%;
                  transform: scaleX(0.5);
                }
              }`,
        });
        rule.append({
          name: 'media',
          params: `
              (min-resolution: 3dppx) {
                ${decl.parent.selector}::before {
                  transform: scaleX(0.33);
                }
              }`,
        });
      }
    });
  });
});
