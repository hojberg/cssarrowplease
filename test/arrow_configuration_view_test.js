var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');

var Arrow = require('../app/models/arrow');
var ArrowConfigurationView = require('../app/views/arrow_configuration_view');

describe("ArrowConfigurationView", function () {
  // A dummy template of the dom fragment the view operates on
  var dummyDOM = "<div class='configuration'>\
                    <select class='position'>\
                      <option value='top'>top</option>\
                      <option value='right'>right</option>\
                      <option value='bottom'>bottom</option>\
                      <option value='left'>left</option>\
                    </select>\
                    <input class='size'>\
                    <input class='base_color'>\
                    <input class='border_width'>\
                    <input class='border_color'>\
                  </div>";

  var arrow, arrowConfigurationView, $container;

  beforeEach(function () {
    $container = $(dummyDOM);
    arrow = new Arrow();

    arrowConfigurationView = new ArrowConfigurationView({
      model:      arrow,
      container:  $container
    });
  });

  describe('render', function () {
    it('returns itself for chainability', function () {
      expect( arrowConfigurationView.render() ).to.eql( arrowConfigurationView );
    });

    it('sets the default valus', function () {
      arrowConfigurationView.render();

      expect( $container.find('.position').val() ).to.eql(arrow.get('position'));
      expect( parseInt($container.find('.size').val(), 10) ).to.eql(arrow.get('size'));
      expect( $container.find('.base_color').val() ).to.eql(arrow.get('color'));
      expect( parseInt($container.find('.border_width').val(), 10) ).to.eql(arrow.get('borderWidth'));
      expect( $container.find('.border_color').val() ).to.eql(arrow.get('borderColor'));

    });

    describe('sync from dom to model', function () {

      it('syncs when position dropdown is changed', function () {
        $container.find('.position').val('bottom').trigger('change');
        expect( arrow.get('position') ).to.eql('bottom');
      });

      it('syncs when size is changed', function () {
        $container.find('.size').val('40').trigger('change');
        expect( arrow.get('size') ).to.eql(40);
      });

      it('syncs when color is changed', function () {
        $container.find('.base_color').val('#0f0').trigger('change');
        expect( arrow.get('color') ).to.eql('#0f0');
      });

      it('syncs when border width is changed', function () {
        $container.find('.border_width').val('20').trigger('change');
        expect( arrow.get('borderWidth') ).to.eql(20);
      });

      it('syncs when border color is changed', function () {
        $container.find('.border_color').val('#f00').trigger('change');
        expect( arrow.get('borderColor') ).to.eql('#f00');
      });

      it('increases or decreases value accordingly when arrows are pressed', function() {
        var objects = [
              { selector: '.size', arrowAttr: 'size', defaultVal: 30 },
              { selector: '.border_width', arrowAttr: 'borderWidth', defaultVal: 4 }
            ],
            keystrokes = [
              { key: 38, increment: 1, shift: false },
              { key: 38, increment: 10, shift: true },
              { key: 40, increment: -1, shift: false },
              { key: 40, increment: -10, shift: true }
            ];

        $.each(objects, function (i, object) {
          var elem = $container.find(object.selector),
              defaultVal = object.defaultVal,
              arrowAttr = object.arrowAttr;

          $.each(keystrokes, function (i, keystroke) {
            var keydown = $.Event('keydown'),
                expectedVal = defaultVal + keystroke.increment;
            keydown.keyCode = keystroke.key;
            keydown.shiftKey = keystroke.shift;

            elem.val(defaultVal).trigger(keydown);

            if (expectedVal < 0) expectedVal = 0;
            expect( arrow.get(arrowAttr) ).to.eql(expectedVal);
          });
        });
      });

    });
  });

});

