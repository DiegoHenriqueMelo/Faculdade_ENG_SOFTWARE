-- Diego Henrique Cunha de Melo - 25413 - Engenharia de Software1

-- 1 Alternativa B)
SELECT nm_departamento, id_localizacao
FROM tb_departamento

-- 2 Alternativa A) 
SALARIO = 12345678

-- 3 Alternativas B) E)

-- 4 Alternativas A) D)

-- 5 Alternativa B) D)
SELECT UNIQUE id_funcao FROM tb_empregado;
SELECT DISTINCT id_funcao FROM tb_empregado;

-- 6 Alternativas B) D) 

--7 Alternativas B) D)
select ' isto é um ' || null || ' teste com nulos' from dual
select null || 'test' || null as "Teste" from dual

-- 8 Alternativa D
select * from tb_empregado

-- 9 Alternativa B)

-- 10 Alternativa D)

-- 11 Alternativa C)

-- 12 Alternativa B)
SELECT sobrenome, id_funcao, SALARIO
FROM tb_empregado
WHERE id_função IN ('AS_REP', "MK_MAN")
AND salario BETWEEN 1000 AND 4000

-- 13 Alternativa C)
SELECT *
FROM tb_empregado
WHERE id_funcao IN (SA_REP, MK_MAN);

--14 Alternativa B)
SELECT nm_departamento
FROM tb_departamento
WHERE nm_departamento LIKE '%er%';

-- 15 Alternativa A) D)
WHERE percentual_comissao IS NULL
WHERE NOT(percentual_comissao IS NOT NULL)

-- 16 Alternativa A) C) D)e E)
WHERE salario <= 5000 AND salario >= 2000
WHERE salario BETWEEN 2000 AND 5000
WHERE salario >= 2000 AND salario <= 5000