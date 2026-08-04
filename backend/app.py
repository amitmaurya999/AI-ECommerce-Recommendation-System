from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, User
from schemas import UserRegister, UserLogin
from auth import hash_password, verify_password, create_access_token
from models import Base, User, Product
from schemas import UserRegister, UserLogin, ProductCreate
from models import Base, User, Product, Cart,Wishlist,Order

from schemas import (
    UserRegister,
    UserLogin,
    ProductCreate,
    CartCreate,
    WishlistCreate,
    OrderCreate,
    OrderResponse,
)

from fastapi.middleware.cors import CORSMiddleware
from schemas import CartResponse
from typing import List
from schemas import WishlistResponse
from recommendation import get_similar_products
from schemas import ProductResponse

from sqlalchemy import func
from pydantic import BaseModel
from ml_recommendation import  (get_ml_recommendations,get_personalized_recommendations)
from models import UserActivity
from schemas import ActivityCreate
from analytics import get_dashboard_stats


Base.metadata.create_all(bind=engine)
print(Base.metadata.tables.keys())

app = FastAPI(title="AI Recommendation System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }

@app.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }
    
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }   
    

@app.post("/products")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = Product(
        name=product.name,
        category=product.category,
        price=product.price,
        rating=product.rating,
        image=product.image,
        description=product.description
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product Added Successfully",
        "product": new_product.id
    }   
    
 
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all() 


@app.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product Not Found"
        )

    return product  


@app.post("/cart")
def add_to_cart(cart: CartCreate, db: Session = Depends(get_db)):

    existing = db.query(Cart).filter(
        Cart.user_id == cart.user_id,
        Cart.product_id == cart.product_id
    ).first()

    if existing:
        existing.quantity += cart.quantity
        db.commit()

        return {
            "message": "Cart Updated"
        }

    new_item = Cart(
        user_id=cart.user_id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(new_item)
    db.commit()

    return {
        "message": "Added To Cart"
    }       
    
    
@app.get("/cart/{user_id}", response_model=List[CartResponse])
def get_cart(user_id: int, db: Session = Depends(get_db)):
    return db.query(Cart).filter(
        Cart.user_id == user_id
    ).all()

      


@app.delete("/cart/{cart_id}")
def delete_cart(cart_id: int, db: Session = Depends(get_db)):

    item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item Not Found"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Item Removed"
    }
    
    
@app.post("/wishlist")
def add_to_wishlist(
    wishlist: WishlistCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Wishlist).filter(
        Wishlist.user_id == wishlist.user_id,
        Wishlist.product_id == wishlist.product_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Product already in wishlist"
        )

    item = Wishlist(
        user_id=wishlist.user_id,
        product_id=wishlist.product_id
    )

    db.add(item)
    db.commit()

    return {
        "message": "Added to Wishlist"
    }
    
   
@app.get("/wishlist/{user_id}", response_model=List[WishlistResponse])
def get_wishlist(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Wishlist).filter(
        Wishlist.user_id == user_id
    ).all()  
    
    
@app.delete("/wishlist/{wishlist_id}")
def remove_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db)
):

    item = db.query(Wishlist).filter(
        Wishlist.id == wishlist_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist Item Not Found"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Removed Successfully"
    }        
    
from recommendation import (
    get_similar_products,
    get_top_rated_products,
    get_trending_products
)    


@app.get("/recommendations/top-rated")
def top_rated(
    db: Session = Depends(get_db)
):

    return get_top_rated_products(db)

@app.get("/recommendations/trending")
def trending(
    db: Session = Depends(get_db)
):

    return get_trending_products(db)

@app.get("/recommendations/{product_id}")
def recommendations(
    product_id: int,
    db: Session = Depends(get_db)
):

    return get_similar_products(db, product_id)



@app.put("/cart/increase/{cart_id}")
def increase_cart_quantity(cart_id: int, db: Session = Depends(get_db)):

    item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Cart Item Not Found"
        )

    item.quantity += 1

    db.commit()
    db.refresh(item)

    return {
        "message": "Quantity Increased"
    }
    
    
    @app.put("/cart/decrease/{cart_id}")
    def decrease_cart_quantity(cart_id: int, db: Session = Depends(get_db)):

      item = db.query(Cart).filter(
        Cart.id == cart_id
      ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Cart Item Not Found"
        )

    if item.quantity > 1:
        item.quantity -= 1
    else:
        db.delete(item)

    db.commit()

    return {
        "message": "Quantity Updated"
    }

@app.post("/orders", response_model=OrderResponse)
def place_order(order: OrderCreate, db: Session = Depends(get_db)):

    print("===== PLACE ORDER API CALLED =====")
    print(order)

    product = db.query(Product).filter(Product.id == order.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    total = product.price * order.quantity

    new_order = Order(
        user_id=1,
        product_id=order.product_id,
        quantity=order.quantity,
        total_price=total,
        status="Placed"
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    print("Saved Order ID:", new_order.id)

    return new_order

@app.get("/orders/{user_id}", response_model=list[OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):

    orders = (
        db.query(Order)
        .filter(Order.user_id == user_id)
        .all()
    )

    return orders
    
    
@app.get("/admin/products", response_model=list[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    return db.query(Product).all()    


@app.delete("/admin/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product Deleted Successfully"}


@app.put("/admin/products/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
):

    db_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.name = product.name
    db_product.category = product.category
    db_product.price = product.price
    db_product.rating = product.rating
    db_product.image = product.image
    db_product.description = product.description

    db.commit()
    db.refresh(db_product)

    return db_product

@app.get("/admin/orders")
def get_all_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


class StatusUpdate(BaseModel):
    status: str


@app.put("/admin/orders/{order_id}")
def update_order_status(
    order_id: int,
    data: StatusUpdate,
    db: Session = Depends(get_db),
):

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = data.status

    db.commit()
    db.refresh(order)

    return order

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {
        "message": "User Deleted Successfully"
    }
    
@app.get("/admin/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total_products = db.query(Product).count()

    total_users = db.query(User).count()

    total_orders = db.query(Order).count()

    revenue = (
        db.query(func.sum(Order.total_price))
        .scalar()
    ) or 0

    views = db.query(UserActivity).filter(
        UserActivity.action == "VIEW"
    ).count()

    wishlist = db.query(UserActivity).filter(
        UserActivity.action == "WISHLIST"
    ).count()

    cart = db.query(UserActivity).filter(
        UserActivity.action == "CART"
    ).count()

    purchase = db.query(UserActivity).filter(
        UserActivity.action == "PURCHASE"
    ).count()

    return {
        "products": total_products,
        "users": total_users,
        "orders": total_orders,
        "revenue": revenue,
        "views": views,
        "wishlist": wishlist,
        "cart": cart,
        "purchase": purchase,
    }
    
@app.get("/admin/top-products")
def top_products(db: Session = Depends(get_db)):

    result = (
        db.query(
            Product.id,
            Product.name,
            Product.image,
            func.count(Order.id).label("sales"),
            func.sum(Order.quantity).label("quantity"),
        )
        .join(Order, Product.id == Order.product_id)
        .group_by(
            Product.id,
            Product.name,
            Product.image,
        )
        .order_by(
            func.count(Order.id).desc()
        )
        .limit(5)
        .all()
    )

    return [
    {
        "id": row.id,
        "name": row.name,
        "image": row.image,
        "sales": row.sales,
        "quantity": row.quantity,
    }
    for row in result
]

    
    
@app.get("/ml-recommendations/{product_id}")
def ml_recommendations(
    product_id: int,
    db: Session = Depends(get_db)
):
    return get_ml_recommendations(db, product_id)

@app.get("/personalized/{user_id}")
def personalized(
    user_id: int,
    db: Session = Depends(get_db)
):

    return get_personalized_recommendations(
        db,
        user_id
    ) 


@app.post("/activity")
def track_activity(
    activity: ActivityCreate,
    db: Session = Depends(get_db)
):

    new_activity = UserActivity(
        user_id=activity.user_id,
        product_id=activity.product_id,
        action=activity.action
    )

    db.add(new_activity)
    db.commit()

    return {
        "message": "Activity Saved"
    }
    
@app.get("/activity/{user_id}")
def get_activity(
    user_id: int,
    db: Session = Depends(get_db)
):

    activities = (
        db.query(UserActivity)
        .filter(
            UserActivity.user_id == user_id
        )
        .order_by(
            UserActivity.created_at.desc()
        )
        .all()
    )

    return activities    