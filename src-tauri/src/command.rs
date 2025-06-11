use serde::{Deserialize, Serialize};
use tauri::command;

use crate::db::DB;

#[derive(Debug, Serialize, Deserialize)]
pub struct Person {
    pub name: String,
    pub age: i32,
}

#[command]
pub async fn create_person(name: String, age: i32) -> Result<(), String> {
    let db = DB.get().ok_or("DB not initialized")?;

    let person = Person { name, age };
    db.create("person")
        .content(&person)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[command]
pub async fn get_people() -> Result<Vec<Person>, String> {
    let db = DB.get().ok_or("DB not initialized")?;

    let res: Vec<Person> = db.select("person").await.map_err(|e| e.to_string())?;
    Ok(res)
}
