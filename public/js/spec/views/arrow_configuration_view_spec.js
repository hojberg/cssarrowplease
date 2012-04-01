describe("CSSArrowPlease.ArrowConfigurationView", function () {

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
    arrow = new CSSArrowPlease.Arrow();

    arrowConfigurationView = new CSSArrowPlease.ArrowConfigurationView({
      model:      arrow,
      container:  $container
    });
  });

  describe('render', function () {
    it('returns itself for chainability', function () {
      expect( arrowConfigurationView.render() ).toBe( arrowConfigurationView );
    });

    it('sets the default valus', function () {
      arrowConfigurationView.render();

      expect( $container.find('.position').val() ).toBe(arrow.get('position'));
      expect( parseInt($container.find('.size').val(), 10) ).toBe(arrow.get('size'));
      expect( $container.find('.base_color').val() ).toBe(arrow.get('color'));
      expect( parseInt($container.find('.border_width').val(), 10) ).toBe(arrow.get('borderWidth'));
      expect( $container.find('.border_color').val() ).toBe(arrow.get('borderColor'));

    });

    describe('sync from dom to model', function () {

      it('syncs when position dropdown is changed', function () {
        $container.find('.position').val('bottom').trigger('change');
        expect( arrow.get('position') ).toEqual('bottom');
      });

      it('syncs when size is changed', function () {
        $container.find('.size').val('40').trigger('change');
        expect( arrow.get('size') ).toEqual(40);
      });

      it('syncs when color is changed', function () {
        $container.find('.base_color').val('#0f0').trigger('change');
        expect( arrow.get('color') ).toEqual('#0f0');
      });

      it('syncs when border width is changed', function () {
        $container.find('.border_width').val('20').trigger('change');
        expect( arrow.get('borderWidth') ).toEqual(20);
      });

      it('syncs when border color is changed', function () {
        $container.find('.border_color').val('#f00').trigger('change');
        expect( arrow.get('borderColor') ).toEqual('#f00');
      });

    });
  });

});

