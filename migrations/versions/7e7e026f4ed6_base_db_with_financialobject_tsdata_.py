"""base db with FinancialObject, TSData, DataSource, DataSourcePoll

Revision ID: 7e7e026f4ed6
Revises: 
Create Date: 2020-11-02 22:28:53.863344

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7e7e026f4ed6"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "data_sources",
        sa.Column("source_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=True),
        sa.Column("hierarchy_rank", sa.Integer(), nullable=True),
        sa.Column("api_key", sa.String(length=100), nullable=True),
        sa.PrimaryKeyConstraint("source_id"),
    )
    op.create_table(
        "financial_objects",
        sa.Column("foid", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=True),
        sa.Column("report_name", sa.String(length=100), nullable=True),
        sa.Column("ticker", sa.String(length=20), nullable=True),
        sa.PrimaryKeyConstraint("foid"),
        sa.UniqueConstraint("name"),
    )
    op.create_table(
        "data_source_polls",
        sa.Column("ds_poll_id", sa.Integer(), nullable=False),
        sa.Column("source_id", sa.Integer(), nullable=True),
        sa.Column("foid", sa.Integer(), nullable=True),
        sa.Column("data_source_code", sa.String(length=50), nullable=True),
        sa.ForeignKeyConstraint(
            ["foid"],
            ["financial_objects.foid"],
        ),
        sa.ForeignKeyConstraint(
            ["source_id"],
            ["data_sources.source_id"],
        ),
        sa.PrimaryKeyConstraint("ds_poll_id"),
    )
    op.create_table(
        "ts_data",
        sa.Column("tsid", sa.Integer(), nullable=False),
        sa.Column("foid", sa.Integer(), nullable=True),
        sa.Column("dt", sa.DateTime(), nullable=True),
        sa.Column("level", sa.Float(), nullable=True),
        sa.Column("source", sa.String(length=100), nullable=True),
        sa.ForeignKeyConstraint(
            ["foid"],
            ["financial_objects.foid"],
        ),
        sa.PrimaryKeyConstraint("tsid"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("ts_data")
    op.drop_table("data_source_polls")
    op.drop_table("financial_objects")
    op.drop_table("data_sources")
    # ### end Alembic commands ###
