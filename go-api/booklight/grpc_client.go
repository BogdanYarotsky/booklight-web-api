package booklight

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func startGrpcClient(endpoint string) (*grpc.ClientConn, BooksClient, error) {
	credentials := insecure.NewCredentials()
	dialOption := grpc.WithTransportCredentials(credentials)
	conn, err := grpc.Dial(endpoint, dialOption)
	client := NewBooksClient(conn)
	return conn, client, err
}