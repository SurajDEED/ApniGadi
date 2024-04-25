const sampleListings = [
  {
    title: "Maruti Alto 800",
    description: "The Maruti Alto 800 is a compact and fuel-efficient hatchback that's perfect for urban commuting. With its small size and nimble handling, the Alto 800 is easy to maneuver through crowded city streets and tight parking spaces. Its efficient engine and affordable price make it an ideal choice for budget-conscious drivers looking for a reliable and practical car.",
    years: 2004,
    km: 5000,
    image: {
      filename: "alto_800_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/alto-800/alto800_blazing_red/alto800_blazing_red_new.webp",
    },
    price: 500, // Price in dollars
    location: "Delhi",
    country: "India",
    seater: '4',
    carType: 'Convertible Car',
    carEngine: 'Manual',
    fuelType: 'Petrol',
  },
  {
    title: "Maruti Dzire",
    description: "The Maruti Dzire is a stylish and practical sedan that offers a perfect blend of comfort, performance, and efficiency. With its sleek design and spacious interior, the Dzire provides a comfortable and enjoyable ride for both driver and passengers. Its fuel-efficient engine and advanced features make it ideal for long drives or daily commuting, while its affordable price ensures it's accessible to a wide range of drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "dzire_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/dzire-black.webp",
    },
    price: 18000, // Price in dollars
    location: "Maharashtra",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Manual',
    fuelType: 'Petrol',
  },
  {
    title: "Maruti Eeco",
    description: "The Maruti Eeco is a versatile and practical van that offers ample space and utility for both passengers and cargo. With its spacious cabin and flexible seating arrangements, the Eeco is perfect for large families, commercial use, or recreational activities. Its affordable price and low maintenance costs make it a popular choice among budget-conscious drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "eeco_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-detail/eeco-launch-nov-2022-new/colors/eeco-color-shot_blue.webp",
    },
    price: 16000, // Price in dollars
    location: "Tamil Nadu",
    country: "India",
    seater: '8',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'cng'
  },
  {
    title: "Maruti Wagon R",
    description: "The Maruti Wagon R is a versatile and practical hatchback that offers ample space and comfort for both driver and passengers. With its tallboy design and spacious interior, the Wagon R provides a comfortable ride for long journeys or daily commuting. Its fuel-efficient engine and affordable price make it an ideal choice for families and budget-conscious drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "wagon_r_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/wagonr-launch-2022/car-colors/metallic-magma-grey_dual.webp",
    },
    price: 19000, // Price in dollars
    location: "Uttar Pradesh",
    country: "India",
    seater: '5',
    carType: 'Convertible Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "Maruti Fronx",
    description: "The Maruti Fronx is a compact and stylish crossover that offers a perfect blend of style, performance, and practicality. With its sleek design and spacious interior, the Fronx provides a comfortable and enjoyable ride for both driver and passengers. Its fuel-efficient engine and advanced features make it ideal for urban commuting or weekend getaways, while its affordable price ensures it's accessible to a wide range of drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "fronx_image",
      url: "https://nexaprod1.azureedge.net/-/media/feature/nexawebsitecarbrand/flash/brand-color/fronx-color-1500x700-nexa_blue.webp",
    },
    price: 20000, // Price in dollars
    location: "Gujarat",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Diesel', 
    rentStatus: 'unBooked'
  },
  {
    title: "Maruti Grand Vitara",
    description: "The Maruti Grand Vitara is a rugged and capable SUV that's perfect for off-road adventures and everyday driving alike. With its powerful engine and advanced four-wheel-drive system, the Grand Vitara can tackle rough terrain with ease. Its spacious interior and comfortable ride make it ideal for long journeys or daily commuting, while its affordable price ensures it's accessible to a wide range of drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "grand_vitara_image",
      url: "https://nexaprod4.azureedge.net/-/media/feature/nexawebsitecarbrand/grand-vitara/brand-color/688x360/nexa_blue.webp",
    },
    price: 25000, // Price in dollars
    location: "Rajasthan",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "Maruti Brezza",
    description: "The Maruti Brezza is a stylish and practical compact SUV that offers a perfect blend of style, performance, and comfort. With its bold design and spacious interior, the Brezza provides a comfortable and enjoyable ride for both driver and passengers. Its fuel-efficient engine and advanced features make it ideal for urban commuting or weekend getaways, while its affordable price ensures it's accessible to a wide range of drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "brezza_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-detail/new-brezza-launch-2022/car-profile-shot/splendid-silver-black-roof.webp",
    },
    price: 23000, // Price in dollars
    location: "Punjab",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "Maruti Ertiga",
    description: "The Maruti Ertiga is a versatile and practical MPV that offers ample space and comfort for both driver and passengers. With its spacious cabin and flexible seating arrangements, the Ertiga is perfect for large families or commercial use. Its fuel-efficient engine and affordable price make it an ideal choice for budget-conscious drivers looking for a reliable and practical car.",
    years: 2004,
    km: 5000,
    image: {
      filename: "ertiga_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/ertiga-new/midnight-black.webp",
    },
    price: 22000, // Price in dollars
    location: "Telangana",
    country: "India",
    seater: '7',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "Maruti Swift",
    description: "The Maruti Swift is a sporty and efficient hatchback that offers a perfect blend of style, performance, and practicality. With its sleek design and agile handling, the Swift is perfect for city driving or weekend getaways. Its fuel-efficient engine and advanced features make it ideal for urban commuting, while its spacious interior and comfortable ride ensure a pleasurable driving experience for both driver and passengers.",
    years: 2004,
    km: 5000,
    image: {
      filename: "swift_image",
      url: "https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/car/car-profile-shots/swift-launch-2021/pearlarcticwhitepearlmetallicmidnightblue.webp",
    },
    price: 21000, // Price in dollars
    location: "Maharashtra",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "Toyota Fortuner",
    description: "The Toyota Fortuner is a rugged and capable SUV designed to tackle any terrain with ease. With its powerful engine options and robust build quality, the Fortuner is perfect for adventurous families and off-road enthusiasts. Its spacious interior and advanced safety features ensure a comfortable and secure ride for all occupants, making it an ideal choice for exploring the diverse landscapes of India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "fortuner_image",
      url: "https://static3.toyotabharat.com/images/showroom/fortuner/fortuner-mmc/car-02.png",
    },
    price: 35000, // Price in dollars
    location: "Maharashtra",
    country: "India",
    seater: '7',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Diesel'
  },
  {
    title: "Toyota Glanza",
    description: "The Toyota Glanza is a stylish and efficient hatchback that offers a perfect blend of performance, comfort, and fuel economy. With its sleek design and advanced features, the Glanza is ideal for urban commuters and small families looking for a reliable and practical car. Its spacious cabin and smooth ride make it a joy to drive on both city streets and highways, while its fuel-efficient engine ensures low running costs for long-term savings.",
    years: 2004,
    km: 5000,
    image: {
      filename: "glanza_image",
      url: "https://static3.toyotabharat.com/images/showroom/glanza/new/colors/car-dark-grey.png",
    },
    price: 20000, // Price in dollars
    location: "Karnataka",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },

  {
    title: "Toyota Innova Crysta",
    description: "The Toyota Innova Crysta is a premium MPV that offers unmatched comfort, luxury, and versatility. With its elegant design and spacious cabin, the Innova Crysta provides a first-class travel experience for both driver and passengers. Whether you're on a long road trip or navigating city streets, the Innova Crysta delivers a smooth and refined ride, making it the ideal choice for families and business travelers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "innova_crysta_image",
      url: "https://static3.toyotabharat.com/images/showroom/innova-mmc/avant-garde-bronze-1600x600.png",
    },
    price: 32000, // Price in dollars
    location: "Uttar Pradesh",
    country: "India",
    seater: '7',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Diesel'
  },
  {
    title: "Toyota Urban Cruiser",
    description: "The Toyota Urban Cruiser is a compact SUV that combines rugged capability with urban sophistication. With its bold design and advanced features, the Urban Cruiser is perfect for navigating city streets or exploring off-road trails. Its spacious cabin and versatile cargo space make it ideal for both daily commuting and weekend adventures, while its fuel-efficient engine ensures low running costs for budget-conscious drivers.",
    years: 2004,
    km: 5000,
    image: {
      filename: "urban_cruiser_image",
      url: "https://static3.toyotabharat.com/images/showroom/urbancruiser-hyryder/colors/speedy-blue.png",
    },
    price: 22000, // Price in dollars
    location: "Delhi",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "Toyota Vellfire",
    description: "The Toyota Vellfire is a luxurious and spacious MPV that offers unparalleled comfort and refinement. With its elegant design and premium features, the Vellfire provides a serene and relaxing travel experience for both driver and passengers. Whether you're on a long road trip or running errands around town, the Vellfire delivers a smooth and luxurious ride, making every journey a pleasure.",
    years: 2004,
    km: 5000,
    image: {
      filename: "vellfire_image",
      url: "https://static3.toyotabharat.com/images/showroom/vellfire/colors/new-vellfire-black.png",
    },
    price: 45000, // Price in dollars
    location: "Kerala",
    country: "India",
    seater: '7',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "Toyota Yaris",
    description: "The Toyota Yaris is a stylish and practical sedan that offers a perfect balance of performance, comfort, and efficiency. With its sleek design and refined interior, the Yaris provides a premium driving experience for both driver and passengers. Whether you're commuting to work or exploring new destinations, the Yaris delivers a smooth and enjoyable ride, making it the ideal choice for discerning drivers across India.",
    years: 2004,
    km: 5000,
    image: {
      filename: "yaris_image",
      url: "https://scene7.toyota.eu/is/image/toyotaeurope/yaris-premiere-edition-retail-offer:Medium-Landscape?ts=1705419970735&resMode=sharp2&op_usm=1.75,0.3,2,0",
    },
    price: 23000, // Price in dollars
    location: "Punjab",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "KIA Optima",
    description: "The KIA Optima is a stylish and practical sedan, offering a comfortable ride and ample features for the price. With its sleek design and spacious interior, the Optima is perfect for families or commuters looking for a reliable and affordable vehicle.",
    years: 2004,
    km: 5000,
    image: {
      filename: "optima_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/k5/2024/trims/gt1-pkg/exterior/4f5866/360/34.png/jcr:content/renditions/desktop.png",
    },
    price: 28000, // Price in dollars
    location: "Maharashtra",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "KIA Sportage",
    description: "The KIA Sportage is a versatile and capable SUV, combining rugged performance with modern amenities. Whether you're navigating city streets or exploring off-road trails, the Sportage delivers a smooth and enjoyable driving experience. With its spacious interior and advanced safety features, it's the perfect choice for adventurers and families alike.",
    years: 2004,
    km: 5000,
    image: {
      filename: "sportage_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/sportage/2024/trims/x-pro-pres/exterior/101010/360/34.png/jcr:content/renditions/desktop.png",
    },
    price: 30000, // Price in dollars
    location: "Tamil Nadu",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "KIA Seltos",
    description: "The KIA Seltos is a compact SUV that blends style, performance, and technology. With its bold design and advanced features, the Seltos offers a thrilling driving experience whether you're commuting in the city or exploring the countryside. Its spacious cabin and versatile cargo space make it perfect for families on the go.",
    years: 2004,
    km: 5000,
    image: {
      filename: "seltos_image",
      url: "https://www.kia.com/content/dam/kia2/in/en/images/360vr/seltos/tiw51mc5fhh356/exterior/ewe/04-d.png",
    },
    price: 25000, // Price in dollars
    location: "Kerala",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    title: "KIA Carnival",
    description: "The KIA Carnival redefines the family minivan with its luxurious design and spacious interior. With seating for up to eight passengers and a host of innovative features, the Carnival is perfect for long road trips or daily errands. Its powerful engine and smooth handling ensure a comfortable ride for everyone onboard.",
    years: 2004,
    km: 5000,
    image: {
      filename: "carnival_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/ka4/2024/trims/sxp/exterior/616161/360/32.png/jcr:content/renditions/desktop.png",
    },
    price: 35000, // Price in dollars
    location: "Karnataka",
    country: "India",
    seater: '7',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    title: "KIA Rio",
    description: "The KIA Rio is a compact car that offers impressive fuel efficiency, a comfortable interior, and a smooth ride. Whether you're navigating city streets or cruising on the highway, the Rio delivers a fun and enjoyable driving experience. Its modern design and advanced technology make it a great choice for urban commuters.",
    years: 2004,
    km: 5000,
    image: {
      filename: "rio_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/rio-5-door/2023/trims/s-tech/exterior/f21a27/360/34.png/jcr:content/renditions/desktop.png",
    },
    price: 22000, // Price in dollars
    location: "Uttar Pradesh",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Petrol'
  },

  {
    title: "KIA Soul",
    description: "The KIA Soul is a compact crossover that stands out with its distinctive design and practicality. With its spacious cabin and versatile cargo space, the Soul is perfect for urban adventurers and weekend warriors alike. Its nimble handling and fuel-efficient engine make it a great choice for city driving.",
    years: 2004,
    km: 5000,
    image: {
      filename: "soul_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/soul/2024/trims/gt-line-designer/exterior/899fb6/360/34.png/jcr:content/renditions/desktop.png",
    },
    price: 24000, // Price in dollars
    location: "Telangana",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "KIA Telluride",
    description: "The KIA Telluride is a midsize SUV that offers impressive capability and luxury. With its rugged design and spacious interior, the Telluride is perfect for family adventures or daily commuting. Its advanced safety features and comfortable ride make it a top choice in its class.",
    years: 2004,
    km: 5000,
    image: {
      filename: "telluride_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/telluride/2024/trims/sx-prestige-x-pro/exterior/adb4c0/360/32.png/jcr:content/renditions/desktop.png",
    },
    price: 45000, // Price in dollars
    location: "Rajasthan",
    country: "India",
    seater: '7',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    title: "KIA Forte",
    description: "The KIA Forte is a compact sedan that combines fuel efficiency, practicality, and style. With its comfortable interior and smooth ride, the Forte is perfect for daily commuting or weekend getaways. Its advanced technology and safety features ensure a connected and confident driving experience.",
    years: 2004,
    km: 5000,
    image: {
      filename: "forte_image",
      url: "https://www.kia.com/us/content/dam/kia/us/en/vehicles/forte/2024/trims/gt-mt/exterior/565e6b/360/35.png/jcr:content/renditions/desktop.png",
    },
    price: 23000, // Price in dollars
    location: "West Bengal",
    country: "India",
    seater: '5',
    carType: 'Convertible Car',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "TATA Harrier",
    description: "The TATA Harrier is a stylish and powerful SUV that combines modern design with robust performance. With its bold exterior styling and spacious interior, the Harrier offers a comfortable and luxurious driving experience. Whether you're navigating city streets or exploring off-road trails, the Harrier delivers impressive handling and stability. Inside the cabin, you'll find premium materials and advanced technology that enhance comfort and convenience for all passengers.",
    years: 2004,
    km: 5000,
    image: {
      filename: "harrier_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/LunarWhite-0-1?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 25000, // Price in dollars
    location: "Mumbai",
    country: "India",
    seater: '7',
    carType: 'Off-Road Vehicle',
    carEngine: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    title: "TATA Nexon",
    description: "The TATA Nexon is a compact SUV that offers a perfect blend of style, performance, and practicality. With its sleek design and agile handling, the Nexon is ideal for urban adventurers and weekend warriors alike. Whether you're navigating city streets or tackling rough terrain, the Nexon delivers a smooth and comfortable ride. Inside the cabin, you'll find a spacious and versatile interior with advanced features that enhance safety and connectivity.",
    years: 2004,
    km: 5000,
    image: {
      filename: "nexon_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/DaytonaGrey-0-14?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 20000, // Price in dollars
    location: "Delhi",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "TATA Altroz",
    description: "The TATA Altroz is a premium hatchback that offers a perfect combination of style, comfort, and performance. With its striking design and spacious interior, the Altroz is perfect for urban commuters and weekend travelers alike. Whether you're navigating city streets or cruising on the highway, the Altroz delivers a smooth and responsive driving experience. Inside the cabin, you'll find a well-appointed interior with advanced features that elevate comfort and convenience.",
    years: 2004,
    km: 5000,
    image: {
      filename: "altroz_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/AvenueWhite-0?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 18000, // Price in dollars
    location: "Bangalore",
    country: "India",
    seater: '5',
    carType: 'Luxury Sports Car',
    carEngine: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    title: "TATA Safari",
    description: "The TATA Safari is a rugged and versatile SUV that is built to conquer any terrain. With its muscular design and powerful engine, the Safari offers impressive off-road capabilities and towing capacity. Whether you're exploring remote trails or towing heavy loads, the Safari delivers exceptional performance and durability. Inside the cabin, you'll find a spacious and comfortable interior with advanced features that enhance comfort and convenience for all passengers.",
    years: 2004,
    km: 5000,
    image: {
      filename: "safari_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/CosmicGold-0?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 30000, // Price in dollars
    location: "Chennai",
    country: "India",
    seater: '7',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Diesel'
  },
  {
    title: "TATA Tiago",
    description: "The TATA Tiago is a compact hatchback that offers a perfect balance of style and practicality. With its modern design and fuel-efficient engine, the Tiago is ideal for city commuters and small families. Whether you're running errands in the city or taking a weekend getaway, the Tiago delivers a smooth and comfortable ride. Inside the cabin, you'll find a spacious and well-appointed interior with advanced features that enhance comfort and convenience.",
    years: 2004,
    km: 5000,
    image: {
      filename: "tiago_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/OpalWhiteDT-0?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 15000, // Price in dollars
    location: "Kolkata",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Manual',
    fuelType: 'Petrol'
  },
  {
    title: "TATA Tigor",
    description: "The TATA Tigor is a compact sedan that offers a perfect combination of style, comfort, and performance. With its sleek design and spacious interior, the Tigor is perfect for city commuters and small families. Whether you're navigating city streets or cruising on the highway, the Tigor delivers a smooth and responsive driving experience. Inside the cabin, you'll find a well-appointed interior with advanced features that enhance comfort and convenience.",
    years: 2004,
    km: 5000,
    image: {
      filename: "tigor_image",
      url: "https://s7ap1.scene7.com/is/image/tatamotors/MagneticRed-0-2?$PO-750-500-S$&fit=crop&fmt=png-alpha",
    },
    price: 16000, // Price in dollars
    location: "Hyderabad",
    country: "India",
    seater: '4',
    carType: 'Luxury Sports Car',
    carEngine: 'Manual',
    fuelType: 'Diesel'
  },
  {
    title: "TATA Nexon EV",
    description: "The TATA Nexon EV is an all-electric compact SUV that offers zero-emission driving with impressive performance and range. With its bold design and spacious interior, the Nexon EV is perfect for eco-conscious commuters and urban adventurers. Whether you're navigating city streets or embarking on a road trip, the Nexon EV delivers a smooth and silent ride. Inside the cabin, you'll find a modern and tech-savvy interior with advanced features that enhance comfort and convenience.",
    years: 2004,
    km: 5000,
    image: {
      filename: "nexon_ev_image",
      url: "https://s7ap1.scene7.com/is/image/tatapassenger/PrestineWhite-0-1?$PO-850-600-S$&fit=crop&fmt=png-alpha",
    },
    price: 28000, // Price in dollars
    location: "Pune",
    country: "India",
    seater: '5',
    carType: 'Off-Road Vehicle',
    carEngine: 'Automatic',
    fuelType: 'Electric'
  },

];

module.exports = { data: sampleListings };