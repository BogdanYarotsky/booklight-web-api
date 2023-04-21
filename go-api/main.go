package main

import (
	"github.com/BogdanYarotsky/booklight/go-api/booklight"
)

func main() {
	booklight.StartHttpServer("localhost:9090", "localhost:8080")
}
