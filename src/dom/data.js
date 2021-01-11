/**
 * Element data class
 * @author DigitalDesert
 * @version v1.0
 */

define( ['_!lang'], function( ) {
    "use strict";
    
    function isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

     function parse (elm)
     {
        let data = elm.hasAttribute('data-ext') ? elm.getAttribute( 'data-ext' ) : {};
        if ( _.isString( data )  )
        {
            if ( isURL( data ) )
            {
                console.log(' [data] ok this is a url!')
                return {};
            }

            return JSON.parse( data );
        }

        return data;

     }
    

    return {
		parse: parse
    }
} );