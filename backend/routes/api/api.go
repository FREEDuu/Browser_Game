package api

import (
	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"

	game "browser_game/routes/api/game"
	users "browser_game/routes/api/users"
)

func SetupAPIRoutes(r *gin.RouterGroup, client *supabase.Client) {
	// Game routes
	gameRoutes := r.Group("/games")
	{
		gameRoutes.GET("/", game.GetGames(client))
		// ... other game routes
	}

	// User routes
	userRoutes := r.Group("/users")
	{
		userRoutes.GET("/", users.GetUsers(client))
		// ... other user routes
	}
}
