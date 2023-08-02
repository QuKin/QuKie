( function( global, factory ) {
    "use strict";
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "QuKie requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    "use strict";

    class QuKie {
        constructor() {
            this.init();
        }
        init() {
            this._version = '0.0.1';
            this._debug = true;
            this._backgroundImage = {
                computer: '',
                mobile: '',
                pad: ''
            }
        }
    }
    if ( typeof noGlobal === "undefined" ) {
        window.qukie = window._ = new QuKie();
    }
    return new QuKie;
});