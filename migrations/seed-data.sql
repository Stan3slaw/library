INSERT INTO authors (name, surname) VALUES
('Marc', 'Randolph'),
('Abraham', 'Maslow'),
('George', 'Orwell'),
('Agatha', 'Christie'),
('J.K.', 'Rowling'),
('Conan', 'Doyle');

INSERT INTO books (name, genre, description, number_of_pages, year, author_id, created_at, updated_at) VALUES
('That Will Never Work', 'Business', 'In the tradition of Phil Knight''s Shoe Dog comes the incredible untold story of how Netflix went from concept to company-all revealed by co-founder and first CEO Marc Randolph.', 336, 2019, (SELECT id FROM authors WHERE surname = 'Randolph'), '2024-02-01 12:00:00.000', '2024-02-01 12:00:00.000'),
('Hierarchy of Needs: A Theory of Human Motivation', 'Psychology', 'When Abraham H. Maslow introduced the world to Humanistic Theory, a ''third force'' in psychology was born (Behaviorism & Psychoanalytical theory being the first and second). As the name suggests, humanistic theory concerns itself with characteristics which are distinctly human.', 405, 1943, (SELECT id FROM authors WHERE surname = 'Maslow'), '2024-02-01 12:10:00.000', '2024-02-01 12:10:00.000'),
('1984', 'Dystopian', 'A dystopian social science fiction novel and cautionary tale which explores the dangers of totalitarianism.', 328, 1949, (SELECT id FROM authors WHERE surname = 'Orwell'), '2024-02-02 09:00:00.000', '2024-02-02 09:00:00.000'),
('Animal Farm', 'Political Satire', 'An allegorical novella reflecting events leading up to the Russian Revolution of 1917 and then on into the Stalinist era of the Soviet Union.', 112, 1945, (SELECT id FROM authors WHERE surname = 'Orwell'), '2024-02-02 09:15:00.000', '2024-02-02 09:15:00.000'),
('Murder on the Orient Express', 'Crime', 'A detective novel featuring Belgian detective Hercule Poirot in a gripping murder mystery aboard a long-distance passenger train.', 256, 1934, (SELECT id FROM authors WHERE surname = 'Christie'), '2024-02-02 09:30:00.000', '2024-02-02 09:30:00.000'),
('The Murder of Roger Ackroyd', 'Crime', 'One of Christie''s most famous and long-lived works, where Hercule Poirot retires to a village and becomes embroiled in a murder case.', 312, 1926, (SELECT id FROM authors WHERE surname = 'Christie'), '2024-02-02 09:45:00.000', '2024-02-02 09:45:00.000'),
('Harry Potter and the Philosopher''s Stone', 'Fantasy', 'The first novel in the Harry Potter series and J.K. Rowling''s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage.', 223, 1997, (SELECT id FROM authors WHERE surname = 'Rowling'), '2024-02-02 10:00:00.000', '2024-02-02 10:00:00.000'),
('Harry Potter and the Chamber of Secrets', 'Fantasy', 'The second novel in the Harry Potter series. The plot follows Harry''s second year at Hogwarts School of Witchcraft and Wizardry.', 251, 1998, (SELECT id FROM authors WHERE surname = 'Rowling'), '2024-02-02 10:15:00.000', '2024-02-02 10:15:00.000'),
('Harry Potter and the Prisoner of Azkaban', 'Fantasy', 'The third novel in the Harry Potter series. It follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry.', 317, 1999, (SELECT id FROM authors WHERE surname = 'Rowling'), '2024-02-02 10:30:00.000', '2024-02-02 10:30:00.000'),
('The Hound of the Baskervilles', 'Mystery', 'Another thrilling mystery by Arthur Conan Doyle, featuring the detective Sherlock Holmes.', 248, 1902, (SELECT id FROM authors WHERE surname = 'Doyle'), '2024-02-03 09:00:00.000', '2024-02-03 09:00:00.000'),
('A Study in Scarlet', 'Mystery', 'The first appearance of Sherlock Holmes and Dr. Watson, who would become two of the most famous characters in popular fiction.', 188, 1887, (SELECT id FROM authors WHERE surname = 'Doyle'), '2024-02-03 09:30:00.000', '2024-02-03 09:30:00.000'),
('The Sign of the Four', 'Mystery', 'The second novel featuring Sherlock Holmes, in which he solves a complex case involving treasure and a secret pact among four convicts.', 224, 1890, (SELECT id FROM authors WHERE surname = 'Doyle'), '2024-02-03 10:00:00.000', '2024-02-03 10:00:00.000');

