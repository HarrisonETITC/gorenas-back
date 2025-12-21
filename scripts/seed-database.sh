#!/bin/bash
# scripts/seed-database.sh
# Script para ejecutar el seeder de base de datos en pipelines CI/CD

set -e  # Exit on error

echo "🔍 Verificando variables de entorno..."

# Verificar que las variables requeridas estén definidas
required_vars=("DB_HOST" "DB_PORT" "DB_USER" "DB_PASS" "DB_NAME")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Error: Las siguientes variables de entorno no están definidas:"
    printf '   - %s\n' "${missing_vars[@]}"
    exit 1
fi

echo "✅ Variables de entorno configuradas"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"

# Compilar el proyecto si no está compilado
if [ ! -d "dist" ]; then
    echo "📦 Compilando el proyecto..."
    npm run build
fi

# Ejecutar el seeder
echo "🌱 Ejecutando seeder de datos iniciales..."
node dist/src/Infraestructure/orm/typeorm/seeders/config/run-seed.js

echo "✅ Seeding completado exitosamente!"
