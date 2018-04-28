function Result(status,wrongs,data) {

    this.status=status;//返回结果状态"1"：成功，“0”表示失败
    this.wrongs=wrongs;//[{key: 'CODE', description: '描述'}]
    this.data=data;//查询数据

}
module.exports=Result;