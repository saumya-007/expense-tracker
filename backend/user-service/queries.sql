-- CREATE EXPENSE TABLE
CREATE TABLE user_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        profile_photo_url VARCHAR,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        modified_at TIMESTAMP NOT NULL DEFAULT now());