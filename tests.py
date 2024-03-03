import unittest
from app import my_app, db
from app.models import Pattern
import os

os.environ['DATABASE_URL'] = 'sqlite://'

class TestUserModel(unittest.TestCase):
    def setUp(self):
        # Set up the testing environment
        self.app_context = my_app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        # Clean up after the tests
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_user(self):
        # Test creating a user
        user = Pattern(username='testuser', pattern_name = 'new pattern', pattern_details = 'nice pattern', grid_data = '[1,2,13,24,45]')
        db.session.add(user)
        db.session.commit()

        # Query the user from the database
        queried_user = Pattern.query.filter_by(pattern_name='new pattern').first()

        # Assert that the user was created successfully
        self.assertIsNotNone(queried_user)
        self.assertEqual(queried_user.username, 'testuser')
        self.assertEqual(queried_user.pattern_name, 'new pattern')
        self.assertEqual(queried_user.pattern_details, 'nice pattern')
        self.assertEqual(queried_user.grid_data, '[1,2,13,24,45]')

if __name__ == '__main__':
    unittest.main()
