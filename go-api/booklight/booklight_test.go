package booklight

import (
	context "context"
	"encoding/json"
	"io"
	"log"
	"net"
	"net/http"
	"testing"

	"google.golang.org/grpc"
)

type server struct {
	UnimplementedBooksServer
}

func (s *server) Get(ctx context.Context, req *BooksRequest) (*BooksResponse, error) {
	book := &Book{
		Title: req.Query,
	}
	
	return &BooksResponse{
		Books: []*Book{book},
	}, nil
}

func TestHttpServerReturnsBooks(t *testing.T) {
	grpcEndpoint := "localhost:9090"
	httpEndpoint := "localhost:8080"

	go StartHttpServer(grpcEndpoint, httpEndpoint)
	go startGrpcServer(grpcEndpoint)

	title := "parenting"
	url :=  "http://" + httpEndpoint + "/api/search?q=" + title
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        t.Fatalf("Failed to build new request: %v", err)
    }

	// Send the request using the client
    resp, err := client.Do(req)
    if err != nil {
        t.Fatalf("Failed to make http request: %v", err)
    }

    // Read the response body
    defer resp.Body.Close()
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("Failed to read response body: %v", err)
    }

	booksResp := &BooksResponse{}
	err = json.Unmarshal(body, booksResp)
    if err != nil {
		str := string(body)
		t.Logf("This was returned from server: %v", str)
        t.Fatalf("Failed to unmarshal response body: %v", err)
    }

	// Check the title of the first book in the array
    if len(booksResp.Books) == 0 || booksResp.Books[0].Title != title {
        t.Errorf("Unexpected first book title. Expected: %s, Actual: %s", title, booksResp.Books[0].Title)
    }
}

func startGrpcServer(grpcEndpoint string) {
	listener, err := net.Listen("tcp", grpcEndpoint)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	RegisterBooksServer(s, &server{})
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}


