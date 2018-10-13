<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 10/12/2018
 * Time: 16:26
 */
header("Access-Control-Allow-Origin: *");
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';


/***
*Api controller should extend our rest library to be able to use
 * REST functionalities like return type,if POST,GET
 */


class Api_Rest extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library(array('Format','commonutils'));
//        $this->load->library();
    }

    /*Function to fetch products*/
    public function getProducts_post()
    {
        try {
            $where['status'] = 1;
            $products = $this->Cart_model->getAllData($where, 'cart_products');
            if (sizeof($products) > 0) {
                foreach ($products as $key => $value) {
                    $products[$key]['itemPieceQty'] = 1;
                    $products[$key]['itemCaseQty'] = 0;
                }
                $this->response(array('message' => 'Success fetching Products', 'status' => '1', 'data' => $products, 'status_info' => 'Success'));
            } else {
                $this->response(array('message' => 'No Products available', 'status' => '1', 'status_info' => 'Fail'));
            }
        } catch (Exception $exc) {
            $this->response(array('message' => $exc->getMessage(), 'status' => '0', 'status_info' => 'Error Occured'));
        }
    }


    public function checkIfNullOrDefault($value)
    {

        if (isset($value)) {
            if ($value != NULL) {
                return true;
            }
        } else {
            return false;
        }
    }

    /*Function to save customer details and orders*/
    public function saveOrder_post()
    {
        try {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);

            $customerArray = (array)$request->customerDetails;

            if (isset($customerArray) && sizeof($customerArray) > 0) {
                $customerArray['orderNumber'] = strtoupper($this->commonutils->randomString(10));
                $customerArray['status'] = 1;
                $customerArray['dateCreated'] =  date('Y-m-d h:i:s ');;
                $customerArray['createdBy'] = 0;
                $query = $this->Cart_model->insert_data($customerArray, 'cart_customers');

                if ($query) {

                    $cart = (array)$request->cart;

                    if (isset($cart)) {
                        $count = 0;
                        for ($i = 0; $i < sizeof($cart); $i++) {
                            $indCart = (array)$cart[$i];


                            $cartArray['itemId'] = $indCart['id'];
                            $cartArray['qty'] = $indCart['qty'];
                            $cartArray['productName'] = $indCart['productName'];
                            $cartArray['total'] = $indCart['total'];
                            $cartArray['price'] = $indCart['price'];
                            $cartArray['type'] = $indCart['type'];
                            $cartArray['dateCreated'] =  date('Y-m-d h:i:s ');;
                            $cartArray['status'] = 1;
                            $cartArray['createdBy'] = 0;
                            $cartArray['orderNumber'] = $customerArray['orderNumber'];
                            if ($this->checkIfNullOrDefault($cartArray)) {

                                if($this->Cart_model->insert_data($cartArray, 'cart_order')){
                                    $count++;
                                }

                            }
                        }
                        if ($count > 0) {

                            $this->response(array('message' => 'Your Order As Been Received Successfully,Please Use Order Number :  ' . $customerArray['orderNumber'].' for any queries',
                                'status' => '1', 'status_info' => 'Success'));
                        } else {
                            $this->response(array('message' => 'Order Could Not Be saved, Try Again', 'status' => '1', 'status_info' => 'Fail'));
                        }

                    }

                } else {
                    $this->response(array('message' => 'Order Could Not Be saved, Try Again', 'status' => '1', 'status_info' => 'Fail'));
                }
            }
        } catch (Exception $e) {
            $this->response(array('message' => $e->getMessage(), 'status' => '0', 'status_info' => 'Error Occured'));
        }

    }


}