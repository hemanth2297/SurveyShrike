from model import authenticate_user_credentials, generate_access_token

import unittest


class TestCredentials(unittest.TestCase):
    def test_for_credentials_verification(self):
        userName = "Hemanth"
        password = "Hemanth"
        self.assertTrue(authenticate_user_credentials(userName, password))
        password = "Hemanth2"
        self.assertFalse(authenticate_user_credentials(userName, password))

    def test_for_access_token_generation(self):
        access_token = generate_access_token("Hemanth")
        if(access_token):
            self.assertTrue(True)
        else:
            self.assertTrue(False)


if __name__ == '__main__':
    unittest.main()
