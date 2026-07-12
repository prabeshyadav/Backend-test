from django.test import TestCase

from managament.models import User, Content


class ContentModelTest(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            email="john@test.com",
            password="Password123",
        )

    def test_create_content(self):

        content = Content.objects.create(
            owner=self.user,
            title="Django",
            body="Hello",
        )

        self.assertEqual(content.title, "Django")
        self.assertEqual(content.owner, self.user)