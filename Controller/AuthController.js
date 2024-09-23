const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Account } = require("../Schema/schema");

// Đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Tìm người dùng trong database
    const user = await Account.findOne({ username });

    // Kiểm tra xem người dùng tồn tại
    if (!user) {
      return res.status(404).json({ message: "Sai Tài khoản" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Tạo và gửi token JWT về cho client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng xuất
const logout = (req, res) => {
  res.json({ message: "Đăng xuất thành công" });
};

module.exports = { login, logout };
