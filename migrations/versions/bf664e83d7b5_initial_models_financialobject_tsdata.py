"""initial models (FinancialObject, TSData)

Revision ID: bf664e83d7b5
Revises: 
Create Date: 2020-10-24 23:47:27.678841

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf664e83d7b5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('financial_objects',
    sa.Column('foid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('report_name', sa.String(length=100), nullable=True),
    sa.Column('ticker', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('foid'),
    sa.UniqueConstraint('name')
    )
    op.create_table('ts_data',
    sa.Column('tsid', sa.Integer(), nullable=False),
    sa.Column('foid', sa.Integer(), nullable=True),
    sa.Column('dt', sa.DateTime(), nullable=True),
    sa.Column('level', sa.Float(), nullable=True),
    sa.Column('source', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['foid'], ['financial_objects.foid'], ),
    sa.PrimaryKeyConstraint('tsid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ts_data')
    op.drop_table('financial_objects')
    # ### end Alembic commands ###
