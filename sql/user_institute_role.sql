CREATE TABLE user_institute_roles (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES tenants(id),
    institute_id INTEGER REFERENCES institutes(id),
    user_id INTEGER REFERENCES users(id),
    role_id INTEGER REFERENCES roles(id),
    is_primary BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);