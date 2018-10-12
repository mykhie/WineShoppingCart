<?php
/**
 * Created by PhpStorm.
 * User: U
 * Date: 10/11/2018
 * Time: 23:13
 */

header("Access-Control-Allow-Origin: *");
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';

class API extends REST_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->library('Format');
    }

    /**
     * method to get products that only accepts post request
     * */
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