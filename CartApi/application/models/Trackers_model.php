
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Trackers_model extends CI_Model {

    protected $historyTable = 'eventdata';
    protected $trackerTable = 'Device';
    protected $userTable = 'customers';
    protected $returnType = 'array';

    public function __Trackers_model() {
        parent::__construct();
        $this->db->cache_on();
    }

    public function getAllData($where, $table) {

        $this->db->limit(20000);
        $this->db->where($where);
        if ($table == 'TBL_USER_TICKETS') {
            $this->db->order_by('total', 'desc');
        } else {
            $this->db->order_by('id', 'desc');
        }
        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function getAllDataInstallations($where, $table) {
        $this->db->select(" InstallID  ,RegistrationNumber  ,ChassisNumber  ,Make ,Model ,CustomerName  ,CustomerPhone ,CertificateNumber
      ,SerialNumber ,DateSubmitted ,DateInstalled,UniqueCertCode  ,sacconame  ,countyname   ,saccocontact ,amountcharged
   ,customerID,Fitting_Center   ,installername  ,confirmedBY,confirmdate  ,DtDobieBooking  ,customerAddress      ,customerEmailAddress");
        $this->db->limit(20000);
        $this->db->where($where);
        if ($table == 'TBL_USER_TICKETS') {
            $this->db->order_by('total', 'desc');
        } else {
            $this->db->order_by('installId', 'desc');
        }
        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function getAllDataReturnArray($where, $table) {

        $this->db->limit(1);
        $this->db->where($where);

        $this->db->order_by('id', 'desc');

        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function getAllUnlinkedVehicles() {

        $this->db->select(" id,code,regNo,make,model,color,chassisNo,engNo,deviceImei,deviceType,simCard,simSerial,status,certNo");
        $this->db->order_by("regNo", 'asc');
        $this->db->where(" custId is null");
        $q =$this->db->get("tbl_vehicles");
        
        return $q->result_array();
    }

    public function getAllDataCustomers($where, $table) {
        $this->db->select('id,code,name,mobile_1,mobile_2,nextOfKin,nextofKinMobile_1,email,address');
        $this->db->limit(20000);
        $this->db->where($where);
        $this->db->order_by('id', 'desc');
        $q = $this->db->get($table);
        $this->db->order_by("id", "desc");
        return $q->result_array();
    }

    public function getAllAssets($table) {
        $q = $this->db->query('select (select count(*) from TBL_VEHICLES where status=1) as active,(select count(*) from TBL_VEHICLES where status!=1) as inactive');


        return $q->result_array();
    }

    public function getCustomerDetailsLike($where, $table) {

        $this->db->limit(1200);
        $this->db->where('idNo', $where['idNo']);
        $this->db->or_where('mobile_1', $where['idNo']);
        $this->db->or_where('name', $where['idNo']);

        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function getAllVehicles($where, $table) {
        $this->db->select('TBL_VEHICLES.id ,TBL_VEHICLES.validityEndOn,idNo ,custId,regNo,certNo,make,model,engNo,chassisNo,'
                . 'deviceImei,governorId,TBL_CUSTOMERS.name,nextOfKin,mobile_1');
        $this->db->from($table);
        $this->db->join('TBL_CUSTOMERS', 'TBL_VEHICLES.custId = TBL_CUSTOMERS.id');
        $this->db->limit(20000);
        $this->db->where('TBL_VEHICLES.status < 2 and ' . ' custId is not null');
        $this->db->order_by('TBL_VEHICLES.id', 'desc');
        $q = $this->db->get();

        return $q->result_array();
    }

    public function getAllVehiclesKeyUp($where, $table) {
        $this->db->select('TBL_VEHICLES.id ,TBL_VEHICLES.validityEndOn,idNo ,custId,regNo,certNo,make,model,engNo,chassisNo,'
                . 'deviceImei,governorId,TBL_CUSTOMERS.name,nextOfKin,mobile_1');
        $this->db->from($table);
        $this->db->join('TBL_CUSTOMERS', 'TBL_VEHICLES.custId = TBL_CUSTOMERS.id');
        $this->db->limit(1000);
        $this->db->where("TBL_VEHICLES.status < 2 and  (regNo like '%" . $where['search'] . "%' or name like '%" . $where['search'] . "%')  ");
        $this->db->order_by('TBL_VEHICLES.id', 'desc');
        $q = $this->db->get();

        return $q->result_array();
    }

    public function searchCustomerDetails($where) {
        $this->db->select('id,name,idNo,mobile_1');
        $this->db->from('TBL_CUSTOMERS');
        $this->db->limit(1);
        $this->db->where("status < 3 and  (idNo like '%" . $where['customerIdNO'] . "%' or mobile_1 like '%" . $where['customerIdNO'] . "%')  ");
        $this->db->order_by('id', 'desc');
        $q = $this->db->get();

        return $q->result_array();
    }

    public function getAllcustomerJoinVehicles($where) {
        $this->db->select("tbl_vehicles.id ,custId,tbl_vehicles.code  ,regNo,make ,model ,engNo,chassisNo,color,deviceUnique ,dataline      ,approve_date      ,financierId      ,insurorId
      ,certNo  ,tbl_vehicles.dateCreated  ,tbl_vehicles.createdBy,tbl_vehicles.status,validityEndOn ,validityBeginOn     ,extras      ,deviceImei      ,simSerial      ,simCard      ,deviceType
      ,type ,policyNo,governorCertNo ,governorId,validityGvEndOn,validityGvBeginOn,name
      ,mobile_1      ,mobile_2,idNo      ,nextOfKin      ,nextOfKinMobile_1");
        $this->db->from('TBL_VEHICLES');
        $this->db->join('TBL_CUSTOMERS', 'TBL_VEHICLES.custId = TBL_CUSTOMERS.id');
        $this->db->limit(10);
        $this->db->where("TBL_VEHICLES.status < 2 and " . " custId is not null and TBL_VEHICLES.id = " . $where . "");
        $this->db->order_by('TBL_VEHICLES.id', 'desc');
        $q = $this->db->get();

        return $q->result_array();
    }

    public function getAllVehiclesWhere($where, $table) {
        $this->db->select(' id,code,regNo,make,model,color,chassisNo,engNo,deviceImei,deviceType,simCard,simSerial,status,certNo');
        $this->db->limit(20000);
        $this->db->where($where);
        $this->db->order_by('id', 'desc');
        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function getAllDataPortifolio($where, $table) {

        $this->db->select('TBL_CUSTOMERS.accountId,count(*) as counter ');
        $this->db->from('TBL_VEHICLES');
        $this->db->join('TBL_CUSTOMERS', 'TBL_VEHICLES.custId = TBL_CUSTOMERS.id');
        $this->db->group_by('TBL_CUSTOMERS.accountid');
        $q = $this->db->get();
        return $q->result_array();
    }

    public function getUserTickets() {

        $this->db->select(
                "assignedTo,count(*)  as counter,ticketStatus"
        );
        $this->db->where("assignedTo is not null");
        $this->db->group_by('assignedTo,ticketStatus');
        $q = $this->db->get('TBL_TICKETS');
        return $q->result_array();
    }

    public function insert_data($in, $tbl) {

        $this->db->insert($tbl, $in);

        return true;
    }

    public function update_data_where($tbl, $id_array, $up) {

        $this->db->where($id_array);

        $this->db->update($tbl, $up);

        $affected = $this->db->affected_rows();
        if ($affected) {
            return true;
        } else {
            return false;
        }
    }

    public function full_delete($tableName, $where) {
        $this->db->where($where);
        $q = $this->db->delete($tableName);
        return true;
    }

    public function fullDelete($tableName) {
        $this->db->where("regNo!=''");
        $q = $this->db->delete($tableName);
        return true;
    }

    public function getTicketReport($dateRange, $userId, $issue) {
        $this->db->select('*');
        $this->db->from('tbl_simple_tickets');
        $this->db->where('dayTime >=', $dateRange[0]);
        $this->db->where('dayTime <=', $dateRange[1]);
        $this->db->like('issue', $issue);
        $this->db->like('assignedTo', $userId);
        $q = $this->db->get();
        return $q->result_array();
    }

    public function getAllUserMenu($where, $tableName) {
        // $this->db->select('TBL_MENUS.ID,menuName,accessURL,functionAllowed,color FROM TBL_MENUS JOIN TBL_USER_MENUS ON TBL_MENUS.ID=TBL_USER_MENUS.MENUID'); 
        $this->db->select('TBL_MENUS.ID as id,menuName,accessURL,functionAllowed,color,side');
        $this->db->from('TBL_MENUS');
        $this->db->join('TBL_USER_MENUS', 'TBL_MENUS.id = TBL_USER_MENUS.menuId');
        $this->db->where($where);
        $q = $this->db->get();
        return $q->result_array();
    }

    public function getAllPortifolio($where) {
        $this->db->SELECT('id,accountId,description');
        $this->db->limit(100000);
        $this->db->where($where);
        $q = $this->db->get('TBL_ACCOUNTS');

        return $q->result_array();
    }

    public function getCustomerBrief($where, $table) {
        $this->db->SELECT('id,name,idNo');
        $this->db->limit(100000);
        $this->db->where($where);
        $q = $this->db->get($table);

        return $q->result_array();
    }

    public function updateEndDayOperations() {
        $this->db->query('EXEC updateAllUserTickets');

        return true;
    }

    public function getVehicleWithSpace($where) {
        $this->db->select('*');
        $this->db->from('TBL_VEHICLES');
        $this->db->limit(1);
        $this->db->where("status < 3 and  REPLACE(regNo,' ','') like '%" . $where . "%' ");
        $this->db->order_by('id', 'desc');
        $q = $this->db->get();

        return $q->result_array();
    }

}

?>