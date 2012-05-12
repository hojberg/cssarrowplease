describe("CSSArrowPlease.ArrowPreviewView", function() {
  var arrow, arrowPreviewView, $container;

  beforeEach(function () {
    $container = $('<div><style class="preview_styles"></style><div class="arrow_box"></div></div>');
    arrow = new CSSArrowPlease.Arrow();

    arrowPreviewView = new CSSArrowPlease.ArrowPreviewView({
      model:      arrow,
      container:  $container
    });
  });

  describe('render', function () {
    it('returns itself for chainability', function () {
      expect( arrowPreviewView.render() ).toBe( arrowPreviewView );
    });

    it('render delegates to ArrowCSSView.render', function () {
      arrowPreviewView.render();
      expect( $container.text() ).toBe( arrow.toCSS() );
    });
  });

  describe('update', function () {
    it('calls render on model changes', function () {
      spyOn(arrowPreviewView, 'render');
      arrow.fire('change');
      expect(arrowPreviewView.render).toHaveBeenCalled();
    });
  });
});
