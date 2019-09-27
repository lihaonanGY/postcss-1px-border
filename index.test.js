const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then((result) => {
      expect(result.css.replace(/[\r\n\s]/g, '')).toEqual(output);
      expect(result.warnings()).toHaveLength(0);
    });
}

it('test border', () => run(
    '.test{border: 1px solid #000;}',
    ".test{border:1pxsolid#000;@media(min-resolution:2dppx){.test{position:relative;border:none;}.test::before{content:'';position:absolute;left:0;top:0;width:200%;height:200%;border:1pxsolid#000;border-radius:0px;transform-origin:00;transform:scale(0.5);box-sizing:border-box;pointer-events:none;}};@media(min-resolution:3dppx){.test::before{width:300%;height:300%;border-radius:0px;transform:scale(0.33);}};}",
    {},
  ));

it('test border-top', () => run(
    '.test{border-top: 1px solid red;}',
    ".test{border-top:1pxsolidred;@media(min-resolution:2dppx){.test{position:relative;border-top:none;}.test::before{content:'';position:absolute;background-color:red;display:block;z-index:1;top:0;right:auto;bottom:auto;left:0;width:100%;height:1px;transform-origin:50%50%;transform:scaleY(0.5);}};@media(min-resolution:3dppx){.test::before{transform:scaleY(0.33);}};}",
    {},
  ));

it('test border-right', () => run(
    '.test{border-right: 1px solid red;}',
    ".test{border-right:1pxsolidred;@media(min-resolution:2dppx){.test{position:relative;border-right:none;}.test::after{content:'';position:absolute;background-color:red;display:block;z-index:1;top:0;right:0;bottom:auto;left:auto;width:1px;height:100%;background:red;transform-origin:100%50%;transform:scaleX(0.5);}};@media(min-resolution:3dppx){.test::before{transform:scaleX(0.33);}};}",
    {},
  ));
it('test border-bottom', () => run(
    '.test{border-bottom: 1px solid red;}',
    ".test{border-bottom:1pxsolidred;@media(min-resolution:2dppx){.test{position:relative;border-bottom:none;}.test::after{content:'';position:absolute;background-color:red;display:block;z-index:1;top:auto;right:auto;bottom:0;left:0;width:100%;height:1px;transform-origin:50%100%;transform:scaleY(0.5);}};@media(min-resolution:3dppx){.test::before{transform:scaleY(0.33);}};}",
    {},
  ));
it('test border-left', () => run(
    '.test{border-left: 1px solid red;}',
    ".test{border-left:1pxsolidred;@media(min-resolution:2dppx){.test{position:relative;border-left:none;}.test::before{content:'';position:absolute;background-color:red;display:block;z-index:1;top:0;right:auto;bottom:auto;left:0;width:1px;height:100%;transform-origin:100%50%;transform:scaleX(0.5);}};@media(min-resolution:3dppx){.test::before{transform:scaleX(0.33);}};}",
    {},
  ));
