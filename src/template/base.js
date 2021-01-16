/**
 * Base Template class
 * @author DigitalDesert
 * @version v1.0
 */

define( ['dom/data', '_!template'], function(DataUtil, _) {
    
    "use strict";
    
    let template;

    function content( content )
    {
        if ( content )
        {
            template = _.template( content ) ;
        }

        return template;
    }

    function handle ( elm )
    {
        let data = DataUtil.parse(elm);
        console.log( template );
        return template( data );
    }
    

    return {
        content: content,
        handle: handle
    }
} );