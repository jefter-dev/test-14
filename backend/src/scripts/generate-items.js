const path = require("path");
const mockItems = require("../routes/mock-items");
const fs = require("fs").promises;

const mockDataPath = path.join(__dirname, "../../../data/items.json");

const baseItems = mockItems;

const totalItems = parseInt(process.argv[2], 10) || 100;

async function generateItems(quantity) {
  const items = [];

  for (let i = 0; i < quantity; i++) {
    const base = baseItems[i % baseItems.length];
    items.push({
      id: i + 1,
      name: `${base.name} #${i + 1}`,
      category: base.category,
      price: base.price + i * 10,
      image: base.image,
    });
  }

  await fs.mkdir(path.dirname(mockDataPath), { recursive: true });
  await fs.writeFile(mockDataPath, JSON.stringify(items, null, 2));

  console.log(`✅ ${totalItems} items generated at ${mockDataPath}`);
}

// Execute the script
generateItems(totalItems).catch((err) => {
  console.error("❌ Error generating items:", err);
});
