import json
from pytrends.request import TrendReq

def get_related_keywords(keyword):
    pytrends = TrendReq(hl='en-US', tz=360)
    pytrends.build_payload([keyword], cat=0, timeframe='today 12-m', geo='', gprop='')

    related_queries = pytrends.related_queries()
    if keyword in related_queries and 'top' in related_queries[keyword]:
        top_related = related_queries[keyword]['top']
        if top_related is not None:
            related_keywords = top_related[['query', 'value']].to_dict(orient='records')
            return related_keywords
    return []

def lambda_handler(event, context):
    keyword = event.get('queryStringParameters', {}).get('keyword', None)
    if not keyword:
        return {
            'statusCode': 400,
            'body': json.dumps({"error": "Keyword parameter is required"})
        }
    
    related_keywords = get_related_keywords(keyword)
    return {
        'statusCode': 200,
        'body': json.dumps(related_keywords)
    }
#requirements -> pytrends, requests