package booklight

import (
	"log"
	"net/http"
)

func StartHttpServer(grpcEndpoint string, httpEndpoint string) {
	conn, client, err := startGrpcClient(grpcEndpoint)
	if err != nil {
		log.Fatalf("failed to start grpc client: %v", err)
	}
	defer conn.Close()
	server := &booksHttpServer{client: client}
	log.Fatal(http.ListenAndServe(httpEndpoint, server))
}