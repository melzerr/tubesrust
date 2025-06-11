// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//   tauri::Builder::default()
//     .setup(|app| {
//       if cfg!(debug_assertions) {
//         app.handle().plugin(
//           tauri_plugin_log::Builder::default()
//             .level(log::LevelFilter::Info)
//             .build(),
//         )?;
//       }
//       Ok(())
//     })
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }
mod db;
mod command;

use db::init_db;
use command::{create_person, get_people};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Inisialisasi DB di async runtime
      tauri::async_runtime::spawn(async {
        if let Err(e) = init_db().await {
          eprintln!("Failed to connect to SurrealDB: {:?}", e);
        } else {
          println!("✅ Connected to SurrealDB!");
        }
      });

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      create_person,
      get_people,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
