describe("CSSArrowPlease.ArrowCSSView", function () {

  var arrow, arrowCSSView, $container;

  beforeEach(function () {
    $container = $('<div/>');
    arrow = new CSSArrowPlease.Arrow();

    arrowCSSView = new CSSArrowPlease.ArrowCSSView({
      model:      arrow,
      container:  $container
    });
  });

  describe('render', function () {
    it('returns itself for chainability', function () {
      expect( arrowCSSView.render() ).toBe( arrowCSSView );
    });

    it('renders the css when render is called', function () {
      expect( $container.text() ).toBe( '' );
      arrowCSSView.render();
      expect( $container.text() ).toBe( arrow.toCSS() );
    });
  });

  describe('update', function () {
    it('renders the css when the arrow is changed', function () {
      spyOn(arrowCSSView, 'render');
      arrow.fire('change');
      expect(arrowCSSView.render).toHaveBeenCalled();
    });
  });

});
