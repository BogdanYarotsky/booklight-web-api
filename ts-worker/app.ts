import * as grpc from '@grpc/grpc-js';
import { BooksService, BooksRequest, BooksResponse, BooksServer, Book } from './books';

const host = '0.0.0.0:9090';
const server = new grpc.Server();

const booksServer: BooksServer = {
    get: (call, callback) => {
        //if (!call.request.query) return;

        console.log(`(server) Got client message: ${call.request.query}`);

        // logic here
        const book: Book = {
            title: call.request.query,
            url: '',
            imageUrl: '',
            rating: 0,
            reviews: 0,
            authors: [],
            score: 0
        }

        const response: BooksResponse = {
            books: [book]
        };

        callback(null, response);
    }
};

server.addService(BooksService, booksServer);
server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
        if (err) {
            console.error(`Server error: ${err.message}`);
        } else {
            console.log(`Server bound on port: ${port}`);
            server.start();
        }
    }
);
