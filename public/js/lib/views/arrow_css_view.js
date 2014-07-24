// create global CSSArrowPlease if it doesn't exist
if (!('CSSArrowPlease' in window)) window.CSSArrowPlease = {};

(function (G) {

  /**
  @class ArrowCSSView
  @constructor
  **/
  var ArrowCSSView = function () { 
    this.init.apply(this, arguments);
  };

  ArrowCSSView.prototype = {

    init: function (options) {
      this.container  = options.container;
      this._codeNode  = this.container.find('.code');
      this._copyNode  = this.container.find('.copy_code');

      this.model = options.model;
      this.model.on('change', this._handleChange, this);
      this.output_type = 'css';
      this._attachEvents();
    },

    /**
    @method _attachEvents
    @description attaches dom events
    @protected
    **/
    _attachEvents: function () {
      $('.btn', this.container).click($.proxy(this._handleClick, this));
    },

    /**
    @method _handleClick
    @description handles click on output type CSS / LESS / SCSS
    @chainable
    **/
    _handleClick: function (e) {
      var target = $(e.target);
      this.output_type = target.val();
      $('.btn', this.container).removeClass('active');
      target.addClass('active');
      this.render();
    },


    /**
    @method _handleChange
    @description handles changes to the model
    @chainable
    **/
    _handleChange: function () {
      this.render();
    },

    /**
    @method render
    @description renders the model's css
    @chainable
    **/
    render: function () {

      var text;
      switch(this.output_type){
        case 'css':
          text = this.model.toCSS(); break;
        case 'less':
          text = this.model.toLESS(); break;
        case 'scss':
          text = this.model.toSCSS(); break;
      } 

      this._codeNode.text( text );
      this._copyNode.text( text )
        .clippy({ transparent: true });

      return this;
    }

  };

  // Expose public api
  G.ArrowCSSView = ArrowCSSView;

}(window.CSSArrowPlease));
