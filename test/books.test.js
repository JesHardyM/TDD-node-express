import request from "supertest";
import BookModel from "../models/bookModel.js";
import {app, server} from "../app.js";
import db from "../database/db.js";

describe ("Test CRUD books", () => {
    describe("GET /books", () => {
        test('should return a response with status 200 and type json', async() => {
            const response = await request(app).get('/books').send();
				expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
    })
        test("Should return all books", async () => {
            const response = await request(app).get('/books').send();
				expect(response.body).toBeInstanceOf(Array);
            })
    
    //test for posting new book
    describe('POST /books',() =>{ 
        const newBook = {
            title: "test",
            author: "test",
            book_description: "test",
        }
        const wrongBook = {
            wrong_field:'test'
        }
        test('should return a response with status 200 and type json', async () =>{
            const response = await request(app).post('/books').send(newBook)
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('json')
        });
        test('should return a message book created successfully', async () =>{
            const response = await request(app).post('/books').send(newBook)
            expect(response.body.message).toContain("The book has been created successfully!")
        })
        test('should return a message insertion error If post wrong book ', async () =>{
            const response = await request(app).post('/books').send(wrongBook)
            expect(response.status).toBe(500);
            expect(response.body.message).toContain("Field 'title' doesn't have a default value")
        })
        afterAll(async() => {
            await BookModel.destroy({
                where:{title: "test"}
            })
        })
    })

///TEST TO UPDATE - THE U IN CRUD

        describe('PUT /books', () =>{  
            let createdBook = {};
            beforeEach(async () => {
                createdBook = await BookModel.create({ 
                    title: "test",
                    author: "test",
                    book_description: "test",
                });
            });

        afterAll(async() =>{
            await BookModel.destroy({where:{ id: createdBook.id}})
        })

    test('should return a response with status 201 and update successfully', async () => {
            const response = await request(app).put(`/books/${createdBook.id}`).send({title: "update test"});
            expect(response.status).toBe(201);
            expect(response.body.message).toContain("The book has been updated successfully!")
        })
    });

//DELETE -THE D IN CRUD

    describe('DELETE /books', () =>{
        let createdBook = {};
        beforeEach(async () => {
                createdBook = await BookModel.create({ 
                    title: "prueba",
                    author: "prueba",
                    book_description: "prueba",
                });
            })
        afterAll(async() =>{
            await BookModel.destroy({where:{ id: createdBook.id}})
        })
    test('should return a response with status 203 and deleted successfully', async () => {
            const response = await request(app).delete(`/books/${createdBook.id}`).send();
            expect(response.status).toBe(203);
            expect(response.body.message).toContain("The book has been deleted successfully!")
        })

            
    });

    afterAll(()=> {
        server.close();
        db.close()
    });

})
