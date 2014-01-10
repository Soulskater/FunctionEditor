var Operators = (function () {
    return {
        getOperator: function (value) {
            return this.valueOperators.firstOrDefault(function (item) { return value == item || (typeof value == "string" && item.sign == value.toString().substr(0, item.sign.length)); })
        },
        valueOperators: [
            {
                precedence: 0,
                sign: "+",
                prefixOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    if (isNaN(a))
                        return b;
                    if (!isNaN(a) && !isNaN(b))
                        return parseFloat(a) + parseFloat(b);

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 0,
                sign: "-",
                prefixOp: true,
                calculate: function (a, b) {
                    if (isNaN(b))
                        console.error(b + " is not a number!");
                    if (isNaN(a))
                        return -(b);
                    if (!isNaN(a) && !isNaN(b))
                        return parseFloat(a) - parseFloat(b);

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 1,
                sign: "*",
                singleOp: false,
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return parseFloat(a) * parseFloat(b);

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 1,
                sign: "/",
                singleOp: false,
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return parseFloat(a) / parseFloat(b);
                }
            },
            {
                precedence: 1,
                sign: "^",
                singleOp: false,
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return Math.pow(parseFloat(a), parseFloat(b));
                }
            },
            {
                precedence: 1,
                sign: "sqrt",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return Math.sqrt(parseFloat(b));
                }
            },
            {
                precedence: 1,
                sign: "sin",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return Math.sin((Math.PI / 180) * b);
                }
            },
            {
                precedence: 1,
                sign: "cos",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return Math.cos((Math.PI / 180) * b);
                }
            },
            {
                precedence: 1,
                sign: "tan",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return Math.tan((Math.PI / 180) * b);
                }
            },
            {
                precedence: 1,
                sign: "ctg",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return 1 / (Math.tan((Math.PI / 180) * b));
                }
            },
            {
                precedence: 1,
                sign: "abs",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return Math.abs(b);
                }
            },
            {
                precedence: 1,
                sign: "log",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    //
                    //Natural
                    return Math.log(b);
                }
            },
            {
                precedence: 1,
                sign: "exp",
                singleOp: true,
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    //
                    //Natural
                    return Math.exp(b);
                }
            }
        ],
        consts: [
            {
                sign: "pi",
                value: Math.Pi
            },
            {
                sign: "e",
                value: Math.E
            }
        ]
    };
})();

var SpecOperators = (function () {
    return {
        oBracket: {
            sign: "(",
        },
        cBracket: {
            sign: ")",
        },
        getOperator: function (text) {
            if (text.substr(0, this.oBracket.sign.length) == this.oBracket.sign)
                return this.oBracket;
            if (text.substr(0, this.cBracket.sign.length) == this.cBracket.sign)
                return this.cBracket;
        }
    }
})();