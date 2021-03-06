"""added a Settings Table on a key/value (property bag) model

Revision ID: 6d663690b9fb
Revises: 7bece08f3d63
Create Date: 2020-12-06 20:47:44.313267

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "6d663690b9fb"
down_revision = "7bece08f3d63"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "settings",
        sa.Column("setting_id", sa.Integer(), nullable=False),
        sa.Column("key", sa.String(length=50), nullable=True),
        sa.Column("value", sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint("setting_id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("settings")
    # ### end Alembic commands ###
