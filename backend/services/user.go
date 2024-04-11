package services

import (
	"browser_game/models"

	"github.com/gin-gonic/gin"

	supabase "github.com/nedpals/supabase-go"
)

type UserService struct {
	supabaseClient *supabase.Client
}

func NewUserService(supabaseClient *supabase.Client) *UserService {
	return &UserService{
		supabaseClient: supabaseClient,
	}
}

func (s *UserService) CreateUser(c *gin.Context, user models.User) error {
	var results []map[string]interface{}
	err := s.supabaseClient.DB.From("users").Insert(user).Execute(&results)

	if err != nil {
		return err
	}

	return nil

}
