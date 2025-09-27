"""create users table

Revision ID: 552d3512ebbe
Revises: 
Create Date: 2025-09-07 20:18:17.209626

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '552d3512ebbe'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "users",
        sa.Column('id', sa.UUID(), primary_key=True),
        sa.Column('first_name', sa.String, nullable=False),
        sa.Column('last_name', sa.String, nullable=False),
        sa.Column('phone_number', sa.String, nullable=False, unique=True),
        sa.Column('hashed_password', sa.String, nullable=False),
        sa.Column('roles', postgresql.ARRAY(sa.String), nullable=False),
        sa.Column('photo', sa.String, nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False)
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_table("users")
