# We need the first base image to build the go app. 
# We choose alpine as the second image to make it lightweight. It will only have the binary, run it and expose port 3000 

FROM golang:alpine3.18 AS builder

# Set working directory
WORKDIR /

# Copy go.mod and go.sum for dependency management
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy project code from local machine into image
COPY . .

# Build the application
RUN go build -o main ./main.go

# Use a smaller alpine image for the final container
FROM alpine:3.18

WORKDIR /

# Copy the built binary
COPY --from=builder main ./

EXPOSE 3000

# Start the application
CMD ["./main"]
