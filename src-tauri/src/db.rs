use surrealdb::engine::remote::ws::Client;
use surrealdb::opt::auth::Root;
use surrealdb::Surreal;
use once_cell::sync::OnceCell;

pub static DB: OnceCell<Surreal<Client>> = OnceCell::new();

pub async fn init_db() -> surrealdb::Result<()> {
    let db = Surreal::new::<Client>("localhost:8000").await?;

    db.signin(Root {
        username: "root",
        password: "root",
    })
    .await?;

    db.use_ns("test").use_db("test").await?;

    DB.set(db).unwrap();
    Ok(())
}
