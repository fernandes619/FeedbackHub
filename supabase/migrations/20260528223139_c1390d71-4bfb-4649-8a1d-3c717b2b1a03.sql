ALTER TABLE public.avaliacoes
  ADD COLUMN IF NOT EXISTS score_comida smallint,
  ADD COLUMN IF NOT EXISTS score_servicio smallint,
  ADD COLUMN IF NOT EXISTS score_limpieza smallint,
  ADD COLUMN IF NOT EXISTS score_calidad_precio smallint;