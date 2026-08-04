from sqlalchemy.orm import Session
from models import Product


def get_similar_products(db: Session, product_id: int):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        return []

    recommendations = (
        db.query(Product)
        .filter(
            Product.category == product.category,
            Product.id != product.id
        )
        .limit(4)
        .all()
    )

    return recommendations


def get_top_rated_products(db: Session):

    return (
        db.query(Product)
        .order_by(Product.rating.desc())
        .limit(6)
        .all()
    )


def get_trending_products(db: Session):

    return (
        db.query(Product)
        .order_by(Product.id.desc())
        .limit(6)
        .all()
    )