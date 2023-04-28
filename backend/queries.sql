-- CREATE EXPENSE TABLE
CREATE TABLE user_expenses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        activity VARCHAR NOT NULL,
        category_id UUID NOT NULL REFERENCES expense_category (id) ON DELETE CASCADE,
        amount DECIMAL NOT NULL,
        is_above_limit BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        created_by UUID NOT NULL,
        modified_at TIMESTAMP NOT NULL DEFAULT now(),
        modified_by  UUID NOT NULL);

-- CREATE CATEGORY TABLE
CREATE TABLE expense_category (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_name VARCHAR NOT NULL,
        created_at TIMESTAMP  NOT NULL DEFAULT now(),
        created_by  UUID NOT NULL,
        modified_at TIMESTAMP  NOT NULL DEFAULT now(),
        modified_by UUID NOT NULL);
