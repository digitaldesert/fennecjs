/**
 * Base Template class
 * @author DigitalDesert
 * @version v1.0
 */

define( ['dom/data', '_!template'], function(DataUtil) {
    
    "use strict";
    
    let template = "";

    function content( content )
    {
        if ( content )
        {
            template = content;
        }

        return template;
    }

    function handle ( elm )
    {
        let data = DataUtil.parse(elm);
        return _.template( template, data );
    }
    

    return {
        content: content,
        handle: handle
    }
} );