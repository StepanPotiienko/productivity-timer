package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file. Proceeding with the default values.")
	}

	port, exists := os.LookupEnv("PORT")

	if !exists {
		log.Println("PORT not set; falling back to default 8080")
		port = "8080"
	}

	router := gin.Default()

	router.Static("/css", "template/css")
	router.Static("/js", "template/js")
	router.Static("/media", "template/media")
	router.LoadHTMLGlob("template/*.html")

	gin.SetMode(gin.ReleaseMode)

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	runAddress := fmt.Sprintf(":%s", port)
	defer log.Printf("Starting server on %s...", runAddress)

	if err := router.Run(runAddress); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
