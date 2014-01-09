var Operators = (function () {
    return {
        getOperator: function (value) {
            return this.primary.firstOrDefault(function (item) { return value == item || (isNaN(value) && item.sign == value.toString().substr(0, item.sign.length)); })
        },
        primary: [
            {
                precedence: 0,
                sign: "+",
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    if (isNaN(a))
                        return { value: b, count: 2 };
                    if (!isNaN(a) && !isNaN(b))
                        return { value: parseFloat(a) + parseFloat(b), count: 3 };

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 0,
                sign: "-",
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    if (isNaN(a))
                        return { value: -(b), count: 2 };
                    if (!isNaN(a) && !isNaN(b))
                        return { value: parseFloat(a) - parseFloat(b), count: 3 };

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 1,
                sign: "*",
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return { value: parseFloat(a) * parseFloat(b), count: 3 };

                    console.log("Error in operator '" + this.sign + "'");
                }
            },
            {
                precedence: 1,
                sign: "/",
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return { value: parseFloat(a) / parseFloat(b), count: 3 };
                }
            },
            {
                precedence: 1,
                sign: "^",
                calculate: function (a, b) {
                    if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                    return { value: Math.pow(parseFloat(a), parseFloat(b)), count: 3 };
                }
            },
            {
                precedence: 1,
                sign: "sqrt",
                calculate: function (a, b) {
                    if (isNaN(b)) console.error(b + " is not a number!");
                    return { value: Math.sqrt(parseFloat(b)), count: 2 };
                }
            }
        //{
        //    precedence: 1,
        //    sign: "sin",
        //    isOneVariableOp: true,
        //    action: function (a, b) {
        //        if (isNaN(a)) console.error(a + " is not a number!");
        //        return Math.sin((Math.PI / 180) * a);
        //    }
        //},
        //{
        //    precedence: 1,
        //    sign: "cos",
        //    isOneVariableOp: true,
        //    action: function (a, b) {
        //        if (isNaN(a)) console.error(a + " is not a number!");
        //        return Math.cos((Math.PI / 180) * a);
        //    }
        //},
        //{
        //    precedence: 1,
        //    sign: "tan",
        //    isOneVariableOp: true,
        //    action: function (a, b) {
        //        if (isNaN(a)) console.error(a + " is not a number!");
        //        return Math.tan((Math.PI / 180) * a);
        //    }
        //},
        //{
        //    precedence: 1,
        //    sign: "ctg",
        //    isOneVariableOp: true,
        //    action: function (a, b) {
        //        if (isNaN(a)) console.error(a + " is not a number!");
        //        return 1 / (Math.tan((Math.PI / 180) * a));
        //    }
        //}
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

var Operand = function () {

    var self = this;
    //
    //This could be a value
    this.leftSide

    //
    //This could be a value
    this.rightSide

    //
    //This could be null if this is a single operand
    this.operator

    this.calc = function () {
        if (!self.operator)
            return self.leftSide;

        if (!self.rightSide && !self.operator.isOneVariableOp)
            console.error("The operator is not a one variable operator, left-hand side expected!");
        if (typeof self.leftSide == "object")
            self.leftSide = self.leftSide.calc();

        if (typeof self.rightSide == "object")
            self.rightSide = self.rightSide.calc();

        return self.operator.action(self.leftSide, self.rightSide);
    }
};