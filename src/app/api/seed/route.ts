/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

// --- UTILS ---
const rand = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 100) / 100;
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const rating = () => Math.round((Math.random() * 1.1 + 3.8) * 10) / 10;
const discount = () => pick([0, 0, 0, 5, 10, 10, 15, 20, 20, 25, 30, 40, 50]);
const stock = () => pick([0, randInt(2, 8), randInt(10, 50), randInt(50, 200), randInt(200, 600)]);
const reviews = () => randInt(12, 2400);
const dealTimer = () => pick([
    undefined,
    undefined,
    undefined,
    new Date(Date.now() + 1000 * 60 * 30),
    new Date(Date.now() + 1000 * 60 * 60 * 2),
    new Date(Date.now() + 1000 * 60 * 60 * 6),
    new Date(Date.now() + 1000 * 60 * 60 * 24),
    new Date(Date.now() + 1000 * 60 * 60 * 48),
]);

// ─── ELECTRONICS ────────────────────────────────────────────
const electronics = [
    { name: "NeuralCore Processor V9", brand: "NeuralTech", price: 499, sub: "Components", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80", tags: ["processor", "ai", "pc"] },
    { name: "UltraWide Vision Monitor 34\"", brand: "VisionTech", price: 699, sub: "Monitors", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", tags: ["monitor", "ultrawide", "gaming"] },
    { name: "Ergo Mech Keyboard Pro", brand: "KeyMaster", price: 249, sub: "Peripherals", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", tags: ["keyboard", "mechanical", "rgb"] },
    { name: "Gaming Mouse X500 Pro", brand: "SwiftClick", price: 89, sub: "Peripherals", img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80", tags: ["mouse", "gaming", "fps"] },
    { name: "NVMe SSD 2TB Gen5", brand: "FlashCore", price: 199, sub: "Storage", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80", tags: ["ssd", "storage", "nvme"] },
    { name: "RTX 5090 Graphics Card", brand: "PixelForce", price: 1999, sub: "GPU", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80", tags: ["gpu", "gaming", "4k", "ai"] },
    { name: "DDR5 RAM Kit 64GB", brand: "SpeedRAM", price: 159, sub: "Memory", img: "https://images.unsplash.com/photo-1562976540-1502c2145851?w=800&q=80", tags: ["ram", "memory", "ddr5"] },
    { name: "Mini-ITX Gaming PC Build", brand: "NeuralTech", price: 1299, sub: "Systems", img: "https://images.unsplash.com/photo-1587202372599-a6b3de8a7f83?w=800&q=80", tags: ["computer", "mini-itx", "gaming"] },
    { name: "4K Webcam Ultra HD", brand: "ClearView", price: 129, sub: "Peripherals", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", tags: ["webcam", "4k", "streaming"] },
    { name: "Thunderbolt 4 Hub 10-in-1", brand: "ConnectX", price: 79, sub: "Accessories", img: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=800&q=80", tags: ["hub", "usb", "thunderbolt"] },
    { name: "Mechanical Numpad TKL", brand: "KeyMaster", price: 69, sub: "Peripherals", img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80", tags: ["numpad", "keyboard", "tkl"] },
    { name: "Portable SSD 1TB USB-C", brand: "FlashCore", price: 89, sub: "Storage", img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80", tags: ["portable", "ssd", "usb-c"] },
    { name: "27\" 1080p Gaming Monitor", brand: "VisionTech", price: 329, sub: "Monitors", img: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80", tags: ["monitor", "gaming", "144hz"] },
    { name: "VR Headset Pro", brand: "PixelForce", price: 599, sub: "VR", img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80", tags: ["vr", "gaming", "immersive"] },
    { name: "Wireless Charging Pad Trio", brand: "ConnectX", price: 49, sub: "Accessories", img: "https://images.unsplash.com/photo-1609592806596-b55a60e3a284?w=800&q=80", tags: ["charging", "wireless", "multi-device"] },
    { name: "Smart S-Pen Stylus", brand: "DrawTech", price: 89, sub: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["stylus", "drawing", "tablet"] },
    { name: "CPU Liquid Cooler 360mm", brand: "CoolMax", price: 169, sub: "Cooling", img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80", tags: ["cooler", "liquid", "aio"] },
    { name: "ATX Power Supply 850W Gold", brand: "PowerEdge", price: 139, sub: "Components", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80", tags: ["psu", "power", "80plus"] },
    { name: "Compact HTPC Mini Case", brand: "CoolMax", price: 89, sub: "Cases", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80", tags: ["case", "mini", "htpc"] },
    { name: "Ultrabook Laptop Stand", brand: "ErgoSpace", price: 55, sub: "Accessories", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", tags: ["stand", "laptop", "ergonomic"] },
];

// ─── AUDIO ──────────────────────────────────────────────────
const audio = [
    { name: "Quantum Audio Buds Pro", brand: "NovaSound", price: 199, sub: "Earbuds", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80", tags: ["earbuds", "anc", "wireless"] },
    { name: "SoundWave Studio Headphones", brand: "SoundWave", price: 349, sub: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", tags: ["headphones", "studio", "audiophile"] },
    { name: "BassMax Portable Speaker", brand: "BassMax", price: 129, sub: "Speakers", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80", tags: ["speaker", "portable", "waterproof"] },
    { name: "HiFi DAC Amplifier", brand: "PureSignal", price: 299, sub: "DAC", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", tags: ["dac", "amplifier", "hifi"] },
    { name: "Open-Back Audiophile Cans", brand: "SoundWave", price: 499, sub: "Headphones", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["headphones", "open-back", "reference"] },
    { name: "TWS Active Sport Earbuds", brand: "SportBeat", price: 79, sub: "Earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80", tags: ["earbuds", "sport", "fitness"] },
    { name: "Desktop Studio Monitor L", brand: "PureSignal", price: 249, sub: "Speakers", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", tags: ["monitor", "studio", "mixing"] },
    { name: "USB Condenser Microphone", brand: "VoiceCore", price: 99, sub: "Microphones", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", tags: ["mic", "recording", "podcast"] },
    { name: "Noise-Blocking Earplug Pro", brand: "AcoustiShield", price: 39, sub: "Earbuds", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80", tags: ["earplugs", "protection", "sleep"] },
    { name: "Bluetooth 5.4 ANC Headset", brand: "NovaSound", price: 159, sub: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", tags: ["headset", "anc", "office"] },
    { name: "Vinyl Record Player BT", brand: "RetroWave", price: 189, sub: "Players", img: "https://images.unsplash.com/photo-1529654073539-5b75e4a0d602?w=800&q=80", tags: ["vinyl", "turntable", "bluetooth"] },
    { name: "Podcast Arm Boom Mount", brand: "VoiceCore", price: 45, sub: "Accessories", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", tags: ["mic stand", "podcast", "boom"] },
    { name: "Bone Conduction Headphones", brand: "SportBeat", price: 119, sub: "Headphones", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["bone-conduction", "running", "safety"] },
    { name: "Soundbar 2.1 with Subwoofer", brand: "BassMax", price: 219, sub: "Speakers", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80", tags: ["soundbar", "subwoofer", "home cinema"] },
    { name: "Portable Hi-Res Music Player", brand: "PureSignal", price: 379, sub: "Players", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", tags: ["dap", "portable", "lossless"] },
    { name: "XLR Interface 2-Channel", brand: "VoiceCore", price: 149, sub: "Interfaces", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", tags: ["interface", "recording", "xlr"] },
    { name: "Party Speaker 360 IPX6", brand: "BassMax", price: 289, sub: "Speakers", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80", tags: ["party", "speaker", "ipx6", "outdoor"] },
    { name: "Pro Reference IEM Monitors", brand: "PureSignal", price: 649, sub: "Earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80", tags: ["iem", "in-ear", "monitor", "pro"] },
    { name: "Soundproofing Foam Panels", brand: "AcoustiShield", price: 59, sub: "Accessories", img: "https://images.unsplash.com/photo-1529654073539-5b75e4a0d602?w=800&q=80", tags: ["acoustic", "soundproofing", "studio"] },
    { name: "Kids Wireless Headphones", brand: "NovaSound", price: 49, sub: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", tags: ["kids", "headphones", "safe"] },
];

// ─── ACCESSORIES ────────────────────────────────────────────
const accessories = [
    { name: "Titanium Minimalist Wallet", brand: "MetalCraft", price: 95, sub: "Wallets", img: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80", tags: ["wallet", "titanium", "rfid"] },
    { name: "Classic Chronograph Watch", brand: "TimeCo", price: 195, sub: "Watches", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80", tags: ["watch", "chronograph", "luxury"] },
    { name: "Polarized Aviator Sunglasses", brand: "OpticWave", price: 150, sub: "Eyewear", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", tags: ["sunglasses", "aviator", "uv400"] },
    { name: "Leather Cardholder Slim", brand: "ArtisanCraft", price: 45, sub: "Wallets", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", tags: ["cardholder", "leather", "slim"] },
    { name: "Smart Tracker Tag", brand: "FindX", price: 35, sub: "Trackers", img: "https://images.unsplash.com/photo-1609592806596-b55a60e3a284?w=800&q=80", tags: ["tracker", "airtag", "bluetooth"] },
    { name: "Minimalist Mechanical Watch", brand: "TimeCo", price: 289, sub: "Watches", img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80", tags: ["watch", "mechanical", "minimal"] },
    { name: "Monogram Leather Belt", brand: "ArtisanCraft", price: 65, sub: "Belts", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80", tags: ["belt", "leather", "premium"] },
    { name: "Blue-Light Blocking Glasses", brand: "OpticWave", price: 59, sub: "Eyewear", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", tags: ["glasses", "blue-light", "screen"] },
    { name: "Carbon Fiber Phone Case", brand: "ArmorCase", price: 29, sub: "Phone Accessories", img: "https://images.unsplash.com/photo-1609592806596-b55a60e3a284?w=800&q=80", tags: ["case", "carbon", "slim", "phone"] },
    { name: "Luxury Automatic Watch", brand: "PrestigeTime", price: 799, sub: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", tags: ["watch", "automatic", "luxury", "sapphire"] },
    { name: "Magsafe Wallet Cardholder", brand: "FindX", price: 45, sub: "Phone Accessories", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", tags: ["magsafe", "wallet", "iphone"] },
    { name: "Polarized Sport Goggles", brand: "OpticWave", price: 89, sub: "Eyewear", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", tags: ["goggles", "sport", "polarized"] },
    { name: "RFID Blocking Travel Wallet", brand: "MetalCraft", price: 55, sub: "Wallets", img: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80", tags: ["wallet", "travel", "rfid", "passport"] },
    { name: "Braided Nylon Watch Strap", brand: "TimeCo", price: 25, sub: "Watch Accessories", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80", tags: ["strap", "watch", "nylon"] },
    { name: "AirPods Pro Silicone Case", brand: "ArmorCase", price: 19, sub: "Phone Accessories", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80", tags: ["airpods", "case", "silicone"] },
    { name: "Money Clip Steel Edition", brand: "MetalCraft", price: 35, sub: "Wallets", img: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80", tags: ["money clip", "steel", "minimalist"] },
    { name: "Multitool EDC Keychain", brand: "MetalCraft", price: 29, sub: "EDC", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80", tags: ["multitool", "edc", "keychain"] },
    { name: "Smartwatch Ultra 49mm", brand: "PrestigeTime", price: 449, sub: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", tags: ["smartwatch", "ultra", "health", "gps"] },
    { name: "Premium Leather Gloves", brand: "ArtisanCraft", price: 75, sub: "Accessories", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80", tags: ["gloves", "leather", "winter"] },
    { name: "Phone Grip Ring Stand", brand: "ArmorCase", price: 15, sub: "Phone Accessories", img: "https://images.unsplash.com/photo-1609592806596-b55a60e3a284?w=800&q=80", tags: ["ring", "stand", "grip", "phone"] },
];

// ─── FITNESS ────────────────────────────────────────────────
const fitness = [
    { name: "Adjustable Dumbbell Set 50lbs", brand: "IronFit", price: 349, sub: "Weights", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80", tags: ["dumbbells", "weights", "home gym"] },
    { name: "Pro Yoga Mat 5mm", brand: "ZenLiving", price: 85, sub: "Yoga", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80", tags: ["yoga", "mat", "exercise"] },
    { name: "Smart Fitness Band X3", brand: "FitPulse", price: 120, sub: "Wearables", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80", tags: ["fitness tracker", "health", "smartband"] },
    { name: "Resistance Band Set Pro", brand: "FlexForce", price: 35, sub: "Cardio", img: "https://images.unsplash.com/photo-1598289431512-b97b0917afdf?w=800&q=80", tags: ["resistance bands", "workout", "booty"] },
    { name: "Barbell Olympic 20kg", brand: "IronFit", price: 189, sub: "Weights", img: "https://images.unsplash.com/photo-1616279969965-55ae08b9ab82?w=800&q=80", tags: ["barbell", "powerlifting", "olympic"] },
    { name: "Foam Roller Deep Tissue", brand: "ZenLiving", price: 29, sub: "Recovery", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80", tags: ["foam roller", "recovery", "fascia"] },
    { name: "Smart Jump Rope Bluetooth", brand: "CardioTech", price: 45, sub: "Cardio", img: "https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&q=80", tags: ["jump rope", "cardio", "bt"] },
    { name: "Adjustable Weight Bench", brand: "IronFit", price: 229, sub: "Equipment", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", tags: ["bench", "weightlifting", "foldable"] },
    { name: "Kettlebell Cast Iron 24kg", brand: "IronFit", price: 79, sub: "Weights", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80", tags: ["kettlebell", "hiit", "strength"] },
    { name: "Compression Running Tights", brand: "FlexForce", price: 55, sub: "Apparel", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", tags: ["compression", "running", "tights"] },
    { name: "Pull-Up Bar Doorway", brand: "CardioTech", price: 35, sub: "Equipment", img: "https://images.unsplash.com/photo-1616279969965-55ae08b9ab82?w=800&q=80", tags: ["pullup", "bar", "calisthenics"] },
    { name: "Vibration Massage Gun Pro", brand: "FitPulse", price: 159, sub: "Recovery", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80", tags: ["massage gun", "recovery", "therapy"] },
    { name: "Ab Wheel Roller", brand: "CardioTech", price: 19, sub: "Equipment", img: "https://images.unsplash.com/photo-1598289431512-b97b0917afdf?w=800&q=80", tags: ["ab wheel", "core", "workout"] },
    { name: "Whey Protein Shaker Bottle", brand: "ZenLiving", price: 15, sub: "Accessories", img: "https://images.unsplash.com/photo-1598289431512-b97b0917afdf?w=800&q=80", tags: ["shaker", "protein", "gym"] },
    { name: "Gym Gloves Anti-Slip", brand: "FlexForce", price: 21, sub: "Accessories", img: "https://images.unsplash.com/photo-1598289431512-b97b0917afdf?w=800&q=80", tags: ["gloves", "gym", "grip"] },
    { name: "Smart Gym Scale BIA", brand: "FitPulse", price: 49, sub: "Wearables", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80", tags: ["scale", "body fat", "bia", "smart"] },
    { name: "Rowing Machine Compact", brand: "CardioTech", price: 699, sub: "Equipment", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", tags: ["rowing", "cardio", "machine"] },
    { name: "Yoga Blocks Foam Pair", brand: "ZenLiving", price: 18, sub: "Yoga", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80", tags: ["yoga blocks", "foam", "flexibility"] },
    { name: "Speed Agility Ladder", brand: "FlexForce", price: 25, sub: "Cardio", img: "https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&q=80", tags: ["agility", "ladder", "training"] },
    { name: "Suspension Trainer TRX", brand: "CardioTech", price: 89, sub: "Equipment", img: "https://images.unsplash.com/photo-1616279969965-55ae08b9ab82?w=800&q=80", tags: ["trx", "suspension", "bodyweight"] },
];

// ─── HOME TECH ───────────────────────────────────────────────
const homeTech = [
    { name: "Smart Hub Controller v3", brand: "HomeAI", price: 149, sub: "Smart Home", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["smart home", "hub", "iot"] },
    { name: "Smart Temperature Mug", brand: "ThermaMug", price: 110, sub: "Kitchen", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80", tags: ["mug", "smart", "coffee"] },
    { name: "Aroma Therapy Diffuser Pro", brand: "ZenLiving", price: 45, sub: "Wellness", img: "https://images.unsplash.com/photo-1608528577891-eb05ebacffab?w=800&q=80", tags: ["diffuser", "aromatherapy", "ambient"] },
    { name: "Ergonomic Office Chair Mesh", brand: "ErgoSpace", price: 299, sub: "Furniture", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80", tags: ["chair", "ergonomic", "office"] },
    { name: "Smart LED Light Strip 5m", brand: "HomeAI", price: 39, sub: "Lighting", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["led", "smart light", "rgb", "strip"] },
    { name: "Robot Vacuum Cleaner Pro", brand: "CleanBot", price: 399, sub: "Appliances", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["robot vacuum", "automated", "cleaning"] },
    { name: "Air Purifier HEPA H13", brand: "CleanAir", price: 189, sub: "Appliances", img: "https://images.unsplash.com/photo-1608528577891-eb05ebacffab?w=800&q=80", tags: ["air purifier", "hepa", "allergies"] },
    { name: "Smart Doorbell with Camera", brand: "HomeAI", price: 129, sub: "Security", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["doorbell", "camera", "security", "wifi"] },
    { name: "Ceramic Pour-over Coffee Kit", brand: "BrewMaster", price: 65, sub: "Kitchen", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80", tags: ["coffee", "pour-over", "ceramic"] },
    { name: "Mechanical Standing Desk", brand: "ErgoSpace", price: 549, sub: "Furniture", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80", tags: ["standing desk", "motorized", "ergonomic"] },
    { name: "Smart Smoke Detector", brand: "HomeAI", price: 59, sub: "Security", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["smoke detector", "safety", "smart"] },
    { name: "Wi-Fi 7 Mesh Router System", brand: "NetWave", price: 349, sub: "Networking", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["router", "wifi7", "mesh", "fast"] },
    { name: "Mini Smart Projector 4K", brand: "CineHome", price: 499, sub: "Entertainment", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80", tags: ["projector", "4k", "mini", "home theatre"] },
    { name: "Sous Vide Precision Cooker", brand: "BrewMaster", price: 99, sub: "Kitchen", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80", tags: ["sous vide", "cooking", "precision"] },
    { name: "Smart Plug Wi-Fi 4-Pack", brand: "HomeAI", price: 35, sub: "Smart Home", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["smart plug", "wifi", "energy", "outlet"] },
    { name: "Gaming Chair RGB Pro", brand: "ErgoSpace", price: 399, sub: "Furniture", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80", tags: ["gaming chair", "rgb", "ergonomic"] },
    { name: "Salt Lamp Himalayan XL", brand: "ZenLiving", price: 29, sub: "Wellness", img: "https://images.unsplash.com/photo-1608528577891-eb05ebacffab?w=800&q=80", tags: ["salt lamp", "himalayan", "ambience"] },
    { name: "Wireless Desk Vacuum", brand: "CleanBot", price: 25, sub: "Appliances", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["vacuum", "desk", "mini", "wireless"] },
    { name: "Single Burner Induction Cooker", brand: "BrewMaster", price: 49, sub: "Kitchen", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80", tags: ["induction", "cooking", "portable"] },
    { name: "Security Camera 4K Outdoor", brand: "HomeAI", price: 89, sub: "Security", img: "https://images.unsplash.com/photo-1558002038-1ed407c08643?w=800&q=80", tags: ["camera", "outdoor", "security", "4k"] },
];

// ─── CREATION ───────────────────────────────────────────────
const creation = [
    { name: "Mirrorless Camera A7V 61MP", brand: "LensX", price: 2999, sub: "Cameras", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["camera", "mirrorless", "8k", "photography"] },
    { name: "Nova Drone X1 Pro", brand: "AeroNova", price: 899, sub: "Drones", img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80", tags: ["drone", "4k", "aerial", "flying"] },
    { name: "S-Pen Stylus Pro 4096", brand: "DrawTech", price: 89, sub: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["stylus", "drawing", "pressure"] },
    { name: "LED Ring Light 18\"", brand: "LumoPro", price: 69, sub: "Lighting", img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", tags: ["ring light", "streaming", "youtube"] },
    { name: "Action Camera 5K Waterproof", brand: "LensX", price: 349, sub: "Cameras", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["action camera", "5k", "waterproof"] },
    { name: "Graphic Design Tablet L", brand: "DrawTech", price: 299, sub: "Tablets", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", tags: ["drawing tablet", "wacom", "design"] },
    { name: "Shotgun Microphone Pro", brand: "VoiceCore", price: 179, sub: "Microphones", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", tags: ["shotgun mic", "video", "filmmaking"] },
    { name: "Video Light Panel Bi-Color", brand: "LumoPro", price: 129, sub: "Lighting", img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", tags: ["light panel", "photography", "bi-color"] },
    { name: "Travel Camera Tripod", brand: "LensX", price: 79, sub: "Accessories", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["tripod", "travel", "vlog"] },
    { name: "Portable Green Screen Kit", brand: "LumoPro", price: 49, sub: "Accessories", img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", tags: ["green screen", "streaming", "chroma key"] },
    { name: "Drone Racing Goggles FPV", brand: "AeroNova", price: 249, sub: "Drones", img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80", tags: ["fpv", "goggles", "racing drone"] },
    { name: "DSLR Camera Strap Pro", brand: "LensX", price: 35, sub: "Accessories", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["strap", "camera", "comfort"] },
    { name: "Digital Mixer 8-Channel", brand: "VoiceCore", price: 399, sub: "Audio", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", tags: ["mixer", "audio", "recording", "live"] },
    { name: "360° Camera Insta Pro", brand: "LensX", price: 499, sub: "Cameras", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["360 camera", "vr", "spherical"] },
    { name: "Softbox Lighting Kit 2x90W", brand: "LumoPro", price: 89, sub: "Lighting", img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", tags: ["softbox", "photography", "studio light"] },
    { name: "Graphic Tablet Pen Nib Set", brand: "DrawTech", price: 15, sub: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["nib", "stylus", "drawing"] },
    { name: "Mini Drone for Beginners", brand: "AeroNova", price: 149, sub: "Drones", img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80", tags: ["mini drone", "beginner", "indoor"] },
    { name: "Photo Backdrop Stand Kit", brand: "LumoPro", price: 55, sub: "Accessories", img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", tags: ["backdrop", "stand", "photography"] },
    { name: "Anamorphic Lens Adapter", brand: "LensX", price: 199, sub: "Lenses", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", tags: ["anamorphic", "lens", "cinematic"] },
    { name: "Tablet Drawing Glove", brand: "DrawTech", price: 9, sub: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", tags: ["glove", "drawing", "stylus"] },
];

// ─── FASHION ────────────────────────────────────────────────
const fashion = [
    { name: "AeroKnit Glide Sneakers", brand: "Velocity", price: 129, sub: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["sneakers", "running", "performance"] },
    { name: "Minimalist Leather Backpack", brand: "ArtisanCraft", price: 245, sub: "Bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", tags: ["backpack", "leather", "laptop"] },
    { name: "Polar Fleece Zip Jacket", brand: "NordicTech", price: 85, sub: "Outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", tags: ["jacket", "fleece", "winter"] },
    { name: "Urban Cargo Pants", brand: "Velocity", price: 75, sub: "Clothing", img: "https://images.unsplash.com/photo-1624378440846-97d8cbea50d6?w=800&q=80", tags: ["cargo", "pants", "streetwear"] },
    { name: "Merino Wool Crew Sweater", brand: "WoolMark", price: 95, sub: "Clothing", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", tags: ["merino", "wool", "sweater", "premium"] },
    { name: "Slim Fit Chino Pants", brand: "FormFit", price: 65, sub: "Clothing", img: "https://images.unsplash.com/photo-1624378440846-97d8cbea50d6?w=800&q=80", tags: ["chinos", "slim", "casual"] },
    { name: "Canvas Tote Bag XL", brand: "EcoThread", price: 35, sub: "Bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", tags: ["tote", "canvas", "eco", "sustainable"] },
    { name: "Trail Running Shoes Wild", brand: "Velocity", price: 149, sub: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["trail", "running", "outdoor", "shoes"] },
    { name: "Oxford Button-Down Shirt", brand: "FormFit", price: 55, sub: "Clothing", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", tags: ["shirt", "oxford", "formal", "business"] },
    { name: "Leather Chelsea Boots", brand: "SoleKing", price: 199, sub: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["boots", "leather", "chelsea", "formal"] },
    { name: "Bamboo Socks 6-Pack", brand: "EcoThread", price: 29, sub: "Clothing", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80", tags: ["socks", "bamboo", "eco", "comfort"] },
    { name: "Denim Jacket Raw Selvedge", brand: "IndigoWorks", price: 189, sub: "Outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", tags: ["denim", "jacket", "selvedge", "jean"] },
    { name: "Crossbody Messenger Bag", brand: "ArtisanCraft", price: 125, sub: "Bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", tags: ["crossbody", "messenger", "leather"] },
    { name: "Puffer Down Jacket 900-Fill", brand: "NordicTech", price: 249, sub: "Outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", tags: ["puffer", "down", "winter", "warm"] },
    { name: "Athletic Compression Shorts", brand: "Velocity", price: 40, sub: "Clothing", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", tags: ["compression", "shorts", "athletic", "gym"] },
    { name: "Sneaker Cleaning Kit Pro", brand: "SoleKing", price: 19, sub: "Accessories", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["sneaker", "cleaning", "care"] },
    { name: "Premium Sweatshirt Oversize", brand: "FormFit", price: 70, sub: "Clothing", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", tags: ["sweatshirt", "oversized", "streetwear"] },
    { name: "Tech Fleece Track Pants", brand: "Velocity", price: 85, sub: "Clothing", img: "https://images.unsplash.com/photo-1624378440846-97d8cbea50d6?w=800&q=80", tags: ["track pants", "fleece", "tech", "jogger"] },
    { name: "Suede Desert Boots", brand: "SoleKing", price: 139, sub: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["desert boots", "suede", "casual"] },
    { name: "Organic Cotton Hoodie", brand: "EcoThread", price: 79, sub: "Clothing", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", tags: ["hoodie", "organic", "eco", "pullover"] },
];

// ─── GENERATOR ──────────────────────────────────────────────
function buildProducts(items: any[], category: string) {
    return items.map((item) => {
        const disc = discount();
        const s = stock();
        const dealEnd = (disc >= 20 || s < 10) ? dealTimer() : undefined;
        return {
            name: item.name,
            description: item.desc || `Premium quality ${item.name} from ${item.brand}. Crafted for the modern ${category.toLowerCase()} enthusiast with superior build quality and thoughtful design.`,
            price: item.price,
            category,
            subCategory: item.sub,
            brand: item.brand,
            discountPercentage: disc,
            images: [item.img],
            stock: s,
            rating: rating(),
            reviewsCount: reviews(),
            tags: item.tags,
            featured: Math.random() > 0.7,
            ...(dealEnd ? { dealEndsAt: dealEnd } : {}),
        };
    });
}

const allProducts = [
    ...buildProducts(electronics, "Electronics"),
    ...buildProducts(audio, "Audio"),
    ...buildProducts(accessories, "Accessories"),
    ...buildProducts(fitness, "Fitness"),
    ...buildProducts(homeTech, "Home Tech"),
    ...buildProducts(creation, "Creation"),
    ...buildProducts(fashion, "Fashion"),
];

export async function GET() {
    try {
        await connectToDatabase();
        await Product.deleteMany({});
        const inserted = await Product.insertMany(allProducts);
        const cats = [...new Set(allProducts.map((p) => p.category))];
        return NextResponse.json({
            message: `✅ Seeded ${inserted.length} products across ${cats.length} categories.`,
            count: inserted.length,
            categories: cats,
            breakdown: cats.map((c) => ({ category: c, count: allProducts.filter((p) => p.category === c).length })),
        }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(`Seed Error: ${error.message}`, { status: 500 });
    }
}
