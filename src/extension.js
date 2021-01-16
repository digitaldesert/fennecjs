/* jshint esversion: 6 */
/* globals document,requirejs,define */
// =============
// = Polyfills =
// =============
"use strict";

let polyfills = [],
    lang = ( document.documentElement.lang ) ? document.documentElement.lang : 'en';

// =========================
// CONFIGURATION
// =========================
requirejs.config({
   config: {
        i18n: {
           locale: lang
       }
   },
    paths: {
        '_': 'lib/lodash-requirejs-loader-plugin/src/main'
      },

    packages: [{
        name: 'lodash',
        location : 'lib/lodash/3.10.2'
      }]
});

/* COMPATIBILITY CODEBASES
 ----------------------------- */

require(['dom/stylesheet','dom/element'], function( Stylesheet, Element ) 
{
    // Lets ensure that all templates are loaded dynamically first
    let templates = document.querySelectorAll('template[class*="ext\!"]'), idx;
    for (idx = 0; idx < templates.length; ++idx)
    {
        let node = templates[idx],
            type = Element.getTemplateName( node ),
            content = (node.innerHTML.length > 0 ) ? node.innerHTML : "";
        
        define('template/' + type , ['template/base'], function (Base)
        {
            let template = Base;
            template.content( content );
            return template;
        });
    }
    // Lets bind the dictionary to the window-object

    let insertListener = function( event ) {
		if ( event.animationName === 'extensionNode')
		{
            //let node = Object.assign( event.target, { i18n: i8n} ),
            let node = event.target,
                name =  Element.getTemplateName( node );
               // id = tagName.substring( tagName.indexOf('-') + 1 );
               console.log ('template/' + name );
           require( [ 'template/' + name  ], function( element ) {

                // Call the init() function when defined (like in wb-xtemplate)
                // # wb-carousel.js use the global object customElements.define as per the living standard. So it don't need this init call.
                if ( element && element.handle ) {
                    element.handle( node );
               }
           });
		}
	};

	document.addEventListener( 'animationstart', insertListener, false ) ; // standard+ firefox
	document.addEventListener( 'MSAnimationStart', insertListener, false ) ; // IE
	document.addEventListener( 'webkitAnimationStart', insertListener, false ) ; // Chrome + Safari

	// Add the observer event binding
	document.head.appendChild(
		Stylesheet.css("@keyframes extensionNode  {\nfrom { caret-color: transparent; }\nto { caret-color: auto; }\n}\n\n[class*=\"ext\\!\"] {animation-duration: 0.001s;animation-name: extensionNode;}" )
    );

});