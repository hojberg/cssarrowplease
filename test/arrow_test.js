var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');

var Arrow = require('../app/models/arrow');

describe("Arrow", function () {

  var arrow;
  beforeEach(function () {
    arrow = new Arrow();
  });

  describe('attributes', function () {

    it('has attributes', function () {
      expect( Arrow.ATTRS ).not.to.eql(undefined);
    });

    it('responds to getAttrs with all the attributes', function () {
      expect( arrow.getAttrs ).to.be.a('function');
      expect( arrow.getAttrs() ).to.eql(arrow._attributes);
    });

    describe('getters and setters', function () {
      it('has getters and setters', function () {
        expect( arrow.get ).to.be.a('function');
        expect( arrow.set ).to.be.a('function');
      });
    });
  });

  describe('eventing', function () {

    var $arrow;

    beforeEach(function () {
      $arrow = arrow._$self;
    });

    it('has an "on" method', function () {
      expect( arrow.on ).to.be.a('function');
    });

    it('delegates "on" to jQuery.on', function () {
      var spy = sinon.spy($arrow, 'on');

      arrow.on('change', function () {});

      expect(spy).to.have.been.called;
    });

    it('has a "fire" method', function () {
      expect( arrow.fire ).to.be.a('function');
    });

    it('delegates "fire" to jQuery.trigger', function () {
      var spy = sinon.spy($arrow, 'trigger');

      arrow.fire('change');

      expect(spy).to.have.been.called;
    });

    it('fires a "change" event when setting attributes', function () {
      var spy = sinon.spy(arrow, 'fire');

      arrow.set('position', 'bottom');

      expect(spy).to.have.been.calledWith('change');
    });
  });

  describe('inverted position', function () {

    it('inverts "top"', function () {
      arrow.set('position', 'top');
      expect( arrow.invertedPosition() ).to.eql('bottom');
    });

    it('inverts "bottom"', function () {
      arrow.set('position', 'bottom');
      expect( arrow.invertedPosition() ).to.eql('top');
    });

    it('inverts "left"', function () {
      arrow.set('position', 'left');
      expect( arrow.invertedPosition() ).to.eql('right');
    });

    it('inverts "right"', function () {
      arrow.set('position', 'right');
      expect( arrow.invertedPosition() ).to.eql('left');
    });

  });

  describe('convert hex color to rgb color', function () {

    it('converts "#888"', function () {
      expect( arrow.hexToRGB('#888') ).to.eql([136 , 136 , 136]);
    });

    it('converts "#88B7D5"', function () {
      expect( arrow.hexToRGB('#88B7D5') ).to.eql([136, 183, 213]);
    });

    it('converts "#C2E1F5"', function () {
      expect( arrow.hexToRGB('#C2E1F5') ).to.eql([194, 225, 245]);
    });

    it('returns [0, 0, 0] if there is no input color', function () {
      expect( arrow.hexToRGB() ).to.eql([0, 0, 0]);
    });

    it('returns [0, 0, 0] if the input color is invalid', function () {
      expect( arrow.hexToRGB('invalid') ).to.eql([0, 0, 0]);
    });

  });

  describe('toCSS', function () {

    describe('baseCSS', function () {

      it('is position: relative', function () {
        var css = arrow._baseCSS();
        expect( css ).to.contain( 'position: relative' );
      });

      it('has base arrow css', function () {
        var css = arrow._baseCSS(),
            expected;

        expected = '\tbottom: 100%;\n';
        expected = '\tleft: 50%;\n';
        expected += '\tborder: solid transparent;\n';
        expected += '\tcontent: " ";\n';
        expected += '\theight: 0;\n';
        expected += '\twidth: 0;\n';
        expected += '\tposition: absolute;\n';

        expect( css ).to.contain( expected );
      });

      it('sets offset using invertedPosition', function () {
        ['top', 'right', 'bottom', 'left'].forEach(function (pos, i) {
          arrow.set('position', pos);
          expect( arrow._baseCSS() ).to.contain(
            arrow.invertedPosition() + ': 100%'
          );
        });
      });

      describe('width border', function () {
        beforeEach(function () { arrow.set('borderWidth', 2); });

        it('has background and border colors', function () {
          var css                 = arrow._baseCSS(),
              color               = arrow.get('color'),
              borderWidth         = arrow.get('borderWidth'),
              borderColor         = arrow.get('borderColor'),
              expectedBackground  = 'background: ' + color,
              expectedBorder      = 'border: ' + borderWidth + 'px solid ' + borderColor;

          expect( css ).to.contain( expectedBackground );
          expect( css ).to.contain( expectedBorder);
        });

        it("targets both :before and :after", function () {
          var css = arrow._baseCSS();
          expect( css ).to.contain(':before');
          expect( css ).to.contain(':after');
        });
      });

      describe('without border', function () {
        beforeEach(function () { arrow.set('borderWidth', 0); });

        it('only has background', function () {
          var css                 = arrow._baseCSS(),
              color               = arrow.get('color'),
              borderWidth         = arrow.get('borderWidth'),
              borderColor         = arrow.get('borderColor'),
              expectedBackground  = 'background: ' + color,
              expectedBorder      = 'border: ' + borderWidth + 'px solid ' + borderColor;

          expect( css ).to.contain( expectedBackground );
          expect( css ).not.to.contain( expectedBorder );
        });

        it("doesn't have :before", function () {
          var css = arrow._baseCSS();
          expect( css ).not.to.contain(':before');
        });
      });
    });

    describe('_arrowCSS', function () {
      it('it has the correct size', function () {
        var expected = 'border-width: 20px';
        expect( arrow._arrowCSS('red', 20) ).to.contain( expected );
      });

      it('it has the correct color', function () {
        var css = arrow._arrowCSS('#888', 20);
        expect( css ).to.contain( 'border-bottom-color: #888' );
        expect( css ).to.contain( 'border-color: rgba(136, 136, 136, 0)' );
      });

      describe('position top', function () {
        beforeEach(function () { arrow.set('position', 'top'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).to.contain( 'left: 50%' );
          expect( arrowcss ).to.contain( 'margin-left: -20px' );
        });
      });

      describe('position bottom', function () {
        beforeEach(function () { arrow.set('position', 'bottom'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).to.contain( 'left: 50%' );
          expect( arrowcss ).to.contain( 'margin-left: -20px' );
        });
      });

      describe('position right', function () {
        beforeEach(function () { arrow.set('position', 'right'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).to.contain( 'top: 50%' );
          expect( arrowcss ).to.contain( 'margin-top: -20px' );
        });
      });

      describe('position left', function () {
        beforeEach(function () { arrow.set('position', 'left'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).to.contain( 'top: 50%' );
          expect( arrowcss ).to.contain( 'margin-top: -20px' );
        });
      });

    });

    describe('_baseArrowCSS', function () {
      it('delegates to _arrowCSS', function () {
        var spy = sinon.spy( arrow, '_arrowCSS' );

        arrow._baseArrowCSS();

        expect( spy ).to.have.been.calledWith(
          arrow.get('color'),
          arrow.get('size'),
          'after'
        );
      });
    });

    describe('_arrowBorderCSS', function () {
      it('delegates to _arrowCSS', function () {
        var spy = sinon.spy( arrow, '_arrowCSS' );

        arrow._arrowBorderCSS();

        expect( spy ).to.have.been.calledWith(
          arrow.get('borderColor'),
          arrow.get('size') + Math.round(arrow.get('borderWidth') * 1.41421356),
          'before'
        );
      });
    });

    it('combines pieces', function () {
      var expected = [
        arrow._baseCSS(),
        arrow._baseArrowCSS(),
        arrow._arrowBorderCSS()
      ].join('\n');

      expect( arrow.toCSS() ).to.eql( expected );
    });


  });

});
