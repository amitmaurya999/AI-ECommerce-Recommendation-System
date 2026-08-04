from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
    
class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    rating: float
    image: str
    description: str
 
        
class CartCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int        
    
class WishlistCreate(BaseModel):
    user_id: int
    product_id: int  
    
    
class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    rating: float
    image: str | None = None
    description: str | None = None

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    id: int
    quantity: int
    product: ProductResponse

    class Config:
        from_attributes = True      
        
        
class WishlistResponse(BaseModel):
    id: int
    product: ProductResponse

    class Config:
        from_attributes = True 
        
from pydantic import BaseModel

class OrderCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int
    total_price: float


class OrderResponse(BaseModel):
    id: int
    quantity: int
    total_price: float
    status: str
    product: ProductResponse

    class Config:
        from_attributes = True               
        
class ActivityCreate(BaseModel):
    user_id: int
    product_id: int
    action: str        