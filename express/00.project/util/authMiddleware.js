module.exports = (req, res, next) => {
  const { admin, user } = req.session;
  console.log(req.url);

  const whileList = ['/cars', '/cars/new'];
  if ((admin && user) || whileList.includes(req.url)) {
    next();
  } else {
    res.render('sign-in')
  }
}