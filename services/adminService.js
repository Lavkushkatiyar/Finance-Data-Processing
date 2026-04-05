const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getUserService = async () => {
  const users = await prisma.user.findMany();
  return users;
};
const deleteUserService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("user doesn't exist");
  await prisma.user.delete({
    where: { id: userId },
  });
  return user;
};
const updateUserStatusService = async (userId, status) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("user doesn't exist");
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status }
  });
  return updatedUser;
};

module.exports = { getUserService, deleteUserService, updateUserStatusService };
