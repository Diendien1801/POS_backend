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
      tenLaptop: "Dell XPS 13",
      gia: 30000000,
      idNhaSanXuat: getManufacturerId("Dell"),
      CPU: "Intel Core i7",
      NPU: "Intel Iris Xe",
      cardDoHoa: "Intel Integrated Graphics",
      RAM: "16GB",
      oCung: "512GB SSD",
      congKetNoi: "USB-C, Thunderbolt 4",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.1",
      banPhim: "Backlit Keyboard",
      camera: "720p HD",
      amThanh: "Stereo Speakers",
      pin: "4-cell, 52Wh",
      nguon: "65W USB-C",
      thongSoVatLy: "1.2kg, 14mm thickness",
      heDieuHanh: "Windows 11",
      baoMat: "Fingerprint, TPM 2.0",
    },
    {
      tenLaptop: "MacBook Pro 14",
      gia: 45000000,
      idNhaSanXuat: getManufacturerId("Apple"),
      CPU: "Apple M2 Pro",
      NPU: "Apple Neural Engine",
      cardDoHoa: "M2 Pro GPU",
      RAM: "16GB",
      oCung: "1TB SSD",
      congKetNoi: "USB-C, Thunderbolt 4",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.3",
      banPhim: "Magic Keyboard",
      camera: "1080p HD",
      amThanh: "Spatial Audio",
      pin: "70Wh",
      nguon: "67W USB-C",
      thongSoVatLy: "1.6kg, 15.5mm thickness",
      heDieuHanh: "macOS Ventura",
      baoMat: "Touch ID, Secure Enclave",
    },
    {
      tenLaptop: "Asus ROG Strix G15",
      gia: 35000000,
      idNhaSanXuat: getManufacturerId("Asus"),
      CPU: "AMD Ryzen 9 5900HX",
      NPU: "N/A",
      cardDoHoa: "NVIDIA RTX 3070",
      RAM: "32GB",
      oCung: "1TB SSD",
      congKetNoi: "USB-A, HDMI, USB-C",
      ketNoiKhongDay: "Wi-Fi 6, Bluetooth 5.2",
      banPhim: "RGB Keyboard",
      camera: "No webcam",
      amThanh: "Dolby Atmos",
      pin: "90Wh",
      nguon: "240W AC Adapter",
      thongSoVatLy: "2.3kg, 27mm thickness",
      heDieuHanh: "Windows 11",
      baoMat: "Kensington Lock",
    },
  ]);
};
