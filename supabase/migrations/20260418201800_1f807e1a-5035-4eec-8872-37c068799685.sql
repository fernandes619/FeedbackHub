-- Restaurantes table
CREATE TABLE public.restaurantes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  google_maps_url TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_restaurantes_slug ON public.restaurantes(slug);
CREATE INDEX idx_restaurantes_user_id ON public.restaurantes(user_id);

ALTER TABLE public.restaurantes ENABLE ROW LEVEL SECURITY;

-- Public read by slug (needed for /avaliar/$slug)
CREATE POLICY "Anyone can view restaurantes"
  ON public.restaurantes
  FOR SELECT
  USING (true);

-- Owners manage their own
CREATE POLICY "Owners can update their restaurante"
  ON public.restaurantes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can delete their restaurante"
  ON public.restaurantes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Avaliacoes table
CREATE TABLE public.avaliacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurante_id UUID NOT NULL REFERENCES public.restaurantes(id) ON DELETE CASCADE,
  nota SMALLINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_avaliacoes_restaurante_id ON public.avaliacoes(restaurante_id);
CREATE INDEX idx_avaliacoes_created_at ON public.avaliacoes(created_at DESC);

ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;

-- Public can insert (anonymous customers leaving feedback)
CREATE POLICY "Anyone can create avaliacoes"
  ON public.avaliacoes
  FOR INSERT
  WITH CHECK (true);

-- Public can update (used right after insert to add tags for low ratings)
CREATE POLICY "Anyone can update avaliacoes tags"
  ON public.avaliacoes
  FOR UPDATE
  USING (true);

-- Only the owner of the linked restaurante can read avaliacoes
CREATE POLICY "Owners can view their avaliacoes"
  ON public.avaliacoes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurantes r
      WHERE r.id = avaliacoes.restaurante_id
        AND r.user_id = auth.uid()
    )
  );