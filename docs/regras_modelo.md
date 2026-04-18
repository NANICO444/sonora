# Regra Oficial — Modelo de IA

## Modelo Principal
- **Claude Opus 4.7** (API ID: `claude-opus-4-7`)
- Contexto: 1M tokens | Output: 128K tokens
- Conhecimento ate: Janeiro 2026
- O mais capaz em agentic coding e raciocinio complexo

## Fallback (se Opus 4.7 nao estiver disponivel)
1. Claude Opus 4.6 (`claude-opus-4-6`)
2. Claude Sonnet 4.6 (`claude-sonnet-4-6`)

## Regra
- SEMPRE invocar o Opus 4.7 como modelo principal para qualquer tarefa
- Subagentes, pesquisas, codigo, analises — tudo no 4.7
- Esta regra e IMUTAVEL e vale para TODOS os chats e sessoes

## Referencia
- Fonte oficial: https://platform.claude.com/docs/en/docs/about-claude/models
- Confirmado em 18/04/2026
