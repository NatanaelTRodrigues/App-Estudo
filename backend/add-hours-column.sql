-- Adicionar coluna hoursStudied na tabela questions
-- Execute este script no Supabase SQL Editor

ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS "hoursStudied" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Comentário na coluna
COMMENT ON COLUMN questions."hoursStudied" IS 'Horas estudadas em formato decimal (ex: 1.5 = 1h30min)';
