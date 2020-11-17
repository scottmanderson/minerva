""" Adds a Benchmark Field to the FinancialObject class

Revision ID: 7bece08f3d63
Revises: 7e7e026f4ed6
Create Date: 2020-11-16 21:37:17.980867

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7bece08f3d63"
down_revision = "7e7e026f4ed6"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "financial_objects", sa.Column("benchmark", sa.Integer(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("financial_objects", "benchmark")
    # ### end Alembic commands ###
