package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Static("/css", "template/css")
	router.Static("/js", "template/js")
	router.LoadHTMLGlob("template/*.html")

	router.GET("/", func(c *gin.Context) {
		quote := fetchQuote()

		c.HTML(http.StatusOK, "index.html", gin.H{
			"quote":  quote.HtmlCode,
			"author": quote.Author,
		})
	})

	port := os.Getenv("PORT")
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// Quote structure to parse API response
type Quote struct {
	HtmlCode string `json:"q"`
	Author   string `json:"a"`
}

func fetchQuote() Quote {
	resp, err := http.Get("https://zenquotes.io/api/quotes/")
	if err != nil {
		log.Fatalf("Error fetching quote: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	// Assume the response is an array.
	var quotes []Quote
	if err := json.Unmarshal(body, &quotes); err != nil {
		log.Fatalf("Error decoding JSON: %v", err)
	}

	if len(quotes) > 0 {
		return quotes[0]
	}

	return Quote{
		HtmlCode: "No quote available",
		Author:   "Unknown",
	}
}
