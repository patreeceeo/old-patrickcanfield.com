package main

import (
	"html/template"
	"net/http"
)

type Page struct {
	Title string
	Body  string
}

func handler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, nil)
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
