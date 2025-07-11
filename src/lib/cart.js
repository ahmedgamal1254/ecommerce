// Get cart from localStorage
export function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add or update product in cart
export function addToCart(data) {
  const cart = getCart();
  const existingItem = cart.find(item => item.product_id === data.product_id);

  if (existingItem) {
    existingItem.quantity += data.quantity || 1;
  } else {
    cart.push({ ...data, quantity: data.quantity || 1 });
  }

  saveCart(cart);
}

// Remove item by product_id
export function removeFromCart(product_id) {
  const cart = getCart().filter(item => item.product_id !== product_id);
  saveCart(cart);
}

// Increment item quantity
export function incrementProductCart(product_id) {
  const cart = getCart().map(item => {
    if (item.product_id === product_id) {
      item.quantity += 1;
    }
    return item;
  });

  console.log(cart)
  console.log(product_id)
  saveCart(cart);
}

/**
 * 
 * increment by quantity in attributes if product have attributes
 */
export function incrementProductCartAttributesQuantity(product_id,attribute_id){
  const cart=getCart().map(
    item => {
      if(item.product_id == product_id && item.attributes){
        item.attributes.forEach(attr => {
          if(attr.id== attribute_id){
            attr.quantity+=1
          }
        })
      }

      return item
    })

  saveCart(cart)
}

export function decrementProductCartAttributesQuantity(product_id,attribute_id){
  const cart=getCart().map(
    item => {
      if(item.product_id == product_id && item.attributes){
        item.attributes = item.attributes.reduce((acc, attr) => {
          if (attr.id == attribute_id) {
            if (attr.quantity > 1) {
              attr.quantity -= 1;
              acc.push(attr);
            }
            // else: لا تُضيفه (يُحذف)
          } else {
            acc.push(attr); // غير المستهدف يُترك كما هو
          }
          return acc;
        }, []);
      }

      return item
    });

  saveCart(cart)
}



// Decrement item quantity, and remove if quantity becomes 0
export function decrementProductCart(product_id) {
  let cart = getCart().map(item => {
    if (item.product_id === product_id && item.quantity > 1) {
      item.quantity -= 1;
    }
    return item;
  });

  cart = cart.filter(item => item.quantity > 0);
  saveCart(cart);
}

// Optional: Clear entire cart
export function clearCart() {
  localStorage.removeItem('cart');
}
