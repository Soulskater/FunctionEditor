
//
//Adds the parameter array items into the source array
Array.prototype.pushRange = function (arr) {
    for (var i = 0; i < arr.length; i++)
        this.push(arr[i]);
};
//
//Creates a new collection, executes the given function and push the result into the new array
Array.prototype.map = function (f) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(f(this[i], i));
    }
    return result;
};
//
//Iterates throught on the array, and executes the parameter function on each element
Array.prototype.foreach = function (f) {
    for (var i = 0; i < this.length; i++) {
        f(this[i], i);
    }
};
//
//Iterates throught on the array in reverse, and executes the parameter function on each element
Array.prototype.foreachrev = function (f) {
    for (var i = this.length - 1; i >= 0; i--) {
        f(this[i], i);
    }
};
//
//Returns with the first selected element according to the param function, otherwise throws an exception
Array.prototype.first = function (f) {
    var index = 0;
    var result = null;
    do {
        if (f(this[index], index)) {
            result = this[index];
            return result;
        }
        index++;
    } while (index < this.length);
    throw new NotFoundException("Didn't match any element with the conditions!");
};
//
//Returns with the first selected element according to the param function, otherwise null
Array.prototype.firstOrDefault = function (f) {
    var index = 0;
    var result = null;
    while (index < this.length) {
        if (f(this[index], index)) {
            result = this[index];
            return result;
        }
        index++;
    }
    return result;
};
//
//Returns with the last selected element according to the param function, otherwise throws an exception
Array.prototype.last = function (f) {
    var index = this.length - 1;
    var result = null;
    if (helper.isNullOrUndefined(f))
        return this[this.length - 1];
    do {
        if (f(this[index])) {
            result = this[index];
            return result;
        }
        index--;
    } while (index >= 0);
    throw new NotFoundException("Didn't match any element with the conditions!");
};
//
//Returns with the last selected element according to the param function, otherwise null
Array.prototype.lastOrDefault = function (f) {
    var index = this.length - 1;
    var result = null;
    do {
        if (!f || f(this[index])) {
            result = this[index];
            return result;
        }
        index--;
    } while (index >= 0);
    return result;
};
//
//Iterates throught on the array, and returns with an array those mathes with parameter function
Array.prototype.where = function (f) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (f(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};
//
//Iterates throught on the array, and returns true if any items matches with the condition
Array.prototype.any = function (f) {
    var result = false;
    var index = 0;
    do {
        result = f(this[index], index);
        index++;
    } while (index < this.length && !result);
    return result;
};
//
//Iterates throught on the array, and returns true if any item matches with the parameter item
Array.prototype.contains = function (item) {
    var result = false;
    do {
        result = this[index] == item;
        index++;
    } while (index < this.length && !result);
    return result;
};

//
//Returns with the index of the matching element
Array.prototype.indexof = function (item, start) {
    var index = start || 0;
    if (this.length - 1 < start) return -1;
    do {
        result = this[index] == item;
        index++;
    } while (index < this.length && !result);
    return index - 1;
};

//
//
Array.prototype.remove = function (f) {
    var index = 0;
    var result = null;
    do {
        var condition = typeof (f) == "function" ? f(this[index]) : this[index] == f;
        if (condition) {
            this.splice(index, 1);
        }
        index++;
    } while (index < this.length);
    return this;
};

//
//
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
    return this;
};

Array.prototype.map = function (f) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr.push(f(this[i], i));
    }
    return arr;
};

function NotFoundException(message) {
    this.message = message;
    this.name = "NotFoundException";
}

function UserHandlingException(message) {
    this.message = message;
    this.name = "UserHandlingException";
}