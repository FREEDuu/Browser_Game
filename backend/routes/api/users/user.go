package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"
)

func GetUsers(client *supabase.Client) gin.HandlerFunc {
	return func(c *gin.Context) {

		var results []map[string]interface{}
		err := client.DB.From("users").Select("*").Execute(&results)
		if err != nil {
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{"users": results})
	}
}
