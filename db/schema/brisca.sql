drop schema if exists brisca CASCADE;
create schema brisca;

set search_path=brisca;

CREATE TABLE "games" (
  id serial primary key,
  data jsonb not null,
  access text,
  created_at timestamptz default now(),
  modified timestamptz
)
WITH (OIDS=FALSE);

CREATE INDEX games_modified ON "games" (modified);
CREATE INDEX games_data_players ON "games" USING GIN((data -> 'players'));

CREATE FUNCTION brisca.update_modified()
RETURNS trigger AS 
$$BEGIN
	NEW.modified = now();
	RETURN NEW;
END$$ LANGUAGE 'plpgsql';


CREATE TRIGGER game_modified BEFORE UPDATE ON brisca.games 
FOR EACH ROW
EXECUTE PROCEDURE brisca.update_modified();

set search_path=public;