from model import checkSurveyExists
import unittest


class TestCredentials(unittest.TestCase):
    def test_for_survey_exist_model(self):
        surveyName = "Demographic Survey"
        self.assertTrue(checkSurveyExists(surveyName))
        self.assertFalse(checkSurveyExists("asdd"))


if __name__ == '__main__':
    unittest.main()
