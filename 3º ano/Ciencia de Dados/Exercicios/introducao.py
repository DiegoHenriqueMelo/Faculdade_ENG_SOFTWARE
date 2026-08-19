# =============================================================================
# Introdução ao Python - Ciência de Dados
# Material de estudo: tipos, operadores, condicionais, laços,
# estruturas de dados, funções e I/O.
# =============================================================================


# -----------------------------------------------------------------------------
# 1. NÚMEROS
# -----------------------------------------------------------------------------
# Python 3 possui três tipos numéricos embutidos:
#   int     -> inteiros, sem limite de tamanho (ex.: 1, -42, 10**100)
#   float   -> ponto flutuante, precisão dupla (ex.: 1.5, 3.0)
#   complex -> números complexos (ex.: 2 + 3j)

# Os nomes dos tipos também funcionam como funções de conversão (casting):
int(1)      # 1   -> int a partir de int (sem efeito)
int('9')    # 9   -> converte a string '9' no inteiro 9
float(1)    # 1.0 -> converte o inteiro 1 no float 1.0


# -----------------------------------------------------------------------------
# 2. OPERAÇÕES NUMÉRICAS
# -----------------------------------------------------------------------------
# Regra importante: se um dos operandos for float, o resultado também é float.
3 + 2       # 5    -> int + int = int
3 + 4.2     # 7.2  -> int + float = float
4 / 2       # 2.0  -> o operador / SEMPRE devolve float, mesmo em divisão exata
5 / 2       # 2.5  -> use // para divisão inteira (5 // 2 = 2) e % para o resto


# -----------------------------------------------------------------------------
# 3. VARIÁVEIS E TIPOS
# -----------------------------------------------------------------------------
# Python é de tipagem dinâmica: o tipo é inferido pelo valor atribuído,
# não é preciso declará-lo.
valor_int = 3           # int
valor_float = 1.5       # float
string = "Olá, mundo!"  # str
val_bool = True         # bool (True / False, sempre com inicial maiúscula)

# Ao misturar int e float, Python promove o resultado para o tipo mais amplo.
soma = valor_int + valor_float  # 4.5 (float)


# -----------------------------------------------------------------------------
# 4. CONVERSÃO ENTRE TIPOS (casting)
# -----------------------------------------------------------------------------

# int -> str: útil para concatenar números em textos.
a = 100
b = str(a)      # '100' (agora é texto: "100" + "0" daria "1000", não 1000)

# float -> int: a parte decimal é TRUNCADA, não arredondada.
# int(12.9) resultaria em 12. Para arredondar, use round().
c = 12.0
d = int(c)      # 12

# int -> float: apenas acrescenta a parte decimal.
e = 19
f = float(e)    # 19.0


# -----------------------------------------------------------------------------
# 5. STRINGS
# -----------------------------------------------------------------------------

# Aspas triplas preservam quebras de linha e indentação, ideais para textos de
# várias linhas (ex.: mensagens de ajuda de um programa de linha de comando).
# A barra invertida no fim da primeira linha evita uma linha em branco logo
# após a abertura das aspas.
print("""\
    Uso: conssulta_base[OPCOES]
    -h Exibe saída de ajuda
    -U url Url do dataset
""")

# ATENÇÃO: usar 'str' como nome de variável sobrescreve a função embutida str().
# A partir daqui, str(10) deixa de funcionar no restante do arquivo.
# Em código real, prefira um nome como 'nome'.
str = "Diego"

# Indexação e fatiamento (slicing): string[inicio:fim], com 'fim' EXCLUSIVO.
str[0]      # 'D'   -> os índices começam em 0
str[1:4]    # 'ieg' -> caracteres 1, 2 e 3 (o 4 fica de fora)
str[2:]     # 'ego' -> do índice 2 até o final
str[:3]     # 'Die' -> do início até o índice 2
len(str)    # 5     -> quantidade de caracteres

# Operadores aplicados a strings:
"D" in str      # True    -> 'in' testa se a substring existe
"z" in str      # False
"D" + "iego"    # 'Diego' -> + concatena
"D" * 3         # 'DDD'   -> * repete

# Métodos de string (devolvem um NOVO valor: strings são imutáveis):
"diego".capitalize()      # 'Diego' -> primeira letra maiúscula
"diego".count("i")        # 1       -> quantas vezes o trecho aparece
"diego".startswith("d")   # True    -> começa com o trecho?
"diego".endswith("z")     # False   -> termina com o trecho?

# Conversão entre string e lista, e substituição de trechos:
"Diego Melo".split(" ")                   # ['Diego', 'Melo'] -> quebra a string em lista
" ".join(["Diego", "Melo"])               # 'Diego Melo'      -> junta a lista com o separador
"Diego Melo".replace("Melo", "Henrique")  # 'Diego Henrique'  -> troca as ocorrências


# -----------------------------------------------------------------------------
# 6. ESTRUTURAS CONDICIONAIS
# -----------------------------------------------------------------------------
# Em Python o bloco é delimitado pela INDENTAÇÃO (4 espaços por convenção),
# e não por chaves. Os dois-pontos abrem o bloco.

nota = 7.5

# if / else: dois caminhos possíveis.
if nota >= 7:
    print("Aprovado")
else:
    print("Reprovado")

# if / elif / else: encadeamento de condições.
# São testadas de cima para baixo e a execução para na primeira verdadeira,
# por isso 'nota >= 5' só é avaliada quando 'nota >= 7' for falsa.
if nota >= 7:
    print("Aprovado")
elif nota >= 5:
    print("Recuperação")
else:
    print("Reprovado")


# -----------------------------------------------------------------------------
# 7. ESTRUTURAS DE REPETIÇÃO (laços)
# -----------------------------------------------------------------------------

cont = 1

# While: repete ENQUANTO a condição for verdadeira.
# Use quando não se sabe de antemão o número de repetições.
# O incremento (cont += 1) é obrigatório: sem ele o laço nunca termina.
while cont <= 10:
    print(cont)
    cont += 1

# range(): gera uma sequência de números sob demanda, por isso envolvemos em
# list() apenas para visualizar os valores.
#   range(fim)                -> de 0 até fim-1
#   range(inicio, fim)        -> de inicio até fim-1
#   range(inicio, fim, passo) -> de inicio até fim-1, saltando de 'passo' em 'passo'
print(list(range(10)))          # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(list(range(1, 5)))        # [1, 2, 3, 4] -> o 5 é excluído
print(list(range(2, 10, 3)))    # [2, 5, 8]    -> 11 ultrapassaria o limite

# For: percorre os itens de uma sequência.
# Use quando o número de repetições é conhecido.
for i in range(5):          # imprime 0, 1, 2, 3, 4
    print(i)

for i in range(1, 5):       # imprime 1, 2, 3, 4
    print(i)

for i in range(2, 10, 3):   # imprime 2, 5, 8
    print(i)


# -----------------------------------------------------------------------------
# 8. ESTRUTURAS DE DADOS
# -----------------------------------------------------------------------------
# Nas chamadas abaixo, [index] e [value] são PLACEHOLDERS: representam onde
# entram o índice e o valor desejados (ex.: lista.pop(2), lista.remove(4)).
# Executadas como estão, resultariam em erro de nome indefinido.

# --- Lista ---
# Coleção ORDENADA e MUTÁVEL, definida com colchetes [].
# Aceita elementos repetidos e de tipos diferentes.
lista = [1, 2, 3, 4, 5]

print(lista)        # [1, 2, 3, 4, 5]
print(len(lista))   # 5 -> quantidade de elementos

# Métodos que MODIFICAM a lista original (in-place):
lista.append(6)                 # adiciona 6 ao final       -> [1, 2, 3, 4, 5, 6]
lista.pop()                     # remove e retorna o último -> 6
lista.pop([index])              # remove e retorna o elemento do índice informado
lista.remove([value])           # remove a PRIMEIRA ocorrência do valor
lista.insert([index], [value])  # insere o valor na posição indicada
lista.clear()                   # esvazia a lista
lista.sort()                    # ordena em ordem crescente
lista.reverse()                 # inverte a ordem dos elementos

# Consulta (não modifica a lista):
lista.count([value])    # quantas vezes o valor aparece na lista

# Fatiamento e indexação, iguais aos de string:
lista[::-1]     # cópia invertida (passo -1), sem alterar a original
lista[0:2]      # elementos dos índices 0 e 1 (o 2 é excluído)
lista[-1]       # último elemento (índices negativos contam do fim)
lista[0] = 10   # listas são mutáveis: dá para atribuir direto num índice

# --- Tupla ---
# Coleção ORDENADA e IMUTÁVEL, definida com parênteses ().
# Depois de criada não pode ser alterada: não possui append, pop nem atribuição
# por índice. Use quando os dados não devem mudar (ex.: coordenadas, constantes).
tupla = (1, 2, 3, 4, 5)

print(tupla)        # (1, 2, 3, 4, 5)
print(len(tupla))   # 5
print(tupla[0])     # 1 -> a leitura por índice funciona normalmente
print(tupla[-1])    # 5
print(tupla[0:2])   # (1, 2) -> o fatiamento devolve outra tupla

# --- Conjunto (set) ---
# Coleção NÃO ORDENADA de elementos ÚNICOS, definida com chaves {}.
# Duplicatas são descartadas automaticamente, o que o torna útil para eliminar
# repetições. Não suporta acesso por índice, justamente por não ter ordem.
conjunto = {1, 2, 3, 4, 5}
conjunto2 = set(conjunto)   # set() cria um conjunto a partir de outro iterável

print(conjunto)         # {1, 2, 3, 4, 5}
print(len(conjunto))    # 5

# --- Dicionário ---
# Coleção de pares CHAVE: VALOR, definida com chaves {}.
# O acesso é feito pela chave (não por índice) e as chaves são únicas.
dicionario = {"nome": "Diego", "idade": 30, "cidade": "São Paulo"}

print(dicionario)               # {'nome': 'Diego', 'idade': 30, 'cidade': 'São Paulo'}
print(len(dicionario))          # 3 -> número de pares
print(dicionario["nome"])       # 'Diego' -> levanta KeyError se a chave não existir
print(dicionario.get("idade"))  # 30 -> get() devolve None em vez de erro

dicionario["idade"] = 31        # chave já existente: atualiza o valor
dicionario["pais"] = "Brasil"   # chave nova: adiciona o par ao dicionário
del dicionario["cidade"]        # remove o par pela chave


# -----------------------------------------------------------------------------
# 9. FUNÇÕES
# -----------------------------------------------------------------------------
# Definidas com 'def': recebem parâmetros entre parênteses e devolvem um valor
# com 'return'. Servem para reaproveitar código e evitar repetição.
# Obs.: este 'soma' substitui a variável 'soma' criada na seção 3 — em Python,
# funções e variáveis compartilham o mesmo espaço de nomes.
def soma(a, b):
    return a + b


# -----------------------------------------------------------------------------
# 10. ENTRADA E SAÍDA (I/O) - manipulação de arquivos
# -----------------------------------------------------------------------------
# Modos de abertura em open(nome_arquivo, modo):
#   'r' -> leitura; erro se o arquivo não existir
#   'w' -> escrita a partir do início; APAGA todo o conteúdo existente
#   'a' -> escrita ao final (append); preserva o conteúdo existente
#
# Métodos do objeto arquivo:
#   close()     -> fecha o arquivo e grava o que estiver em buffer
#   write()     -> escreve texto no arquivo
#   read()      -> lê todo o conteúdo como uma única string
#   readline()  -> lê apenas a próxima linha
#   readlines() -> lê todas as linhas e devolve uma lista
#
# Dica: 'with open(...) as arquivo:' fecha o arquivo automaticamente ao final do
# bloco, mesmo se ocorrer um erro — dispensa a chamada explícita de close().

print(soma(2, 3))   # 5 -> chamada da função definida acima
