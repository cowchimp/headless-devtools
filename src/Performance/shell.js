Object.defineProperty(Array.prototype, 'stableSort', {
  value: function(comparator) {
    function defaultComparator(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    comparator = comparator || defaultComparator;
    const indices = new Array(this.length);
    for (let i = 0; i < this.length; ++i) indices[i] = i;
    const self = this;
    function indexComparator(a, b) {
      const result = comparator(self[a], self[b]);
      return result ? result : a - b;
    }
    indices.sort(indexComparator);
    for (let i = 0; i < this.length; ++i) {
      if (indices[i] < 0 || i === indices[i]) continue;
      let cyclical = i;
      const saved = this[i];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const next = indices[cyclical];
        indices[cyclical] = -1;
        if (next === i) {
          this[cyclical] = saved;
          break;
        } else {
          this[cyclical] = this[next];
          cyclical = next;
        }
      }
    }
    return this;
  },
});

Object.defineProperty(Array.prototype, 'peekLast', {
  value: function() {
    return this[this.length - 1];
  },
});

Object.defineProperty(Array.prototype, 'remove', {
  value: function(value, firstOnly) {
    let index = this.indexOf(value);
    if (index === -1) return false;
    if (firstOnly) {
      this.splice(index, 1);
      return true;
    }
    for (let i = index + 1, n = this.length; i < n; ++i) {
      if (this[i] !== value) this[index++] = this[i];
    }
    this.length = index;
    return true;
  },
});

Object.defineProperty(Array.prototype, 'pushAll', {
  value: function(array) {
    for (let i = 0; i < array.length; ++i) this.push(array[i]);
  },
});

Object.defineProperty(Array.prototype, 'lowerBound', {
  value: function(object, comparator, left, right) {
    function defaultComparator(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    comparator = comparator || defaultComparator;
    let l = left || 0;
    let r = right !== undefined ? right : this.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (comparator(object, this[m]) > 0) l = m + 1;
      else r = m;
    }
    return r;
  },
});
Object.defineProperty(Array.prototype, 'upperBound', {
  value: function(object, comparator, left, right) {
    function defaultComparator(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    comparator = comparator || defaultComparator;
    let l = left || 0;
    let r = right !== undefined ? right : this.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (comparator(object, this[m]) >= 0) l = m + 1;
      else r = m;
    }
    return r;
  },
});
Object.defineProperty(Uint32Array.prototype, 'lowerBound', {
  value: Array.prototype.lowerBound,
});
Object.defineProperty(Uint32Array.prototype, 'upperBound', {
  value: Array.prototype.upperBound,
});
Object.defineProperty(Int32Array.prototype, 'lowerBound', {
  value: Array.prototype.lowerBound,
});
Object.defineProperty(Int32Array.prototype, 'upperBound', {
  value: Array.prototype.upperBound,
});
Object.defineProperty(Float64Array.prototype, 'lowerBound', {
  value: Array.prototype.lowerBound,
});

(function() {
  function mergeOrIntersect(array1, array2, comparator, mergeNotIntersect) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < array1.length && j < array2.length) {
      const compareValue = comparator(array1[i], array2[j]);
      if (mergeNotIntersect || !compareValue)
        result.push(compareValue <= 0 ? array1[i] : array2[j]);
      if (compareValue <= 0) i++;
      if (compareValue >= 0) j++;
    }
    if (mergeNotIntersect) {
      while (i < array1.length) result.push(array1[i++]);
      while (j < array2.length) result.push(array2[j++]);
    }
    return result;
  }
  Object.defineProperty(Array.prototype, 'intersectOrdered', {
    value: function(array, comparator) {
      return mergeOrIntersect(this, array, comparator, false);
    },
  });
  Object.defineProperty(Array.prototype, 'mergeOrdered', {
    value: function(array, comparator) {
      return mergeOrIntersect(this, array, comparator, true);
    },
  });
})();

// eslint-disable-next-line no-unused-vars
global.ls = function(strings, vararg) {
  if (typeof strings === 'string') return strings;
  const values = Array.prototype.slice.call(arguments, 1);
  if (!values.length) return strings[0];
  let result = '';
  for (let i = 0; i < values.length; i++) {
    result += strings[i];
    result += '' + values[i];
  }
  return result + strings[values.length];
};

Map.prototype.valuesArray = function() {
  return Array.from(this.values());
};
