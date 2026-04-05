const bcrypt = require("bcryptjs");
const prisma = require("../db/prisma");

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

module.exports = {
  addNewUser,
  isValidUser,
};
