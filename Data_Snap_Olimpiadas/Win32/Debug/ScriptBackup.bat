@echo off
cd C:\Program Files\PostgreSQL\9.2\bin
set BACKUP_FILE=C:\xampp\htdocs\downloads\OlimpiadasUT\Archivos\Olimpiadas.backup

pg_dump -h localhost -p 5432 -U postgres -F c -b -v -f %BACKUP_FILE% olimpiadas
