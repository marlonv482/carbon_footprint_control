SELECT 'CREATE DATABASE carbon_footprint'
WHERE NOT EXISTS (SELECT FROM pg_database where datname='carbon_footprint')\gexec