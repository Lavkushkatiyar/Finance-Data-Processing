


const authorizeRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role

    if (!userRole) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const isAllowed = allowedRoles.includes(userRole)

    if (!isAllowed) {
      return res.status(403).json({ error: "Forbidden" })
    }

    next()
  }
}

module.exports = authorizeRoles