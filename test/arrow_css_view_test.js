var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');

var Arrow = require('../app/models/arrow');
var ArrowCSSView = require('../app/views/arrow_css_view');

describe("ArrowCSSView", function () {
  var arrow, arrowCSSView, $container;

  beforeEach(function () {
    $container = $('<div><div class="code"></div><div class="copy_code"></div></div>');
    $code = $container.find('.code');
    $copy = $container.find('.copy_code');

    arrow = new Arrow();

    arrowCSSView = new ArrowCSSView({
      model:      arrow,
      container:  $container
    });

    arrowCSSView._codeNode = $code;
    arrowCSSView._copyNode = $copy;
  });

  describe('render', function () {

    it('returns itself for chainability', function () {
      expect( arrowCSSView.render() ).to.eql( arrowCSSView );
    });

    it('renders the css when render is called', function () {
      expect( $code.text() ).to.eql( '' );
      arrowCSSView.render();
      expect( $code.text().replace(/\s+/g, '') ).to.eql( arrow.toCSS().replace(/\s+/g, '') );
    });

  });

  describe('update', function () {
    it('renders the css when the arrow is changed', function () {
      var spy = sinon.spy(arrowCSSView, 'render');
      arrow.fire('change');
      expect(spy).to.have.been.called;
    });
  });

});
