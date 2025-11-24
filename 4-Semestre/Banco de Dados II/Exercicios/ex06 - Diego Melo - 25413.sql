-- Exercicio 1

INSERT INTO homem (id_homem, nome_homem, id_mulher)
VALUES(10, 'Anderson', NULL );

INSERT INTO homem (id_homem, nome_homem, id_mulher)
VALUES(20, 'Jander', 1);

INSERT INTO homem (id_homem, nome_homem, id_mulher)
VALUES(30, 'Rogério', 2);

-- Exercicio 2

INSERT INTO mulher (id_mulher, nome_mulher)
VALUES(1, 'Edna');

INSERT INTO mulher (id_mulher, nome_mulher)
VALUES(2, 'Stefanny');

INSERT INTO mulher (id_mulher, nome_mulher)
VALUES(3, 'Cássia');

-- Exercicio 3-a

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h, tb_mulher m
WHERE h.id_mulher = m.id_mulher;

-- Exercicio 3-b

SELECT * 
FROM tb_homem
NATURAL JOIN tb_mulher;

-- Exercicio 3-c

SELECT *
FROM tb_homem
JOIN tb_mulher
USING(id_mulher);

-- Exercicio 3-d

SELECT h.nome_homem, m.nome_mulher 
FROM tb_homem h
JOIN tb_mulher m ON(h.id_mulher = m.id_mulher);

-- Exercicio 3-e
SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
CROSS JOIN tb_mulher m
ORDER BY h.nome_homem ASC;
----------------------------------
SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h, tb_mulher m
ORDER BY h.nome_homem ASC;

-- Exercicio 4-a

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
LEFT JOIN tb_mulher m ON(h.id_mulher = m.id_mulher);

-- Exercicio 4-b

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
RIGHT JOIN tb_mulher m ON(h.id_mulher = m.id_mulher);

-- Exercicio 4-c

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
LEFT JOIN tb_mulher m USING(id_mulher);

-- Exercicio 4-d

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
RIGHT JOIN tb_mulher m USING(id_mulher);

-- Exercicio 4-e

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
LEFT JOIN tb_mulher m ON(h.id_mulher = m.id_mulher);
---------------------------------------------
SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
RIGHT JOIN tb_mulher m ON(h.id_mulher = m.id_mulher);

-- Exercicio 4-f

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
FULL JOIN tb_mulher m USING(id_mulher);

-- Exercicio 4-g

SELECT h.nome_homem, m.nome_mulher
FROM tb_homem h
FULL JOIN tb_mulher m ON(m.id_mulher = h.id_mulher);