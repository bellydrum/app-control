/**
 * AppControl module.
 * @module appControl
 *
 * An all-purpose ECMA2015 class for general and specific application functionality.
 * Intended to be imported and used in the apps main Javascript file ( eg. scripts.js )
 *
 * @note        Requires utility classes imported from ./utils.
 *
 * @note        Documented using JSDoc standards.
 * @see         https://devdocs.io/jsdoc/
 * @see         https://devhints.io/jsdoc
 *
 *
 * @version     1.0.0
 * @description Initial commit. Include three util imports and basic constructor.
 * @description Not working. Import statements are broken.
 *
 * @link        https://gist.github.com/bellydrum/b8d482c63f81615aa22a51904bd3d420
 * @note        linked is the original gist on which this class is based.
 * @author      David Maness  <maness.david.a@gmail.com>
 * @since       x.x.x
 */
 
/*
 * TODO
 *  Import utility classes in one line so it looks nicer.
 *  Create ./util directory and utility class files so this actually works.
 */
 
import { CookieUtil } from './utils/CookieUtil'
import { NavigatorUtil } from './utils/NavigatorUtil'
import { RequestUtil } from './utils/RequestUtil'

export default class {

    #cookie = new CookieUtil()
    #navigator = new NavigatorUtil()
    #requests = new RequestUtil()

    constructor() {
        /**
         * Instantiates the appControl utility class.
         *
         * Assigns csrftoken and onDesktop values using private utility objects.
         */
        this.csrftoken = this.#cookie.getValueByKey('csrftoken')
        this.onDesktop = this.#navigator.onDesktop()
    }

}
