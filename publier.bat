@echo off
rem === Publie le site : recupere les commits de l'editeur en ligne (pull)
rem === puis envoie le travail local (push), en un seul geste.
rem === Double-clic suffit. En cas de refus (edition en ligne simultanee),
rem === le script reessaie automatiquement.
cd /d "%~dp0"
echo === Publication du Breviaire : pull + push ===
echo.
git pull --no-rebase --no-edit && git push
if errorlevel 1 (
  echo.
  echo Refus detecte - nouvelle tentative...
  git pull --no-rebase --no-edit && git push
)
if errorlevel 1 (
  echo.
  echo *** ECHEC : reessaie dans une minute, ou demande a Claude. ***
) else (
  echo.
  echo *** OK : tout est publie sur GitHub. ***
)
echo.
pause
