drop schema if exists brisca CASCADE;
create schema brisca;

set search_path=brisca;

CREATE TABLE "games" (
  id serial primary key,
  data jsonb not null,
  created_at timestamptz default now(),
  modified timestamptz
)
WITH (OIDS=FALSE);
CREATE INDEX games_data_players ON "games" USING GIN((data -> 'players'));
set search_path=public;