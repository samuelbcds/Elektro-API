# Elektro API

Esta documentação descreve os endpoints disponíveis na API Elektro. Abaixo estão os detalhes de cada rota, incluindo métodos HTTP, URLs, descrições e parâmetros.

---

## Endpoints

### 1. **Criar User**
- **Método:** `POST`
- **URL:** `http://localhost:3333/usuarios`
- **Descrição:** Cadastra um usuário no sistema preenchendo suas informações (nome, dataNasc, email, senha) no Body da requisição.
- **Body (urlencoded):**
  - `nome`: Nome do usuário (ex: `Samuel`).
  - `dataNasc`: Data de nascimento (ex: `2002-10-01T00:00:00.000Z`).
  - `email`: Email do usuário (ex: `samuel_test@gmail.com`).
  - `senha`: Senha do usuário (ex: `12345678`).

---

### 2. **Listar Users**
- **Método:** `GET`
- **URL:** `http://localhost:3333/usuarios`
- **Descrição:** Lista todos os usuários cadastrados no sistema.

---

### 3. **Buscar User Por ID**
- **Método:** `GET`
- **URL:** `http://localhost:3333/usuarios/4`
- **Descrição:** Busca informações de apenas um usuário. Para definir o usuário, basta mudar o ID no parâmetro da URL.

---

### 4. **Atualizar User**
- **Método:** `PUT`
- **URL:** `http://localhost:3333/usuarios?1`
- **Descrição:** Atualiza as informações do usuário (nome, email e senha) a partir do seu ID, que vai no parâmetro da URL.
- **Body (urlencoded):**
  - `nome`: Nome do usuário (ex: `Samuel`).
  - `email`: Email do usuário (ex: `testando@gmail.com`).
  - `senha`: Senha do usuário (ex: `12345`).

---

### 5. **Deletar User**
- **Método:** `DELETE`
- **URL:** `http://localhost:3333/usuarios/4`
- **Descrição:** Deleta um usuário a partir do seu ID no parâmetro da URL.

---

### 6. **Create Pedido**
- **Método:** `POST`
- **URL:** `http://localhost:3333/pedidos`
- **Descrição:** Registra um pedido no sistema a partir de `usuarioId`, `dataPedido`, `status` e `valor`.
- **Body (urlencoded):**
  - `usuarioId`: ID do usuário (ex: `1`).
  - `dataPedido`: Data do pedido (ex: `2024-12-25T00:00:000Z`).
  - `status`: Status do pedido (ex: `PENDENTE`).
  - `valor`: Valor do pedido (ex: `200`).

---

### 7. **Listar Pedidos**
- **Método:** `GET`
- **URL:** `http://localhost:3333/usuarios/1/pedidos`
- **Descrição:** Lista todos os pedidos de um determinado cliente, dado o ID do usuário como parâmetro na URL.

---

### 8. **Atualizar Pedidos**
- **Método:** `PUT`
- **URL:** `http://localhost:3333/pedidos/4`
- **Descrição:** Atualiza o status de um pedido, dado seu ID no parâmetro da URL e o novo status no Body da requisição.
- **Body (urlencoded):**
  - `status`: Novo status do pedido (ex: `PENDENTE`).

---

### 9. **Deletar Pedidos**
- **Método:** `DELETE`
- **URL:** `http://localhost:3333/pedidos/4`
- **Descrição:** Deleta um pedido a partir do seu ID, que vai como parâmetro na URL.

---

### 10. **Login**
- **Método:** `POST`
- **URL:** `http://localhost:3333/login`
- **Descrição:** São enviados no Body `email` e `senha`. Retorna um JWT Token gerado para o usuário informado.

---

### 11. **Enviar Email**
- **Método:** `POST`
- **URL:** `http://localhost:3333/sendEmail`
- **Descrição:** Envia um email para o destinatário com o assunto e mensagem informados.
- **Body (urlencoded):**
  - `recipient`: Email do destinatário (ex: `melvina.frami78@ethereal.email`).
  - `subject`: Assunto do email (ex: `Subject`).
  - `message`: Mensagem do email (ex: `Hello World!`).

---

### 12. **Enviar Imagem**
- **Método:** `POST`
- **URL:** `http://localhost:3333/login`
- **Descrição:** É enviado no Body uma imagem, e ela fica armazenada na raiz do arquivo na pasta `uploads/photos` com a nomeação `timestamp_nomeDoArquivo`.

---

## Como Usar

1. Clone o repositório.
2. No terminal rode o comando 'npx run keys'
3. Utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints.

---

## Exemplos de Uso

### Criar Usuário
```http
POST http://localhost:3333/usuarios
Content-Type: application/x-www-form-urlencoded

nome=Samuel&dataNasc=2002-10-01T00:00:00.000Z&email=samuel_test@gmail.com&senha=12345678
