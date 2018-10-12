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



class Api_Rest extends REST_Controller
{
    function __construct() {
        parent::__construct();
        $this->load->library('Format');
    }
    function returnNothingIfNull($value) {
        if ($value != NULL) {
            return $value;
        } else {
            return '';
        }
    }
    /*Function to fetch products*/
    public function getProducts_post(){
        try{
            $where['status'] = 1;
            $products=$this->Cart_model->getAllData($where,'cart_products');
            if(sizeof($products) > 0){
                foreach($products as $key=>$value){
                    $products[$key]['itemPieceQty'] = 1;
                    $products[$key]['itemCaseQty'] = 0;
                }
                $this->response(array('message' =>'Success fetching Products', 'status' => '1','data'=>$products, 'status_info' => 'Success'));
            }else{
                $this->response(array('message' => 'No Products available', 'status' => '1', 'status_info' => 'Fail'));
            }
        }catch(Exception $exc){
            $this->response(array('message' => $exc->getMessage(), 'status' => '0', 'status_info' => 'Error Occured'));
        }
    }




}