// =============
// = Polyfills =
// =============

var polyfills = [],
    lang = ( document.documentElement.lang ) ? document.documentElement.lang : "en";

// =========================
// CONFIGURATION
// =========================
requirejs.config({
   config: {
        i18n: {
           locale: lang
       }
   }
});

/* COMPATIBILITY CODEBASES
 ----------------------------- */

require(['dom/stylesheet','tim', 'dom/element'], function( Stylesheet, Template, Element ) 
{
    // Lets ensure that all templates are loaded dynamically first
    let templates = document.querySelectorAll('template[class*="ext\!"]'), idx;
    for (idx = 0; idx < templates.length; ++idx)
    {
        let node = templates[idx], clx, 
            type = Element.getTemplateName( node ),
            data = node.hasAttribute('data-ext') ? JSON.parse( node.getAttribute('data-ext') ) : {},
            content = (node.innerHTML.length > 0 ) ? node.innerHTML : "";
        
        define("template/" + type + "/" + type, [], function()
        {
            let template = content;
            return {
                init : function (element) {
                    let data = element.hasAttribute('data-ext') ? JSON.parse( element.getAttribute('data-ext') ) : {};
                    console.log( Template(template, data) );
                }
            }
        });
        //console.log( Template( content, data ) )

        //alet data = templates[idx];
    }
    // Lets bind the dictionary to the window-object


    let insertListener = function( event ) {
		if (
            event.animationName === "pluginInserted" ||  event.animationName === "gearInserted"
        ) {
            //let node = Object.assign( event.target, { i18n: i8n} ),
            let node = event.target,
                tagName = node.tagName.toLowerCase(),
                type = event.animationName === "pluginInserted" ? "plugin" : "gear",
                name =  Element.getTemplateName( node );
               // id = tagName.substring( tagName.indexOf('-') + 1 );
               console.log ("template/" + name + "/" + name);
           require( [ "template/" + name + "/" + name ], function( element ) {

                // Call the init() function when defined (like in wb-xtemplate)
                // # wb-carousel.js use the global object customElements.define as per the living standard. So it don't need this init call.
                //if ( element && element.init ) {
                    element.init( node );
               //}

           }) ;
           //console.log( " "+ type +"inserted on " + tagName );
		}

	}

	document.addEventListener( "animationstart", insertListener, false ) ; // standard+ firefox
	document.addEventListener( "MSAnimationStart", insertListener, false ) ; // IE
	document.addEventListener( "webkitAnimationStart", insertListener, false ) ; // Chrome + Safari

	// Add the observer event binding
	document.head.appendChild(
		Stylesheet.css("@keyframes pluginInserted  {\nfrom { caret-color: transparent; }\nto { caret-color: auto; }\n}\n\n[class*=\"ext\\!\"] {animation-duration: 0.001s;animation-name: pluginInserted;}\n\n@keyframes gearInserted  {\nfrom { caret-color: transparent; }\nto { caret-color: auto; }\n}\n\n[class*=\"fnc\\:\"] {animation-duration: 0.001s;animation-name: gearInserted;}" )
    );

    //console.log( "WET 5 lives.. greeting >> " + i8n.greeting );
});