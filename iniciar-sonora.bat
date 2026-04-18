@echo off
chcp 65001 >nul
title Sonora - Instrumentos Musicais e Cursos Online
color 0E

echo.
echo  ╔═══════════════════════════════════════════════════╗
echo  ║                                                   ║
echo  ║            SONORA - Loja de Musica                ║
echo  ║      Instrumentos Musicais e Cursos Online        ║
echo  ║                                                   ║
echo  ╚═══════════════════════════════════════════════════╝
echo.

:: Verifica se o Node.js esta instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  [ERRO] Node.js nao encontrado!
    echo.
    echo  Para rodar o projeto, voce precisa instalar o Node.js:
    echo  Acesse: https://nodejs.org/pt
    echo  Baixe a versao LTS e instale.
    echo  Depois, rode este arquivo novamente.
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js encontrado:
node --version
echo.

:: Vai para a pasta do projeto (mesma pasta do .bat)
cd /d "%~dp0"

:: Verifica se node_modules existe
if not exist "node_modules" (
    echo  [1/3] Instalando dependencias... (pode levar 1-2 minutos)
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  [ERRO] Falha ao instalar dependencias.
        echo  Tente rodar manualmente: npm install
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Dependencias instaladas com sucesso!
) else (
    echo  [OK] Dependencias ja instaladas.
)
echo.

:: Verifica se a pasta dist existe (build de producao)
if not exist "dist" (
    echo  [2/3] Criando build de producao...
    echo.
    call npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  [ERRO] Falha ao criar build.
        echo  Tente rodar manualmente: npm run build
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Build criado com sucesso!
) else (
    echo  [OK] Build de producao ja existe.
)
echo.

echo  [3/3] Abrindo o site no navegador...
echo.
echo  ═══════════════════════════════════════════════════
echo.
echo    O site vai abrir automaticamente no navegador.
echo    Se nao abrir, acesse: http://localhost:4173
echo.
echo    Para parar o servidor, feche esta janela
echo    ou pressione Ctrl+C
echo.
echo  ═══════════════════════════════════════════════════
echo.

:: Abre o navegador automaticamente apos 2 segundos
start "" "http://localhost:4173"

:: Inicia o servidor de preview
call npx vite preview --port 4173 --open

pause
