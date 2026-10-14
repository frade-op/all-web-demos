# frade-op-demos.com.br

Portal estático para publicar aplicações de demonstração, com uma rota independente para cada demo. O site é publicado pelo GitHub Pages a partir da branch `main`.

## Rotas

- `/` — catálogo das demonstrações.
- `/demo-1/` — exemplo de contador interativo.
- `/demo-2/` — exemplo de lista de tarefas, com dados guardados no navegador.

Cada rota corresponde a uma pasta com um `index.html`. Para adicionar outra demo, crie, por exemplo, `minha-demo/index.html`; ela ficará disponível em `/minha-demo/`. Adicione um cartão para ela em `index.html` para que apareça no catálogo.

As demonstrações são exemplos independentes e não compartilham dados ou código de aplicação. Não coloque credenciais, segredos ou dados privados em um site estático público.

## Publicação no GitHub Pages

1. Envie os arquivos para a branch `main` deste repositório.
2. No GitHub, abra **Settings → Pages** e escolha **GitHub Actions** como origem da publicação. Faça essa configuração uma vez.
3. A workflow em `.github/workflows/pages.yml` publica o conteúdo do repositório em cada push à branch `main`. Também pode ser iniciada manualmente pela aba **Actions**.
4. Acompanhe a execução em **Actions**. Quando terminar, o portal estará disponível no domínio personalizado configurado abaixo.

## Domínio personalizado e DNS

O arquivo `CNAME` configura o domínio `frade-op-demos.com.br` no GitHub Pages. No painel DNS do registrador do domínio, configure:

| Tipo | Nome/host | Valor |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `frade-op-demos.com.br` |

Remova registros A/AAAA conflitantes para `@` e outros registros conflitantes para `www`. A propagação DNS pode levar algum tempo. Depois de configurar os registros:

1. Em **Settings → Pages**, confirme que **Custom domain** mostra `frade-op-demos.com.br`. Se o campo não tiver sido preenchido pela publicação, informe o domínio e salve.
2. Quando a opção estiver disponível, habilite **Enforce HTTPS**.
3. Verifique o domínio e o estado do certificado na mesma tela de Pages.

As alterações de DNS e de configurações do repositório são feitas no registrador e no GitHub; a publicação deste repositório não altera essas contas automaticamente.

## Desenvolvimento local

Para conferir as rotas no navegador, inicie um servidor estático na raiz do repositório, por exemplo com Python:

```powershell
python -m http.server 8000
```

Depois abra `http://localhost:8000`. As demos são estáticas e não dependem de chamadas à API ou de um processo de build; não é necessário instalar dependências.
