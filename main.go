package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

var timer float32 = 0.0

func main() {
    router := gin.New()

    router.Static("/css", "template/css")
    router.Static("/js", "template/js")
    router.LoadHTMLGlob("template/*.html")

    router.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{"timer": timer})
    })

    if err := router.Run(); err != nil {
        panic(err)
    }
}
