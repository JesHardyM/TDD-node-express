import BookModel from '../models/bookModel.js';


//GET   -  the Read of CRUD

export const getAllBooks = async (req, res) => {
    try{
        const books = await BookModel.findAll()
        res.json(books)
    }catch (error){
        res.status(500).json({
            message: error.messge})
    }
}

//POST - the Create of CRUD

export const createBook = async (req, res) => {
    try{
        await BookModel.create(req.body)
        res.json({message: "The book has been created successfully!"})
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

//PUT-UPDATE THE U IN CRUD

export const updateBook = async (req, res) => {
    try {
        const book = await BookModel.findByPk(req.params.id);
        if (!book) {
            return res.status(500).json({ message: 'Book not found' });
        }
        await BookModel.update(req.body, {where: {id:req.params.id}} );
        res.status(201).json({ message: 'The book has been updated successfully!' });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//DELETE - THE D IN CRUD

export const deleteBook = async (req, res) => {
    try {
        await BookModel.destroy({where: {id:req.params.id}} );
        res.status(203).json({ message: 'The book has been deleted successfully!' });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};

