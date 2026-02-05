package config

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func DB() (*sql.DB, error) {
	dsn := "root:@tcp(127.0.0.1:3306)/genz_todo"
	return sql.Open("mysql", dsn)
}
