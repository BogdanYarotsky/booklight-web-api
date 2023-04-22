FROM golang:1.20

WORKDIR /app

COPY go-api/go.mod ./
COPY go-api/go.sum ./

RUN go mod download

COPY go-api/main.go ./
COPY go-api/booklight/* ./booklight/

RUN CGO_ENABLED=0 GOOS=linux go build -o /booklight

EXPOSE 8080
CMD ["/booklight"]