
## Sistema Multi-Tenant de Feedback para Restaurantes

### Visão geral
Plataforma com área pública (clientes avaliam via QR/link) e área privada (dono acompanha avaliações). Visual claro e minimalista, com suporte a **Português, Inglês e Espanhol** (seletor de idioma).

### Banco de Dados (Supabase)
Tabelas necessárias (vou criar/ajustar via Lovable Cloud):
- `restaurantes`: id, nome, slug (único), google_maps_url, user_id, created_at
- `avaliacoes`: id, restaurante_id, nota (1-5), comentario, tags (array), created_at
- RLS:
  - `restaurantes`: SELECT público por slug; SELECT/UPDATE só pelo dono (user_id = auth.uid())
  - `avaliacoes`: INSERT público (anônimo); SELECT só pelo dono do restaurante vinculado
- Cadastro de restaurantes feito **manualmente** no Supabase (sem UI de criação)

### Área Pública — `/avaliar/$slug`
- **Mobile-first**, layout centrado, fundo branco, tipografia limpa
- Topo: nome do restaurante + seletor de idioma (PT / EN / ES)
- Seletor interativo de 5 estrelas (hover/tap animado)
- Campo de comentário opcional
- Botão "Enviar avaliação"
- **Lógica de bifurcação**:
  - Salva nota + comentário + tags em `avaliacoes`
  - Nota **4–5**: redireciona para o `google_maps_url` do restaurante (deixar avaliação pública)
  - Nota **1–3**: mostra mensagem de agradecimento + tela com tags rápidas opcionais (Atendimento, Comida, Ambiente, Tempo de espera) → ao selecionar, atualiza a avaliação e mostra confirmação final
- Tela de erro amigável se slug não existir (404 traduzido)

### Área Administrativa
- **`/login`**: login por email/senha (Supabase Auth)
- **`/dashboard`** (protegida):
  - Cards de métricas: total de avaliações, média de satisfação (★), % positivas vs negativas
  - **Mural de Melhorias**: avaliações 1–3 destacadas em cards com borda/realce sutil e tags exibidas
  - Lista geral: avaliações 4–5 em estilo neutro
  - Filtros: período (7/30/90 dias), nota
  - Cada card mostra: nota, comentário, tags, data relativa
- Header com nome do restaurante, seletor de idioma e botão sair

### Estilo visual
- Claro e minimalista (estilo Notion/Linear)
- Paleta: branco/cinza muito claro, texto cinza-escuro, acento âmbar suave para estrelas
- Tipografia: Inter
- Bordas arredondadas suaves, sombras quase imperceptíveis

### Internacionalização
- Sistema simples de i18n (objeto de traduções) com 3 idiomas: **Português (padrão), Inglês, Espanhol**
- Seletor presente tanto na área pública quanto no painel
- Idioma persistido em localStorage

### Stack
- TanStack Start + Tailwind
- Lovable Cloud (Supabase) para auth + dados
- Rotas separadas: `/`, `/avaliar/$slug`, `/login`, `/dashboard`

### Observações
- Após aprovação, vou habilitar Lovable Cloud, criar as tabelas + RLS, e implementar todas as telas
- Como o cadastro é manual, vou incluir instruções de como inserir o primeiro restaurante via SQL no Supabase
