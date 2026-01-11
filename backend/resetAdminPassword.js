const bcrypt = require("bcrypt");
const { Admin } = require("./models");

async function reset() {
  const hash = await bcrypt.hash("123456", 10);

  await Admin.update(
    { password: hash },
    { where: { correo: "admin123@admin.com" } }
  );

  console.log("✅ Password actualizado correctamente");
  process.exit();
}

reset();
