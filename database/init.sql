-- Initialize IEx Lombok Database
-- This script runs when the PostgreSQL container starts

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE iex_lombok'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'iex_lombok')\gexec

-- Connect to the database
\c iex_lombok;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- The tables will be created by Flask-Migrate
-- This file is mainly for any additional database setup
