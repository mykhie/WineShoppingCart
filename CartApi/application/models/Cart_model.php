<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Cart_model extends CI_Model
{

    public function __Cart_model()
    {
        parent::__construct();
        $this->db->cache_on();
    }

    public function getAllData($where, $table)
    {

        $this->db->limit(20000);
        $this->db->where($where);

        $this->db->order_by('id', 'desc');

        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function insert_data($in, $tbl)
    {

        $this->db->insert($tbl, $in);
        $insert_id = $this->db->insert_id();
        if ($insert_id > 0) {
            return true;
        } else {
            return false;
        }

    }


}

?>