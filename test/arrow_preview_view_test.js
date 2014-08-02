var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');

var Arrow = require('../app/models/arrow');
var ArrowPreviewView = require('../app/views/arrow_preview_view');

describe("ArrowPreviewView", function() {
  var arrow, arrowPreviewView, $container;

  beforeEach(function () {
    $container = $('<div><style class="preview_styles"></style><div class="arrow_box"></div></div>');
    arrow = new Arrow();

    arrowPreviewView = new ArrowPreviewView({
      model:      arrow,
      container:  $container
    });
  });

  describe('render', function () {
    it('returns itself for chainability', function () {
      expect( arrowPreviewView.render() ).to.eql( arrowPreviewView );
    });

    it('render delegates to ArrowCSSView.render', function () {
      arrowPreviewView.render();
      expect( $container.text().replace(/\s+/g, '') ).to.eql( arrow.toCSS().replace(/\s+/g, '') );
    });
  });

  describe('update', function () {
    it('calls render on model changes', function () {
      var spy = sinon.spy(arrowPreviewView, 'render');
      arrow.fire('change');
      expect( spy ).to.have.been.called;
    });
  });
});
