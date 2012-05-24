/*
 * 
 *                  xxxxxxx      xxxxxxx
 *                   x:::::x    x:::::x 
 *                    x:::::x  x:::::x  
 *                     x:::::xx:::::x   
 *                      x::::::::::x    
 *                       x::::::::x     
 *                       x::::::::x     
 *                      x::::::::::x    
 *                     x:::::xx:::::x   
 *                    x:::::x  x:::::x  
 *                   x:::::x    x:::::x 
 *              THE xxxxxxx      xxxxxxx TOOLKIT
 *                    
 *                  http://www.goXTK.com
 *                   
 * Copyright (c) 2012 The X Toolkit Developers <dev@goXTK.com>
 *                   
 *    The X Toolkit (XTK) is licensed under the MIT License:
 *      http://www.opensource.org/licenses/mit-license.php
 * 
 *      "Free software" is a matter of liberty, not price.
 *      "Free" as in "free speech", not as in "free beer".
 *                                         - Richard M. Stallman
 * 
 * 
 */

// entry point
// namespace
goog.provide('X');
goog.provide('X.counter');

/**
 * The XTK namespace.
 * 
 * @const
 */
var X = X || {};

/**
 * The counter class, keeping track of instance ids.
 * 
 * @constructor
 */
X.counter = function() {

  this._counter = 0;
  

  /**
   * Get a unique id.
   * 
   * @return {number} A unique id
   */
  this.uniqueId = function() {

    // return a unique id
    return this._counter++;
    
  };
  
};

window["X.counter"] = new X.counter();


/**
 * Injection mechanism for mixins (from
 * http://ejohn.org/blog/javascript-getters-and-setters/) which means copying
 * properties, getters/setters and functions from a source object to a target.
 * Works best on instances.
 * 
 * @param {Object} a The target object.
 * @param {Object} b The source object.
 * @return {Object} The altered object.
 */
function inject(a, b) {

  for ( var i in b) { // iterate over all properties
    // get getter and setter functions
    var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
    
    if (g || s) { // if there is a getter or setter
      if (g) {
        a.__defineGetter__(i, g); // copy getter to new object
      }
      if (s) {
        a.__defineSetter__(i, s); // copy setter to new object
      }
    } else {
      a[i] = b[i]; // just copy the value; nothing special
    }
  }
  return a; // return the altered object
}

//
// BROWSER COMPATIBILITY FIXES GO HERE
//

//
// 1. Safari does not support the .bind(this) functionality which is crucial for
// XTK's event mechanism. This hack fixes this.
//
if (!Function.prototype.bind) {
  
  Function.prototype.bind = function(oThis) {

    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable");
    }
    
    var fSlice = Array.prototype.slice, aArgs = fSlice.call(arguments, 1), fToBind = this;
    
    /**
     * @constructor
     */
    var fNOP = function() {

    };
    
    var fBound = function() {

      return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs
          .concat(fSlice.call(arguments)));
    };
    
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    
    return fBound;
  };
}

goog.exportSymbol('Function.prototype.bind', Function.prototype.bind);
