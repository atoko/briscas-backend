SELECT g.id, g.data,  json_agg(m)
FROM brisca.games g
LEFT JOIN (
	SELECT id::text as player_id,
		first as name
    FROM membership.members) m ON g.data -> 'players' ? m.player_id
GROUP BY g.id;