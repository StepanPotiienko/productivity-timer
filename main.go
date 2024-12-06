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
		log.Fatal("Error loading .env file")
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

	if _, ok := os.LookupEnv("SERVER_PORT"); !ok {
		log.Fatalf("Port cannot be an empty string!")
		os.Exit(1)
	}

	var port string = os.Getenv("SERVER_PORT")
	var runAddress string = fmt.Sprintf(":%s", port)

	if err := router.Run(runAddress); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
