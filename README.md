# UJ Lost & Found Demo

This repository contains a small demo Lost & Found application configured for the University of Johannesburg (UJ).

Structure:
- src/ - backend (Express + SQLite)
- public/ - static frontend and brand assets
- migrations/ - SQL schema

Quick start:
1. npm install
2. npm start

The demo uses a local SQLite database stored in /data/lost_and_found.db. The first run will create the items table if it does not exist.

Site configuration is in public/site-config.json and is tailored for UJ by default.

License: MIT
