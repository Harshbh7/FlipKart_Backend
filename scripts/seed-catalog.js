import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';
import Product from '../src/models/productModel.js';

dotenv.config();

const productsData = [

  /* =========================
   📱 MOBILES CATEGORY
========================= */

  {
    name: "Apple iPhone 16 Pro Max (256GB)",
    description: "A18 Pro chip, titanium body, 48MP camera system, 6.9 inch Super Retina XDR display.",
    price: 159900,
    originalPrice: 179900,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 20,
    ratings: 4.9,
    numOfReviews: 5230,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 15 (128GB)",
    description: "Dynamic Island, A16 Bionic chip, 48MP main camera and USB-C charging.",
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.8,
    numOfReviews: 8410,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Samsung Galaxy S25 Ultra 5G",
    description: "Galaxy AI smartphone with 200MP camera, AMOLED display and S Pen.",
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    brand: "Samsung",
    category: "Mobiles",
    stock: 25,
    ratings: 4.8,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"
  },

  {
    name: "Samsung Galaxy Z Fold 6",
    description: "Foldable smartphone with Snapdragon chipset and large AMOLED screen.",
    price: 164999,
    originalPrice: 179999,
    discount: 8,
    brand: "Samsung",
    category: "Mobiles",
    stock: 12,
    ratings: 4.7,
    numOfReviews: 900,
    imageUrl: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800"
  },

  {
    name: "OnePlus 13 5G",
    description: "16GB RAM flagship phone with Hasselblad camera and super fast charging.",
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    brand: "OnePlus",
    category: "Mobiles",
    stock: 35,
    ratings: 4.6,
    numOfReviews: 2500,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  {
    name: "OnePlus Nord CE 4",
    description: "Snapdragon processor, AMOLED 120Hz display and 100W fast charging.",
    price: 24999,
    originalPrice: 29999,
    discount: 16,
    brand: "OnePlus",
    category: "Mobiles",
    stock: 60,
    ratings: 4.5,
    numOfReviews: 6100,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Google Pixel 9 Pro",
    description: "Tensor AI processor with advanced photography and clean Android experience.",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    brand: "Google",
    category: "Mobiles",
    stock: 22,
    ratings: 4.7,
    numOfReviews: 1300,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  {
    name: "Xiaomi Redmi Note 14 Pro+",
    description: "200MP OIS camera, AMOLED display and ultra fast charging support.",
    price: 29999,
    originalPrice: 34999,
    discount: 15,
    brand: "Xiaomi",
    category: "Mobiles",
    stock: 80,
    ratings: 4.4,
    numOfReviews: 7400,
    imageUrl: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=800"
  },

  {
    name: "Realme GT Neo 6",
    description: "Gaming performance phone with AMOLED screen and flagship processor.",
    price: 35999,
    originalPrice: 42999,
    discount: 16,
    brand: "Realme",
    category: "Mobiles",
    stock: 45,
    ratings: 4.5,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Vivo V50 Pro 5G",
    description: "ZEISS portrait camera system, slim design and AMOLED curved display.",
    price: 44999,
    originalPrice: 52999,
    discount: 15,
    brand: "Vivo",
    category: "Mobiles",
    stock: 35,
    ratings: 4.4,
    numOfReviews: 1900,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  /* =========================
     📱 MORE MOBILES
  ========================= */

  {
    name: "Motorola Edge 60 Pro",
    description: "Premium curved display phone with AI camera and fast charging.",
    price: 32999,
    originalPrice: 39999,
    discount: 17,
    brand: "Motorola",
    category: "Mobiles",
    stock: 40,
    ratings: 4.4,
    numOfReviews: 1200,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "OPPO Reno 13 Pro 5G",
    description: "AI portrait camera phone with slim premium glass design.",
    price: 42999,
    originalPrice: 49999,
    discount: 14,
    brand: "OPPO",
    category: "Mobiles",
    stock: 35,
    ratings: 4.5,
    numOfReviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=800"
  },

  {
    name: "Nothing Phone 3",
    description: "Transparent glyph design smartphone with clean Android experience.",
    price: 45999,
    originalPrice: 52999,
    discount: 13,
    brand: "Nothing",
    category: "Mobiles",
    stock: 25,
    ratings: 4.6,
    numOfReviews: 1600,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },


  /* =========================
     💻 LAPTOPS
  ========================= */

  {
    name: "Apple MacBook Air M3 16GB RAM",
    description: "Apple M3 chip laptop with Retina display and all day battery.",
    price: 114900,
    originalPrice: 124900,
    discount: 8,
    brand: "Apple",
    category: "Electronics",
    stock: 20,
    ratings: 4.9,
    numOfReviews: 4500,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
  },

  {
    name: "MacBook Pro M4 Pro 14 inch",
    description: "Professional laptop with M4 Pro chip and Liquid Retina XDR display.",
    price: 199900,
    originalPrice: 219900,
    discount: 9,
    brand: "Apple",
    category: "Electronics",
    stock: 10,
    ratings: 4.9,
    numOfReviews: 900,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
  },

  {
    name: "Dell XPS 15 OLED",
    description: "Premium creator laptop with Intel Ultra processor and OLED display.",
    price: 149999,
    originalPrice: 169999,
    discount: 12,
    brand: "Dell",
    category: "Electronics",
    stock: 15,
    ratings: 4.7,
    numOfReviews: 1500,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800"
  },

  {
    name: "HP Victus Gaming Laptop RTX 4060",
    description: "Gaming laptop with Ryzen processor and NVIDIA RTX graphics.",
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    brand: "HP",
    category: "Electronics",
    stock: 25,
    ratings: 4.6,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800"
  },

  {
    name: "ASUS ROG Strix G16",
    description: "High end gaming laptop with RGB keyboard and RTX GPU.",
    price: 139999,
    originalPrice: 159999,
    discount: 13,
    brand: "ASUS",
    category: "Electronics",
    stock: 12,
    ratings: 4.8,
    numOfReviews: 1100,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"
  },

  {
    name: "Lenovo Legion 5 Pro",
    description: "Gaming laptop with powerful cooling and 165Hz display.",
    price: 124999,
    originalPrice: 139999,
    discount: 10,
    brand: "Lenovo",
    category: "Electronics",
    stock: 18,
    ratings: 4.7,
    numOfReviews: 2100,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
  },


  /* =========================
     🎧 ELECTRONICS
  ========================= */

  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise cancelling headphones with 30 hours battery.",
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    brand: "Sony",
    category: "Electronics",
    stock: 50,
    ratings: 4.8,
    numOfReviews: 8500,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
  },

  {
    name: "Apple AirPods Pro 2",
    description: "Wireless earbuds with ANC and spatial audio technology.",
    price: 24999,
    originalPrice: 26999,
    discount: 8,
    brand: "Apple",
    category: "Electronics",
    stock: 70,
    ratings: 4.8,
    numOfReviews: 9200,
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800"
  },

  {
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Waterproof portable speaker with powerful JBL signature sound.",
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    brand: "JBL",
    category: "Electronics",
    stock: 80,
    ratings: 4.6,
    numOfReviews: 5400,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800"
  },

  {
    name: "Canon EOS R50 Mirrorless Camera",
    description: "4K video mirrorless camera for creators and photography.",
    price: 74999,
    originalPrice: 89999,
    discount: 16,
    brand: "Canon",
    category: "Electronics",
    stock: 20,
    ratings: 4.7,
    numOfReviews: 1300,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
  },

  {
    name: "Sony PlayStation 5 Slim",
    description: "Next generation gaming console with 4K HDR gaming.",
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    brand: "Sony",
    category: "Electronics",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 12000,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800"
  },
  /* =========================
     👕 MEN FASHION
  ========================= */

  {
    name: "Nike Air Max Running Shoes",
    description: "Premium lightweight running shoes with Air cushioning comfort.",
    price: 8999,
    originalPrice: 12999,
    discount: 30,
    brand: "Nike",
    category: "Fashion",
    stock: 60,
    ratings: 4.6,
    numOfReviews: 5400,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },

  {
    name: "Adidas Ultraboost Shoes",
    description: "Responsive running shoes with boost midsole technology.",
    price: 12999,
    originalPrice: 16999,
    discount: 23,
    brand: "Adidas",
    category: "Fashion",
    stock: 45,
    ratings: 4.7,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800"
  },

  {
    name: "Puma Sports Sneakers",
    description: "Stylish casual sneakers for daily lifestyle and sports.",
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    brand: "Puma",
    category: "Fashion",
    stock: 70,
    ratings: 4.4,
    numOfReviews: 2100,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
  },

  {
    name: "Levis Slim Fit Blue Jeans",
    description: "Premium stretchable denim jeans with modern slim fitting.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Levi's",
    category: "Fashion",
    stock: 100,
    ratings: 4.5,
    numOfReviews: 4500,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  },

  {
    name: "Allen Solly Formal Shirt",
    description: "Cotton formal shirt suitable for office and meetings.",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    brand: "Allen Solly",
    category: "Fashion",
    stock: 80,
    ratings: 4.3,
    numOfReviews: 1500,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "US Polo Casual T-Shirt",
    description: "Premium cotton polo neck t-shirt with stylish branding.",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    brand: "US Polo",
    category: "Fashion",
    stock: 90,
    ratings: 4.4,
    numOfReviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Adidas Black Hoodie",
    description: "Warm fleece hoodie with regular fit and modern design.",
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    brand: "Adidas",
    category: "Fashion",
    stock: 50,
    ratings: 4.5,
    numOfReviews: 1700,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },

  {
    name: "RayBan Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection lenses.",
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    brand: "RayBan",
    category: "Fashion",
    stock: 40,
    ratings: 4.7,
    numOfReviews: 3500,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
  },


  /* =========================
     ⌚ WATCHES & BAGS
  ========================= */

  {
    name: "Fastrack Analog Watch",
    description: "Stylish waterproof analog watch with leather strap.",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    brand: "Fastrack",
    category: "Fashion",
    stock: 75,
    ratings: 4.4,
    numOfReviews: 2600,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    name: "Titan Premium Watch",
    description: "Luxury stainless steel watch with elegant finishing.",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    brand: "Titan",
    category: "Fashion",
    stock: 40,
    ratings: 4.7,
    numOfReviews: 1900,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"
  },

  {
    name: "Wildcraft Travel Backpack",
    description: "Large capacity waterproof backpack for travel and college.",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    brand: "Wildcraft",
    category: "Bags",
    stock: 80,
    ratings: 4.5,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
  },

  {
    name: "Skybags Laptop Backpack",
    description: "Premium laptop bag with multiple compartments.",
    price: 1999,
    originalPrice: 3499,
    discount: 42,
    brand: "Skybags",
    category: "Bags",
    stock: 90,
    ratings: 4.4,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800"
  },

  /* =========================
     👗 WOMEN FASHION
  ========================= */

  {
    name: "BIBA Printed Cotton Kurti",
    description: "Premium ethnic cotton kurti with beautiful printed design.",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    brand: "BIBA",
    category: "Fashion",
    stock: 80,
    ratings: 4.5,
    numOfReviews: 3500,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "Aurelia Women Straight Kurta",
    description: "Comfortable daily wear kurta with modern ethnic styling.",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    brand: "Aurelia",
    category: "Fashion",
    stock: 70,
    ratings: 4.3,
    numOfReviews: 1800,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800"
  },

  {
    name: "Banarasi Silk Saree",
    description: "Traditional silk saree with premium zari work.",
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    brand: "Sangria",
    category: "Fashion",
    stock: 40,
    ratings: 4.6,
    numOfReviews: 2200,
    imageUrl: "https://images.unsplash.com/photo-1610189012230-2e7f6c8f1f4f?w=800"
  },

  {
    name: "Women Western Party Dress",
    description: "Stylish one piece dress for party and casual occasions.",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    brand: "Tokyo Talkies",
    category: "Fashion",
    stock: 60,
    ratings: 4.4,
    numOfReviews: 1300,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c9568?w=800"
  },

  {
    name: "Lavie Women Handbag",
    description: "Premium leather handbag with multiple compartments.",
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    brand: "Lavie",
    category: "Bags",
    stock: 45,
    ratings: 4.5,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Zaveri Pearl Jewellery Set",
    description: "Beautiful necklace and earrings combo jewellery set.",
    price: 1299,
    originalPrice: 3999,
    discount: 67,
    brand: "Zaveri Pearls",
    category: "Fashion",
    stock: 90,
    ratings: 4.4,
    numOfReviews: 4200,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },


  /* =========================
     💄 BEAUTY PRODUCTS
  ========================= */

  {
    name: "Lakme Absolute Matte Lipstick",
    description: "Long lasting matte lipstick with smooth finish.",
    price: 699,
    originalPrice: 999,
    discount: 30,
    brand: "Lakme",
    category: "Beauty",
    stock: 120,
    ratings: 4.5,
    numOfReviews: 8000,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800"
  },

  {
    name: "Maybelline Fit Me Foundation",
    description: "Natural coverage liquid foundation for all skin types.",
    price: 549,
    originalPrice: 799,
    discount: 31,
    brand: "Maybelline",
    category: "Beauty",
    stock: 150,
    ratings: 4.6,
    numOfReviews: 12000,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
  },

  {
    name: "MAC Professional Makeup Kit",
    description: "Complete premium makeup kit with multiple cosmetics.",
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    brand: "MAC",
    category: "Beauty",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 2500,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
  },

  {
    name: "Mamaearth Vitamin C Face Wash",
    description: "Natural vitamin C face wash for glowing skin.",
    price: 299,
    originalPrice: 399,
    discount: 25,
    brand: "Mamaearth",
    category: "Beauty",
    stock: 200,
    ratings: 4.4,
    numOfReviews: 15000,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
  },

  {
    name: "Nivea Body Lotion 400ml",
    description: "Deep moisture body lotion for soft and smooth skin.",
    price: 349,
    originalPrice: 499,
    discount: 30,
    brand: "Nivea",
    category: "Beauty",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 9500,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800"
  },

  {
    name: "L'Oreal Paris Shampoo",
    description: "Hair repair shampoo with keratin protection formula.",
    price: 499,
    originalPrice: 699,
    discount: 28,
    brand: "L'Oreal",
    category: "Beauty",
    stock: 130,
    ratings: 4.3,
    numOfReviews: 6000,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  },

  {
    name: "Park Avenue Premium Perfume",
    description: "Long lasting luxury fragrance for men.",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    brand: "Park Avenue",
    category: "Beauty",
    stock: 75,
    ratings: 4.4,
    numOfReviews: 3100,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
  },

  {
    name: "Beardo Beard Grooming Kit",
    description: "Complete beard oil, wash and grooming essentials combo.",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    brand: "Beardo",
    category: "Beauty",
    stock: 65,
    ratings: 4.5,
    numOfReviews: 2700,
    imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800"
  },
  /* =========================
     🏠 HOME & FURNITURE
  ========================= */

  {
    name: "Wakefit Orthopedic Memory Foam Mattress",
    description: "Premium orthopedic mattress with pressure relief and back support technology.",
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    brand: "Wakefit",
    category: "Furniture",
    stock: 40,
    ratings: 4.6,
    numOfReviews: 8500,
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
  },

  {
    name: "Godrej Interio Wooden Wardrobe",
    description: "Modern engineered wood wardrobe with spacious storage compartments.",
    price: 24999,
    originalPrice: 34999,
    discount: 28,
    brand: "Godrej",
    category: "Furniture",
    stock: 20,
    ratings: 4.5,
    numOfReviews: 2100,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
  },

  {
    name: "Urban Ladder Sofa Set 5 Seater",
    description: "Luxury fabric sofa set with premium cushioning and wooden frame.",
    price: 45999,
    originalPrice: 69999,
    discount: 34,
    brand: "Urban Ladder",
    category: "Furniture",
    stock: 15,
    ratings: 4.7,
    numOfReviews: 1400,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
  },

  {
    name: "Nilkamal Plastic Chair Set",
    description: "Strong lightweight plastic chairs suitable for home and outdoor.",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    brand: "Nilkamal",
    category: "Furniture",
    stock: 100,
    ratings: 4.3,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800"
  },

  {
    name: "Wooden Computer Study Table",
    description: "Modern study desk with storage shelves for laptop and books.",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    brand: "HomeTown",
    category: "Furniture",
    stock: 35,
    ratings: 4.4,
    numOfReviews: 1900,
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"
  },

  {
    name: "Queen Size Wooden Bed",
    description: "Premium engineered wood queen bed with storage drawers.",
    price: 29999,
    originalPrice: 44999,
    discount: 33,
    brand: "Wakefit",
    category: "Furniture",
    stock: 18,
    ratings: 4.6,
    numOfReviews: 2600,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
  },

  {
    name: "Home Centre Dining Table Set",
    description: "Six seater dining table set with premium wooden finish.",
    price: 34999,
    originalPrice: 49999,
    discount: 30,
    brand: "Home Centre",
    category: "Furniture",
    stock: 12,
    ratings: 4.5,
    numOfReviews: 900,
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"
  },

  /* =========================
   ⌚ WATCHES (50 PRODUCTS)
========================= */

  {
    name: "Casio F91W Digital Watch",
    description: "Classic lightweight digital watch with alarm, stopwatch and water resistance.",
    price: 999,
    originalPrice: 1495,
    discount: 33,
    brand: "Casio",
    category: "Watches",
    stock: 120,
    ratings: 4.8,
    numOfReviews: 45230,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    name: "Casio A168WA-1 Digital Watch",
    description: "Retro stainless steel digital watch with LED backlight.",
    price: 2995,
    originalPrice: 3995,
    discount: 25,
    brand: "Casio",
    category: "Watches",
    stock: 85,
    ratings: 4.7,
    numOfReviews: 8200,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
  },

  {
    name: "Casio G-Shock GA-2100",
    description: "Shock resistant analog digital sports watch.",
    price: 7995,
    originalPrice: 9995,
    discount: 20,
    brand: "Casio",
    category: "Watches",
    stock: 50,
    ratings: 4.9,
    numOfReviews: 11200,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
  },

  {
    name: "Casio Edifice EFV-100D",
    description: "Premium stainless steel analog watch.",
    price: 6495,
    originalPrice: 8995,
    discount: 28,
    brand: "Casio",
    category: "Watches",
    stock: 40,
    ratings: 4.7,
    numOfReviews: 3400,
    imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800"
  },

  {
    name: "Titan Neo Analog Watch",
    description: "Elegant formal analog watch for men.",
    price: 2895,
    originalPrice: 3995,
    discount: 27,
    brand: "Titan",
    category: "Watches",
    stock: 75,
    ratings: 4.6,
    numOfReviews: 6100,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800"
  },

  {
    name: "Titan Karishma Analog Watch",
    description: "Classic everyday analog watch.",
    price: 2399,
    originalPrice: 3495,
    discount: 31,
    brand: "Titan",
    category: "Watches",
    stock: 80,
    ratings: 4.5,
    numOfReviews: 5200,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800"
  },

  {
    name: "Titan Edge Slim Watch",
    description: "Ultra slim premium formal watch.",
    price: 11995,
    originalPrice: 14995,
    discount: 20,
    brand: "Titan",
    category: "Watches",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 1700,
    imageUrl: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800"
  },

  {
    name: "Fastrack Trendies Analog Watch",
    description: "Youth casual analog wrist watch.",
    price: 1595,
    originalPrice: 2495,
    discount: 36,
    brand: "Fastrack",
    category: "Watches",
    stock: 95,
    ratings: 4.5,
    numOfReviews: 7400,
    imageUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800"
  },

  {
    name: "Fastrack Reflex Vox Smartwatch",
    description: "Bluetooth calling smartwatch with health tracking.",
    price: 2999,
    originalPrice: 5995,
    discount: 50,
    brand: "Fastrack",
    category: "Smart Watches",
    stock: 90,
    ratings: 4.4,
    numOfReviews: 6200,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Timex Expedition Scout",
    description: "Outdoor rugged analog watch.",
    price: 4495,
    originalPrice: 6995,
    discount: 36,
    brand: "Timex",
    category: "Watches",
    stock: 60,
    ratings: 4.7,
    numOfReviews: 4300,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"
  },

  {
    name: "Timex Weekender",
    description: "Classic casual analog wrist watch.",
    price: 3595,
    originalPrice: 4995,
    discount: 28,
    brand: "Timex",
    category: "Watches",
    stock: 55,
    ratings: 4.6,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1522313224075-d130a420d20d?w=800"
  },

  {
    name: "Sonata Essentials Analog Watch",
    description: "Affordable everyday analog watch.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    brand: "Sonata",
    category: "Watches",
    stock: 150,
    ratings: 4.4,
    numOfReviews: 10200,
    imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800"
  },

  {
    name: "Sonata Poze Quartz Watch",
    description: "Elegant quartz watch for daily use.",
    price: 1499,
    originalPrice: 2299,
    discount: 35,
    brand: "Sonata",
    category: "Watches",
    stock: 100,
    ratings: 4.5,
    numOfReviews: 3800,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800"
  },

  {
    name: "Fossil Grant Chronograph",
    description: "Premium leather strap chronograph watch.",
    price: 9995,
    originalPrice: 14995,
    discount: 33,
    brand: "Fossil",
    category: "Watches",
    stock: 40,
    ratings: 4.8,
    numOfReviews: 5400,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
  },

  {
    name: "Fossil Machine Stainless Steel",
    description: "Bold stainless steel analog watch.",
    price: 10995,
    originalPrice: 15995,
    discount: 31,
    brand: "Fossil",
    category: "Watches",
    stock: 28,
    ratings: 4.7,
    numOfReviews: 2600,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800"
  },

  {
    name: "Tommy Hilfiger Analog Watch",
    description: "Premium fashion watch with leather strap.",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    brand: "Tommy Hilfiger",
    category: "Watches",
    stock: 35,
    ratings: 4.6,
    numOfReviews: 2900,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
  },

  {
    name: "Armani Exchange Hampton Watch",
    description: "Luxury stainless steel analog watch.",
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    brand: "Armani Exchange",
    category: "Watches",
    stock: 25,
    ratings: 4.8,
    numOfReviews: 1800,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    name: "Guess Men's Analog Watch",
    description: "Premium fashion analog watch.",
    price: 8999,
    originalPrice: 13999,
    discount: 36,
    brand: "Guess",
    category: "Watches",
    stock: 35,
    ratings: 4.6,
    numOfReviews: 2100,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"
  },

  {
    name: "Daniel Wellington Classic Sheffield",
    description: "Minimal black leather strap watch.",
    price: 10999,
    originalPrice: 15999,
    discount: 31,
    brand: "Daniel Wellington",
    category: "Watches",
    stock: 32,
    ratings: 4.7,
    numOfReviews: 2600,
    imageUrl: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=800"
  },

  {
    name: "Emporio Armani AR2448",
    description: "Luxury chronograph stainless steel watch.",
    price: 17999,
    originalPrice: 24999,
    discount: 28,
    brand: "Emporio Armani",
    category: "Watches",
    stock: 20,
    ratings: 4.9,
    numOfReviews: 1900,
    imageUrl: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800"
  },

  {
    name: "Apple Watch SE GPS 40mm",
    description: "Smartwatch with fitness tracking and Retina display.",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    brand: "Apple",
    category: "Smart Watches",
    stock: 45,
    ratings: 4.9,
    numOfReviews: 15200,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Apple Watch Series 9 GPS",
    description: "Advanced smartwatch with health monitoring.",
    price: 41999,
    originalPrice: 45999,
    discount: 9,
    brand: "Apple",
    category: "Smart Watches",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 9800,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Samsung Galaxy Watch6",
    description: "Premium Wear OS smartwatch with AMOLED display.",
    price: 26999,
    originalPrice: 32999,
    discount: 18,
    brand: "Samsung",
    category: "Smart Watches",
    stock: 50,
    ratings: 4.8,
    numOfReviews: 7600,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Samsung Galaxy Watch FE",
    description: "Affordable smartwatch with fitness tracking.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    brand: "Samsung",
    category: "Smart Watches",
    stock: 60,
    ratings: 4.6,
    numOfReviews: 3400,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Noise ColorFit Pro 5",
    description: "AMOLED smartwatch with Bluetooth calling.",
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    brand: "Noise",
    category: "Smart Watches",
    stock: 100,
    ratings: 4.4,
    numOfReviews: 12500,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Noise ColorFit Ultra 3",
    description: "Premium smartwatch with large AMOLED display.",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    brand: "Noise",
    category: "Smart Watches",
    stock: 85,
    ratings: 4.5,
    numOfReviews: 6200,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "boAt Wave Sigma",
    description: "Bluetooth calling smartwatch with health features.",
    price: 2199,
    originalPrice: 4999,
    discount: 56,
    brand: "boAt",
    category: "Smart Watches",
    stock: 130,
    ratings: 4.3,
    numOfReviews: 9300,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "boAt Xtend Smartwatch",
    description: "Alexa enabled smartwatch.",
    price: 2499,
    originalPrice: 5999,
    discount: 58,
    brand: "boAt",
    category: "Smart Watches",
    stock: 90,
    ratings: 4.4,
    numOfReviews: 15800,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Fire-Boltt Ninja Call Pro",
    description: "Budget smartwatch with Bluetooth calling.",
    price: 1499,
    originalPrice: 3999,
    discount: 63,
    brand: "Fire-Boltt",
    category: "Smart Watches",
    stock: 150,
    ratings: 4.2,
    numOfReviews: 18200,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Fire-Boltt Phoenix",
    description: "Smartwatch with 120+ sports modes.",
    price: 1799,
    originalPrice: 4999,
    discount: 64,
    brand: "Fire-Boltt",
    category: "Smart Watches",
    stock: 110,
    ratings: 4.3,
    numOfReviews: 9800,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Amazfit GTR Mini",
    description: "Premium AMOLED smartwatch with GPS.",
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    brand: "Amazfit",
    category: "Smart Watches",
    stock: 45,
    ratings: 4.7,
    numOfReviews: 2500,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Amazfit Bip 5",
    description: "Large display smartwatch with Alexa support.",
    price: 6499,
    originalPrice: 8999,
    discount: 28,
    brand: "Amazfit",
    category: "Smart Watches",
    stock: 60,
    ratings: 4.6,
    numOfReviews: 3100,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Garmin Forerunner 165",
    description: "GPS running smartwatch with AMOLED display.",
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    brand: "Garmin",
    category: "Smart Watches",
    stock: 20,
    ratings: 4.9,
    numOfReviews: 1400,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Garmin Instinct 2",
    description: "Military grade rugged GPS smartwatch.",
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    brand: "Garmin",
    category: "Smart Watches",
    stock: 15,
    ratings: 4.9,
    numOfReviews: 900,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Citizen Eco-Drive BM8180",
    description: "Solar powered analog watch.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    brand: "Citizen",
    category: "Watches",
    stock: 25,
    ratings: 4.8,
    numOfReviews: 1700,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    name: "Seiko 5 Sports Automatic",
    description: "Automatic mechanical sports watch.",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    brand: "Seiko",
    category: "Watches",
    stock: 18,
    ratings: 4.9,
    numOfReviews: 1500,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"
  },

  {
    name: "Orient Bambino Automatic",
    description: "Classic dress automatic watch.",
    price: 22999,
    originalPrice: 27999,
    discount: 18,
    brand: "Orient",
    category: "Watches",
    stock: 16,
    ratings: 4.8,
    numOfReviews: 1200,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800"
  },

  {
    name: "Tissot PRX Quartz",
    description: "Swiss made luxury quartz watch.",
    price: 37999,
    originalPrice: 42999,
    discount: 12,
    brand: "Tissot",
    category: "Watches",
    stock: 10,
    ratings: 4.9,
    numOfReviews: 950,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800"
  },

  {
    name: "Michael Kors Lexington",
    description: "Luxury women's fashion watch.",
    price: 16999,
    originalPrice: 22999,
    discount: 26,
    brand: "Michael Kors",
    category: "Watches",
    stock: 22,
    ratings: 4.7,
    numOfReviews: 1800,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    name: "Anne Klein Diamond Watch",
    description: "Elegant women's bracelet watch.",
    price: 9999,
    originalPrice: 13999,
    discount: 29,
    brand: "Anne Klein",
    category: "Watches",
    stock: 28,
    ratings: 4.6,
    numOfReviews: 1100,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
  },

  {
    name: "Skagen Signatur Watch",
    description: "Minimal Scandinavian design watch.",
    price: 11999,
    originalPrice: 15999,
    discount: 25,
    brand: "Skagen",
    category: "Watches",
    stock: 24,
    ratings: 4.7,
    numOfReviews: 1400,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
  },

  {
    name: "Police Analog Watch",
    description: "Bold premium fashion wrist watch.",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    brand: "Police",
    category: "Watches",
    stock: 38,
    ratings: 4.5,
    numOfReviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800"
  },

  {
    name: "Diesel Mega Chief",
    description: "Oversized chronograph men's watch.",
    price: 13999,
    originalPrice: 18999,
    discount: 26,
    brand: "Diesel",
    category: "Watches",
    stock: 20,
    ratings: 4.6,
    numOfReviews: 1500,
    imageUrl: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=800"
  },

  {
    name: "Kenneth Cole Analog Watch",
    description: "Premium leather strap dress watch.",
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    brand: "Kenneth Cole",
    category: "Watches",
    stock: 40,
    ratings: 4.5,
    numOfReviews: 1700,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800"
  },

  {
    name: "Invicta Pro Diver",
    description: "Automatic diver style watch.",
    price: 10999,
    originalPrice: 14999,
    discount: 27,
    brand: "Invicta",
    category: "Watches",
    stock: 26,
    ratings: 4.7,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"
  },

  {
    name: "Casio Vintage A700",
    description: "Ultra slim retro digital watch.",
    price: 3495,
    originalPrice: 4495,
    discount: 22,
    brand: "Casio",
    category: "Watches",
    stock: 65,
    ratings: 4.8,
    numOfReviews: 5200,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
  },

  {
    name: "Titan Smart 3",
    description: "AMOLED smartwatch with Bluetooth calling.",
    price: 4995,
    originalPrice: 7995,
    discount: 38,
    brand: "Titan",
    category: "Smart Watches",
    stock: 70,
    ratings: 4.5,
    numOfReviews: 4300,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Fastrack Limitless FS1",
    description: "Premium AMOLED smartwatch.",
    price: 3495,
    originalPrice: 5995,
    discount: 42,
    brand: "Fastrack",
    category: "Smart Watches",
    stock: 75,
    ratings: 4.4,
    numOfReviews: 3800,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Realme Watch 3 Pro",
    description: "AMOLED smartwatch with GPS and Bluetooth calling.",
    price: 4499,
    originalPrice: 6999,
    discount: 36,
    brand: "Realme",
    category: "Smart Watches",
    stock: 65,
    ratings: 4.5,
    numOfReviews: 5400,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  {
    name: "Huawei Watch GT 4",
    description: "Premium smartwatch with long battery life.",
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    brand: "Huawei",
    category: "Smart Watches",
    stock: 28,
    ratings: 4.8,
    numOfReviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  },

  /* =========================
     🏠 HOME DECOR
  ========================= */

  {
    name: "Philips Smart LED Bulb",
    description: "WiFi enabled smart bulb with app control and multiple colors.",
    price: 799,
    originalPrice: 1499,
    discount: 46,
    brand: "Philips",
    category: "Home",
    stock: 200,
    ratings: 4.5,
    numOfReviews: 11000,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"
  },

  {
    name: "Decorative Wall Clock",
    description: "Modern wall clock for living room and bedroom decoration.",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    brand: "Ajanta",
    category: "Home",
    stock: 90,
    ratings: 4.3,
    numOfReviews: 2500,
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800"
  },

  {
    name: "Luxury Bedsheet King Size",
    description: "Soft cotton bedsheet with premium printed design.",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    brand: "Bombay Dyeing",
    category: "Home",
    stock: 120,
    ratings: 4.4,
    numOfReviews: 5000,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800"
  },

  /* =========================
   📱 MOBILE PHONES (1-20)
========================= */

  {
    name: "Apple iPhone 16 Pro Max 256GB",
    description: "Flagship iPhone with A18 Pro chip, 48MP camera system and Super Retina XDR display.",
    price: 144900,
    originalPrice: 159900,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 18250,
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800"
  },

  {
    name: "Apple iPhone 16 128GB",
    description: "Powerful A18 chip with advanced dual camera system and OLED display.",
    price: 79900,
    originalPrice: 89900,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 14520,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 15 128GB",
    description: "Dynamic Island, USB-C charging and 48MP main camera.",
    price: 69900,
    originalPrice: 79900,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 80,
    ratings: 4.8,
    numOfReviews: 28600,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Samsung Galaxy S25 Ultra 512GB",
    description: "Premium flagship smartphone with Snapdragon processor and AI features.",
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    brand: "Samsung",
    category: "Mobiles",
    stock: 40,
    ratings: 4.9,
    numOfReviews: 11230,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"
  },

  {
    name: "Samsung Galaxy S25 256GB",
    description: "Flagship smartphone with AMOLED display and AI powered camera.",
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    brand: "Samsung",
    category: "Mobiles",
    stock: 55,
    ratings: 4.8,
    numOfReviews: 8350,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"
  },

  {
    name: "Samsung Galaxy A56 5G",
    description: "Mid-range smartphone with AMOLED display and 50MP camera.",
    price: 38999,
    originalPrice: 44999,
    discount: 13,
    brand: "Samsung",
    category: "Mobiles",
    stock: 75,
    ratings: 4.6,
    numOfReviews: 5120,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"
  },

  {
    name: "OnePlus 13 256GB",
    description: "Snapdragon flagship with Hasselblad camera and 120Hz AMOLED display.",
    price: 69999,
    originalPrice: 79999,
    discount: 13,
    brand: "OnePlus",
    category: "Mobiles",
    stock: 70,
    ratings: 4.8,
    numOfReviews: 9340,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  {
    name: "OnePlus 13R",
    description: "Powerful gaming smartphone with Snapdragon chipset.",
    price: 42999,
    originalPrice: 47999,
    discount: 10,
    brand: "OnePlus",
    category: "Mobiles",
    stock: 95,
    ratings: 4.7,
    numOfReviews: 6530,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  {
    name: "OnePlus Nord CE4",
    description: "Fast charging smartphone with AMOLED display.",
    price: 24999,
    originalPrice: 28999,
    discount: 14,
    brand: "OnePlus",
    category: "Mobiles",
    stock: 120,
    ratings: 4.6,
    numOfReviews: 10420,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  },

  {
    name: "Google Pixel 9 Pro",
    description: "AI powered flagship phone with industry-leading camera.",
    price: 109999,
    originalPrice: 119999,
    discount: 8,
    brand: "Google",
    category: "Mobiles",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 4310,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Google Pixel 9",
    description: "Premium Android phone with Tensor processor.",
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    brand: "Google",
    category: "Mobiles",
    stock: 45,
    ratings: 4.8,
    numOfReviews: 3820,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Nothing Phone (3)",
    description: "Unique Glyph interface with flagship performance.",
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    brand: "Nothing",
    category: "Mobiles",
    stock: 65,
    ratings: 4.7,
    numOfReviews: 4870,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Nothing Phone (2a)",
    description: "Premium mid-range smartphone with Glyph lights.",
    price: 25999,
    originalPrice: 29999,
    discount: 13,
    brand: "Nothing",
    category: "Mobiles",
    stock: 110,
    ratings: 4.6,
    numOfReviews: 8420,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Xiaomi 15 Ultra",
    description: "Leica camera flagship with Snapdragon processor.",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    brand: "Xiaomi",
    category: "Mobiles",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 2310,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Xiaomi 14 Civi",
    description: "Slim premium smartphone with Leica cameras.",
    price: 42999,
    originalPrice: 47999,
    discount: 10,
    brand: "Xiaomi",
    category: "Mobiles",
    stock: 60,
    ratings: 4.7,
    numOfReviews: 3710,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Redmi Note 14 Pro+ 5G",
    description: "200MP camera smartphone with AMOLED display.",
    price: 31999,
    originalPrice: 35999,
    discount: 11,
    brand: "Redmi",
    category: "Mobiles",
    stock: 130,
    ratings: 4.6,
    numOfReviews: 9540,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Redmi Note 14 5G",
    description: "Affordable 5G smartphone with large battery.",
    price: 19999,
    originalPrice: 22999,
    discount: 13,
    brand: "Redmi",
    category: "Mobiles",
    stock: 160,
    ratings: 4.5,
    numOfReviews: 11340,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "POCO F7 Pro",
    description: "Performance-focused flagship killer smartphone.",
    price: 38999,
    originalPrice: 43999,
    discount: 11,
    brand: "POCO",
    category: "Mobiles",
    stock: 90,
    ratings: 4.7,
    numOfReviews: 6230,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "POCO X7 Pro",
    description: "Gaming smartphone with high refresh rate AMOLED display.",
    price: 28999,
    originalPrice: 32999,
    discount: 12,
    brand: "POCO",
    category: "Mobiles",
    stock: 120,
    ratings: 4.6,
    numOfReviews: 8510,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "POCO M7 Pro 5G",
    description: "Budget friendly smartphone with powerful processor.",
    price: 16999,
    originalPrice: 19999,
    discount: 15,
    brand: "POCO",
    category: "Mobiles",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 12560,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },
  /* =========================
     📱 MOBILE PHONES (21-40)
  ========================= */

  {
    name: "Vivo X200 Pro 5G",
    description: "Flagship smartphone with ZEISS cameras, AMOLED display and AI photography.",
    price: 94999,
    originalPrice: 104999,
    discount: 10,
    brand: "Vivo",
    category: "Mobiles",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 3820,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Vivo V50 5G",
    description: "Premium mid-range smartphone with curved AMOLED display.",
    price: 36999,
    originalPrice: 41999,
    discount: 12,
    brand: "Vivo",
    category: "Mobiles",
    stock: 80,
    ratings: 4.6,
    numOfReviews: 6120,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Vivo T4 5G",
    description: "Powerful smartphone with long battery life and fast charging.",
    price: 22999,
    originalPrice: 25999,
    discount: 12,
    brand: "Vivo",
    category: "Mobiles",
    stock: 120,
    ratings: 4.5,
    numOfReviews: 8350,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "OPPO Find X8 Pro",
    description: "Flagship smartphone with Hasselblad cameras and AI features.",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    brand: "OPPO",
    category: "Mobiles",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 2450,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "OPPO Reno13 Pro 5G",
    description: "Premium smartphone with AI camera and AMOLED display.",
    price: 49999,
    originalPrice: 55999,
    discount: 11,
    brand: "OPPO",
    category: "Mobiles",
    stock: 65,
    ratings: 4.7,
    numOfReviews: 4210,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "OPPO F29 Pro 5G",
    description: "Stylish smartphone with fast charging and AMOLED display.",
    price: 28999,
    originalPrice: 32999,
    discount: 12,
    brand: "OPPO",
    category: "Mobiles",
    stock: 90,
    ratings: 4.5,
    numOfReviews: 5830,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Realme GT 7 Pro",
    description: "Flagship performance smartphone powered by Snapdragon processor.",
    price: 59999,
    originalPrice: 66999,
    discount: 10,
    brand: "Realme",
    category: "Mobiles",
    stock: 55,
    ratings: 4.7,
    numOfReviews: 4120,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Realme 14 Pro+ 5G",
    description: "Premium camera smartphone with curved AMOLED display.",
    price: 34999,
    originalPrice: 38999,
    discount: 10,
    brand: "Realme",
    category: "Mobiles",
    stock: 95,
    ratings: 4.6,
    numOfReviews: 6920,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Realme Narzo 80 Pro",
    description: "Affordable gaming smartphone with high refresh rate display.",
    price: 20999,
    originalPrice: 23999,
    discount: 13,
    brand: "Realme",
    category: "Mobiles",
    stock: 130,
    ratings: 4.5,
    numOfReviews: 9340,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Motorola Edge 60 Pro",
    description: "Premium Android smartphone with pOLED display and AI camera.",
    price: 42999,
    originalPrice: 47999,
    discount: 10,
    brand: "Motorola",
    category: "Mobiles",
    stock: 75,
    ratings: 4.7,
    numOfReviews: 3820,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Motorola Edge 60 Fusion",
    description: "Curved display smartphone with clean Android experience.",
    price: 27999,
    originalPrice: 31999,
    discount: 13,
    brand: "Motorola",
    category: "Mobiles",
    stock: 110,
    ratings: 4.6,
    numOfReviews: 5520,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Moto G85 5G",
    description: "Budget 5G smartphone with AMOLED display.",
    price: 18999,
    originalPrice: 21999,
    discount: 14,
    brand: "Motorola",
    category: "Mobiles",
    stock: 145,
    ratings: 4.5,
    numOfReviews: 8230,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "iQOO 13",
    description: "Gaming flagship with Snapdragon chipset and 144Hz display.",
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    brand: "iQOO",
    category: "Mobiles",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 4310,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "iQOO Neo 10",
    description: "Performance smartphone built for gaming enthusiasts.",
    price: 35999,
    originalPrice: 39999,
    discount: 10,
    brand: "iQOO",
    category: "Mobiles",
    stock: 90,
    ratings: 4.7,
    numOfReviews: 5840,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "iQOO Z10 5G",
    description: "Affordable 5G smartphone with excellent battery backup.",
    price: 21999,
    originalPrice: 24999,
    discount: 12,
    brand: "iQOO",
    category: "Mobiles",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 9230,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Asus ROG Phone 9 Pro",
    description: "Ultimate gaming smartphone with advanced cooling system.",
    price: 94999,
    originalPrice: 104999,
    discount: 10,
    brand: "Asus",
    category: "Mobiles",
    stock: 22,
    ratings: 4.9,
    numOfReviews: 1850,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Asus Zenfone 11 Ultra",
    description: "Compact flagship smartphone with Snapdragon processor.",
    price: 79999,
    originalPrice: 87999,
    discount: 9,
    brand: "Asus",
    category: "Mobiles",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 1640,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Nokia G42 5G",
    description: "Reliable Android smartphone with clean software experience.",
    price: 14999,
    originalPrice: 17999,
    discount: 17,
    brand: "Nokia",
    category: "Mobiles",
    stock: 170,
    ratings: 4.4,
    numOfReviews: 7360,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Honor 200 Pro",
    description: "Premium smartphone with AI portrait camera system.",
    price: 49999,
    originalPrice: 54999,
    discount: 9,
    brand: "Honor",
    category: "Mobiles",
    stock: 65,
    ratings: 4.7,
    numOfReviews: 3240,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Honor X9c 5G",
    description: "Durable smartphone with long battery life and AMOLED display.",
    price: 26999,
    originalPrice: 29999,
    discount: 10,
    brand: "Honor",
    category: "Mobiles",
    stock: 95,
    ratings: 4.6,
    numOfReviews: 4180,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  /* =========================
     📱 MOBILE PHONES (41-50)
  ========================= */

  {
    name: "Infinix Note 50 Pro+ 5G",
    description: "Premium smartphone with AMOLED display, fast charging and AI camera features.",
    price: 31999,
    originalPrice: 35999,
    discount: 11,
    brand: "Infinix",
    category: "Mobiles",
    stock: 110,
    ratings: 4.5,
    numOfReviews: 5240,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Infinix GT 30 Pro",
    description: "Gaming smartphone with high refresh rate AMOLED display and powerful processor.",
    price: 26999,
    originalPrice: 30999,
    discount: 13,
    brand: "Infinix",
    category: "Mobiles",
    stock: 130,
    ratings: 4.6,
    numOfReviews: 6120,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Tecno Camon 40 Premier 5G",
    description: "Camera-centric smartphone with premium AMOLED display and AI photography.",
    price: 32999,
    originalPrice: 36999,
    discount: 11,
    brand: "Tecno",
    category: "Mobiles",
    stock: 90,
    ratings: 4.5,
    numOfReviews: 4820,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Tecno Pova 7 Pro 5G",
    description: "Gaming smartphone with massive battery and fast charging support.",
    price: 22999,
    originalPrice: 25999,
    discount: 12,
    brand: "Tecno",
    category: "Mobiles",
    stock: 150,
    ratings: 4.4,
    numOfReviews: 7240,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "CMF Phone 1",
    description: "Modular smartphone by Nothing with AMOLED display and clean Nothing OS.",
    price: 16999,
    originalPrice: 19999,
    discount: 15,
    brand: "CMF",
    category: "Mobiles",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 9340,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Samsung Galaxy M56 5G",
    description: "Large battery smartphone with Super AMOLED display and 50MP triple camera.",
    price: 27999,
    originalPrice: 31999,
    discount: 13,
    brand: "Samsung",
    category: "Mobiles",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 8560,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Redmi 14C 5G",
    description: "Affordable 5G smartphone with large display and long-lasting battery.",
    price: 10999,
    originalPrice: 12999,
    discount: 15,
    brand: "Redmi",
    category: "Mobiles",
    stock: 220,
    ratings: 4.4,
    numOfReviews: 14520,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Realme C75 5G",
    description: "Budget-friendly smartphone with smooth display and 6000mAh battery.",
    price: 11999,
    originalPrice: 13999,
    discount: 14,
    brand: "Realme",
    category: "Mobiles",
    stock: 210,
    ratings: 4.4,
    numOfReviews: 11340,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "Motorola Moto G45 5G",
    description: "Value-for-money smartphone with clean Android experience and stereo speakers.",
    price: 14999,
    originalPrice: 17999,
    discount: 17,
    brand: "Motorola",
    category: "Mobiles",
    stock: 165,
    ratings: 4.5,
    numOfReviews: 9720,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  {
    name: "POCO C75 5G",
    description: "Entry-level 5G smartphone with large battery, HD+ display and fast performance.",
    price: 9999,
    originalPrice: 11999,
    discount: 17,
    brand: "POCO",
    category: "Mobiles",
    stock: 250,
    ratings: 4.4,
    numOfReviews: 16380,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800"
  },

  // ==============================
  // 🍎 APPLE iPHONE COLLECTION
  // ==============================

  {
    name: "Apple iPhone (2007)",
    description: "The first generation iPhone with a 3.5-inch display and revolutionary multi-touch experience.",
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    brand: "Apple",
    category: "Mobiles",
    stock: 8,
    ratings: 4.3,
    numOfReviews: 210,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 3G",
    description: "Introduced 3G connectivity and App Store support.",
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    brand: "Apple",
    category: "Mobiles",
    stock: 10,
    ratings: 4.4,
    numOfReviews: 260,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 3GS",
    description: "Faster performance with improved camera and voice control.",
    price: 10999,
    originalPrice: 13999,
    discount: 21,
    brand: "Apple",
    category: "Mobiles",
    stock: 10,
    ratings: 4.4,
    numOfReviews: 310,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 4",
    description: "Retina Display with premium glass design.",
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    brand: "Apple",
    category: "Mobiles",
    stock: 12,
    ratings: 4.5,
    numOfReviews: 540,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 4s",
    description: "Powered by A5 chip and introduced Siri.",
    price: 13999,
    originalPrice: 16999,
    discount: 18,
    brand: "Apple",
    category: "Mobiles",
    stock: 15,
    ratings: 4.5,
    numOfReviews: 690,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 5",
    description: "4-inch Retina Display with Lightning connector.",
    price: 14999,
    originalPrice: 17999,
    discount: 17,
    brand: "Apple",
    category: "Mobiles",
    stock: 18,
    ratings: 4.5,
    numOfReviews: 920,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 5c",
    description: "Colorful polycarbonate design with A6 chip.",
    price: 13999,
    originalPrice: 16999,
    discount: 18,
    brand: "Apple",
    category: "Mobiles",
    stock: 20,
    ratings: 4.4,
    numOfReviews: 820,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 5s",
    description: "First iPhone with Touch ID fingerprint sensor.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    brand: "Apple",
    category: "Mobiles",
    stock: 22,
    ratings: 4.6,
    numOfReviews: 1800,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 6",
    description: "4.7-inch Retina HD display with A8 chip.",
    price: 17999,
    originalPrice: 21999,
    discount: 18,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.6,
    numOfReviews: 2500,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 6 Plus",
    description: "5.5-inch Retina HD display with Optical Image Stabilization.",
    price: 19999,
    originalPrice: 23999,
    discount: 17,
    brand: "Apple",
    category: "Mobiles",
    stock: 25,
    ratings: 4.6,
    numOfReviews: 2300,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 6s",
    description: "3D Touch technology with A9 chip.",
    price: 22999,
    originalPrice: 26999,
    discount: 15,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.7,
    numOfReviews: 3500,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 6s Plus",
    description: "Large display with 3D Touch and 12MP camera.",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    brand: "Apple",
    category: "Mobiles",
    stock: 25,
    ratings: 4.7,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone SE (1st Gen)",
    description: "Compact 4-inch iPhone with A9 chip.",
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    brand: "Apple",
    category: "Mobiles",
    stock: 25,
    ratings: 4.7,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 7",
    description: "Water resistant design with A10 Fusion chip.",
    price: 26999,
    originalPrice: 31999,
    discount: 16,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.7,
    numOfReviews: 5600,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 7 Plus",
    description: "Dual-camera system with Portrait Mode.",
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 32,
    ratings: 4.8,
    numOfReviews: 6400,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 8",
    description: "Glass back with wireless charging support.",
    price: 32999,
    originalPrice: 37999,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 7200,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 8 Plus",
    description: "5.5-inch Retina HD display with A11 Bionic chip.",
    price: 35999,
    originalPrice: 41999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 7600,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone X",
    description: "Bezel-less OLED display with Face ID.",
    price: 39999,
    originalPrice: 45999,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 9200,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone XR",
    description: "Liquid Retina display powered by A12 Bionic chip.",
    price: 42999,
    originalPrice: 49999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 45,
    ratings: 4.8,
    numOfReviews: 12500,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone XS",
    description: "Super Retina OLED display with dual cameras.",
    price: 48999,
    originalPrice: 55999,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.8,
    numOfReviews: 8900,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone XS Max",
    description: "6.5-inch Super Retina display with A12 Bionic.",
    price: 53999,
    originalPrice: 60999,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 9800,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },
  // ==============================
  // 🍎 APPLE iPHONE COLLECTION
  // PART - 2
  // ==============================

  {
    name: "Apple iPhone 11",
    description: "Dual 12MP camera system with Night Mode and A13 Bionic chip.",
    price: 44999,
    originalPrice: 52999,
    discount: 15,
    brand: "Apple",
    category: "Mobiles",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 24500,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 11 Pro",
    description: "Triple-camera system with Super Retina XDR OLED display.",
    price: 59999,
    originalPrice: 69999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 18400,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 11 Pro Max",
    description: "6.5-inch Super Retina XDR display with A13 Bionic.",
    price: 67999,
    originalPrice: 77999,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 17600,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone SE (2nd Gen)",
    description: "Compact iPhone powered by the A13 Bionic chip.",
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 45,
    ratings: 4.7,
    numOfReviews: 8200,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 12 Mini",
    description: "Compact 5.4-inch Super Retina XDR display with A14 Bionic.",
    price: 42999,
    originalPrice: 49999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.8,
    numOfReviews: 9300,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 12",
    description: "6.1-inch OLED display with A14 Bionic chip and MagSafe.",
    price: 49999,
    originalPrice: 57999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 65,
    ratings: 4.8,
    numOfReviews: 26800,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 12 Pro",
    description: "Triple-camera system with LiDAR Scanner.",
    price: 68999,
    originalPrice: 79999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 12400,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 12 Pro Max",
    description: "Largest display with advanced Pro camera system.",
    price: 76999,
    originalPrice: 89999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 11900,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 13 Mini",
    description: "Compact flagship with A15 Bionic chip.",
    price: 52999,
    originalPrice: 59999,
    discount: 12,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 7800,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 13",
    description: "Advanced dual-camera system with A15 Bionic.",
    price: 59999,
    originalPrice: 69999,
    discount: 14,
    brand: "Apple",
    category: "Mobiles",
    stock: 70,
    ratings: 4.9,
    numOfReviews: 32400,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 13 Pro",
    description: "ProMotion 120Hz display with Pro camera system.",
    price: 78999,
    originalPrice: 89999,
    discount: 12,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 15300,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 13 Pro Max",
    description: "Flagship iPhone with A15 Bionic and ProMotion display.",
    price: 87999,
    originalPrice: 99999,
    discount: 12,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 14800,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone SE (3rd Gen)",
    description: "A15 Bionic powered compact iPhone with 5G support.",
    price: 42999,
    originalPrice: 47999,
    discount: 10,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.7,
    numOfReviews: 6200,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 14",
    description: "A15 Bionic chip with Emergency SOS via satellite.",
    price: 69999,
    originalPrice: 79999,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 65,
    ratings: 4.9,
    numOfReviews: 21300,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 14 Plus",
    description: "Large 6.7-inch display with excellent battery life.",
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 45,
    ratings: 4.8,
    numOfReviews: 9300,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 14 Pro",
    description: "Dynamic Island with A16 Bionic and Always-On Display.",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 13500,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 14 Pro Max",
    description: "Premium flagship with Dynamic Island and 48MP camera.",
    price: 114999,
    originalPrice: 124999,
    discount: 8,
    brand: "Apple",
    category: "Mobiles",
    stock: 30,
    ratings: 4.9,
    numOfReviews: 14700,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },
  // ==============================
  // 🍎 APPLE iPHONE COLLECTION
  // PART - 3 (Latest Models)
  // ==============================

  {
    name: "Apple iPhone 15",
    description: "A16 Bionic chip, Dynamic Island, USB-C, and 48MP main camera.",
    price: 69900,
    originalPrice: 79900,
    discount: 13,
    brand: "Apple",
    category: "Mobiles",
    stock: 80,
    ratings: 4.8,
    numOfReviews: 28600,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 15 Plus",
    description: "6.7-inch Super Retina XDR display with A16 Bionic chip.",
    price: 79900,
    originalPrice: 89900,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 14250,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 15 Pro",
    description: "Titanium design with A17 Pro chip and Pro camera system.",
    price: 119900,
    originalPrice: 129900,
    discount: 8,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.9,
    numOfReviews: 18600,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 15 Pro Max",
    description: "Flagship titanium iPhone with A17 Pro and 5x Telephoto camera.",
    price: 144900,
    originalPrice: 159900,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 35,
    ratings: 4.9,
    numOfReviews: 21200,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  },

  {
    name: "Apple iPhone 16e",
    description: "Affordable iPhone powered by A18 chip with Apple Intelligence support.",
    price: 59900,
    originalPrice: 64900,
    discount: 8,
    brand: "Apple",
    category: "Mobiles",
    stock: 70,
    ratings: 4.8,
    numOfReviews: 4200,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 16",
    description: "A18 chip, Apple Intelligence, Camera Control button and 48MP Fusion camera.",
    price: 79900,
    originalPrice: 89900,
    discount: 11,
    brand: "Apple",
    category: "Mobiles",
    stock: 90,
    ratings: 4.9,
    numOfReviews: 14520,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 16 Plus",
    description: "Large 6.7-inch OLED display with A18 chip and all-day battery.",
    price: 89900,
    originalPrice: 99900,
    discount: 10,
    brand: "Apple",
    category: "Mobiles",
    stock: 65,
    ratings: 4.9,
    numOfReviews: 8120,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 16 Pro",
    description: "A18 Pro chip, titanium body, Camera Control and 48MP Pro camera.",
    price: 119900,
    originalPrice: 129900,
    discount: 8,
    brand: "Apple",
    category: "Mobiles",
    stock: 45,
    ratings: 4.9,
    numOfReviews: 12450,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 16 Pro Max",
    description: "6.9-inch Super Retina XDR display with A18 Pro chip and premium camera system.",
    price: 144900,
    originalPrice: 159900,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 40,
    ratings: 4.9,
    numOfReviews: 18250,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 17",
    description: "Next-generation iPhone with Apple Intelligence, A19 chip and advanced dual cameras.",
    price: 89900,
    originalPrice: 99900,
    discount: 10,
    brand: "Apple",
    category: "Mobiles",
    stock: 100,
    ratings: 5.0,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 17 Air",
    description: "Ultra-thin premium iPhone with lightweight titanium design and A19 chip.",
    price: 99900,
    originalPrice: 109900,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 60,
    ratings: 5.0,
    numOfReviews: 2100,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 17 Pro",
    description: "Professional flagship featuring A19 Pro chip, ProMotion display and triple-camera setup.",
    price: 129900,
    originalPrice: 139900,
    discount: 7,
    brand: "Apple",
    category: "Mobiles",
    stock: 50,
    ratings: 5.0,
    numOfReviews: 1800,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },

  {
    name: "Apple iPhone 17 Pro Max",
    description: "Ultimate flagship with A19 Pro chip, advanced periscope camera and premium titanium build.",
    price: 154900,
    originalPrice: 169900,
    discount: 9,
    brand: "Apple",
    category: "Mobiles",
    stock: 45,
    ratings: 5.0,
    numOfReviews: 1600,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
  },


  /* =========================
     🍳 KITCHEN
  ========================= */

  {
    name: "Prestige Non Stick Cookware Set",
    description: "Premium non stick cookware combo with frying pan and kadai.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Prestige",
    category: "Home",
    stock: 80,
    ratings: 4.5,
    numOfReviews: 6200,
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
  },

  {
    name: "Milton Thermosteel Bottle",
    description: "Hot and cold stainless steel water bottle.",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    brand: "Milton",
    category: "Home",
    stock: 150,
    ratings: 4.6,
    numOfReviews: 8000,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"
  },

  {
    name: "Borosil Glass Dinner Set",
    description: "Premium microwave safe dinner set for family.",
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    brand: "Borosil",
    category: "Home",
    stock: 60,
    ratings: 4.5,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800"
  },

  /* =========================
   👕 MEN'S FASHION (1-20)
========================= */

  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit stretch denim jeans with premium comfort.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    brand: "Levi's",
    category: "Fashion",
    stock: 120,
    ratings: 4.7,
    numOfReviews: 18450,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Levi's Men's Graphic Crew T-Shirt",
    description: "Soft cotton crew neck t-shirt with signature Levi's logo.",
    price: 999,
    originalPrice: 1699,
    discount: 41,
    brand: "Levi's",
    category: "Fashion",
    stock: 180,
    ratings: 4.6,
    numOfReviews: 12340,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Allen Solly Solid Formal Shirt",
    description: "Premium cotton formal shirt suitable for office wear.",
    price: 1699,
    originalPrice: 2999,
    discount: 43,
    brand: "Allen Solly",
    category: "Fashion",
    stock: 95,
    ratings: 4.5,
    numOfReviews: 9240,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "Allen Solly Polo T-Shirt",
    description: "Cotton polo t-shirt with smart casual styling.",
    price: 1399,
    originalPrice: 2299,
    discount: 39,
    brand: "Allen Solly",
    category: "Fashion",
    stock: 110,
    ratings: 4.5,
    numOfReviews: 6830,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800"
  },

  {
    name: "Louis Philippe Formal Trouser",
    description: "Slim fit formal trousers crafted from premium fabric.",
    price: 2299,
    originalPrice: 3499,
    discount: 34,
    brand: "Louis Philippe",
    category: "Fashion",
    stock: 85,
    ratings: 4.6,
    numOfReviews: 5420,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"
  },

  {
    name: "Louis Philippe Formal Blazer",
    description: "Premium single-breasted blazer for business occasions.",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    brand: "Louis Philippe",
    category: "Fashion",
    stock: 40,
    ratings: 4.7,
    numOfReviews: 2140,
    imageUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800"
  },

  {
    name: "Peter England Checked Shirt",
    description: "Comfortable checked shirt for office and casual wear.",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    brand: "Peter England",
    category: "Fashion",
    stock: 130,
    ratings: 4.5,
    numOfReviews: 7640,
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800"
  },

  {
    name: "Peter England Chinos",
    description: "Regular fit cotton chinos for smart casual look.",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    brand: "Peter England",
    category: "Fashion",
    stock: 95,
    ratings: 4.4,
    numOfReviews: 4520,
    imageUrl: "https://images.unsplash.com/photo-1506629905607-d9d5b6cf4d61?w=800"
  },

  {
    name: "Van Heusen Slim Fit Shirt",
    description: "Elegant slim fit shirt made from breathable cotton fabric.",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    brand: "Van Heusen",
    category: "Fashion",
    stock: 90,
    ratings: 4.6,
    numOfReviews: 5830,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"
  },

  {
    name: "Van Heusen Formal Trousers",
    description: "Professional slim fit formal trousers.",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    brand: "Van Heusen",
    category: "Fashion",
    stock: 80,
    ratings: 4.6,
    numOfReviews: 4380,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
  },

  {
    name: "U.S. Polo Assn. Polo T-Shirt",
    description: "Classic cotton polo t-shirt with embroidered logo.",
    price: 1599,
    originalPrice: 2699,
    discount: 41,
    brand: "U.S. Polo Assn.",
    category: "Fashion",
    stock: 150,
    ratings: 4.7,
    numOfReviews: 11240,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "U.S. Polo Assn. Casual Shirt",
    description: "Premium cotton casual shirt for everyday comfort.",
    price: 1899,
    originalPrice: 3299,
    discount: 42,
    brand: "U.S. Polo Assn.",
    category: "Fashion",
    stock: 105,
    ratings: 4.6,
    numOfReviews: 6430,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "Jack & Jones Printed T-Shirt",
    description: "Trendy regular fit printed cotton t-shirt.",
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    brand: "Jack & Jones",
    category: "Fashion",
    stock: 165,
    ratings: 4.5,
    numOfReviews: 8320,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Jack & Jones Slim Jeans",
    description: "Stretchable slim fit blue denim jeans.",
    price: 2599,
    originalPrice: 3999,
    discount: 35,
    brand: "Jack & Jones",
    category: "Fashion",
    stock: 110,
    ratings: 4.6,
    numOfReviews: 5320,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Tommy Hilfiger Polo T-Shirt",
    description: "Premium branded polo t-shirt made with soft cotton.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Tommy Hilfiger",
    category: "Fashion",
    stock: 70,
    ratings: 4.8,
    numOfReviews: 6850,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800"
  },

  {
    name: "Tommy Hilfiger Casual Shirt",
    description: "Classic fit premium cotton casual shirt.",
    price: 3499,
    originalPrice: 5499,
    discount: 36,
    brand: "Tommy Hilfiger",
    category: "Fashion",
    stock: 60,
    ratings: 4.7,
    numOfReviews: 3920,
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800"
  },

  {
    name: "Pepe Jeans Slim Fit Jeans",
    description: "Premium washed denim jeans with stretch comfort.",
    price: 2699,
    originalPrice: 4299,
    discount: 37,
    brand: "Pepe Jeans",
    category: "Fashion",
    stock: 100,
    ratings: 4.6,
    numOfReviews: 5840,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Flying Machine Denim Jacket",
    description: "Classic blue denim jacket for casual styling.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Flying Machine",
    category: "Fashion",
    stock: 65,
    ratings: 4.7,
    numOfReviews: 3260,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
  },

  {
    name: "Spykar Regular Fit Jeans",
    description: "Stylish regular fit stretch denim jeans.",
    price: 2399,
    originalPrice: 3799,
    discount: 37,
    brand: "Spykar",
    category: "Fashion",
    stock: 90,
    ratings: 4.5,
    numOfReviews: 4620,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Raymond Formal Shirt",
    description: "Premium business formal shirt with wrinkle-resistant fabric.",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    brand: "Raymond",
    category: "Fashion",
    stock: 75,
    ratings: 4.7,
    numOfReviews: 5180,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"
  },

  /* =========================
     👕 MEN'S FASHION (21-40)
  ========================= */

  {
    name: "Nike Sportswear Club T-Shirt",
    description: "Soft cotton crew neck t-shirt for everyday comfort.",
    price: 1495,
    originalPrice: 2495,
    discount: 40,
    brand: "Nike",
    category: "Fashion",
    stock: 180,
    ratings: 4.8,
    numOfReviews: 15420,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Nike Dri-FIT Training Shorts",
    description: "Moisture-wicking shorts designed for gym and running.",
    price: 1895,
    originalPrice: 2995,
    discount: 37,
    brand: "Nike",
    category: "Fashion",
    stock: 120,
    ratings: 4.7,
    numOfReviews: 8210,
    imageUrl: "https://images.unsplash.com/photo-1506629905607-d9d5b6cf4d61?w=800"
  },

  {
    name: "Adidas Essentials Hoodie",
    description: "Warm fleece hoodie with classic Adidas branding.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Adidas",
    category: "Fashion",
    stock: 90,
    ratings: 4.8,
    numOfReviews: 9320,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },

  {
    name: "Adidas Entrada Track Pants",
    description: "Comfortable athletic track pants with slim fit.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    brand: "Adidas",
    category: "Fashion",
    stock: 100,
    ratings: 4.7,
    numOfReviews: 7420,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
  },

  {
    name: "Puma Essential Logo T-Shirt",
    description: "Premium cotton t-shirt with Puma logo print.",
    price: 1299,
    originalPrice: 2299,
    discount: 43,
    brand: "Puma",
    category: "Fashion",
    stock: 170,
    ratings: 4.6,
    numOfReviews: 11320,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Puma Active Track Jacket",
    description: "Lightweight training jacket with zip closure.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    brand: "Puma",
    category: "Fashion",
    stock: 75,
    ratings: 4.7,
    numOfReviews: 5210,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
  },

  {
    name: "Woodland Leather Jacket",
    description: "Premium genuine leather jacket for winter wear.",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    brand: "Woodland",
    category: "Fashion",
    stock: 45,
    ratings: 4.8,
    numOfReviews: 3120,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
  },

  {
    name: "Woodland Cargo Pants",
    description: "Durable outdoor cargo trousers with multiple pockets.",
    price: 2799,
    originalPrice: 4499,
    discount: 38,
    brand: "Woodland",
    category: "Fashion",
    stock: 85,
    ratings: 4.6,
    numOfReviews: 4280,
    imageUrl: "https://images.unsplash.com/photo-1506629905607-d9d5b6cf4d61?w=800"
  },

  {
    name: "Red Tape Slim Fit Shirt",
    description: "Modern slim fit casual shirt with premium cotton fabric.",
    price: 1499,
    originalPrice: 2599,
    discount: 42,
    brand: "Red Tape",
    category: "Fashion",
    stock: 120,
    ratings: 4.5,
    numOfReviews: 5340,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "Red Tape Denim Jeans",
    description: "Stretchable slim fit blue denim jeans.",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    brand: "Red Tape",
    category: "Fashion",
    stock: 100,
    ratings: 4.5,
    numOfReviews: 4920,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Campus Active Joggers",
    description: "Comfortable joggers for gym and casual wear.",
    price: 1599,
    originalPrice: 2699,
    discount: 41,
    brand: "Campus",
    category: "Fashion",
    stock: 150,
    ratings: 4.5,
    numOfReviews: 6320,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
  },

  {
    name: "H&M Regular Fit Sweatshirt",
    description: "Soft fleece sweatshirt with modern fit.",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    brand: "H&M",
    category: "Fashion",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 8540,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },

  {
    name: "H&M Linen Blend Shirt",
    description: "Lightweight linen shirt for summer styling.",
    price: 1799,
    originalPrice: 2799,
    discount: 36,
    brand: "H&M",
    category: "Fashion",
    stock: 110,
    ratings: 4.5,
    numOfReviews: 4830,
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800"
  },

  {
    name: "Wrogn Printed Oversized T-Shirt",
    description: "Oversized cotton t-shirt with premium graphic print.",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    brand: "Wrogn",
    category: "Fashion",
    stock: 180,
    ratings: 4.6,
    numOfReviews: 7940,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Rare Rabbit Premium Shirt",
    description: "Luxury casual shirt with tailored fit.",
    price: 2899,
    originalPrice: 4299,
    discount: 33,
    brand: "Rare Rabbit",
    category: "Fashion",
    stock: 65,
    ratings: 4.7,
    numOfReviews: 2850,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "Celio Polo T-Shirt",
    description: "Classic polo t-shirt made with premium cotton.",
    price: 1699,
    originalPrice: 2799,
    discount: 39,
    brand: "Celio",
    category: "Fashion",
    stock: 100,
    ratings: 4.6,
    numOfReviews: 4130,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800"
  },

  {
    name: "Being Human Graphic T-Shirt",
    description: "Soft cotton graphic t-shirt with premium finish.",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    brand: "Being Human",
    category: "Fashion",
    stock: 150,
    ratings: 4.6,
    numOfReviews: 6450,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Mufti Slim Fit Chinos",
    description: "Premium stretch chinos for smart casual occasions.",
    price: 2399,
    originalPrice: 3799,
    discount: 37,
    brand: "Mufti",
    category: "Fashion",
    stock: 95,
    ratings: 4.5,
    numOfReviews: 3910,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"
  },

  {
    name: "Arrow Formal Shirt",
    description: "Wrinkle-resistant business formal shirt.",
    price: 1999,
    originalPrice: 3299,
    discount: 39,
    brand: "Arrow",
    category: "Fashion",
    stock: 90,
    ratings: 4.7,
    numOfReviews: 5240,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"
  },

  {
    name: "Blackberrys Formal Blazer",
    description: "Premium tailored blazer for office and formal occasions.",
    price: 7499,
    originalPrice: 10999,
    discount: 32,
    brand: "Blackberrys",
    category: "Fashion",
    stock: 40,
    ratings: 4.8,
    numOfReviews: 2180,
    imageUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800"
  },

  /* =========================
     👕 MEN'S FASHION (41-50)
  ========================= */

  {
    name: "United Colors of Benetton Crew Neck T-Shirt",
    description: "Premium cotton crew neck t-shirt with soft fabric and everyday comfort.",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    brand: "United Colors of Benetton",
    category: "Fashion",
    stock: 170,
    ratings: 4.6,
    numOfReviews: 6920,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "Wrangler Texas Stretch Jeans",
    description: "Regular fit stretch denim jeans with classic five-pocket styling.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    brand: "Wrangler",
    category: "Fashion",
    stock: 120,
    ratings: 4.7,
    numOfReviews: 8450,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Lee Cooper Slim Fit Jeans",
    description: "Modern slim fit denim jeans crafted from stretch cotton fabric.",
    price: 2299,
    originalPrice: 3699,
    discount: 38,
    brand: "Lee Cooper",
    category: "Fashion",
    stock: 110,
    ratings: 4.6,
    numOfReviews: 5640,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Calvin Klein Logo Crew T-Shirt",
    description: "Premium branded cotton t-shirt with iconic Calvin Klein logo.",
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    brand: "Calvin Klein",
    category: "Fashion",
    stock: 90,
    ratings: 4.8,
    numOfReviews: 7350,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },

  {
    name: "U.S. Polo Assn. Denim Co. Slim Jeans",
    description: "Premium slim fit denim jeans for casual everyday wear.",
    price: 2799,
    originalPrice: 4299,
    discount: 35,
    brand: "U.S. Polo Assn.",
    category: "Fashion",
    stock: 105,
    ratings: 4.7,
    numOfReviews: 4830,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c38355331?w=800"
  },

  {
    name: "Superdry Vintage Logo Hoodie",
    description: "Premium fleece hoodie with signature Superdry branding.",
    price: 4999,
    originalPrice: 7499,
    discount: 33,
    brand: "Superdry",
    category: "Fashion",
    stock: 65,
    ratings: 4.8,
    numOfReviews: 3240,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },

  {
    name: "GAP Everyday Cotton Sweatshirt",
    description: "Comfortable regular fit sweatshirt made with soft fleece fabric.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    brand: "GAP",
    category: "Fashion",
    stock: 95,
    ratings: 4.6,
    numOfReviews: 4120,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },

  {
    name: "Marks & Spencer Pure Cotton Polo",
    description: "Premium polo t-shirt with breathable cotton fabric.",
    price: 2299,
    originalPrice: 3599,
    discount: 36,
    brand: "Marks & Spencer",
    category: "Fashion",
    stock: 85,
    ratings: 4.7,
    numOfReviews: 3520,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800"
  },

  {
    name: "Nautica Classic Oxford Shirt",
    description: "Classic Oxford shirt with regular fit and premium cotton fabric.",
    price: 3199,
    originalPrice: 4999,
    discount: 36,
    brand: "Nautica",
    category: "Fashion",
    stock: 75,
    ratings: 4.7,
    numOfReviews: 2980,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
  },

  {
    name: "Tommy Jeans Regular Fit Hoodie",
    description: "Premium cotton hoodie with embroidered Tommy Jeans logo.",
    price: 4499,
    originalPrice: 6999,
    discount: 36,
    brand: "Tommy Jeans",
    category: "Fashion",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 2750,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
  },

  /* =========================
     👗 WOMEN'S FASHION (1-20)
  ========================= */

  {
    name: "BIBA Printed Cotton Kurta",
    description: "Elegant printed cotton kurta with straight fit for daily and festive wear.",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    brand: "BIBA",
    category: "Fashion",
    stock: 120,
    ratings: 4.6,
    numOfReviews: 14320,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "BIBA Anarkali Kurta Set",
    description: "Premium Anarkali kurta with matching dupatta and pants.",
    price: 2999,
    originalPrice: 5499,
    discount: 45,
    brand: "BIBA",
    category: "Fashion",
    stock: 80,
    ratings: 4.7,
    numOfReviews: 6250,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "Aurelia Straight Kurta",
    description: "Comfortable rayon straight kurta with elegant ethnic prints.",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    brand: "Aurelia",
    category: "Fashion",
    stock: 130,
    ratings: 4.5,
    numOfReviews: 9340,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800"
  },

  {
    name: "Aurelia Embroidered Kurta Set",
    description: "Premium embroidered ethnic kurta set with dupatta.",
    price: 2599,
    originalPrice: 4499,
    discount: 42,
    brand: "Aurelia",
    category: "Fashion",
    stock: 75,
    ratings: 4.6,
    numOfReviews: 5180,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800"
  },

  {
    name: "W Floral Printed Kurta",
    description: "Elegant floral printed kurta with premium cotton fabric.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    brand: "W",
    category: "Fashion",
    stock: 90,
    ratings: 4.7,
    numOfReviews: 7320,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "W Embroidered Kurta Set",
    description: "Festive embroidered kurta set with matching dupatta.",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    brand: "W",
    category: "Fashion",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 4250,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "Libas Cotton Kurta Set",
    description: "Soft cotton kurta with matching pants and dupatta.",
    price: 1799,
    originalPrice: 3299,
    discount: 45,
    brand: "Libas",
    category: "Fashion",
    stock: 110,
    ratings: 4.6,
    numOfReviews: 8640,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "Libas Anarkali Suit Set",
    description: "Elegant Anarkali suit with embroidered detailing.",
    price: 2999,
    originalPrice: 5499,
    discount: 45,
    brand: "Libas",
    category: "Fashion",
    stock: 70,
    ratings: 4.7,
    numOfReviews: 4920,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "Global Desi Printed Maxi Dress",
    description: "Boho-style printed maxi dress for casual outings.",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    brand: "Global Desi",
    category: "Fashion",
    stock: 80,
    ratings: 4.6,
    numOfReviews: 3520,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "Global Desi Ethnic Kurta",
    description: "Premium rayon kurta with vibrant ethnic patterns.",
    price: 1899,
    originalPrice: 3399,
    discount: 44,
    brand: "Global Desi",
    category: "Fashion",
    stock: 85,
    ratings: 4.5,
    numOfReviews: 2860,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },

  {
    name: "ONLY Slim Fit Jeans",
    description: "Stretchable slim fit denim jeans for everyday styling.",
    price: 2299,
    originalPrice: 3999,
    discount: 43,
    brand: "ONLY",
    category: "Fashion",
    stock: 120,
    ratings: 4.6,
    numOfReviews: 9850,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },

  {
    name: "ONLY Solid Crop Top",
    description: "Trendy cotton crop top with regular fit.",
    price: 999,
    originalPrice: 1799,
    discount: 44,
    brand: "ONLY",
    category: "Fashion",
    stock: 170,
    ratings: 4.5,
    numOfReviews: 7120,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "VERO MODA Floral Dress",
    description: "Elegant floral midi dress with flattering silhouette.",
    price: 2699,
    originalPrice: 4499,
    discount: 40,
    brand: "VERO MODA",
    category: "Fashion",
    stock: 90,
    ratings: 4.7,
    numOfReviews: 6530,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "VERO MODA Casual Top",
    description: "Lightweight casual top for office and daily wear.",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    brand: "VERO MODA",
    category: "Fashion",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 5940,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "Tokyo Talkies Bodycon Dress",
    description: "Stylish bodycon dress perfect for parties and evening outings.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    brand: "Tokyo Talkies",
    category: "Fashion",
    stock: 110,
    ratings: 4.5,
    numOfReviews: 8430,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "Tokyo Talkies Oversized Shirt",
    description: "Fashionable oversized shirt with modern fit.",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    brand: "Tokyo Talkies",
    category: "Fashion",
    stock: 150,
    ratings: 4.5,
    numOfReviews: 6140,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "AND Floral Midi Dress",
    description: "Premium floral midi dress with elegant design.",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    brand: "AND",
    category: "Fashion",
    stock: 70,
    ratings: 4.7,
    numOfReviews: 3720,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "AND Formal Women's Shirt",
    description: "Premium office wear shirt crafted from soft fabric.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    brand: "AND",
    category: "Fashion",
    stock: 100,
    ratings: 4.6,
    numOfReviews: 3140,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "H&M Women's Wide Leg Jeans",
    description: "Comfortable high-waist wide leg denim jeans.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    brand: "H&M",
    category: "Fashion",
    stock: 115,
    ratings: 4.6,
    numOfReviews: 7840,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },

  {
    name: "H&M Ribbed Cotton Top",
    description: "Soft ribbed cotton top suitable for casual styling.",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    brand: "H&M",
    category: "Fashion",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 11260,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  /* =========================
     👗 WOMEN'S FASHION (21-40)
  ========================= */

  {
    name: "Allen Solly Woman Floral Top",
    description: "Elegant floral printed top crafted from soft breathable fabric.",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    brand: "Allen Solly Woman",
    category: "Fashion",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 6480,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "Allen Solly Woman Slim Fit Trousers",
    description: "Premium office wear trousers with comfortable stretch fabric.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    brand: "Allen Solly Woman",
    category: "Fashion",
    stock: 90,
    ratings: 4.6,
    numOfReviews: 4820,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },

  {
    name: "Chemistry Linen Blend Shirt",
    description: "Classic office wear shirt with premium linen blend fabric.",
    price: 1699,
    originalPrice: 2899,
    discount: 41,
    brand: "Chemistry",
    category: "Fashion",
    stock: 100,
    ratings: 4.5,
    numOfReviews: 3640,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "Chemistry Straight Fit Pants",
    description: "Comfortable formal trousers suitable for office and business meetings.",
    price: 1899,
    originalPrice: 3199,
    discount: 41,
    brand: "Chemistry",
    category: "Fashion",
    stock: 95,
    ratings: 4.5,
    numOfReviews: 2950,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },

  {
    name: "DressBerry Floral Maxi Dress",
    description: "Stylish floral maxi dress perfect for vacations and casual outings.",
    price: 2199,
    originalPrice: 3799,
    discount: 42,
    brand: "DressBerry",
    category: "Fashion",
    stock: 120,
    ratings: 4.6,
    numOfReviews: 7250,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "DressBerry Puff Sleeve Top",
    description: "Fashionable puff sleeve top with premium soft fabric.",
    price: 999,
    originalPrice: 1799,
    discount: 44,
    brand: "DressBerry",
    category: "Fashion",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 8360,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "Zink London Bodycon Dress",
    description: "Premium bodycon dress designed for parties and special occasions.",
    price: 2399,
    originalPrice: 3999,
    discount: 40,
    brand: "Zink London",
    category: "Fashion",
    stock: 90,
    ratings: 4.6,
    numOfReviews: 5620,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
  },

  {
    name: "Zink London Casual Shirt",
    description: "Elegant women's casual shirt with regular fit.",
    price: 1299,
    originalPrice: 2299,
    discount: 43,
    brand: "Zink London",
    category: "Fashion",
    stock: 135,
    ratings: 4.5,
    numOfReviews: 4920,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
  },

  {
    name: "Lavie Betula Women's Handbag",
    description: "Premium handbag with multiple compartments and elegant design.",
    price: 2899,
    originalPrice: 5499,
    discount: 47,
    brand: "Lavie",
    category: "Bags",
    stock: 80,
    ratings: 4.7,
    numOfReviews: 9240,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Lavie Women's Tote Bag",
    description: "Large capacity tote bag suitable for office and travel.",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    brand: "Lavie",
    category: "Bags",
    stock: 90,
    ratings: 4.6,
    numOfReviews: 6840,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Caprese Satchel Handbag",
    description: "Elegant satchel handbag with premium PU leather finish.",
    price: 3199,
    originalPrice: 5999,
    discount: 47,
    brand: "Caprese",
    category: "Bags",
    stock: 70,
    ratings: 4.7,
    numOfReviews: 5820,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Caprese Shoulder Bag",
    description: "Stylish shoulder bag perfect for office and casual use.",
    price: 2299,
    originalPrice: 4299,
    discount: 47,
    brand: "Caprese",
    category: "Bags",
    stock: 95,
    ratings: 4.6,
    numOfReviews: 4630,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Baggit Women's Handbag",
    description: "Premium vegan leather handbag with spacious interior.",
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    brand: "Baggit",
    category: "Bags",
    stock: 85,
    ratings: 4.6,
    numOfReviews: 5240,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Carlton London Block Heels",
    description: "Elegant block heel sandals for parties and formal occasions.",
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    brand: "Carlton London",
    category: "Footwear",
    stock: 75,
    ratings: 4.7,
    numOfReviews: 4180,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  {
    name: "Mochi Women's Flats",
    description: "Comfortable everyday flats with premium finish.",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    brand: "Mochi",
    category: "Footwear",
    stock: 120,
    ratings: 4.5,
    numOfReviews: 5630,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  {
    name: "Metro Women's Sandals",
    description: "Premium ethnic sandals with cushioned sole.",
    price: 2299,
    originalPrice: 3799,
    discount: 39,
    brand: "Metro",
    category: "Footwear",
    stock: 95,
    ratings: 4.6,
    numOfReviews: 4710,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  {
    name: "Bata Women's Sneakers",
    description: "Comfortable casual sneakers for everyday wear.",
    price: 1999,
    originalPrice: 3299,
    discount: 39,
    brand: "Bata",
    category: "Footwear",
    stock: 140,
    ratings: 4.5,
    numOfReviews: 8360,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },

  {
    name: "Inc.5 Women's Pumps",
    description: "Elegant pointed toe pumps for office and party wear.",
    price: 2699,
    originalPrice: 4499,
    discount: 40,
    brand: "Inc.5",
    category: "Footwear",
    stock: 80,
    ratings: 4.6,
    numOfReviews: 3520,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  {
    name: "Mochi Women's Wedges",
    description: "Stylish wedge heels with cushioned footbed.",
    price: 2399,
    originalPrice: 3999,
    discount: 40,
    brand: "Mochi",
    category: "Footwear",
    stock: 90,
    ratings: 4.6,
    numOfReviews: 3940,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  {
    name: "Metro Women's Ballerinas",
    description: "Classic ballerina flats with soft cushioned insole.",
    price: 1899,
    originalPrice: 3199,
    discount: 41,
    brand: "Metro",
    category: "Footwear",
    stock: 115,
    ratings: 4.5,
    numOfReviews: 5210,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
  },

  /* =========================
     👗 WOMEN'S FASHION (41-50)
  ========================= */

  {
    name: "Zaveri Pearls Kundan Jewellery Set",
    description: "Traditional Kundan necklace set with matching earrings for festive occasions.",
    price: 1499,
    originalPrice: 3999,
    discount: 63,
    brand: "Zaveri Pearls",
    category: "Fashion",
    stock: 140,
    ratings: 4.6,
    numOfReviews: 12840,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },

  {
    name: "Yellow Chimes Crystal Pendant Set",
    description: "Elegant crystal pendant with matching earrings for casual and party wear.",
    price: 799,
    originalPrice: 1999,
    discount: 60,
    brand: "Yellow Chimes",
    category: "Fashion",
    stock: 180,
    ratings: 4.5,
    numOfReviews: 9540,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },

  {
    name: "Voylla American Diamond Necklace Set",
    description: "Premium American diamond jewellery set with luxurious finish.",
    price: 2299,
    originalPrice: 4999,
    discount: 54,
    brand: "Voylla",
    category: "Fashion",
    stock: 95,
    ratings: 4.7,
    numOfReviews: 4320,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },

  {
    name: "Sukkhi Gold Plated Jewellery Set",
    description: "Gold plated necklace and earrings set for weddings and festivals.",
    price: 1299,
    originalPrice: 3499,
    discount: 63,
    brand: "Sukkhi",
    category: "Fashion",
    stock: 160,
    ratings: 4.5,
    numOfReviews: 8640,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },

  {
    name: "Pipa Bella Layered Necklace",
    description: "Modern layered necklace designed for western outfits.",
    price: 999,
    originalPrice: 2499,
    discount: 60,
    brand: "Pipa Bella",
    category: "Fashion",
    stock: 130,
    ratings: 4.5,
    numOfReviews: 4830,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
  },

  {
    name: "Accessorize Women's Crossbody Bag",
    description: "Compact premium crossbody bag with adjustable shoulder strap.",
    price: 3499,
    originalPrice: 6499,
    discount: 46,
    brand: "Accessorize",
    category: "Bags",
    stock: 70,
    ratings: 4.7,
    numOfReviews: 3250,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Hidesign Genuine Leather Handbag",
    description: "Premium handcrafted genuine leather handbag with elegant finish.",
    price: 6999,
    originalPrice: 10999,
    discount: 36,
    brand: "Hidesign",
    category: "Bags",
    stock: 45,
    ratings: 4.8,
    numOfReviews: 2860,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "Da Milano Leather Tote Bag",
    description: "Luxury leather tote bag with spacious compartments for office use.",
    price: 8499,
    originalPrice: 12999,
    discount: 35,
    brand: "Da Milano",
    category: "Bags",
    stock: 35,
    ratings: 4.8,
    numOfReviews: 2140,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
  },

  {
    name: "BIBA Banarasi Silk Saree",
    description: "Traditional Banarasi silk saree featuring rich zari woven design.",
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    brand: "BIBA",
    category: "Fashion",
    stock: 60,
    ratings: 4.8,
    numOfReviews: 3740,
    imageUrl: "https://images.unsplash.com/photo-1610189012230-2e7f6c8f1f4f?w=800"
  },

  {
    name: "Libas Embroidered Palazzo Suit Set",
    description: "Premium embroidered ethnic suit set with palazzo and dupatta.",
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    brand: "Libas",
    category: "Fashion",
    stock: 85,
    ratings: 4.7,
    numOfReviews: 5210,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
  },


  /* =========================
     📺 APPLIANCES
  ========================= */

  {
    name: "Samsung 55 inch Crystal 4K Smart TV",
    description: "Ultra HD smart LED TV with HDR, Dolby Audio and voice assistant support.",
    price: 45999,
    originalPrice: 69999,
    discount: 34,
    brand: "Samsung",
    category: "Appliances",
    stock: 25,
    ratings: 4.7,
    numOfReviews: 8500,
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800"
  },

  {
    name: "LG OLED 65 inch Smart TV",
    description: "Premium OLED display with AI processor, Dolby Vision and cinematic experience.",
    price: 149999,
    originalPrice: 189999,
    discount: 21,
    brand: "LG",
    category: "Appliances",
    stock: 10,
    ratings: 4.9,
    numOfReviews: 3200,
    imageUrl: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800"
  },

  {
    name: "Sony Bravia 50 inch Google TV",
    description: "4K HDR processor with Google TV and immersive sound technology.",
    price: 74999,
    originalPrice: 99999,
    discount: 25,
    brand: "Sony",
    category: "Appliances",
    stock: 18,
    ratings: 4.8,
    numOfReviews: 4500,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"
  },

  {
    name: "LG 340L Double Door Refrigerator",
    description: "Smart inverter compressor refrigerator with convertible cooling.",
    price: 35999,
    originalPrice: 45999,
    discount: 21,
    brand: "LG",
    category: "Appliances",
    stock: 30,
    ratings: 4.6,
    numOfReviews: 5600,
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800"
  },

  {
    name: "Samsung 653L Side By Side Refrigerator",
    description: "Large capacity refrigerator with digital inverter technology.",
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    brand: "Samsung",
    category: "Appliances",
    stock: 12,
    ratings: 4.8,
    numOfReviews: 1700,
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800"
  },

  {
    name: "Whirlpool 265L Refrigerator",
    description: "Energy efficient refrigerator with adaptive intelligence cooling.",
    price: 27999,
    originalPrice: 34999,
    discount: 20,
    brand: "Whirlpool",
    category: "Appliances",
    stock: 35,
    ratings: 4.4,
    numOfReviews: 3400,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
  },

  {
    name: "Voltas 1.5 Ton 5 Star Inverter AC",
    description: "Copper condenser split AC with turbo cooling technology.",
    price: 38999,
    originalPrice: 49999,
    discount: 22,
    brand: "Voltas",
    category: "Appliances",
    stock: 28,
    ratings: 4.5,
    numOfReviews: 6200,
    imageUrl: "https://images.unsplash.com/photo-1631545806609-93f7f5a8e089?w=800"
  },

  {
    name: "LG Dual Inverter Split AC",
    description: "Energy saving AC with dual inverter compressor and silent cooling.",
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    brand: "LG",
    category: "Appliances",
    stock: 20,
    ratings: 4.7,
    numOfReviews: 4100,
    imageUrl: "https://images.unsplash.com/photo-1621267860478-dbdd589372db?w=800"
  },

  {
    name: "Samsung Fully Automatic Washing Machine 8KG",
    description: "Eco bubble washing technology with digital inverter motor.",
    price: 28999,
    originalPrice: 37999,
    discount: 23,
    brand: "Samsung",
    category: "Appliances",
    stock: 35,
    ratings: 4.6,
    numOfReviews: 7500,
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800"
  },

  {
    name: "LG Front Load Washing Machine 9KG",
    description: "AI direct drive washing machine with steam wash feature.",
    price: 44999,
    originalPrice: 59999,
    discount: 25,
    brand: "LG",
    category: "Appliances",
    stock: 18,
    ratings: 4.8,
    numOfReviews: 2800,
    imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800"
  },

  {
    name: "IFB Microwave Oven 30L",
    description: "Convection microwave oven with auto cook menus.",
    price: 14999,
    originalPrice: 19999,
    discount: 25,
    brand: "IFB",
    category: "Appliances",
    stock: 50,
    ratings: 4.5,
    numOfReviews: 5200,
    imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800"
  },

  {
    name: "Philips Air Fryer Digital",
    description: "Healthy cooking air fryer with rapid air technology.",
    price: 8999,
    originalPrice: 12999,
    discount: 30,
    brand: "Philips",
    category: "Appliances",
    stock: 75,
    ratings: 4.6,
    numOfReviews: 8800,
    imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800"
  },

  {
    name: "Dyson V12 Vacuum Cleaner",
    description: "Cordless vacuum cleaner with powerful suction technology.",
    price: 54999,
    originalPrice: 65999,
    discount: 16,
    brand: "Dyson",
    category: "Appliances",
    stock: 15,
    ratings: 4.8,
    numOfReviews: 1400,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
  },

  {
    name: "Bajaj Mixer Grinder 750W",
    description: "Powerful mixer grinder with stainless steel jars.",
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    brand: "Bajaj",
    category: "Appliances",
    stock: 100,
    ratings: 4.4,
    numOfReviews: 9600,
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800"
  },

  {
    name: "Kent RO Water Purifier",
    description: "Advanced RO+UV+UF water purification system.",
    price: 16999,
    originalPrice: 22999,
    discount: 26,
    brand: "Kent",
    category: "Appliances",
    stock: 40,
    ratings: 4.5,
    numOfReviews: 4300,
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800"
  }

];


const seedCatalog = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipkart_clone';
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB.');

    // 1. Get or create a seller
    let seller = await User.findOne({ role: 'seller' });
    if (!seller) {
      console.log('📝 Creating default Seller profile...');
      seller = await User.create({
        name: 'Flipkart Retailer',
        email: 'retailer@flipkart.com',
        password: 'Password123!',
        phone: '9900112233',
        isVerified: true,
        role: 'seller'
      });
      console.log(`✅ Default Seller created: ${seller.email}`);
    }

    // 2. Clear old products
    await Product.deleteMany({});
    console.log('🧹 Cleared all existing catalog products.');

    // 3. Map images and seller references to products
    const itemsToInsert = productsData.map((p) => {
      const imgUrl = p.imageUrl;
      const cleanProduct = { ...p };
      delete cleanProduct.imageUrl;

      return {
        ...cleanProduct,
        seller: seller._id,
        images: [
          {
            public_id: `prod_img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: imgUrl
          }
        ]
      };
    });

    // 4. Insert Products
    await Product.insertMany(itemsToInsert);
    console.log(`🎉 SUCCESS: 40+ high-fidelity products with matching images have been seeded into the catalog database!`);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
};

seedCatalog();
