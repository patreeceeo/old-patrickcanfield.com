package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Page struct {
	question string
}

func handler(output http.ResponseWriter, r *http.Request) {
	tmpl := template.
		New("index.html").
		Delims("<%", "%>")
	tmpl.
		ParseFiles("index.html")
	tmpl.
		Execute(output, nil)
}

func handlerContactInfo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "{\"email\": \"patrick.canfield@icloud.com\"}")
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", handler)
	http.HandleFunc("/DS0LKX", handlerContactInfo)
	http.ListenAndServe(":8080", nil)
}
