const db = require("../db");

const getAllProduct = async (req, res) => {
  try {
    const products = await db("Laptop").select("*");

    // Ép kiểu lại các giá trị numeric
    const formattedProducts = products.map((product) => ({
      ...product,
      gia: product.gia ? Number(product.gia) : product.gia, // Chuyển đổi gia thành số nếu tồn tại
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
    try {
        const product = await db("Laptop")
          .where({ idLaptop: req.params.id })
          .first();

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { tenLaptop, gia, idNhaSanXuat, 
            CPU,NPU,cardDoHoa, RAM, oCung,
            congKetNoi,ketNoiKhongDay,banPhim,
            camera,pin,nguon,thongSoVatLy,heDieuHanh,baoMat } = req.body;

        if (!tenLaptop || !gia || !idNhaSanXuat) {
            return res.status(400).json({ error: "Name, price and manufacturer ID are required" });
        }

        const [id] = await db("Laptop").insert({
            tenLaptop,
            gia,
            idNhaSanXuat,
            CPU,
            NPU,
            cardDoHoa,
            RAM,
            oCung,
            congKetNoi,
            ketNoiKhongDay,
            banPhim,
            camera,
            pin,
            nguon,
            thongSoVatLy,
            heDieuHanh,
            baoMat
        }).returning("idLaptop");

        const newProduct = await db("Laptop")
          .where({ idLaptop: id })
          .first();

        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { tenLaptop, gia, idNhaSanXuat, 
            CPU,NPU,cardDoHoa, RAM, oCung,
            congKetNoi,ketNoiKhongDay,banPhim,
            camera,pin,nguon,thongSoVatLy,heDieuHanh,baoMat } = req.body;

        const updatedProduct = await db("Laptop")
          .where({ idLaptop: req.params.id })
          .update({
            tenLaptop,
            gia,
            idNhaSanXuat,
            CPU,
            NPU,
            cardDoHoa,
            RAM,
            oCung,
            congKetNoi,
            ketNoiKhongDay,
            banPhim,
            camera,
            pin,
            nguon,
            thongSoVatLy,
            heDieuHanh,
            baoMat
          });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await db("Laptop")
          .where({ idLaptop: req.params.id })
          .del();

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// phân trang product
const getAllProductWithPagination = async (req, res) => {
  let page = parseInt(req.query.page) || 1; // Trang hiện tại
  let limit = parseInt(req.query.limit) || 8; // Số lượng sản phẩm mỗi trang

  // Kiểm tra để đảm bảo page và limit là số nguyên hợp lệ
  if (isNaN(page) || page <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Page phải là số nguyên lớn hơn 0",
    });
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Limit phải là số nguyên lớn hơn 0",
    });
  }

  try {
    // Truy vấn sản phẩm với phân trang
    const products = await db("Laptop")
      .select("*")
      .orderBy("idLaptop") // Đảm bảo sắp xếp theo idLaptop để phân trang chính xác
      .limit(limit) // Giới hạn số sản phẩm trên mỗi trang
      .offset((page - 1) * limit); // Bắt đầu từ sản phẩm nào

    const totalProductsResult = await db("Laptop").count("* as count").first();
    const totalCount = parseInt(totalProductsResult.count); // Ép kiểu về số nguyên
    const totalPages = Math.ceil(totalCount / limit); // Tính tổng số trang

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts: totalCount,
        },
      },
      message: "Lấy danh sách sản phẩm thành công",
    });
  } catch (err) {
    console.error("LỖI BACKEND:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm",
    });
  }
};


const getProductByManufacturerIdWithPagination = async (req, res) => {
  const manufacturerId = req.params.id;
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 8;

  if (isNaN(page) || page <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Page phải là số nguyên lớn hơn 0",
    });
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Limit phải là số nguyên lớn hơn 0",
    });
  }

  try {
    // Lấy sản phẩm theo idNhaSanXuat với phân trang
    const products = await db("Laptop")
      .where({ idNhaSanXuat: manufacturerId })
      .orderBy("idLaptop")
      .limit(limit)
      .offset((page - 1) * limit);

    // Đếm tổng số sản phẩm của nhà sản xuất này
    const totalProductsResult = await db("Laptop")
      .where({ idNhaSanXuat: manufacturerId })
      .count("* as count")
      .first();

    const totalCount = parseInt(totalProductsResult.count);
    const totalPages = Math.ceil(totalCount / limit);

    if (totalCount === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Không tìm thấy sản phẩm nào của nhà sản xuất này",
      });
    }

    return res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts: totalCount,
        },
      },
      message: "Lấy danh sách sản phẩm thành công",
    });
  } catch (err) {
    console.error("LỖI BACKEND:", err);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm",
    });
  }
};

// Export all controller functions at the end
module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductWithPagination,
    getProductByManufacturerIdWithPagination,
    
};