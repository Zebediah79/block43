import db from "#db/client";

export async function createOrderProduct(order_id, product_id, quantity) {
  const SQL = `
    INSERT INTO products_orders (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const { rows: orderProduct } = await db.query(SQL, [
    order_id,
    product_id,
    quantity,
  ]);
  return orderProduct;
}

export async function getOrdersByUserIdAndProductId(userId, productId) {
  const SQL = `
    SELECT orders.*
    FROM orders
    JOIN products_orders ON orders.id = products_orders.order_id
    WHERE orders.user_id = $1
    AND products_orders.product_id = $2
    `;
  const { rows: orders } = await db.query(SQL, [userId, productId]);
  return orders;
}

export async function getProductsByOrderId(id) {
  const SQL = `
    SELECT products.*
    FROM products
    JOIN products_orders ON products.id = products_orders.products_id
    WHERE products_orders.order_id = $1
    `;
  const { rows: products } = await db.query(SQL, [id]);
  return products;
}
