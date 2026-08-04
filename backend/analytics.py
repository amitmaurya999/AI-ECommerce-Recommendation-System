from sqlalchemy.orm import Session
from sqlalchemy import func

from models import (
    User,
    Product,
    Order,
    UserActivity
)


def get_dashboard_stats(db: Session):

    total_users = db.query(User).count()

    total_products = db.query(Product).count()

    total_orders = db.query(Order).count()

    total_revenue = (
        db.query(
            func.sum(Order.total_price)
        ).scalar()
        or 0
    )

    total_views = (
        db.query(UserActivity)
        .filter(UserActivity.action == "VIEW")
        .count()
    )

    total_cart = (
        db.query(UserActivity)
        .filter(UserActivity.action == "CART")
        .count()
    )

    total_wishlist = (
        db.query(UserActivity)
        .filter(UserActivity.action == "WISHLIST")
        .count()
    )

    total_purchase = (
        db.query(UserActivity)
        .filter(UserActivity.action == "PURCHASE")
        .count()
    )

    return {

        "users": total_users,

        "products": total_products,

        "orders": total_orders,

        "revenue": total_revenue,

        "views": total_views,

        "cart": total_cart,

        "wishlist": total_wishlist,

        "purchase": total_purchase

    }