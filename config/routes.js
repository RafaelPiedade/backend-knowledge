module.exports = app => {
   app.route('/users')
      .post(app.api.user.save)
      .get(app.api.user.get)

   app.route('/users/:id')
      .get(app.api.user.getById)
      .put(app.api.user.save)

   app.route('/categories')
      .get(app.api.category.get)
      .post(app.api.category.save)

   app.route('/categories/:id')
      .delete(app.api.category.remove)
      .put(app.api.category.save)
      .get(app.api.category.getById)
}
/*



*/