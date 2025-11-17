import db from "#db/client";

export async function createOrder(date, note, user_id) {
  const SQL = `
    INSERT INTO orders (date, note, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [order],
  } = await db.query(SQL, [date, note, user_id]);
  return order;
}

export async function getOrders() {
  const SQL = `
    SELECT * FROM orders`;
  const { rows: orders } = await db.query(SQL);
  return orders;
}

export async function getOrdersById(id) {
  const SQL = `
    SELECT * FROM orders
    WHERE id = $1`;
  const {
    rows: [order],
  } = await db.query(SQL, [id]);
  return order;
}

export async function getOrdersByUserId(id) {
  const SQL = `
  SELECT orders.*
  FROM orders
  WHERE user_id = $1
  `;
  const { rows: orders } = await db.query(SQL, [id]);
  return orders;
}
