import requests
from django.shortcuts import render

def search_news(request):
    user_name = "Boris Johnson"  # Replace with dynamic user input
    api_key = "b80bd9a851964df5ba7e7bc052192429"
    url = f"https://newsapi.org/v2/everything?q={user_name}&apiKey={api_key}"

    try:
        response = requests.get(url)
        data = response.json()
        articles = data.get('articles', [])
    except requests.exceptions.RequestException as e:
        articles = []
        print(f"Error fetching news: {e}")

    return render(request, 'news_results.html', {'articles': articles})