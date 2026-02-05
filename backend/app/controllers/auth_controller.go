package controllers

import (
	"encoding/json"
	"net/http"

	"todo-api/app/config"
	"todo-api/app/helpers"
	"todo-api/app/models"
)

/*
REGISTER USER
*/
func Register(w http.ResponseWriter, r *http.Request) {
	db, err := config.DB()
	if err != nil {
		http.Error(w, "Database error", 500)
		return
	}
	defer db.Close()

	var req models.User
	json.NewDecoder(r.Body).Decode(&req)

	// SIMPAN PASSWORD APA ADANYA (TANPA HASH)
	err = models.CreateUser(db, req)
	if err != nil {
		http.Error(w, "Email already used", 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message":"register success"}`))
}

/*
LOGIN USER
*/
func Login(w http.ResponseWriter, r *http.Request) {
	db, err := config.DB()
	if err != nil {
		http.Error(w, "Database error", 500)
		return
	}
	defer db.Close()

	var req models.User
	json.NewDecoder(r.Body).Decode(&req)

	user, err := models.GetUserByEmail(db, req.Email)
	if err != nil {
		http.Error(w, "Invalid email", 401)
		return
	}

	// BANDINKAN PASSWORD LANGSUNG
	if user.Password != req.Password {
		http.Error(w, "Invalid password", 401)
		return
	}

	token, err := helpers.GenerateToken(user.ID)
	if err != nil {
		http.Error(w, "Token error", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}
