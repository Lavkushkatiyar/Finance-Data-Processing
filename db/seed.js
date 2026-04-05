const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

const seedAdmin = async () => {
  const rolesToSeed = [
    { name: "ADMIN", description: "Administrator role" },
    { name: "ANALYST", description: "Analyst role" },
    { name: "VIEWER", description: "Regular user role" },
  ];

  for (const roleData of rolesToSeed) {
    let role = await prisma.role.findUnique({ where: { name: roleData.name } });
    if (!role) {
      await prisma.role.create({ data: roleData });
    }
  }

  const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });

  const existing = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash("123456", 10);
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@admin.com",
        passwordHash,
        roleId: adminRole.id,
      },
    });
  }
};

module.exports = {
  seedAdmin
};
