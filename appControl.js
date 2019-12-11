/**
 * AppControl module.
 * @module appControl
 *
 * An all-purpose ECMA2015 utility class for general and specific application functionality.
 * Intended to be imported and instantiated in an applications main Javascript file ( eg. scripts.js ).
 *
 * @note        Requires utility classes imported from ./utils/.
 *
 * @note        Documented using JSDoc standards.
 * @see         https://devdocs.io/jsdoc/
 * @see         https://devhints.io/jsdoc
 *
 * @version     1.0.1
 * @description Add methods from original gist; fix syntax; update docs
 * @description Not working. Import statements are broken.
 *
 * @link        https://github.com/bellydrum/app-control
 * @author      David Maness <maness.david.a@gmail.com>
 * @since       x.x.x
 */
 
/*
 * TODO
 *  Create ./utils/ directory and utility class files so this actually works.
 *  Import utility classes in one line so it looks nicer.
 */
 
import { CookieUtil } from './utils/CookieUtil'
import { NavigatorUtil } from './utils/NavigatorUtil'
import { RequestUtil } from './utils/RequestUtil'

export default class {

    // Private instantiations to be used only by the constructor.
    #cookie = new CookieUtil()
    #navigator = new NavigatorUtil()
    #requests = new RequestUtil()

    constructor = () => {
        /**
         * Instantiates the appControl utility class.
         *
         * @note
         *  The private attributes defined outside the constructor are assigned here for public use.
         */
        
        // global variables
        this.csrftoken = this.#cookie.getValueByKey( 'csrftoken' )
        this.onDesktop = this.#navigator.onDesktop()
        
        // utilities
        this.cookie = this.#cookie
        this.navigator = this.#navigator
        this.requests = this.requests
    }

    /**
     * DOM LISTENERS
     * 
     * Methods that are triggered by specific user events, rather than called within the application.
     *
     * @note
     *  Do not call these listener methods. Instead, assign them to their target element along with a user event.
     *  Assign clickListener() like this:
     *      buttonElement.addEventListener( "click", this.clickListener )
     *  Once a listener is added to an existing target element, the listener will execute whenever the event occurs on the target.
     *
     * Methods used within these listeners are defined in the APPLICATION METHODS section.
     */

    /**
     * APPLICATION METHODS
     * 
     * Various tools to be used anywhere in the application.
     */

    activateDataEndpoints = ( className, excludedClass=null ) => {
        /**
         * Turns DOM element(s) into active hyperlinks based on the values of their data-endpoint attribute.
         *
         * @usage
         *    target: <div class="className" data-endpoint="cool-website.com"> ... </div>
         *    example: activateDataEndpoints( "className" )
         *
         * @param {string} className
         *    the CSS class name that refers to 1 or more elements whose hyperlink needs activation.
         * @param {string} [excludedClass]
         *    the CSS class name that refers to 1 or more elements that this function will ignore.
         *
         * @note
         *    The data-endpoint value of the targeted element must be a valid URL.
         *
         * @returns {null}
         *
         */
        Array.from( document.getElementsByClassName( className ) ).forEach( ( element ) => {
            if ( !( element.classList.contains( excludedClass ) ) ) {
                element.addEventListener('click', () => {
                    location.href = element.getAttribute( 'data-endpoint' )
                })
            }
        })
    }
    
    
    /**
     * INIT METHODS
     * 
     * Activate parts of the application and make them interactive.
     *
     * These are one-time executions called by this.activate() to initialize the application.
     * Not to be confused with PRIVATE METHODS; these are used only one time by activate().
     * Note that these methods are simply calling methods defined above.
     */
    
    activateLinks = () => {
        /**
         * Activates certain DOM elements as hyperlinks.
         *
         * @see this.activateDataEndpoints()
         *
         * @returns {null}
         */
        
        /*
         * TODO
         *  Make this method receive an array of {include<string>:exclude<string>} classname objects.
         *  Iterate over the array and apply this.activateDataEndpoints(include, exclude) on each object.
         */
        
        this.activateDataEndpoints( 'main-navbar-item', 'navbar-menu-parent' )
        this.activateDataEndpoints( 'footer-link' )
    }
    
    activateListeners = () => {
        /**
         * Addd listeners to their respective DOM elements.
         *
         * At the end of this block is a listener that fires when the user leaves the page.
         * The entire block is wrapped in an IIFE for execution at calltime.
         *
         * @see   IIFE (immediately-invoked function expressions)
         * @link  https://developer.mozilla.org/en-US/docs/Glossary/IIFE
         *
         * @see   document.querySelector
         * @link  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Syntax
         *
         * @see   target.addEventListener
         * @link  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax
         *
         * @returns {null}
         */
        (() => {

            // All standard event listeners go below.

            /*
             * Standard event listeners stop here.
             * Below is reserved for the listener fired upon page exit.
             */
            window.addEventListener( 'beforeunload', () => {
                /**
                 * This listener executes when the user leaves the page.
                 *
                 * @note
                 *  Returning a non-empty string will prompt the user to confirm leaving the page.
                 *
                 * @see     BeforeUnloadEvent
                 * @link    https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent
                 *
                 * @returns  {null}
                 */

                return null
            })

        })()
    }
    
    /**
     * ENTRY POINT
     * 
     * The first and only method to be executed by the importing script file.
     */

    activate = () => {
        /**
         * Executes the following block in order to "activate" the application on page load.
         *
         * All methods executed below are defined in the INIT METHODS section.
         */
        this.activateLinks()
        this.activateListeners()
    },

    

}
