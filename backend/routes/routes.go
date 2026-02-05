package routes

import (
	"net/http"
	"todo-api/app/controllers"
)

func Init() {
	http.HandleFunc("/api/register", controllers.Register)
	http.HandleFunc("/api/login", controllers.Login)
}
