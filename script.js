
var budgetController = (function() {
  var Expense = function(id,description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id,value,description) {
    this.id = id;
    this.value = value;
    this.description = description;

  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp:[],
      inc:[]
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget:0,
    percentage: -1
  };
 
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      if(data.allItems[type].length > 0 ) {
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;

      } else {
        ID = 0;
      }
      if(type === 'exp') {
        newItem = new Expense(ID,des,val);
      } else if (type === 'inc') {
        newItem = new Income(ID,des,val);
      }
      data.allItems[type].push(newItem);

      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if(index !== 1) {
        data.allItems[type].splice(index, 1)
      }
    },

    calculateBudget: function() {
      calculateTotal('exp');
      calculateTotal('inc');

      data.budget = data.totals.inc - data.totals.exp;

      if(data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {

      datal.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc)
      });
    },
    
    getPercentages: function() {
     var allPerc = data.allItems.exp.map(function(cur) {
       return cur.getPercentage();
     });
     return allPerc;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totalInc,
        totalExp: data.totalExp,
        percentage: data.percentage

      };
    },

    testing: function() {
      console.log(data);
    }

  };

})();

var UIcontroller = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: 'budget__income--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'


  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec, type;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3 ) {
      int = int.substr(0, int.length - 3 ) + ',' + int.substr(int.length -3, 3);
    }
    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + '' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++ ) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      if(type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp') {
        element.DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%></div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';



      }

      newHtml = html.replace()
    } 
  }
})