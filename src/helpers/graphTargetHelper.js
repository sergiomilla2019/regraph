function getColorIntersections(target, data, multipleIntersections) {

    //Initialize all positions to 0 to see which node intersects with
    let intersectionTable = [];
    data.productsGroup.forEach(p => {
      intersectionTable.push(0);
    });
  
    //See the list of transactions to know which customers are related to which product
    let interesectionValue
    interesectionValue = 0
    data.transactions.forEach(d => {
      //For each customer I initialize a new product with the binary value (2 ^ index)
      if (target == d.target_id) {
        for (let i = 0; i < data.productsGroup.length; i++) {
          if (d.name == data.productsGroup[i].group_sku) {
            intersectionTable[i] = Math.pow(2, (i + 1))
          }
        }
        interesectionValue = intersectionTable.reduce((a, b) => a + b, 0)
      }
    });
  
    if (multipleIntersections[interesectionValue] == undefined) {
      multipleIntersections[interesectionValue] = rainbow((interesectionValue * intersectionTable.length), Math.pow(2, intersectionTable.length) - 1)
    }
    return multipleIntersections[interesectionValue]
  }

  function getSizeByQuantity(grain, data) {
    let quantity = 0
    data.transactions.forEach(t => {
      if (t.name === grain) {
        quantity++;
      }
    })
    return 2 + (quantity / 1000)
  }

  function rainbow(step, numOfSteps) {
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
  }

  export {getColorIntersections, getSizeByQuantity}

