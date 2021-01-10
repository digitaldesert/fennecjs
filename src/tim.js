
(function(name, definition, context) {
    if (typeof module != 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof context['define'] == 'function' && context['define']['amd']) {
        define(definition);
    } else {
        context[name] = definition();
    }
})('tim', function() {

    var tim = (function(){
        "use strict";

        var start   = "{{",
            end     = "}}",
            path    = "[a-z0-9_$][\\.a-z0-9_]*", // e.g. config.person.name
            pattern = new RegExp(start + "\\s*("+ path +")\\s*" + end, "gi"),
            undef;
        
        return function(template, data){
            // Merge data into the template string
            return template.replace(pattern, function(tag, token){
                var path = token.split("."),
                    len = path.length,
                    lookup = data,
                    i = 0;

                for (; i < len; i++){
                    lookup = lookup[path[i]];
                    
                    // Property not found
                    if (lookup === undef){
                        return "";
                    }
                    
                    // Return the required value
                    if (i === len - 1){
                        return lookup;
                    }
                }
            }).trim();
        };
    }());

    return tim;

}, this);