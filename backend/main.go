package main

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	supabase "github.com/nedpals/supabase-go"

	routes "browser_game/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Error loading .env file")
		return
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
