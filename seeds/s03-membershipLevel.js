exports.seed = async function (knex) {
  // Xóa hết dữ liệu cũ trong bảng MemberLevel
  await knex("MemberLevel").del();

  // Thêm dữ liệu mẫu
  await knex("MemberLevel").insert([
    {
      idLevel: 1,
      tenLevel: "Bronze",
      diemCanDat: 0,
    },
    {
      idLevel: 2,
      tenLevel: "Silver",
      diemCanDat: 100,
    },
    {
      idLevel: 3,
      tenLevel: "Gold",
      diemCanDat: 200,
    },
  ]);
};
