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

// Export all controller functions at the end
module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};