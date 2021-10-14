export default headers => (_req, res, next) => {
    Object.entries(headers).forEach(([prop, value]) => res.header(prop, value))
    next()
  }
  