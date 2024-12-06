package quote

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// Quote structure to parse API response
type Quote struct {
	HtmlCode string `json:"q"`
	Author   string `json:"a"`
}

func FetchQuote() Quote {
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
