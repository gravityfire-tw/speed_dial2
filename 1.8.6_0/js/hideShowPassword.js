/* https://github.com/cloudfour/hideShowPassword */
!function($,undef){var dataKey="plugin_hideShowPassword",defaults={show:"infer",innerToggle:false,hideToggleUntil:false,touchSupport:false,toggleEvent:"click",toggleTouchEvent:"touchstart mousedown",wrapperClass:"hideShowPassword-wrapper",toggleClass:"hideShowPassword-toggle",states:{shown:{inputClass:"hideShowPassword-shown",eventName:"passwordShown",toggleClass:"hideShowPassword-toggle-hide",toggleText:"Hide",attr:{type:"text",autocapitalize:"off",autocomplete:"off",autocorrect:"off",spellcheck:"false"}},hidden:{inputClass:"hideShowPassword-hidden",eventName:"passwordHidden",toggleClass:"hideShowPassword-toggle-show",toggleText:"Show",attr:{type:"password"}}},widthMethod:$.fn.outerWidth===undef?"width":"outerWidth",heightMethod:$.fn.outerHeight===undef?"height":"outerHeight"};function HideShowPassword(element,options){this.element=$(element);this.init(options)}HideShowPassword.prototype={init:function(options){this.update(options,defaults,this.element.prop("type")==="password");if(this.options.innerToggle){this.initInnerToggle(this.element,this.options)}},update:function(options,base,toggleFallback){base=base||this.options;toggleFallback=toggleFallback||!this.options.show;if(typeof options!=="object"){options={show:options}}this.options=$.extend({},base,options);if(this.options.show==="toggle"){this.options.show=toggleFallback}if(this.options.show==="infer"){this.options.show=this.element.prop("type")!=="password"}this.ifCurrentOrNot($.proxy(function(state){$.each(state.attr,$.proxy(function(key,value){this.element.prop(key,value)},this));this.element.addClass(state.inputClass).trigger(state.eventName)},this),$.proxy(function(state){this.element.removeClass(state.inputClass)},this))},toggle:function(){this.update("toggle")},currentStateKey:function(){return this.options.show?"shown":"hidden"},ifCurrentOrNot:function(ifCurrent,ifNot){var currentKey=this.currentStateKey();$.each(this.options.states,function(thisKey,state){(currentKey===thisKey?ifCurrent:ifNot)(state)})},initInnerToggle:function(el,options){var attachment=el.css("direction")==="rtl"?"left":"right",elWidth=el[options.widthMethod](),wrapperCSS={position:"relative",display:el.css("display"),verticalAlign:el.css("verticalAlign"),marginTop:el.css("marginTop"),marginRight:el.css("marginRight"),marginBottom:el.css("marginBottom"),marginLeft:el.css("marginLeft")},toggleCSS={position:"absolute",top:"50%",mozUserSelect:"none",webkitUserSelect:"none",msUserSelect:"none",userSelect:"none"},elCSS={marginTop:0,marginRight:0,marginBottom:0,marginLeft:0},eventName="",elWidth,wrapper,toggle;el.wrap($("<div />").addClass(options.wrapperClass).css(wrapperCSS));wrapper=el.parent();if(wrapper[options.widthMethod]()!==elWidth){wrapper.css("width",elWidth)}toggle=$("<div />").addClass(options.toggleClass);this.updateInnerToggle(toggle,this.currentStateKey(),options.states);toggleCSS[attachment]=0;toggle.css(toggleCSS);toggle.appendTo(wrapper);toggle.css("marginTop",toggle[options.heightMethod]()/-2);elCSS["padding"+attachment.replace(/./,function(m){return m[0].toUpperCase()})]=toggle[options.widthMethod]();el.css(elCSS);if(options.touchSupport){toggle.css("pointerEvents","none");el.on(options.toggleTouchEvent,$.proxy(function(event){var toggleX=toggle.offset().left,eventX,lesser,greater;if(toggleX){eventX=event.pageX||event.originalEvent.pageX;if(attachment==="left"){toggleX+=toggle[options.widthMethod]();lesser=eventX;greater=toggleX}else{lesser=toggleX;greater=eventX}if(greater>=lesser){event.preventDefault();this.toggle()}}},this))}else{toggle.on(options.toggleEvent,$.proxy(function(){this.toggle()},this))}$.each(options.states,function(key,state){eventName+=state.eventName+" "});el.on(eventName,$.proxy(function(){this.updateInnerToggle(toggle,this.currentStateKey(),options.states)},this));if(options.hideToggleUntil){toggle.hide();el.one(options.hideToggleUntil,function(){toggle.show()})}},updateInnerToggle:function(el,currentKey,states){this.ifCurrentOrNot(function(state){el.addClass(state.toggleClass).text(state.toggleText)},function(state){el.removeClass(state.toggleClass)})}};$.fn.hideShowPassword=function(options){return this.each(function(){var $this=$(this),data=$this.data(dataKey);if(data){data.update(options)}else{$this.data(dataKey,new HideShowPassword(this,options))}})};$.each({show:true,hide:false,toggle:"toggle"},function(verb,showVal){$.fn[verb+"Password"]=function(options){return this.hideShowPassword($.extend({},options,{show:showVal}))}})}(this.jQuery||this.Zepto);