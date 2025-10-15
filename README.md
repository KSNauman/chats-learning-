# Mini WhatsApp — Express & MongoDB

This repository demonstrates a **mini chat application** using **Express.js, EJS, and MongoDB**.  

## Core Features
- **CRUD Operations**:
  - Create new chat messages.
  - Read all chats or individual chats.
  - Update messages.
  - Delete messages.
- **MongoDB Integration**:
  - Stores chat data with `from`, `to`, `msg`, and timestamp.
- **Express Middleware**:
  - `method-override` for PUT & DELETE requests.
  - Async wrapper for error handling.
  - Custom `ExpressError` class for structured errors.
- **Views with EJS**:
  - `index.ejs` — list all chats.
  - `new.ejs` — add new chat.
  - `edit.ejs` — update existing chat.
  - `show.ejs` — view single chat.
