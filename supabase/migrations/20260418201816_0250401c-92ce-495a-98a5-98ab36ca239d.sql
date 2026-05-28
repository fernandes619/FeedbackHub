-- Tighten INSERT: must reference a real restaurante
DROP POLICY "Anyone can create avaliacoes" ON public.avaliacoes;
CREATE POLICY "Anyone can create avaliacoes for existing restaurantes"
  ON public.avaliacoes
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.restaurantes r WHERE r.id = restaurante_id)
  );

-- Tighten UPDATE: only allow within 10 minutes of creation (used to attach tags after low rating)
DROP POLICY "Anyone can update avaliacoes tags" ON public.avaliacoes;
CREATE POLICY "Recent avaliacoes can be updated"
  ON public.avaliacoes
  FOR UPDATE
  USING (created_at > now() - interval '10 minutes')
  WITH CHECK (created_at > now() - interval '10 minutes');