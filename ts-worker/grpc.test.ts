/**
 * @jest-environment node
 */
import {
    Server,
    ServerCredentials,
    ChannelCredentials
} from "@grpc/grpc-js";

import {
    BooksServer,
    BooksService,
    BooksClient,
} from "./books";

describe("grpc-js-test", () => {
    it("compiles", () => {
        expect(BooksService).not.toBeUndefined();
    });

    // For some reason this is flakey on CI
    it("can create a server and a client", async () => {
        const server = new Server();
        const impl: BooksServer = {
            get: (_, callback) => callback(null, { books: [] })
        };
        server.addService(BooksService, impl);

        const port = await new Promise<number>((resolve, reject) => {
            server.bindAsync("localhost:0", ServerCredentials.createInsecure(), (err, port) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(port);
                }
            });
        });
        server.start();

        await new Promise((resolve) => setTimeout(resolve, 100));
        const client = new BooksClient(`localhost:${port}`, ChannelCredentials.createInsecure());
        expect(BooksClient.service).toEqual(BooksService);

        client.get({ query: "hello" }, (_, res) => {
            expect(res).toEqual({ books: [] });
        });

        await new Promise<void>((resolve) => {
            setTimeout(() => {
                server.tryShutdown(() => {
                    client.close();

                    resolve();
                });
            }, 100);
        });
    });
});