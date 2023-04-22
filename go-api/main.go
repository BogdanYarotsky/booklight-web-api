package main

import (
	"log"
	"os"

	"github.com/BogdanYarotsky/booklight/go-api/booklight"
)

func main() {
	grpcEndpoint := os.Getenv("GRPC_ENDPOINT")
	if (grpcEndpoint == "") {
		grpcEndpoint = "0.0.0.0:9090"
	} else {
		log.Printf("Found env var for grpc Endpoint: %v", grpcEndpoint)
	}
	booklight.StartHttpServer(grpcEndpoint, "0.0.0.0:8080")
}
