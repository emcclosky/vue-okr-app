-- begin transaction; you must enter "commit;" to accept the changes
-- below or "abort;" to end the transaction (especially important if the
-- commands below fail. Let me know if you have any questions
begin;
-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  email TEXT UNIQUE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW()
);
-- HASHED PASSWORDS
create table if not exists passwords (
  id SERIAL PRIMARY KEY,
  password_hash VARCHAR NOT NULL,
  user_id INTEGER REFERENCES users(id)
);
-- OBJECTIVES
create table if not exists objectives (
  id SERIAL PRIMARY KEY,
  objective TEXT NOT NULL,
  description TEXT,
  completion_rate INTEGER,
  visibility TEXT NOT NULL DEFAULT 'visible',
  user_id INTEGER REFERENCES users(id),
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW(),
  published TIMESTAMP WITH TIME ZONE
);
-- KEY RESULTS
create table if not exists key_results (
  id SERIAL PRIMARY KEY,
  result TEXT NOT NULL,
  completion_rate INTEGER,
  objective_id INTEGER REFERENCES objectives(id) ON DELETE CASCADE,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW()
);
commit;