package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.New()

    router.Static("/css", "template/css")
    router.Static("/js", "template/js")
    router.LoadHTMLGlob("template/*.html")

    router.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{})
    })

    if err := router.Run(); err != nil {
        panic(err)
    }
}
