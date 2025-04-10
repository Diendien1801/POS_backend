exports.seed = async function(knex) {
    // Xóa hết dữ liệu cũ trong bảng Promotion
    await knex('Promotion').del();
  
    // Thêm dữ liệu mẫu
    await knex('Promotion').insert([
      {
        idPromotion: 1,
        tenKhuyenMai: 'Mừng khai trương',
        moTa: 'Giảm giá 10% toàn bộ laptop',
        giaTriGiam: 10,
        ngayBatDau: '2025-04-15',
        ngayKetThuc: '2025-04-30'
      },
      {
        idPromotion: 2,
        tenKhuyenMai: 'Black Friday',
        moTa: 'Giảm sâu tới 50%',
        giaTriGiam: 50,
        ngayBatDau: '2025-11-25',
        ngayKetThuc: '2025-11-30'
      },
      {
        idPromotion: 3,
        tenKhuyenMai: 'Back to school',
        moTa: 'Ưu đãi cho học sinh sinh viên',
        giaTriGiam: 15,
        ngayBatDau: '2025-08-01',
        ngayKetThuc: '2025-08-31'
      }
    ]);
  };
  