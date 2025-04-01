/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa toàn bộ dữ liệu cũ
  await knex("Laptop").del();

  // Lấy danh sách các nhà sản xuất để ánh xạ ID
  const manufacturers = await knex("Manufacturer").select("idNhaSanXuat", "tenNhaSanXuat");

  // Hàm lấy ID của nhà sản xuất theo tên
  const getManufacturerId = (name) => {
    const manufacturer = manufacturers.find((m) => m.tenNhaSanXuat === name);
    return manufacturer ? manufacturer.idNhaSanXuat : null;
  };

  // Insert dữ liệu laptop
  await knex("Laptop").insert([
    {
      idLaptop: 1,
      tenLaptop: "Dell XPS 13",
      gia: 30000000,
      idNhaSanXuat: getManufacturerId("Dell"),
      CPU: "Intel Core i7-1165G7",
      NPU: "Intel Iris Xe",
      cardDoHoa: "Intel Integrated Graphics",
      RAM: "16GB LPDDR4x",
      oCung: "512GB PCIe NVMe SSD",
      congKetNoi: "USB-C, Thunderbolt 4, headphone jack",
      ketNoiKhongDay: "Wi-Fi 6 (AX), Bluetooth 5.1",
      banPhim: "Backlit Keyboard, 1.3mm travel",
      camera: "720p HD webcam",
      amThanh: "Stereo Speakers with Waves MaxxAudio Pro",
      pin: "4-cell, 52WHr",
      nguon: "65W USB-C adapter",
      thongSoVatLy: "1.2kg, 14.8mm thickness",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "Fingerprint reader, TPM 2.0",
      hinhAnh: "dell_xps_13.jpg"
    },
    {
      idLaptop: 2,
      tenLaptop: "MacBook Pro 14",
      gia: 45000000,
      idNhaSanXuat: getManufacturerId("Apple"),
      CPU: "Apple M2 Pro 10-core",
      NPU: "16-core Neural Engine",
      cardDoHoa: "16-core integrated GPU",
      RAM: "16GB unified memory",
      oCung: "512GB SSD",
      congKetNoi: "3x Thunderbolt 4, HDMI, SD card, MagSafe 3",
      ketNoiKhongDay: "Wi-Fi 6E (802.11ax), Bluetooth 5.3",
      banPhim: "Magic Keyboard with Touch ID",
      camera: "1080p FaceTime HD camera",
      amThanh: "Six-speaker sound system with force-cancelling woofers",
      pin: "70WHr lithium-polymer",
      nguon: "67W USB-C Power Adapter",
      thongSoVatLy: "1.6kg, 15.5mm thickness",
      heDieuHanh: "macOS Ventura",
      baoMat: "Touch ID, Secure Enclave",
      hinhAnh: "macbook_pro_14.jpg"
    },
    {
      idLaptop: 3,
      tenLaptop: "Asus ROG Strix G15",
      gia: 35000000,
      idNhaSanXuat: getManufacturerId("Asus"),
      CPU: "AMD Ryzen 9 5900HX",
      NPU: "N/A",
      cardDoHoa: "NVIDIA GeForce RTX 3070 8GB",
      RAM: "32GB DDR4-3200",
      oCung: "1TB PCIe NVMe SSD",
      congKetNoi: "3x USB-A 3.2, 1x USB-C 3.2, HDMI 2.0b, Ethernet",
      ketNoiKhongDay: "Wi-Fi 6 (802.11ax), Bluetooth 5.2",
      banPhim: "Per-key RGB backlit keyboard",
      camera: "External USB webcam included",
      amThanh: "2x 4W speakers with Smart Amp Technology",
      pin: "90WHr",
      nguon: "240W AC power adapter",
      thongSoVatLy: "2.3kg, 27.2mm thickness",
      heDieuHanh: "Windows 11 Home",
      baoMat: "Kensington lock",
      hinhAnh: "asus_rog_strix_g15.jpg"
    },
    {
      idLaptop: 4,
      tenLaptop: "HP Spectre x360",
      gia: 32000000,
      idNhaSanXuat: getManufacturerId("HP"),
      CPU: "Intel Core i7-1260P",
      NPU: "Intel Neural Processing Unit",
      cardDoHoa: "Intel Iris Xe Graphics",
      RAM: "16GB LPDDR4x-4266",
      oCung: "1TB PCIe Gen4 NVMe SSD",
      congKetNoi: "2x Thunderbolt 4, 1x USB-A, microSD, 3.5mm audio",
      ketNoiKhongDay: "Wi-Fi 6E, Bluetooth 5.2",
      banPhim: "Edge-to-edge backlit keyboard",
      camera: "5MP IR camera with temporal noise reduction",
      amThanh: "Quad speakers by Bang & Olufsen",
      pin: "66WHr lithium-ion polymer",
      nguon: "65W USB Type-C adapter",
      thongSoVatLy: "1.4kg, 17mm thickness",
      heDieuHanh: "Windows 11 Pro",
      baoMat: "Fingerprint reader, IR camera for Windows Hello",
      hinhAnh: "hp_spectre_x360.jpg"
    },
  ]);
  
};