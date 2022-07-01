
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

    


  }

})