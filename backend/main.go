package main

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv" // Remove this line when deploying because fly.io will use fly secrets env variables
	supabase "github.com/nedpals/supabase-go"

	routes "browser_game/routes"
)

func main() {
	isDev := os.Getenv("GO_ENV") == "development"

	if isDev {
		// Load environment variables from .env file (only in local development environment)
		if err := godotenv.Load(); err != nil {
			fmt.Println("Error loading .env file")
			return
		}
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	anonKey := os.Getenv("SUPABASE_ANON_KEY")
	client := supabase.CreateClient(supabaseURL, anonKey)

	ctx := context.Background()
	_, err := client.Auth.SignIn(ctx, supabase.UserCredentials{
		Email:    os.Getenv("BACKEND_EMAIL"),
		Password: os.Getenv("BACKEND_PASS"),
	})
	if err != nil {
		panic(err)
	}

	r := routes.SetupRouter(client)
	r.Run(":3000")
}
