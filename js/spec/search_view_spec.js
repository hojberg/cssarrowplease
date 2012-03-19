describe('InpaySupport.SearchView', function () {
  var searchView;

  var stubbedMarkup = "<div class='search'>\
                        <input type='text' class='order_reference' />\
                        <a href='#search' class='button'>Search</a>\
                      </div>";

  beforeEach(function () {
    var $searchViewNode = $(stubbedMarkup);

    $searchViewNode.appendTo($('body'));

    $searchInput = $('input.order_reference');

    searchView = new InpaySupport.SearchView({
      container: $searchViewNode
    });
  });

  afterEach(function () {
    $('.search').remove();
  });

  describe('with a blank search field', function () {
    beforeEach(function () {
      $searchInput.val('');
    });

    it('shows an error message', function () {
      $('.button').trigger('click'); 

      $error = $('.search .error_message');

      expect($error.length).toBeGreaterThan(0);
      expect($error.text()).toEqual('Please enter your order reference');
    });
  });

  describe('when a reference is entered in the search field', function () {
    beforeEach(function () {
      $searchInput.val('asd123');
    });

    afterEach(function () {
      $searchInput.val('');
    });

    it('redirects to the order page when searching', function () {
      spyOn(searchView, 'showOrder');

      $('.button').trigger('click'); 
      
      expect(searchView.showOrder).toHaveBeenCalled();
    });
  });

});
