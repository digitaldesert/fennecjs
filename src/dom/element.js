/**
 * Element class
 * @author DigitalDesert
 * @version v1.0
 */

define( [], function() {
	"use strict";

    function getTemplateName( elm )
    {
        let classes = elm.classList,
            name = "",
            clx;
        
        for( clx = 0; clx < classes.length; clx++ ) 
        {
            if ( classes[clx].startsWith("ext!") )
            {
                name = classes[clx].split("!").pop();
                break;
            }
        }

        return name;
    }
    

    return {
		getTemplateName: getTemplateName
    };
} );