"""empty message

Revision ID: 9b3f358e865c
Revises: 
Create Date: 2024-03-02 17:59:37.711074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b3f358e865c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pattern',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=True),
    sa.Column('pattern_name', sa.String(length=255), nullable=True),
    sa.Column('pattern_details', sa.Text(), nullable=True),
    sa.Column('grid_data', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('pattern_name', name='unique_pattern_name_constraint')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pattern')
    # ### end Alembic commands ###
