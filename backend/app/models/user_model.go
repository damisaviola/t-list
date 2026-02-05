package models

import (
	"database/sql"
)

type User struct {
	ID       int
	Name     string
	Email    string
	Password string
}

func CreateUser(db *sql.DB, u User) error {
	_, err := db.Exec(
		"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		u.Name, u.Email, u.Password,
	)
	return err
}

func GetUserByEmail(db *sql.DB, email string) (User, error) {
	var u User
	err := db.QueryRow(
		"SELECT id, name, email, password FROM users WHERE email = ?",
		email,
	).Scan(&u.ID, &u.Name, &u.Email, &u.Password)

	return u, err
}
