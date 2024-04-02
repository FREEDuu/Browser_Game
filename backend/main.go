package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	supabase "github.com/supabase-community/supabase-go"
)

var db = make(map[string]string)

func setupRouter() *gin.Engine {

	db["user_1"] = "Cracco"
	db["user_2"] = "Cannavacciuolo"
	db["user_3"] = "Bastianich"

	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/user/:name", func(c *gin.Context) {
		user := c.Params.ByName("name")
		value, ok := db[user]
		if ok {
			c.JSON(http.StatusOK, gin.H{"user": user, "value": value})
		} else {
			c.JSON(http.StatusOK, gin.H{"user": user, "status": "no value"})
		}
	})

	return r
}

func main() {
	r := setupRouter()

	supabaseURL := os.Getenv("SUPABASE_URL")
	anonKey := os.Getenv("SUPABASE_ANON_KEY")

	options := &supabase.ClientOptions{}
	client, err := supabase.NewClient(supabaseURL, anonKey, options)
	if err != nil {
		fmt.Println("cannot initialize client", err)
		return
	}
	print(client)

	r.Run(":3000")
}

func LoginHandler(c *gin.Context) {

}
