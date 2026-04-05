const jwt = require("jsonwebtoken")
const prisma = require("../db/prisma");

const authenticate = async (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" })
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null

  if (!token) return res.status(401).json({ error: "Invalid token format" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    console.log(decoded.id)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    })

    if (!user || user.status !== "ACTIVE") {
      return res.status(403).json({ error: "Access denied" })
    }

    req.user = {
      id: user.id,
      role: user.role.name
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

module.exports = authenticate   