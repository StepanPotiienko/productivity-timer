package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	quote "github.com/StepanPotiienko/todo-productivity/quote"
	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file. Proceeding with the default values.")
	}

	router := gin.Default()

	router.Static("/css", "template/css")
	router.Static("/js", "template/js")
	router.LoadHTMLGlob("template/*.html")

	gin.SetMode(gin.ReleaseMode)

	router.GET("/", func(c *gin.Context) {
		var quote quote.Quote = quote.FetchQuote()

		c.HTML(http.StatusOK, "index.html", gin.H{
			"quote":  quote.HtmlCode,
			"author": quote.Author,
		})
	})

	port, exists := os.LookupEnv("PORT")

	if !exists {
		log.Println("PORT not set; falling back to default 8080")
		port = "8080"
	}

	runAddress := fmt.Sprintf(":%s", port)

	log.Printf("Starting server on %s...", runAddress)

	if err := router.Run(runAddress); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
