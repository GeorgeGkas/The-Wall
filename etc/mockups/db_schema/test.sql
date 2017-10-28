USE The_Wall;

INSERT INTO authors(
author_avatar,
author_description,
author_name,
author_email,
author_role)
VALUES(
"https://blog.georgegkas.com/img/georgegkas.jpg",
"Junior web developer and software engineer. Currently undergraduate student of Applied Informatics in University Of Macedonia, Greece.",
"George Gkasdrogkas",
"georgegkas@gmail.com",
"admin"
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"A blog (a truncation of the expression weblog)[1] is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts).",
"quote",
"Blog",
"published",
"0",
""
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"http://78.media.tumblr.com/ed0eb8e11164aa6dc312d76b8b3e47f2/tumblr_npa77oOnq51sey7b6o1_1280.jpg",
"img",
"The Cat",
"published",
"0",
""
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"oKbChvqADd0",
"video",
"[Moombahton] - Aero Chord - 4U [Monstercat Release]",
"published",
"0",
""
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"Journalism is the production and distribution of reports on the interaction of events, facts, ideas, and people that are the news of the day and that impacts society to at least some degree.",
"quote",
"Journalism",
"published",
"1",
"Concepts of the appropriate role for journalism varies between countries. In some nations, the news media is controlled by a government intervention, and is not a fully independent body.[1] In others, the news media is independent from the government but the profit motive is in tension with constitutional protections of freedom of the press. Access to freely available information gathered by independent and competing journalistic enterprises with transparent editorial standards can enable citizens to effectively participate in the political process. In the United States, journalism is protected by the freedom of the press clause in the First Amendment."
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"https://instagram.fath4-1.fna.fbcdn.net/t51.2885-15/e35/21985004_348528282258625_8430483806581948416_n.jpg",
"img",
"The Girl",
"published",
"1",
"A girl is a female human from birth through childhood and adolescence to attainment of adulthood when she becomes a woman. The term girl may also be used to mean a young woman,[1] and is often used as a synonym for daughter.[2]"
);

INSERT INTO posts(
author_email,
post_date,
post_content,
post_type,
post_title,
post_status,
post_has_article,
article_content
)
VALUES(
"georgegkas@gmail.com",
NOW(),
"dcyYFKeOT0o",
"video",
"[Trap]",
"published",
"1",
"Support on iTunes: http://monster.cat/1IoU5Mt
Support on Beatport: http://monster.cat/1SDJu2U
Support on Bandcamp: http://monster.cat/1Nfz9HE
---
Listen on Soundcloud: http://monster.cat/1fu62Vz
Listen on Spotify: http://monster.cat/1GD0sJA"
);
