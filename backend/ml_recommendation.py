import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from models import Product
from collections import Counter
from models import UserActivity

def get_ml_recommendations(db, product_id):

    products = db.query(Product).all()

    if len(products) == 0:
        return []

    data = []

    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "description": p.description,
            "price": p.price,
            "rating": p.rating,
            "image": p.image,
        })

    df = pd.DataFrame(data)

    df["text"] = (
        df["name"] + " " +
        df["category"] + " " +
        df["description"]
    )

    tfidf = TfidfVectorizer(stop_words="english")

    tfidf_matrix = tfidf.fit_transform(df["text"])

    similarity = cosine_similarity(tfidf_matrix)

    index = df[df["id"] == product_id].index

    if len(index) == 0:
        return []

    idx = index[0]

    scores = list(enumerate(similarity[idx]))

    scores = sorted(
        scores,
        key=lambda x: x[1],
        reverse=True
    )

    scores = scores[1:7]

    recommended = []

    for i in scores:
        recommended.append(
            data[i[0]]
        )

    return recommended


def get_personalized_recommendations(db, user_id):

    activities = (
        db.query(UserActivity)
        .filter(UserActivity.user_id == user_id)
        .all()
    )

    if not activities:
        return []

    categories = []

    for activity in activities:

        product = (
            db.query(Product)
            .filter(Product.id == activity.product_id)
            .first()
        )

        if product:
            categories.append(product.category)

    favorite_category = Counter(categories).most_common(1)[0][0]

    recommendations = (
        db.query(Product)
        .filter(Product.category == favorite_category)
        .limit(8)
        .all()
    )

    return recommendations
