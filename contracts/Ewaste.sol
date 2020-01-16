pragma solidity ^0.5.16;

library Elibrary {
  struct Products{
    string productName;
    string category;
    string description;
    uint manufactureId;
    uint price;
    uint recyclerID;
    bool status;
  }
  struct Users{
    address payable userAddress;
    string userName;
    string contactAddress;
    uint accountType;
  }
  struct EModel{
    uint U_ID;
    uint P_ID ;
    mapping(uint => Products) Product;
    mapping(uint => Users) User;
    mapping (address => uint) UserID;
  }
}
library SafeMath{
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0, "division by zero");
    uint256 c = a / b;
    return c;
  }
}
contract Evariables {
  using Elibrary for Elibrary.EModel;
  Elibrary.EModel  EWASTE;
}
contract Emodifier is Evariables {
  modifier onlyMan(address _add) {
    require(EWASTE.User[EWASTE.UserID[_add]].userAddress == _add && EWASTE.User[EWASTE.UserID[_add]].accountType == 1,'only Manufacture');
    _;
  }
  modifier onlyRec() {
    require(EWASTE.User[EWASTE.UserID[msg.sender]].userAddress == msg.sender && EWASTE.User[EWASTE.UserID[msg.sender]].accountType == 2,'only Recycler');
    _;
  }
  modifier recycler(uint pID) {
    require(EWASTE.Product[pID].recyclerID == 0 && EWASTE.Product[pID].status == true,'Recycler Already Asigned ');
    _;
  }
  modifier buyProduct(uint pID) {
    require(EWASTE.Product[pID].manufactureId == EWASTE.UserID[msg.sender],'its Not your Product');
    require(EWASTE.Product[pID].status == false,'Not a Waste');
    _;
  }
}
contract Eread is Emodifier{
    function U_ID() external view returns(uint totalUserCount) {
    return EWASTE.U_ID;
  }
  function P_ID() external view returns(uint totalProductCount) {
    return EWASTE.P_ID;
  }
  function UserID(address _add) external view returns(uint userId) {
    return EWASTE.UserID[_add];
  }
  function Product(uint _id) external view returns(
    string memory productName,
    string memory category,
    string memory description,
    uint manufactureId,
    uint price,
    uint recyclerID,
    bool status
    ) {
    return (
      EWASTE.Product[_id].productName,
      EWASTE.Product[_id].category,
      EWASTE.Product[_id].description,
      EWASTE.Product[_id].manufactureId,
      EWASTE.Product[_id].price,
      EWASTE.Product[_id].recyclerID,
      EWASTE.Product[_id].status
    );
  }
  function User(uint _id) external view returns(
    address userAddress,
    string memory userName,
    string memory contactAddress,
    uint accountType
    ) {
    return (
      EWASTE.User[_id].userAddress,
      EWASTE.User[_id].userName,
      EWASTE.User[_id].contactAddress,
      EWASTE.User[_id].accountType
    );
  }
}
contract Ewaste is Eread{
  using SafeMath for uint256;
    constructor() public{
        EWASTE.U_ID = 1000;
        EWASTE.P_ID = 1;
    }
  function Registration (string memory userName,string memory contactAddress,uint accountType) public{
      require(EWASTE.UserID[msg.sender]==0,'User Already Registred');
      require(accountType == 1 || accountType == 2 , ' Invalid accountType');
    EWASTE.User[EWASTE.U_ID].userAddress = msg.sender;
    EWASTE.User[EWASTE.U_ID].userName = userName;
    EWASTE.User[EWASTE.U_ID].contactAddress = contactAddress;
    EWASTE.User[EWASTE.U_ID].accountType = accountType;
    EWASTE.UserID[msg.sender] = EWASTE.U_ID;
    EWASTE.U_ID++;
  }
  function CreateProduct (string calldata _name,string calldata _category,string calldata _description,uint _price) external onlyMan(msg.sender) {
    EWASTE.Product[EWASTE.P_ID].manufactureId = EWASTE.UserID[msg.sender];
    EWASTE.Product[EWASTE.P_ID].productName = _name;
    EWASTE.Product[EWASTE.P_ID].category = _category;
    EWASTE.Product[EWASTE.P_ID].description = _description;
    EWASTE.Product[EWASTE.P_ID].price = _price;
    EWASTE.Product[EWASTE.P_ID].status = true;
    EWASTE.P_ID++;
  } 
  function SortRecycler(uint _P_ID) public onlyRec() recycler(_P_ID)  {
    EWASTE.Product[_P_ID].recyclerID = EWASTE.UserID[msg.sender];
    EWASTE.Product[_P_ID].price = EWASTE.Product[_P_ID].price.div(3);
    EWASTE.Product[_P_ID].status = false;
  }
  function BuyProduct(uint _P_ID) public payable onlyMan(msg.sender) buyProduct(_P_ID){
    require(EWASTE.Product[_P_ID].price == msg.value,'Incorret Price');
    EWASTE.User[EWASTE.Product[_P_ID].recyclerID].userAddress.transfer(EWASTE.Product[_P_ID].price);
    EWASTE.Product[_P_ID].recyclerID = 0;
    EWASTE.Product[_P_ID].status = true;
  }
}