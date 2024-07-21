import unittest 
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            ##db.init_app(self.app)
            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/recipe/hello')
        json = hello_response.json
        self.assertEqual(json, {"message":"Hello World"})

    def test_signup(self):
        siginup_response = self.client.post('/auth/signup',
            json = {"username":"testuser", 
                    "email":"test@demo.com", 
                    "password":"password"
                    }
        )

        status_code = siginup_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):
        siginup_response = self.client.post('/auth/signup',
            json = {"username":"testuser", 
                    "email":"test@demo.com", 
                    "password":"password"
                    }
        )

        login_response = self.client.post('/auth/login',
            json = {
                    "username":"testuser", 
                    "password":"password"  
            }
        )    

        status_code=login_response.status_code

        self.assertEqual(status_code, 200)    
    
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all() 

    def test_get_all_recipes(self):
        """Test getting all recipes"""
        response = self.client.get('/recipe/recipes')
        #print(response.json)
        status_code=response.status_code
        self.assertEqual(status_code,200)

    def test_get_one_recipe(self):
        id=1
        response=self.client.get(f'/recipe/reciep/{id}')
        status_code=response.status_code
        self.assertEqual(status_code, 404)

    def test_create_recipe(self):
        siginup_response = self.client.post('/auth/signup',
            json = {"username":"testuser", 
                    "email":"test@demo.com", 
                    "password":"password"
                    }
        )

        login_response = self.client.post('/auth/login',
            json = {
                    "username":"testuser", 
                    "password":"password"  
            }
        )  
        access_token=login_response.json["access_token"]

        create_recipe_response=self.client.post('/recipe/recipes',
            json={
                "title":"Test Cookie",
                "description" : "Test description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        status_code=create_recipe_response.status_code

        self.assertEqual(status_code,201)

    def test_update_recipe(self):
        pass
    def test_delete_recipe(self):
        pass

if __name__ == "__main__":
    unittest.main()