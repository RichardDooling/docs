import requests

# You can find this key in your API requests page:
# https://buttondown.email/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {
    "Authorization": f"Token {BUTTONDOWN_API_KEY}",
}

BASE_URL = "https://api.buttondown.email"
ENDPOINT = "/v1/emails/{id}/events?event_type=delivered"

response = requests.get(f"{BASE_URL}{ENDPOINT}", headers=headers)
