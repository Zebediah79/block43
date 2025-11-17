import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createProduct } from "#db/queries/products";
import { createOrder } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    await createProduct(
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      faker.commerce.price({ min: 5, max: 1000 })
    );
  }

  const user1 = await createUser("Bocephus", "graciedog");
  const order1 = await createOrder(
    "2025-11-03",
    "Order for Bocephus",
    user1.id
  );
  await createNewOrders(order1.id);

  const user2 = await createUser("Zebediah", "winfield");
  const order2 = await createOrder(
    "2025-11-05",
    "Order for Zebediah",
    user2.id
  );
  await createNewOrders(order2.id);

  async function createNewOrders(id) {
    for (let i = 1; i <= 5; i++) {
      const quantity = 1 + Math.floor(Math.random() * 10);
      const productId = 1 + Math.floor(Math.random() * 10);
      await createOrderProduct(id, productId, quantity);
    }
  }
}
