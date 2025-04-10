/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
        // Bảng Manufacturer (Nhà sản xuất)
        .createTable("Manufacturer", (table) => {
            table.increments("idNhaSanXuat").primary();
            table.string("tenNhaSanXuat").notNullable();
        })

        // Bảng Laptop
        .createTable("Laptop", (table) => {
            table.increments("idLaptop").primary();
            table.string("tenLaptop").notNullable();
            table.decimal("gia", 15, 2).notNullable();
            table.integer("idNhaSanXuat").unsigned().notNullable()
                .references("idNhaSanXuat").inTable("Manufacturer").onDelete("CASCADE");
            table.string("CPU");
            table.string("NPU");
            table.string("cardDoHoa");
            table.string("RAM");
            table.string("oCung");
            table.string("congKetNoi");
            table.string("ketNoiKhongDay");
            table.string("banPhim");
            table.string("camera");
            table.string("amThanh");
            table.string("pin");
            table.string("nguon");
            table.string("thongSoVatLy");
            table.string("heDieuHanh");
            table.string("baoMat");
            table.string("hinhAnh").defaultTo("laptop_default.jpg");
        })

        // Bảng Inventory (Kho hàng)
        .createTable("Inventory", (table) => {
            table.increments("idKho").primary();
            table.integer("idLaptop").unsigned().notNullable()
                .references("idLaptop").inTable("Laptop").onDelete("CASCADE");
            table.integer("soLuong").notNullable();
            table.string("viTriKho");
        })
         // Bảng Contractor (Nhà cung cấp)
         .createTable("Contractor", (table) => {
            table.increments("idContractor").primary();
            table.string("field"); // Cần định nghĩa rõ field này là gì
        })

        // Bảng StockImport (Phiếu nhập hàng)
        .createTable("StockImport", (table) => {
            table.increments("idPhieuNhap").primary();
            table.integer("idContractor").unsigned().notNullable()
                .references("idContractor").inTable("Contractor").onDelete("CASCADE");
            table.date("ngayNhap").notNullable();
            table.decimal("tongTien", 15, 2).notNullable();
        })

       

        // Bảng StockImportDetail (Chi tiết nhập hàng)
        .createTable("StockImportDetail", (table) => {
            table.increments("idStockImportDetail").primary();
            table.integer("idPhieuNhap").unsigned().notNullable()
                .references("idPhieuNhap").inTable("StockImport").onDelete("CASCADE");
            table.integer("idLaptop").unsigned().notNullable()
                .references("idLaptop").inTable("Laptop").onDelete("CASCADE");
            table.integer("soLuong").notNullable();
            table.decimal("giaNhap", 15, 2).notNullable();
        })
        // Bảng MemberLevel (Hạng thành viên)
        .createTable("MemberLevel", (table) => {
            table.increments("idLevel").primary();
            table.string("tenLevel").notNullable();
            table.integer("diemCanDat").notNullable();
        })


        // Bảng Customer (Khách hàng)
        .createTable("Customer", (table) => {
            table.increments("idCustomer").primary();
            table.string("hoTen").notNullable();
            table.string("SDT").notNullable().unique();
            table.integer("diemThuong").defaultTo(0);
            table.integer("idLevel").unsigned()
                .references("idLevel").inTable("MemberLevel").onDelete("SET NULL");
        })

        
        // Bảng LoyaltyTransaction (Giao dịch điểm thành viên)
        .createTable("LoyaltyTransaction", (table) => {
            table.increments("idTransaction").primary();
            table.integer("idCustomer").unsigned().notNullable()
                .references("idCustomer").inTable("Customer").onDelete("CASCADE");
            table.string("loaiGiaoDich").notNullable();
            table.integer("diem").notNullable();
            table.string("moTa");
        })

        // Bảng Promotion (Khuyến mãi)
        .createTable("Promotion", (table) => {
            table.increments("idPromotion").primary();
            table.string("tenKhuyenMai").notNullable();
            table.string("moTa");
            table.integer("giaTriGiam").notNullable();
            table.date("ngayBatDau").notNullable();
            table.date("ngayKetThuc").notNullable();
        })

        // Bảng PromotionCustomer (Khách hàng sử dụng khuyến mãi)
        .createTable("PromotionCustomer", (table) => {
            table.increments("id").primary();
            table.integer("idCustomer").unsigned().notNullable()
                .references("idCustomer").inTable("Customer").onDelete("CASCADE");
            table.integer("idPromotion").unsigned().notNullable()
                .references("idPromotion").inTable("Promotion").onDelete("CASCADE");
        })

        // Bảng Account (Tài khoản nhân viên)
        .createTable("Account", (table) => {
            table.increments("idAccount").primary();
            table.string("username").notNullable().unique();
            table.string("matKhau").notNullable();
            table.string("role").notNullable();
        })

        // Bảng Employee (Nhân viên)
        .createTable("Employee", (table) => {
            table.increments("idNhanVien").primary();
            table.string("tenNhanVien").notNullable();
            table.string("tenVaTro");
            table.string("CCCD").unique();
            table.date("DOB").notNullable();
            table.string("diaChi");
            table.string("gioiTinh");
            table.string("sdt").notNullable().unique();
            table.string("email").notNullable().unique();
            table.decimal("salary", 15, 2);
            table.integer("idAccount").unsigned()
                .references("idAccount").inTable("Account").onDelete("SET NULL");
            table.string("hinhAnh").defaultTo("employee_default.jpg");
        })

        
        // Bảng Order (Đơn hàng)
        .createTable("Order", (table) => {
            table.increments("idOrder").primary();
            table.integer("idCustomer").unsigned().notNullable()
                .references("idCustomer").inTable("Customer").onDelete("CASCADE");
            table.integer("idEmployee").unsigned()
                .references("idNhanVien").inTable("Employee").onDelete("SET NULL");
            table.string("trangThai").notNullable();
            table.date("ngayDatHang").notNullable();
            table.decimal("tongTien", 15, 2).notNullable();
            table.string("hinhThucThanhToan").notNullable();
            table.integer("idPromotion").unsigned()
                .references("idPromotion").inTable("Promotion").onDelete("SET NULL");
        })

        // Bảng OrderDetail (Chi tiết đơn hàng)
        .createTable("OrderDetail", (table) => {
            table.increments("idOrderDetail").primary();
            table.integer("idOrder").unsigned().notNullable()
                .references("idOrder").inTable("Order").onDelete("CASCADE");
            table.integer("idLaptop").unsigned().notNullable()
                .references("idLaptop").inTable("Laptop").onDelete("CASCADE");
            table.integer("soLuong").notNullable();
            table.decimal("donGia", 15, 2).notNullable();
            table.decimal("thanhTien", 15, 2).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists("OrderDetail")
        .dropTableIfExists("Order")
        .dropTableIfExists("Employee")
        .dropTableIfExists("Account")
        .dropTableIfExists("PromotionCustomer")
        .dropTableIfExists("Promotion")
        .dropTableIfExists("LoyaltyTransaction")
        .dropTableIfExists("Customer")
        .dropTableIfExists("MemberLevel")
        .dropTableIfExists("StockImportDetail")
        .dropTableIfExists("StockImport")
        .dropTableIfExists("Contractor")
        .dropTableIfExists("Inventory")
        .dropTableIfExists("Laptop")
        .dropTableIfExists("Manufacturer");
};
