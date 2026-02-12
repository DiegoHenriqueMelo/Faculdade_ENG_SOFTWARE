-- 1: A, D
-- 2: B, E
-- 3: D
-- 4: A, D
-- 5: D
-- 6: B, C
-- 7: C
-- 8: A
-- 9: E
-- 10: B
-- 11: A
-- 12: A
-- 13: C
-- 14: A
-- 15: B
-- 16: B
-- 17: A
-- 18: C
-- 19: B
-- 20: D
-- 21: 
SELECT 
    first_name,
    last_name,
    ROUND(MONTHS_BETWEEN(SYSDATE, hire_date) / 12, 1) AS anos_trabalhados
FROM employees
WHERE (MONTHS_BETWEEN(SYSDATE, hire_date) / 12) > 10;
-- 22: 
SELECT 
    job_title,
    SUBSTR(job_title, 1, 5) || '*' AS cargo_formatado
FROM employees;
-- 23: 
SELECT 
    id_departamento,
    id_funcao,
    SUM(salario) AS salario_total
FROM tb_empregado
GROUP BY ROLLUP (id_departamento, id_funcao)
ORDER BY id_departamento, id_funcao;
-- 24:
SELECT *
FROM tb_empregado
WHERE REGEXP_LIKE(nome, '^S[th]');
-- 25:
SELECT 
    department_id,
    MIN(salary) AS menor_salario
FROM employees
GROUP BY department_id
HAVING MIN(salary) < (
    SELECT MIN(salary)
    FROM employees
    WHERE department_id = 50
);
