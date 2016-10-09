DROP SCHEMA IF EXISTS brisca CASCADE;
CREATE SCHEMA brisca;

SET search_path = brisca;

CREATE FUNCTION brisca."update_modified"()
RETURNS trigger AS 
  $$BEGIN
    NEW.modified = now();
    RETURN NEW;
  END$$ LANGUAGE 'plpgsql';

CREATE TABLE brisca."games" (
  id serial primary key,
  data jsonb not null,
  access text default 'public',
  created_at timestamptz default now(),
  modified timestamptz
)
WITH (OIDS=FALSE);
CREATE INDEX games_modified ON "games" (modified);
CREATE INDEX games_data_players ON "games" USING GIN((data -> 'players'));
CREATE TRIGGER game_modified BEFORE UPDATE ON brisca.games 
FOR EACH ROW
  EXECUTE PROCEDURE brisca.update_modified();

CREATE TABLE brisca."members" (
  member_id bigint primary key,
  public jsonb not null,
  created_at timestamptz default now(),
  modified timestamptz
)
WITH (OIDS=FALSE);

CREATE VIEW brisca."vw_games" AS
SELECT g.id, g.data, json_agg(m) as player_data
FROM brisca.games g
LEFT JOIN (
  SELECT m.id::text as player_id,
    m.first as name,
    md.public
    FROM membership.members m
    LEFT JOIN brisca.members md ON m.id = md.member_id
) m ON g.data -> 'players' ? m.player_id
GROUP BY g.id;

SET search_path = public;