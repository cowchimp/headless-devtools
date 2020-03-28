/**
 * @constructor
 * @template K, V
 */
var Multimap = function() {  // eslint-disable-line
  /** @type {!Map.<K, !Set.<!V>>} */
  this._map = new Map();
};

Multimap.prototype = {
  /**
   * @param {K} key
   * @param {V} value
   */
  set: function(key, value) {
    let set = this._map.get(key);
    if (!set) {
      set = new Set();
      this._map.set(key, set);
    }
    set.add(value);
  },

  /**
   * @param {K} key
   * @return {!Set<!V>}
   */
  get: function(key) {
    return this._map.get(key) || new Set();
  },

  /**
   * @param {K} key
   * @return {boolean}
   */
  has: function(key) {
    return this._map.has(key);
  },

  /**
   * @param {K} key
   * @param {V} value
   * @return {boolean}
   */
  hasValue: function(key, value) {
    const set = this._map.get(key);
    if (!set) return false;
    return set.has(value);
  },

  /**
   * @return {number}
   */
  get size() {
    return this._map.size;
  },

  /**
   * @param {K} key
   * @param {V} value
   * @return {boolean}
   */
  delete: function(key, value) {
    const values = this.get(key);
    if (!values) return false;
    const result = values.delete(value);
    if (!values.size) this._map.delete(key);
    return result;
  },

  /**
   * @param {K} key
   */
  deleteAll: function(key) {
    this._map.delete(key);
  },

  /**
   * @return {!Array.<K>}
   */
  keysArray: function() {
    return this._map.keysArray();
  },

  /**
   * @return {!Array.<!V>}
   */
  valuesArray: function() {
    const result = [];
    const keys = this.keysArray();
    for (let i = 0; i < keys.length; ++i)
      result.pushAll(this.get(keys[i]).valuesArray());
    return result;
  },

  clear: function() {
    this._map.clear();
  },
};

exports.Multimap = Multimap;
