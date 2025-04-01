/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  try {
    // First, ensure we have the required Employee records
    const employees = await knex("Employee").select("idNhanVien");
    
    // If no employees exist, create them
    if (employees.length === 0) {
      console.log("Adding sample employees for orders...");
      
      // Make sure we have accounts for employees
      const accounts = await knex("Account").select("idAccount");
      if (accounts.length === 0) {
        // Add accounts if needed
        await knex("Account").insert([
          {
            idAccount: 1,
            username: "admin",
            matKhau: "$2a$10$X7IgbSY2oG6yCH7pX.PPOeYNe6.L1fJhCJjf.3KjbGm8sOJ3XUK2G", // admin123
            role: "admin"
          },
          {
            idAccount: 2,
            username: "employee1",
            matKhau: "$2a$10$IhHZJVCZcyRl/X03G5N9Ue5RMgUNF7BxMdA4blK6hxgFLTLsW3EYy", // employee123
            role: "employee"
          }
        ]);
      }
      
      // Add sample employees
      await knex("Employee").insert([
        {
          idNhanVien: 1,
          tenNhanVien: "Nguyễn Văn Quản Lý",
          tenVaTro: "Quản lý cửa hàng",
          CCCD: "079123456789",
          DOB: "1990-01-15",
          diaChi: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
          gioiTinh: "Nam",
          sdt: "0901234567",
          email: "quanly@laptopstore.com",
          salary: 25000000,
          idAccount: 1, // Link to admin account
          hinhAnh: "quanly_profile.jpg"
        },
        {
          idNhanVien: 2,
          tenNhanVien: "Trần Thị Nhân Viên",
          tenVaTro: "Nhân viên bán hàng",
          CCCD: "079234567891",
          DOB: "1995-05-20",
          diaChi: "456 Đường Lê Lợi, Quận 1, TP.HCM",
          gioiTinh: "Nữ", 
          sdt: "0912345678",
          email: "nhanvien1@laptopstore.com",
          salary: 12000000,
          idAccount: 2, // Link to employee1 account
          hinhAnh: "nhanvien1_profile.jpg"
        }
      ]);
    }
    
    // Make sure we have customers
    const customers = await knex("Customer").select("idCustomer");
    if (customers.length === 0) {
      console.log("Adding sample customers for orders...");
      
      // Add MemberLevel if needed
      const memberLevels = await knex("MemberLevel").select("idLevel");
      if (memberLevels.length === 0) {
        await knex("MemberLevel").insert({
          idLevel: 1,
          tenLevel: "Thường",
          diemCanDat: 0,
          moTa: "Thành viên thường"
        });
      }
      
      // Add sample customers
      await knex("Customer").insert([
        {
          idCustomer: 1,
          hoTen: "Khách hàng A",
          SDT: "0901234567",
          diemThuong: 0,
          idLevel: 1
        },
        {
          idCustomer: 2,
          hoTen: "Khách hàng B",
          SDT: "0912345678",
          diemThuong: 0,
          idLevel: 1
        },
        {
          idCustomer: 3,
          hoTen: "Khách hàng C",
          SDT: "0923456789",
          diemThuong: 0,
          idLevel: 1
        }
      ]);
    }
    
    // Clear existing orders
    await knex("Order").del();
    
    // Get valid employee IDs
    const validEmployees = await knex("Employee").select("idNhanVien");
    const validCustomers = await knex("Customer").select("idCustomer");
    
    console.log("Valid employee IDs:", validEmployees.map(e => e.idNhanVien));
    console.log("Valid customer IDs:", validCustomers.map(c => c.idCustomer));
    
    if (validEmployees.length === 0 || validCustomers.length === 0) {
      console.log("ERROR: Not enough valid employee or customer records found!");
      return;
    }
    
    // Create orders with valid references
    await knex("Order").insert([
      {
        idOrder: 1,
        idCustomer: validCustomers[0].idCustomer,
        idEmployee: validEmployees[0].idNhanVien,
        trangThai: "Hoàn thành",
        ngayDatHang: "2025-03-15",
        tongTien: 45000000,
        hinhThucThanhToan: "Tiền mặt",
        idPromotion: null
      },
      {
        idOrder: 2,
        idCustomer: validCustomers.length > 1 ? validCustomers[1].idCustomer : validCustomers[0].idCustomer,
        idEmployee: validEmployees.length > 1 ? validEmployees[1].idNhanVien : validEmployees[0].idNhanVien,
        trangThai: "Đang xử lý",
        ngayDatHang: "2025-03-25",
        tongTien: 65000000,
        hinhThucThanhToan: "Chuyển khoản",
        idPromotion: null
      },
      {
        idOrder: 3,
        idCustomer: validCustomers.length > 2 ? validCustomers[2].idCustomer : validCustomers[0].idCustomer,
        idEmployee: validEmployees[0].idNhanVien,
        trangThai: "Hoàn thành",
        ngayDatHang: "2025-03-30",
        tongTien: 30000000,
        hinhThucThanhToan: "Tiền mặt",
        idPromotion: null
      }
    ]);
    
    console.log("Orders created successfully");
    
    // Update customer loyalty points
    const completedOrders = await knex("Order")
      .where({ trangThai: "Hoàn thành" });
      
    for (const order of completedOrders) {
      const pointsToAdd = Math.floor(order.tongTien / 100000);
      
      await knex("Customer")
        .where({ idCustomer: order.idCustomer })
        .increment("diemThuong", pointsToAdd);
      
      // Add loyalty transaction if table exists
      try {
        await knex("LoyaltyTransaction").insert({
          idCustomer: order.idCustomer,
          loaiGiaoDich: "Tích điểm",
          diem: pointsToAdd,
          moTa: `Tích điểm từ đơn hàng #${order.idOrder}`,
          ngayGiaoDich: new Date()
        });
      } catch (err) {
        console.log("Note: LoyaltyTransaction table may not exist or have different schema");
      }
    }
    
  } catch (error) {
    console.error("Error in order seed file:", error);
    throw error;
  }
};