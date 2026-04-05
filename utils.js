const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const getToken = ({ id, role }, time = "1h") =>
  jwt.sign({ id, role: role.name }, JWT_SECRET, { expiresIn: time });

const addNewUser = async (name, email, password, roleName = "VIEWER") => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("user exists");

  let role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) {
    role = await prisma.role.create({
      data: { name: roleName, description: `${roleName} role` },
    });
  }

const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      roleId: role.id,
    },
    include: { role: true },
  });
  return user;
};

const isValidUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;

  return user;
};

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
  getToken,
  addNewUser,
  isValidUser,
  seedAdmin,
  prisma,
};
