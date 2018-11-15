CREATE TABLE picks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(212) NOT NULL REFERENCES users,
  season INTEGER NOT NULL,
  week SMALLINT NOT NULL,
  pick_to_lose VARCHAR(3) NOT NULL REFERENCES teams(abrv),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO picks (
  user_id,
  season,
  week,
  pick_to_lose
) VALUES ('abc123', 2018, 1, 'NE');