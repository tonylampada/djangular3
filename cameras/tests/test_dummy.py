from django.test import TestCase

class DummyTest(TestCase):
    def test_sum(self):
        self.assertEquals(1 + 1, 2)
