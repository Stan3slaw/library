INSERT INTO authors (name, surname) VALUES
('Marc', 'Randolph'),
('Abraham', 'Maslow');

INSERT INTO books (name, genre, description, number_of_pages, year, author_id) VALUES
('That Will Never Work', 'Business', 'In the tradition of Phil Knight''s Shoe Dog comes the incredible untold story of how Netflix went from concept to company-all revealed by co-founder and first CEO Marc Randolph.', 336, 2019, (SELECT id FROM authors WHERE surname = 'Randolph')),
('Hierarchy of Needs: A Theory of Human Motivation', 'Psychology', 'When Abraham H. Maslow introduced the world to Humanistic Theory, a ''third force'' in psychology was born (Behaviorism & Psychoanalytical theory being the first and second). As the name suggests, humanistic theory concerns itself with characteristics which are distinctly human.', 405, 1943, (SELECT id FROM authors WHERE surname = 'Maslow'));
