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

    it('renders the preview with the correct arrow when render is called', function () {
      expect( $container.find('.preview_styles').text() ).toBe('');
      arrowPreviewView.render();
      expect( $container.find('.preview_styles').text() ).toBe(arrow.toCSS());
    });
  });

  describe('update', function () {
    it('renders an updated preview when the model changes', function () {
      spyOn(arrowPreviewView, 'render');
      arrow.fire('change');
      expect(arrowPreviewView.render).toHaveBeenCalled();
    });
  });
});
