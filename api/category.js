module.exports = app => {
    const { existsOrError, notExistisOrError } = app.api.validation

    const save = (req, res) => {
        const category = req.body

        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado ')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {

        try {
            existsOrError(req.params.id, "Código da Categoria não informado.")

            const subCategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistisOrError(subCategory, 'Categoria possui Subcategorias')

            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })
            notExistisOrError(articles, 'Categoria possui Artigos')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).status(msg)
        }
    }

    const withPath = categories =>{
        const getParent = (categories, parentId)=>{
            let parent = categories.filter(parent = parent.id === parentId)
            return parent.length ? parent[0] : null
        }
    }
}