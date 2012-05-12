describe("CSSArrowPlease.ArrowCSSView", function () {

  var arrow, arrowCSSView, $container;

  beforeEach(function () {
    $container = $('<div><div class="code"></div><div class="copy_code"></div></div>');
    $code = $container.find('.code');
    $copy = $container.find('.copy_code');

    arrow = new CSSArrowPlease.Arrow();

    arrowCSSView = new CSSArrowPlease.ArrowCSSView({
      model:      arrow,
      container:  $container
    });

    spyOn( $copy, 'clippy' );

    arrowCSSView._codeNode = $code;
    arrowCSSView._copyNode = $copy;
  });

  describe('render', function () {

    it('returns itself for chainability', function () {
      expect( arrowCSSView.render() ).toBe( arrowCSSView );
    });

    it('renders the css when render is called', function () {
      expect( $code.text() ).toBe( '' );
      arrowCSSView.render();
      expect( $code.text() ).toBe( arrow.toCSS() );
    });

    it('calls clippy() on the copy_code node', function () {
      arrowCSSView.render();
      expect( $copy.clippy ).toHaveBeenCalled();
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
