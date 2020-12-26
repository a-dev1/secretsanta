import requests
import os


def get_image_url(url):
    search_term=url.split('/')[3]
    search_term=search_term.replace('-',' ')
    print(search_term)
    subscription_key = os.environ.get('API_KEY')
    search_url = "https://api.bing.microsoft.com/v7.0/images/search"
    

    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"q": search_term, "license": "public", "imageType": "photo"}

    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    if search_results["value"] == []:
        search_term=search_term.split()[0]
        params  = {"q": search_term, "license": "public", "imageType": "photo"}
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()

    thumbnail_urls = search_results["value"][0]["contentUrl"]

    return(thumbnail_urls)


def get_gift_name(url):
    giftname=url.split('/')[3]
    giftname=search_term.replace('-',' ')
    return giftname