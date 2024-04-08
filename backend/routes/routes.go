package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"

	api "browser_game/routes/api"
)

func SetupRouter(client *supabase.Client) *gin.Engine {
	r := gin.Default()

	// Check if coming requests are coming from "possibly" authenticated users. Then supabase will take care of validating the token.
	r.Use(func(c *gin.Context) {
		authToken := c.GetHeader("Authorization")
		if authToken != "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
			return
		}

		c.Next()
	})

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	apiRouter := r.Group("/api/")
	api.SetupAPIRoutes(apiRouter, client)

	return r
}
