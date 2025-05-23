/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa dữ liệu cũ
  await knex("Laptop").del();

  await knex("Laptop").insert([
    // dell
    {
      tenLaptop: "Dell XPS 13 Plus",
      gia: 35000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i7-1260P",
      NPU: "Intel AI Boost",
      cardDoHoa: "Intel Iris Xe Graphics",
      RAM: "16GB LPDDR5",
      oCung: "1TB SSD",
      congKetNoi: "2x Thunderbolt 4, USB-C",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "Backlit keyboard",
      camera: "1080p IR Camera",
      amThanh: "Quad Speakers with Waves Audio",
      pin: "55WHr",
      nguon: "60W USB-C",
      thongSoVatLy: "1.23kg, 15.3mm",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "Fingerprint, IR camera",
      hinhAnh:
        "https://res.cloudinary.com/de5bnr44z/image/upload/v1744117358/dell_xp_13_ybpc6u.jpg",
    },
    {
      tenLaptop: "Dell Inspiron 14 5420",
      gia: 19000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i5-1240P",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, HDMI, USB-A",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.1",
      banPhim: "Standard",
      camera: "720p HD",
      amThanh: "Stereo speakers",
      pin: "54WHr",
      nguon: "65W AC",
      thongSoVatLy: "1.5kg",
      heDieuHanh: "Windows 11",
      baoMat: "TPM 2.0",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/0/_0003_n5420-3_a628e061ba664bbab9c45944.jpg",
    },
    {
      tenLaptop: "Dell Latitude 5430",
      gia: 28000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i7-1255U",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe",
      RAM: "16GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, HDMI, RJ45",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "Spill Resistant",
      camera: "FHD + IR",
      amThanh: "Realtek Audio",
      pin: "58WHr",
      nguon: "65W",
      thongSoVatLy: "1.36kg",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "Fingerprint, TPM",
      hinhAnh:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/14-5430/media-gallery/laptop-latitude-14-5430-gray-gallery-5.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=686&qlt=100,1&resMode=sharp2&size=686,402&chrss=full",
    },
    {
      tenLaptop: "Dell G15 5520",
      gia: 27000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i5-12500H",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GeForce RTX 3050",
      RAM: "16GB DDR5",
      oCung: "512GB SSD",
      congKetNoi: "HDMI, USB-C, USB-A",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "RGB Keyboard",
      camera: "720p",
      amThanh: "Nahimic Audio",
      pin: "56WHr",
      nguon: "180W Adapter",
      thongSoVatLy: "2.6kg",
      heDieuHanh: "Windows 11 Home",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g15-5530/media-gallery/black/non-touch/gray-black-1-zone-coral-kb/notebook-g15-5530-nt-coral-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=476&wid=655&qlt=100,1&resMode=sharp2&size=655,476&chrss=full",
    },
    {
      tenLaptop: "Dell Vostro 3520",
      gia: 16000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i3-1215U",
      NPU: "N/A",
      cardDoHoa: "Intel UHD Graphics",
      RAM: "8GB DDR4",
      oCung: "256GB SSD",
      congKetNoi: "USB-A, HDMI",
      ketNoiKhongDay: "Wi-Fi 5",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "41WHr",
      nguon: "45W",
      thongSoVatLy: "1.8kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/328473/dell-vostro-3530-i5-80gg93-glr-2-638666779657909959-750x500.jpg",
    },
    {
      tenLaptop: "Dell Precision 5570",
      gia: 58000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i9-12900H",
      NPU: "Intel AI Boost",
      cardDoHoa: "NVIDIA RTX A2000",
      RAM: "32GB DDR5",
      oCung: "1TB NVMe SSD",
      congKetNoi: "Thunderbolt, SD Card, HDMI",
      ketNoiKhongDay: "Wi-Fi 6E",
      banPhim: "Backlit",
      camera: "IR Camera",
      amThanh: "Stereo Speakers",
      pin: "86WHr",
      nguon: "130W",
      thongSoVatLy: "1.84kg",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "IR + TPM",
      hinhAnh:
        "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/333886/dell-inspiron-15-3520-i5-n5i5057w1-2-638724479214886489-750x500.jpg",
    },
    {
      tenLaptop: "Dell Alienware x15 R2",
      gia: 62000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i9-12900H",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GeForce RTX 3080 Ti",
      RAM: "32GB DDR5",
      oCung: "2TB SSD",
      congKetNoi: "Thunderbolt 4, USB-C, HDMI",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "RGB per-key",
      camera: "HD Camera",
      amThanh: "Dolby Audio",
      pin: "87WHr",
      nguon: "240W",
      thongSoVatLy: "2.36kg",
      heDieuHanh: "Windows 11 Home",
      baoMat: "Kensington Lock",
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/44/271090/dell-gaming-alienware-m15-r6-i7-70272633-3-750x500.jpg",
    },
    {
      tenLaptop: "Dell XPS 15 9520",
      gia: 42000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i7-12700H",
      NPU: "Intel AI Engine",
      cardDoHoa: "NVIDIA GeForce RTX 3050 Ti",
      RAM: "16GB DDR5",
      oCung: "1TB SSD",
      congKetNoi: "2x Thunderbolt 4, USB-C",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "Backlit",
      camera: "720p",
      amThanh: "Waves MaxxAudio",
      pin: "86WHr",
      nguon: "130W",
      thongSoVatLy: "2.0kg",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "TPM 2.0",
      hinhAnh:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=476&wid=774&qlt=100,1&resMode=sharp2&size=774,476&chrss=full",
    },
    {
      tenLaptop: "Dell Latitude 7330",
      gia: 32000000,
      idNhaSanXuat: 1,
      CPU: "Intel Core i7-1265U",
      NPU: "Intel NPU",
      cardDoHoa: "Intel Iris Xe",
      RAM: "16GB LPDDR5",
      oCung: "512GB SSD",
      congKetNoi: "Thunderbolt, HDMI",
      ketNoiKhongDay: "Wi-Fi 6E",
      banPhim: "Spill Resistant",
      camera: "IR + HD",
      amThanh: "MaxxAudio",
      pin: "58WHr",
      nguon: "65W Type-C",
      thongSoVatLy: "1.1kg",
      heDieuHanh: "Windows 11",
      baoMat: "IR + TPM",
      hinhAnh:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/latitude-14-3450-laptop/mg/notebook-latitude-14-3450-t-uma-gray-gallery-5.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=662&qlt=100,1&resMode=sharp2&size=662,402&chrss=full",
    },
    {
      tenLaptop: "Dell Chromebook 3110",
      gia: 8000000,
      idNhaSanXuat: 1,
      CPU: "Intel Celeron N4500",
      NPU: "N/A",
      cardDoHoa: "Intel UHD",
      RAM: "4GB LPDDR4x",
      oCung: "64GB eMMC",
      congKetNoi: "USB-A, USB-C",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.1",
      banPhim: "Anti-spill",
      camera: "HD",
      amThanh: "Stereo",
      pin: "42WHr",
      nguon: "45W",
      thongSoVatLy: "1.35kg",
      heDieuHanh: "Chrome OS",
      baoMat: "Verified Boot",
      hinhAnh:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/chromebook/11-3110/media_gallery/non_touch/laptop-chromebook-3110-nt-gallery-20.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=700&qlt=100,1&resMode=sharp2&size=700,402&chrss=full",
    },

    //hp
    {
      tenLaptop: "HP Pavilion 14",
      gia: 17500000,
      idNhaSanXuat: 2,
      CPU: "Intel Core i5-1235U",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe Graphics",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, USB-A, HDMI",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "Standard with backlit",
      camera: "720p HD",
      amThanh: "Bang & Olufsen Stereo",
      pin: "43WHr",
      nguon: "65W",
      thongSoVatLy: "1.41kg",
      heDieuHanh: "Windows 11",
      baoMat: "TPM 2.0",
      hinhAnh:
        "https://www.bhphotovideo.com/images/images2500x2500/hp_5yh29ua_aba_pavilion_laptop_15_cs2010nr_core_1473122.jpg",
    },
    {
      tenLaptop: "HP 240 G9",
      gia: 13500000,
      idNhaSanXuat: 2,
      CPU: "Intel Core i3-1215U",
      NPU: "N/A",
      cardDoHoa: "Intel UHD Graphics",
      RAM: "8GB DDR4",
      oCung: "256GB SSD",
      congKetNoi: "USB-A, HDMI, RJ-45",
      ketNoiKhongDay: "Wi-Fi 5",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "41WHr",
      nguon: "45W",
      thongSoVatLy: "1.47kg",
      heDieuHanh: "Windows 11 Home",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-glr-2-750x500.jpg",
    },
    {
      tenLaptop: "HP Envy x360 13",
      gia: 24500000,
      idNhaSanXuat: 2,
      CPU: "AMD Ryzen 5 7530U",
      NPU: "N/A",
      cardDoHoa: "AMD Radeon Graphics",
      RAM: "16GB LPDDR4x",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, USB-A, HDMI",
      ketNoiKhongDay: "Wi-Fi 6E",
      banPhim: "Backlit keyboard",
      camera: "1080p Full HD",
      amThanh: "Bang & Olufsen",
      pin: "51WHr",
      nguon: "65W",
      thongSoVatLy: "1.34kg",
      heDieuHanh: "Windows 11",
      baoMat: "Fingerprint sensor, TPM",
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/44/328815/hp-envy-x360-14-fa0048au-r7-a19bqpa-glr-2-750x500.jpg",
    },
    {
      tenLaptop: "HP Victus 16",
      gia: 28500000,
      idNhaSanXuat: 2,
      CPU: "Intel Core i5-12500H",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GeForce RTX 3050",
      RAM: "16GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, USB-A, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "Fullsize RGB",
      camera: "720p",
      amThanh: "Dual speakers",
      pin: "70WHr",
      nguon: "200W",
      thongSoVatLy: "2.3kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/44/321467/hp-victus-15-fb1022ax-r5-94f19pa-hinh-2-700x467.jpg",
    },
    {
      tenLaptop: "HP ProBook 450 G9",
      gia: 21000000,
      idNhaSanXuat: 2,
      CPU: "Intel Core i5-1235U",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe Graphics",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, USB-A, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "Spill-resistant",
      camera: "720p HD",
      amThanh: "Stereo with AI Noise Reduction",
      pin: "45WHr",
      nguon: "65W",
      thongSoVatLy: "1.79kg",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "TPM 2.0, Fingerprint",
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/44/327408/hp-probook-450-g10-i7-9h8h1pt-1-750x500.jpg",
    },

    //apple

    {
      tenLaptop: "MacBook Air M1 2020",
      gia: 21900000,
      idNhaSanXuat: 3,
      CPU: "Apple M1 8-core",
      NPU: "Apple Neural Engine 16-core",
      cardDoHoa: "Apple 7-core GPU",
      RAM: "8GB Unified Memory",
      oCung: "256GB SSD",
      congKetNoi: "2 x Thunderbolt / USB 4",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.0",
      banPhim: "Magic Keyboard with Touch ID",
      camera: "720p FaceTime HD",
      amThanh: "Stereo speakers with Dolby Atmos",
      pin: "49.9WHr",
      nguon: "30W USB-C Power Adapter",
      thongSoVatLy: "1.29kg",
      heDieuHanh: "macOS Sonoma",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m1-2020-gold-600x600.jpg",
    },
    {
      tenLaptop: "MacBook Air M2 2022",
      gia: 27900000,
      idNhaSanXuat: 3,
      CPU: "Apple M2 8-core",
      NPU: "Apple Neural Engine 16-core",
      cardDoHoa: "Apple 8-core GPU",
      RAM: "8GB Unified Memory",
      oCung: "256GB SSD",
      congKetNoi: "2 x Thunderbolt / USB 4, MagSafe 3",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.0",
      banPhim: "Magic Keyboard with Touch ID",
      camera: "1080p FaceTime HD",
      amThanh: "4-speaker system with Spatial Audio",
      pin: "52.6WHr",
      nguon: "30W USB-C Power Adapter",
      thongSoVatLy: "1.24kg",
      heDieuHanh: "macOS Sonoma",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_air_m2_1_1_1.jpg",
    },
    {
      tenLaptop: "MacBook Pro 13 M2 2022",
      gia: 31900000,
      idNhaSanXuat: 3,
      CPU: "Apple M2 8-core",
      NPU: "Apple Neural Engine 16-core",
      cardDoHoa: "Apple 10-core GPU",
      RAM: "8GB Unified Memory",
      oCung: "512GB SSD",
      congKetNoi: "2 x Thunderbolt / USB 4",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.0",
      banPhim: "Magic Keyboard with Touch Bar",
      camera: "720p FaceTime HD",
      amThanh: "Stereo speakers with Dolby Atmos",
      pin: "58.2WHr",
      nguon: "67W USB-C Power Adapter",
      thongSoVatLy: "1.4kg",
      heDieuHanh: "macOS Sonoma",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/e/hero_13__d1tfa5zby7e6_large00.jpg",
    },
    {
      tenLaptop: "MacBook Pro 14 M3 2023",
      gia: 48900000,
      idNhaSanXuat: 3,
      CPU: "Apple M3 8-core",
      NPU: "Apple Neural Engine 16-core",
      cardDoHoa: "Apple 10-core GPU",
      RAM: "16GB Unified Memory",
      oCung: "512GB SSD",
      congKetNoi: "3 x Thunderbolt 4, HDMI, SDXC, MagSafe 3",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.3",
      banPhim: "Magic Keyboard with Touch ID",
      camera: "1080p FaceTime HD",
      amThanh: "6-speaker system with Spatial Audio",
      pin: "70WHr",
      nguon: "70W USB-C Power Adapter",
      thongSoVatLy: "1.55kg",
      heDieuHanh: "macOS Sonoma",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-14-inch-m3-2023_1__2.png",
    },
    {
      tenLaptop: "MacBook Pro 16 M3 Pro 2023",
      gia: 67900000,
      idNhaSanXuat: 3,
      CPU: "Apple M3 Pro 12-core",
      NPU: "Apple Neural Engine 16-core",
      cardDoHoa: "Apple 18-core GPU",
      RAM: "18GB Unified Memory",
      oCung: "512GB SSD",
      congKetNoi: "3 x Thunderbolt 4, HDMI, SDXC, MagSafe 3",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.3",
      banPhim: "Magic Keyboard with Touch ID",
      camera: "1080p FaceTime HD",
      amThanh: "6-speaker system with Spatial Audio",
      pin: "100WHr",
      nguon: "140W USB-C Power Adapter",
      thongSoVatLy: "2.14kg",
      heDieuHanh: "macOS Sonoma",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-16-inch-m3-max-2023_1__1.png",
    },

    // Acer
    {
      tenLaptop: "Acer Aspire 3 A315",
      gia: 10900000,
      idNhaSanXuat: 4,
      CPU: "Intel Core i3-N305",
      NPU: "N/A",
      cardDoHoa: "Intel UHD Graphics",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-A, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 5, Bluetooth 5.0",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "36WHr",
      nguon: "45W",
      thongSoVatLy: "1.78kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_35__8_5.png",
    },
    {
      tenLaptop: "Acer Aspire 7 Gaming",
      gia: 18900000,
      idNhaSanXuat: 4,
      CPU: "AMD Ryzen 5 5625U",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GTX 1650 4GB",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-A, USB-C, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "Backlit Keyboard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "50WHr",
      nguon: "135W",
      thongSoVatLy: "2.1kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_6__1_14.png",
    },
    {
      tenLaptop: "Acer Swift 3 SF314",
      gia: 19900000,
      idNhaSanXuat: 4,
      CPU: "Intel Core i5-1240P",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe",
      RAM: "16GB LPDDR4X",
      oCung: "512GB SSD",
      congKetNoi: "USB-A, USB-C, HDMI",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "Backlit Keyboard",
      camera: "1080p",
      amThanh: "Stereo",
      pin: "56WHr",
      nguon: "65W",
      thongSoVatLy: "1.25kg",
      heDieuHanh: "Windows 11",
      baoMat: "Fingerprint reader",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_3__2_23.png",
    },
    {
      tenLaptop: "Acer Nitro 5 Gaming",
      gia: 23900000,
      idNhaSanXuat: 4,
      CPU: "Intel Core i5-12500H",
      NPU: "N/A",
      cardDoHoa: "NVIDIA RTX 3050 4GB",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, USB-A, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "RGB Backlit",
      camera: "720p",
      amThanh: "DTS:X Ultra",
      pin: "57.5WHr",
      nguon: "180W",
      thongSoVatLy: "2.5kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/3/5/35_1_11.jpg",
    },
    {
      tenLaptop: "Acer TravelMate B3",
      gia: 7990000,
      idNhaSanXuat: 4,
      CPU: "Intel Celeron N4020",
      NPU: "N/A",
      cardDoHoa: "Intel UHD Graphics 600",
      RAM: "4GB DDR4",
      oCung: "128GB eMMC",
      congKetNoi: "USB-A, HDMI",
      ketNoiKhongDay: "Wi-Fi 5",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "48WHr",
      nguon: "45W",
      thongSoVatLy: "1.4kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/s/dsdf_20__1.png",
    },

    // Asus

    {
      tenLaptop: "Asus VivoBook X1404",
      gia: 11900000,
      idNhaSanXuat: 5,
      CPU: "Intel Core i3-N305",
      NPU: "N/A",
      cardDoHoa: "Intel UHD Graphics",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-A, USB-C, HDMI",
      ketNoiKhongDay: "Wi-Fi 5, Bluetooth 5.0",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "SonicMaster",
      pin: "42WHr",
      nguon: "45W",
      thongSoVatLy: "1.5kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_17__6_20.png",
    },
    {
      tenLaptop: "Asus TUF Gaming F15",
      gia: 20900000,
      idNhaSanXuat: 5,
      CPU: "Intel Core i5-11400H",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GTX 1650",
      RAM: "8GB DDR4",
      oCung: "512GB SSD",
      congKetNoi: "USB-A, USB-C, HDMI, LAN",
      ketNoiKhongDay: "Wi-Fi 6",
      banPhim: "RGB Backlit",
      camera: "720p",
      amThanh: "DTS:X Ultra",
      pin: "48WHr",
      nguon: "150W",
      thongSoVatLy: "2.3kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_32__2_27.png",
    },
    {
      tenLaptop: "Asus ZenBook 14 OLED",
      gia: 23900000,
      idNhaSanXuat: 5,
      CPU: "Intel Core i5-1340P",
      NPU: "N/A",
      cardDoHoa: "Intel Iris Xe",
      RAM: "16GB LPDDR5",
      oCung: "512GB SSD",
      congKetNoi: "2 x Thunderbolt 4, HDMI, USB-A",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "Backlit, NumberPad",
      camera: "FHD IR",
      amThanh: "Harman/Kardon",
      pin: "75WHr",
      nguon: "65W",
      thongSoVatLy: "1.39kg",
      heDieuHanh: "Windows 11",
      baoMat: "Windows Hello",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-zenbook-14-oled-ux3405ma-pp152w-4.jpg",
    },
    {
      tenLaptop: "Asus ROG Strix G16",
      gia: 38900000,
      idNhaSanXuat: 5,
      CPU: "Intel Core i7-13650HX",
      NPU: "N/A",
      cardDoHoa: "NVIDIA RTX 4060 8GB",
      RAM: "16GB DDR5",
      oCung: "1TB SSD",
      congKetNoi: "USB-C, HDMI, LAN, USB-A",
      ketNoiKhongDay: "Wi-Fi 6E",
      banPhim: "RGB Per-Key",
      camera: "720p",
      amThanh: "Dolby Atmos",
      pin: "90WHr",
      nguon: "240W",
      thongSoVatLy: "2.5kg",
      heDieuHanh: "Windows 11",
      baoMat: "Firmware TPM",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_26__6_61.png",
    },
    {
      tenLaptop: "Asus Chromebook Flip",
      gia: 8490000,
      idNhaSanXuat: 5,
      CPU: "Intel Celeron N4020",
      NPU: "N/A",
      cardDoHoa: "Intel UHD 600",
      RAM: "4GB LPDDR4",
      oCung: "64GB eMMC",
      congKetNoi: "USB-C, USB-A",
      ketNoiKhongDay: "Wi-Fi 5",
      banPhim: "Standard",
      camera: "720p",
      amThanh: "Stereo",
      pin: "42WHr",
      nguon: "45W",
      thongSoVatLy: "1.2kg",
      heDieuHanh: "Chrome OS",
      baoMat: "Google Security Chip",
      hinhAnh:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_3_73.png",
    },
  ]);
};
