<?php
class UserController extends BaseController
{

    /** 
     *  UserController class extends the BaseController class. 
     * Ideally, this class would contain the action methods that
     * are associated with the REST endpoints that are defined for 
     * the user entity. 
     * In our case, for example, the /user/list REST endpoint 
     * corresponds to the listAction method. 
     * In this way, you can also define other methods for other REST endpoints.

     * "/user/list" Endpoint - Get All users */

    //user/signup - Insert New User in Database
    //username
    //email
    //password

    public function signupAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $username = "";
                $email = "";
                $password = "";

                if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {

                    $username = $_POST['username'];
                    $email = $_POST['email'];
                    $password = $_POST['password'];

                }

                $arrUsers = $userModel->SignUp($username,$email,$password);
                $responseData = $arrUsers;

            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(

                json_encode(array('Code'=>'200','message'=>'Inserted Successfully','status'=>'false')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                
            );

        } else {

            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }

    }


    //user/login - Insert New User in Database
    //username
    //password

    public function loginAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $username = "";
                $email = "";
                $password = "";

                if (isset($_POST['username'])  && isset($_POST['password'])) {

                    $username = $_POST['username'];
                    $password = $_POST['password'];

                }

                $arrUsers = $userModel->login($username,$password);
                $responseData = json_encode($arrUsers);
               
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }
        // send output 
        if (!$strErrorDesc) {
            if (!empty(json_decode($responseData))){

                $this->sendOutput(

                    $responseData,
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );
                
            } else {
             
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
              
                $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
                );

            }

            }else{
                
                $this->sendOutput(json_encode(array('Code'=>'404','status'=>'false','Message' => 'No Data Found')), 
                array('Content-Type: application/json', $strErrorHeader)
            );
            }

    }

    //get All products
    //user/product

    public function productAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getProduct($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //get Comments on products
    //user/Comment
    public function commentAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $product_id = "";
              
                if (isset($_POST['product_id'])) {

                    $product_id = $_POST['product_id'];

                }

                $arrUsers = $userModel->getComments($product_id);
                $responseData = json_encode($arrUsers);
               
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }
        // send output 
        if (!$strErrorDesc) {

            if (!empty(json_decode($responseData))){

                $this->sendOutput(

                    $responseData,
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );
                
            } else {
             
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
              
                $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
                );

            }

            }else{
                
                $this->sendOutput(json_encode(array('Code'=>'404','status'=>'false','Message' => 'No Data Found')), 
                array('Content-Type: application/json', $strErrorHeader)
            );
            }

    }

    //Delete Comments
    //user/deletecomments
    public function deletecommentAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
       if(strtoupper($requestMethod) == 'POST'){
            try {

                $userModel = new UserModel();
                if (isset($_POST["productid"]) && isset($_POST['userid'])) {
                    $pid = $_POST['productid'];
                    $uid = $_POST['userid'];
                }
                $arrUsers = $userModel->deleteComment($pid,$uid);
                $responseData = $arrUsers;
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        }else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(

                json_encode(array('Code'=>'200','message'=>'Deleted Successfully','status'=>'true')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                
            );

        } else {

            $this->sendOutput(json_encode(array('Code'=>'404','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //AddComments on products
    //user/getcomment
    public function insertcommentAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

       if(strtoupper($requestMethod) == 'POST'){
            try {

                $pid = '';
                $uid = '';
                $rating = '';
                $img = '';
                $txt = '';

                $userModel = new UserModel();
                if (isset($_POST["productid"]) && isset($_POST['userid'])  && isset($_POST['rating']) && isset($_POST['img']) && isset($_POST['txt'])) {
                  
                    $pid = $_POST['productid'];
                    $uid = $_POST['userid'];
                    $rating = $_POST['rating'];
                    $img = $_POST['img'];
                    $txt = $_POST['txt'];

                }
                $arrUsers = $userModel->insertComments($pid,$uid,$rating,$img,$txt);
                 
                
                $responseData = $arrUsers;
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        }else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(

                json_encode(array('Code'=>'200','message'=>'Inserted Successfully','status'=>'true')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                
            );

        } else {

            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }


     //Insert Order on Order table
    //user/insertOrder
    public function insertorderAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $uid = '';
                $innu = '';
                $img = '';
                $product = '';
                $quntity = '';
                $price = '';
                $tax = '';
                $rating = '';
                $payment = '';

                
              
                if ( isset($_POST['userid']) && isset($_POST['invoiceno']) && isset($_POST['image']) && isset($_POST['userid']) && isset($_POST['invoiceno']) && isset($_POST['image'])  && isset($_POST['product'])  && isset($_POST['quntity']) && isset($_POST['price'])  && isset($_POST['tax'])   && isset($_POST['ratting']) && isset($_POST['payment'])) {

                    $uid = $_POST['userid'];
                    $innu = $_POST['invoiceno'];
                    $img = $_POST['image'];
                    $product = $_POST['userid'];
                    $quntity = $_POST['invoiceno'];
                    $price = $_POST['price'];
                    $tax = $_POST['tax'];
                    $rating = $_POST['ratting'];
                    $payment = $_POST['payment'];

                }

                $arrUsers = $userModel->insertorder($uid,$innu,$img,$product,$quntity,$price,$tax,$rating,$payment);
                $responseData = $arrUsers;
               
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(

                json_encode(array('Code'=>'200','message'=>'Inserted Successfully','status'=>'true')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                
            );

        } else {

            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //Select Order by user id
    //user/getorder

    public function getorderAction(){

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $userid = "";
              
                if (isset($_POST['userid'])) {

                    $userid = $_POST['userid'];

                }

                $arrUsers = $userModel->getorders($userid);
                $responseData = json_encode($arrUsers);
               
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }
        // send output 
        if (!$strErrorDesc) {

            if (!empty(json_decode($responseData))){

                $this->sendOutput(

                    $responseData,
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );
                
            } else {
             
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
              
                $this->sendOutput(json_encode(array('Code'=>'404','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
                );

            }

            }else{
                
                $this->sendOutput(json_encode(array('Code'=>'404','status'=>'false','Message' => 'No Data Found')), 
                array('Content-Type: application/json', $strErrorHeader)
            );
            }

    }

    //Get CartDetails
    //http://localhost/Assignment2/index.php/api/user/cartdetails

    public function cartdetailsAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getCartDetail($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //Insert CartDetails
    //http://localhost/Assignment2/index.php/api/user/cartdetailsinsert

    public function cartdetailsinsertAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $productid = '';
                $userid = '';
                $quantities = '';
                $user = '';

                if (isset($_POST['productid']) && isset($_POST['userid']) && isset($_POST['quantities']) && isset($_POST['user'])) {
                    $productid = $_POST['productid'];
                    $userid = $_POST['userid'];
                    $quantities = $_POST['quantities'];
                    $user = $_POST['user'];
                }
                $arrUsers = $userModel->insertCartDetail($productid,$userid,$quantities,$user);
                $responseData = $arrUsers;
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                json_encode(array('message'=>'Inserted Successfully')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //Update CartDetails
    //http://localhost/Assignment2/index.php/api/user/cartdetailsupdate

    public function cartdetailsupdateAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $userid = '';
                $quantities = '';
                $cartid = '';

                if (isset($_POST['cartid']) && isset($_POST['userid']) && isset($_POST['quantities'])) {                
                    $userid = $_POST['userid'];
                    $quantities = $_POST['quantities'];                
                    $cartid = $_POST['cartid'];
                }
                $arrUsers = $userModel->updateCartDetail($cartid, $userid, $quantities);
                $responseData = $arrUsers;
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                json_encode(array('Code'=>'200','message'=>'Updated Successfully','status'=>'false')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //Delete CartDetails
    //http://localhost/Assignment2/index.php/api/user/cartdetailsdelete

    public function cartdetailsdeleteAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;

                $cartid = '';

                if (isset($_POST['cartid'])) {             
                    $cartid = $_POST['cartid'];
                }
                $arrUsers = $userModel->deleteCartDetail($cartid);
                $responseData = $arrUsers;
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                json_encode(array('Code'=>'200','message'=>'Deleted Successfully','status'=>'false')),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('Code'=>'200','status'=>'false','error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function getUserByID($id)
    {
        echo("Get data for ID ".$id);
    }
}

?>