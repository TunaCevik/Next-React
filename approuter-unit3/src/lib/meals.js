import fs from "node:fs";
const sql = require("better-sqlite3");
const path = require("path");
import slugify from "slugify";
import xss from "xss";
const db = sql(path.join(process.cwd(), "data", "meals.db")); // Veritabanına erişim
module.exports = db;

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
  // run() datayı değiştirmek için all() tüm datayı almak için
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/assets/${fileName}`); // imagelerin nereye gideceğini pathi oluşturuluyor
  const bufferedImage = await meal.image.arrayBuffer(); // image'i buffer a dönüştürmeliyiz

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/assets/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}
