const _ = require('lodash');
const alert = require('alert-node');

'use strict';

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
}

function ID() {    
    return hashFnv32a(Math.random().toString(36).substr(2, 9), false,_.random(0, 0xffffffff));
};


let output = '';
function collisionTest(iterations = 1e6) {
    let track = new Set();
    let count = -1;

    console.time('Collision test');

    while (++count < iterations) {
        const id = ID();
        track.add(id);
        if (id > 0xffffffff) {
            alert('!!!!');
        }
        //console.log(id);
    }

    console.timeEnd('Collision test');
    console.log('Total iterations:', iterations);
    console.log('Total collisions:', iterations - track.size);
    console.log('Total unique ids:', track.size);
    console.log('duplicate rate:', (iterations - track.size) / iterations);
}

collisionTest(100000000);
alert('end');