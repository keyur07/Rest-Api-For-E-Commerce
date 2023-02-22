<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    /* Gets the users from the DB tables*/
   

    //get all products
    public function getProduct($limit)
    {
        return $this->select("SELECT * FROM `product`");
    }
  

    //add new user into database
    public function SignUp($username,$email,$password)
    {
        return $this->insert("INSERT INTO `user` ( `email`, `password`, `username`, `purchase history`, `shipping address`) VALUES ( '$email', '$password', '$username', '', '')" );
    }

    //check user login
    public function login($username,$password)
    {
        return $this->select("SELECT * FROM `user` WHERE username = '$username' AND password = '$password'");
    }
    
    //get all product comment
    public function getComments($product_id)
    {
        return $this->select("SELECT * FROM `comments` WHERE product_id = '$product_id'");
    }

    //add comments
    public function insertComments($pid,$uid,$rating,$img,$txt)
    {
        return $this->insert("INSERT INTO `comments` (`commentid`, `product_id`, `user_id`, `rating`, `image`, `text`) VALUES (NULL, '$pid', '$uid', '$rating', '$img', '$txt')");
    }

    //delete comment
    public function deleteComment($pid,$uid)
    {
        return $this->insert("DELETE FROM `comments` WHERE product_id = '$pid' AND user_id = '$uid'");
    }

    //add new order
    public function insertorder($uid,$innu,$img,$product,$quntity,$price,$tax,$rating,$payment)
    {
        return $this->insert("INSERT INTO `order` (`orderid`, `userid`, `invoiceno`, `image`, `product`, `quntity`, `price`, `tax`, `ratting`, `payment`) VALUES (NULL, '$uid', '$innu', '$img', '$product', '$quntity', '$price', '$tax', '$rating', '$payment')");
    }

    //get all orders
    public function getorders($userid)
    {
        return $this->select("SELECT * FROM `order` WHERE userid = '$userid'");
    }

    //get cart details
    public function getCartDetail($limit)
    {
        return $this->select("SELECT * FROM cart ORDER BY cartid ASC LIMIT ?", ["i", $limit]);
    }

    //Update cart

    public function updateCartDetail($cartid, $userid, $quantities)
    {
        return $this->update("UPDATE cart SET quantities='$quantities' WHERE cartid = '$cartid' AND userid = '$userid'");
    }

    //add new item in cart
    public function insertCartDetail($productid, $userid, $quantities, $user)
    {
        
        return $this->insert("INSERT into cart(productid, userid, quantities, user) 
        values('$productid','$userid','$quantities','$user')");
    }

    //delete cart items from cart
    public function deleteCartDetail($cartid)
    {
        return $this->delete("DELETE FROM cart WHERE cartid = '$cartid'");
    }

}