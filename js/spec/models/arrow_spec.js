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

    it('has a "toCSS" method', function () {
      expect( arrow.toCSS ).toBeFunction();
    });

    describe('getters and setters', function () {
      it('has getters and setters', function () {
        expect( arrow.get ).toBeFunction();
        expect( arrow.set ).toBeFunction();
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
    });

  });

  describe("generated css", function () {

    var css;
    
    beforeEach(function () {
      css = arrow.toCSS();
    });

    describe('arrow position', function () {

      it('it builds css with a top arrow', function () {
      });

      it('it builds css with a right arrow', function () {
      });

      it('it builds css with a bottom arrow', function () {
      });

      it('it builds css with a left arrow', function () {
      });

    });

    describe('border', function () {
      it('has the right border color', function () {
      });

      it('has the right border width', function () {
      });

      describe('with changed width', function () {
        it('has the updated border width', function () {
        });
      });
    });

  });

});


