describe("InpaySupport.App", function() {

  describe("when there is a search input", function() {
    beforeEach(function() {
      $('body').append('<input type="text" class="search"/>'); 
    });

    afterEach(function () {
      $('.search').remove();
    });

    it("should dispatch to the search view", function() {
      app = new InpaySupport.App();
      expect(app.currentView).toEqual('SearchView');
    });

  });

});
