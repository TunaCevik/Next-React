const sql = require("better-sqlite3");
const path = require("path");

const db = sql(path.join(process.cwd(), "data", "meals.db")); // Veritabanına erişim
module.exports = db;

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
  // run() datayı değiştirmek için all() tüm datayı almak için
}
