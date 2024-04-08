package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"
)

func GetGames(client *supabase.Client) gin.HandlerFunc {
	return func(c *gin.Context) {

		var results map[string]interface{}
		err := client.DB.From("games").Select("*").Single().Execute(&results)
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{"users": results})
	}
}
