package controllers

import (
	"browser_game/models"
	"browser_game/services"
	"net/http"

	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"
)

// Example direct implementation
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

// Example classic object oriented implementation
func NewUser(client *supabase.Client) gin.HandlerFunc {
	return func(c *gin.Context) {

		// construct user object from post request body
		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// instantiate user service and use its helper functions
		userService := services.NewUserService(client)
		err := userService.CreateUser(c, user)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"User creation failed": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
	}
}
