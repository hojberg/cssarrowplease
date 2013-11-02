describe("CSSArrowPlease.Arrow", function () {

  var arrow;
  beforeEach(function () {
    arrow = new CSSArrowPlease.Arrow();

    this.addMatchers({
      toBeFunction: function () {
        return typeof this.actual === 'function';
      }
    });
    
  });
  
  describe('attributes', function () {

    it('has attributes', function () {
      expect( CSSArrowPlease.Arrow.ATTRS ).toBeDefined();
    });

    it('responds to getAttrs with all the attributes', function () {
      expect( arrow.getAttrs ).toBeFunction();
      expect( arrow.getAttrs() ).toBe(arrow._attributes);
    });

    describe('getters and setters', function () {
      it('has getters and setters', function () {
        expect( arrow.get ).toBeFunction();
        expect( arrow.set ).toBeFunction();
      });
    });
  });

  describe('eventing', function () {

    var $arrow;

    beforeEach(function () {
      $arrow = arrow._$self;
    });

    it('has an "on" method', function () {
      expect( arrow.on ).toBeFunction();
    });

    it('delegates "on" to jQuery.on', function () {
      spyOn($arrow, 'on');

      arrow.on('change', function () {});

      expect($arrow.on).toHaveBeenCalled();
    });

    it('has a "fire" method', function () {
      expect( arrow.fire ).toBeFunction();
    });
    
    it('delegates "fire" to jQuery.trigger', function () {
      spyOn($arrow, 'trigger');

      arrow.fire('change');

      expect($arrow.trigger).toHaveBeenCalled();
    });

    it('fires a "change" event when setting attributes', function () {
      spyOn(arrow, 'fire');

      arrow.set('position', 'bottom');

      expect(arrow.fire).toHaveBeenCalledWith('change');
    });
  });

  describe('inverted position', function () {

    it('inverts "top"', function () {
      arrow.set('position', 'top');
      expect( arrow.invertedPosition() ).toBe('bottom');
    });

    it('inverts "bottom"', function () {
      arrow.set('position', 'bottom');
      expect( arrow.invertedPosition() ).toBe('top');
    });

    it('inverts "left"', function () {
      arrow.set('position', 'left');
      expect( arrow.invertedPosition() ).toBe('right');
    });

    it('inverts "right"', function () {
      arrow.set('position', 'right');
      expect( arrow.invertedPosition() ).toBe('left');
    });

  });

  describe('convert hex color to rgb color', function () {

    it('converts "#888"', function () {
      expect( arrow.hexToRGB('#888') ).toEqual([136 , 136 , 136]);
    });

    it('converts "#88B7D5"', function () {
      expect( arrow.hexToRGB('#88B7D5') ).toEqual([136, 183, 213]);
    });

    it('converts "#C2E1F5"', function () {
      expect( arrow.hexToRGB('#C2E1F5') ).toEqual([194, 225, 245]);
    });

    it('returns [0, 0, 0] if there is no input color', function () {
      expect( arrow.hexToRGB() ).toEqual([0, 0, 0]);
    });

    it('returns [0, 0, 0] if the input color is invalid', function () {
      expect( arrow.hexToRGB('invalid') ).toEqual([0, 0, 0]);
    });

  });

  describe('toCSS', function () {

    describe('baseCSS', function () {

      it('is position: relative', function () {
        var css = arrow._baseCSS();
        expect( css ).toMatch( 'position: relative' );
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

        expect( css ).toMatch( expected );
      });

      it('sets offset using invertedPosition', function () {
        $.each(['top', 'right', 'bottom', 'left'], function (i, pos) {
          arrow.set('position', pos)
          expect( arrow._baseCSS() ).toMatch(arrow.invertedPosition() + ': 100%');
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

          expect( css ).toMatch( expectedBackground );
          expect( css ).toMatch( expectedBorder);
        });

        it("targets both :before and :after", function () {
          var css = arrow._baseCSS();
          expect( css ).toMatch(':before');
          expect( css ).toMatch(':after');
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

          expect( css ).toMatch( expectedBackground );
          expect( css ).not.toMatch( expectedBorder );
        });

        it("doesn't have :before", function () {
          var css = arrow._baseCSS();
          expect( css ).not.toMatch(':before');
        });
      });
    });

    describe('_arrowCSS', function () {
      it('it has the correct size', function () {
        var expected = 'border-width: 20px';
        expect( arrow._arrowCSS('red', 20) ).toMatch( expected );
      });

      it('it has the correct color', function () {
        var css = arrow._arrowCSS('#888', 20);
        expect( css ).toMatch( 'border-bottom-color: #888' );
        expect( css ).toMatch( 'border-color: rgba\\(136, 136, 136, 0\\)' );
      });

      describe('position top', function () {
        beforeEach(function () { arrow.set('position', 'top'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).toMatch( 'left: 50%' );
          expect( arrowcss ).toMatch( 'margin-left: -20px' );
        });
      });

      describe('position bottom', function () {
        beforeEach(function () { arrow.set('position', 'bottom'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).toMatch( 'left: 50%' );
          expect( arrowcss ).toMatch( 'margin-left: -20px' );
        });
      });

      describe('position right', function () {
        beforeEach(function () { arrow.set('position', 'right'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).toMatch( 'top: 50%' );
          expect( arrowcss ).toMatch( 'margin-top: -20px' );
        });
      });

      describe('position left', function () {
        beforeEach(function () { arrow.set('position', 'left'); });

        it('is centered', function () {
          var arrowcss = arrow._arrowCSS('red', 20),
              basecss = arrow._baseCSS();
          expect( basecss ).toMatch( 'top: 50%' );
          expect( arrowcss ).toMatch( 'margin-top: -20px' );
        });
      });

    });

    describe('_baseArrowCSS', function () {
      it('delegates to _arrowCSS', function () {
        spyOn( arrow, '_arrowCSS' );

        arrow._baseArrowCSS();

        expect( arrow._arrowCSS ).toHaveBeenCalledWith( 
          arrow.get('color'),
          arrow.get('size'),
          'after'
        );
      });
    });

    describe('_arrowBorderCSS', function () {
      it('delegates to _arrowCSS', function () {
        spyOn( arrow, '_arrowCSS' );

        arrow._arrowBorderCSS();

        expect( arrow._arrowCSS ).toHaveBeenCalledWith( 
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

      expect( arrow.toCSS() ).toBe( expected );
    });

  });

});
